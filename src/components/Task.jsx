import {useRef, useState, useEffect} from 'react';

const Task = ({name, description, categories, id, dispatch}) => {
    const catText = useRef("");
    const editName = useRef("");
    const editDesc = useRef("");
    const addBtn = useRef("");
    const editTaskBtn = useRef("");
    const [catInput, setCatInput] = useState(false);
    const [editInput, setEditInput] = useState(false);
    useEffect(() => {
        let test = document.getElementsByClassName("editBtns");
        for(let i of test) {
            i.addEventListener("click", editCategory)
        }
        addBtn.current.addEventListener("click", addCat);
        editTaskBtn.current.addEventListener("click", editTask);
      return () => {
        if(addBtn.current) {
            addBtn.current.removeEventListener("click", addCat);
            addBtn.current.removeEventListener("click", subCat);
        }
        if(editTaskBtn.current) {
            editTaskBtn.current.removeEventListener("click", editTask);
            editTaskBtn.current.removeEventListener("click", submitTaskEdit);
        }
        for(let i of test) {
            i.removeEventListener("click", editCategory)
            i.removeEventListener("click", submitCatEdit)
        }
      }
    }, [])
    
    function removeFunc(e) {
        let catName = e.target.parentElement.parentElement.firstChild.innerHTML;
        dispatch({type: "deleteCategory", payload: {id: id, task: name, category: catName}})
    }
    function deleteTask() {
        dispatch({type: "deleteTask", payload: id})
    }
    function addCat(e) {
        setCatInput(true);
        e.target.removeEventListener("click", addCat);
        e.target.addEventListener("click", subCat);
    }
    function subCat(e) {
        if(catText.current.value) {
            setCatInput(false);
            dispatch({type: "addCategory", payload: {id: id, category: catText.current.value}});
            e.target.removeEventListener("click", subCat);
            e.target.addEventListener("click", addCat);
        }
    }
    function editTask(e) {
        setEditInput(true);
        e.target.removeEventListener("click", editTask);
        e.target.addEventListener("click", submitTaskEdit);
    }
    function submitTaskEdit(e) {
        if(editName.current.value && editDesc.current.value) {
            dispatch({type: "editTask", payload: {id: id, description: editDesc.current.value, name: editName.current.value}});
            setEditInput(false);
            e.target.removeEventListener("click", submitTaskEdit);
            e.target.addEventListener("click", editTask);
        }
    }
    function editCategory(e) {
        e.target.parentElement.lastChild.style.display = "inline-block";
        e.target.removeEventListener("click", editCategory);
        e.target.addEventListener("click", submitCatEdit);
    }
    function submitCatEdit(e) {
        let oldCatName = e.target.parentElement.parentElement.firstChild.innerHTML;
        let newCatName = e.target.parentElement.lastChild;
        if(newCatName.value) {
            dispatch({type: "editCategory", payload: {id: id, oldCat: oldCatName, newCat: newCatName.value}});
            newCatName.style.display = "none";
            e.target.removeEventListener("click", submitCatEdit);
            e.target.addEventListener("click", editCategory);
        }
    }

  return (
    <div className='eachTask'>
        <h1>{name}</h1>
        <p>{description}</p>
        <h3>Categories:</h3>
        {categories.map((item, index) => {
            return (
                <div className="catBox" key={index}>
                    <h4 className="catTitle" onClick={(e) => {
                        if(e.target.parentElement.lastChild.style.display === "none") {
                            e.target.parentElement.lastChild.style.display = "block";
                        } else {
                            e.target.parentElement.lastChild.style.display = "none";
                        }
                    }}>{item}</h4>
                    <div style={{display: "none"}}>
                        <button type="button" onClick={removeFunc}>Remove category</button>
                        <button type="button" className="editBtns">Edit category</button>
                        <input type="text" style={{display: "none"}} defaultValue={item}/>
                    </div>
                </div>
            )
        })}
        {catInput ? <input type="text" ref={catText}></input> : <></>}
        <button type="button" ref={addBtn} id={name}>Add category</button>
        {editInput && <>
            <label for="editName">Name:</label>
            <input type="text" id="editName" ref={editName} defaultValue={name}/>
            <label for="editDesc">Description:</label>
            <input type="text" id="editDesc" ref={editDesc} defaultValue={description}/>
        </>}
        <button type="button" ref={editTaskBtn}>Edit task</button>
        <button type="button" onClick={deleteTask}>Delete task</button>
    </div>
  )
}

export default Task;