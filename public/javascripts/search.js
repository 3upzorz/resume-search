function loadResults(component, val, page, size){
	if(!size){
		size = 10;
	}

	ajax({
		method:"GET",
		url:"profiles/search",
		data:{
			search:val,
			from:(page ? size * page : 0),
			size:size
		},
		success: function(res){
			if(res.hits	&& res.hits.hits){
				//if searching for next page, concat hits
				if(page){
					component.state.result.hits.hits = component.state.result.hits.hits.concat(res.hits.hits);
					component.state.result.hits.total = res.hits.total;
					this.setState({result:component.state.result, loaded:true, page:page});
				}
				else{
					//else overwrite old hits
					this.setState({result:res, loaded:true, page:0});
				}
			}
		}.bind(component),
		error: function(err){
			//TODO handle error return by displaying generic error message
			console.error(err);
		}.bind(component)
	})
}

var SearchResultItem = React.createClass({displayName: 'SearchResultItem',
	render: function(){
		var profile = this.props.profile._source;
		return(
			React.createElement('li', {className:'searchResultItem'},
				React.createElement('a', {className:'searchResultLink', href:baseURL + 'uploads/' + profile.resume, download:profile.file, title:'Download resume of ' + profile.name},
					profile.name, 
					React.createElement('span', {className:'glyphicon glyphicon-download-alt searchResultLinkIcon'})
				)
			)
		);
	}
});

var LoadMoreButton = React.createClass({displayName: 'LoadMoreButton',
	render: function(){
		return(
			React.createElement('button', {className:'loadMoreButton btn btn-primary', onClick:this.props.loadMore}, "Load More...")
		);
	}
});

var SearchResultList = React.createClass({displayName: 'SearchResultList',
	render: function(){
		var profiles = this.props.result.hits.hits;
		var list = [];
		for(var i = 0; i < profiles.length; i++){
			list.push(React.createElement(SearchResultItem,{key:profiles[i]._id,profile:profiles[i]}));
		}

		return(
			React.createElement('ul', {className:'searchResults'},
				list
			)
		);
	}
});

var SearchResults = React.createClass({displayName: 'SearchResults',
	getInitialState: function() {
		// return {profiles: [{_source:{name:'Guy Test', resume:'asfasefasef', file:'guy test.docx'}},{_source:{name:'Girl Test', resume:'asfasefasef', file:'girl test.docx'}}]};
		return {result: {hits:{hits:[], total:0}}, loaded:false, page:0};
	},
	componentDidMount: function(){
		var self = this;
		$('#search').keyup(function(e){
			loadResults(self, $(this).val(), 0);
		});
	},
	loadMore : function(){
		loadResults(this, $("#search").val(), this.state.page + 1);
	},
	render: function(){
		//if the list is not empty, and are still more results that can be loaded
		if(this.state.result.hits.hits.length && this.state.result.hits.hits.length < this.state.result.hits.total){
			return (
				React.createElement('div', {className:'searchResults'},
					React.createElement(SearchResultList, {result:this.state.result, loaded:this.state.loaded}),
					React.createElement(LoadMoreButton, {loadMore:this.loadMore})
				)
			);
		}

		return (
			React.createElement('div', {className:'searchResults'},
				React.createElement(SearchResultList, {result:this.state.result, loaded:this.state.loaded})
			)
		);
	}
});

ReactDOM.render(
	React.createElement(SearchResults, null),
	document.getElementById("search-results")
);