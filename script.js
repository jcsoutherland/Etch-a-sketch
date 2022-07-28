const gridContainer = document.querySelector('.grid-container')
gridContainer.getElementsByClassName.gridTemplateColumns = 'repeat(16, 1fr)'
gridContainer.getElementsByClassName.gridTemplateRows = 'repeat(16, 1fr)'
const gridSize = 16
for (let i = 0; i < gridSize * gridSize; i++) {
  let gridBlock = document.createElement('div')
  gridBlock.className = 'grid-block'
  gridContainer.appendChild(gridBlock)
}
