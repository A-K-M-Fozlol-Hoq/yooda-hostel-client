import React from 'react';

const Menu = ({ setIsLoggedIn, setShowComponent, showComponent }) => {
  const handleLogout = () => {
    setIsLoggedIn(false);
    sessionStorage.setItem('isLoggedIn', false);
  };
  return (
    <div className="py-5 px-2 bg-warning rounded">
      <h1>Menu</h1>
      <p>Change options to see all functionality</p>
      <hr />
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(4,1fr)',
          gridGap: '20px',
        }}
      >
        <div
          onClick={() => {
            setShowComponent('addFood');
            sessionStorage.setItem('component', 'addFood');
          }}
          className={`btn btn-${
            showComponent === 'addFood' ? 'danger' : 'primary'
          }`}
        >
          Add Food
        </div>
        <div
          onClick={() => {
            setShowComponent('addStudent');
            sessionStorage.setItem('component', 'addStudent');
          }}
          className={`btn btn-${
            showComponent === 'addStudent' ? 'danger' : 'primary'
          }`}
        >
          Add Student
        </div>
        <div
          onClick={() => {
            setShowComponent('serveFood');
            sessionStorage.setItem('component', 'serveFood');
          }}
          className={`btn btn-${
            showComponent === 'serveFood' ? 'danger' : 'primary'
          }`}
        >
          Serve Food
        </div>
        <div className="btn btn-primary" onClick={handleLogout}>
          Logout
        </div>
      </div>
    </div>
  );
};

export default Menu;
