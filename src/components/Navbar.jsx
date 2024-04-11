import home from '../images/home.svg'
import task from '../images/tasks.svg'
import calender from '../images/calender.svg'
import '../index.css'
import { Link } from 'react-router-dom'

function Navbar() {
  return (
    <div className="sidebar">
        <Link to='/'>
            <img className={'home main-icon icon'} src={home} alt="SVG"/>
        </Link>
        <Link to='/task'>
            <img className={'task sub-icon icon'} src={task} alt="SVG"/>
        </Link>
        <Link to='/calender'>
            <img className={'calender sub-icon icon'} src={calender} alt="SVG"/>
        </Link>
    </div>
  );
}

export default Navbar;