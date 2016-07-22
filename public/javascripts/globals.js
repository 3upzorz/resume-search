var baseURL = "http://localhost:8080/";

var ajax = function(options){
	if(options.url){
		options.url = baseURL + options.url
	}
	return $.ajax(options);
}