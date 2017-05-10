var express = require('express'),
	app = express(),
	mongoose = require('mongoose'),
	bodyParser = require('body-parser'),
	port = 3000,
	path = require('path'),
	User = require('./Schema/user');
	
	
mongoose.connect("mongodb://127.0.0.1:27017/users");
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));


app.use(bodyParser.urlencoded({extended: true}));     
app.use(bodyParser.json());                                             
//app.use(bodyParser.json({ type: 'application/json'}));
app.use(express.static(__dirname + '/public/'));

app.get('/api/users', (req, res) => {
  User.find({}, function(err,data){
	if(err) throw err;
	return res.json({message: "Succefully Get the Data", data:data});
  });
});

function successSave(response, err, userdetail){
	if(err){
		console.log(err);
	}else{
		console.log("Inside callback");
		response.json(userdetail);
	}
}

app.post('/api/user',(req,res) => {
	console.log(req.body);
	var userdetail = new User(req.body);
    console.log(userdetail);
    userdetail.save(successSave.bind(null,res));
    console.log("inside post");
});

app.listen(3000, function() {
  console.log('listening on 3000');
})