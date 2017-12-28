import React, { Component } from 'react';
var ReactDOM = require('react-dom')
import Slider from 'react-slick';

var RuneInfo = require('./runeInfo.js')
import Gauge from 'react-svg-gauge';

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
  "r3" : [8014, 8017, 8299]
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
    var that = this;

    var sliderSettings = {
      customPaging: function(i) {
        return <a><img className="img-fluid" src={require(`../img/champion/${that.state.data[i].champion}.png`)}/></a>
      },
      dots: true,
      slidesToShow: 1,
      slidesToScroll: 1,
      lazyLoad: true
    };

    var that = this;
    var MatchPanels = this.state.data.map(function(Match, i) {
        return (<div><MatchPanel matchId={that.state.data[i].gameId} /></div>);
    });
    return (
        <div>
          <Slider {...sliderSettings}>
            {MatchPanels}
          </Slider>
        </div>
    )
  }
});


var MatchPanel = React.createClass({
    getInitialState: function() {
        this.state = {}
        this.state.OptimalRunes = null
        this.state.MatchResponse = null

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

    componentDidMount: function() {

        var that = this;
        $.ajax({
            url: '/api/match/',
            type: 'post',
            async: false,
            data: {
                'region' : Region,
                'matchId' : that.props.matchId,
                'accountId' : AccountID
            },
            success : function(response){
              that.state.MatchResponse = response;
            },
            error : function(response){
            }
        })

        $.ajax({
            url: '/api/rune/opt/',
            type: 'post',
            async: false,
            data: {
                "champion" : that.state.MatchResponse.championName,
                "role" : that.state.MatchResponse.lane.toLowerCase(),
            },
            success : function(response){
              that.state.OptimalRunes = response;
            },
            error : function(response){
            }
        })

        this.forceUpdate()
    },

    render: function () {

        var ret = <div></div>

        if (this.state.MatchResponse && this.state.OptimalRunes) {
            var PlayerPrimaryTree = this.selectTree(this.state.MatchResponse.runes.primary.id);
            var PlayerSecondaryTree = this.selectTree(this.state.MatchResponse.runes.secondary.id);

            var OptimalPrimaryTreePanel;
            var OptimalSecondaryTreePanel;
            console.log(this.state.OptimalRunes);
            if(!isEmpty(this.state.OptimalRunes)){
              console.log("inner optimal rune");
              console.log(this.state.OptimalRunes);
              var OptimalPrimaryTree = this.selectTree(this.state.OptimalRunes.primary.id);
              OptimalPrimaryTreePanel = (<RunePanel handler={this.handler} runetype="optimal-runes" runes={OptimalPrimaryTree} chosen={this.state.OptimalRunes.primary.runes}/>);

              var OptimalSecondaryTree = this.selectTree(this.state.OptimalRunes.secondary.id);
              OptimalSecondaryTreePanel = (<RunePanel handler={this.handler} runetype="optimal-runes secondary-tree" runes={OptimalSecondaryTree} chosen={this.state.OptimalRunes.secondary.runes}/>);
            }
            else{
              OptimalPrimaryTreePanel = (<div className="rune-panel text-center"><h2>No optimal runes available in this role</h2></div>);
              OptimalSecondaryTreePanel = (<div className="rune-panel text-center"><h2>No optimal runes available in this role</h2></div>);
            }

            ret = (
                <div className="row profile match-panel table-responsive">
                  <MatchResults match={this.state.MatchResponse}/>
                  <div className="row">
                     <div className="col-md-4">
			            <div className="row">
                            <div className="col-md-6">
                              <RunePanel handler={this.handler} runetype="player-runes" runes={PlayerPrimaryTree} chosen={this.state.MatchResponse.runes.primary.runes}/>
                            </div>

                              <div className="col-md-6">
                                <RunePanel handler={this.handler} runetype="player-runes secondary-tree" runes={PlayerSecondaryTree} chosen={this.state.MatchResponse.runes.secondary.runes}/>
                              </div>
                        </div>
                     </div>

                    <div className="col-md-4">
                        <RuneInfo rune={this.state.rune} championAttributes={this.state.MatchResponse.championAttributes}/>
                    </div>

                     <div className="col-md-4">
			            <div className="row">
                            <div className="col-md-6">
                                {OptimalPrimaryTreePanel}
                            </div>

                            <div className="col-md-6">
                              {OptimalSecondaryTreePanel}
                            </div>
                        </div>
                     </div>
                </div>
              </div>
            );
        }
        return ret
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
    var TreeIsSecondary = this.isSecondary();
    return (
    <div>

    <table className={"rune-panel text-center " + this.props.runetype}>
        <thead className="tree-icon text-center">
            <th></th>
            <th><img className="img-responsive img-fluid" src={require(`../img/perkStyle/${this.props.runes.treeIcon}.png`)}/></th>
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
    </div>
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
    return (<td className={ActiveRune}><img className="img-responsive img-fluid" id={this.props.runeid} onClick={this.props.onClick} src={require(`../img/perk/${this.props.runeId}.png`)} /></td>);
  }
})

var MatchResults = React.createClass({
  render: function() {
    var WinClass;

     // Gauge options
     var color;
     if(this.props.match.runes.rating >= 0 && this.props.match.runes.rating < 33){
        color = "Red";
     }
     else if(this.props.match.runes.rating >= 33 && this.props.match.runes.rating < 66){
      color = "Orange";
     }
     else{
      color = "LawnGreen";
     }

    if(this.props.match.win == "true"){
      WinClass = "row profile-sidebar victory";
    }
    else{
      WinClass = "row profile-sidebar defeat";
    }
    
    const ValueStyle = {color: color};

    return (
        <div className="row">
            <div className="col-md-4 rune-rating">
                <div className="profile-usertitle-name">Rune Rating: </div>
                <Gauge value={this.props.match.runes.rating} width={200} height={100} label="" color={color} valueLabelStyle={ValueStyle} minMaxLabelStyle={{display: 'none'}}/>
            </div>
            <div className="col-md-8">
                <div className={WinClass}>
                    <div className="col-md-2">
                        <div className="text-center profile-usertitle-time">
                          {this.props.match.gameDate}
                        </div>
                        <div className="text-center profile-usertitle-mode">
                            {this.props.match.gameMode}
                        </div>
                        <div className="text-center profile-usertitle-duration">
                            {this.props.match.gameDuration}
                        </div>
                    </div>
                    <div className="col-md-6">
                        <div className="row">
                            <div className="col-md-8">
                                <div className="row">
                                    <div className="col-md-6 profile-userpic ">
                                      <img src={require(`../img/champion/${this.props.match.champion}.png`)} className="img-responsive" alt="" />
                                    </div>
                                    <div className="col-md-6 profile-usertitle">
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
                                </div>
                            </div>
                            <div className="col-md-4 profile-summ-spells ">
                              <img className="spell img-fluid" src={require(`../img/summoner/${this.props.match.spell1}.png`)} alt="" />
                              <img className="spell img-fluid" src={require(`../img/summoner/${this.props.match.spell2}.png`)} alt="" />
				            </div>
                        </div>
                    </div>
                    <div className="col-md-4">
                        Other Players (2x5 table)
                    </div>

                  </div>
            </div>
        </div>
    )
  }
})


ReactDOM.render(<h1>{SummonerName}</h1>, document.getElementById('summonerNameHeading'));
ReactDOM.render(<MatchHistory />, document.getElementById('matchHistory'));
