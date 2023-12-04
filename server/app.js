//unauth, auth, and admin should have seperate endpoints

const express = require("express")
const collection = require("./mongo")
const cors = require("cors")
const app = express()
const fs = require('fs')

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cors())


//loading json files and combining them to be used for searches
const file1Content = fs.readFileSync('superheroes/superhero_info.json', 'utf-8');
const heroInfo = JSON.parse(file1Content);
const file2Content = fs.readFileSync('superheroes/superhero_powers.json', 'utf-8');
const heroPowers = JSON.parse(file2Content);

const combinedSuperheroes = heroInfo.map(infojsonHero => { //array of combined heros and info
    const matchingHero = heroPowers.find(powerjsonHero => powerjsonHero.hero_names === infojsonHero.name);
    const { hero_names, ...restOfHero2 } = matchingHero || {};
    return matchingHero ? { ...infojsonHero, ...restOfHero2 } : infojsonHero;
  }); 

//function to get the true powers of a hero
function getPowers(){} //may have to use power json

app.get("/unauth/searchByName", (req,res)=>{ //unauth search by name---------- CHANGE SO ENDPOINT WORKS FOR RACE, NAME, POWER, PUBLISHER
    const searchName = req.query.name;

    if(!searchName){
        return res.status(400).json({ error: "Name parameter is required" });
    }

    const searchResults = combinedSuperheroes.filter(hero =>
        hero.name.toLowerCase().includes(searchName.toLowerCase())
      );
    
      res.status(200).json({ results: searchResults });
});



app.get("/",cors(),(req,res)=>{

})

//add get method to retrieve all superheros insomnia

app.post("/login",async(req,res)=>{
    const{email,password}=req.body

    try{
        const check=await collection.findOne({email:email})

        if(check){
            res.json("exist")
            
        }
        else{
            res.json("notexist")
        }

    }
    catch(e){
        res.json("fail")
    } 

})



app.post("/signup",async(req,res)=>{
    const{name, email,password}=req.body

    const data={
        name: name,
        email:email,
        password:password
    }

    try{
        const check=await collection.findOne({email:email})

        if(check){
            res.json("exist")
        }
        else{
            res.json("notexist")
            await collection.insertMany([data])
        }

    }
    catch(e){
        res.json("fail")
    }

})

app.listen(8000,()=>{
    console.log("port connected");
})

