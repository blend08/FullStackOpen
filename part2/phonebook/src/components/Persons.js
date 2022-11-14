const Person = ({name, number}) => <div>{name} {number}</div>

const Persons = ({persons}) => {
  return(
    persons.map(person => 
      <Person key={person.id} {...person}/>
    )
  )
}

export default Persons