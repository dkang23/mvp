var express = require('express');
var bodyParser = require('body-parser');
var app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(__dirname + '/../dist/'));

var port = 3000;

app.listen(port, function () {
  console.log(`listening on port ${port}!`);
});