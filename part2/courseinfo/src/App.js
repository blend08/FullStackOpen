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

const App = () => {
  const courses = [
    {
      name: 'Half Stack application development',
      id: 1,
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
        },
        {
          name: 'Redux',
          exercises: 11,
          id: 4
        }
      ]
    }, 
    {
      name: 'Node.js',
      id: 2,
      parts: [
        {
          name: 'Routing',
          exercises: 3,
          id: 1
        },
        {
          name: 'Middlewares',
          exercises: 7,
          id: 2
        }
      ]
    }
  ]

  return (
    <div>
      <Courses courses={courses} />
    </div>
  )
}

export default App