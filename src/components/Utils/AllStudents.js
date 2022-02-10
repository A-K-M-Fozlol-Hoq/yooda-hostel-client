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

const AllStudents = (props) => {
  const { allStudents, setAllStudents } = props;
  const [modalIsOpen, setIsOpen] = useState(false);
  const [haveToUpdate, setHaveToUpdate] = useState('');
  const [name, setName] = useState('');
  const [roll, setRoll] = useState(0);
  const [age, setAge] = useState(0);
  const [_class, setClass] = useState(0);
  const [hall, setHall] = useState('');
  const [status, setStatus] = useState('active');
  const [currentPage, setCurrentPage] = useState(0);
  const [haveToChangeStudentsStatus, setHaveToChangeStudentsStatus] = useState(
    []
  );
  const loadAllStudentsFromDB = (currentPageToLoad) => {
    fetch('http://localhost:4000/getStudents', {
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
        setAllStudents(data);
      })
      .catch((err) => console.log(err));
  };
  const updateStudent = (e) => {
    e.preventDefault();
    if (haveToUpdate && name && roll && age && _class && hall && status) {
      fetch('http://localhost:4000/editStudent', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          id: haveToUpdate,
          fullName: name,
          roll,
          age,
          _class,
          hall,
          status,
        }),
      })
        .then((res) => res.json())
        .then((data) => {
          // console.log(haveToDeleteUsersList)
          console.log(data);
          if (data.acknowledged) {
            alert('Updated students info successfully!');
            window.location.reload();
          } else {
            alert('Failed to update!');
          }
          // window.location.reload();
        });
    } else {
      alert('Please enter all information to update');
    }
  };
  useEffect(() => {
    loadAllStudentsFromDB(currentPage);
  }, []);
  function openModal() {
    setIsOpen(true);
  }

  function closeModal() {
    setIsOpen(false);
  }
  const deleteStudent = (id, name) => {
    fetch('http://localhost:4000/deleteStudent', {
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

  const changeStudentsStatus = (status) => {
    console.log(haveToChangeStudentsStatus, status);
    if (status === 'active') {
      fetch('http://localhost:4000/activeStudentsStatus', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          studentsIDList: haveToChangeStudentsStatus,
        }),
      })
        .then((res) => res.json())
        .then((data) => {
          // console.log(haveToDeleteUsersList)
          console.log(data);
          if (data.success) {
            alert('Activates students status successfully!');
            window.location.reload();
          }
          // window.location.reload();
        })
        .catch((err) => console.log(err));
    } else if (status === 'inActive') {
      fetch('http://localhost:4000/inActiveStudentsStatus', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          studentsIDList: haveToChangeStudentsStatus,
        }),
      })
        .then((res) => res.json())
        .then((data) => {
          // console.log(haveToDeleteUsersList)
          console.log(data);
          if (data.success) {
            alert('inactivates students status successfully!');
            window.location.reload();
          }
          // window.location.reload();
        })
        .catch((err) => console.log(err));
    }
    // activeStudentsStatus
    // inActiveStudentsStatus
  };
  const andOrRemoveToChangeStatus = (id) => {
    let notAddedTillNow = true;
    haveToChangeStudentsStatus.map((userId) => {
      if (userId === id) {
        notAddedTillNow = false;
      }
    });
    if (notAddedTillNow) {
      setHaveToChangeStudentsStatus([...haveToChangeStudentsStatus, id]);
    } else {
      const newArray = haveToChangeStudentsStatus.filter(
        (userID) => userID !== id
      );
      setHaveToChangeStudentsStatus(newArray);
    }
  };
  return (
    <div>
      <h1>All allStudents</h1>
      <hr />
      {/* table part */}
      <div className="bg-secondary m-2 p-2 rounded text-center">
        <div
          className="bg-danger m-2 p-2 rounded"
          style={{
            display: 'grid',
            gridTemplateColumns: '75px 1fr 1fr 1fr 1fr',
            gridGap: '20px',
          }}
        >
          <div>
            <select
              className=" w-25 mb-2"
              name="searchBy"
              id="searchBy"
              defaultValue=""
              onChange={(e) => {
                changeStudentsStatus(e.target.value);
                e.target.value = '';
              }}
            >
              <option>Select active or inactive options</option>
              <option value="active">Active</option>
              <option value="inActive">Inactive</option>
            </select>
          </div>
          <div>Name</div>
          <div>Status</div>
          <div>Edit</div>
          <div>Delete</div>
        </div>
        {allStudents.map((student, index) => (
          <div
            key={index}
            className="bg-info m-2 p-2 rounded"
            style={{
              display: 'grid',
              gridTemplateColumns: '70px 1fr 1fr 1fr 1fr',
              gridGap: '20px',
            }}
          >
            <input
              onChange={() => {
                andOrRemoveToChangeStatus(student.id);
              }}
              type="checkbox"
              name=""
              id=""
              style={{
                marginLeft: '30px',
                marginTop: '12px',
                transform: 'scale(1.5)',
              }}
            />

            <div style={{ marginTop: '5px' }}>{student.fullName}</div>
            <div style={{ marginTop: '5px' }}>{student.status}</div>
            <div
              className="btn btn-warning"
              onClick={() => {
                openModal();
                setHaveToUpdate(student.id);
              }}
            >
              edit
            </div>
            <div
              className="btn btn-danger"
              onClick={() => {
                deleteStudent(student.id, student.fullName);
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
                loadAllStudentsFromDB(currentPage - 1);
              }}
              className="btn mx-1 btn-info"
            >
              Prev
            </div>
          )}
          <div className="btn mx-1 btn-info">{currentPage + 1}</div>
          {allStudents.length === 10 && (
            <div
              onClick={() => {
                setCurrentPage(currentPage + 1);
                loadAllStudentsFromDB(currentPage + 1);
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
        <h2 className="text-center text-white">Update Students new Infos </h2>
        <hr />
        <form className="mt-2 mb-5 text-white">
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
            onClick={updateStudent}
            className="btn btn-danger mt-2"
          >
            Update Student
          </button>
        </form>
        <button className="btn btn-warning" onClick={closeModal}>
          close
        </button>
      </Modal>
    </div>
  );
};

export default AllStudents;
