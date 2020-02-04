const express = require('express');
const router = express.Router();
const reviewsController = require('../../controllers/api/reviews');

router.post('/', reviewsController.create);


module.exports = router;