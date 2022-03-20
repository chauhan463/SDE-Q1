# SDE Q1 

## Description 
 1) server.js is the main file.
 2) Book.js is the schema for collection 'books' for mongoDB.
 3) InsertEntries.js file contains the function for insert 10 entries, insert a manual entry in mongoDB and MySQL database.



### Prerequisites before running app
1) NodeJS must be installed in your machine.
2) MongoDB compass must be installed in your machine.
3) MySQL must be installed in your machine.


### Installation / Run project locally
1) Clone the repo first in your machine.
2) run command ```npm install``` in your root folder.
3) If you have successfully installed MySQL, then run ```CREATE DATABASE LibraryDB;``` command in MySQL command line.
4) Run command ```use librarydb;``` in MySQL command line.
5) After that, run ```CREATE TABLE IF NOT EXISTS `books` ( ISBN VARCHAR(255), Accession_No VARCHAR(255), title VARCHAR(255), author VARCHAR(255), publisher VARCHAR(255), edition int, yearOfPublication VARCHAR(255), category VARCHAR(255), totalPages int, price int ) ;``` command in MySQL command line.
6) Run server.js file or run command ```node server.js``` in your command prompt.

