import { useState,useEffect } from 'react';
import Task from './Task'

function TaskList({taskArray, setTaskArray}) {
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

    const mappedTasks = sortedArray.map(index => <Task key={index.id} currentTask={index} setTaskArray={setTaskArray} setSortedArray={setSortedArray}/>)

    function handleClick(event){
        console.log(event.target.name)
        const newArray = [...taskArray].sort((a, b) => {
            console.log(a[event.target.name], b[event.target.name])
            if(a[event.target.name] > b[event.target.name]){
                return 1
            }
            else if(a[event.target.name] < b[event.target.name]){
                return -1
            }
            else{
                return 0
            }
        })
        console.log(newArray)
        setSortedArray(newArray)
    }
    function handleChange(event){
        if(event.target.value === 'All'){
            setSortedArray(taskArray)
        }
        else{
            console.log(event.target.name)
            const newArray = [...taskArray].filter(element => element.priority === event.target.value)
            setSortedArray(newArray)
        }
    }
    function handleDefault(){
        setSortedArray(taskArray)
    }
    function handleComplete(event){
        const completeValue = event.target.name === 'complete'
        const newArray = [...taskArray].filter(element => element.complete === completeValue)
        setSortedArray(newArray)
    }

    return (
        <>
            <h3>Tasks</h3>
            <button name='default' onClick={handleDefault}>Default</button>
            <button name='start' onClick={handleClick}>Start Date</button>
            <button name='due' onClick={handleClick}>Due Date</button>
            <button name='incomplete' onClick={handleComplete}>Incomplete</button>
            <button name='complete' onClick={handleComplete}>Complete</button>
            <br/>
            <label htmlFor='priority'>Sort by priority: </label>
            <select name='priority' onChange={handleChange}>
                <option value='All'>All</option>
                <option value="High">High</option>
                <option value="Medium">Medium</option>
                <option value="Low">Low</option>
            </select>
            {mappedTasks}
        </>
    );
}
  
export default TaskList;