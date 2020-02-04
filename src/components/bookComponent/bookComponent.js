import React from 'react';
import styles from './bookComponent.module.css';
import {Link} from 'react-router-dom';

function BookComponent(props) {

    const imageStyle = {
        image: {
            
            backgroundImage: `url('http://covers.openlibrary.org/b/isbn/${props.isbn}-M.jpg')`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            // height: 500,
            flexBasis: 500,
            flexShrink: 1,
            
        },
        main: {
            height: 600,
            display: 'flex',
            flexDirection: 'column',
            flexBasis: 500,
            flexShrink: 1,
            flex:2,
        }
    };

    return(
        <div className={styles.main}>
            <div className={styles.image} style={imageStyle.image}> 
            </div>
            <div className={styles.title}>
                <h1> No Image</h1>
                <h2>Title: {props.title} </h2>
            </div>
            <Link className={styles.info} to={`/api/books/${props.id}`} >Info</Link>
        </div>
    )


}

export default BookComponent;