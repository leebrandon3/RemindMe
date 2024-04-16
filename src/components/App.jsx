import { useState,useEffect } from 'react';
import Navbar from './Navbar'
import { Outlet } from 'react-router-dom';
import '../index.css'

function App() {

  const [taskArray, setTaskArray] = useState([])
  useEffect(() => {
    fetch('http://localhost:3000/tasks')
    .then(res => res.json())
    .then(data => {
        setTaskArray(data)
    })
  },[])

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
