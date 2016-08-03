var express = require('express');
var elasticsearch = require('aws-es');
var esConf = require('../config/aws').es;
var util = require('util');
var multer  = require('multer');
var upload = multer({ dest: 'public/uploads/' });
var textract = require('textract');

var router = express.Router();

router.param('id', function(req, res, next, id){
	var es = new elasticsearch(esConf);	

	es.get({
		index:'profiles',
		type:'developer',
		id:id
	},function(err, response){
		if(err){
			//TODO display error page
			console.error(err);
		}else{
			req.profile = response;
			next();
		}
	})
});

/* GET add profile page. */
router.get('/new', function(req, res, next) {
	res.render('profile-new');
});

/* GET add profile page. */
router.get('/:id', function(req, res, next) {
	res.render('profile', req.profile);
});

/* POST create profile. */
router.post('/', upload.single('resume'), function(req, res, next) {

	var es = new elasticsearch(esConf);
	
	if(req.file){
		//extract text from uploaded resume file
		textract.fromFileWithMimeAndPath(req.file.mimetype, req.file.path, function( error, text ) {
			if(error){
				console.error(error);
			}else{
				//create developer profile
				es.index({
					index:'profiles',
					//TODO allow type to be a selectable value on the front end
					type:'developer',
					body:{
						name: req.body.name,
						parsed_resume: text,
						resume: req.file.filename,
						file: req.file.originalname
					}
				}, function(err, profile){
					if(err){
						console.error('unable to create user');
						//TODO redirect to error page
						res.send(err);
					}else{
						
						res.redirect('/profile/'+profile._id);
					}
				});
			}
		});
	}
});

module.exports = router;
