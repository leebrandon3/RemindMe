import { useState } from "react"
import '../index.css'

function Task({currentTask, setTaskArray, setSortedArray}){
    const {task, description, start, due, priority, complete} = currentTask
    const [expanded, setExpanded] = useState(false)
    const [edit, setEdit] = useState(false)
    const [edittedTask, setEdittedTask] = useState(currentTask)

    function TaskContent(){
        if (edit === false){
            const content = !expanded ? 
            (<p onClick={() => setExpanded(!expanded)}>{`${task}: ${start} to ${due}`}</p>) : 
            (<div onClick={() => setExpanded(!expanded)}>
                <strong>{`${task}: ${start} to ${due}`}</strong>
                <p>{`Priority: ${priority}`}</p>
                <p>{description}</p>
                <button onClick={(event) => {
                    event.stopPropagation()
                    setEdit(!edit)
                }}>{edit ? 'Done' : 'Edit'}</button>
            </div>)
            return content
        }
        else{
            return (
            <div>
                <strong><EditableText name='task'/>: <EditableText name='start'/> to <EditableText name='due'/></strong>
                <p>Priority: <EditableText name='priority'/></p>
                <p><EditableText name='description'/></p>
                <button onClick={(event) => {
                    event.stopPropagation()

                    fetch(`http://localhost:3000/tasks/${currentTask.id}`,{
                        method: 'PATCH',
                        headers: {
                            'Content-Type': 'application/json',
                            'Accept': 'application/json'
                        },
                        body: JSON.stringify(edittedTask)
                    })
                    .then(res => res.json())
                    .then(data => {
                        setTaskArray(taskArray => mapArray(taskArray, data))
                        setSortedArray(sortedArray => mapArray(sortedArray, data))
                    })
                    setEdit(!edit)
                }}>{edit ? 'Done' : 'Edit'}</button>
            </div>)
        }
    }

    function mapArray(passedArray, data){
        const updatedTasks = passedArray.map(element => {
            console.log(element.id === currentTask.id)
            if(element.id === currentTask.id){
                return data
            }
            else{
                return element
            }
            })
        return updatedTasks
    }

    function editTask(event){
        setEdittedTask({...edittedTask, [event.target.id] : event.target.textContent})
        console.log(edittedTask)
    }

    function EditableText({name}){
        return <span onBlur={editTask} id={name} suppressContentEditableWarning='true' contentEditable={edit}>{edittedTask[name]}</span>
    }

    function completeTask(){
        fetch(`http://localhost:3000/tasks/${currentTask.id}`,{
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            body: JSON.stringify({'complete': !complete})
        })
        .then(res => res.json())
        .then(data => {
            console.log(data)
            setTaskArray(taskArray => mapArray(taskArray, data))
            setSortedArray(sortedArray => mapArray(sortedArray, data))
        })
    }

    return (
        <div className="task">
            <TaskContent />
            <label htmlFor='complete'>Completed: </label>
            <input onChange={completeTask} name="complete" type='checkbox' checked={complete}></input>
        </div>
    )
}

export default Task