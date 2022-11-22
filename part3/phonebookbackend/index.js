require('dotenv').config()
const express = require('express')
const morgan = require('morgan')
const cors = require('cors')
const Person = require('./modules/person')
const person = require('./modules/person')


morgan.token('json', function getId (req) {
    return JSON.stringify(req.body)
})

const app = express()

app.use(express.static('build'))

app.use(express.json())

app.use(cors())

app.use(morgan(':method :url :status :res[content-length] - :response-time ms :json'))

app.get('/' , (request, response) => {
    response.send('<h1>Hello World</h1>')
})

app.get('/info' , (request, response) => {
    const body = `Phonebook has info for ${persons.length} people <br><br> ${new Date().toUTCString()}`
    response.send(body)
})

app.get('/api/persons', (request, response) => {
    Person.find({}).then(persons => {
        response.json(persons)
    })
})

app.get('/api/persons/:id', (request, response) => {
    Person.findById(request.params.id).then(person => {
        response.json(person)
    })
})

app.delete('/api/persons/:id', (request, response) => {
    Person.findByIdAndRemove(request.params.id)
        .then(result => {
            response.status(204).end()
        })
        .catch(error => {
            console.log(error)
            response.status(500).end()
        })
})

app.post('/api/persons', (request, response) => {
    const body = request.body

    if(body.name === undefined) {
        return response.status(400).json({error: 'name is missing'})
    } else if (body.number === undefined) {
        return response.status(400).json({error: 'number is missing'})
    }

    const person = new Person({
        name: body.name,
        number: body.number
    })

    person.save().then(savedPerson =>  {
        response.json(savedPerson)
    })

})

const PORT = process.env.PORT
app.listen(PORT)
console.log(`Server running in port ${PORT}`)