import React, { useEffect, useState } from 'react';
import Modal from 'react-modal';

const customStyles = {
  content: {
    background: '#0d6efd',
    border: '2px solid green',
    borderRadius: '15px',
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
  },
};
const buttonDesign = {
  padding: '5px',
  margin: '5px 0',
  width: '100%',
};
Modal.setAppElement('#root');

const AllFoods = (props) => {
  const { foods, setFoods } = props;
  const [modalIsOpen, setIsOpen] = useState(false);
  const [haveToUpdate, setHaveToUpdate] = useState('');
  const [foodName, setFoodName] = useState('');
  const [foodPrice, setFoodPrice] = useState(0);
  const [currentPage, setCurrentPage] = useState(0);
  const loadFoodsFromDB = (currentPageToLoad) => {
    fetch('http://localhost:4000/getFoods', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        pageNumber: currentPageToLoad,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        setFoods(data);
      })
      .catch((err) => console.log(err));
  };
  const updateFood = (e) => {
    e.preventDefault();
    if (haveToUpdate && foodName && foodPrice) {
      fetch('http://localhost:4000/editFood', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          id: haveToUpdate,
          name: foodName,
          price: foodPrice,
        }),
      })
        .then((res) => res.json())
        .then((data) => {
          // console.log(haveToDeleteUsersList)
          console.log(data);
          if (data.acknowledged) {
            alert('Updated food name and price successfully!');
            // setHaveToUpdate(0);
            // setFoodName('');
            // setFoodPrice(0);
            // closeModal();
            window.location.reload();
          } else {
            alert('Failed to update!');
          }
          // window.location.reload();
        });
    } else {
      alert('Please enter name and  price to update');
    }
  };
  useEffect(() => {
    loadFoodsFromDB(currentPage);
  }, []);
  function openModal() {
    setIsOpen(true);
  }

  function closeModal() {
    setIsOpen(false);
  }
  const deleteFood = (id, name) => {
    fetch('http://localhost:4000/deleteFood', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        id,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        if (data.deletedCount === 1) {
          alert(`Deleted  ${name} successfully!`);
          window.location.reload();
        } else {
          alert('Failed to delete!');
        }
      });
  };
  return (
    <div>
      <h1>All Foods</h1>
      <hr />
      {/* table part */}
      <div className="bg-secondary m-2 p-2 rounded text-center">
        <div
          className="bg-danger m-2 p-2 rounded"
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(4,1fr)',
            gridGap: '20px',
          }}
        >
          <div>Name</div>
          <div>Price</div>
          <div>Edit</div>
          <div>Delete</div>
        </div>
        {foods.map((food, index) => (
          <div
            key={index}
            className="bg-info m-2 p-2 rounded"
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(4,1fr)',
              gridGap: '20px',
            }}
          >
            <div style={{ marginTop: '5px' }}>{food.name}</div>
            <div style={{ marginTop: '5px' }}>{food.price}</div>
            <div
              className="btn btn-warning"
              onClick={() => {
                openModal();
                setHaveToUpdate(food.id);
              }}
            >
              edit
            </div>
            <div
              className="btn btn-danger"
              onClick={() => {
                deleteFood(food.id, food.name);
              }}
            >
              delete
            </div>
          </div>
        ))}
        <div className="bg-secondary">
          {currentPage > 0 && (
            <div
              onClick={() => {
                setCurrentPage(currentPage - 1);
                loadFoodsFromDB(currentPage - 1);
              }}
              className="btn mx-1 btn-info"
            >
              Prev
            </div>
          )}
          <div className="btn mx-1 btn-info">{currentPage + 1}</div>
          {foods.length === 10 && (
            <div
              onClick={() => {
                setCurrentPage(currentPage + 1);
                loadFoodsFromDB(currentPage + 1);
              }}
              className="btn mx-1 btn-info"
            >
              Next
            </div>
          )}
        </div>
      </div>

      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        style={customStyles}
        contentLabel="Example Modal"
      >
        <h2 className="text-center text-white">Update Food Name or price </h2>
        <hr />
        <form className="mt-2 mb-5 text-white">
          <div className="form-group">
            <label htmlFor="exampleInputEmail1">Food name</label>
            <input
              type="name"
              className="form-control"
              id="exampleInputEmail1"
              aria-describedby="emailHelp"
              placeholder="Enter Food name"
              onChange={(e) => {
                setFoodName(e.target.value);
              }}
            />
          </div>
          <div className="form-group">
            <label htmlFor="price">Food name</label>
            <input
              type="number"
              className="form-control"
              id="v"
              aria-describedby="emailHelp"
              placeholder="Enter Food price"
              onChange={(e) => {
                setFoodPrice(e.target.value);
              }}
            />
          </div>
          <button
            type="submit"
            onClick={updateFood}
            className="btn btn-success mt-2"
          >
            Update Food
          </button>
        </form>
        <button className="btn btn-danger" onClick={closeModal}>
          close
        </button>
      </Modal>
    </div>
  );
};

export default AllFoods;
