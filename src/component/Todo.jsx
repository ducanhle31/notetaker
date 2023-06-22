import React, { useState, useEffect} from "react";
import "./Todo.css"
export default function Todo() {
  const [clickPosition, setClickPosition] = useState({ x: null, y: null });
  const handleClick = (event) => {
    const { clientX, clientY } = event;
    setClickPosition({ x: clientX, y: clientY });
   
  };

  const textStyles = {
  position: ' absolute',
    top: clickPosition.y,
    left: clickPosition.x,

  };

//

const [showResults, setShowResults] =useState(false)
const onClick = () => setShowResults(false)

  ///

  const [task, setTask] = useState("");
  const [tasks, setTasks] = useState([]);
 
const today = new Date();
const date = today.getDate()+'-'+(today.getMonth()+1)+'-'+today.getFullYear();
  const background = "#" + ((1<<24)*Math.random() | 0).toString(16);
  const  transform = Math.floor(Math.random() * (8 - (-8))) + (-8);

  useEffect(()=>{
      if(localStorage.getItem("localTasks")){
          const storedList = JSON.parse(localStorage.getItem("localTasks"));
          setTasks(storedList);
      }
  },[])

console.log(clickPosition)
  const addTask = (e) => {
    if (task) {
      const newTask = { id: new Date().getTime().toString(), title: task,date:date, clickPosition:clickPosition,background:background, transform:transform};
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

/*  */





  return (
    <div  onClick={handleClick}>
  <div onClick = {() => setShowResults(true)}  style={{ height: '2200px', width:'100%',position:"relative"}}  > 
 { showResults ?
 
    <div className="container " style={textStyles} onClick={(event)=>event.stopPropagation()}  >
    
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
  
      <div className="Save">
        <button
          className="btn btn-primary form-control material-icons"
         onClick={addTask}
        >
      
        <div onClick={onClick}>  Save</div>
        </button>
      </div>
      </div>
    
    
    
    
    </div> 

 : null }
    
    
  {tasks.map((task) => (
  <div >

    
  
<div style={{top:`${task.clickPosition.y}px`,left:`${task.clickPosition.x}px`,position:"absolute", transform:`rotate(${task.transform}deg) `}} className="sticky-container" key={task.id} onClick={(event)=>event.stopPropagation()}>
  <div className="sticky-outer">
    <div className="sticky">
      <svg width="0" height="0">
        <defs>
          <clipPath id="stickyClip" clipPathUnits="objectBoundingBox">
            <path
              d="M 0 0 Q 0 0.69, 0.03 0.96 0.03 0.96, 1 0.96 Q 0.96 0.69, 0.96 0 0.96 0, 0 0"
              stroke-linejoin="round"
              stroke-linecap="square"
            />
          </clipPath>
        </defs>
      </svg>
      <div className="sticky-content" style={{backgroundColor:`${task.background}`}} >
          <p  className="delete"  onClick ={()=> handleDelete(task)}> <i className="bi bi-x-circle"></i></p>
    <p className="til"> {task.title}</p>
      <p className="date">{task.date}</p>
      </div>
    
    </div>
  </div>
</div>
  </div>
        
      
      ))}
    
    </div>
    </div>
  
  
  );
}