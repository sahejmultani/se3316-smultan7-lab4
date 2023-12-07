const mongoose=require("mongoose")
const bcrypt = require("bcrypt");

const mongoUrl = 'mongodb+srv://sahejmultanii:q6qtkBxpjm6h3xFX@cluster0.3nqb6ko.mongodb.net/?retryWrites=true&w=majority';

mongoose.connect(mongoUrl)
  .then(() => console.log('Database connected'))
  .catch((error) => console.error('Database not connected', error));


  const listSchema = new mongoose.Schema({
    name: {
      type: String,
      required: true
    },
    superheroes:[String],
  });

const newSchema=new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    email:{
        type:String, 
        required:true,
        unique: true
    },
    password:{
        type:String,
        required:true
    },
    lists: [listSchema],
});

newSchema.pre('save', async function (next) { //hashing password
    try {
      if (this.isModified('password')) {
        const salt = await bcrypt.genSalt(12);
        this.password = await bcrypt.hash(this.password, salt);
      }
      next();
    } catch (error) {
      next(error);
    }
  });

const collection = mongoose.model("collection",newSchema)
const List = mongoose.model("List", listSchema);
module.exports={collection,List}