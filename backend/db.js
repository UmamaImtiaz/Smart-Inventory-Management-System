const mongoose = require('mongoose');

const connectDB = async () => {

try {

const conn = await mongoose.connect(
    'mongodb+srv://umamaimtiaz:project123@cluster1.rluuk.mongodb.net/pinventdb?retryWrites=true&w=majority&appName=Cluster1', );
   

console.log('MongoDB Connected');
}

catch (error) {
console.error(error);
process.exit(1);
}
};

module.exports = connectDB;