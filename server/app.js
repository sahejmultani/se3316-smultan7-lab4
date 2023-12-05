//unauth, auth, and admin should have seperate endpoints

const express = require("express")
const collection = require("./mongo")
const cors = require("cors")
const app = express()
const fs = require('fs')

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cors())

/* 
            used for superhero data and searching
*/
const readInfo = fs.readFileSync('superheroes/superhero_info.json', 'utf-8');
const infoJSON = JSON.parse(readInfo);
const readPowers = fs.readFileSync('superheroes/superhero_powers.json', 'utf-8');
const powersJSON = JSON.parse(readPowers);

const superheroPowers = powersJSON.map((hero) => { //gets powers of each here and returns [{hero_name: , powers: []},]
  const { hero_names, ...powers } = hero;
  const trueAbilities = Object.entries(powers)
    .filter(([key, value]) => key !== 'hero_names' && String(value).toLowerCase() === 'true')
    .map(([key]) => key);

  return {
    hero_names,
    abilities: trueAbilities,
  };
});

//combines data from info json and the superheroPowers object array
const completeHeroInfo = infoJSON.map((hero) => { 
  const matchingPowers = superheroPowers.find((powers) => powers.hero_names === hero.name);

  return {
    ...hero,
    powers: matchingPowers ? matchingPowers.abilities : [],
  };
});





app.get("/unauth/search", (req, res) => {
    const { name, race, publisher, powers } = req.query;
  
    // Check if at least one search parameter is provided
    if (!name && !race && !publisher && !powers) {
      return res.status(400).json({ error: "At least one search parameter is required" });
    }
  
    let searchResults = [...completeHeroInfo];
  
    // Filter based on the provided parameters
    if (name) {
      searchResults = searchResults.filter((hero) =>
        hero.name.toLowerCase().includes(name.toLowerCase())
      );
    }
  
    if (race) {
      searchResults = searchResults.filter((hero) =>
        hero.race.toLowerCase().includes(race.toLowerCase())
      );
    }
  
    if (publisher) {
      searchResults = searchResults.filter((hero) =>
        hero.publisher.toLowerCase().includes(publisher.toLowerCase())
      );
    }
  
    if (powers) {
      searchResults = searchResults.filter((hero) =>
        hero.powers.some((power) => power.toLowerCase().includes(powers.toLowerCase()))
      );
    }
  
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

