let mongoose = require('mongoose');
let Site = require('../models/site');

/*
 * GET /site route to retrieve all the sites
 */
function getSites(req, res) {
    //Query the DB and if no errors, send all the sites
    let query = Site.find({});
    query.exec((err, sites) => {
        if(err) res.send(err);
        //If no errors, send them back to the client
        res.json(sites);
    });
}

/*
 * POST /site to save a new site.
 */
function postSite(req, res) {
    //Creates a new site
    var newSite = new Site(req.body);
    //Save it into the DB.
    newSite.save((err,site) => {
        if(err) {
            res.send(err);
        }
        else { //If no errors, send it back to the client
            res.json({message: "Site successfully added!", site });
        }
    });
}

/*
 * GET /site/:id route to retrieve a site given its id.
 */
function getSite(req, res) {
    Site.findById(req.params.id, (err, site) => {
        if(err) res.send(err);
        //If no errors, send it back to the client
        res.json(site);
    });     
}

/*
 * DELETE /site/:id to delete a site given its id.
 */
function deleteSite(req, res) {
    Site.remove({_id : req.params.id}, (err, result) => {
        res.json({ message: "Site successfully deleted!", result });
    });
}

/*
 * PUT /site/:id to update a site given its id
 */
function updateSite(req, res) {
    Site.findById({_id: req.params.id}, (err, site) => {
        if(err) res.send(err);
        Object.assign(site, req.body).save((err, site) => {
            if(err) res.send(err);
            res.json({ message: 'Site updated!', site });
        }); 
    });
}

//export all the functions
module.exports = { getSites, postSite, getSite, deleteSite, updateSite };