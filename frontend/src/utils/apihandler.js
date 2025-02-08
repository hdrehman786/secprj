import axios from 'axios';
const baseurl = 'https://secprj-c8kj.vercel.app/';

export const getTodos = async (setTodo) => {
    try {
        const response = await axios.get(`${baseurl}getTodo`, { withCredentials: true });
        setTodo(response.data.data);
    } catch (error) {
        console.error("Error fetching todos:", error);
    }
};



export const deleteTodo = async  (todoId,setTodo) => {
    try {
        await axios.delete(`${baseurl}deleteTodo/${todoId}`)
        .then((response) => {
            getTodos(setTodo)
        })
    }catch (err){
        console.log('Error', err)
    }
}


export const addTodo =async (title,setText,setTodo) =>{
   try{
    const response = await axios.post(`${baseurl}addTodo`, {title})
    .then((response) => {
      setText('')
      getTodos(setTodo)
    })
   }catch(err) {
    console.log('Error', err)
   }
}


export const updatedTodos =async (title,setText,setTodos,setIsUpdating,id) => {
         try {
          await axios.put(`${baseurl}updateTodo/${id}`, {title})
          .then((response) => {
            setIsUpdating(false)
            setText('')
            getTodos(setTodos)
          })
         }catch (error) {
          console.error("Error updating todo:", error);
         }
};


export const toggleTodo = async (id,setTodo) => {
    try {
      await axios.patch(`${baseurl}todo/${id}`)
      .then((response) => {
        getTodos(setTodo)
      })
    }catch (err) {
      console.log('Error', err)
    }
}