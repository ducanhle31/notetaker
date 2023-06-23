import React, { useState, useEffect} from "react";
import "./Todo.css"
export default function Todo() {
  const [task, setTask] = useState("");
  const [tasks, setTasks] = useState([]);
  const [todoEditing, setTodoEditing] = useState(null);
  const [editingText, setEditingText] = useState("");
console.log(editingText)
console.log(tasks)
function submitEdits(id) {
    const updatedTasks = [...tasks].map((task) => {
      if (task.id === id) {
        task.title = editingText;
      }
      return task;
    });
    setTasks(updatedTasks);
    setTodoEditing(null);
  }



const [showResults, setShowResults] =useState(false)
const months = ["#0872ff", "#f27f7f", "#00d4ff", "#f556dc", "#dff500", 
"#00f5ee", "#23ff00", "#d7bc32", "#f5f056", "#56bff5", ];
const background = months[Math.floor(Math.random() * months.length)];
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

const fonts = ["Arial", "Times New Roman", "Roboto", "Kalam" ];
  const [randomFonts, setRandomFonts] = useState("null");
  const handleButtonClick = () => {
    const randomIndex = Math.floor(Math.random() * fonts.length);
  const randomElement = fonts[randomIndex];
    setRandomFonts(randomElement);
  };
console.log(randomFonts)
  //
const today = new Date();
const date = today.getDate()+'-'+(today.getMonth()+1)+'-'+today.getFullYear();
const  transform = Math.floor(Math.random() * (8 - (-8))) + (-8);

  useEffect(()=>{
      if(localStorage.getItem("localTasks")){
          const storedList = JSON.parse(localStorage.getItem("localTasks"));
          setTasks(storedList);
      }
  },[])


  const addTask = (e) => {
    if (task) {
      const newTask = { id: new Date().getTime().toString(), title: task,date:date, clickPosition:clickPosition,background:background, transform:transform,randomFonts:randomFonts};
      setTasks([...tasks, newTask]);
      localStorage.setItem("localTasks", JSON.stringify([...tasks, newTask]));
      
setShowResults(false)
    }
  
  };


  const handleDelete = (task)=>{
      const deleted = tasks.filter((t)=>t.id !== task.id);
      setTasks(deleted);
      localStorage.setItem("localTasks", JSON.stringify(deleted))
  }

  return (
    <div onClick={handleClick}>
  <div onClick = {() => {if(task.trim()=='') {setShowResults(true)}else{setTask("");}}}   style={{ height: '2200px', width:'100%',position:"relative"}}  > 
 { showResults ?
 
    <div      onBlur={addTask }  className="container " style={textStyles} onClick={(event)=>event.stopPropagation()} >

    
        <textarea
          name="task"
          type="text"
          value={task}
          placeholder="Write your note..."
          className="form-control"
          onChange={(e) => setTask(e.target.value)}
     onDoubleClick={handleButtonClick}
  style={{fontFamily:`${randomFonts}`}}
  
        />
    
    </div> 

 : null }
    
    



  {tasks.map((task) => (


<div    style={{top:`${task.clickPosition.y}px`,left:`${task.clickPosition.x}px`,position:"absolute", transform:`rotate(${task.transform}deg) `,

}} className="sticky-container" key={task.id} onClick={(event)=>event.stopPropagation()}>
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
      <div className="sticky-content" style={{backgroundColor:`${task.background}`,fontFamily:`${task.randomFonts}`}} >
          <p  className="delete"  onClick ={()=> handleDelete(task)}> <i className="bi bi-x-circle"></i></p>
  {task.id === todoEditing ? (<textarea
    placeholder="Write your note..."
          className="form-control"
          value={editingText}
                type="text"
                onChange={(e) => setEditingText(e.target.value)}
                style={{backgroundColor:`${task.background}`,fontFamily:`${task.randomFonts}`}} 
              />):(
                
    <p className="til" > {task.title}</p>
                )
  }

      <p className="date">{task.date}</p>
    
      </div>
    
    </div>

  <div className="todo-actions">
            {task.id === todoEditing ? (
              <button onClick={() => submitEdits(task.id)}>Submit Edits</button>
            ) : (
              <button onClick={() => {setTodoEditing(task.id),setEditingText(task.title)}}>Edit</button>
            )}

          </div>

  </div>

  
</div>

        
      
      ))}
    
    </div>
    </div>
  
  
  );
}