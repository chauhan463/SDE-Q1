const mongoose = require("mongoose");
const prompt = require('prompt-sync')();
const { Insert_10_Entries, Insert_Manual_Entry, transferMongoToSQL } = require("./InsertEntries");
const { sqlConnect } = require('./sqlConnect');

// Connect MongoDB Database 
const MongoURI = "mongodb://127.0.0.1:27017/LibraryDB";
const MongoDbConnect = async () => {
    try {
        await mongoose.connect(process.env.MongoURI || MongoURI, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        })
        console.log("MongoDB Database Connected\n");

        console.log("Instructions\n1. Give Input of 1 for inserting 10 values in mongoDB\n2. Give Input of 2 giving manual input. If no input given for any key, it will take random value\n3. Give Input of 3 for transferring whole mongoDB data to MySQL.\n4. Give Input of 0 for exiting the program.\n")

        while (true) {
            const cond = prompt("Give Input => ")
            if (cond == 1) {
                await Insert_10_Entries();
            }
            else if (cond == 2) {
                console.log("If no input provided in any of field, it will take input same as key");

                let ISBN = prompt("ISBN ? ");
                let Accession_No = prompt("Accession_No ? ");
                let title = prompt("Title ? ");
                let author = prompt("Author ? ");
                let publisher = prompt("Publisher  => ");
                let edition = prompt("Edition ? ");
                let yearOfPublication = prompt("Year of publication ? ");
                let category = prompt("Category ? ");
                let totalPages = prompt("Total Pages ? ");
                let price = prompt("Price ? ");

                await Insert_Manual_Entry(ISBN, Accession_No, title, author, publisher, edition, yearOfPublication, category, totalPages, price)
            }
            else if (cond == 3) {
                await transferMongoToSQL();
            }
            else if (cond == 0) {
                process.exit(0);
            }
        }
    } catch (err) {
        console.log(err.message);

        // Exit Process with Failure
        process.exit(1);
    }
}

sqlConnect();
MongoDbConnect();
