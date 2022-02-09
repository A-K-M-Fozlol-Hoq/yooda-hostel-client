import React, { useState } from 'react';

const AddFood = (props) => {
  const { foods, setFoods } = props;
  const [foodName, setFoodName] = useState('');
  const [foodPrice, setFoodPrice] = useState(0);
  const addFoodToDB = (e) => {
    e.preventDefault();
    const id = `__food_id_${Date.now()}_${+Math.floor(
      Math.random() * 145465463345465768
    )}`;
    if (foodName && foodPrice) {
      fetch('http://localhost:4000/addFood', {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify({
          name: foodName,
          price: foodPrice,
          id,
        }),
      })
        .then((response) => response.json())
        .then((data) => {
          if (data) {
            alert(`${foodName} added successfully`);
            // console.log();
            setFoods([...foods, { name: foodName, price: foodPrice, id }]);
          }
        })
        .catch((error) => {
          console.error(error);
        });
    } else {
      alert('Please enter food name and price');
    }
  };
  return (
    <div>
      <h1>AddFood</h1>
      <hr />
      <form className="w-50 mx-auto">
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
          onClick={addFoodToDB}
          className="btn btn-primary mt-2"
        >
          Add Food
        </button>
      </form>
    </div>
  );
};

export default AddFood;
