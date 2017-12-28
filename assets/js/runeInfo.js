var React = require('react')
var ReactDOM = require('react-dom')

var barBase = {
  labels: ['Tank', 'Support', 'Mage', 'Fighter', 'Assassin', 'Marksman'],
  datasets: [
    {
      label: 'Role Distribution',
      backgroundColor: 'rgba(255,99,132,0.2)',
      borderColor: 'rgba(255,99,132,1)',
      borderWidth: 1,
      hoverBackgroundColor: 'rgba(255,99,132,0.4)',
      hoverBorderColor: 'rgba(255,99,132,1)',
      scaleOverride:true,
      scaleSteps:1,
      scaleStartValue:0,
      scaleStepWidth:1,
      data: []
    }
  ]
};

var radarBase = {
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
      scaleOverride:true,
      scaleSteps:3,
      scaleStartValue:0,
      scaleStepWidth:1,
      data: []
    },
    {
      label: 'Champion Stats',
      backgroundColor: 'rgba(255,99,132,0.2)',
      borderColor: 'rgba(255,99,132,1)',
      pointBackgroundColor: 'rgba(255,99,132,1)',
      pointBorderColor: '#fff',
      pointHoverBackgroundColor: '#fff',
      pointHoverBorderColor: 'rgba(255,99,132,1)',
      scaleOverride:true,
      scaleSteps:3,
      scaleStartValue:0,
      scaleStepWidth:1,
      data: []
    }
  ]
};

var BarGraph = require('./chartjs').HorizontalBar
var RadarGraph = require('./chartjs').Radar

//
// var Child = React.createClass({
//   render: function () {
//     return <button onClick={this.props.onClick}>{this.props.text}</button>;
//   },
// });
//
// var Parent = React.createClass({
//   getInitialState: function() {
//       this.state = {}
//      this.setState({data : 'Electrocute'});
//      return {childsData: [
//          {childText: "Lethal Tempo", childNumber: 1},
//          {childText: "Magical Footwear", childNumber: 2}
//      ]};
//   },
//   render: function () {
//     var childrens = this.state.childsData.map(function(childData,childIndex) {
//         return <Child onClick={this.handleChildClick.bind(null,childData)} text={childData.childText}/>;
//     }.bind(this));
//     return(
//       <div className="row">
//           <div className="col-md-3">{childrens}</div>
//           <div className="col-md-6"><RuneInfo rune={this.state.data}/></div>
//           <div className="col-md-3">{childrens}</div>
//      </div>)
//   },
//   handleChildClick: function(childData,event) {
//         this.setState({data: childData.childText});
//   }
// });

var sample = {
   "id":8229,
   "name":"Arcane Comet",
   "desc":"Damaging a champion with an ability hurls a damaging comet at their location.",
   "roles":{
      "Marksman":"0.127",
      "Mage":"0.404",
      "Assassin":"0.085",
      "Fighter":"0.127",
      "Support":"0.170",
      "Tank":"0.085"
   },
   "attributes":{
      "attack":"2.75",
      "defense":"0.785",
      "toughness":"2.214",
      "mobility":"0.857",
      "utility":"0.75"
   }
}

var RuneInfo = React.createClass({
    getBarData(data){
        return [
            data["Tank"], data["Support"],data["Mage"], data["Fighter"],data["Assassin"], data["Marksman"]
        ]
    },
    getRadarData(data){
        return [
            data["attack"], data["defense"],data["toughness"], data["mobility"],data["utility"]
        ]
    },
    setStateResponse(response){
        var barBaseCopy = Object.assign({}, barBase);
        barBaseCopy['datasets'][0]['data'] = this.getBarData(response.roles).map(Number)

        var radarBaseCopy = Object.assign({}, radarBase);
        radarBaseCopy['datasets'][0]['data'] = this.getRadarData(response.attributes).map(Number)
        radarBaseCopy['datasets'][1]['data'] = [0,0,0,0,0]

        this.setState({
            data : response,
            barData : barBaseCopy,
            radarData : radarBaseCopy
        });
    },
   componentWillReceiveProps(nextProps) {
        if(this.props != nextProps && nextProps.rune !== -1) {
            fetch('/api/rune/info/', {
                    method: 'post',
                    headers: {'Content-Type':'application/json'},
                    body: JSON.stringify(nextProps)})
                .then((response) => response.json())
                .then((response) => this.setStateResponse(response));
        }
  },
  render() {
    var ret = <div></div>

    if (this.state) {
        ret = (
        <div>
            <div className="row">
                <div className="col-sm-8">
                    <h2>{this.state.data.name}</h2>
                    <p><strong>{this.state.data.desc}</strong></p>
                </div>
                <div className="col-sm-4">
                        <img src={require(`../img/perk/${this.state.data.id}.png`)}
                          alt="" className="img-circle img-responsive rune-img"/>
                </div>
            </div>
            <div className="row">
                <div className="col-sm-8">
                  <RadarGraph data={this.state.radarData}/>
                </div>
                <div className="col-sm-4">
                   idk something here
                </div>
            </div>
            <div className="row">
                <BarGraph data={this.state.barData}/>
            </div>
        </div>
        )
    }
    return ret
  }
})

RuneInfo.defaultProps = {
};

module.exports = RuneInfo;

// ReactDOM.render(<Parent endpoint="https://jsonplaceholder.typicode.com/posts/1"/>, document.getElementById('parent'))
