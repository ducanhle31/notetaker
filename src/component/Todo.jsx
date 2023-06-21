import React, { useState, useEffect } from "react";
import "./Todo.css"
export default function Todo({clickPosition}) {

  const [task, setTask] = useState("");
    const [color, setColor] = useState("");
  const [tasks, setTasks] = useState([]);
var today = new Date();
var date = today.getDate()+'-'+(today.getMonth()+1)+'-'+today.getFullYear();
  useEffect(()=>{
      if(localStorage.getItem("localTasks")){
          const storedList = JSON.parse(localStorage.getItem("localTasks"));
          setTasks(storedList);
      }
  },[])
console.log(tasks)
  const addTask = (e) => {
    if (task) {
      const newTask = { id: new Date().getTime().toString(), title: task,date:date, color:color,clickPosition:clickPosition };
      setTasks([...tasks, newTask]);
      localStorage.setItem("localTasks", JSON.stringify([...tasks, newTask]));
      setTask("");
    }
  };

  const handleDelete = (task)=>{
      const deleted = tasks.filter((t)=>t.id !== task.id);
      setTasks(deleted);
      localStorage.setItem("localTasks", JSON.stringify(deleted))
  }


  return (
    <div className="container " onClick={(event)=>event.stopPropagation()} >
    
      <div className="input">
        <textarea
          name="task"
          type="text"
          value={task}
          placeholder="Write your task..."
          className="form-control"
          onChange={(e) => setTask(e.target.value)}
        />
      </div>
      <div className="bottom">
  <div className="color">

<label className="label 
">
  <input type="radio"  name="radio"  value="#f27f7f"   onChange={(e) => setColor(e.target.value)}/>
  <span className="checkmark checkmark1"></span>
</label>

<label className="label
">
  <input type="radio" name="radio" value="#ff0000"   onChange={(e) => setColor(e.target.value)}/>
  <span className="checkmark checkmark2"></span>
</label>
<label className="label
">
  <input type="radio" name="radio" value="#fffc00"   onChange={(e) => setColor(e.target.value)}/>
  <span className="checkmark checkmark3"></span>
</label>
<label className="label
">
  <input type="radio" name="radio" value="#23ff00"   onChange={(e) => setColor(e.target.value)}/>
  <span className="checkmark checkmark4"></span>
</label>

<label className="label 
">
  <input type="radio"  name="radio"  value="#ffa200"   onChange={(e) => setColor(e.target.value)}/>
  <span className="checkmark checkmark5"></span>
</label>

<label className="label 
">
  <input type="radio"  name="radio"  value="#f40ffe"   onChange={(e) => setColor(e.target.value)}/>
  <span className="checkmark checkmark6"></span>
</label>

<label className="label 
">
  <input type="radio"  name="radio"  value="#0ffecf"   onChange={(e) => setColor(e.target.value)}/>
  <span className="checkmark checkmark7"></span>
</label>
<label className="label 
">
  <input type="radio"  name="radio"  value="#bc7ff2"   onChange={(e) => setColor(e.target.value)}/>
  <span className="checkmark checkmark8"></span>
</label>
</div>
      <div className="Save">
        <button
          className="btn btn-primary form-control material-icons"
          onClick={addTask}
        >
        Save
        </button>
      </div>
      </div>
    
    
      {tasks.map((task) => (
          <div className="cardcomment" key={task.id} style={{backgroundColor:`${task.color}`}}>
      <p  className="delete"   onClick ={()=> handleDelete(task)}> <i className="bi bi-x-circle"></i></p>
     <div className="card1" >
   {task.title}
  
  </div>        
<p className="date">{task.date}</p>
      </div>
      
      ))}
    
    </div>
  );
}