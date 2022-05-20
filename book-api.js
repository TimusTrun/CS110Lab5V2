const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const path = require('path');
const { redirect } = require('express/lib/response');

const app = express();
const port = 3000;

// Where we will keep books
let books = [];

app.use(cors());

//Configuring body parser middleware
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

app.get('/', (req,res) =>{
    res.sendFile(path.join(__dirname, './new-book.html'));
});

app.post('/book', (req, res) => { 
    const book = req.body;
    console.log(book);
    books.push(book);
    console.log('Book is added to the database');
    res.redirect('/viewBooks');
});

app.get('/books', (req,res) => {
   res.json(books); 
});

app.get('/viewBooks', (req,res) => {
    res.sendFile(path.join(__dirname, './book-list.html'));

});

app.get('/book-list.js', (req,res) =>{
    res.sendFile(path.join(__dirname, './book-list.js'))
});

//edit book 
app.post('/book/:isbn', (req,res) => {
    //reading isbn from the URL
    const isbn = req.params.isbn;
    const newBook = req.body;

    //remove item form books array
    for (let i = 0; i < books.length; i++){
        let book = books[i];

        if (book.isbn === isbn){
            books[i] = newBook;
        }
    }

    //sending 404
    console.log('Book is edited');
    res.redirect('/viewBooks');
});

//delete book
app.delete('/book/:isbn', (req,res) => {
    const isbn = req.params.isbn;

    for(let i = 0; i < books.length; i++){
        let book = books[i];

        if (book.isbn === isbn){
            books.splice(i,1);
        }
    }
    console.log("Book deleted");
    setTimeout(() => {
        res.redirect(303, '/viewBooks'); 
    }, 500);
});

//Get request for edit and delete post functions
app.get('/book/:isbn', (req,res) => {
    const isbn = req.params.isbn;

    for(let i = 0; i < books.length; i++){
        let book = books[i];

        if (book.isbn === isbn){
            res.json(book);
        }
    }
});

app.listen(port, () => console.log('Hello world app listening on port'));