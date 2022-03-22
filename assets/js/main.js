document.querySelectorAll('.gallery-item').forEach(element => {
    let description = element.firstElementChild.lastElementChild
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

// Perhatikan Ini untuk Gallery dengan Jumlah Item Dikit
FlexMasonry.init('.gallery-content', {
    responsive: true,
    breakpointCols: {
        'min-width: 1024px': 4,
        'min-width: 768px': 3,
        'min-width: 640px': 2,
    },
    numCols: 2
});