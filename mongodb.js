const mongoDb = require('mongodb');
const mongoClient = mongoDb.MongoClient;

const ObjectID = mongoDb.ObjectID;

const id = new ObjectID();

console.log(id)
console.log(id.id.length)
console.log(id.toHexString().length)
console.log(id.getTimestamp())

const connectURL = 'mongodb://127.0.0.1:27017';
mongoClient.connect(connectURL ,{useNewUrlParser: true},( error,client)=>{
   if(error){
      return console.log('Unable to connect to database!')
   }

   console.log('Successfully connected')

    const db = client.db('task-manager');

    //CREATE AND INSERT OPERATION

//    db.collection('users').insertMany([
//        {
//            name: 'rahul',
//            age:29,
//            email: 'rahul@gmail.com'
//         },
//         {
//             name: 'karthi',
//             age:29,
//             email: 'karthi@gmail.com' 
//         }
//     ], ( error, result) =>{
//             if(error){
//                 console.log('Can\'t insert succesfully!');
//             }
//             console.log(result.ops)
//     })


//    db.collection('task').insertMany([
//        {
//           description: 'Learn Java',
//           completed: false 
//        },{
//         description: 'Learn Spring',
//         completed: true 
//      },{
//         description: 'Learn Node',
//         completed: true 
//      }
//    ], (error,result) =>{
//         if(error){
//             console.log('Insertion failed')
//         }

//         console.log(result)
//    })


// FIND OPERATION

   db.collection('users').findOne({_id : new ObjectID("5f1bd8944e1b781d784fe28a")},(error, user)=> {
       if(error){
         return  console.log('Error in getting the records');
       }
       console.log(user)
   });

   db.collection('users').find({ age: 29 }).toArray((error, user) => {
    console.log(user);
   })

   db.collection('users').find({ age: 29 }).count((error, count) => {
    console.log('TOtal Count : '+count);
   })


   db.collection('task').findOne({_id : new ObjectID("5f1bdfe0f6b8792e98f6b1f7")}, (error, task) => {
    console.log('Task -',task)
   })


   db.collection('task').find({ completed : false }).toArray((error, task) => {
    console.log('Task not completed-',task)
   })

//UPDATE OPERATION

   db.collection('users').updateMany({ age: 29}, {
          $inc :{
             age :4
          }
   }).then((result) =>{
       console.log('Updated Result :'+ result);
   }).catch((error) => {
       console.log('Error -'+error);
   })

   db.collection('task').updateMany({ completed: false},{
       $set:{
           completed :true
       }
   }).then((result) => {
       console.log('Update result set!', result.matchedCount)
   }).catch((error) =>{
       console.log('Error :'+error)
   })

   db.collection('task').deleteOne({ _id : new ObjectID("5f1bdfe0f6b8792e98f6b1f5")}).then((result) => {
        console.log('delete Count: ',result.deletedCount)
   }).catch((error) => {
       console.log(error)
   })
})

