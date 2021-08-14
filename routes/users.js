const router = require('express').Router()
const User = require('../models/User')
const bcrypt = require('bcrypt')
//register
router.post('/register',async(req,res)=>{
//generate password
const salt = await bcrypt.genSalt(10)
const hashedPasword = await bcrypt.hash(req.body.password,salt)

    const newUser = new User({
        username:req.body.username,
        email:req.body.email,
        password:hashedPasword})
    try {
        const savedUser = await newUser.save()
        const{password, ...other}= savedUser._doc
        res.status(200).json(other)
    } catch (error) {
        res.status(500).json(error)
        console.log("UserCREATE ERROR",error);
    }
})

//login 
router.post('/login',async(req,res)=>{
    
    try {
        //find user
      const user =  await User.findOne({username:req.body.username})
      !user && res.status(400).json("Wrong user name or password")
      //validate password
      const validPassword = await bcrypt.compare(req.body.password,user.password)
      !validPassword && res.status(400).json("Wrong user name or password")
      const{password,...other}=user._doc
      res.status(200).json(other)
    } catch (error) {
        res.status(500).json(error)
        console.log("LOGIN ERROR",error);
    }
})


//get user
router.get('/:id',async(req,res)=>{
    try {
        const user = await User.find(req.params.id)
        res.status(200).json(user)
    } catch (error) {
         res.status(500).json(error)
        console.log("User find ERROR",error);
    }
})


//get all pins
router.get('/',async(req,res)=>{
    try {
        const users = await User.find()
        res.status(200).json(users)
    } catch (error) {
         res.status(500).json(error)
        console.log("All users ERROR",error);
    }
})






module.exports= router