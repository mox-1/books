var Datastore = require('nedb'),
    express = require('express'),
    db = new Datastore({filename: 'data/books', autoload: true}),
    app = express();

app.get('/books', function(req, res, params) {
    var query = req.query,
        sortBy = {},
        q = {};
    if (query.sortBy) {
        sortBy[query.sortBy] = query.descending ? -1 : 1;
    }
    Object.keys(query).forEach(function(k) {
        if (query.hasOwnProperty(k) && k !== 'day' && k !== 'sortBy') {
            q[k] = query[k];
        }
    })
    if (query.day) {
        q['$where'] = function() {
            return this.date.getDay() === +query.day;
        }
    }
    db.find(q).sort(sortBy).exec(function(err, docs) {
        res.json(docs);
    })
});

app.listen(3000, function () {
  console.log('Books API listening on port 3000!');
});

