const mongoose = require('mongoose')

const URI = `mongodb://${process.env.DB_HOST}:${process.env.DB_PORT}/${process.env.DB_NAME}`
console.log(URI) 

mongoose.connect(URI , {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => {
    console.log('Connection successful!');
}).catch(() => {
    console.log('Connection failed!');
})