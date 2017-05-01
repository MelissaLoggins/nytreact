var React = require('react');

//Require all of the children of the webapp since this is our main framework
var Search = require("./Children/SearchForm.js");
var Results = require("./Children/Results.js");
var Saved = require("./Children/Saved.js");

//Require helper functions to help make use of the API.  
var helpers = require('./utils/helpers.js');

//Set up the main component.
var Main = React.createClass({
	//Set up the initial state.
	getInitialState: function(){
		return{
			searchTerm: "",
			startYear: "",
			endYear: "",
			results: [],
			history: []
		}
	}, 

	//Allows us to set the search term, start year and end year. 
	setTerm: function(term, startYear, endYear){
		this.setState({
			searchTerm: term,
			startYear: startYear,
			endYear: endYear
		})
	},
	//If a component changes, we do this. 
	componentDidUpdate: function(prevProps, prevState){
		//If previous state search term is diff than the current state search term. 
		if(prevState.searchTerm != this.state.searchTerm){
			console.log("old search did not equal new search");
			//Run query on NYT API
			helpers.runQuery(this.state.searchTerm, this.state.startYear, this.state.endYear)
				.then(function(data){
					//If we have a new results
					if(data != this.state.results){
						console.log("Search", data);
						this.setState({ results: data })
					}
				}.bind(this))
		}
	},
	//As soon as the page renders, get the saved articles.
	componentDidMount: function(){

		helpers.getSaved()
			.then(function(response){
				//if the response does not equal the current history. 
				if(response != this.state.history){
					console.log("Saved Articles", response.data)

					this.setState({
						history: response.data
					})
				}
			}.bind(this))
	},
	//Renders the main component. 
	render: function(){
		return(
			<div className="container">
				<div className="row">
					<Search setTerm={this.setTerm}/>
				</div>
				<div className="row">
					<Results results={this.state.results}/>
				</div>
				<div className="row">
					<Saved history={this.state.history}/>
				</div>
			</div>
			)
	}
});

//Export the module to be used elsewhere.
module.exports = Main; 