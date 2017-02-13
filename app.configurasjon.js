module.exports = (app, bodyParser, mongoose) => {

    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({ extended: true }));
    app.use(bodyParser.text());                                    
    app.use(bodyParser.json({ type: 'application/json'}));

    if(process.env.DB_CONNECTION) {
        mongoose.connect(process.env.DB_CONNECTION);
    } else {
        mongoose.connect('mongodb://localhost/theimdal');
    }    

    app.set('port', process.env.PORT || 8081);

    app.use( (req, res, next) => {

        var origin = req.headers.origin;

        // Check that origin is allowed
        var allowedOrigins = ['http://127.0.0.1:3000', 'http://localhost:3000', 'http://localhost', 'http://theimdal.azurewebsites.net'];
        var origin = req.headers.origin;
        if(allowedOrigins.indexOf(origin) > -1){
            res.setHeader('Access-Control-Allow-Origin', origin);
        }

        // Request methods you wish to allow
        res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

        // Request headers you wish to allow
        res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');

        // Set to true if you need the website to include cookies in the requests sent
        // to the API (e.g. in case you use sessions)
        res.setHeader('Access-Control-Allow-Credentials', true);

        // Pass to next layer of middleware
        next();
    });

}