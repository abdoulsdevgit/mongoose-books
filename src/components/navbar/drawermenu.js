import React from 'react';
import styles from './drawermenu.module.css';
import {Link} from 'react-router-dom';

function DrawerMenu(props) {

    let isShowing = props.showing ? styles.showing: styles.drawer;
    let logged = props.user ?
    <ul className={styles.navLinks}>
        <li onClick={props.toggleSideMenu}><button onClick={props.handleLogout} className={styles.navItemsButton}>Logout</button></li>
    </ul> :
    <ul className={styles.navLinks}>
        <li onClick={props.toggleSideMenu}><Link to="/signup" className={styles.navItems}>Signup</Link></li>
        <li onClick={props.toggleSideMenu}><Link to="/login" className={styles.navItems}>Login</Link></li>
    </ul>
    return(
        <div className={isShowing}>
           {logged}
        </div>
    )
}

export default DrawerMenu;