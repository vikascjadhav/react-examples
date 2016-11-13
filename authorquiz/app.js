
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
       						<img src={this.state.author.imageUrl}  className="authorImage col-md-3 img-responsive" />
       					</div>

       					<div className="col-md-7">
       						{this.state.books.map(function(b){
       							return <Book title = {b} onBookSelected={this.handleBookSelected} />
       						},this)}
       					</div>

       					<div style = { {  height: '325px', marginbottom: '15px'}} className={"col-md-1 " + this.state.bgClass}> </div>
       				</div>
       		
		       		{this.state.showContinue ? (
		       				<div className ="row">
		       					<div className="col-md-11">
		       						< button onClick = {this.handleContinue} type = "submit" className = "btn btn-default pull-right btn-lg btn-success" align="right"> Continue < /button>
		       					</div>
		       				</div>
		       			) : <span /> }
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
  name: 'Jane Austen',
  imageUrl: 'images/authors/jane-austen.jpg',
  books: [
    'Pride and Prejudice',
    'Sense and Sensibility',
    'Emma'
  ]
}, {
  name: 'Joseph Conrad',
  imageUrl: 'images/authors/joseph-conrad.png',
  books: [
    'Heart of Darkness'
  ]
}, {
  name: 'Charles Dickens',
  imageUrl: 'images/authors/charles-dickens.jpg',
  books: [
    'A Tale of Two Cities',
    'A Christmas Carol',
    'David Copperfield',
    'Bleak House'
  ]
}, {
  name: 'Sigmunnd Freud',
  imageUrl: 'images/authors/sigmund-freud.jpg',
  books: [
    'Jokes and Their Relation to the Unconscious',
    'Civilization and Its Discontents',
    'The Interpretation of Dreams'
  ]
}, {
  name: 'Friedrich Nietzsche',
  imageUrl: 'images/authors/friedrich-nietzsche.jpg',
  books: [
    'Thus Spake Zarathustra',
    'Ecce Homo',
    'Beyond Good and Evil',
    'Twilight of the Idols'
  ]
}, {
  name: 'William Shakespeare',
  imageUrl: 'images/authors/william-shakespeare.jpg',
  books: [
    'King Lear',
    'A Midsummer Night\'s Dream',
    'Hamlet',
    'Richard III',
    'The Comedy of Errors'
  ]
}, {
  name: 'Mark Twain',
  imageUrl: 'images/authors/mark-twain.jpg',
  books: [
    'Huckleberry Finn',
    'Tom Sawyer',
    'A Connecticut Yankee at King Arthur\'s Court'
  ]
}];

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