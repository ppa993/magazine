var express = require('express');
var router = express.Router();

/*
 * GET articallist.
 */
router.get('/', function(req, res) {
    var db = req.db;
    var collection = db.get('articals');
    collection.find({},{},function(e,docs){
        res.json(docs);
    });
});

/*
 * POST to addartical.
 */
router.post('/', function(req, res) {
    var db = req.db;
    var collection = db.get('articals');
    collection.insert(req.body, function(err, result){
        res.send(
            (err === null) ? { msg: '' } : { msg: err }
        );
    });
});

/*
 * DELETE to deleteartical.
 */
router.delete('/:id', function(req, res) {
    var db = req.db;
    var collection = db.get('articals');
    var articalToDelete = req.params.id;
    collection.remove({ '_id': articalToDelete }, function(err) {
        res.send((err === null) ? { msg: '' } : { msg:'error: ' + err });
    });
});

module.exports = router;