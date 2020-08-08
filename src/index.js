const express =require('express');
const app = express();

const mongoose = require('mongoose');


const userRouter = require('./router/userRouter');

const taskRouter = require('./router/taskRouter');

const bcrypt = require('bcryptjs');

const Task = require('./models/task');

const User = require('./models/task');



console.log(process.env.DEV_DB_URL)
mongoose.connect(process.env.DEV_DB_URL,{ 
                    useNewUrlParser :true,
                    useCreateIndex  :true});


const port = process.env.PORT

//middleware for maintenance

// app.use((req,res,next) =>{
   
//         return res.status(503).send('Site is under maintenance');
   
// })


app.use(express.json())

app.use(userRouter);

app.use(taskRouter);





// const myFunction = async () =>{
//     const password = 'sasi!';
//     const hashedPassword = await bcrypt.hash(password,8);

//     console.log('Hashed Password :',hashedPassword);

//     const isMatch = await bcrypt.compare('sasi!',hashedPassword)

//     console.log(isMatch)

// }

// myFunction();


const myFunc = async() => {
    const user = await User.findById('5f29985d96afd04a2816fe39');
    await user.populate('tasks').execPopulate();
    console.log(user);

    const task = await Task.findById('5f29985d96afd04a2816fe39')
    await task.populate('owner').execPopulate();
    console.log(task.owner);
}

//myFunc();


//Chained- Promises

// user.findByIdAndUpdate('5f1bdb921c444b0178121e4f', { age : 31}).then((usr) =>{

//     console.log(usr);
//     return user.countDocuments({age: 1})

// }).then((result) => {
//     console.log('doument-count',result)
// }).catch((e) =>{
//     console.log(e);
// })

//Chained Promises Challenge

// task.findByIdAndDelete('5f1c7f1b3caed04498f870e7').then((result) => {
//      console.log('Deleted the given Id',result)
//      return task.countDocuments({completed: false});
// }).then((result2) => {
//     console.log(result2);
// }).catch((e) =>{
//     console.log(e);
// })


//Async await...

// const updateAgeAndCount = async(id,age) =>{
//     await user.findByIdAndUpdate(id,{age});
//     return await user.countDocuments({age});
// }

// updateAgeAndCount('5f1bd8944e1b781d784fe28a',22).then((count) =>{
//     console.log('COunt - ',count);
// }).catch((e) =>{
//     console.log(e)
// })


// const updateTaskAndCount = async(id,completed) =>{

//     await task.findByIdAndUpdate(id,{completed});
//     return await task.countDocuments({completed})
// }

// updateTaskAndCount('5f1c7f4b3caed04498f870e8',false).then((count) =>{
//     console.log('Incompleted Tasks -',count);
// }).catch((e) =>{
//     console.log(e)
// })


app.listen(port,()=>{
    console.log('App Successfully started in ',port);
})