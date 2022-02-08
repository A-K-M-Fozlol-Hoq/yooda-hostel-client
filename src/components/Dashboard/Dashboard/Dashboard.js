import React, { useState } from 'react';
import AddStudent from '../AddStudent';
import AddFood from '../AddFood';
import ServeFood from '../ServeFood';
import Menu from '../Menu';

const Dashboard = (props) => {
  const { setIsLoggedIn } = props;
  const [showComponent, setShowComponent] = useState('addFood');
  return (
    <div className="w-75 mx-auto mt-5 bg-secondary p-5 rounded">
      <Menu
        setIsLoggedIn={setIsLoggedIn}
        setShowComponent={setShowComponent}
      ></Menu>
      <div className="bg-success mt-5 p-2 rounded text-white">
        {showComponent === 'addFood' ? (
          <AddFood></AddFood>
        ) : (
          <>
            {showComponent === 'addStudent' ? (
              <AddStudent></AddStudent>
            ) : (
              <ServeFood></ServeFood>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
