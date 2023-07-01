import React, { useState } from 'react';
import todo from '../src/images/list.png';

const Todo = () => {
  const [inputData, setInputData] = useState('');
  const [items, setItems] = useState([]);
  const [toggleSubmit, setToggleSubmit] = useState(true);
  const [editItemId, setEditItemId] = useState(null);

  const addItem = () => {
    if (!inputData) {
      alert('Please add an item');
    } else if (inputData && !toggleSubmit) {
      setItems((prevItems) =>
        prevItems.map((item) => {
          if (item.id === editItemId) {
            return { ...item, name: inputData };
          }
          return item;
        })
      );
      setToggleSubmit(true);
      setInputData('');
      setEditItemId(null);
    } else {
      const newItem = {
        id: new Date().getTime().toString(),
        name: inputData,
      };
      setItems((prevItems) => [...prevItems, newItem]);
      setInputData('');
    }
  };

  const deleteItem = (id) => {
    const updatedItems = items.filter((item) => item.id !== id);
    setItems(updatedItems);
  };

  const removeAll = () => {
    setItems([]);
  };

  const editItem = (id) => {
    const selectedItem = items.find((item) => item.id === id);
    setToggleSubmit(false);
    setInputData(selectedItem.name);
    setEditItemId(id);
  };

  return (
    <>
      <div className="main-div">
        <div className="child-div">
          <figure>
            <img src={todo} alt="" />
            <figcaption>My To Do List</figcaption>
          </figure>
          <div className="addItems">
            <input
              type="text"
              placeholder="✍  Add Items ..."
              value={inputData}
              onChange={(e) => setInputData(e.target.value)}
            />
            {toggleSubmit ? (
              <i className="fa fa-plus add-btn" title="Add Item" onClick={addItem}></i>
            ) : (
              <i className="fa fa-edit add-btn" title="Update Item" onClick={addItem}></i>
            )}
          </div>

          <div className="showItems">
            {items.map((item) => (
              <div className="eachItem" key={item.id}>
                <h3>{item.name}</h3>
                <div className="todo-btn">
                  <i
                    className="fa fa-edit add-btn"
                    title="Edit Item"
                    onClick={() => editItem(item.id)}
                  ></i>
                  <i
                    className="fa fa-trash-alt add-btn"
                    title="Delete Item"
                    onClick={() => deleteItem(item.id)}
                  ></i>
                </div>
              </div>
            ))}
          </div>

          <div className="showItems">
            <button className="btn effect04" data-sm-link-text="Remove All" onClick={removeAll}>
              <span>REMOVE ALL</span>
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Todo;
