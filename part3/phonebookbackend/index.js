require('dotenv').config()
const express = require('express')
const morgan = require('morgan')
const cors = require('cors')
const Person = require('./modules/person')
const { response } = require('express')


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

app.get('/api/persons', (request, response, next) => {
    Person.find({}).then(persons => {
        response.json(persons)
    })
    .catch(error => next(error))
})

app.get('/api/persons/:id', (request, response, next) => {
    Person.findById(request.params.id).then(person => {
        if (person) {
          response.json(person)  
        } else {
            response.status(404).end()
        }
    })
    .catch(error => next(error))
})

app.delete('/api/persons/:id', (request, response, next) => {
    Person.findByIdAndRemove(request.params.id)
        .then(result => {
            if (result) {
                response.status(204).end()
            } else {
                response.status(404).end()
            }
        })
        .catch(error => next(error))
})

app.post('/api/persons', (request, response, next) => {
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
    .catch(error => next(error))
})

app.put('/api/persons/:id', (request, response, next) => {
    const body = request.body

    const person = {
        name: body.name,
        number: body.number
    }
    Person.findByIdAndUpdate(request.params.id, person, {new: true})
        .then(updatedPerson => {
            if (updatedPerson) {
                response.json(updatedPerson)
            } else {
                response.status(404).end();
            }
        })
        .catch(error => next(error))
})

const unknownEndpoint = (request, respons) => {
    response.status(404).send({error: 'unknown endpoint'})
}

app.use(unknownEndpoint)

const errorHandler = (error, request, response, next) => {
    console.log(error.message)

    if(error.name === 'CastError') {
        return response.status(400).send({error: 'malformatted id'})
    } else {
        return response.status(500).end()
    }

    next(error)
}

app.use(errorHandler)

const PORT = process.env.PORT
app.listen(PORT)
console.log(`Server running in port ${PORT}`)