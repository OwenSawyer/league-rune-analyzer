var React = require('react')
var ReactDOM = require('react-dom')

var RuneInfo = require('./runeInfo.js')
 import './GaugeSet.js'

// TODO: Create Match History Object
function getAllUrlParams(url) {

  // get query string from url (optional) or window
  var queryString = url ? url.split('?')[1] : window.location.search.slice(1);

  // we'll store the parameters here
  var obj = {};

  // if query string exists
  if (queryString) {

    // stuff after # is not part of query string, so get rid of it
    queryString = queryString.split('#')[0];

    // split our query string into its component parts
    var arr = queryString.split('&');

    for (var i=0; i<arr.length; i++) {
      // separate the keys and the values
      var a = arr[i].split('=');

      // in case params look like: list[]=thing1&list[]=thing2
      var paramNum = undefined;
      var paramName = a[0].replace(/\[\d*\]/, function(v) {
        paramNum = v.slice(1,-1);
        return '';
      });

      // set parameter value (use 'true' if empty)
      var paramValue = typeof(a[1])==='undefined' ? true : a[1];

      // if parameter name already exists
      if (obj[paramName]) {
        // convert value to array (if still string)
        if (typeof obj[paramName] === 'string') {
          obj[paramName] = [obj[paramName]];
        }
        // if no array index number specified...
        if (typeof paramNum === 'undefined') {
          // put the value on the end of the array
          obj[paramName].push(paramValue);
        }
        // if array index number specified...
        else {
          // put the value at that index number
          obj[paramName][paramNum] = paramValue;
        }
      }
      // if param name doesn't exist yet, set it
      else {
        obj[paramName] = paramValue;
      }
    }
  }

  return obj;
};

function isEmpty(obj) {
    for(var key in obj) {
        if(obj.hasOwnProperty(key))
            return false;
    }
    return true;
}

const SummonerName = getAllUrlParams().name;
const AccountID = getAllUrlParams().accountId;
const Region = getAllUrlParams().region;

const Precision = {
  "treeIcon" : 8000,
  "keystones" : [8005, 8008, 8021],
  "r1" : [9101, 9111, 8009],
  "r2" : [9104, 9105, 9103],
  "r3" : [8014, 8017, 8229]
};

const Domination = {
  "treeIcon" : 8100,
  "keystones" : [8112, 8124, 8128],
  "r1" : [8126, 8139, 8143],
  "r2" : [8136, 8120, 8138],
  "r3" : [8135, 8134, 8105]
};

const Sorcery = {
  "treeIcon" : 8200,
  "keystones" : [8214, 8229, 8230],
  "r1" : [8224, 8226, 8243],
  "r2" : [8210, 8234, 8233],
  "r3" : [8237, 8232, 8236]
};

const Inspiration = {
  "treeIcon" : 8300,
  "keystones" : [8326, 8351, 8359],
  "r1" : [8306, 8345, 8313],
  "r2" : [8304, 8321, 8316],
  "r3" : [8347, 8410, 8339]
};

const Resolve = {
  "treeIcon" : 8400,
  "keystones" : [8437, 8439, 8465],
  "r1" : [8242, 8446, 8463],
  "r2" : [8430, 8435, 8429],
  "r3" : [8451, 8453, 8444]
};

var MatchHistory = React.createClass({
  getInitialState: function(){
    var MatchHistoryList;
    $.ajax({
      url: '/api/matchlist/',
      type: 'post',
      async: false,
      data: {
          "region" : Region,
          "accountId" : AccountID
      },
      success : function(response){
        console.log(response);
        console.log(response.matches);
        MatchHistoryList = response.matches;
      },
      error : function(response){
          console.log(response);
          MatchHistoryList = "";
      }
    });
    console.log(MatchHistoryList);
    return {
      data : MatchHistoryList
    }
  },

  render : function(){
    var Indicators = this.state.data.map(function(Match, i) {
        return (<li key={i} data-target="#carouselExampleIndicators" data-slide-to={i} className={(i == 0 ? 'active' : '')}></li>);
    });

    var that = this;
    var MatchPanels = this.state.data.map(function(Match, i) {
      return (<div key={i} className={"carousel-item " + (i == 0 ? 'active' : '')}><MatchPanel matchId={that.state.data[i].gameId} /></div>);
    });

    return (
      <div id="carouselExampleIndicators" className="carousel carousel-panel slide text-center" data-ride="carousel">
          <ol className="carousel-indicators">
            {Indicators}
          </ol>

          <div id="carouselInner" className="carousel-inner" role="listbox">
            {MatchPanels}
          </div>
          <a className="carousel-control-prev" href="#carouselExampleIndicators" role="button" data-slide="prev">
            <span className="carousel-control-prev-icon" aria-hidden="true"></span>
            <span className="sr-only">Previous</span>
          </a>
          <a className="carousel-control-next" href="#carouselExampleIndicators" role="button" data-slide="next">
            <span className="carousel-control-next-icon" aria-hidden="true"></span>
            <span className="sr-only">Next</span>
          </a>
        </div>
    )
  }
});


var MatchPanel = React.createClass({
    getInitialState: function() {
        this.state = {}
        this.state.rune = -1
        return this.state
    },
    handler(runeId) {
        this.setState({
          rune: runeId
        })
    },

    selectTree : function(treeid){
      if(treeid == 8000){
        return Precision;
      }
      else if(treeid == 8100){
        return Domination;
      }
      else if(treeid == 8200){
        return Sorcery;
      }
      else if(treeid == 8300){
        return Inspiration;
      }
      else{
        return Resolve;
      }
    },

    getMatchResponse : function(){
      
    },

    render: function () {
        var MatchResponse;
        $.ajax({
            url: '/api/match/',
            type: 'post',
            async: false,
            data: {
                'region' : Region,
                'matchId' : this.props.matchId,
                'accountId' : AccountID
            },
            success : function(response){
              console.log(response);
              MatchResponse = response;
            },
            error : function(response){
              MatchResponse = response;
            }
        })
        console.log(MatchResponse);
        var OptimalRunes;
        $.ajax({
            url: '/api/rune/opt/',
            type: 'post',
            async: false,
            data: {
                "champion" : MatchResponse.championName,
                "role" : MatchResponse.lane.toLowerCase(),
            },
            success : function(response){
              console.log(response);
              OptimalRunes = response;
            },
            error : function(response){
              OptimalRunes = response;
            }
        })
        var PlayerPrimaryTree = this.selectTree(MatchResponse.runes.primary.id);
        var PlayerSecondaryTree = this.selectTree(MatchResponse.runes.secondary.id);

        var OptimalPrimaryTreePanel;
        var OptimalSecondaryTreePanel;
        console.log(OptimalRunes);
        if(!isEmpty(OptimalRunes)){
          console.log("inner optimal rune");
          console.log(OptimalRunes);
          var OptimalPrimaryTree = this.selectTree(OptimalRunes.primary.id);
          OptimalPrimaryTreePanel = (<RunePanel runetype="optimal-runes" runes={OptimalPrimaryTree} chosen={OptimalRunes.primary.runes}/>);

          var OptimalSecondaryTree = this.selectTree(OptimalRunes.secondary.id);
          OptimalSecondaryTreePanel = (<RunePanel runetype="optimal-runes secondary-tree" runes={OptimalSecondaryTree} chosen={OptimalRunes.secondary.runes}/>);
        }
        else{
          OptimalPrimaryTreePanel = (<div className="rune-panel text-center"><h2>No optimal runes available</h2></div>);
          OptimalSecondaryTreePanel = (<div className="rune-panel text-center"><h2>No optimal runes available</h2></div>);
        }

        return (
            <div className="row profile match-panel table-responsive">
              <MatchResults rating={MatchResponse.runes.rating} matchId={this.props.matchId} match={MatchResponse}/>
              <div className="row">
                <div className="col-md-2">
                  <RunePanel handler={this.handler} runetype="player-runes" runes={PlayerPrimaryTree} chosen={MatchResponse.runes.primary.runes}/>
              </div>

              <div className="col-md-2">
                <RunePanel handler={this.handler} runetype="player-runes secondary-tree" runes={PlayerSecondaryTree} chosen={MatchResponse.runes.secondary.runes}/>
              </div>

              <div className="col-md-4">
                <RuneInfo rune={this.state.rune}/>
              </div>

            <div className="col-md-2">
              {OptimalPrimaryTreePanel}
            </div>

            <div className="col-md-2">
              {OptimalSecondaryTreePanel}
            </div>

            </div>
          </div>
        );
    }
});

var RunePanel = React.createClass({

  handleChildClick: function(childData,event) {
      this.props.handler(childData);
      this.setState({data: childData});
  },

  isSecondary : function() {
    if(this.props.runetype.includes("secondary-tree")){
      return true;
    }
    else{
      return false;
    }
  },

  render : function(){
    console.log(this.props.runes.treeIcon);
    var TreeIsSecondary = this.isSecondary();
    return (
    <table className={"rune-panel text-center " + this.props.runetype}>
        <thead className="tree-icon text-center">
            <th></th>
            <th><img src={require(`../img/perkStyle/${this.props.runes.treeIcon}.png`)}/></th>
        </thead>
        <tbody>
          <tr className="keystones">
            <Rune onClick={this.handleChildClick.bind(null,this.props.runes.keystones[0])} runeId={this.props.runes.keystones[0]} chosen={this.props.chosen} />
            <Rune onClick={this.handleChildClick.bind(null,this.props.runes.keystones[1])} runeId={this.props.runes.keystones[1]} chosen={this.props.chosen} />
            <Rune onClick={this.handleChildClick.bind(null,this.props.runes.keystones[2])} runeId={this.props.runes.keystones[2]} chosen={this.props.chosen} />
          </tr>
          <tr className="rune-row">
            <Rune onClick={this.handleChildClick.bind(null,this.props.runes.r1[0])} runeId={this.props.runes.r1[0]} chosen={this.props.chosen} />
            <Rune onClick={this.handleChildClick.bind(null,this.props.runes.r1[1])} runeId={this.props.runes.r1[1]} chosen={this.props.chosen} />
            <Rune onClick={this.handleChildClick.bind(null,this.props.runes.r1[2])} runeId={this.props.runes.r1[2]} chosen={this.props.chosen} />
          </tr>
          <tr className="rune-row">
             <Rune onClick={this.handleChildClick.bind(null,this.props.runes.r2[0])} runeId={this.props.runes.r2[0]} chosen={this.props.chosen} />
             <Rune onClick={this.handleChildClick.bind(null,this.props.runes.r2[1])} runeId={this.props.runes.r2[1]} chosen={this.props.chosen} />
             <Rune onClick={this.handleChildClick.bind(null,this.props.runes.r2[2])} runeId={this.props.runes.r2[2]} chosen={this.props.chosen} />
          </tr>
          <tr className="rune-row">
             <Rune onClick={this.handleChildClick.bind(null,this.props.runes.r3[0])} runeId={this.props.runes.r3[0]} chosen={this.props.chosen} />
             <Rune onClick={this.handleChildClick.bind(null,this.props.runes.r3[1])} runeId={this.props.runes.r3[1]} chosen={this.props.chosen} />
             <Rune onClick={this.handleChildClick.bind(null,this.props.runes.r3[2])} runeId={this.props.runes.r3[2]} chosen={this.props.chosen} />
          </tr>
        </tbody>
    </table>
    )
  }

});

var Rune = React.createClass({

  getRuneActive: function(){
    if(this.props.chosen.includes(this.props.runeId)){
      return "active-rune";
    }
    else{
      return "";
    }
  },
  render: function() {
    var ActiveRune = this.getRuneActive();
    return (<td className={ActiveRune}><img id={this.props.runeid} onClick={this.props.onClick} src={require(`../img/perk/${this.props.runeId}.png`)} /></td>);
  }
})

var MatchResults = React.createClass({

  componentDidMount: function() {
     setGaugeMeter(this.props.matchId);
  },

  render: function() {
    var WinClass;
    if(this.props.match.win == "true"){
      WinClass = "row profile-sidebar victory";
    }
    else{
      WinClass = "row profile-sidebar defeat";
    }

    return (
      <div className={WinClass}>
        <div className="text-center col-md-2 profile-usertitle-time">
          {this.props.match.gameDate}
        </div>
        <div className="profile-userpic col-md-2">
          <img src={require(`../img/champion/${this.props.match.champion}.png`)} className="img-responsive" alt="" />
        </div>
        <div className="col-md-3 profile-usertitle">
            <div className="profile-usertitle-name">
                {this.props.match.championName}
              </div>
              <div className="profile-usertitle-job">
                {this.props.match.lane}
              </div>
              <div className="profile-usertitle-kda">
                {this.props.match.kills}/{this.props.match.deaths}/{this.props.match.assists}
              </div>
        </div>
        <div className="profile-summ-spells col-md-2">
          <img className="spell img-responsive" src={require(`../img/summoner/${this.props.match.spell1}.png`)} alt="" />
          <img className="spell img-responsive" src={require(`../img/summoner/${this.props.match.spell2}.png`)} alt="" />
        </div>
        <div className="rune-rating col-md-3 GaugeMeter"></div>
          <canvas id={"gauge_meter_" + this.props.matchId}></canvas>
      </div>
    )
  }
})

ReactDOM.render(<h1>{SummonerName}</h1>, document.getElementById('summonerNameHeading'));
ReactDOM.render(<MatchHistory />, document.getElementById('matchHistory'));
