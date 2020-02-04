/** File only executed once to seed the book data base.
 * execute Book.deleteMany({}); before run the file.
 */


const Book = require('./models/book');
const csv = require('csv-parser');
const fs = require('fs');
const results = [];


require('dotenv').config();
require('./config/database');

function done() {
    return new Promise((resolve, reject) => {
        fs.createReadStream('books.csv')
          .pipe(csv())
          .on('data', (data) =>{
        
            // if the book has more than one author
            if (data.author.split(',').length >= 2) {
                const authors = data.author.split(',');
                authors.forEach( (author, i) => {
                    authors[i] = author.trim();
                });
                data.author = authors;
                data.year = parseInt(data.year);
        
                //console.log(data.author);
            } else  {
                data.author = [data.author];
                data.year = parseInt(data.year);
            }
              results.push(data);
            })
          .on('end',  () => {
              resolve(results);
        });
});
}

async function get() {
    const rest = await done().then(res =>{

        // console.log(res)
        // const book = new Book(res);
        // book.save().then(() => console.log('meow'))
        // .catch(err => console.log(err));

        Book.insertMany(res).then(() => console.log('done'))
        .then(()=> process.exit()) // end process to avoid terminal from hanging.
        .catch((err) => console.log('errr')); 
        console.log('blah');
        //process.exit();
    });
    //console.log(rest);
}

get();