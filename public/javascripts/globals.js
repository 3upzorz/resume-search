var baseURL = "/";
// var baseURL = "http://localhost:3000/";
// var baseURL = "http://ec2-52-36-25-134.us-west-2.compute.amazonaws.com/";

var ajax = function(options){
	if(options.url){
		options.url = baseURL + options.url
	}
	return $.ajax(options);
}