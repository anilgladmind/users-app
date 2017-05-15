/* Version 1.0 */
var express = require('express'),
	app = express(),
	mongoose = require('mongoose'),
	bodyParser = require('body-parser'),
	config      = require('./config/database'),
	expressSession = require('express-session'),
	cookieParser = require('cookie-parser'),
	port = 3000,
	path = require('path'),
	User = require('./Schema/user');
	
mongoose.Promise = global.Promise;
mongoose.connect(config.database);
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));


app.use(cookieParser());
app.use(expressSession({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: true
}));

app.use(bodyParser.urlencoded({extended: true}));     
app.use(bodyParser.json());                                             
//app.use(bodyParser.json({ type: 'application/json'}));
app.use(express.static(__dirname + '/public/'));

app.get('/', (req, res) => {
	res.sendfile(__dirname + '/index.html');
})
app.get('/login', (req, res) => {
	res.sendfile(__dirname + '/public/login.html');
})


app.post('/api/login', (req,res)=>{
	if(!req.body.email || !req.body.password){
		return res.json({message:"Invalid Username & password",status:401});
	}else{
		var query={
			'email': req.body.email,
			'password': req.body.password
		};
		
		console.log(query);
		// return res.json({message:"Success"});
		User.findOne({'email':req.body.email,'password':req.body.password}, function(err,data){
			if(err) throw err;
			// res.session.user = data.email;
			// res.session.admin = true;
			// res.send(res.session.user);
			
		})
		// User.findOne(query, function(err,data){
			// if(err) throw err;
			// res.session.user = data.email;
			// res.session.admin = true;
			// res.send(res.session.user);
			// res.redirect('/');
		// })
	}
});

app.get('/api/users', (req, res) => {
  User.find({}, function(err,data){
	if(err) throw err;
	return res.json({message: "Succefully Get the Data", data:data});
  });
});

function successSave(response, err, userdetail){
	if(err){
		return res.json({success: false, msg: 'Username already exists.'});
	}else{
		User.find({}, function(error,data){
			if(error) throw error;
			response.json({message: "Added", data:data});
		})
	}
}

app.post('/api/user',(req,res) => {
	var userdetail = new User(req.body);
    console.log(userdetail);
    userdetail.save(successSave.bind(null,res));
});

app.put('/api/updateuser/:id', (req,res)=>{
	var id = req.params.id
		query = {_id:id},
		resObj = {};
	User.findOneAndUpdate(query, req.body, {upsert:true}, function(err,doc){
		if(err) throw err;
		resObj.message = "Successfully saved";
		User.find({},function(err,data){
			if(err) throw err;
			resObj.data = data;
			res.json(resObj);
		})
	})
})


app.listen(3000, function() {
  console.log('listening on 3000');
})