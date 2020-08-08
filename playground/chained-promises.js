require('../src/db/mongoose')
const user = require('../src/models/user');


user.findByIdAndUpdate('5f1bdb921c444b0178121e4f', { age : 20}).then((usr) =>{

    console.log(usr);
    return user.countDocuments({age: 1})

}).then((result) => {
    console.log(result)
}).catch((e) =>{
    console.log(e);
})