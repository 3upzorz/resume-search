$("#search").keyup(function(e){
	ajax({
		method:"GET",
		url:"profiles/search",
		data:{
			search:$(this).val()
		}
	})
	.done(function(res){
		console.log(res);
	})
	.fail(function(res){
		console.error(res);
	})
});

var SearchResultItem = React.createClass({displayName: 'SearchResultItem',
	render: function(){
		return(
			React.createElement('div', {className:'searchResultItem'},
				React.createElement('span', {className:'profileName'}, this.props.text)
			)
		);
	}
});

var SearchResultList = React.createClass({displayName: 'SearchResultList',
	render: function(){
		console.log(this.props.profiles);
		var list = [];
		for(var i = 0; i < this.props.profiles.length; i++){
			list.push(React.createElement(SearchResultItem,{key:i,text:this.props.profiles[i]}));
		}

		return(
			React.createElement('div', {className:'searchResults'},
				list
			)
		);
	}
});

var SearchResults = React.createClass({displayName: 'SearchResults',
	getInitialState: function() {
		return {profiles: ["test","test1"]};
	},
	render: function(){
		return (
			React.createElement(SearchResultList, {profiles:this.state.profiles})
		);
	}
});

ReactDOM.render(
	React.createElement(SearchResults, null),
	document.getElementById("search-results")
);