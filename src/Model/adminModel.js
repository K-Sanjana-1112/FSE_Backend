const mongoose=require('mongoose')

//create Schema

const adminSchema=new mongoose.Schema({ 
    email:{
        type:String,
        unique:true,
        required:[true,'email is required'],
    },
    password:{
        type:String,        
        required:[true,'password is required'],
    },
    confirmPwd:{
        type:String,
    },
    role:{
        type:"string",
        required:true
    }


})
  
const AdminModel=mongoose.model('admin',adminSchema)

module.exports=AdminModel;