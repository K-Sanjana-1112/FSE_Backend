const Movie = require('../Model/movieModel');
const Ticket=require('../Model/ticketModel')

const addMovie = async (data) => {
    try {
        let movie = await Movie.create(data)
        return ({ message: "Movie added Succesfully", movie })
    } catch (error) {
        res.status(500).json({ error: 'Error adding movie' });
    }

}

const getMovies = async () => {
    try {
     let movies=await Movie.find()
     return ({message:"All movies",movies})
    } catch (error) {
        res.status(500).json({ error: 'Error getting movies' });
    }
}

const searchMovie = async (name) => {
    try {
     let movies=await Movie.find({movieName: new RegExp(name,'i')})
     return ({message:"All movies",movies})
    } catch (error) {
        res.status(500).json({ error: 'Error searching movies' });
    }
}

const updateTicketStatus = async (data) => {
    try {
        let movie = await Movie.findOne({ movieName:data.moviename})
        if (!movie) {
            return ({ error: 'Movie not found' });
        }
        let status= movie.availableTickets-=data.tickets
        if (status<=0) {
            movie.status = 'SOLD OUT';
        } else {
            movie.status = 'BOOK ASAP';
        }
        await movie.save();
        return ({message:`${movie.status}`,movie})
    } catch (error) { 
        return ({ error: 'Error in updating ticket status' });

    }
}

const deleteMovie=async(data)=>{
    try{
        let movie=await Movie.findByIdAndDelete({_id:data.id},{movieName:data.moviename})
        return ({message:"Movie deleted Successfully",movie})
    }catch(error){;
    return ({ error: 'Error in deleting movie' });
      
    }
}

module.exports = {
    addMovie,
    getMovies,
    searchMovie,
    updateTicketStatus,
    deleteMovie
}