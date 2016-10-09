var Datastore = require('nedb'),
    Chance = require('chance'),
    Sentencer = require('sentencer'),
    chance = new Chance(),
    db = new Datastore({ filename: 'data/books', autoload: true  });

var createSchemas = function() {
    return [
        "{{ noun }} in " + chance.city(),
        "The {{ adjective }}",
        "{{ noun }}, {{ noun }}, {{ noun }}",
        "The {{ adjective }} " + chance.name({gender: 'male'}),
        "Brief history of {{ nouns }}",
        "{{noun}}",
        "The {{ noun }} of my {{ noun }}",
        "{{ a_noun }} of {{ nouns }}",
        "The {{ adjective }} {{ noun }}",
        "My {{ noun }} is a {{ noun }}",
        "{{ a_noun }} {{ adjective }}",
        "Let's get {{ adjective }}",
        "{{ nouns }} 101",
        "{{ nouns }} for dummies",
        "{{ nouns }} explained",
        "The {{ adjective }} biography of " + chance.name(),
        chance.name() + " is {{ adjective }}",
        "How to be a more {{ adjective}} father",
        "How to be a more {{ adjective }} person",
        "Think like a {{ noun }}",
        "Losing my {{ noun }}",
        "How to be more {{ adjective }} in business",
        "The {{ adjective }} startup"
    ];
}

var genres = [
    {
        name: 'Horror',
        schemas: [0, 1, 16]
    },
    {
        name: 'Romance',
        schemas: [2, 3, 16]
    },
    {
        name: 'Popular science',
        schemas: [4, 5]
    },
    {
        name: 'Fiction',
        schemas: [6, 7, 8, 9, 10]
    },
    {
        name: 'Instructional',
        schemas: [11, 12, 13, 14]
    },
    {
        name: 'Biography',
        schemas: [15, 16, 20]
    },
    {
        name: 'Crime',
        schemas: [0, 5]
    },
    {
        name: 'Self-help \/ business',
        schemas: [17, 18, 19, 21, 22]
    },
    {
        name: 'Finance',
        schemas: [19, 21, 22]
    },
    {
        name: 'Children\'s',
        schemas: [3, 16]
    }
]

var pickFromArray = function(arr) {
    return arr[Math.floor(Math.random() * arr.length)];
}

var createRandomInfo = function() {
    var newGenre = pickFromArray(genres),
        schemas = createSchemas(),
        newSchema = schemas[pickFromArray(newGenre.schemas)],
        title = Sentencer.make(newSchema),
        gender = pickFromArray([0, 1]);
    return {
        authorName: chance.name({ gender: !!gender ? "male" : "female" }),
        authorGender: !!gender ? "Male" : "Female",
        title: title[0].toUpperCase() + title.slice(1),
        genre: newGenre.name,
        date: chance.date({year: 1916 + 100 * Math.random()}),
        color: chance.color({format: 'hex'})
    };
}

var books = [];
for(var i = 0; i < 10; i++) {
    books.push(
        createRandomInfo()
    );
}

db.insert(books);
