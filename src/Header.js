import { FaLaptop, FaTabletAlt, FaMobileAlt } from 'react-icons/fa';
import { useContext } from 'react'
import DataContext from './context/DataContext';
import useWindowSize from './hooks/useWindowSize';
const Header = () => {
    const { width } = useWindowSize();
    return (
        <header className="Header">
            <h1>React JS Blog</h1>
            {width < 768 ? <FaMobileAlt /> : width < 992 ? < FaTabletAlt /> : <FaLaptop />}
        </header>
    )
}
export default Header;