const print = (message) => console.log(message)


//  element get

const issueAmount = document.getElementById('issueAmount')
const allMenu = document.getElementById('allMenu')
const openMenu = document.getElementById('openMenu')
const closeMenu = document.getElementById('closeMenu')

const cardSection = document.getElementById('cardSection')

const title = document.getElementById('title')

const loadingSpinner = document.getElementById('loadingSpinner')

const searchInput = document.getElementById('searchInput')



// menu active and call function

function menuItem(thisMenu) {

    // print(thisMenu.id)
    if (thisMenu.id == 'allMenu') {
        allMenu.classList.add("bg-blue-600", "text-white")
        closeMenu.classList.remove("bg-blue-600", "text-white")
        openMenu.classList.remove("bg-blue-600", "text-white")
        all()
    }
    if (thisMenu.id == 'openMenu') {
        allMenu.classList.remove("bg-blue-600", "text-white")
        closeMenu.classList.remove("bg-blue-600", "text-white")
        openMenu.classList.add("bg-blue-600", "text-white")
        open()
    }
    if (thisMenu.id == 'closeMenu') {
        allMenu.classList.remove("bg-blue-600", "text-white")
        openMenu.classList.remove("bg-blue-600", "text-white")
        closeMenu.classList.add("bg-blue-600", "text-white")
        close()
    }
}


// 


//  function for all 

async function all() {
    const res = await fetch('https://phi-lab-server.vercel.app/api/v1/lab/issues')

    const data = await res.json()
    const totalData = data.data.length
    const dataArr = data.data
    spiner()
    // print(data)
    // print(dataArr)
    issueAmount.innerHTML = totalData
    cardSection.innerHTML = ''

    dataArr.forEach(element => {

        const labels = element.labels
        // print(labels)
        // let lavelVariable = 0
        let labelsHTML = ""
        // print(labels)
        labels.forEach(label => {
            let badgeClass = ""

            if (label == "bug") {
                badgeClass = "badge-warning"
            }
            else if (label == "good first issue") {
                badgeClass = "badge-success"
            }
            else if (label == "enhancement") {
                badgeClass = "badge-info"
            }
            else {
                badgeClass = "badge-neutral"
            }
            labelsHTML += `<div class=" h-full  badge badge-outline badge-secondary ${badgeClass}">${label}</div>`
        })

        if (element.status == "open") {
            borderColor = "border-t-3 border-green-500";
            logoName = "./assets/Open-Status.png"
        } else {
            borderColor = "border-t-3 border-purple-500";
            logoName = "./assets/Closed- Status .png"
        }

        if (element.priority == "high") {
            badgeColor = "badge-error"
        } else if (element.priority == "medium") {
            badgeColor = "badge-warning"
        } else {
            badgeColor = "badge-neutral"

        }

        const cardSectionOn = document.createElement('div')

        cardSectionOn.innerHTML = `
    <div class=" ${borderColor}  card w-72 bg-base-100 card-md shadow-sm">
            <div class="flex justify-between items-center pt-5 pr-5 pl-5">
                <img src="${logoName}" alt="">
                <div class="font-bold badge ${badgeColor}">${element.priority}</div>
            </div>
            <div class="card-body">
                <h2 onclick="openModal(${element.id})" id="title" class="card-title">${element.title}</h2>
                <p class="line-clamp-2" >${element.description}</p>
                <div class="flex gap-1">
                
                     ${labelsHTML}
                </div>
                <hr>

                <div>
                    <p>#1 by ${element.author}</p>
                    <p class="mt-1">${element.createdAt}</p>
                </div>

            </div>
        </div>
    `


        cardSection.append(cardSectionOn)
    });



}


//  Function for open

async function open() {
    const res = await fetch('https://phi-lab-server.vercel.app/api/v1/lab/issues')
    const data = await res.json()
    // print(data.data)

    let filterOpen = data.data.filter((item) => item.status == 'open')
    let statusOpen = filterOpen;
    issueAmount.innerHTML = statusOpen.length
    // const dataArr = data.data
    cardSection.innerHTML = ''
    spiner()
    filterOpen.forEach(element => {

        const labels = element.labels
        // print(labels)
        // let lavelVariable = 0
        let labelsHTML = ""
        // print(labels)
        labels.forEach(label => {
            let badgeClass = ""

            if (label == "bug") {
                badgeClass = "badge-warning"
            }
            else if (label == "good first issue") {
                badgeClass = "badge-success"
            }
            else if (label == "enhancement") {
                badgeClass = "badge-info"
            }
            else {
                badgeClass = "badge-neutral"
            }
            labelsHTML += `<div class=" h-full  badge badge-outline badge-secondary ${badgeClass}">${label}</div>`
        })


        if (element.status == "open") {
            borderColor = "border-t-3 border-green-500";
            logoName = "./assets/Open-Status.png"
        } else {
            borderColor = "border-t-3 border-red-500";
            logoName = "./assets/Closed- Status .png"
        }

        if (element.priority == "high") {
            badgeColor = "badge-error"
        } else if (element.priority == "medium") {
            badgeColor = "badge-warning"
        } else {
            badgeColor = "badge-neutral"

        }

        const cardSectionOn = document.createElement('div')

        cardSectionOn.innerHTML = `
    <div class=" ${borderColor}  card w-72 bg-base-100 card-md shadow-sm">
            <div class="flex justify-between items-center pt-5 pr-5 pl-5">
                <img src="${logoName}" alt="">
                <div class="font-bold badge ${badgeColor}">${element.priority}</div>
            </div>
            <div class="card-body">
                <h2 id="title" onclick="openModal(${element.id})" class="card-title">${element.title}</h2>
                <p class="line-clamp-2" >${element.description}</p>
                <div class="flex gap-1">
                     ${labelsHTML}
                </div>
                <hr>

                <div>
                    <p>#1 by ${element.author}</p>
                    <p class="mt-1">${element.createdAt}</p>
                </div>

            </div>
        </div>
    `


        cardSection.append(cardSectionOn)
    });
    // print(statusOpen.length)
}


//  Close function 

async function close() {
    const res = await fetch('https://phi-lab-server.vercel.app/api/v1/lab/issues')
    const data = await res.json()
    let filterClose = data.data.filter((item) => item.status == 'closed')
    let statusClose = filterClose;
    issueAmount.innerHTML = statusClose.length
    // print(statusClose.length)
    // print(data)
    spiner()
    cardSection.innerHTML = ''
    statusClose.forEach(element => {
        // print(element.id)

        const labels = element.labels
        // print(labels)
        // let lavelVariable = 0
        let labelsHTML = ""
        // print(labels)
        labels.forEach(label => {
            let badgeClass = ""

            if (label == "bug") {
                badgeClass = "badge-warning"
            }
            else if (label == "good first issue") {
                badgeClass = "badge-success"
            }
            else if (label == "enhancement") {
                badgeClass = "badge-info"
            }
            else {
                badgeClass = "badge-neutral"
            }
            labelsHTML += `<div class=" h-full  badge badge-outline badge-secondary ${badgeClass}">${label}</div>`
        })


        if (element.status == "open") {
            borderColor = "border-t-3 border-green-500";
            logoName = "./assets/Open-Status.png"
        } else {
            borderColor = "border-t-3 border-purple-500";
            logoName = "./assets/Closed- Status .png"
        }

        if (element.priority == "high") {
            badgeColor = "badge-error"
        } else if (element.priority == "medium") {
            badgeColor = "badge-warning"
        } else {
            badgeColor = "badge-neutral"

        }

        const cardSectionOn = document.createElement('div')

        cardSectionOn.innerHTML = `
    <div class=" ${borderColor}  card w-72 bg-base-100 card-md shadow-sm">
            <div class="flex justify-between items-center pt-5 pr-5 pl-5">
                <img src="${logoName}" alt="">
                <div class="font-bold badge ${badgeColor}">${element.priority}</div>
            </div>
            <div class="card-body">
                <h2 id="title" onclick="openModal(${element.id})" class="card-title">${element.title}</h2>
                <p class="line-clamp-2" >${element.description}</p>
                <div class="flex gap-1">
                     ${labelsHTML}
                </div>
                <hr>

                <div>
                    <p>#1 by ${element.author}</p>
                    <p class="mt-1">${element.createdAt}</p>
                </div>

            </div>
        </div>
    `


        cardSection.append(cardSectionOn)
    });
}

async function openModal(id) {
    my_modal_4.showModal()
    // print(id)
    const url = `https://phi-lab-server.vercel.app/api/v1/lab/issue/${id}`
    const res = await fetch(`https://phi-lab-server.vercel.app/api/v1/lab/issue/${id}`)
    const data = await res.json()
    const title = data.data.title
    // print(data.data)
    const cardTitle = document.getElementById('cardTitle')
    cardTitle.innerHTML = data.data.title
    const statusID = document.getElementById('statusID')
    statusID.innerHTML = data.data.status
    const authorID = document.getElementById('authorID')
    authorID.innerHTML = data.data.author
    const createdID = document.getElementById('createdID')
    createdID.innerHTML = data.data.createdAt
    const descriptionID = document.getElementById('descriptionID')
    descriptionID.innerHTML = data.data.description
    const authorIDagin = document.getElementById('authorIDagin')
    authorIDagin.innerHTML = data.data.author
    const priority = document.getElementById('priority')
    priority.innerHTML = data.data.priority

    // print(data.data.labels)
    const labels = data.data.labels
    let labelsHTML = ""
    // print(labels)
    const labelsContainer = document.getElementById("labelsContainer")
    labelsContainer.innerHTML = ""
    labels.forEach(label => {
        let badgeClass = ""

        if (label == "bug") {
            badgeClass = "badge-warning"
        }
        else if (label == "good first issue") {
            badgeClass = "badge-success"
        }
        else if (label == "enhancement") {
            badgeClass = "badge-info"
        }
        else {
            badgeClass = "badge-neutral"
        }
        labelsContainer.innerHTML += `
        <div class=" h-full font-bold badge badge-outline badge-secondary ${badgeClass}">
            ${label}
        </div>
    `

    })

}


//  loding spinner 

function spiner() {
    loadingSpinner.classList.add('hidden')
}


//  search handler 

searchInput.addEventListener("keydown", function (event) {

    if (event.key === "Enter") {
        const searchValue = searchInput.value
        searchResult(searchValue)
    }

})

async function searchResult(searchValue) {

    const searchInput = document.getElementById("searchInput")
    const searchValueOFInput = searchInput.value.trim().toLowerCase()
    // print(searchValueOFInput)

    // const url = `https://phi-lab-server.vercel.app/api/v1/lab/issues/search?q=${searchValue}`
    const res = await fetch(`https://phi-lab-server.vercel.app/api/v1/lab/issues/search?q=${searchValue}`)
    // print(searchValue)
    const data = await res.json()
    const dataSearch = data.data
    // print(dataSearch)

    issueAmount.innerHTML = dataSearch.length

    cardSection.innerHTML = ''
    spiner()
    dataSearch.forEach(element => {

        const labels = element.labels
        // print(labels)
        // let lavelVariable = 0
        let labelsHTML = ""
        // print(labels)
        labels.forEach(label => {
            let badgeClass = ""

            if (label == "bug") {
                badgeClass = "badge-warning"
            }
            else if (label == "good first issue") {
                badgeClass = "badge-success"
            }
            else if (label == "enhancement") {
                badgeClass = "badge-info"
            }
            else {
                badgeClass = "badge-neutral"
            }
            labelsHTML += `<div class=" h-full  badge badge-outline badge-secondary ${badgeClass}">${label}</div>`
        })


        if (element.status == "open") {
            borderColor = "border-t-3 border-green-500";
            logoName = "./assets/Open-Status.png"
        } else {
            borderColor = "border-t-3 border-purple-500";
            logoName = "./assets/Closed- Status .png"
        }

        if (element.priority == "high") {
            badgeColor = "badge-error"
        } else if (element.priority == "medium") {
            badgeColor = "badge-warning"
        } else {
            badgeColor = "badge-neutral"

        }

        const cardSectionOn = document.createElement('div')

        cardSectionOn.innerHTML = `
    <div class=" ${borderColor}  card w-72 bg-base-100 card-md shadow-sm">
            <div class="flex justify-between items-center pt-5 pr-5 pl-5">
                <img src="${logoName}" alt="">
                <div class="font-bold badge ${badgeColor}">${element.priority}</div>
            </div>
            <div class="card-body">
                <h2 id="title" onclick="openModal(${element.id})" class="card-title">${element.title}</h2>
                <p class="line-clamp-2" >${element.description}</p>
                <div class="flex gap-1">
                     ${labelsHTML}
                </div>
                <hr>

                <div>
                    <p>#1 by ${element.author}</p>
                    <p class="mt-1">${element.createdAt}</p>
                </div>

            </div>
        </div>
    `


        cardSection.append(cardSectionOn)
    });




}


all() 