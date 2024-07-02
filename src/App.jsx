import { useState, useEffect } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import Navbar from "./components/Navbar";
import { FaEdit } from "react-icons/fa";
import { AiFillDelete } from "react-icons/ai";
import { v4 as uuidv4 } from 'uuid';


function App() {

  const [todo, setTodo] = useState("")
  const [todos, setTodos] = useState([])
  const [showFinished, setshowFinished] = useState(true)

  useEffect(() => {
    let todoLength = localStorage.getItem("todos")
    if (todoLength) {
      let todos = JSON.parse(localStorage.getItem("todos"))
      setTodos(todos)
    }
  }, [])
  

   const toggleFinished = () => {
     setshowFinished(!showFinished)
   }
   

  const saveToLs = (params) => {
    localStorage.setItem("todos", JSON.stringify(todos))
  }
  

  const handleEdit = (e, id)=>{
    let t = todos.filter(i=> i.id===id)
    setTodo(t[0].todo)
    let newTodos = todos.filter(item=>{
      return item.id!==id;
    })
    saveToLs()
  }
  const handleDelete = (e, id)=>{
    alert("Are you sure you want to delete todo")
    let newTodos = todos.filter(item=>{
      return item.id!==id;
    })
    
    setTodos(newTodos)
    saveToLs()
  }
  const handleAdd = ()=>{
    setTodos([...todos, {id: uuidv4(), todo, iscompleted:false}])
    setTodo("")
    saveToLs()
  }
  const handleChange = (e)=>{
    setTodo(e.target.value)
  }
  const handleCheckbox = (e)=>{
    let id = e.target.name;
    let index = todos.findIndex(item=>{
      return item.id === id;
    })
    let newTodos = [...todos]
    newTodos[index].iscompleted = !newTodos[index].iscompleted
    setTodos(newTodos)
    saveToLs()
  }

  return (
    <>
      <Navbar/>
        <div className="container w-[60vw] bg-violet-100 my-5 mx-auto rounded-xl p-5 min-h-[80vh]">
          <div className="addTodo my-5">
            <h2 className="font-bold text-lg">Add ToDo</h2>
            <input onChange={handleChange} value={todo} type="text" className='w-3/5 rounded-full' />
            <button onClick={handleAdd} disabled ={todo.length<3} className='bg-purple-300 px-3 py-1 hover:bg-purple-400 disabled:bg-purple-600 rounded-lg mx-5'>Save </button>
          </div>
          <input className='my-5' onChange={toggleFinished} type="checkbox" checked={showFinished} name="" id="show" /> 
          <label className='mx-2' htmlFor="show">Show Finished </label>

          <div className='bg-black opacity-15 w-4/5 mx-auto h-[1px]'></div>
          
          <h2 className='font-bold text-lg my-3'> Your Todo</h2>
          <div className='Todos'>
            {todos.length ===0 && <div className='m-5'>No todo to display</div> }
            {todos.map(item=>{

              return (showFinished || !item.iscompleted) && <div key={item.id} className="todo flex justify-between my-2">
                  <div className="flex gap-2">
                  <input name={item.id} onChange={handleCheckbox} type="checkbox" checked={item.iscompleted} id="" />
                  <div className={item.iscompleted?"line-through":""}>{item.todo}</div>
                  </div>

                  <div className="btn flex h-full">
                    <button onClick={(e)=>{handleEdit(e, item.id)}} className='bg-purple-300 px-3 py-1 hover:bg-purple-400 rounded-lg mx-1 '><FaEdit /></button>
                    <button onClick={(e)=>{handleDelete(e, item.id)}} className='bg-purple-300 px-3 py-1 hover:bg-purple-400 rounded-lg mx-1'><AiFillDelete /></button>
                  </div>
              </div>  
              })}          
          </div>
        </div>
    </>
  )
}

export default App
