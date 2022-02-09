import React, { useEffect, useState } from 'react';

const ServeFood = (props) => {
  const { allStudents, setAllStudents } = props;
  const [rollToSearch, setRollTOSearch] = useState(0);
  const [searchedStudents, setSearchedStudents] = useState([]);
  const [servingTo, setServingTo] = useState({
    name: '',
    id: '',
  });
  const [foods, setFoods] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);
  const [showCompo, setShowCompo] = useState('table');
  const [date, setDate] = useState(Date.now());
  const [shift, setShift] = useState('');
  const [status, setStatus] = useState('');
  const [foodItemList, setFoodItemList] = useState([]);

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
  useEffect(() => {
    loadAllStudentsFromDB(currentPage);
    fetch('http://localhost:4000/getFoods', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((res) => res.json())
      .then((data) => {
        setFoods(data);
        console.log(foods, data);
      })
      .catch((err) => console.log(err));
  }, []);
  const handleSearch = () => {
    if (rollToSearch) {
      // console.log(rollToSearch);
      // getStudentsByRoll
      fetch('http://localhost:4000/getStudentsByRoll', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          roll: rollToSearch,
        }),
      })
        .then((res) => res.json())
        .then((data) => {
          console.log(data);
          setSearchedStudents(data);
        })
        .catch((err) => console.log(err));
    } else {
      alert('please enter roll to search');
    }
  };
  const serveFood = (e) => {
    e.preventDefault();
  };
  const filterFoodItemList = (food) => {
    setFoodItemList(foodItemList.filter((foodName) => foodName !== food));
  };
  return (
    <div>
      {showCompo === 'table' && (
        <div>
          <h1>Searched Students ({searchedStudents.length})</h1>
          <div className="row">
            <div className="col-md-8">
              <input
                type="number"
                className="form-control"
                onChange={(e) => setRollTOSearch(e.target.value)}
                placeholder="search by roll"
              />
            </div>
            <div className="btn btn-warning col-md-2" onClick={handleSearch}>
              Search
            </div>
          </div>
          <hr />
          {/* table part */}
          {searchedStudents.length > 0 && (
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
                <div>Role</div>
                <div>Hall</div>
                <div>Serve</div>
              </div>
              {searchedStudents.map((student, index) => (
                <div
                  key={index}
                  className="bg-info m-2 p-2 rounded"
                  style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(4,1fr)',
                    gridGap: '20px',
                  }}
                >
                  <div style={{ marginTop: '5px' }}>{student.fullName}</div>
                  <div style={{ marginTop: '5px' }}>{student.roll}</div>
                  <div style={{ marginTop: '5px' }}>{student.hall}</div>
                  <div
                    className="btn btn-success"
                    onClick={() => {
                      setShowCompo('serveForm');
                      setServingTo({ name: student.fullName, id: student.id });
                      // deleteStudent(student.id, student.fullName);
                    }}
                  >
                    Serve
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
          )}

          <hr />
          <hr />
          <hr />
          <hr />
          <h1>All allStudents ({allStudents.length})</h1>
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
              <div>Role</div>
              <div>Hall</div>
              <div>Serve</div>
            </div>
            {allStudents.map((student, index) => (
              <div
                key={index}
                className="bg-info m-2 p-2 rounded"
                style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(4,1fr)',
                  gridGap: '20px',
                }}
              >
                <div style={{ marginTop: '5px' }}>{student.fullName}</div>
                <div style={{ marginTop: '5px' }}>{student.roll}</div>
                <div style={{ marginTop: '5px' }}>{student.hall}</div>
                <div
                  className="btn btn-success"
                  onClick={() => {
                    setShowCompo('serveForm');
                    setServingTo({ name: student.fullName, id: student.id });
                    // deleteStudent(student.id, student.fullName);
                  }}
                >
                  Serve
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
        </div>
      )}
      {showCompo === 'serveForm' && (
        <>
          <div
            className="btn btn-danger mt-2 ml-2"
            style={{ float: 'left' }}
            onClick={() => setShowCompo('table')}
          >
            Back
          </div>
          <h1>Serving to {servingTo.name}</h1>
          <hr />
          <form>
            <div className="form-group">
              <label htmlFor="exampleInputEmail1">select date</label>
              <input
                onChange={(e) => setDate(e.target.value)}
                type="date"
                className="form-control"
                id="exampleInputEmail1"
                aria-describedby="emailHelp"
                placeholder="Pick date"
              />
            </div>
            <div className="row">
              <div className="form-group my-2 col-md-6">
                <label htmlFor="shift">select Shift</label> <br />
                <select
                  className="mt-3 mb-2 "
                  name="shift"
                  id="shift"
                  defaultValue=""
                  onChange={(e) => {
                    setShift(e.target.value);
                    e.target.value = '';
                  }}
                  style={{ width: '18px', transform: 'scale(1.5)' }}
                >
                  <option>Select one option</option>
                  <option value="morning">morning</option>
                  <option value="launch">launch</option>
                  <option value="evening">evening</option>
                  <option value="dinner">dinner</option>
                </select>
              </div>

              <div className="form-group my-2 col-md-6">
                <label htmlFor="food">Add Food</label> <br />
                <select
                  className="mt-3 mb-2 "
                  style={{ width: '18px', transform: 'scale(1.5)' }}
                  name="food"
                  id="food"
                  defaultValue=""
                  onChange={(e) => {
                    setFoodItemList([...foodItemList, e.target.value]);
                    e.target.value = '';
                  }}
                >
                  <option>Select one option</option>
                  {foods.map((food, index) => (
                    <option key={index} value={`${food.name}`}>
                      {food.name}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div>
              {foodItemList.length > 0 && <h2>Added Foods</h2>}

              {foodItemList.map((foodItem, index) => (
                <div
                  key={index}
                  className="btn btn-info ml-2"
                  style={{ marginLeft: '10px' }}
                >
                  {foodItem}
                  <div
                    className="btn btn-danger"
                    style={{ marginLeft: '8px' }}
                    onClick={() => filterFoodItemList(foodItem)}
                  >
                    X
                  </div>
                </div>
              ))}
            </div>
            <button
              type="submit"
              className="btn btn-primary mt-2 w-100"
              onClick={serveFood}
            >
              Serve Food
            </button>
          </form>
        </>
      )}
    </div>
  );
};

export default ServeFood;
