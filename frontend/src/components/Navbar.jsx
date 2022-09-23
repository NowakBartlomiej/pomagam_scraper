import './Navbar.css'


const Navbar = () => {
    return (
        <nav>
            <input type="checkbox" id='check' />
            <label htmlFor='check' className='checkbtn'>
                <i className='fas fa-bars'></i>
            </label>
            
            <label className='logo'>Pomagam Scraper</label>
            <ul>
                <li><a href="/">Daily Sum</a></li>
                <li><a href="/collections">Collections</a></li>
                <li><a href="/chart">Chart</a></li>
            </ul>
        </nav>
    )
}

export default Navbar