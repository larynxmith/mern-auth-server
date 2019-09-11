//required
let cors = require('cors')
let express = require('express')
let morgan = require('morgan')
let rowdyLogger = require('rowdy-logger')

//instance
let app = express()
let rowdyResults = rowdyLogger.begin(app)

//middleware
app.use(cors())
app.use(morgan('dev'))
app.use(express.urlencoded({ extended: false}))
app.use(express.json({ limit: '10mb' }))


// routes
app.use('/auth', require('./controllers/auth'))
//Catch-All route
app.get('*', (req, res) => {
    res.status(404).send({ message: 'Not Found' })
})


app.listen(process.env.PORT || 3000, () => {
    rowdyResults.print()
})