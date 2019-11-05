let BOOK

document.addEventListener("DOMContentLoaded", function() {
    fetchBooks()
});

function fetchBooks() {
    fetch("http://localhost:3000/books")
    .then(function(response) {
        return response.json()
    }).then(function(books) {
        for (book of books)
            renderBooks(book)
    })
}

function renderBooks(book) {
    let li = document.createElement("li")
    li.innerText = book.title
    li.addEventListener("click", function(cb) {
        BOOK = book
        renderContent()
    })

    const list = document.querySelector("#list")
    list.appendChild(li) 
}

function renderContent(e) {
    let show_panel = document.querySelector("#show-panel")
    show_panel.innerHTML = ''
    
        let title = document.createElement("h4")
        title.innerText = BOOK.title

        let img = document.createElement("img")
        img.src = BOOK.img_url

        let description = document.createElement("p")
        description.innerText = BOOK.description

        let users = document.createElement("div")
        for (let i = 0; i < BOOK.users.length; i++) {
            let user = document.createElement("h4")
            user.innerText = BOOK.users[i].username
            users.appendChild(user)
        }

        let button = document.createElement("BUTTON")
        button.innerText = "Read Book"
        button.addEventListener("click", addUser)

    show_panel.append(title, img, description, users, button)
}

function addUser(e) {
    let pouros = {"id": 1, "username": "pouros"}
    if (JSON.stringify(BOOK.users).includes(JSON.stringify(pouros)))
        window.alert("You already read it!")
    else {
        BOOK.users.push(pouros)
        configObj = {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json"
            },
            body: JSON.stringify({
                "users": BOOK.users
            })
        }
        fetch(`http://localhost:3000/books/${BOOK.id}`, configObj)
        .then((response) => response.json())
        .then(addedUser => renderAddedUser(e, addedUser))
    }
}

function renderAddedUser(e, addedUser) {
    let pouros = document.createElement("h4")
    pouros.innerText = "pouros"
    e.target.parentElement.querySelector("div").appendChild(pouros)
}