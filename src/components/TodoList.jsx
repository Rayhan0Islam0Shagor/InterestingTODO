import React, { useEffect, useState } from "react";
import swal from "sweetalert";
import logo from "../asset/logo.png";

const getLocalTasks = () => {
  let todoList = localStorage.getItem("listOfTodo");

  if (todoList) {
    return JSON.parse(localStorage.getItem("listOfTodo"));
  } else {
    return [];
  }
};

const TodoList = () => {
  const [inputData, setInputData] = useState("");
  const [tasks, setTasks] = useState(getLocalTasks());
  const [toggleBtn, setToggleBtn] = useState(true);
  const [editTask, setEditTask] = useState(null);

  const addItem = (e) => {
    if (!inputData) {
      swal("You don't entered anything to do, Please Add a new task!");
    } else if (inputData && !toggleBtn) {
      setTasks(
        tasks.map((elem) => {
          if (elem.id === editTask) {
            return { ...elem, task: inputData };
          }
          return elem;
        })
      );
      setToggleBtn(true);
      setInputData("");
      setEditTask(null);
    } else {
      const newData = { id: new Date().getTime().toString(), task: inputData };
      setTasks([...tasks, newData]);
      swal("Congrats!", "You add a new task successfully!", "success");
      setInputData("");
    }
  };

  const editItem = (id) => {
    const newEditItem = tasks.find((elem) => {
      return elem.id === id;
    });
    console.log(newEditItem);

    setToggleBtn(false);
    setInputData(newEditItem.task);
    setEditTask(id);
  };

  const deleteItem = (id) => {
    const deletedItem = tasks.filter((elem) => {
      return elem.id !== id;
    });
    if (deletedItem) {
      setTasks(deletedItem);
      swal("Congrats!", "You complete this task successfully!", "success");
    }
  };

  const removeAll = () => {
    swal({
      title: "Are you sure?",
      text:
        "Once deleted, you will not be able to recover this imaginary item!",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    }).then((willDelete) => {
      if (willDelete) {
        swal("Your imaginary file has been deleted!", {
          icon: "success",
        });
      } else {
        swal("Your imaginary item is safe!");
      }
    });
    setTimeout(() => {
      setTasks([]);
    }, 2000);
  };

  // Add Data to localStorage
  useEffect(() => {
    localStorage.setItem("listOfTodo", JSON.stringify(tasks));
  }, [tasks]);

  return (
    <div>
      <figure className="d-flex justify-content-center">
        <img className="logo " src={logo} alt="logo" />
      </figure>

      <div className="d-flex justify-content-center align-items-center mb-4 input__div">
        <input
          placeholder="write here..."
          type="text"
          value={inputData}
          onChange={(e) => setInputData(e.target.value)}
        />
        {toggleBtn ? (
          <i className="fas fa-plus plus" onClick={addItem}></i>
        ) : (
          <i className="fas fa-edit edit ml-3" onClick={addItem}></i>
        )}
      </div>

      <div style={{ backgroundColor: "#f5f7b2" }}>
        <h5 className="text-uppercase text-dark text-center pt-2 pb-2">
          Your TODO List 🚀
        </h5>

        <div className="scroll__bar">
          <div className="list-group p-3">
            {tasks.length ? (
              tasks.map((item, i) => {
                return (
                  <p
                    key={item.id}
                    className="list-group-item list-group-item-action list-group-item-primary d-flex justify-content-between align-items-center"
                  >
                    <span className="text-dark">
                      {i + 1}.{"       "}
                      {item.task}
                    </span>
                    <span>
                      <i
                        onClick={() => editItem(item.id)}
                        className="fas fa-edit edit mr-3"
                      ></i>
                      <i
                        onClick={() => deleteItem(item.id)}
                        className="fas fa-trash trash ml-3 mr-2"
                      ></i>
                    </span>
                  </p>
                );
              })
            ) : (
              <p className="list-group-item mt-2 list-group-item-action list-group-item-light text-center font-weight-bold">
                You have nothing on your TODO List
              </p>
            )}
          </div>
        </div>
      </div>

      <div className="d-flex justify-content-center mt-2">
        <button onClick={removeAll} className="text-uppercase btn btn-danger">
          {tasks.length ? "Clear all" : "Please add task"}
        </button>
      </div>
    </div>
  );
};

export default TodoList;
