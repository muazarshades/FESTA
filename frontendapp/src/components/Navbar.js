import { Link } from 'react-router-dom';

function Navbar() {

    return (
        <div className='navbar'>

            <h2>FESTA</h2>

            <div>

                <Link to='/dashboard'>Dashboard</Link>

                <Link to='/create-event'>Create Event</Link>

                <Link to='/providers'>Providers</Link>

                <Link to='/'>Logout</Link>

            </div>

        </div>
    );
}

export default Navbar;