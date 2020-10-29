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
      ></input>
      <input
        type='text'
        name='PIN'
        onChange={(e) => setPin(e.target.value)}
      ></input>
    </form>
  );
};

export default Login;

//saturday time
//0 19 * * 6

//25 18 * * 2 node ./index.js
