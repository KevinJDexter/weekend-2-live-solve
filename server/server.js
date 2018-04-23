// requires
let express = require( 'express' );
let app = express();
let bodyParser = require( 'body-parser' );

// uses
app.use (express.static( 'server/public' ) );
app.use (bodyParser.urlencoded( { encoded: true} ) );

// global
let PORT = 34586;

//spin up server
app.listen( PORT, function() {
  console.log(`listening on port ${PORT}`);
})