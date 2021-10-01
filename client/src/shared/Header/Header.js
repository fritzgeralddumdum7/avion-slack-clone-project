import Search from './component/Search';
import { BiTime } from 'react-icons/bi';
import { FiHelpCircle } from 'react-icons/fi';
import './Header.scoped.css';

function Header () {
    return (
    <header>
        <BiTime className = 'bi-history-icon' />
        <Search />
        <FiHelpCircle className="help-icon" />
   </header>
    )
}

export default Header;
