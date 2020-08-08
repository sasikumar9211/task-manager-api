const express = require('express');
const router = new express.Router();
const task = require('../models/task');
const auth = require('../middleware/auth');
const User = require('../models/user');




router.post('/task',auth,async (req,res) =>{

    //const task = new task(req.body);
    const tsk = new task({
        ...req.body,
        owner: req.user._id
    });

    console.log(req.body)
    try{
        await tsk.save();
        return res.status(201).send(tsk);
    }catch(e){
        return res.status(400).send(e);
    }
})

router.get('/tasks', auth, async (req, res) => {
    const match ={};

    const sort = {};

    if(req.query.sortBy){
         const parts = req.query.sortBy.split(':'); 
        sort[parts[0]] = parts[1]==='Desc'? -1 : 1;
    }

    if(req.query.completed){
        match.completed = req.query.completed == 'true'
    }
    try {
        console.log(req.user)
        await req.user.populate({
            path: 'tasks',
            match,
            options:{
                limit : parseInt(req.query.limit),
                skip: parseInt(req.query.skip),
                sort
            }
        }).execPopulate();
        res.send(req.user.tasks)
    } catch (e) {
        res.status(500).send(e)
    }
})



router.get('/tasks/:id', async (req,res) => {
    console.log(req.params.id);

    try{
        const taskId = await task.findById(req.params.id);
        if(!taskId)
            return res.status(404).send('error in fetching the data');
        
            return res.status(200).send(taskId);
    }catch(e){
        return res.status(500).send(e);
    }
})



router.patch('/tasks/:id', async (req,res) =>{
    const updates =Object.keys(req.body);
    const allowedUpdates = ['completed','description'];
    const isValidUpdate = updates.every((update) => allowedUpdates.includes(update));

    if(!isValidUpdate)
        return res.status(400).send('Is not a valid element to update!!!');

    try{
        const tsk = await task.findByIdAndUpdate(req.params.id,req.body,{new: true, runValidators: true});
        return res.status(200).send(tsk);
    }catch(e){
        return res.status(400).send(e);

    }
})




router.delete('/tasks/:id', async (req,res) => {
    try{
    const tsk = await task.findByIdAndDelete(req.params.id);

    if(!tsk)
        return res.status(400).send("Task Not found to deletion");

    return res.status(200).send(tsk);
    }catch(e){
        return res.status(400).send('Deletion failed');
    }
})


module.exports = router;