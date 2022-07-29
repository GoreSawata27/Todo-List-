import React, { useState } from "react";
import "./../styles/App.css";

function App() {
  let [inputValue, setInputValue] = useState("");
  let [toDoList, setList] = useState([]);
  let [showList, setShowList] = useState(false);
  const handleChange = (e) => {
    setInputValue(e.target.value);
  };
  const addToList = () => {
    if (inputValue === "") {
      return;
    }
    const newItem = {
      id: toDoList.length + Math.random(),
      value: inputValue,
      editable: false,
      updatedValue: "",
    };
    // copy list
    const copiedList = [...toDoList];

    // store new value
    copiedList.push(newItem);

    // set list
    setList(copiedList);
    setInputValue("");
    setShowList(true);
  };
  const deleteItem = (id) => {
    let tempList = [...toDoList];
    tempList = tempList.filter((item) => item.id != id);
    setList(tempList);
    if (tempList.length === 0) {
      setShowList(false);
    }
  };
  const editItem = (id) => {
    let copy = [...toDoList];
    copy = copy.map((item) => {
      if (item.id != id) {
        return item;
      }
      item.editable = true;
      return item;
    });
    setList(copy);
  };
  const handleEditChange = (e, id) => {
    let copy = [...toDoList];
    copy = copy.map((item) => {
      if (item.id != id) {
        return item;
      }
      item.updatedValue = e.target.value;
      return item;
    });
    setList(copy);
  };
  const update = (id, value) => {
    if (value === "") {
      return;
    }
    let updatedItem = {
      id: id,
      value: value,
      editable: false,
      updatedValue: "",
    };
    let copy = [...toDoList];
    copy = copy.map((item) => {
      if (item.id != id) {
        return item;
      }
      return updatedItem;
    });
    setList(copy);
  };
  return (
    <div id="main">
      {/* //Do not alter main div
	//Please do not alter the functional component as tests depend on the type of component. */}
      <h1>To Do App</h1>
      <textarea id="task" value={inputValue} onChange={handleChange} />
      <button id="btn" onClick={addToList}>
        Add to List
      </button>
      <div>
        <ul>
          {showList &&
            toDoList.map((item) => {
              return (
                <li className="list" key={item.id}>
                  {item.editable ? (
                    <>
                      <textarea
                        className="editTask"
                        value={item.updatedValue}
                        onChange={(e) => {
                          handleEditChange(e, item.id);
                        }}
                      />
                      <button
                        className="saveTask"
                        onClick={() => {
                          update(item.id, item.updatedValue);
                        }}
                      >
                        save
                      </button>
                    </>
                  ) : (
                    <>
                      {item.value}
                      <button
                        className="edit"
                        onClick={() => {
                          editItem(item.id);
                        }}
                      >
                        edit
                      </button>
                      <button
                        className="delete"
                        onClick={() => {
                          deleteItem(item.id);
                        }}
                      >
                        delete
                      </button>
                    </>
                  )}
                </li>
              );
            })}
        </ul>
      </div>
    </div>
  );
}

export default App;
