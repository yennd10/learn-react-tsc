import { useState } from 'react'
import './App.scss'
import InputTodo from './todo/input.todo'

function App() {
  const propsInfo = {
      name: "Yen",
      age: 38
  }

  const [listTodo, setListTodo] = useState([""]);
  const [count, setCount] = useState<number>();
  const handleCount = () => {   
    if(count === undefined) {
       setCount(0);     
    } else {
      setCount(count + 1); // count = count + 1;
    }

    console.log(count);
  }
  return (
    <>
      <div>Count: {count}</div>
      <br/>
      <button onClick={handleCount}>Update Count</button>
      <InputTodo propsInfo={propsInfo} listTodo={listTodo} setListTodo={setListTodo}/>
      <br />
      <ul>
          { listTodo.map((item, index) => {
              return(
                  <li key={index}>{item}</li>
              );
          })}          
      </ul>
    </>
  )
}

export default App
