import React, { useState, useEffect} from "react";
import "./Todo.css"
export default function Todo() {
  const [task, setTask] = useState("");
  const [tasks, setTasks] = useState([]);
  const [todoEditing, setTodoEditing] = useState(null);
  const [editingText, setEditingText] = useState("");

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


const months = [ "#f8a5a5", "#ffdde1", "#f978ff", "#ffdb37", 
"#00f5ee", "#3cf066","#47f640" ,"#f5f156", "#6DD5FA", ];
const [background, setBackground] = useState("null");
  const handleButtonBackground = () => {
    const randomIndexBackground = Math.floor(Math.random() * months.length);
  const randomElements = months[randomIndexBackground];
    setBackground(randomElements);
  };

const [transform, setTransform] = useState("null");
  const handleTransform = () => {
    const randomIndexTransform= Math.floor(Math.random() * (8 - (-8))) + (-8);
  setTransform(randomIndexTransform);
  };


const [showResults, setShowResults] =useState(false)

  const [clickPosition, setClickPosition] = useState({ x: null, y: null });
  const handleClick = (event) => {
    const { clientX, clientY } = event;
    setClickPosition({ x: clientX, y: clientY });
   handleButtonBackground();
   handleTransform();
  };

  const textStyles = {
  position: ' absolute',
    top: clickPosition.y,
    left: clickPosition.x,
backgroundColor:`${background}`,
transform:`rotate(${transform}deg) `
  };

const fonts = ["'Dancing Script', cursive", " 'Caveat', cursive", "'Rock Salt', cursive", "Kalam, cursive","'Sacramento', cursive","Just Another Hand', cursive" ];
  const [randomFonts, setRandomFonts] = useState("null");
  const handleButtonClick = () => {
    const randomIndex = Math.floor(Math.random() * fonts.length);
  const randomElement = fonts[randomIndex];
    setRandomFonts(randomElement);
  };
//

  //
const today = new Date();
const date = today.getDate()+'-'+(today.getMonth()+1)+'-'+today.getFullYear();



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
 
    <div   onBlur={addTask }  className="container " style={textStyles} onClick={(event)=>event.stopPropagation()} >
  
        
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
  <textarea
          name="task"
          type="text"
          value={task}
          placeholder="Write your note..."
          className="form-control"
          onChange={(e) => setTask(e.target.value)}
     onDoubleClick={handleButtonClick}
  style={{fontFamily:`${randomFonts}`,backgroundColor:`${background}`,}}

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
      <div className="sticky-content" style={{backgroundColor:`${task.background}`,fontFamily:`${task.randomFonts}`}}   onDoubleClick={() => {setTodoEditing(task.id),setEditingText(task.title)}}
       onBlur={() => submitEdits(task.id)}
      >
          <p  className="delete"  onClick ={()=> handleDelete(task)}><i className="bi bi-x-lg"></i></p>
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

  </div>

</div>
    
      ))}
    
    </div>
    </div>
  
  );
}