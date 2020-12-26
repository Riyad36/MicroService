//load express
const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const axios = require("axios")

app.use(bodyParser.json());

//load mongoose
const mongoose = require("mongoose");
const { networkInterfaces } = require("os");

require("./Rating")
const Rating = mongoose.model("Rating")

//connect the application
mongoose.connect("mongodb+srv://riyad_muhafiz:Riyad_36@cluster0.65k4z.mongodb.net/<dbname>?retryWrites=true&w=majority", () =>{
    console.log("Database is connected!")
})



//create a rating-----------------------------------------------

app.post("/rate", (req, res) => {

    //creating an object and getting all the values where it is created(postman)
    var newRating = {
        productId: req.body.productId,
        raterId: req.body.raterId,
        rating: req.body.rating
    }

    //creating new rating using all the attributes

    var rating = new Rating(newRating)

    rating.save().then(() => {

        console.log("New rating has been created to the database!")
    }).catch((err) => {

        if(err){
            throw err;
        }
    })
    res.send("new rating created successfully!");

})




//get all the ratings ---------------------------------------------

app.get("/rate", (req, res) => {
    Rating.find().then((Rating) => {
        res.json(Rating)
    }).catch(err => {
        if(err){
            throw err;
        }
    })

} )



//get a single rating------------------------------------------------

app.get("/rate/:id", (req, res) => {
    Rating.findById(req.params.id).then((Rating) => {

         if(Rating){
             res.json(Rating)
         }
         else{
              res.sendStatus(404);
         }
    }).catch(err => {
        if(err){
            throw err;
        }
    })
})



// now we will fetch the list of products from here

// app.get("/product/list", (req, res) =>{

//     axios.put("http://localhost:5555/product/list")  
//     }).catch(err => {
//         if(err){
//             throw err;
//         }
//     })

// } )






app.listen(4545, () => {
    console.log("program is running!");
})
