const express=require("express")
const app = express()
const Port = 3000
const Movie=require('./Model/movie')

//mongoose
const mongoose=require("mongoose")
mongoose.set("strictQuery",false)

 const dbURL="mongodb://localhost:27017/movies"
 mongoose.connect(dbURL).then(()=>{
    console.log('connected to database');
 })

//setting up the view engine
app.set("view engine","ejs")

//body parser
app.use(express.urlencoded())  //extend:true for nested objects

app.get('/addMovie',(req,res)=>{
    res.render("addMovies")
})

app.get('/:id',async(req,res)=>{
    let movies = await Movie.findById(req.params.id)
    res.render("view",{movies})
})

app.get('/',async(req,res)=>{
    let movies = await Movie.find()
    res.render("home",{movies})
})




app.post('/',async(req,res)=>{

//adding data to the model
    let movieData = new Movie({
        title:req.body.title,
        rating:req.body.rating,     //its used to request the body
        description:req.body.description,
        trailer:req.body.trailer
        
    })
    try{
          movieData.save()
        res.redirect("/")
    }catch(e){
        res.render('addMovie')
    }
})

app.listen(Port,()=>{
    console.log("listening at port",Port);
})