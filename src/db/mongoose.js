const mongoose = require('mongoose');
const validator = require('validator');

// mongoose.connect('mongodb://127.0.0.1:27017/task-manager',{ 
//                     useNewUrlParser :true,
//                     useCreateIndex :true});

// const user = mongoose.model('User',{
//     name: {
//         type: String,
//         required: true
//     },
//     age :{
//         type: Number,
//         validate(value) {
//             if(value < 0){
//                     throw new Error ('Age should be greater than 0');
//             }
//         }
//     },
//     email:{
//         type: String,
//         validate(value){
//             if(!validator.isEmail(value)){
//                 throw new Error('Is not a valid Email address')
//             }
//         }

//     },
//     password:{
//         type: String,
//         trim: true,
//         minlength: 6,
//         required: true,
//         validate(value){
//             if(value.toLowerCase().includes('password')){
//                 throw new Error ('Password shouldn\'t contain password characters in it');
//             }
//         }
//     }
// });

// // const me = new user({
// //     name: 'raghu',
// //     age: '28',
// //     email : 'raghu@gmail.com',
// //     password: 'password'
// // });

// // me.save().then((result) => {
// //     console.log('Model Saved Successfully!!!', result);
// // }).catch((error) =>{
// //     console.log('Error occured -',error.message)
// // })

// const task = mongoose.model('task',{
//     description:{
//         type: String,
//         trim: true,
//         required: true
//     },
//     completed:{
//         type: Boolean,
//         required: false,
//         default: false
//     }
// });

// const task1 = new task({
//     description: 'Learn Angular.Js',
//     completed:true
// });

// task1.save().then((result)=>{
//     console.log('New Task Saved Successfully',result);
// }).catch((error)=>{
//     console.log('Error occurred on saving the task:',error);
// })