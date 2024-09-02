const mongoose=require('mongoose')

//create Schema

const movieSchema=new mongoose.Schema({
    movieName:{
        type:String,
        required:true
    },
    theatreName:{
        type:String,
    },
    totalSeats:{
        type:Number,
        required:true
    },
    availableTickets:{
        type:Number,
    },
    status:{
        type:String,
        default:'BOOK ASAP'

    }



})
  
const MovieModel=mongoose.model('Movie',movieSchema)

module.exports=MovieModel