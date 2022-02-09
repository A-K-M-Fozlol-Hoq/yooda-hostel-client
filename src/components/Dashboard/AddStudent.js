import React, { useState } from 'react';

const AddStudent = (props) => {
  const { allStudents, setAllStudents } = props;
  // Student(id, fullName, roll, age, class, hall, status)
  const [name, setName] = useState('');
  const [roll, setRoll] = useState(0);
  const [age, setAge] = useState(0);
  const [_class, setClass] = useState(0);
  const [hall, setHall] = useState('');
  const [status, setStatus] = useState('active');
  const addFoodToDB = (e) => {
    e.preventDefault();
    const id = `__student_id_${Date.now()}_${+Math.floor(
      Math.random() * 145465463345465768
    )}`;
    // Student(id, fullName, roll, age, class, hall, status)
    if (name && roll && age && _class && hall && status) {
      fetch('http://localhost:4000/addStudent', {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify({
          fullName: name,
          roll,
          age,
          _class,
          hall,
          status,
          id,
        }),
      })
        .then((response) => response.json())
        .then((data) => {
          if (data) {
            alert(`${name} added successfully`);
            // console.log();
            setAllStudents([
              ...allStudents,
              { fullName: name, roll, age, _class, hall, status, id },
            ]);
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
      <h1>Add Student</h1>
      <hr />
      <form className="w-50 mx-auto">
        <div className="form-group">
          <label htmlFor="exampleInputEmail1">Student name</label>
          <input
            type="name"
            className="form-control"
            id="exampleInputEmail1"
            aria-describedby="emailHelp"
            placeholder="Enter Student name"
            onChange={(e) => {
              setName(e.target.value);
            }}
          />
        </div>
        <div className="form-group">
          <label htmlFor="price">Student roll</label>
          <input
            type="number"
            className="form-control"
            id="v"
            aria-describedby="emailHelp"
            placeholder="Enter Student role"
            onChange={(e) => {
              setRoll(e.target.value);
            }}
          />
        </div>
        <div className="form-group">
          <label htmlFor="price">Student age</label>
          <input
            type="number"
            className="form-control"
            id="v"
            aria-describedby="emailHelp"
            placeholder="Enter Student age"
            onChange={(e) => {
              setAge(e.target.value);
            }}
          />
        </div>
        <div className="form-group">
          <label htmlFor="price">Student class</label>
          <input
            type="number"
            className="form-control"
            id="v"
            aria-describedby="emailHelp"
            placeholder="Enter Student class"
            onChange={(e) => {
              setClass(e.target.value);
            }}
          />
        </div>
        <div className="form-group my-2">
          <label htmlFor="role">Select student status:</label>
          <select
            name="role"
            id="role"
            onChange={(e) => setStatus(e.target.value)}
          >
            <option value="active">Active</option>
            <option value="inActive">Inactive</option>
          </select>
        </div>

        <div className="form-group">
          <label htmlFor="exampleInputEmail1">Student hall</label>
          <input
            type="name"
            className="form-control"
            id="exampleInputEmail1"
            aria-describedby="emailHelp"
            placeholder="Enter Student name"
            onChange={(e) => {
              setHall(e.target.value);
            }}
          />
        </div>
        <button
          type="submit"
          onClick={addFoodToDB}
          className="btn btn-primary mt-2"
        >
          Add Student
        </button>
      </form>
    </div>
  );
};
export default AddStudent;
