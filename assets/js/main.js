let filterMenu = ["category-filter-all", "newest"]
let heightCard = [52, 68, 80]

// Animation for Hover Card
const hoverCardInitialize = () => {
    document.querySelectorAll('.gallery-item').forEach(element => {
        let description = element.firstElementChild.lastElementChild
        element.addEventListener('mouseenter', () => {
            description.classList.remove('md:hidden')
        })
        element.addEventListener('mouseleave', () => {
            description.classList.add('md:hidden')
        })
    })

}

// Block Code For Toggle Sidebar
document.querySelector('.filter-button').addEventListener('click', () => {
    document.querySelector('.sidebar').classList.remove('hidden')
})
document.querySelector('.close-sidebar').addEventListener('click', () => {
    document.querySelector('.sidebar').classList.add('hidden')
})

// Perhatikan Ini untuk Gallery dengan Jumlah Item Dikit
FlexMasonry.init('.gallery-content', {
    responsive: true,
    breakpointCols: {
        'min-width: 1024px': 4,
        'min-width: 640px': 2,
    },
    numCols: 2
});

let menu = document.querySelector('.menu')

function toggleMenu(event) {
    if (event.classList.contains("fa-bars")) {
        event.classList.remove("fa-bars")
        event.classList.add("fa-close")
        menu.classList.add("primary-color")
        menu.classList.remove("hidden")
    } else {
        event.classList.add("fa-bars")
        event.classList.remove("fa-close")
        menu.classList.remove("primary-color")
        menu.classList.add("hidden")
    }
}

// Search Function
document.querySelector("#input-search").addEventListener('keyup', function(event) {
    console.log(this.value)
})

// Filter by Category
document.getElementsByName("category").forEach((element) => {
    element.addEventListener("change", function() {
        filterMenu[0] = this.id
    })
})

// Filter Sort
document.getElementsByName("filter-sort").forEach((element) => {
    element.addEventListener("change", function() {
        filterMenu[1] = this.id
    })
})

// document.querySelector("#category-filter-all").addEventListener("change", function() {
//     let status = this.checked
//     document.getElementsByName("all-collections").forEach(function(elemen) {
//         elemen.checked = status
//     })
// })


const buildCardGallery = (url, nama, jenis, tangal) => {
    let height = heightCard[getRandomInt(0, heightCard.length)]
    return `
    <div class="w-full px-2 md:px-4 pb-4 h-fit gallery-item relative">
        <div class="item-picture w-full h-fit md:h-${height} hover:cursor-pointer rounded-lg ${jenis} relative">
            <img src="${url}" alt="" class="w-full h-full object-cover">
            <div class="block md:absolute h-fit max-h-full bottom-0 w-full md:hidden">
                <div class="detail-item p-2">
                    <h1 class="text-xl md:text-3xl font-bold md:text-center">${nama}</h1>
                    <p class="hidden md:block text-right cursor-pointer">click for more info</p>
                </div>
            </div>
        </div>
        <div class="item-description absolute md:static top-2 left-0 px-8 md:px-0 w-full flex items-center justify-between h-8">
            <p class="mr-2 bg-white px-2 md:bg-transparent">${jenis}</p>
            <div class="hidden md:block md:grow bg-black h-0.5"></div>
            <p class="ml-2 bg-white px-2 md:bg-transparent">${tangal}</p>
        </div>
    </div>
    `
}

const getRandomInt = (min, max) => {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

console.log("ini belum ready")

// async function fetchingData(){
//     let response = await fetch("./_data/gamelan.json")
//     response = await response.json()
// }

// Document Ready Loaded Full
// document.addEventListener("DOMContentLoaded", function() {
//     // Fetch Data




// })

fetch('./_data/gamelan.json').then(response => {
    return response.json()
}).then(data => {

    data.forEach((element, index) => {
        document.querySelector(".gallery-content").insertAdjacentHTML("beforeend", buildCardGallery(element.url, element.nama + index, element.jenis, element.ditemukan))
    })
    FlexMasonry.init('.gallery-content', {
        responsive: true,
        breakpointCols: {
            'min-width: 1024px': 3,
            'min-width: 640px': 2,
        }
    })
}).then(
    console.log("ini jalan")
)