require('dotenv').config();
const mongoose = require('mongoose');

const url = process.env.MONGODB_URI;

mongoose
  .connect(url)
  .then(() => {
    // eslint-disable-next-line no-console
    console.log('connected to MongoDb');
  })
  .catch((error) => {
    // eslint-disable-next-line no-console
    console.log('error connecting to MongoDb:', error.message);
  });

const personSchema = new mongoose.Schema({
  name: {
    type: String,
    minLength: 3,
    required: true,
    validate: {
      async validator() {
        const existing = await mongoose.model('Person').findOne({ name: this.name });
        return !existing;
      },
      message: (props) => `${props.value} is already in the phonebook`,
    },
  },
  number: {
    type: String,
    minLength: 8,
    required: true,
    validate: {
      validator: (v) => /^\d{2,3}-\d{1,}$/.test(v),
      message: (props) => `${props.value} is not a valid phone number`,
    },
  },
});

personSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    // eslint-disable-next-line no-param-reassign, no-underscore-dangle
    returnedObject.id = returnedObject._id.toString();
    // eslint-disable-next-line no-underscore-dangle, no-param-reassign
    delete returnedObject._id;
    // eslint-disable-next-line no-param-reassign, no-underscore-dangle
    delete returnedObject.__v;
  },
});

module.exports = mongoose.model('Person', personSchema);
