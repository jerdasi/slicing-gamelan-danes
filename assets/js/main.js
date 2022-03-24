let filterMenu = ["category-filter-all", "newest"]
let heightCard = ["small", "mid", "big"]
let globalDataGallery = []
let changingDataGallery = []

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
document.querySelector('.apply-button').addEventListener('click', () => {
    document.querySelector('.sidebar').classList.add('hidden')
})

// Perhatikan Ini untuk Gallery dengan Jumlah Item Dikit
// FlexMasonry.init('.gallery-content', {
//     responsive: true,
//     breakpointCols: {
//         'min-width: 1024px': 4,
//         'min-width: 640px': 2,
//     },
//     numCols: 2
// });

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
    let result = applyFilter()
    result = this.value == "" ? [...result] : result.filter(elemen => elemen.nama.toLowerCase().includes(this.value.toLowerCase()))
    let paginationNumber = document.querySelector(".pagination-number")
    paginationNumber.parentNode.replaceChild(initPageNumber(result.length), paginationNumber)
    appendToContainer(paginationTest(1, result))
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


const buildCardGallery = (url, nama, jenis, tangal, height) => {

    return `
    <div class="w-full px-2 md:px-4 pb-4 h-fit gallery-item relative">
        <div class="item-picture w-full h-fit md:h-${height} hover:cursor-pointer ${jenis} relative">
            <img src="${url}" alt="" class="w-full h-full object-cover">
            <div class="block md:absolute h-fit max-h-full bottom-0 w-full md:hidden">
                <div class="detail-item p-2">
                    <h1 class="text-xl md:text-3xl font-bold md:text-center text-white">${nama}</h1>
                    <p class="hidden md:block text-right cursor-pointer font-complementary">click for more info<span class="ml-4"><i class="fa-solid fa-angle-right"></i></span></p>
                </div>
            </div>
        </div>
        <div class="item-description absolute md:static top-2 left-0 px-8 md:px-0 w-full flex items-center justify-between h-8">
            <p class="mr-2 bg-white px-2 md:px-0 md:bg-transparent">${jenis}</p>
            <div class="hidden md:block md:grow bg-black h-0.5"></div>
            <p class="ml-2 bg-white px-2 md:px-0 md:bg-transparent">${tangal}</p>
        </div>
    </div>
    `
}

const getRandomInt = (min, max) => {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

// Membuat Page Number berdasarkan banyaknya data
const initPageNumber = (total) => {
    let menu = document.createElement("ul")
    menu.classList.add("flex", "justify-between", "cursor-pointer", "pagination-number")
    for (let i = 1; i <= Math.ceil(total / 10); i++) {
        let list = document.createElement("li")

        // Event Listener
        list.addEventListener("click", function() {
            let parent = this.parentNode.childNodes
            let onPage = this.innerHTML
            parent.forEach((element, index) => {
                if (index + 1 == onPage) {
                    element.classList.add("active")
                } else {
                    element.classList.remove("active")
                }
            })
            appendToContainer(paginationTest(this.innerHTML, changingDataGallery))
                // console.log(this.innerHTML)
        })

        list.innerText = i
        i == 1 ? list.classList.add("mx-2", "active") : list.classList.add("mx-2")
        menu.insertAdjacentElement("beforeend", list)
    }
    return menu
}

// async function fetchingData(){
//     let response = await fetch("./_data/gamelan.json")
//     response = await response.json()
// }

// Document Ready Loaded Full
// document.addEventListener("DOMContentLoaded", function() {
//     // Fetch Data

// Sort data berdasarkan key
const sortItem = (data, key) => {
    if (key == 'newest' || key == 'most') {
        if (key == 'newest') {
            data.sort((a, b) => new Date(b.ditemukan) - new Date(a.ditemukan))
        } else {
            data.sort((a, b) => (b.instrumen).length - (a.instrumen).length)
        }
    } else {
        if (key == 'oldest') {
            data.sort((a, b) => new Date(a.ditemukan) - new Date(b.ditemukan))
        } else {
            data.sort((a, b) => (a.instrumen).length - (b.instrumen).length)
        }
    }
    return data
}

// Filter data berdasarkan key
const filterItem = (data, key) => {
    let result = [...data]
    if (key != 'category-filter-all') {
        if (key == 'category-filter-hageng') {
            result = data.filter(element => element.jenis == 'hageng')
        } else {
            result = data.filter(element => element.jenis == 'pakurmatan')
        }
    }
    return result
}

// Menambahkan Ke dalam Box Gallery
const appendToContainer = data => {
    document.querySelector(".gallery-content").innerHTML = ""
    let heightIndex = 0
    for (let i = 0; i < data.length; i++) {

        let height = heightCard[heightIndex]
        document.querySelector(".gallery-content").insertAdjacentHTML("beforeend", buildCardGallery(data[i].url, data[i].nama + " " + data[i].instrumen.length, data[i].jenis, data[i].ditemukan, height))

        if (heightIndex == 2) {
            heightIndex = 0
            heightCard.reverse()
        } else {
            ++heightIndex
        }

    }




    FlexMasonry.init('.gallery-content', {
        responsive: true,
        breakpointCols: {
            'min-width: 1024px': 3,
            'min-width: 640px': 2,
        }
    })
    hoverCardInitialize()
}

// Funtion Apply Filter & Sort
const applyFilter = () => {
    let result = filterItem(globalDataGallery, filterMenu[0])
    result = sortItem(result, filterMenu[1])
    changingDataGallery = result
    return result
}

// Event Listener untuk Apply button
document.querySelector('.apply-button').addEventListener("click", function() {

    let result = applyFilter()
    console.log(result)
    let paginationNumber = document.querySelector(".pagination-number")
    paginationNumber.parentNode.replaceChild(initPageNumber(result.length), paginationNumber)
    appendToContainer(paginationTest(1, result))
})

// })

// Fetch Data dari JSON
fetch('./_data/gamelan.json').then(response => {
    return response.json()
}).then(data => {
    console.log(data.length)
    document.querySelector(".info-gallery").insertAdjacentElement("beforeend", initPageNumber(data.length))
    let result = sortItem(data, "newest")
    globalDataGallery = [...result]
    result = paginationTest(1, result)
    appendToContainer(result)
    hoverCardInitialize()
})

// Memotong Data Per -- dari --
const paginationTest = (index, data) => {
    let total = data.length
    let perPages = 10
    let minPerPages = index * perPages - perPages
    let maxPerPages = index * perPages > total ? total : index * perPages
    document.querySelector(".pagination-info").innerText = `${minPerPages + 1} - ${maxPerPages} of ${total} Gamelan`
    console.log(globalDataGallery.length)
    return data.slice(minPerPages, maxPerPages)
}