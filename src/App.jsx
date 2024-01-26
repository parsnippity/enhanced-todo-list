import data from "./data";
import Task from "./components/Task";
import {useReducer, useState, useRef, useEffect} from "react";
import "./App.css";
let list = localStorage.getItem("data");
if(!list) {
  list = data;
} else {
  list = JSON.parse(list)
}

function App() {
  const [addInput, setAddInput] = useState(false);
  const addName = useRef("");
  const addCat = useRef("");
  const addDesc = useRef("");
  const addBtn = useRef("");
  function addTask(e) {
    setAddInput(true);
    e.target.removeEventListener("click", addTask);
    e.target.addEventListener("click", submitTask);
  }
  function submitTask(e) {
    if(addName.current.value && addDesc.current.value && addCat.current.value) {
      dispatch({type: "addTask", payload: {name: addName.current.value, description: addDesc.current.value, id: state[state.length - 1].id + 1, categories: [addCat.current.value]}});
      setAddInput(false);
      e.target.removeEventListener("click", submitTask);
      e.target.addEventListener("click", addTask);
    }
  }
  function sortAlpha() {
    dispatch({type: "alphaSort"});
  }
  function sortId() {
    dispatch({type: "idSort"})
  }
  function reducer(state, action) {
    switch(action.type) {
      case "addTask":
        return [
          ...state, action.payload
        ]
      case "deleteTask":
        return (
          state.filter((item) => item.id !== action.payload)
        )
      case "editTask":
        return (
          state.map((item) => {
            if(item.id !== action.payload.id) {
              return item;
            } else {
              return {...item, description: action.payload.description, name: action.payload.name}
            }
          })
        )
      case "addCategory":
        return (
          state.map((item) => {
            if(item.id !== action.payload.id) {
              return item;
            } else {
              let newCats = [...item.categories];
              if(!newCats.includes(action.payload.category)) {
                newCats.push(action.payload.category);
              }
              return {...item, categories: newCats}
            }
          })
        );
      case "deleteCategory":
        return (
          state.map((item) => {
            if(item.id !== action.payload.id) {
              return item;
            } else {
              let anotherCat = [...item.categories];
              anotherCat = anotherCat.filter((i) => i !== action.payload.category);
              return {...item, categories: anotherCat}
            }
          })
        );
      case "editCategory":
        return (
          state.map((item) => {
            if(item.id !== action.payload.id) {
              return item;
            } else {
              let finalCat = [...item.categories];
              if(!finalCat.includes(action.payload.newCat)) {
                finalCat = finalCat.map((i) => {
                  if(i === action.payload.oldCat) {
                    return action.payload.newCat;
                  } else return i;
                })
              }
              return {...item, categories: finalCat}
            }
          })
        );
      case "alphaSort":
          let alpha = [...state];
          alpha.sort((a, b) => {
            if (a.name.toUpperCase() < b.name.toUpperCase()) {
              return -1;
            } else if (a.name.toUpperCase() > b.name.toUpperCase()) {
              return 1;
            } else {
              return 0;
            }
          });
          return [...alpha];
      case "idSort":
        let ids = [...state];
        ids.sort((a, b) => {
          if(a.id < b.id) return -1
          else if(a.id > b.id) return 1
          else return 0
        })
        return [...ids];
      default: return "no action by that name"
    }
  }
  const [state, dispatch] = useReducer(reducer, list);
  useEffect(() => {
    state.forEach((item) => {
      item.categories.forEach((jack) => {
        if(!catList.includes(jack)) {
          catList.push(jack);
        }
      })
    })
    catList.sort();
    localStorage.setItem("data", JSON.stringify([...state]));
    setTaskList([...state])
  }, [state])
  
  const [taskList, setTaskList] = useState([...state])
  
  let catList = [];
    state.forEach((item) => {
      item.categories.forEach((jack) => {
        if(!catList.includes(jack)) {
          catList.push(jack);
        }
      })
    })
    catList.sort();
  useEffect(() => {
    addBtn.current.addEventListener("click", addTask);
    return () => {
      if(addBtn.current) {
        addBtn.current.removeEventListener("click", addTask);
        addBtn.current.removeEventListener("click", submitTask);
      }
    }
  }, [])
  function catFilter(e) {
    let filteredList = [];
    state.forEach((item) => {
      if(item.categories.includes(e.target.innerHTML)) {
        filteredList.push(item);
      }
    })
    setTaskList([...filteredList]);
  }

  return (
    <div className="App">
      <h1 id="appName">To-Do List</h1>
      <div id="filterBtns">
      <button onClick={sortAlpha}>Sort by name</button>
      <button onClick={sortId}>Sort by id</button>
      <p>Category Filters:</p>
      {catList.map((item, index) => {
        return <button onClick={catFilter} key={index}>{item}</button>
      })}
      <br></br>
      {addInput && <>
        <label for="addName">Name:</label>
        <input type="text" id="addName" ref={addName}/>
        <label for="addDesc">Description:</label>
        <input type="text" id="addDesc" ref={addDesc}></input>
        <label for="addCat">Category:</label>
        <input type="text" id="addCat" ref={addCat}/>
      </>}
      <button ref={addBtn}>Add task</button>
      </div>
      {taskList.map((item) => {
        return <Task {...item} dispatch={dispatch} key={item.id}/>
      })}
    </div>
  );
}

export default App;