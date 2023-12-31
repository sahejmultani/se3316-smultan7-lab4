//unauth, auth, and admin should have seperate endpoints

const express = require("express")
const {collection, List} = require("./mongo")
const cors = require("cors")
const app = express()
const fs = require('fs')
const bcrypt = require('bcrypt')

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
        hero.Race.toLowerCase().includes(race.toLowerCase())
      );
    }
  
    if (publisher) {
      searchResults = searchResults.filter((hero) =>
        hero.Publisher.toLowerCase().includes(publisher.toLowerCase())
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
        const checkUser=await collection.findOne({email:email}) 
        const passwordMatch = await bcrypt.compare(password, checkUser.password);

        if(email =="admin@admin.com" && password =="admin"){
            res.json("admin")
        }

        else if (checkUser.deactivated) {
          res.json('deactivated');
        }

        else if(!checkUser){
            res.json("notexist")
        }
        
         else if(checkUser && passwordMatch){
            res.json("exist")
            
            
        }
        
        else{
            res.json("Invalid password")
        }

    }
    catch(e){
        res.json("fail")
    } 

}) 




app.post("/signup",async(req,res)=>{
    const{name, email,password}=req.body

    const saltRounds = 12;
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    const data={
        name: name,
        email:email,
        password:hashedPassword
    }

    try{
        const check=await collection.findOne({email:email})

        if(!name || !email || !password){
            res.json('invalidcred')
        }

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

app.get("/api/top-lists", (req, res) => {
  try {
      const allUserLists = userLists.map((user) => user.lists).flat();
      const topLists = allUserLists.slice(0, 10);
      console.log("Top Lists:", topLists); // Log the top lists
      res.status(200).json({ lists: topLists });
  } catch (error) {
      console.error("Fetching top lists failed:", error.message);
      res.status(500).json({ error: "Internal Server Error" });
  }
});


//          FOR AUTHORIZED USER

app.get("/authorized/search", (req, res) => {
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
        hero.Race.toLowerCase().includes(race.toLowerCase())
      );
    }
  
    if (publisher) {
      searchResults = searchResults.filter((hero) =>
        hero.Publisher.toLowerCase().includes(publisher.toLowerCase())
      );
    }
  
    if (powers) {
      searchResults = searchResults.filter((hero) =>
        hero.powers.some((power) => power.toLowerCase().includes(powers.toLowerCase()))
      );
    }
  
    res.status(200).json({ results: searchResults });
  });


  // Endpoint to create a new list

  
let userLists = JSON.parse(fs.readFileSync("superheroes/user_lists.json", "utf-8"));

app.post("/api/create-list", (req, res) => {
  const { userID, listName, isPrivate } = req.body;

  const user = userLists.find((user) => user.id === userID);

  if (!user) {
    return res.status(404).json({ success: false, message: "User not found" });
  }

  const newListId = user.lists.length + 1;

  user.lists.push({
    listId: newListId,
    listName: listName,
    superheroes: [],
    private: isPrivate || false,
  });

  fs.writeFileSync("user_lists.json", JSON.stringify(userLists, null, 2), "utf-8");

  res.status(200).json({ success: true, message: "List created successfully", listId: newListId });
});

app.post("/api/add-superhero/:listId", (req, res) => {
  const { listId } = req.params;
  const { superheroName } = req.body;

  const list = userLists.flatMap((user) => user.lists).find((list) => list.listId == listId);

  if (!list) {
    return res.status(404).json({ success: false, message: "List not found" });
  }

  list.superheroes.push(superheroName);
  fs.writeFileSync("user_lists.json", JSON.stringify(userLists, null, 2), "utf-8");

  res.status(200).json({ success: true, message: "Superhero added successfully", superhero: superheroName });
});

app.get("/api/user-lists/:userID", (req, res) => {
  const { userID } = req.params;

  const user = userLists.find((user) => user.id === userID);

  if (!user) {
    return res.status(404).json({ success: false, message: "User not found" });
  }

  res.status(200).json({ lists: user.lists });
});



// Add this route to fetch all users
app.get('/admin/all-users', async (req, res) => {
  try {
    const allUsers = await collection.find();
    res.status(200).json({ users: allUsers });
  } catch (error) {
    console.error('Fetching all users failed:', error.message);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.patch('/api/deactivate-account/:userId', async (req, res) => {
  const { userId } = req.params;

  try {
    const user = await collection.findOne({ _id: ObjectId(userId) });

    if (!user) {
      return res.status(404).json({ success: false, message: 'User not found' });
    }

    // Deactivate the user account
    user.deactivated = true;
    await user.save();

    res.status(200).json({ success: true, message: 'Account deactivated successfully' });
  } catch (error) {
    console.error('Deactivating account failed:', error.message);
    res.status(500).json({ success: false, message: 'Internal Server Error' });
  }
});
