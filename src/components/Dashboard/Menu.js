import React from 'react';

const Menu = ({ setIsLoggedIn, setShowComponent }) => {
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
          onClick={() => setShowComponent('addFood')}
          className="btn btn-primary"
        >
          Add Food
        </div>
        <div
          onClick={() => setShowComponent('addStudent')}
          className="btn btn-primary"
        >
          Add Student
        </div>
        <div
          onClick={() => setShowComponent('serveFood')}
          className="btn btn-primary"
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
