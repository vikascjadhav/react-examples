
(function() {
	'use strict';

	var Quiz = React.createClass({
		propTypes: {
			books : React.PropTypes.array.isRequired 
		},
        
        getInitialState : function() {
        		return _.extend ({
        			bgClass: 'neutral',
        			showContinue : false
        		},this.props.data.selectGame());
        },

        handleBookSelected: function(title) {
        	var isCorrect = this.state.checkAnswer(title);
        	this.setState({
        		bgClass : isCorrect ? "pass" : "fail",
        		showContinue : isCorrect
        	});
        },

        handleContinue : function () {
        	this.setState(this.getInitialState());
        },

        render : function() {
        	

       		return  (<div> 
       				<div className="row">
       					<div className="col-md-4">
       						<img src={this.state.author.imageUrl} className="" />
       					</div>

       					<div className="col-md-7">
       						{this.state.books.map(function(b){
       							return <Book title = {b} onBookSelected={this.handleBookSelected} />
       						},this)}
       					</div>

       					<div className={"col-md-1" + this.state.bgClass}> </div>
       				</div>
       		
       		{this.state.showContinue ? (
       				<div className ="row">
       					<div className="col-md-12">
       						<input onClick={this.handleContinue} type="button" className="btn btn-primary" />
       					</div>
       				</div>
       			) : <span/> }
       		</div>
       		
       		);
        }
	});

    var Book = React.createClass({
    	propTypes : {
    		title : React.PropTypes.string.isRequired
    	},
    	handleClick: function () {
    		this.props.onBookSelected(this.props.title);
    	},
    	render : function() {
    		return <div className = "bg-info title"  onClick={this.handleClick}> <h4>{this.props.title}</h4></div>;
    	}
    });

    var data = [{
	    		name: 'Mark Twain',
	    		imageUrl: 'images/authors/marktwain.jpg',
	    		books : ['The Adventrures of Huckleberry Finn']
    		},{
	    		name: 'Joseph Conrad',
	    		imageUrl: 'images/authors/josephconard.jpg',
	    		books : ['Heart of Darkness']
    		},{
	    		name: 'J. K. Rowling',
	    		imageUrl: 'images/authors/jkrowling.jpg',
	    		books : ['Harry Potter and Sorcerers Stone']
    		},{
	    		name: 'Stephen King',
	    		imageUrl: 'images/authors/stephenking.jpg',
	    		books : ['The Shining','IT']
    		},{
    			name: 'William Shakespeare',
	    		imageUrl: 'images/authors/williamshakespeare.jpg',
	    		books : ['Hamelet','Macbeth','Romeo and Juliet']
    		}]

    data.selectGame = function () {
    	var books = _.shuffle(this.reduce(function(p,c,i) {
    		return p.concat(c.books);
    	},[])).slice(0,4);

    	var answer = books[_.random(books.length-1)];

    	return {
    		books : books,
    		author : _.find(this,function(author) {
    				return author.books.some(function(title) {
    					return title === answer;
    				});
    		}),

    		checkAnswer : function (title) {
    			return this.author.books.some(function(t) {
    				return t === title;
    			});
    		}
    	};
    };


	React.render(<Quiz data={data}/>, document.getElementById('app'));
})();