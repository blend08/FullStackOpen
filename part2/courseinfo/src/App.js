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

const Course = ({course}) =>{
  return (
    <>
      <Header title={course.name} />
      <Content parts={course.parts}/>
      <Total parts={course.parts} />
    </>
  )
}

const App = () => {
  const course = {
    id: 1,
    name: 'Half Stack application development',
    parts: [
      {
        name: 'Fundamentals of React',
        exercises: 10,
        id: 1
      },
      {
        name: 'Using props to pass data',
        exercises: 7,
        id: 2
      },
      {
        name: 'State of a component',
        exercises: 14,
        id: 3
      }
    ]
  }

  return <Course course={course} />
}

export default App