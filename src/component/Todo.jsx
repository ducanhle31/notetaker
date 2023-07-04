import React, { useState, useEffect, useRef } from "react";

import Draggable from "react-draggable";
import "./Todo.css";
export default function Todo() {
  // khởi tạo các biến trạng thái

  //Khởi tạo state lưu giá trị người dùng nhập vào ô input
  const [task, setTask] = useState("");
  // khởi tạo state lưu trữ mảng todo
  const [tasks, setTasks] = useState([]);
  //khởi tạo state sửa giá trị theo Id
  const [todoEditing, setTodoEditing] = useState(null);
  //khởi tạo state sửa giá trị người dùng nhập vào ô input
  const [editingText, setEditingText] = useState("");
  // khởi tạo state Lưu trữ vị trí nhấp chuột của việc cần làm đang được chỉnh sửa.
  const [editingClickPosition, setEditingClickPosition] = useState("");
  // Lưu trữ vị trí nhấp chuột của người dùng trên trang.
  const [clickPosition, setClickPosition] = useState({ x: null, y: null });
  // Lưu trữ vị trí của ghi chú dán có thể kéo được.
  const [position, setPosition] = useState(clickPosition);
  // Chuyển đổi để hiển thị/ẩn trường nhập liệu để thêm tác vụ mới.
  const [showResults, setShowResults] = useState(false);
  // lưu màu nền , giá trị transform, Font chữ
  const [background, setBackground] = useState("null");
  const [transform, setTransform] = useState("null");
  const [randomFonts, setRandomFonts] = useState("Mali, cursive");
  // khởi tạo đối tượng tham chiếu để kéo các thành phần
  const draggableRef = useRef(null);
  // handleClick: Được gọi khi người dùng nhấp vào trang. Cập nhật vị trí nhấp chuột, màu nền và độ nghiêng của ghi chú dán.
  const handleClick = (event) => {
    const { clientX, clientY } = event;
    setClickPosition({ x: clientX, y: clientY });
    handleButtonBackground();
    handleTransform();
  };
  // handleDrag: Được gọi khi người dùng kéo ghi chú dán. Cập nhật vị trí và xử lý các cập nhật trạng thái liên quan đến chỉnh sửa.
  const handleDrag = (e, ui) => {
    const { x, y } = ui;
    setPosition({ x, y });

    if (task && task.id) {
      setTodoEditing(task.id);
      setEditingClickPosition(task.position);
    }

    handleButtonBackground();
    handleTransform();
  };
  // submitEdits: Được gọi khi người dùng gửi các chỉnh sửa cho một việc cần làm. Cập nhật tiêu đề và vị trí của nhiệm vụ trong mảng nhiệm vụ.
  function submitEdits(id) {
    const updatedTasks = [...tasks].map((task) => {
      if (task.id === id) {
        task.title = editingText;
        task.position = editingClickPosition;
      }
      return task;
    });
    setTasks(updatedTasks);
    setTodoEditing(null);
  }

  const colors = [
    "#f8a5a5",
    "#ffdde1",
    "#00f5ee",
    "#3cf066",
    "#f5f156",
    "#6DD5FA",
  ];
  // Tạo màu nền ngẫu nhiên cho ghi chú dán.
  const handleButtonBackground = () => {
    const randomIndexBackground = Math.floor(Math.random() * colors.length);
    const randomElements = colors[randomIndexBackground];
    setBackground(randomElements);
  };
  //Tạo một giá trị biến đổi xoay ngẫu nhiên cho ghi chú dán.
  const handleTransform = () => {
    const randomIndexTransform = Math.floor(Math.random() * (8 - -8)) + -8;
    setTransform(randomIndexTransform);
  };

  const textStyles = {
    position: " absolute",
    top: clickPosition.y,
    left: clickPosition.x,
    backgroundColor: `${background}`,
    transform: `rotate(${transform}deg) `,
  };

  const fonts = [
    "Kalam, cursive",
    "'Sacramento', cursive",
    "Just Another Hand', cursive",
    "'Mali', cursive",
  ];
  // Được gọi khi người dùng nhấp đúp vào ghi chú . Tạo phông chữ ngẫu nhiên cho ghi chú dán.
  const handleButtonClick = () => {
    const randomIndex = Math.floor(Math.random() * fonts.length);
    const randomElement = fonts[randomIndex];
    setRandomFonts(randomElement);
  };
  // tải mọi tác vụ được lưu trữ trước đó từ localStorage khi thành phần được gắn kết.
  useEffect(() => {
    if (localStorage.getItem("localTasks")) {
      const storedList = JSON.parse(localStorage.getItem("localTasks"));
      setTasks(storedList);
    }
  }, []);
  //Được gọi khi người dùng thêm một tác vụ mới. Tạo một đối tượng  mới và thêm nó vào mảng , đồng thời cập nhật localStorage.

  const addTask = (e) => {
    if (task) {
      const newTask = {
        id: new Date().getTime().toString(),
        title: task,
        clickPosition: clickPosition,
        background: background,
        transform: transform,
        randomFonts: randomFonts,
        position: position,
      };
      setTasks([...tasks, newTask]);
      localStorage.setItem("localTasks", JSON.stringify([...tasks, newTask]));

      setShowResults(false);
    }
  };
  //Được gọi khi người dùng xóa một tác vụ. Xóa tác vụ khỏi mảng tác vụ và cập nhật localStorage.

  const handleDelete = (task) => {
    const deleted = tasks.filter((t) => t.id !== task.id);
    setTasks(deleted);
    localStorage.setItem("localTasks", JSON.stringify(deleted));
  };

  return (
    <div onClick={handleClick}>
      <div
        onClick={() => {
          if (task.trim() == "") {
            setShowResults(true);
          } else {
            setTask("");
          }
        }}
        style={{ height: "2200px", width: "100%", position: "relative" }}
      >
        {showResults ? (
          <div
            onBlur={addTask}
            className="container "
            style={textStyles}
            onClick={(event) => event.stopPropagation()}
          >
            <svg width="0" height="0">
              <defs>
                <clipPath id="stickyClip" clipPathUnits="objectBoundingBox">
                  <path
                    d="M 0 0 Q 0 0.69, 0.03 0.96 0.03 0.96, 1 0.96 Q 0.96 0.69, 0.96 0 0.96 0, 0 0"
                    strokeLinejoin="round"
                    strokeLinecap="square"
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
              style={{
                fontFamily: `${randomFonts}`,
                backgroundColor: `${background}`,
              }}
            />
          </div>
        ) : null}

        {tasks.map((task) => (
          <div
            key={task.id}
            style={{ transform: `rotate(${task.transform}deg) ` }}
          >
            <Draggable
              ref={draggableRef}
              onDrag={handleDrag}
              onDragover={() => submitEdits(task.id)}
            >
              <div
                style={{
                  top: `${task.clickPosition.y}px`,
                  left: `${task.clickPosition.x}px`,
                  position: "absolute",
                  transform: `rotate(${task.transform}deg) `,
                }}
                className="sticky-container"
                key={task.id}
                onClick={(event) => event.stopPropagation()}
              >
                <div className="sticky-outer">
                  <div className="sticky">
                    <svg width="0" height="0">
                      <defs>
                        <clipPath
                          id="stickyClip"
                          clipPathUnits="objectBoundingBox"
                        >
                          <path
                            d="M 0 0 Q 0 0.69, 0.03 0.96 0.03 0.96, 1 0.96 Q 0.96 0.69, 0.96 0 0.96 0, 0 0"
                            strokeLinejoin="round"
                            strokeLinecap="square"
                          />
                        </clipPath>
                      </defs>
                    </svg>
                    <div
                      className="sticky-content"
                      style={{
                        backgroundColor: `${task.background}`,
                        fontFamily: `${task.randomFonts}`,
                      }}
                      onDoubleClick={() => {
                        setTodoEditing(task.id), setEditingText(task.title);
                      }}
                      onBlur={() => submitEdits(task.id)}
                    >
                      <p className="delete" onClick={() => handleDelete(task)}>
                        <i className="bi bi-trash3"></i>
                      </p>
                      <div>
                        {task.id === todoEditing ? (
                          <textarea
                            placeholder="Write your note..."
                            className="form-control editform-control"
                            value={editingText}
                            type="text"
                            onChange={(e) => setEditingText(e.target.value)}
                            style={{
                              backgroundColor: `${task.background}`,
                              fontFamily: `${task.randomFonts}`,
                            }}
                          />
                        ) : (
                          <p
                            className="til"
                            style={{ fontFamily: `${task.randomFonts}` }}
                          >
                            {task.title}
                          </p>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </Draggable>
          </div>
        ))}
      </div>
    </div>
  );
}
