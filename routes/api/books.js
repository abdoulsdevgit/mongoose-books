const express = require('express');
const router = express.Router();

const booksController = require('../../controllers/api/books');

router.get('/', booksController.index);
router.post('/search', booksController.search);
router.get('/:id', booksController.show);

/*========== Helper ============*/
function checkAuth (req, res, next) {
    if(req.user) return next();
    return res.status(401).json({msg: 'Login First'});
}
module.exports = router;