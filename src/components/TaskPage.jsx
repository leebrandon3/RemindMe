import TaskList from './TaskList'
import { useOutletContext } from 'react-router-dom'
import '../index.css'
import AddTask from './AddTask'
import { useState, useEffect } from 'react'

function TaskPage() {

  const {taskArray, setTaskArray} = useOutletContext()
  const [sortedArray, setSortedArray] = useState([])
  useEffect(() => {
      fetch('http://localhost:3000/tasks')
      .then(res => res.json())
      .then(data => {
          setTaskArray(data)
          setSortedArray(data)
      })
    },[])
    
  console.log(sortedArray)

  return (
    <div className='tasks'>
      <AddTask setTaskArray={setTaskArray} setSortedArray={setSortedArray}/>
      <div>
        <TaskList taskArray={taskArray} setTaskArray={setTaskArray} sortedArray={sortedArray} setSortedArray={setSortedArray}/>
      </div>
    </div>
  );
}

export default TaskPage;