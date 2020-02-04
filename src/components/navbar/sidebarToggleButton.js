import React from 'react';
import styles from './sidebarToggleButton.module.css';

function SidebarToggleButton (props) {
    return (
        <button className={styles.hamburger} onClick={props.toggleSideMenu}>
            <div className={styles.hamburgerItem}></div>
            <div className={styles.hamburgerItem}></div>
            <div className={styles.hamburgerItem}></div>
        </button>
    );
}

export default SidebarToggleButton;