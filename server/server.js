const express = require('express')
const app = express()
const cors = require('cors')
const port = 8000

app.use(cors({
    origin: '*',
    methods: ["GET", "POST"]
}))
app.use(express.json())
app.use(express.urlencoded({ extended: true}))

require('./config/mongoose.config')

const userRoutes = require('./routes/user.routes.js')
userRoutes(app)
const gameRoutes = require('./routes/game.routes.js')
gameRoutes(app)

app.get('/', (req, res) => {
    res.send(("express running"))
})

app.listen(port, () => console.log(`Server running on port ${port}`))