const express = require('express');
const router = express.Router();



const userQueries = require(`../db/queries/user-queries`);
const contributorsQueries = require(`../db/queries/contributors-queries`);
const favouritesQueries = require(`../db/queries/favourites-queries`);
const mapQueries = require(`../db/queries/maps-queries`);


router.get(`/`, (req, res) => {
  const userId = req.session.userid;

  //returns user info
  const userPromise = userQueries.getUserProfileByUserId(userId);
  //returns details for all map categories based on user
  const myMapsPromise = userQueries.getMyMapDetailsByUserId(userId);
  const favePromise = favouritesQueries.getMapDetailsForFavouriteMapsByUserId(userId);
  const contributorPromise = contributorsQueries.getMapDetailsForContributedMapsByUserId(userId);
  Promise.all([userPromise, myMapsPromise, favePromise, contributorPromise])
    .then(results => {
      res.json({ results });
    })
    .catch(err => {
      res
        .status(500)
        .json({ error: err.message });
    });

});

//may need to change the location of the logout route
//from /users/loguout to maps/logout so that we can redirect to home page?
//would like to change to post so we can redirect, but for now it just clears cookie

router.get('/logout', (req, res) => {
  req.session = null;
  res.send('logged out');
});

router.get('/isLogin', (req, res) => {
  console.log("here at /isLogin get! ");
  const userId = req.session.userid;
  const hasUserId = userId ? true : false;
  console.log("userId result: ", hasUserId);
  const result = { hasUserId, userId };
  res.json(result);
});

router.get(`/login/:userid`, (req, res) => {

  console.log('req.params.userid:', req.params.userid);

  //sets cookie to user id value
  //and we can use the cookie to look up info from database
  req.session.userid = req.params.userid;
  res.json(req.session.userid);
});

module.exports = router;

