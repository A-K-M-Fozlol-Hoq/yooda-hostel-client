import React, { useState, useEffect } from 'react';
import AddStudent from '../AddStudent';
import AddFood from '../AddFood';
import ServeFood from '../ServeFood';
import Menu from '../Menu';
import AllFoods from '../../Utils/AllFoods';
import AllStudents from '../../Utils/AllStudents';

const Dashboard = (props) => {
  const { setIsLoggedIn } = props;
  const [showComponent, setShowComponent] = useState(
    sessionStorage.getItem('component')
      ? sessionStorage.getItem('component')
      : 'addFood'
  );
  const [foods, setFoods] = useState([]);
  const [allStudents, setAllStudents] = useState([]);

  return (
    <div className="w-75 mx-auto mt-5 bg-secondary p-5 rounded">
      <Menu
        showComponent={showComponent}
        setIsLoggedIn={setIsLoggedIn}
        setShowComponent={setShowComponent}
      ></Menu>
      <div className="bg-success mt-5 p-2 rounded text-white">
        {showComponent === 'addFood' ? (
          <>
            <AddFood foods={foods} setFoods={setFoods}></AddFood>
          </>
        ) : (
          <>
            {showComponent === 'addStudent' ? (
              <AddStudent
                allStudents={allStudents}
                setAllStudents={setAllStudents}
              ></AddStudent>
            ) : (
              <ServeFood
                allStudents={allStudents}
                setAllStudents={setAllStudents}
              ></ServeFood>
            )}
          </>
        )}
      </div>
      <div className="bg-success mt-5 p-2 rounded text-white">
        {showComponent === 'addFood' && (
          <AllFoods setFoods={setFoods} foods={foods}></AllFoods>
        )}
        {showComponent === 'addStudent' && (
          <AllStudents
            allStudents={allStudents}
            setAllStudents={setAllStudents}
          ></AllStudents>
        )}
        {showComponent === 'serveFood' && <h1>Good Luck!</h1>}
      </div>
    </div>
  );
};

export default Dashboard;
