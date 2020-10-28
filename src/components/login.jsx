import React, { useState } from 'react';

const Login = () => {
  let [loginId, setLoginId] = useState('');
  let [pin, setPin] = useState('');

  return (
    <form>
      <input
        type='text'
        name='GID'
        onChange={(e) => setLoginId(e.target.value)}
      >
        Golfer ID:
      </input>
      <input type='text' name='PIN' onChange={(e) => setPin(e.target.value)}>
        PIN:
      </input>
    </form>
  );
};

export default Login;
