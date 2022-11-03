import { useState, useEffect } from 'react'
import { supabase } from '../lib/initSupabase'
import { client, urlFor } from '../lib/initSanity';
export default function Todos({ user }) {
  const [todos, setTodos] = useState([])
  const [newTaskText, setNewTaskText] = useState('')
  const [errorText, setError] = useState('')
  const [loading, setLoading] = useState(true)
  useEffect(() => {
    fetchTodos()
  }, [])

  const fetchTodos = async () => {
    const myQuery = `*[user_id == "${user.id}"]`
    const todos = await client.fetch(myQuery)
    setTodos(todos)
    setLoading(false)
    console.log(todos)
  }
  const addTodo = async (taskText) => {
    let task = taskText.trim()
    if (task.length) {
      let todo = await client.create({
        // _id: `todo-${user.id}-${new Date().getTime()}`,
        _type: 'todo',
        user_id: user.id,
        task: task,
        is_completed: false,
        inserted_at: new Date(),
      })
      setTodos([...todos, todo])
      // console.log(todo)
    }
  }

  const deleteTodo = async (id) => {
    try {
      const query = `*[_id == "${id}"]`
      const [todoToDelete] = await client.fetch(query)
      await client.delete(todoToDelete._id)
      setTodos(todos.filter((todo) => todo._id !== id))
    } catch (error) {
      console.log('error', error)
    }
  }

  return (
    loading?
     <h1>Loading...</h1> :
    <div className="w-full">
      <h1 className="mb-12">A simple Todo List</h1>
      <div className="flex gap-2 my-2">
        <input
          className="rounded w-full p-2"
          type="text"
          placeholder="Add a new task"
          value={newTaskText}
          onChange={(e) => {
            setError('')
            setNewTaskText(e.target.value)
          }}
        />
        <button className="btn-black" onClick={() => addTodo(newTaskText)}>
          Add
        </button>
      </div>
      {!!errorText && <Alert text={errorText} />}
      <div className="bg-white shadow overflow-hidden rounded-md">
        <ul>
          {todos.map((todo) => (
            <Todo key={todo._id} todo={todo} onDelete={() => deleteTodo(todo._id)} />
          ))}
        </ul>
      </div>
    </div>
  )
}

const Todo = ({ todo, onDelete }) => {
  const [isCompleted, setIsCompleted] = useState(todo.is_complete)

  const toggle = async () => {
    try {
      // const { data, error } = await supabase
      //   .from('todos')
      //   .update({ is_complete: !isCompleted })
      //   .eq('id', todo.id)
      //   .single()
      const data = await client.createOrReplace({
        _type: 'todo',
        _id: `${todo._id}`,
        is_complete: !isCompleted,
        task: todo.task,
        user_id: todo.user_id,
        inserted_at: todo.inserted_at,
      })
      const newTodosquery = `*[user_id == "${todo.user_id}"]`
      const newTodos = await client.fetch(newTodosquery)
      setIsCompleted(data.is_complete)
      
    } catch (error) {
      console.log('error', error)
    }
  }

  return (
    <li
      onClick={(e) => {
        e.preventDefault()
        toggle()
      }}
      className="w-full block cursor-pointer hover:bg-gray-200 focus:outline-none focus:bg-gray-200 transition duration-150 ease-in-out"
    >
      <div className="flex items-center px-4 py-4 sm:px-6">
        <div className="min-w-0 flex-1 flex items-center">
          <div className="text-sm leading-5 font-medium truncate">{todo.task}</div>
        </div>
        <div>
          <input
            className="cursor-pointer"
            onChange={(e) => toggle()}
            type="checkbox"
            checked={isCompleted ? true : ''}
          />
        </div>
        <button
          onClick={(e) => {
            e.preventDefault()
            e.stopPropagation()
            onDelete()
          }}
          className="w-4 h-4 ml-2 border-2 hover:border-black rounded"
        >
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="gray">
            <path
              fillRule="evenodd"
              d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
              clipRule="evenodd"
            />
          </svg>
        </button>
      </div>
    </li>
  )
}

const Alert = ({ text }) => (
  <div className="rounded-md bg-red-100 p-4 my-3">
    <div className="text-sm leading-5 text-red-700">{text}</div>
  </div>
)
