import { useOutletContext } from 'react-router-dom'

function CalenderPage() {
  const currentDate = new Date()
  const month = currentDate.getMonth() + 1
  const date = currentDate.getDate()
  const day = dayOfTheWeek(currentDate.getDay())

  const {taskArray, setTaskArray} = useOutletContext()
  
  let dateAdder = 0
  const week = [{},{},{},{},{},{},{}]
  let currentDay = currentDate.getDay()
  for(let i = 0; i < 7; i++){
    let thisDate = new Date()
    thisDate.setDate(currentDate.getDate() + dateAdder)
    week[currentDay] = {
      day: dayOfTheWeek(thisDate.getDay()),
      month: thisDate.getMonth() + 1,
      date: thisDate.getDate(),
      year: thisDate.getFullYear(),
      dayInt: thisDate.getDay()
    }
    if(currentDay < 6){
      currentDay++
      dateAdder++
    }
    else{
      currentDay = 0
      dateAdder = dateAdder - 6
    }
  }

  // console.log(week)

  function dayOfTheWeek(day){
    switch (day){
      case 0:
        return 'Sunday'
      case 1:
        return 'Monday'
      case 2:
        return 'Tuesday'
      case 3:
        return 'Wednesday'
      case 4:
        return 'Thursday'
      case 5:
        return 'Friday'
      case 6:
        return 'Saturday'
    }
  }

  // sorting function to place task in the right calender spot
  // map through taskArray and append tasks to week Array that has the same date
  // get request url?(statement) will only pull data that is true
  week.forEach(day => {
    const {date, month, year} = day
    // console.log( year, month, date)
    // console.log(taskArray)
    const todaysTasks = taskArray.filter(task => task.start === `${year}-0${month}-${date}`)
    day.tasks = todaysTasks
    // console.log(day)
  })

  const iterateDays = week.map(element => {
    return <Day thisDay={element} key={element.dayInt}/>
  })

  function taskClass(task) {
    if(task.complete === false){
      return `priority-${task.priority}`
    }
    else if(task.complete === true){
      return 'completed'
    }
  }

  function Day({thisDay}){
    return (
      <ul><u>{`${thisDay.day} ${thisDay.month}/${thisDay.date}`}</u>
          {thisDay.tasks.map(element => <li key={element.id} className={`${taskClass(element)} weeklyTasks`}>{element.task}<br/><i>{`Due on ${element.due}`}</i></li>)}
      </ul>
    )
  }

  return (
    <>
      <h1>Todays date is {`${month}/${date} it is a ${day}`}.</h1>
      <h2>Here's your tasks for this week.</h2>
      <div className="week">
        {iterateDays}
      </div>
    </>);
  }
  
  export default CalenderPage;