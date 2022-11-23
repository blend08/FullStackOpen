require('dotenv').config()
const mongoose = require('mongoose')

const url = process.env.MONGODB_URI

mongoose
    .connect(url)
    .then(result => {
        console.log('connected to MongoDb')
    })
    .catch((error) => {
        console.log('error connecting to MongoDb:', error.message)
    })


const personSchema = new mongoose.Schema({
    name: {
        type: String,
        minLength: 3,
        required: true,
        validate: {
            validator: async function(name) {
                const existing = await mongoose.model('Person').findOne({ name : this.name });
                return existing ? false : true
              },
            message: props => `${props.value} is already in the phonebook`
        }  
    },
    number: {
        type: String,
        minLength: 8,
        required: true,
        validate: {
            validator: (v) => /^\d{2,3}-\d{1,}$/.test(v),
            message: props => `${props.value} is not a valid phone number`
        }
    }
})

personSchema.set('toJSON', {
    transform: (document, returnedObject) => {
      returnedObject.id = returnedObject._id.toString()
      delete returnedObject._id
      delete returnedObject.__v
    }
})


module.exports = mongoose.model('Person', personSchema)