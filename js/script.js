// Appending the search container
const modalContainer = document.querySelector('.modal-container')
modalContainer.style.display = 'none'
const modalInfoContainer = document.querySelector('.modal-info-container')
const searchContainer = document.querySelector('.search-container')
const search = document.querySelector('.search-container form')
const closeButton = document.querySelector('.modal-close-btn')
const nextButton = document.getElementById('modal-next')
const prevButton = document.getElementById('modal-prev')

// Creating an asyn function which fetches 12 users randomly from randomuser external API. The result is passed to createUserHTML function which is an array.
let employeeArray = []
let filteredArray = []
async function getUsers() {
    const response = await fetch('https://randomuser.me/api/?results=12')
    const user = await response.json()
    employeeArray = user.results
    createUserHTML(employeeArray)
}



getUsers()

// Adding the search functionality

searchContainer.innerHTML = `
<form action="#" method="get">
    <input type="search" id="search-input" class="search-input" placeholder="Search...">
    <input type="submit" value="&#x1F50D;" id="search-submit" class="search-submit">
</form>
`
const searchInput = document.getElementById('search-input')
const searchSubmit = document.getElementById('search-submit')
searchInput.addEventListener('keyup', (e) => {
    filteredArray = employeeArray.filter(function(employee) {
        let fullName = `${employee.name.first} ${employee.name.last}`
        fullName = fullName.toLowerCase()
        const bool = fullName.includes(e.target.value.toLowerCase())
        return bool 
    })
    
    createUserHTML(filteredArray)
})

searchInput.addEventListener('click', (e) => {
    if (e.target.value === '')
    createUserHTML(employeeArray)
})

// Appending random users to gallery div

const gallery = document.getElementById('gallery')
function createUserHTML(arr) {
    gallery.innerHTML = ''
    arr.map(user => {
        const html = `
        <div class="card" data-username="${user.login.username}">
            <div class="card-img-container">
                <img class="card-img" src="${user.picture.medium}" alt="profile picture">
            </div>
            <div class="card-info-container">
                <h3 id="name" class="card-name cap">${user.name.first} ${user.name.last}</h3>
                <p class="card-text">${user.email}</p>
                <p class="card-text cap">${user.location.city}, ${user.location.state}</p>
            </div>
        </div>
        `
        gallery.insertAdjacentHTML('beforeend', html)
    })
}

// Appending the modal to the body and adding event listeners

gallery.addEventListener('click', (e) => {
    if (e.target.closest('.card') === null) {
        return 
    }
    const closetElement = e.target.closest('.card').dataset.username
    const employee = employeeArray.find(el => el.login.username === closetElement)
    modalContainer.style.display = 'block'
    addHTML(employee)
})

closeButton.addEventListener('click', () => {
    modalContainer.style.display = 'none'
})

// Adding the event listeners to next and previous buttons

nextButton.addEventListener('click', () => {
    const email = document.querySelector('.modal-text').textContent
    let newArray = []
    if (filteredArray.length > 0) {
        newArray = filteredArray
    } else {
        newArray = employeeArray
    }
    const user = newArray.find(el => el.email === email)
    const index = newArray.indexOf(user)
    let nextIndex
    if (index === newArray.length - 1) {
        return 
    } else {
        nextIndex = index + 1
    }
    const employee = newArray[nextIndex]
    addHTML(employee)
    
})

prevButton.addEventListener('click', () => {
    const email = document.querySelector('.modal-text').textContent
    let newArray = []
    if (filteredArray.length > 0) {
        newArray = filteredArray
    } else {
        newArray = employeeArray
    }
    const user = newArray.find(el => el.email === email)
    const index = newArray.indexOf(user)
    let nextIndex
    if (index === 0) {
        return 
    } else {
        nextIndex = index - 1
    }
    const employee = newArray[nextIndex]
    addHTML(employee)
    
})

function addHTML(employee) {
    const html = `
    <img class="modal-img" src="${employee.picture.large}" alt="profile picture">
    <h3 id="name" class="modal-name cap">${employee.name.first} ${employee.name.last}</h3>
    <p class="modal-text">${employee.email}</p>
    <p class="modal-text cap">${employee.location.city}</p>
    <hr>
    <p class="modal-text">${employee.phone}</p>
    <p class="modal-text">${employee.location.street.number} ${employee.location.street.name}, ${employee.location.city}, ${employee.location.postcode}</p>
    <p class="modal-text">Birthday: ${employee.dob.date.slice(0, 10)}</p>
    `
    modalInfoContainer.innerHTML = html
}


