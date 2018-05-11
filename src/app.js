//Importar las dependecias para configurar mi servidor
const express = require('express')
const bodyParser = require('body-parser')
const {characters} = require('./data/characters')
const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));




//TODO  Temporally we storage all data in this place  but you should change this for DB Query's
let data = [];


app.get('/', (req, res) => {
    res.status(200).send("<h1>Conectado al puerto 3000</h1>");
});


console.log("")

app.get("/next", (req, res) => {
    //TODO You should consult this data in your DB and return two random elements        
        let match1 = Math.floor((Math.random() * 4));
        let match2 = match1;
        while (match1 === match2) {
            match2 = Math.floor((Math.random() * 4));
            console.log("****MATCH****");
            console.log("match 1: ", match1);
            console.log("match 2: ", match2);
            if (match1 === match2) {console.log("MATCH REPEAT")}
        }
        res.send({
            first: data[match1],
            second: data[match2],
        })
 });


function search(nameKey, myArray){
    for (let i=0; i < myArray.length; i++) {
        if (myArray[i].id === nameKey) {
            console.log("FOUND: " + myArray[i].image);
            myArray[i].likes=myArray[i].likes+1;
            console.log("FOUND: " + myArray[i].likes);
            return myArray[i];
        }
    }
}
//Vote for a element - increment this likes count and save this change into DB
app.post("/vote", (req, res) => {
    //id of the item that the user chooses
    const {id} = req.body
    var resultObject = search(id, characters);
    
    if(id) {
        search(id,characters) 
        res.status(200).json({error: 'id found'})
    }else if (!id) {
        res.status(400).json({error: 'id is required'})
    } else {

        // TODO search the character and update their likes count
        // TODO Don't forget save this data in your DB
        res.status(404).json({error: 'Object not found'})

    }
});


const loadInitialData = () => {
    //TODO You should load this data and save it in your DB
    //if you have to retrieve this data from a API you can do these request here and dont forget format the data before to storage in your DB
    data = characters
}
loadInitialData()


const newPort = process.env.PORT || 3000

app.listen(newPort, function () {
    console.log('Server listening on port: ' + newPort)
});