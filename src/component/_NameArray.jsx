/* import React,{ useState, useEffect}  from "react";


const Appp = () => {
  const [todos, setTodos] =useState([]);
  const [todo, setTodo] = useState("");
  const [todoEditing, setTodoEditing] = useState(null);
  const [editingText, setEditingText] = useState("");

  useEffect(() => {
    const json = localStorage.getItem("todos");
    const loadedTodos = JSON.parse(json);
    if (loadedTodos) {
      setTodos(loadedTodos);
    }
  }, []);

useEffect(() => {
    const json = JSON.stringify(todos);
    localStorage.setItem("todos", json);
  }, [todos]);

  function handleSubmit(e) {
    e.preventDefault();

    const newTodo = {
      id: new Date().getTime(),
      text: todo,
      completed: false,
    };
    setTodos([...todos].concat(newTodo));
    setTodo("");
  }

  function deleteTodo(id) {
    let updatedTodos = [...todos].filter((todo) => todo.id !== id);
    setTodos(updatedTodos);
  }

  

  function submitEdits(id) {
    const updatedTodos = [...todos].map((todo) => {
      if (todo.id === id) {
        todo.text = editingText;
      }
      return todo;
    });
    setTodos(updatedTodos);
    setTodoEditing(null);
  }

  return (
    <div id="todo-list">
      <h1>Todo List</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          onChange={(e) => setTodo(e.target.value)}
        
          value={todo}
        />
        <button type="submit">Add Todo</button>
      </form>
      {todos.map((todo) => (
        <div key={todo.id} className="todo">
          <div className="todo-text">
          
            {todo.id === todoEditing ? (
              <input
                type="text"
                onChange={(e) => setEditingText(e.target.value)}
              />
            ) : (
              <div>{todo.text}</div>
            )}
          </div>
          <div className="todo-actions">
            {todo.id === todoEditing ? (
              <button onClick={() => submitEdits(todo.id)}>Submit Edits</button>
            ) : (
              <button onClick={() => setTodoEditing(todo.id)}>Edit</button>
            )}

            <button onClick={() => deleteTodo(todo.id)}>Delete</button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Appp; 


 */


/* 
import React, { useState } from "react";

function App() {
 
  const [todos, setTodos] = useState([]); 
  const [input, setInput] = useState(""); 
  const [isEditing, setIsEditing] = useState(false); 
  const [currentTodo, setCurrentTodo] = useState(null); 

  const handleInput = (e) => {
    setInput(e.target.value); 
  };

  
  const handleSubmit = (e) => {
    e.preventDefault(); 

    if (isEditing) {
     
      const updatedTodos = todos.map((todo, index) =>
        index === currentTodo ? input : todo
      );
      setTodos(updatedTodos); 
      setIsEditing(false); 
    } else if (input.trim()) {
      setTodos([...todos, input]);
    }

    setInput(""); 
  };

  const handleEdit = (index) => {
    setIsEditing(true); 
    setCurrentTodo(index); 
    setInput(todos[index]); 
  };

  
  const handleDelete = (index) => {
    const newTodos = todos.filter((todo, todoIndex) => todoIndex !== index);
    setTodos(newTodos); 
    if (isEditing && index === currentTodo) {
      setIsEditing(false);
      setInput("");
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={input}
          onChange={handleInput}
          placeholder="Enter task"
        />
        <button type="submit">{isEditing ? "Update task" : "Add task"}</button>
      </form>
      <ul>
        {todos.map((todo, index) => (
          <li key={index}>
            {todo}
            <button onClick={() => handleEdit(index)}>Edit</button>
            <button onClick={() => handleDelete(index)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
 */

/* 

import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";


import { faPlus,faTrash,faPenToSquare} from '@fortawesome/free-solid-svg-icons'

const getlocalitem=()=>{
    let lst=localStorage.getItem('lists')
    console.log(lst);
if(lst){
    return JSON.parse(localStorage.getItem('lists'))
}else{
    return [];
}

}

const Todo =()=>{
    const[item,setitem]=useState("");
    const[val,setval]=useState(getlocalitem());
    const[toggle,setoggle]=useState(true);
    const[Edit,isEdititem]=useState("");


    const getvalue=(e)=>{
setitem(e.target.value)
    }
    const additem=()=>{
        if(!item){
            alert("Invalid!! Enter Todo Please")
        }else if(item && !toggle){
            setval(
val.map((Val)=>{
    if(Val.id===Edit){
        return{...Val, name:item}
    }
    return Val;
    
})
)
      setoggle(true)
    setitem("")
    }
        else{
            const allitem={id: new Date().getTime().toString(),
            name:item}
setval([...val,allitem])
setitem("");
        }
        


    }
     const delbtn=(id)=>{
        const upitem=val.filter((elem,index)=>{
            return id!==elem.id;
        })
        setval(upitem);

     }
     const dltall=()=>{
        setval([]);
     }
     const edititem=(id)=>{
setoggle(false)
const edit=val.find((elem)=>{
    return id===elem.id
})
setitem(edit.name)
isEdititem(edit.id)


     }
     useEffect(()=>{
        localStorage.setItem("lists",JSON.stringify(val))
     },[val])
return(
    <>
    <div>
    <div className="Head">
    <h1>My Todoie App</h1>
    </div>
    
    <div className="Main">
<div className="MainChild">
   
<input type="text" className="inp" onChange={getvalue} value={item} placeholder="ENTER TODO..."/>
{
    toggle ? <FontAwesomeIcon className="faplus" onClick={additem} icon={faPlus} /> : <FontAwesomeIcon className="faplus" onClick={additem} icon={faPenToSquare} />
    
}

<button className="Btn" onClick={dltall}>Delete All</button>
</div>
<div className="content">
    <ul>
        {
            val.map((value,index)=>{
                return(
<li key={index}>
<h3 className="item">{value.name}</h3>
<FontAwesomeIcon className="fatrash" icon={faTrash} onClick={()=>delbtn(value.id)} />
<FontAwesomeIcon className="fapen" onClick={()=>edititem(value.id)} icon={faPenToSquare} />
        </li>
                )
            })
        }
        
    </ul>
    
</div>

    </div>
    </div>
    </>
)
}
export default Todo; */

import React, { useState } from 'react';

const Cursor = () => {
  const [dragging, setDragging] = useState(false);

  const handleDragStart = (e) => {
    setDragging(true);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  const handleDragLeave = (e) => {
    setDragging(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setDragging(false);
    console.log('Element dropped!');
  };

  return (
    <div
      draggable
      onDragStart={handleDragStart}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
      style={{ width: 200, height: 200, backgroundColor: dragging ? 'blue' : 'red' }}
    >
      Drag me!
    </div>
  );
};

export default Cursor;