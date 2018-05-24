const express = require('express');

const router = express.Router();
const Campground = require('../models/campground');

// ================
// Campground Routes
// ================

// INDEX
/* Using /campgrounds for get and post for RESTful */
router.get('/', (req, res) => {
  Campground.find({}, (err, campgrounds) => {
    if (err) {
      console.log(err);
    } else {
      res.render('campgrounds/index', { campgrounds: campgrounds });
    }
  });
});

// CREATE
router.post('/', (req, res) => {
  const { name } = req.body;
  const { image } = req.body;
  const { description } = req.body;
  const newCampground = {
    name: name,
    image: image,
    description: description,
  };

  Campground.create(newCampground, (err, campground) => {
    if (err) {
      console.log(err);
    } else {
      console.log(campground);
    }

    res.redirect('/campgrounds');
  });
});

// NEW
router.get('/new', (req, res) => {
  res.render('campgrounds/new');
});

// SHOW
router.get('/:id', (req, res) => {
  // find campground with the provided id
  Campground.findById(req.params.id).populate('comments').exec((err, foundCampground) => {
    if (err) {
      console.log(err);
    } else {
      // render show template with that campground
      res.render('campgrounds/show', { campground: foundCampground });
    }
  });
});

function isLoggedIn(req, res, next) {
  // if is logged in, we will move to next param in the get request
  if (req.isAuthenticated()) {
    return next();
  }
  // if not loggin, go to login page
  res.redirect('/login');
}

module.exports = router;