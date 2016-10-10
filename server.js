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
        if (query.hasOwnProperty(k) && k !== 'day' && k !== 'sortBy' && k!== 'count' && k !== 'index') {
            if(Array.isArray(query[k])) {
                q[k] = query[k][0];
            } else {
                q[k] = query[k];
            }
        }
    })
    if (query.day) {
        q['$where'] = function() {
            return this.date.getDay() === +query.day;
        }
    }
    if (query.count) {
        db.count(q, function(err, count) {
            res.json(count);
        });
        return;
    }
    db.find(q).sort(sortBy).skip(Number(query.index) || 0).limit(10).exec(function(err, docs) {
        res.json(docs);
    })
});

app.listen(3001, function () {
  console.log('Books API listening on port 3001!');
});
