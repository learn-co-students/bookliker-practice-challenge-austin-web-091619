document.addEventListener("DOMContentLoaded", function() {
    const url = "http://localhost:3000/books"
    const bookList = document.getElementById("list")
    const showPanel = document.getElementById("show-panel")
    const thisUser = {"id":1, "username":"pouros"}
    
    
    
    fetchBooks().then(renderBooks)
    
    function fetchBooks(){
        return fetch(url)
        .then(r => r.json())
    }
    
    function renderBooks(books){
        books.forEach(book => {
            let li = document.createElement("li")
            li.innerText = book.title
            li.dataset.id = book.id
            bookList.appendChild(li)
            li.addEventListener("click", showBook)
            
        })
    }



    function showBook(event){
        const currentBookId = event.target.dataset.id
        
        fetch(`http://localhost:3000/books/${currentBookId}`)
        .then(r => r.json())
        .then(book => {
            showPanel.innerHTML = `
            <h1>${book.title}</h1>
            <img src=${book.img_url}>
            <p>${book.description}</p>
            <ul data-id=${book.id}><ul>
            <button data-id=${book.id}>Read Book</button>
            `

        
            let button = showPanel.getElementsByTagName("button")
            button = button[0]
            button.addEventListener("click", markRead)
            book.users.forEach(user => {
                let li = document.createElement("li")
                li.innerText = user.username
                li.dataset.id = user.id
                showPanel.append(li)
            })
        })
    }

    // get book id
    // check if user id is already there
    // if it is show alert message
    // if it's not push into users array
    function markRead(event){
        let bookTarget = event.target.dataset.id
        

        fetch(`http://localhost:3000/books/${bookTarget}`)
        .then(r => r.json())
        .then(book => {
            
            if (book.users.find(user => user.id === 1)){
                window.alert("You read this already.");
            }else {
                bookPatch(book)
            }
    })
}
    function bookPatch(book){
    let userList = book.users
    userList.push(thisUser)
    console.log(userList)
        fetch(`http://localhost:3000/books/${book.id}`, {
            method: "PATCH",
            body: JSON.stringify({"users": userList}),
            headers: {"Content-Type": "application/json",
                        "Accept": "application/json"}
        })
        .then(r => r.json())
        .then(updatePage => {
            let li = document.createElement("li")
            li.innerText = thisUser.username
            li.dataset.id = thisUser.id
            showPanel.append(li)
        })
        
    }
});
