const jwt = require('jsonwebtoken');
const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const authenticate = require("../middleware/authenticate");
const cookieParser = require('cookie-parser');

router.use(cookieParser());

require('../db/conn');
const User = require("../models/userSchema");

router.get('/', (req, res) => {
    res.send(`Hello world from server router.js`);
});

// Using Promises...

// router.get('/register', (req, res) => {
    
//     const {name, email, phone, work, password, cpassword} = req.body;

//     if(!name || !email || !phone || !work || !password || !cpassword){
//         return res.status(422).json({error: "Please filled the field properly"})
//     }

//     User.findOne({ email:email })
//     .then((userExist) => {
    //         if(userExist) {
        //             return res.status(422).json({error: "Email already Exist"});
        //         }
        
        //         const user = new User({name, email, phone, work, password, cpassword});
        
        //         user.save().then(() => {
            //             res.status(201).json({message: "user registered successfully"});
            //         }).catch((err) => res.status(500).json({error: "Failed to registered"}));
            //     }).catch(err => {console.log(err);})
            // });
            
            
            // OR
            
            
            // Async-Await

    router.post('/register', async (req, res) => {
                
    const {name, email, phone, work, password, cpassword} = req.body;
                
    if(!name || !email || !phone || !work || !password || !cpassword){
        return res.status(422).json({error: "Please filled the field properly"})
    }

    try {
        
        const userExist = await User.findOne({ email:email });
        
        if(userExist) {
            return res.status(422).json({error: "Email already Exist"});
        }
        else if(password != cpassword) {
            return res.status(422).json({error: "Password is not matching"});
        }
        else{
            const user = new User({name, email, phone, work, password, cpassword});
            // between this from userSchema
            await user.save();
            
            res.status(201).json({message: "user registered successfully"});
        }
    
    } catch(err) {
        console.log(err);
    }
    
});

// login route

router.post('/signin', async (req, res) => {
    
    try{
        // let token;
        const {email, password} = req.body;

        if (!email || !password) {
            return res.status(400).json({error: "please filled the data"})
        }
        
        const userLogin = await User.findOne({ email:email });
        
        //  console.log(userLogin);
        
        if(userLogin) {
            const isMatch = await bcrypt.compare(password, userLogin.password);
            
            const token  = await userLogin.generateAuthToken();
            console.log(token);

            res.cookie("jwtoken", token, {
                expires: new Date(Date.now() + 25892000000),
                httpOnly:true
            });

            if (!isMatch) {
                res.status(400).json({error: "Invalid Credentials"});
            }
            else{
                res.json({message: "User Signin successfully"});
            }
        }
        
        else {
            res.status(400).json({error: "Invalid Credentials"});
        }
        
    } catch(err) {
        console.log(err);
    }
});

// about us page

router.get('/about', authenticate, (req, res) => {
    console.log(`Hello my About`);
    res.send(req.rootUser);
})

// get user data for contact us & home page

router.get('/getdata', authenticate, (req, res) => {
    console.log(`Hello my Homepage`);
    res.send(req.rootUser);
})

// Contact us page

router.post('/contact', authenticate, async (req, res) => {
    try{
        const { name, email, phone, message } = req.body;

        if ( !name || !email || !phone || !message ) {
            console.log('error in contact form')
            return res.status(400).json({error: "please filled the contact form"});
        }

        const userContact = await User.findOne({ _id: req.userID });

        if (userContact) {

            const userMessage = await userContact.addMessage(name, email, phone, message);
            
            await userContact.save();

            res.status(201).json({ message: "User Contact successfully" });
        }
    }
    catch (err) {
        console.log(err);
    }
});

// Logout page

router.get('/logout', (req, res) => {
    console.log(`Hello my Logout Page`);
    res.clearCookie("jwtoken", { path: '/' });
    res.status(200).send('User Logout');
})

module.exports = router;