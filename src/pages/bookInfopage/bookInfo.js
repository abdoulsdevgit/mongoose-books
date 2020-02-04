import React, {Component} from 'react';
import bookService from '../../utils/bookservice';
import styles from './bookinfo.module.css';
import reviewservice from '../../utils/reviewservice';
import BookComment from '../../components/bookComments/bookComments';

class BookInfo extends Component {

    constructor(props) {
        super(props);

        this.state = {
            bookInfo: '' ,
            review: '',
            user: this.props.user._id,
            book: this.props.match.params.id,
            rating: 1,
            loaded: false,
            reviewed: false,
        };
    }

    async componentDidMount() {
        
        try {
            let b = await bookService.getBookInfo(this.props.match.params.id);
            console.log(b.title , '-----');
            this.setState({bookInfo:b, loaded: true});

            // check if user alread left a review
            let user = this.state.user;
            let book = this.state.book;
            this.state.bookInfo.reviews.forEach(review => {
                if (review.user === user && review.book === book) {
                    this.setState({reviewed: true});
                    //console.log('yea book already reviewed');
                }
            });

        } catch(err) {
            console.log(err);
        }

    }

    render() {
        // console.log(this.props.match.params.id, '====');
        // console.log(this.state.user, 'user')
        // console.log(this.state.bookInfo.reviews, 'reviews');
        console.log(this.state.bookInfo.rating, '====');

        return(
            this.state.loaded && (
            <div className={styles.main}>
                
                <h1> {this.state.bookInfo.title} </h1>
                {
                    this.state.bookInfo.author.map((author, i) => <h2 key={i}>{author}</h2>)
                }
                <h1> {this.state.bookInfo.year} </h1>
                <h1> {this.state.bookInfo.isbn} </h1>

                {
                    // display reviews from the user.
                    this.state.bookInfo.reviews.map((review, i) => <BookComment 
                    key={i} 
                    comment={review.review}
                    rating={this.state.bookInfo.rating}
                    />)
                }

                {
                    !this.state.reviewed && (

                    <div>
                    <h1> Add Review </h1>
                    <textarea rows="4" cols="50"
                        className={styles.review}
                        name="review" 
                        value={this.state.value}
                        onChange={this.handleChange}
                        >
                    </textarea>
                    <label htmlFor="ratind"> Rating: </label>
                    <select name="rating" 
                        value={this.state.rating} 
                        id="rating"
                        onChange={this.handleChange}
                    >
                        <option value={1}> 1 </option>
                        <option value={2}> 2 </option>
                        <option value={3}> 3 </option>
                        <option value={4}> 4 </option>
                        <option value={5}> 5 </option>
                    </select>
                    <button onClick={this.handleSubmit}>Submit</button>

                </div>

                    )
                }
                
                
            </div>
            )
        )
    }

    handleChange = (e) => {
        this.setState({[e.target.name]:e.target.value});
    }

    // submits a review
    handleSubmit = async () => {
        if(this.state.review.trim().length === 0) {
            return;
        }
        // we have a review let's add it then display it above.
        let reviews = {
            user: this.state.user,
            book: this.state.book,
            review: this.state.review,
            rating: this.state.rating,
        }

        try {
            await reviewservice.addReview(reviews)
            this.setState({
                bookInfo: '' ,
                review: '',
                user: this.props.user._id,
                book: this.props.match.params.id,
                rating: 1,
                loaded: false,
            }, ( () => {
                // this.forceUpdate();
                window.location.reload()
                //this.props.history.push(`/api/books/${this.props.match.params.id}`);
            })())
        } catch(err) {
            console.log(err)
        }
        //2 clear the state for a better user experience.
    }
}

export default BookInfo;

/** <h1> {this.props.match.params.id} </h1> */