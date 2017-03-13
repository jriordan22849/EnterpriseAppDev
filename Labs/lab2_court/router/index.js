
/*
Jonathan Riordan
Lab 2
Part 3,4,5,6
Enterprise Application Development
*/
var express = require('express')
var router = express();
var models = require('../models/index');
var bodyParser = require('body-parser');
var jwt    = require('jsonwebtoken'); // used to create, sign, and verify tokens
router.set('superSecret', "pineapplesandpizza");
router.use(bodyParser.urlencoded({ extended: true }));
router.use(bodyParser.json());

var apiRoutes = express.Router();

apiRoutes.use(function(req, res, next) {
  // check header or url parameters or post parameters for token
  var token = req.body.token || req.query.token || req.headers['x-access-token'];
  console.log("Token " + token);
  if (token) {
      // verifies secret and checks exp
  	jwt.verify(token, router.get('superSecret'), function(err, decoded) {      
  		//res.send(decoded);
  		if(err == null) {
  			req.decoded = decoded;  
  			//res.send(decoded);
  			//console.log("before next " + decoded); 
  			next();
  		} else {
  			    return res.status(403).send({ 
		        success: false, 
		        message: 'Invalid token.' 
		    });
  		}	
    });
  } else {
  	    return res.status(403).send({ 
        success: false, 
        message: 'No token provided.' 
    });
  }

});

router.use(apiRoutes);

router.get('/', function (req, res) {
	res.send('Enterprise Application DEvelopment!')
});

router.listen(3000, function () {
	console.log('Example app listening on port 3000!')
});

 
router.get('/judge', function(req, res) {
	models.Judge.findAll({}).then(function(judge) {
		res.json(judge);
	});
});


router.get('/participant', function(req, res) {
	models.Participant.findAll({}).then(function(ps) {
		res.json(ps);
	});
});

router.get('/courtroom', function(req, res) {
	models.CourtRoom.findAll({}).then(function(courtRoom) {
		res.json(courtRoom);
	});
});

router.get('/case', function(req, res) {
	models.Case.findAll({}).then(function(cs) {
		res.json(cs);
	});
});


// Add to Judge
router.get('/insert', function(req, res) {
	// Participant data
	models.Participant.create({
		id: 1,
		name: "Gerry Adams",
		address: "Belfast",
		type: "claimant"
	}),

	models.Participant.create({
		id: 2,
		name: "Bara Larkin",
		address: "Carlow",
		type: "respondent"
	}),

	// Courtroom data
	models.CourtRoom.create({
		id: 1,
		number: 201
	}),

	models.CourtRoom.create({
		id: 2,
		number: 300
	}),

	// Case data
	models.Case.create({
		id: 10,
		judge_id: 1,
		courtroom_id: 1,
		claimant_id: 1,
		respondent_id: 0,
		start_date: "25/2/2014",
		duration: 3,
		result: true
	}),

	models.Case.create({
		id: 20,
		judge_id: 3,
		courtroom_id: 2,
		claimant_id: 0,
		respondent_id: 2,
		start_date: "02/2/2014",
		duration: 5,
		result: false
	}),

	// Judge data
	models.Judge.create({
		id: 1,
		name: "johnJoe",
		room: 5,
		ext: "ext"
	}),

	models.Judge.create({
		id: 2,
		name: "Carlos teves",
		room: 6,
		ext: "ext"
	}),

	models.Judge.create({
		id: 3,
		name: "AJ Aadam",
		room: 7,
		ext: "ext"
	}).

	then(function(user) {
		res.send('Inserted!')
	});
});

// CRUD Operations
// Insert 
router.post('/judge', function(req, res) {
	models.Judge.create({
		id: req.body.id,
		name: req.body.name,
		room: req.body.room,
		ext: req.body.ext
	}).then(function(user) {
		res.json(user);
	});
});

router.post('/participant', function(req, res) {
	models.Participant.create({
		id: req.body.id,
		name: req.body.name,
		address: req.body.address,
		type: req.body.type
	}).then(function(part) {
		res.json(part);
	});
});

router.post('/case', function(req, res) {

	var c_id = req.body.courtroom_id; 
	var date = req.body.start_date;

	models.Case.findAll({
	  where: {
	    courtroom_id: c_id,
	    start_date: date
	  }
	}).then(function(cases){
		if(cases.length > 0) {
			//res.json(cases);
			res.send("Error, room is alrrady booked on this date.\n");
			return;
		} else {

				models.Case.create({
				judge_id: req.body.judge_id,
				courtroom_id: req.body.courtroom_id,
				claimant_id: req.body.claimant_id,
				respondent_id: req.body.respondent_id,
				start_date: req.body.start_date,
				duration: req.body.duration,
				result: req.body.result
			})

		}
	})
	.then(function(part) {
		res.json(part);
	});
});

router.post('/courtroom', function(req, res) {
	var courtroom_id = req.body.number;
	var date = req.body.number;

	models.CourtRoom.create({
		id: req.body.id,
		number: req.body.number
	}).then(function(part) {
		res.json(part);
	});
});
// router.post('/courtroom', function(req, res) {
// 	models.CourtRoom.create({
// 		id: req.body.id,
// 		number: req.body.number
// 	}).then(function(part) {
// 		res.json(part);
// 	});
// });


// Delete Courtroom
router.delete('/courtroom/:id', function(req, res) {
  models.CourtRoom.destroy({
    where: {
      id: req.params.id
    }
  }).then(function(court) {
    res.json(court);
  });
});

// Delete Participant
router.delete('/participant/:id', function(req, res) {
  models.Participant.destroy({
    where: {
      id: req.params.id
    }
  }).then(function(part) {
    res.json(part);
  });
});

// Delete Case
router.delete('/case/:id', function(req, res) {
  models.Case.destroy({
    where: {
      id: req.params.id
    }
  }).then(function(cs) {
    res.json(cs);
  });
});

// Delete Judge
router.delete('/judge/:id', function(req, res) {
  models.Judge.destroy({
    where: {
      id: req.params.id
    }
  }).then(function(jdg) {
    res.json(jdg);
  });
});



// update single judge
router.put('/judge/:id', function(req, res) {
  models.Judge.find({
    where: {
      id: req.params.id
    }
  }).then(function(judge) {
    if(judge){
      judge.updateAttributes({
		name: req.body.name,
		room: req.body.room,
		ext: req.body.ext
      }).then(function(judge) {
        res.send(judge);
      });
    }
  });
});

// Update case
router.put('/case/:id', function(req, res) {
  models.Case.find({
    where: {
      id: req.params.id
    }
  }).then(function(cs) {
    if(cs){
      cs.updateAttributes({
		judge_id: req.body.judge_id,
		courtroom_id: req.body.courtroom_id,
		claimant_id: req.body.claimant_id,
		respondent_id: req.body.respondent_id,
		start_date: req.body.start_date,
		duration: req.body.duration,
		result: req.body.result
      }).then(function(cs) {
        res.send(cs);
      });
    }
  });
});

// Update Participant
router.put('/participant/:id', function(req, res) {
  models.Participant.find({
    where: {
      id: req.params.id
    }
  }).then(function(cs) {
    if(cs){
      cs.updateAttributes({
		id: req.body.id,
		name: req.body.name,
		address: req.body.address,
		type: req.body.type
      }).then(function(cs) {
        res.send(cs);
      });
    }
  });
});


// Update Courtroom
router.put('/courtroom/:id', function(req, res) {
  models.CourtRoom.find({
    where: {
      id: req.params.id
    }
  }).then(function(cs) {
    if(cs){
      cs.updateAttributes({
		id: req.body.id,
		number: req.body.number
      }).then(function(cs) {
        res.send(cs);
      });
    }
  });
});


// Get single record
router.get('/judge/:id', function(req, res) {
  models.Judge.find({
    where: {
      id: req.params.id
    }
  }).then(function(judge) {
    res.json(judge);
  });
});

router.get('/case/:id', function(req, res) {
  models.Case.find({
    where: {
      id: req.params.id
    }
  }).then(function(cases) {
    res.json(cases);
  });
});


router.get('/participant/:id', function(req, res) {
  models.Participant.find({
    where: {
      id: req.params.id
    }
  }).then(function(pt) {
    res.json(pt);
  });
});


router.get('/courtRoom/:id', function(req, res) {
  models.CourtRoom.find({
    where: {
      id: req.params.id
    }
  }).then(function(cs) {
    res.json(cs);
  });
});


/*
Lab 3 - Authentificatiom
Part 1 - password hashing
*/
var bcrypt = require('bcrypt');
var salt = bcrypt.genSaltSync(10);

// Default to insert user into table, password hased and salted/
router.get('/adduser', function(req, res) {
	var name = req.param('username');
	var password = req.param('password');
	hash = bcrypt.hashSync(password, salt);

	models.Users.create({
		username: name,
		password: hash
	}).then(function(user) {
		res.json(user);
	});

});



/*
Lab 3 
Part 2
JWT secured version on the user table
*/

router.post('/authenticate', function(req, res) {
	var user_name = req.query.username;
	var paswordEntered = req.query.password;
	var salt = bcrypt.genSaltSync(10);
	var hash = bcrypt.hashSync(paswordEntered, salt);
	console.log(hash);
	models.Users.find({
		where: {
	    	username: user_name
	    }
	}).then(function(users) {
		if (users) {      		
      		var result = bcrypt.compareSync(paswordEntered, users.password);
      		if(result == true) {
      			// passowrd match
      			//res.json({ success: false, message: 'Username and Password match' });

      			// Create jwt token 
      			// create a token
		        var token = jwt.sign({users:users.username}, router.get('superSecret'), {
		        	expiresIn: 86400 // expires in 24 hours
		        });

		        res.json({
		          success: true,
		          message: '200',
		          token: token
		        });



      		} else if(result == false) {
      			// Passowrds do not match
		        res.json({
		          success: false,
		          message: '403'
		        });
      		}
    	} else {
    		//res.json({ success: true, message: 'Authentication Success, user found.' });
    		// Check if password match
    		res.json({ success: false, message: 'Authentication failed. User not found.' });
    	}


	});
});


router.get('/users', function(req, res) {
	models.Users.findAll({}).then(function(user) {
		res.json(user);
	});
});










