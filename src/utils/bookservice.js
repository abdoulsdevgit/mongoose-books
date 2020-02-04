const BASE_URL = '/api/books';

function getAllBooks() {
    return fetch(BASE_URL + '/')
    .then(res => res.json());
}

function bookSearch(book) {
    return fetch(BASE_URL + '/search', {
        method: 'POST',
        headers: new Headers({'Content-Type': 'application/json'}),
        body: JSON.stringify({search:book})
    }).then(res => {
        if (res.ok) {
            return res.json();
        }
        throw new Error('Something went Wrong');
    });
}

function getBookInfo(id) {
    return fetch(BASE_URL+`/${id}`)
    .then(res => res.json());
}



module.exports = {
    getAllBooks,
    bookSearch,
    getBookInfo,
};