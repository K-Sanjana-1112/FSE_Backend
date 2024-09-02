const ticketDao=require('../dao/ticketDao')

const bookTicket=async(data)=>{
    const ticket=await ticketDao.bookTicket(data);
    return ticket
};



module.exports={
    bookTicket
}