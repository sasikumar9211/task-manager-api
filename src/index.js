const express = require('express')
const userRouter = require('./router/userRouter')
const taskRouter = require('./router/taskRouter')

const app = express()
const port = process.env.PORT || 3000

console.log(process.env.PORT)
console.log(process.env.MONGODB_URL)
console.log(process.env.JWT_SECRET)

require('./db/mongoose')


app.use(express.json())
app.use(userRouter)
app.use(taskRouter)

app.listen(port, () => {
    console.log('Server is up on port ' + port)
})