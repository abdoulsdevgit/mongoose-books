const BASE_URL = '/api/reviews';

function addReview(review) {
    return fetch(BASE_URL + '/', {
        method: "POST",
        headers: new Headers({'Content-Type': 'application/json'}),
        body: JSON.stringify({review})
    }).then((res) => {
        if (res.ok) return res.json();
        throw new Error('Alread commented');
    });
}

export default {
    addReview,
};