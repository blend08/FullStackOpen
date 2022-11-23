const mongoose = require('mongoose');

if (process.argv.length < 3) {
  // eslint-disable-next-line no-console
  console.log('Please provide the password as an argument: node mongo.js <password>');
  process.exit(1);
}

const database = 'Phonebook';
const password = process.argv[2];

const url = `mongodb+srv://blend08:${password}@phonebookcluster.lowbly3.mongodb.net/${database}?retryWrites=true&w=majority`;

const personSchema = new mongoose.Schema({
  name: String,
  number: String,
});

const Person = mongoose.model('Person', personSchema);

if (process.argv.length === 3) {
  mongoose
    .connect(url)
    .then(() => {
      // eslint-disable-next-line no-console
      console.log('Phonebook: ');

      Person.find({}).then((result) => {
        result.forEach((person) => {
          // eslint-disable-next-line no-console
          console.log(`${person.name} ${person.number}`);
        });
        mongoose.connection.close();
      });
    })
    // eslint-disable-next-line no-console
    .catch((err) => console.log(err));
} else {
  mongoose
    .connect(url)
    .then(() => {
      const person = new Person({
        name: process.argv[3],
        number: process.argv[4],
      });

      return person.save();
    })
    .then(() => {
      // eslint-disable-next-line no-console
      console.log(`Added ${process.argv[3]} number ${process.argv[4]} to phonebook`);
      return mongoose.connection.close();
    })
    // eslint-disable-next-line no-console
    .catch((err) => console.log(err));
}
