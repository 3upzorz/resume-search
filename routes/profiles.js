var express = require('express');
var elasticsearch = require('elasticsearch');
var util = require('util');

var router = express.Router();

/* GET search profiles. */
router.get('/search', function(req, res, next) {

	console.log('QUERY\n', req.query);
	if(!req.query.from){
		req.query.from = 0;
	}

	var search = req.query.search;
	var es = new elasticsearch.Client({
		//TODO move these values to config
		host: 'localhost:9200',
		log: 'error'
	});

	es.search({
		index:'profiles',
		body:{
			query:{
				match:{
					parsed_resume:search
				}
			}
		},
		from: req.query.from,
		size: req.query.size

	})
	.then(function(results){
		res.send(results);
	});
});

module.exports = router;
