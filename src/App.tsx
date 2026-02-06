import './App.css'
import InputTodo from './todo/input.todo'

function App() {
  const propsInfo = {
      name: "Yen",
      age: 38
  }

  return (
    <>
      <InputTodo propsInfo={propsInfo}/>
    </>
  )
}

export default App
