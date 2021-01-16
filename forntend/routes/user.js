const router = require('express').Router();
const bcrypt = require('bcryptjs');
const User = require('../models/user');

const jwt = require('jsonwebtoken');
// register user
router.post('/register', async(req, res) =>
{
    const { name , email , password } = req.body;
    try{
    let user = await User.findOne({email});
if(user){
    return res.status(400).json({
        error : "User Already axists"
    })
}
const hashed_password = await bcrypt.hash(password, 10)
user = new User({
    name,
    email,
    password : hashed_password
})
await user.save();
return res.status(201).json({
    message  :"User Created Succesffull"
})
    }
    catch(err)
    {
        console.log(err);
    }
})

//login  user

router.post('/login', async(req, res) => {
    console.log('Hello');
    const { email , password} = req.body
    console.log(req.body);
    try{
let user = await User.findOne({email});
if(!user)
{
    return res.status(400).json({error : "Invalid Credential"})
}
const isMatch = await bcrypt.compare(password, user.password)
if(!isMatch)
{
    return res.status(400).json({error : "Invalid Credential"})
}
const token = jwt.sign({_id  :user._id}, process.env.JWT_SECRET,
    {
        expiresIn : '1h'
    });
    console.log(token)
    return res.json(token);
    }catch(err)
    {
        console.log(err.message);
    }
})