const {default: mongoose } = require("mongoose")

const dbConnect = () => {
    try {
        const conn = mongoose.connect('mongodb://localhost:27017/digitic');
        console.log("Database Connected Successfully");
        
    } catch (error) {
        console.log("Database Error");
    }
}

module.exports = dbConnect;