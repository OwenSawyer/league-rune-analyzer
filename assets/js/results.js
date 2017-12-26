var React = require('react')
var ReactDOM = require('react-dom')

var RuneInfo = require('./runeInfo.js')

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
}

const SummonerName = getAllUrlParams().name;
const AccountID = getAllUrlParams().accoundId;
const Region = getAllUrlParams().region;

const Precision = {
  "treeIcon" : 8000,
  "keystones" : [8000, 8008, 8021],
  "r1" : [9101, 9111, 8009],
  "r2" : [9104, 9105, 9103],
  "r3" : [8014, 8017, 8229]
}

const Domination = {
  "treeIcon" : 8100,
  "keystones" : [8112, 8124, 8128],
  "r1" : [8126, 8139, 8143],
  "r2" : [8136, 8120, 8138],
  "r3" : [8135, 8134, 8105]
}

const Sorcery = {
  "treeIcon" : 8200,
  "keystones" : [8214, 8229, 8230],
  "r1" : [8224, 8226, 8243],
  "r2" : [8210, 8234, 8233],
  "r3" : [8237, 8232, 8236]
}

const Inspiration = {
  "treeIcon" : 8300,
  "keystones" : [8326, 8351, 8359],
  "r1" : [8306, 8345, 8313],
  "r2" : [8304, 8321, 8316],
  "r3" : [8347, 8410, 8339]
}

const Resolve = {
  "treeIcon" : 8400,
  "keystones" : [8437, 8439, 8465],
  "r1" : [8242, 8446, 8463],
  "r2" : [8430, 8435, 8429],
  "r3" : [8451, 8453, 8444]
}

var MatchResponse = {
  'champion': 115, 
  'championName': 'Ziggs', 
  'lane': 'MIDDLE', 
  'gameDate': '20/12/17', 
  'gameDuration': '0:20:03', 
  'gameMode': 'Snowurf', 
  'win': true, 
  'kills': 14, 
  'deaths': 11, 
  'assists': 10, 
  'spell1': 39, 
  'spell2': 4, 
  'runes': {'primary': {'id': 8200, 'runes': [8229, 8224, 8210, 8237]}, 'secondary': {'id': 8300, 'runes': [8410, 8313]}, 
  'championTags': ['Mage'], 
  'championAttributes': {'attack': 3, 'defense': 0, 'toughness': 2, 'mobility': 2, 'utility': 0}}};

var MatchPanel = React.createClass({

    selectPlayerTree : function(treeid){
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

    render: function () {
        var PlayerPrimaryTree = this.selectPlayerTree(MatchResponse.runes.primary.id);
        var PlayerSecondaryTree = this.selectPlayerTree(MatchResponse.runes.secondary.id);

        return (
            <div className="row profile match-panel table-responsive">
              <MatchResults match={MatchResponse}/>
              <div className="row">
                <div className="col-md-2">
                  <RunePanel runetype="player-runes" runes={PlayerPrimaryTree} chosen={MatchResponse.runes.primary.runes}/>
              </div>

              <div className="col-md-2">
                <RunePanel runetype="player-runes secondary-tree" runes={PlayerSecondaryTree} chosen={MatchResponse.runes.secondary.runes}/>
              </div>

              <div className="col-md-4">
                <RuneInfo />
              </div>

            <div className="col-md-2">
              <table className="rune-panel optimal-runes text-center">
                  <thead className="tree-icon text-center">
                      <th></th>
                      <th><img src={require('../img/perkStyle/8100.png')} /></th>
                  </thead>
                  <tbody>
                    <tr className="keystones">
                      <td className="active-keystone"><img src={require('../img/perk/8112.png')} /></td>
                      <td><img src={require('../img/perk/8124.png')} /></td>
                      <td><img src={require('../img/perk/8128.png')} /></td>
                    </tr>
                    <tr className="rune-row">
                      <td><img src={require('../img/perk/8126.png')} /></td>
                      <td className="active-rune"><img src={require('../img/perk/8139.png')} /></td>
                      <td><img src={require('../img/perk/8143.png')} /></td>
                    </tr>
                    <tr className="rune-row">
                      <td><img src={require('../img/perk/8136.png')} /></td>
                      <td><img src={require('../img/perk/8120.png')} /></td>
                      <td className="active-rune"><img src={require('../img/perk/8138.png')} /></td>
                    </tr>
                    <tr className="rune-row">
                      <td><img src={require('../img/perk/8135.png')} /></td>
                      <td><img src={require('../img/perk/8134.png')} /></td>
                      <td className="active-rune"><img src={require('../img/perk/8105.png')} /></td>
                    </tr>
                  </tbody>
              </table>
            </div>

            <div className="col-md-2">
              <table className="rune-panel optimal-runes text-center secondary-tree">
                  <thead className="tree-icon text-center">
                      <th></th>
                      <th><img src={require('../img/perkStyle/8100.png')} /></th>
                  </thead>
                  <tbody>
                    <tr className="keystones">
                      <td className="active-keystone"><img src={require('../img/perk/8112.png')} /></td>
                      <td><img src={require('../img/perk/8124.png')} /></td>
                      <td><img src={require('../img/perk/8128.png')} /></td>
                    </tr>
                    <tr className="rune-row">
                      <td><img src={require('../img/perk/8126.png')} /></td>
                      <td className="active-rune"><img src={require('../img/perk/8139.png')} /></td>
                      <td><img src={require('../img/perk/8143.png')} /></td>
                    </tr>
                    <tr className="rune-row">
                      <td><img src={require('../img/perk/8136.png')} /></td>
                      <td><img src={require('../img/perk/8120.png')} /></td>
                      <td className="active-rune"><img src={require('../img/perk/8138.png')} /></td>
                    </tr>
                    <tr className="rune-row">
                      <td><img src={require('../img/perk/8135.png')}/></td>
                      <td><img src={require('../img/perk/8134.png')}/></td>
                      <td className="active-rune"><img src={require('../img/perk/8105.png')}/></td>
                    </tr>
                  </tbody>
              </table>
            </div>

            </div>
          </div>
        );
    }
});

var MatchResults = React.createClass({
  render: function() {
    var WinClass;

    if(this.props.match.win){
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
        <div className="rune-rating col-md-3">
          Hi! I am Radar
        </div>
      </div>
    )
  }
})

var RunePanel = React.createClass({

  handleChildClick: function(childData,event) {
         this.setState({data: childData.childText});
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
    console.log("Chosen runes: ")
    console.log(this.props.chosen);
    console.log(this.props.runeId);
    console.log(this.props.chosen.includes(this.props.runeId));
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

ReactDOM.render(<h1>{SummonerName}</h1>, document.getElementById('summonerNameHeading'));
ReactDOM.render(<MatchPanel />, document.getElementById('test'));
