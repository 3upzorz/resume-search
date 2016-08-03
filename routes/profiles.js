var express = require('express');
var elasticsearch = require('aws-es');
var util = require('util');
var esConf = require('../config/aws').es;

var router = express.Router();

/* GET search profiles. */
router.get('/search', function(req, res, next) {

	if(!req.query.from){
		req.query.from = 0;
	}

	var search = req.query.search;
	var es = new elasticsearch(esConf);

	es.search({
		index:'profiles',
		type:'developer',
		body:{
			query:{
				match:{
					parsed_resume:search
				}
			}
		},
		from: parseInt(req.query.from),
		size: parseInt(req.query.size)
	},function(err, results){
		if(err){
			console.error(err);
			return res.send(err);
		}
		return res.send(results);
	})
});

module.exports = router;
