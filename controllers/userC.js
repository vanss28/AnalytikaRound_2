const User = require('../models/user')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken');
const { sendLogin,sendReg } = require('../controllers/nodemailer')
const cloudinary = require('cloudinary').v2

const register = async (req,res) => {
    try{
        const newuser = new User({
            username: req.body.username,
            gmail: req.body.gmail,
            mobilee: req.body.mobilee,
            password: req.body.password
        })
        newuser.password = await bcrypt.hash(newuser.password,10)
        await newuser.save()
        .then((savedUser) => {
            console.log("saved successfully")
            res.send(savedUser)
            sendReg();
          })
          .catch((error) => {
            console.log(error)
            res.send("Error saving user")
          }) 
    }
    catch(error){
        console.log(error)
    }
}

const login = async (req,res) => {
    try{
        const { gmail, password } = req.body;
        const user = await User.findOne({gmail:gmail})
        
        if (user) {
            const validpassword = await bcrypt.compare(password,user.password)
            if (validpassword) {
                const token=jwt.sign({_id:user._id},process.env.Access_Token) //,{expiresIn: "3h"}
                res.json(token);
                sendLogin();
            }
            else {
                return res.send("Invalid Password");
            }
        }
        else {
            return res.send("cannot find user")
        }
    }
    catch(error){
        res.send(error)    
    }
}


const display = async(req,res) => {
    try {
        const users = await User.find();
        res.send(users);
    } catch (error) {
        console.error(error);
            res.json(error);
    }
}

const deluser = async (req,res) => {
    try {
        const user = await User.findByIdAndDelete(req.body.id)
        if(user) {
            res.send("deletion successful")
        }
        else {
            res.send("deletion unsuccessful")
        }
    } catch (err) {
        res.send(err)
    }
}

const updateuser = async (req,res) => {
    try {
        const user = await User.findByIdAndUpdate(req.params.id,req.body,)
        if(user) {
            res.send("updation successful")
        }
        else {
            res.send("updation unsuccessful")
        }
    } catch (err) {
        res.send(err)
    }
}

cloudinary.config({
    cloud_name: "djnkpco73",
    api_key: "621582998277719",
    api_secret: "nzYw9Ll4H-L343skJ-E28k2K5zg",
})

const uploadprofilepic= async(req,res)=>{
    try {
        const result = await cloudinary.uploader.upload(req.file.path);
        const profilePicUrl = result.secure_url;

        const user = await User.findById(req.user._id);
        user.profilePicUrl = profilePicUrl;
        await user.save();
        return res.send("Profile picture uploaded and saved.");
    } catch (error) {
        return res.status(500).send(error);
    }
}

module.exports = { register,login,display,updateuser,deluser,uploadprofilepic};