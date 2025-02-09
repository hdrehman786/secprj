import { CirclePlus, Check, Trash, Edit } from "lucide-react";
import { useEffect, useState } from "react";
import { addTodo, deleteTodo, getTodos, toggleTodo, updatedTodos, } from "../utils/apihandler.js";
import updated from '../assets/updated.png';


export default function TodoApp() {
  const [todos, setTodos] = useState([]);
  const [text, setText] = useState('');
  const [filter, setFilter] = useState('all');
  const [id,setId] = useState();
  const [isUpdating, setIsUpdating] = useState(false);
 
  useEffect(() => {
    getTodos(setTodos);
  }, []);

  function createTodo () {
  addTodo(text,setText,setTodos)
  }

  function deleted (id){
    deleteTodo(id, setTodos);
  }

  function update () {
   updatedTodos(text,setText,setTodos,setIsUpdating,id);
  }

  function updateModeOn (todotext, todoid,todo) {
    if(!todo.completed){
    setIsUpdating(true);
    setText(todotext);
    setId(todoid);
    } else{
      alert("This task has been completed!")
    }
  }

  const toggle = (todoid) => {
    toggleTodo(todoid, setTodos)
  }
  const filteredTodos = todos.filter(todo => {
    if (filter === 'active') return !todo.completed;
    if (filter === 'completed') return todo.completed;
    return true;
  });
  
  return (
    <div className="min-h-screen bg-gradient-to-r from-purple-400 to-purple-700 px-2">
      <div className="container mx-auto flex flex-col items-center px-4">
        <h1 className="mt-10 text-purple-200 text-4xl md:text-6xl font-extrabold drop-shadow-[4px_4px_0px_rgba(0,0,0,1)] uppercase tracking-wider text-center">
          Todo App
        </h1>

        {/* Input Form */}
        <form 
        onSubmit={(e)=>{
          e.preventDefault();
        isUpdating ? update() :  createTodo();
        }}
        className="w-full flex justify-center items-center mt-6 gap-4">
          <input
            type="text"
            className="border-none p-2 rounded-lg w-full md:w-1/2 focus:outline-none bg-white text-black"
            placeholder="Add new todo"
            value={text}
            onChange={(e) => setText(e.target.value)}
          />
          <button
            type="submit"
            className="text-white bg-blue-900 rounded-full p-2 cursor-pointer hover:bg-blue-800 transition"
          >
            {isUpdating ? 
              <img src={updated} className="h-11 w-11" /> :
              <CirclePlus size={45} />
            }
          </button>
        </form>

        {/* Filter Buttons */}
        <div className="w-full md:w-2/3 mt-6 flex justify-center gap-4 flex-wrap">
          <button 
            onClick={() => setFilter('all')}
            className={`cursor-pointer px-4 py-2 rounded-xl ${
              filter === 'all' ? 'bg-purple-500 text-white' : 'bg-white text-black'
            } font-medium shadow-md transition`}
          >
            All
          </button>
          <button 
            onClick={() => setFilter('active')}
            className={`cursor-pointer px-4 py-2 rounded-xl ${
              filter === 'active' ? 'bg-purple-500 text-white' : 'bg-white text-black'
            } font-medium shadow-md transition`}
          >
            Active
          </button>
          <button 
            onClick={() => setFilter('completed')}
            className={`cursor-pointer px-4 py-2 rounded-xl ${
              filter === 'completed' ? 'bg-purple-500 text-white' : 'bg-white text-black'
            } font-medium shadow-md transition`}
          >
            Completed
          </button>
        </div>

        {/* Todo Cards */}
        <div className="flex flex-wrap items-center mb-5 justify-center mt-6 gap-6">
          {filteredTodos.map((todo) => (
            <div
              key={todo._id}
              className={`border-none px-6 py-6 flex flex-col justify-between rounded-lg h-auto w-full md:w-80 shadow-md ${
                todo.completed ? 'bg-green-100' : 'bg-purple-200'
              }`}
            >
              <p className={`text-zinc-900 font-semibold text-sm md:text-base ${
                todo.completed ? 'line-through opacity-75' : ''
              }`}>
                {todo.text || todo.title}
              </p>
              <div className="flex gap-4 justify-end mt-4">
                <button 
                onClick={() => toggle(todo._id)}
                  className={`text-white rounded-md p-2 transition ${
                    todo.completed ? 'bg-green-600' : 'bg-green-500 hover:bg-green-600 cursor-pointer'
                  }`}
                >
                  <Check size={18} />
                </button>
                <button 
                onClick={()=>{deleted(todo._id)}}
                className="text-white bg-red-500 rounded-md p-2 hover:bg-red-600 transition cursor-pointer">
                  <Trash size={18} />
                </button>
                <button
                onClick={()=>{
                  updateModeOn(todo.title,todo._id,todo)
                }}
                className="text-white bg-blue-500 rounded-md p-2 hover:bg-blue-600 transition cursor-pointer">
                  <Edit size={18} />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
