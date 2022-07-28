const gridContainer = document.querySelector('.grid-container')
gridContainer.style.gridTemplateColumns = 'repeat(16, 1fr)'
gridContainer.style.gridTemplateRows = 'repeat(16, 1fr)'

const sizeLabel = document.querySelector('.size-label')
const slider = document.querySelector('.slider')

let brushMode = 'brush'

const getGridDivs = () => {
  return document.querySelectorAll('.grid-block')
}

const checkValidDivs = (div) => {
  let divArray = []
  let nonBorder = true
  if (div.id % gridSize === 0) {
    divArray.push(+div.id + 1)
    nonBorder = false
  }
  if (
    div.id >= gridSize * gridSize - gridSize &&
    div.id <= gridSize * gridSize - 1
  ) {
    divArray.push(div.id - gridSize)
    nonBorder = false
  }
  if (div.id >= 0 && div.id <= gridSize - 1) {
    divArray.push(+div.id + +gridSize)
    nonBorder = false
  }
  if ((+div.id + 1) % gridSize === 0) {
    divArray.push(div.id - 1)
    nonBorder = false
  }
  if (nonBorder) {
    divArray.push(
      div.id - 1,
      +div.id + 1,
      +div.id + +gridSize,
      div.id - gridSize
    )
  }
  divArray.push(+div.id)
  return divArray
}

const fillGrid = (eDiv, gridDivs) => {
  console.log(eDiv, gridDivs)
  let divArray = checkValidDivs(eDiv)
  divArray.forEach((id) => {
    if (gridDivs[id].style.backgroundColor !== brushColor) {
      gridDivs[id].style.backgroundColor = brushColor
      const currDiv = gridDivs[id]
      if (currDiv !== eDiv) {
        //console.log(currDiv, e.target)
        fillGrid(currDiv, gridDivs)
      }
    }
  })
  //fill logic
  //check color of divs around the current div
  //if div is color of div first clicked
  //change color
  //do until hits div with same color
  //divs around 120 = {up = -1, down = +1, left = -16, right = +16}
}

const singleGridDrawHandler = (e) => {
  console.log(brushMode)
  if (brushMode === 'fill' && e.target.style.backgroundColor !== brushColor) {
    const gridDivs = getGridDivs()
    fillGrid(e.target, gridDivs)
  } else {
    e.target.style.backgroundColor = brushColor
  }
}

const gridDrawHandler = (e) => {
  if (mouseDown === 1) {
    e.target.style.backgroundColor = brushColor
  }
}

let gridSize = 16
const makeGrid = (size) => {
  for (let i = 0; i < size * size; i++) {
    let gridBlock = document.createElement('div')
    gridBlock.className = 'grid-block'
    gridBlock.id = i
    //gridBlock.innerHTML = i
    gridBlock.addEventListener('mouseover', gridDrawHandler)
    gridBlock.addEventListener('click', singleGridDrawHandler)
    gridContainer.appendChild(gridBlock)
  }
}

makeGrid(gridSize)
const valChangeHandler = (e) => {
  let sliderValue = e.target.value
  sizeLabel.innerHTML = `Canvas Size: ${sliderValue} x ${sliderValue}`
  gridContainer.innerHTML = ''
  gridSize = sliderValue
  makeGrid(sliderValue)
  gridContainer.style.gridTemplateColumns = `repeat(${sliderValue}, 1fr)`
  gridContainer.style.gridTemplateRows = `repeat(${sliderValue}, 1fr)`
}

slider.addEventListener('change', valChangeHandler)

let brushColor = 'black'
let lastBrushColor = 'black'
var mouseDown = 0
document.body.onmousedown = function () {
  mouseDown = 1
}
document.body.onmouseup = function () {
  mouseDown = 0
}

const brushBtn = document.querySelector('#brush')
brushBtn.style.outline = '2px solid black'
const eraserBtn = document.querySelector('#eraser')
const resetBtn = document.querySelector('#reset')

brushBtn.addEventListener('click', () => {
  brushMode = 'brush'
  brushColor = lastBrushColor
  brushBtn.style.backgroundColor = 'lightgray'
  eraserBtn.style.backgroundColor = 'rgb(240, 240, 240)'
  resetBtn.style.backgroundColor = 'rgb(240, 240, 240)'
})

eraserBtn.addEventListener('click', () => {
  lastBrushColor = brushColor
  brushColor = 'white'
  eraserBtn.style.backgroundColor = 'lightgray'
  brushBtn.style.backgroundColor = 'rgb(240, 240, 240)'
  resetBtn.style.backgroundColor = 'rgb(240, 240, 240)'
})

resetBtn.addEventListener('click', () => {
  const nodes = gridContainer.childNodes
  nodes.forEach((node) => (node.style.backgroundColor = 'white'))
  brushColor = 'black'
  brushBtn.style.outline = '2px solid black'
  brushBtn.style.backgroundColor = 'rgb(240, 240, 240)'
  eraserBtn.style.backgroundColor = 'rgb(240, 240, 240)'
})

const colorHandler = (e) => {
  brushColor = e.target.style.backgroundColor
  brushBtn.style.outline = `2px solid ${brushColor}`
  brushBtn.style.backgroundColor = 'lightgray'
  eraserBtn.style.backgroundColor = 'rgb(240, 240, 240)'
  resetBtn.style.backgroundColor = 'rgb(240, 240, 240)'
}

const colorArray = [
  'red',
  'blue',
  'green',
  'orange',
  'yellow',
  'purple',
  'cyan',
  'lightgray',
  'gray',
  'black',
]

//Color Code
const colorContainer = document.querySelector('.color-container')
for (let i = 0; i < 10; i++) {
  let colorDiv = document.createElement('div')
  colorDiv.className = 'color-div'
  colorDiv.id = i
  colorDiv.style.backgroundColor = colorArray[i]
  colorDiv.style.cursor = 'pointer'
  colorDiv.addEventListener('click', colorHandler)
  colorContainer.appendChild(colorDiv)
}

let fillDiv = document.createElement('div')
const fillHandler = () => {
  //set tool to fill
  brushMode = 'fill'
  fillDiv.style.backgroundColor = 'lightgray'
  brushBtn.style.outline = `2px solid ${brushColor}`
  brushBtn.style.backgroundColor = 'lightgray'
  eraserBtn.style.backgroundColor = 'rgb(240, 240, 240)'
  resetBtn.style.backgroundColor = 'rgb(240, 240, 240)'
}

fillDiv.className = 'fill-div'
let fillImg = document.createElement('img')
fillImg.src = 'fillBucket.png'
fillImg.className = 'fill-img'
fillDiv.style.backgroundColor = 'rgb(240, 240, 240)'
fillDiv.style.cursor = 'pointer'
fillDiv.addEventListener('click', fillHandler)
fillDiv.appendChild(fillImg)
colorContainer.appendChild(fillDiv)
