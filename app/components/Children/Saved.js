var React = require('react');

var Saved = React.createClass({
	render: function(){
		return(
			<div className="panel panel-default">
				<div className="panel-heading">
					<h3 className="panel-title text-center">Saved Articles</h3>
				</div>
				<div className="panel-body text-center">
					{this.props.history.map(function(search, i){
						return (
							<div id="savedDiv" key={i}>
								<h3>{search.title}</h3>
								<a href={search.url}><button type="button" className="btn btn-success">View on NYT</button></a>
							</div>
							)
					})}
				</div>
			</div>
			)
	}
});

module.exports = Saved;