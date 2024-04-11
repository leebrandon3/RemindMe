import { useState } from 'react';
import Navbar from './Navbar'
import { Outlet } from 'react-router-dom';
import '../index.css'

function App() {

  const [taskArray, setTaskArray] = useState([])

  return (
    <div>
      <div>
        <Navbar />
      </div>
      <div className='live-content'>
        <Outlet context={{taskArray,setTaskArray}}/>
      </div>
    </div>
  );
}

export default App;
