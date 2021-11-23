const block = document.getElementById('block')
const targetContainer = document.getElementById('target-container')

block.addEventListener('dragstart', event => {
    console.log(event)
})

targetContainer.addEventListener('dragenter', event => {
    console.log(event)
})

