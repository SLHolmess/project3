const express = require('express');

// Connect
require('./db.js');

const Book = require('./Book');

const app = express();
const port = 3000;
app.use(express.json())

app.post('/book/create', (req, res) => {
    const newBook = new Book({...req.body});
    newBook.save().then(() => {
          res.send('New Book added successfully!9')
    }).catch((err) => {
         res.status(500).send('Internal Server Error!');
    })
})

app.get('/book/getAll', (req, res) => {
   Book.find().then((books) => {
        if (books.length !== 0) {
              res.json(books)
        } else {
            res.status(404).send('Books not found');
       }
    }).catch((err) => {
         res.status(500).send('Internal Server Error!');
    });
})
app.get('/book/getById/:id', (req, res) => {
    Book.findById(req.params.id).then((book) => {
        if (book) {
           res.json(book)
        } else {
            res.status(404).send('Books not found');
        }
     }).catch((err) => {
        res.status(500).send('Internal Server Error!');
    });
})
app.delete('/book/deleteById/:id', (req, res) => {
    Book.findOneAndRemove(req.params.id).then((book) 	=> {
        if (book) {
             res.json('Book deleted Successfully!')
        } else {
            res.status(404).send('Book Not found!'); 
        }
    }).catch((err) => {
         res.status(500).send('Internal Server Error!');
    });
});

app.listen(port, () => {
     console.log(`Up and Running on port ${port} - This is Book service test1`);
})