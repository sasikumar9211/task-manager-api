const express = require('express');
const router = new express.Router();
const User = require('../models/user');
const auth =  require('../middleware/auth');
const multer = require('multer');
const {sendWelcomeMail,cancellationMail} = require('../emails/account')



router.post('/users',async (req,res) =>{

    const usr = new User(req.body);
    try{
        const token = await usr.generateAuthToken();
        await usr.save();
        sendWelcomeMail(usr.email,usr.name);
         res.status(201).send({usr,token});
    }catch(e){
         res.status(400).send('Error on saving the user',e)

    }
})

router.get('/users',  async (req,res) =>{

    try {
        const users = await User.find({});
        return res.status(200).send(users);
    }catch(e){
        return res.status(400).send(e);

    }
})


router.get('/users/:id',async (req,res) =>{

    try{
        const userId = await User.findById(req.params.id)
        if(!userId){
            return res.status(404).send('error in fetching the data');
        }
        return res.status(200).send(userId);
    }catch(e){
        return res.status(500).send(e)

    }
})

router.patch('/users/me', auth, async(req,res) => {

console.log('User patch update...')
    const updates =Object.keys(req.body);
    const allowedUpdated = ['name','age','email','password'];
    const isValidUpdates = updates.every((update)=>  allowedUpdated.includes(update));

    if(!isValidUpdates)
        return res.status(400).send('Is not a valid updates');
    try{

        updates.forEach((update) => req.user[update] = req.body[update]);
        await req.user.save();
        return res.status(200).send('Update Success...');

    }catch(e){
        return res.status(400).send(e);
    }
})

// router.patch('/users/:id', async(req,res) => {

//     const updates =Object.keys(req.body);
//     const allowedUpdated = ['name','age','email','password'];
//     const isValidUpdates = updates.every((update)=>  allowedUpdated.includes(update));

//     if(!isValidUpdates)
//         return res.status(400).send('Is not a valid updates');
//     try{

//         const usr = await User.findByIdAndUpdate(req.params.id,req.body,{ new: true, runValidators:true});
//         return res.status(200).send(usr);

//     }catch(e){
//         return res.status(400).send(e);
//     }
// })


router.delete('/users/:id',  async (req,res) => {
    try{
    const user = await User.findByIdAndDelete(req.params.id);
    cancellationMail(user.email,user.name);

    if(!user)
        return res.status(400).send("User Not found to deletion");

    return res.status(200).send(user);
    }catch(e){
        return res.status(400).send('Deletion failed');
    }
})


router.post('/users/login', async (req, res) => {
    try {
        const user = await User.findByCredentials(req.body.email, req.body.password)
        const token = await user.generateAuthToken()
        res.send({ user, token })
    } catch (e) {
        res.status(400).send('Can\'t Login...')
    }
})

router.get('/user/me', auth, async (req, res) => {
    res.send(req.user)
})


router.post('/user/logout', auth, async( req,res)=>{
    try{
        console.log(req.user);
        req.user.tokens = req.user.tokens.filter((token) => {
            console.log('token',token.token)
            console.log('user',req.user)
            return token.token !== req.user;
        })

        await req.user.save();

        res.send();
    }catch(e){
        res.status(500).send('Error on log out');
    }
})

router.post('/user/logoutAll',auth ,async(req,res) =>{

    try{
        req.user.tokens = [];
        await req.user.save();
        res.send();
    }catch(e){
        res.status(500).send('Error on log out all')
    }
})



const uploads = multer({
    limits:{
        fileSize: 10000000
    },
    fileFilter(req,file,cb){
        if(!file.originalname.match('\.(jpg|jpeg|png)$'))
            return cb(new Error('Please upload the jpg|jpeg|png file...'))

       
        cb(undefined,true);     
    }


});

router.post('/users/me/avatar', auth,uploads.single('avatar'),async (req,res) =>{
        req.user.avatar = req.file.buffer;
        await req.user.save();
        res.status(200).send('File uploaded successfully !!');
},(error,req,res,next) =>{
    res.status(400).send({ error : error.message});
})



router.delete('/users/me/avatar',auth,async (req,res) =>{
    try{
        req.user.avatar = undefined
    await req.user.save();
    res.status(200).send('File has been deleted...')
    }catch(e){
        res.status(400).send('Error on deleting the file...');
    }
})


router.get('/users/:id/avatar',async (req,res) =>{

    try{
        const user = await User.findById(req.params.id);

        if(!user || !user.avatar){
            throw new Error();
        }

        res.set('content-type','image/jpg');
        res.send(user.avatar);


    }catch(e){
        res.status(400).send('Error on fetching the image...')
    }
})
module.exports = router;