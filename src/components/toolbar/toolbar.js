import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import SidebarToggleButton from '../navbar/sidebarToggleButton';
import styles from './toolbar.module.css';

class Toolbar extends Component {

    
    render() {

        let logged = this.props.user?
        <ul className={styles.navLinks}>
            <li><button className={styles.navItemButton} onClick={this.props.handleLogout}> Logout</button></li>
        </ul> :
        <ul className={styles.navLinks}>
            <li><Link className={styles.navItem}to="/login"> Login</Link></li>
            <li><Link className={styles.navItem}to="/signup"> Signup </Link></li>
        </ul>
        return(
            <div className={styles.toolbar}>
                <Link to="/" className={styles.logo}> BOOKS </Link>
                <div className={styles.hamburger}>
                    <SidebarToggleButton toggleSideMenu={this.props.toggleSideMenu}/>
                </div>
                {logged}
            </div>
        );
    }
}

export default Toolbar;