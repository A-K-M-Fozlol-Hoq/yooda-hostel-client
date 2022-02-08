import React, { useState } from 'react';

const Login = (props) => {
  const { setIsLoggedIn } = props;
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const handleSubmit = (e) => {
    e.preventDefault();
    if (email.trim() === 'phero@gmail.com' && password.trim() === 'phero') {
      setIsLoggedIn(true);
      sessionStorage.setItem('isLoggedIn', true);
    } else {
      alert('Please enter valid email address and password');
    }
  };
  return (
    <div className="w-50 mx-auto mt-5 bg-secondary p-5 rounded">
      <form>
        <div className="form-group">
          <label htmlFor="exampleInputEmail1">Email address</label>
          <input
            onChange={(e) => setEmail(e.target.value)}
            type="email"
            className="form-control"
            id="exampleInputEmail1"
            aria-describedby="emailHelp"
            placeholder="Enter email"
          />
        </div>
        <div className="form-group">
          <label htmlFor="exampleInputPassword1">Password</label>
          <input
            type="password"
            onChange={(e) => setPassword(e.target.value)}
            className="form-control"
            id="exampleInputPassword1"
            placeholder="Password"
          />
        </div>
        <button
          type="submit"
          className="btn btn-primary mt-2 w-100"
          onClick={handleSubmit}
        >
          Login
        </button>
      </form>
      <div className="bg-success mt-5 p-2 rounded text-white">
        <small>Pro topis: please use this email and password to login: </small>{' '}
        <br />
        <small>email: phero@gmail.com </small> <br />
        <small>password: phero </small>
      </div>
    </div>
  );
};

export default Login;
