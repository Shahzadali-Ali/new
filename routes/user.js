const router = require('express').Router();
const bcrypt = require('bcryptjs');
const User = require('../models/user');
const { requireLogin} = require("../middleware/auth");

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

router.post('/login', async(req, res) => {
    console.log('Hello');
    const { email , password} = req.body
    console.log(req.body);
    try{
let user = await User.findOne({email});
console.log(user);
if(!user)
{
return res.status(400).json({erorr : "Invlid Credential"})
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
    return res.json({token});
    }catch(err)
    {
        console.log(err.message);
    }
})

router.get('/',requireLogin, async(req, res) => {
console.log("User is" +req.user);
    try {
        const user = await User.findById(req.user._id).select('-password');
        res.json(user);
    } catch (error) {
        console.log("Error")
    }
});

module.exports = router;