
const exp = require('express');
const movieApp = exp.Router();
const {addMovie,getMovies,searchMovie,updateTicketStatus,deleteMovie} = require('../controllers/movieController');
const {verifyToken,isAdmin}=require('../Middlewares/verifytoken')


movieApp.post('/add',verifyToken,isAdmin,addMovie);

movieApp.get('/all',verifyToken,getMovies);

movieApp.get('/movies/search/:moviename',verifyToken,searchMovie);

movieApp.put('/:moviename/update/:ticket', verifyToken,isAdmin,updateTicketStatus)

movieApp.delete('/:moviename/delete/:id',verifyToken,isAdmin,deleteMovie)


module.exports=movieApp