const Person = ({name, number , removeName}) => <div>{name} {number} <button onClick={removeName}>Delete</button></div>

const Persons = ({persons, removeName}) => {
  return(
    persons.map(person => 
      <Person key={person.id} {...person} removeName={() => removeName(person.id , person.name)}/>
    )
  )
}

export default Persons