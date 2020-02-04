import React, {Component} from 'react';
import bookService from '../../utils/bookservice';
import BookComponent from '../../components/bookComponent/bookComponent';
import {Input, Button} from '@material-ui/core';
// import cssStyles from './bookpage.module.css';

class BookPage extends Component {

    constructor(props) {
        super(props);

        this.state = {
            books: [],
            search: '',
            booksLoaded: false,
            wait: 'Loading...'
        };
    }

    componentDidMount() {

        bookService.getAllBooks()
        .then(res => {
            this.setState({books: res});
        })
        .then(() => this.setState({booksLoaded: true}));
    }


    render() {

        const styles = {
            main: {
                
                display: 'flex',
                flexWrap: 'wrap',
                justifyContent: 'center',
                alignItems: 'center',
                flexDirection: 'column',
            },
            books: {
                display: 'flex',
                flexWrap: 'wrap',
                justifyContent: 'center',
            }
        };

        let search = this.props.user ? <div>
            <Input placeholder="search books"
            name="search"
            onChange={this.handleChange}
            value={this.state.search}
            />
            <Button onClick={this.handleSearch}> Search </Button>
            </div>: null;

        let books = this.state.booksLoaded ? 
            this.state.books.map((book, index) => <BookComponent key={index} isbn={book.isbn}
            id={book._id} title={book.title}/>):
            <h1> {this.state.wait}</h1>

        return(
            <div style={styles.main}>
                {search}
                <div style={styles.books}>
                    {
                        books
                    }
                </div>
            </div>
        );
    }

    // this function handles the search input.
    handleSearch = async () => {
        if (this.state.search.trim().length === 0) {
            return
        }

        // send query display results
        try {
            let response = await bookService.bookSearch(this.state.search)

            if (response.length === 0) {
                this.setState({wait: 'No Books Found Please Try again', booksLoaded: false});
                console.log('Empty');
            } else {
                this.setState({wait: 'Loading ....', booksLoaded: true});
            }
            this.setState({books: response});
        } catch(err) {
            console.log(err, '********');
        }
    }

    handleChange = (e) => {
        this.setState({[e.target.name]:e.target.value})
    }
}

export default BookPage;