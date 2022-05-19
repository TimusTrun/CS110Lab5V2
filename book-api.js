const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const port = 3000;

// Where we will keep books
let books = [];

app.use(cors());

//Configuring body parser middleware
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

app.post('/book', (req, res) => { 
    const book = req.body;
    console.log(book);
    books.push(book);
    console.log('Book is added to the database');
});

app.get('/books', (req,res) => {
   res.json(books); 
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
    // res.send('Book is edited');
    res.redirect('book-list.html');
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