import React from 'react';

function BookComment(props) {

    let ratings = '';
    for (let i = 0; i < props.rating; i++) {
        ratings += <span key={i} className="fa fa-star checked"></span>;
    }
    console.log(props.rating);

    return(

        <div>
            <span>{props.name}</span>
            <span>{props.comment}</span>
            {
                ratings
            }
            <h1>{props.rating} 0</h1>
        </div>
    );
}

export default BookComment;