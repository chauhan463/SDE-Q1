const Book = require('./Book');
const { v4: uuidv4 } = require('uuid');
const mysql = require('mysql');
const { connection } = require('./sqlConnect')

const getAccesionNo = () => {
    const date = new Date();
    const year = date.getFullYear().toString();
    const month = date.getMonth() < 10 ? '0' + date.getMonth() : date.getMonth();
    const date1 = date.getDate() < 10 ? '0' + date.getDate() : date.getDate();
    let Accession_No = date1 + month + year + Math.floor(1000 + Math.random() * 9000)
    return Accession_No
}

function getRandomArbitrary(min, max) {
    return Math.random() * (max - min) + min;
}

const Insert_10_Entries = async () => {
    for (let i = 1; i <= 10; i++) {

        const categoryArray = ["Java", "Python", "DBMS", "C"];

        let ISBN = uuidv4();
        let Accession_No = getAccesionNo();
        let title = 'title' + i.toString();
        let author = 'author' + i.toString();
        let publisher = 'publisher' + i.toString();
        let edition = i;
        let yearOfPublication = 2022;
        let category = categoryArray[Math.floor(Math.random() * categoryArray.length)];
        let totalPages = Math.floor(getRandomArbitrary(500, 1000));
        let price = Math.floor(getRandomArbitrary(300, 800));

        const newBook = new Book({
            ISBN,
            Accession_No,
            title,
            author,
            publisher,
            edition,
            yearOfPublication,
            category,
            totalPages,
            price
        })

        await newBook.save();
    }
    console.log("Initial 10 Books Inserted");
}

const Insert_Manual_Entry = async (ISBN,
    Accession_No,
    title,
    author,
    publisher,
    edition,
    yearOfPublication,
    category,
    totalPages,
    price) => {


    const data = {
        ISBN: ISBN || uuidv4(),
        Accession_No: Accession_No || getAccesionNo(),
        title: title || 'random title',
        author: author || 'random author',
        publisher: publisher || 'random publisher',
        edition: edition || 1,
        yearOfPublication: yearOfPublication || 2022,
        category: category || 'DBMS',
        totalPages: totalPages || 1100,
        price: price || 500
    }

    const newBook = new Book({
        ...data
    })

    await newBook.save();
    console.log("New Book inserted in mongoDB database");

    // console.log(`INSERT INTO books (ISBN,Accession_No,title,author,publisher,edition,yearOfPublication,category,totalPages,price) VALUES ('${data.ISBN}','${data.Accession_No}','${data.title}','${data.author}','${data.publisher}',${data.edition},${data.yearOfPublication},'${data.category}',${data.totalPages},${data.price});`)

    connection.query(`INSERT INTO books (ISBN,Accession_No,title,author,publisher,edition,yearOfPublication,category,totalPages,price) VALUES ('${data.ISBN}','${data.Accession_No}','${data.title}','${data.author}','${data.publisher}',${data.edition},${data.yearOfPublication},'${data.category}',${data.totalPages},${data.price});`, (err) => {
        if (err) {
            throw err;
        }
    })
    console.log("Data Inserted in MySQL database.");

}


const transferMongoToSQL = async () => {
    try {
        const books = await Book.find();

        let data = [];
        books.map((book) => {
            let book1 = { ...book };
            data.push(Object.values(Object.values(book1)[2]).splice(1).slice(0, -1));
        })

        if (data.length > 0) {
            connection.query(`INSERT INTO books (ISBN,Accession_No,title,author,publisher,edition,yearOfPublication,category,totalPages,price) VALUES ? ;`, [data], (err) => {
                if (err) {
                    return console.log(err);
                }
            })
            console.log("Data transferred...");
        }

    } catch (err) {
        console.log(err)
    }
}

module.exports = { Insert_10_Entries, Insert_Manual_Entry, transferMongoToSQL };