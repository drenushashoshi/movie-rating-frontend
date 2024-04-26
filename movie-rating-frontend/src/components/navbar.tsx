import { useState } from 'react';
import { Menu } from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import { getUserIdFromToken } from '../Variables';
const Navbar = () => {
    const [isLoggedIn, setIsLoggedIn] = useState(!!getUserIdFromToken());
  const handleLogout = () => {
    localStorage.removeItem('token');
    setIsLoggedIn(false);
    window.location.href = '/Home';
  }
    return (
        <Menu fixed="top" size="huge">
            <Menu.Item as={Link} to="/Home" style={{ fontSize: "1.3rem" }}>
                Home
            </Menu.Item>
            <Menu.Item as={Link} to="/Ratings" style={{ fontSize: "1.3rem" }}>
                Rated
            </Menu.Item>
            <Menu.Item as={Link} to="/search" style={{ fontSize: "1.3rem" }}>Search</Menu.Item>
            <Menu.Menu position="right">
                {isLoggedIn ? (
                    <Menu.Item onClick={handleLogout} style={{fontSize:"1.3rem"}}>
                        Logout
                    </Menu.Item>
                ): (
                    <>
                    <Menu.Item as={Link} to="/auth/Login" style={{ fontSize: "1.3rem" }}>Login</Menu.Item>
                    <Menu.Item as={Link} to="/auth" style={{ fontSize: "1.3rem" }}>Register</Menu.Item>
                    </>
                    
                )}
                
            </Menu.Menu>
        
        </Menu>
    );
};

export default Navbar;