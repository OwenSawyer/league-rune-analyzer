var React = require('react')
var ReactDOM = require('react-dom')

var barBase = {
  labels: ['Tank', 'Support', 'Mage', 'Fighter', 'Assassin', 'Marksman'],
  datasets: [
    {
      label: 'Role Distribution',
      borderWidth: 1,
      scaleOverride:true,
      scaleSteps:1,
      scaleStartValue:0,
      scaleStepWidth:1,
      data: []
    }
  ]
};

var categoryColors = {
    8000: { // Precision
        backgroundColor: 'rgba(190, 126, 7, 0.2)',
        borderColor: 'rgba(190, 126, 7, 1)'
    },
    8100: { // Domination
        backgroundColor: 'rgba(255,99,132,0.2)',
        borderColor: 'rgba(255,99,132,1)',
    },
    8200: { // Sorcery
        backgroundColor: 'rgba(28, 122, 216, 0.2)',
        borderColor: 'rgba(28, 122, 216, 1)'
    },
    8300: { // Inspiration
        backgroundColor: 'rgba(61, 170, 151, 0.2)',
        borderColor: 'rgba(61, 170, 151, 1)',
    },
    8400: { // Resolve
        backgroundColor: 'rgba(48, 143, 24, 0.2)',
        borderColor: 'rgba(48, 143, 24, 1)'
    }
}

var radarBase = {
  labels: ['Attack', 'Defense', 'Toughness', 'Mobility', 'Utility'],
  options:{
        scale: {
            display: false
        }
    },
  datasets: [
    {
      label: 'Rune Average stats',
      pointBackgroundColor: 'rgba(179,181,198,1)',
      pointBorderColor: '#fff',
      pointHoverBackgroundColor: '#fff',
      pointHoverBorderColor: 'rgba(179,181,198,1)',
      scaleOverride:true,
      scaleSteps:2,
      scaleStartValue:0,
      scaleStepWidth:1,
      data: []
    },
    {
      label: 'Champion Stats',
      backgroundColor: 'rgba(0, 0, 0, 0.2)',
      borderColor: 'rgba(0, 0, 0, 1)',
      pointBorderColor: '#000000',
      scaleOverride:true,
      scaleSteps:2,
      scaleStartValue:0,
      scaleStepWidth:1,
      data: []
    }
  ]
};

var radarOptions = {
    scale: {
       ticks: {
        display: false,
        suggestedMin: 0,
        suggestedMax: 3,
        maxTicksLimit: 4
       }
    },
    tooltips: {
        enabled: false
    }
}

var BarGraph = require('./chartjs').HorizontalBar
var RadarGraph = require('./chartjs').Radar

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
        barBaseCopy['datasets'][0]['backgroundColor'] = categoryColors[response.category].backgroundColor
        barBaseCopy['datasets'][0]['borderColor'] = categoryColors[response.category].borderColor

        var radarBaseCopy = Object.assign({}, radarBase);
        radarBaseCopy['datasets'][0]['data'] = this.getRadarData(response.attributes).map(Number)
        radarBaseCopy['datasets'][0]['backgroundColor'] = categoryColors[response.category].backgroundColor
        radarBaseCopy['datasets'][0]['borderColor'] = categoryColors[response.category].borderColor
        radarBaseCopy['datasets'][1]['data'] = this.getRadarData(this.props.championAttributes).map(Number)

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
        <div className="rune-info">
            <div className="row">
                <div className="col-sm-8">
                    <span style={{display: 'inline-block', verticalAlign: 'middle'}}>
                        <h2>{this.state.data.name}</h2>
                    </span>
                </div>
                <div className="col-sm-4">
                        <img src={require(`../img/perk/${this.state.data.id}.png`)}
                          alt="" className="img-circle img-responsive rune-img"/>
                </div>
            </div>
            <div className="row">
                 <p><strong>{this.state.data.desc}</strong></p>
            </div>
            <div className="row">
                <RadarGraph data={this.state.radarData} options={radarOptions}/>
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
