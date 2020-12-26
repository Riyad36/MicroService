//load express
const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const  mongoose  = require("mongoose");
app.use(bodyParser.json());

mongoose.connect("mongodb+srv://Riyad:Product_101@cluster0.65k4z.mongodb.net/ProductService?retryWrites=true&w=majority", () =>{
    console.log("Product database is connected!")
})


//loading the model
require("./product")
const Product = mongoose.model("Product")



//create a product

app.post("/product/add", (req, res) => {

    //creating an object and getting all the values where it is created(postman)
    var newProduct = {
        name: req.body.name,
        categoryId: req.body.categoryId,
        categoryName: req.body.categoryName,
        averageRating: req.body.averageRating,
        numberOfRaters: req.body.numberOfRaters
    }

    //creating new product using all the attributes
    var product = new Product(newProduct)

    product.save().then(() => {

        console.log("New product has been created to the database!")
    }).catch((err) => {

        if(err){
            throw err;
        }
    })
    res.send("new Product created successfully!");

})


//get all the ratings

app.get("/product/list", (req, res) => {
    Product.find().then((Product) => {
        res.json(Product)
    }).catch(err => {
        if(err){
            throw err;
        }
    })

} )

//get a single rating

app.delete("/product/remove/:id", (req, res) => {
    Product.findOneAndRemove(req.params.id).then((Rating) => {

         res.send("Product is deleted")
    }).catch(err => {
        if(err){
            throw err;
        }
    })
})






app.listen(5555, () => {
    console.log("Product is running!");
})