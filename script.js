const print = (message) => console.log(message)


//  element get

const issueAmount = document.getElementById('issueAmount')
const allMenu = document.getElementById('allMenu')
const openMenu = document.getElementById('openMenu')
const closeMenu = document.getElementById('closeMenu')

const cardSection = document.getElementById('cardSection')



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
    // print(data)
    print(dataArr)
    issueAmount.innerHTML = totalData

    const cardSectionOn = document.createElement('div')

    cardSectionOn.innerHTML = `
    
    `

    cardSection.append(cardSectionOn)

}


//  Function for open

async function open() {
    const res = await fetch('https://phi-lab-server.vercel.app/api/v1/lab/issues')
    const data = await res.json()
    // print(data.data)

    let filterOpen = data.data.filter((item) => item.status == 'open')
    let statusOpen = filterOpen;
    issueAmount.innerHTML = statusOpen.length
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
}
all()