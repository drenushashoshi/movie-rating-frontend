import { Menu } from 'semantic-ui-react';
import { Link } from 'react-router-dom';

export const Navbar = () => {
    return (
        <Menu fixed="top" size="huge">
            <Menu.Item as={Link} to="/Home" style={{ fontSize: "1.3rem" }}>
                Home
            </Menu.Item>
            <Menu.Item as={Link} to="/Ratings" style={{ fontSize: "1.3rem" }}>
                Rated
            </Menu.Item>
            <Menu.Menu position="right">
                <Menu.Item as={Link} to="/auth" style={{ fontSize: "1.3rem" }}>Register</Menu.Item>
            </Menu.Menu>
        </Menu>
    );
};
