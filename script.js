const gridContainer = document.querySelector('.grid-container')
gridContainer.style.gridTemplateColumns = 'repeat(16, 1fr)'
gridContainer.style.gridTemplateRows = 'repeat(16, 1fr)'

const sizeLabel = document.querySelector('.size-label')
const slider = document.querySelector('.slider')

const singleGridDrawHandler = (e) => {
  e.target.style.backgroundColor = brushColor
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
