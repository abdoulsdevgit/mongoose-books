const mongoose = require('mongoose');
const url = process.env.DATABASE_URL;

mongoose.connect(url, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
});

const db = mongoose.connection;

db.on('connected', ()=> console.log('connected'));