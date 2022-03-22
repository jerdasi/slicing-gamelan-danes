document.querySelectorAll('.gallery-item').forEach(element => {
    let description = element.lastElementChild
    element.addEventListener('mouseenter', () => {
        description.classList.remove('hidden')
    })
    element.addEventListener('mouseleave', () => {
        description.classList.add('hidden')
    })
})

document.querySelector('.filter-button').addEventListener('click', () => {
    document.querySelector('.sidebar').classList.remove('hidden')
})

document.querySelector('.close-sidebar').addEventListener('click', () => {
    document.querySelector('.sidebar').classList.add('hidden')
})

// var grid = document.querySelector('.grid')
// var colc = new Colcade(grid, {
//     columns: '.grid-col',
//     items: '.post'
// })