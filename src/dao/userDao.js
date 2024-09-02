const UserModel = require('../Model/userModel');
const Admin=require('../Model/adminModel')
const jwt = require('jsonwebtoken');
const bcryptjs = require('bcryptjs')
require('dotenv').config()

// create User-register
const createUser = async (data) => {
  let user = data;
  if(data.password!==data.confirmPwd){
    return ({message:"Passwords do not match"})
  }
  let hashedPwd = await bcryptjs.hash(user.password, 5);
 if(user.role=='admin'){
    let newAdmin={
      email:user.email,
      password:hashedPwd,
      role:user.role

    }
    Admin.create(newAdmin)
    return ({message:"Admin Created Successfully",newAdmin})
  }
   let newUser = {
    firstName:user.firstName,
    lastName:user.lastName,
    email:user.email,
    loginId:user.loginId,
    password:hashedPwd,
    contactNum:user.contactNum,
    role:user.role
   }
  UserModel.create(newUser);
  return ({message:"User Created Successfully",newUser})
};

// user-login
const loginUser = async (email, password,role) => {
  try {

    let mail = email
    let pwd = password
    // check email or login Id
    if(role=='user'){
    let userfromdb = await UserModel.findOne({ email: mail })
    if (userfromdb === null) {
      return ({ message: "Invalid Email or Password" })
    }
    // check password
      let result = await bcryptjs.compare(pwd, userfromdb.password)
      if (result === false) {
        return  ({ message:"Invalid Password"})
      } else {
        let signedPwd = jwt.sign({ email: userfromdb.email,role:userfromdb.role},process.env.SECRET_KEY, { expiresIn: 50 })
        return ({ message:"Login Success",token: signedPwd,userfromdb })
      }

    }else{
      let admin=await Admin.findOne({email:mail})
      let result = await bcryptjs.compare(pwd, admin.password)
      if (result === false) {
        return  ({ message:"Invalid Password"})
      } else {
        let signedPwd = jwt.sign({ email: admin.email,role:admin.role},process.env.SECRET_KEY, { expiresIn: 50 })
        return ({ message:"Login Success",token: signedPwd,admin })
      }

    }
   
  }catch (error) {
    return ({ error: 'Error During Login' })

  }

}

const resetPwd = async (loginId,password,confirmPwd) => {
  if(password!==confirmPwd){
    return ({message:"Passwords do not match"})
  }
  let hashedPwd = await bcryptjs.hash(password, 5);
  let user = await UserModel.findOneAndUpdate({ loginId: loginId },{password:hashedPwd},{new:true})
  if (user === null) {
    return ({ message: "No user found with the given Email address " })
  }else{
    return ({message:"Password Updated Successfully",user})
  };
}




module.exports = {
  createUser,
  loginUser,
  resetPwd
};