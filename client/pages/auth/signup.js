import { useState } from 'react';
import axios from 'axios';
// import useRequest from '../../hooks/use-request';
import useRequestSignUp from '../../hooks/use-request-signup';

const signup = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { doRequest, errors } = useRequestSignUp({
    url: '/api/users/signup',
    method: 'post',
    body: {
      email, password
    }
  })

  const getErrorsForField = (fieldName) => {
    return errors.filter(err => err.field === fieldName);
  }

  const onSubmit = async (event) => {
    event.preventDefault();
    await doRequest();
  };

  return (
    <form onSubmit={onSubmit}>
      <h1>Sign Up</h1>
      {/* email field */}
      <div className="form-group">
        <label>Email Address</label>
        <input
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="form-control"
        />
        <ErrorDisplay errors={getErrorsForField('email')} />
      </div>
      {/* Password field */}
      <div className="form-group">
        <label>Password</label>
        <input
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          type="password"
          className="form-control"
        />
        <ErrorDisplay errors={getErrorsForField('password')} />
      </div>
      {/* {errors} */}
      <button className="btn btn-primary">Sign Up</button>
    </form>
  );
};

const ErrorDisplay = ({ errors }) => {
  if (errors.length === 0) return null;

  return (
    <div className='alert alert-danger error-box'>
      <ul className='my-0'>
        {errors.map((err, index) => (
          <li key={index}>{err.message}</li>
        ))}
      </ul>
    </div>
  );
}

export default signup;