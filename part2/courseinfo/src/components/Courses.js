const Part = ({name, exercises}) => <p>{name} {exercises}</p> 

const Content = ({parts}) => {
  return(
    parts.map(part =>
      <Part key={part.id} {...part}/>
    )
  )
}

const Header = ({title}) => <h1>{title}</h1>

const Total = ({parts}) => <b>total of {parts.reduce((acc, part) => acc+part.exercises, 0)} exercises</b>

const Course = ({name, parts}) =>{
  return (
    <>
      <Header title={name} />
      <Content parts={parts}/>
      <Total parts={parts} />
    </>
  )
}

const Courses = ({courses}) => {
  return (
    courses.map(course =>
      <Course key={course.id} {...course} />  
    )
  )
}

export default Courses