import React from 'react';
import logo from './logo.svg';
import './App.css';

function App() {
  // let name: string = 'React';
  // return (
  //   <div className="App-header">
  //     <h1>Hello, React!!</h1>
  //     <p>
  //       Welcome to React world!! <br />
  //       {name === 'React' ? 'React is great!' : 'React is not great!'}
  //     </p>
  //   </div>
  // );

  /*let name ="리액트";*/

  const port = undefined;
  return (
    <div className="App-header">
      <h1>Hello, React!!</h1>
      <p>
        Welcome to React world!! <br />
        {port ? `포트는 ${port}입니다` : '포트를 설정하지 않았습니다'}
      </p>
    </div>
  );
}



export default App;
