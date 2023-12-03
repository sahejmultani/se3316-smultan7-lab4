const mongoose=require("mongoose")
const mongoUrl = 'mongodb+srv://sahejmultanii:q6qtkBxpjm6h3xFX@cluster0.3nqb6ko.mongodb.net/?retryWrites=true&w=majority';

mongoose.connect(mongoUrl)
  .then(() => console.log('Database connected'))
  .catch((error) => console.error('Database not connected', error));



const newSchema=new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    email:{
        type:String, //add unique?
        required:true
    },
    password:{
        type:String,
        required:true
    }
})

const collection = mongoose.model("collection",newSchema)

module.exports=collection