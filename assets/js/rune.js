var React = require('react')
var ReactDOM = require('react-dom')

var data2 = {
  labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
  datasets: [
    {
      label: 'My First dataset',
      backgroundColor: 'rgba(255,99,132,0.2)',
      borderColor: 'rgba(255,99,132,1)',
      borderWidth: 1,
      hoverBackgroundColor: 'rgba(255,99,132,0.4)',
      hoverBorderColor: 'rgba(255,99,132,1)',
      data: [65, 59, 80, 81, 56, 55, 40]
    }
  ]
};

var data3 = {
  labels: ['Attack', 'Defense', 'Toughness', 'Mobility', 'Utility'],
  datasets: [
    {
      label: 'Rune Average stats',
      backgroundColor: 'rgba(179,181,198,0.2)',
      borderColor: 'rgba(179,181,198,1)',
      pointBackgroundColor: 'rgba(179,181,198,1)',
      pointBorderColor: '#fff',
      pointHoverBackgroundColor: '#fff',
      pointHoverBorderColor: 'rgba(179,181,198,1)',
      data: [2, 3, 2, 2, 0]
    },
    {
      label: 'Champion Stats',
      backgroundColor: 'rgba(255,99,132,0.2)',
      borderColor: 'rgba(255,99,132,1)',
      pointBackgroundColor: 'rgba(255,99,132,1)',
      pointBorderColor: '#fff',
      pointHoverBackgroundColor: '#fff',
      pointHoverBorderColor: 'rgba(255,99,132,1)',
      data: [1, 2, 1.5, 1, 1]
    }
  ]
};

var BooksList = require('./chartjs').HorizontalBar
var Radarz = require('./chartjs').Radar


var Child = React.createClass({
  render: function () {
    return <button onClick={this.props.onClick}>{this.props.text}</button>;
  },
});

var Parent = React.createClass({
  getInitialState: function() {
      this.state = {}
     this.setState({data : 'Electrocute'});
     return {childsData: [
         {childText: "Lethal Tempo", childNumber: 1},
         {childText: "Magical Footwear", childNumber: 2}
     ]};
  },
  render: function () {
    var childrens = this.state.childsData.map(function(childData,childIndex) {
        return <Child onClick={this.handleChildClick.bind(null,childData)} text={childData.childText}/>;
    }.bind(this));
    return(
      <div className="row">
          <div className="col-md-3">{childrens}</div>
          <div className="col-md-6"><RuneInfo rune={this.state.data}/></div>
          <div className="col-md-3">{childrens}</div>
     </div>)
  },
  handleChildClick: function(childData,event) {
        this.setState({data: childData.childText});
  }
});

var RuneInfo = React.createClass({
   componentWillReceiveProps(nextProps) {
    //api calls to refresh
  },
      _makeApiCall(endpoint) {
    fetch(endpoint)
    	.then((response) => response.json())
      .then((response) => this.setState({ response }));
  },
  render: function () {
    return(
        <div>
            <div className="row">
                <div className="col-sm-8">
                    <h2>{this.props.rune}</h2>
                    <p><strong>Description</strong></p>
                </div>
                <div className="col-sm-4">
                        <img src="https://i.pinimg.com/originals/a9/ff/b2/a9ffb2e901c09caf4837542e72719e41.jpg"
                             alt="" className="img-circle img-responsive rune-img"/>
                </div>
            </div>
            <div className="row">
                <div className="col-sm-8">
                  <Radarz data={data3}/>
                </div>
                <div className="col-sm-4">
                   idk something here
                </div>
            </div>
            <div className="row">
                <BooksList data={data2}/>
            </div>
        </div>
        )
  }
});


ReactDOM.render(<Parent endpoint="https://jsonplaceholder.typicode.com/posts/1"/>, document.getElementById('parent'))
