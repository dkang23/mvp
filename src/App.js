import React from 'react';
import { hot } from 'react-hot-loader/root';
import Login from './components/login.jsx';
class App extends React.Component {
  render() {
    const { name } = this.props;
    return (
      <>
        <Login />
        <h1>Hello {name}</h1>
      </>
    );
  }
}

export default hot(App);
