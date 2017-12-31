import React, { Component } from 'react';
var ReactDOM = require('react-dom')
import Slider from 'react-slick';

var RuneInfo = require('./runeInfo.js')
var ArcGauge = require('./gauge.js');
import Modal from 'react-modal';
import Select from 'react-select';

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

const SummonerName = decodeURIComponent(getAllUrlParams().name);
const AccountID = decodeURIComponent(getAllUrlParams().accountId);
const Region = decodeURIComponent(getAllUrlParams().region);

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
    this.next = this.next.bind(this)
    this.previous = this.previous.bind(this)

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
  next() {
    this.slider.slickNext()
  },
  previous() {
    this.slider.slickPrev()
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
          <Slider ref={c => this.slider = c } {...sliderSettings}>
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
                     <div className="col-md-4 text-center">
                         <div className="row">
                             <div className="col-md-12 text-center">
                                <h2 className="runeHeading">Player Runes</h2>
                             </div>
                         </div>
			            <div className="row">
                            <div className="col-md-6 text-center centerItem">
                              <RunePanel handler={this.handler} runetype="player-runes" runes={PlayerPrimaryTree} chosen={this.state.MatchResponse.runes.primary.runes}/>
                            </div>

                              <div className="col-md-6 text-center centerItem">
                                <RunePanel handler={this.handler} runetype="player-runes secondary-tree" runes={PlayerSecondaryTree} chosen={this.state.MatchResponse.runes.secondary.runes}/>
                            </div>
                        </div>
                     </div>

                    <div className="col-md-4">
                        <RuneInfo rune={this.state.rune} championAttributes={this.state.MatchResponse.championAttributes}/>
                    </div>

                     <div className="col-md-4 text-center">
                         <div className="row">
                             <div className="col-md-12 text-center">
                                <h2 className="runeHeading">Optimal Runes</h2>
                             </div>
                         </div>
			            <div className="row">
                            <div className="col-md-6 text-center centerItem">
                                {OptimalPrimaryTreePanel}
                            </div>

                            <div className="col-md-6 text-center centerItem">
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

var donutBaseData = {
    labels: [],
    datasets: [{
        data: [],
        backgroundColor: [
        'rgba(255,99,132,1)',
        'rgba(28, 122, 216, 1)'
        ],
        hoverBackgroundColor: [
        'rgba(255,99,132,1)',
        'rgba(28, 122, 216, 1)'
        ]
    }]
}

//UNUSED - Maybe in the future?
var RunePanelInfo = React.createClass({

  render : function(){
    var spellData = Object.assign({}, donutBaseData);
    spellData['datasets'][0]['data'] = [(this.props.spell.toFixed(0)), (100 - this.props.spell.toFixed(0))]
    spellData['labels'] = ['Spells', 'Auto Attacks']

    var damageData = Object.assign({}, donutBaseData);
    damageData['datasets'][0]['data'] = [(this.props.damage.toFixed(0)), (100 - this.props.damage.toFixed(0))]
    damageData['labels'] = ['Magic Damage', 'Physical Damage']

    return (
    <div>
        <div className="row">
            <div className="col-md-6">
                <h2>Page Spell Style</h2>
                <Donut data={spellData} />
            </div>

            <div className="col-md-6">
                <h2>Page Damage Style</h2>
                <Donut data={damageData} />
            </div>
        </div>
    </div>
    )
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

    <table className={"rune-panel text-center mx-auto " + this.props.runetype}>
        <thead className="tree-icon text-center">
            <th></th>
            <th><img className="img-responsive img-fluid" src={require(`../img/perkStyle/${this.props.runes.treeIcon}.png`)}/></th>
            <th></th>
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

                <section className={'gauge mx-auto'}>
                  <ArcGauge value={this.props.match.runes.rating}
                            size={15}
                            width={160}
                            radius={80}
                            sections={["#e84528", "#e84528", "#e84528", "#ffb74d", "#8cc152", "#8cc152"]}
                            arrow={{height: 75, width: 6, color: "#000"}}
                            label={" "}
                            legend={[' ', ' ', ' ', ' ', ' ', ' ']}/>
                </section>
            </div>
            <div className="col-md-8">
                <div className={WinClass}>
                    <div className="col-md-2">
                        <div className="text-center profile-usertitle-time">
                          {this.props.match.gameDate}
                        </div>
                        <div className="text-center profile-usertitle-mode">
                            {this.props.match.gameType}
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
                                      <img src={require(`../img/champion/${this.props.match.champion}.png`)} className="img-responsive img-fluid" alt="" />
                                    </div>
                                    <div className="col-md-6 profile-usertitle">
                                        <div className="profile-usertitle-name">
                                            {this.props.match.displayName}
                                          </div>
                                          <div className="profile-usertitle-job">
                                            {(this.props.match.map == "Summoner's Rift") ? this.props.match.lane : ''}
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
                      <MatchPlayers match={this.props.match.players} />
                    </div>

                  </div>
            </div>
        </div>
    )
  }
})

var MatchPlayers = React.createClass({
  render : function(){
    return (
    <table className="other-players table-responsive">
        <tbody>
          <tr>
            <td className={this.props.match.team1[0].summonerName == SummonerName ? "player-name team1 this-player" : "player-name team1"}><a href={"/results/?accountId=" + this.props.match.team1[0].accountId +  "&name=" + this.props.match.team1[0].summonerName + "&region=" + this.props.match.team1[0].platformId}>
              {this.props.match.team1[0].summonerName}</a>
            </td>
            <td ><img src={require(`../img/champion/${this.props.match.team1[0].championId}.png`)} className="img-responsive img-fluid player-images" alt="" /></td>
            <td ><img src={require(`../img/champion/${this.props.match.team2[0].championId}.png`)} className="img-responsive img-fluid player-images" alt="" /></td>
            <td className={this.props.match.team2[0].summonerName == SummonerName ? "player-name team1 this-player" : "player-name team1"}><a href={"/results/?accountId=" + this.props.match.team2[0].accountId +  "&name=" + this.props.match.team2[0].summonerName + "&region=" + this.props.match.team2[0].platformId}>
              {this.props.match.team2[0].summonerName}</a></td>
          </tr>
          <tr>
            <td className={this.props.match.team1[1].summonerName == SummonerName ? "player-name team1 this-player" : "player-name team1"}><a href={"/results/?accountId=" + this.props.match.team1[1].accountId +  "&name=" + this.props.match.team1[1].summonerName + "&region=" + this.props.match.team1[1].platformId}>
              {this.props.match.team1[1].summonerName}</a></td>
            <td ><img src={require(`../img/champion/${this.props.match.team1[1].championId}.png`)} className="img-responsive img-fluid player-images" alt="" /></td>
            <td ><img src={require(`../img/champion/${this.props.match.team2[1].championId}.png`)} className="img-responsive img-fluid player-images" alt="" /></td>
            <td className={this.props.match.team2[1].summonerName == SummonerName ? "player-name team1 this-player" : "player-name team1"}><a href={"/results/?accountId=" + this.props.match.team2[1].accountId +  "&name=" + this.props.match.team2[1].summonerName + "&region=" + this.props.match.team2[1].platformId}>
              {this.props.match.team2[1].summonerName}</a></td>
          </tr>
          <tr>
            <td className={this.props.match.team1[2].summonerName == SummonerName ? "player-name team1 this-player" : "player-name team1"}><a href={"/results/?accountId=" + this.props.match.team1[2].accountId +  "&name=" + this.props.match.team1[2].summonerName + "&region=" + this.props.match.team1[2].platformId}>
              {this.props.match.team1[2].summonerName}</a></td>
            <td ><img src={require(`../img/champion/${this.props.match.team1[2].championId}.png`)} className="img-responsive img-fluid player-images" alt="" /></td>
            <td ><img src={require(`../img/champion/${this.props.match.team2[2].championId}.png`)} className="img-responsive img-fluid player-images" alt="" /></td>
            <td className={this.props.match.team2[2].summonerName == SummonerName ? "player-name team1 this-player" : "player-name team1"}><a href={"/results/?accountId=" + this.props.match.team2[2].accountId +  "&name=" + this.props.match.team2[2].summonerName + "&region=" + this.props.match.team2[2].platformId}>
              {this.props.match.team2[2].summonerName}</a></td>
          </tr>
          <tr>
            <td className={this.props.match.team1[3].summonerName == SummonerName ? "player-name team1 this-player" : "player-name team1"}><a href={"/results/?accountId=" + this.props.match.team1[3].accountId +  "&name=" + this.props.match.team1[3].summonerName + "&region=" + this.props.match.team1[3].platformId}>
              {this.props.match.team1[3].summonerName}</a></td>
            <td ><img src={require(`../img/champion/${this.props.match.team1[3].championId}.png`)} className="img-responsive img-fluid player-images" alt="" /></td>
            <td ><img src={require(`../img/champion/${this.props.match.team2[3].championId}.png`)} className="img-responsive img-fluid player-images" alt="" /></td>
            <td className={this.props.match.team2[3].summonerName == SummonerName ? "player-name team1 this-player" : "player-name team1"}><a href={"/results/?accountId=" + this.props.match.team2[3].accountId +  "&name=" + this.props.match.team2[3].summonerName + "&region=" + this.props.match.team2[3].platformId}>
              {this.props.match.team2[3].summonerName}</a></td>
          </tr>
          <tr>
            <td className={this.props.match.team1[4].summonerName == SummonerName ? "player-name team1 this-player" : "player-name team1"}><a href={"/results/?accountId=" + this.props.match.team1[4].accountId +  "&name=" + this.props.match.team1[4].summonerName + "&region=" + this.props.match.team1[4].platformId}>
              {this.props.match.team1[4].summonerName}</a></td>
            <td ><img src={require(`../img/champion/${this.props.match.team1[4].championId}.png`)} className="img-responsive img-fluid player-images" alt="" /></td>
            <td ><img src={require(`../img/champion/${this.props.match.team2[4].championId}.png`)} className="img-responsive img-fluid player-images" alt="" /></td>
            <td className={this.props.match.team2[4].summonerName == SummonerName ? "player-name team1 this-player" : "player-name team1"}><a href={"/results/?accountId=" + this.props.match.team2[4].accountId +  "&name=" + this.props.match.team2[4].summonerName + "&region=" + this.props.match.team2[4].platformId}>
              {this.props.match.team2[4].summonerName}</a></td>
          </tr>
        </tbody>
    </table>
    )
  }
})


var RuneBrowserPanel = React.createClass({
    getInitialState: function() {
        this.state = {}
        this.state.show = false
        this.state.champ = ''
        var that = this;
        $.ajax({
            url: '/api/champions/',
            type: 'get',
            async: false,
            success : function(response){
              that.state.champs = response['champions'];
            },
            error : function(response){
            }
        })

        return this.state
    },
    handleClick(champ) {
       this.setState({
          champ: champ,
          show: true
        });
    },
    render: function() {
        var groupSize = 6;
        var that = this;
        var rows = this.state.champs.map(function(item, index) {
            // map content to html elements
        return (
            <div className="col-md-2" onClick={() => that.handleClick(item)}>
                <div>
                    <img src={require(`../img/champion/${item['id']}.png`)} className="img-fluid" alt="" style={{ cursor: 'pointer' }}/>
                </div>
                <div style={{color: 'white'}}>
                    {item['name']}
                </div>
            </div>);
        }).reduce(function(r, element, index) {
            // create element groups with size 3, result looks like:
            // [[elem1, elem2, elem3], [elem4, elem5, elem6], ...]
            index % groupSize === 0 && r.push([]);
            r[r.length - 1].push(element);
            return r;
        }, []).map(function(rowContent) {
            // surround every group with 'row'
            return <div className="row" style={{paddingTop: '10px'}}>{rowContent}</div>;
        });
        return (<div className="container">
                <div className="row">
                    <Trigger modal={this.state.show} champion={this.state.champ}/>
                    <div className="col-md-2">
                    </div>
                    <div className="col-md-8" style={{top:'10px'}}>
                        {rows}
                    </div>
                    <div className="col-md-2">
                    </div>
                </div>
            </div>);
    }
});

var Trigger = React.createClass({
    getInitialState: function() {
        this.state = { show: this.props.modal };
        this.state.runeList = null
        this.state.selectValue = ''
        this.state.rune = -1
        return this.state
    },
    handler(runeId) {
        this.setState({
          rune: runeId
        })
    },
    selectTree : function(treeid){ //TODO this is copy and pasted from match panel
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

    setStateResponse(response){
        let roleList = [];
        let runeList = {};
        for (var i = 0; i < response.length; i++) {
          roleList.push(response[i]['role'])
          runeList[response[i]['role']] = response[i]['runes']
        }

        let options = [];
        roleList.map(item =>
          options.push({ label: item, value: item }),
        );

        this.setState({
            selectValue: roleList[0],
            options : options,
            runeList: runeList,
            playerPrimaryTree: this.selectTree(runeList[roleList[0]].primary.id),
            playerSecondaryTree: this.selectTree(runeList[roleList[0]].secondary.id)
        });

    },
    setupModal(nextProps, response){
        this.setStateResponse(response.roles)
        this.setState({show: nextProps.modal})
    },
    componentWillReceiveProps(nextProps){
    	if(this.state.show!==nextProps.modal){
            fetch('/api/rune/champion/', {
                method: 'post',
                headers: {'Content-Type':'application/json'},
                body: JSON.stringify({'champion':nextProps.champion.key})})
                .then((response) => response.json())
                .then((response) => this.setupModal(nextProps, response));
      }
    },

    closeModal() {
      this.setState({
            show: false,
            runeList : null,
            selectValue : '',
            rune : -1});
    },
    handleRoleChange(selectedOption){
        this.setState({
            selectValue: selectedOption.value,
            playerPrimaryTree: this.selectTree(this.state.runeList[selectedOption.value].primary.id),
            playerSecondaryTree: this.selectTree(this.state.runeList[selectedOption.value].secondary.id)});
        this.forceUpdate()
    },
    render(){
        var ret = <div></div>
        if (this.state.runeList) {

            let close = () => this.setState({show: false});
            ret = (
                <div className="modal modal-container">
                    <Modal
                        isOpen={this.state.show}
                        onRequestClose={this.closeModal}
                        style={{
                            overlay: {
                                position: 'fixed',
                                top: 0,
                                left: 0,
                                right: 0,
                                bottom: 0,
                            },
                            content: {
                                position: 'absolute',
                                top: '100px',
                                left: '40px',
                                right: '40px',
                                bottom: '40px',
                                border: '1px solid #ccc',
                                background: '#fff',
                                overflow: 'auto',
                                WebkitOverflowScrolling: 'touch',
                                borderRadius: '4px',
                                outline: 'none',
                                padding: '20px',
                                backgroundImage: "url('../static/img/bg-results.png')",
                                opacity: 0.95

                            }
                        }}
                        contentLabel="Modal">

                        <div className="row">
                            <div className="col-md-4 "></div>
                            <div className="col-md-3 text-center centerItem" style={{backgroundColor:'rgba(0,0,0,0.25)', borderRadius: '25px'}}>
                                <div className="row">
                                    <div className="col-md-6 ">
                                        <div style={{color: 'white', fontSize: '24px'}}>{this.props.champion.name}</div>
                                    </div>
                                    <div className="col-md-5 ">
                                        <Select
                                            value={this.state.selectValue}
                                            onChange={this.handleRoleChange}
                                            options={this.state.options}
                                            style={{width: '150px'}}/>
                                    </div>
                                </div>
                            </div>
                            <div className="col-md-7">
                                <button className="btn btn-default" style={{float: 'right'}} onClick={this.closeModal}>Close</button>
                            </div>
                        </div>

                        <div className="row" style={{paddingTop: '20px'}}>
                            <div className="col-md-1 "></div>
                            <div className="col-md-4 text-center centerItem">
                                <div className="row">
                                    <div className="col-md-6 text-center centerItem">
                                        <RunePanel handler={this.handler} runetype="player-runes"
                                                   runes={this.state.playerPrimaryTree}
                                                   chosen={this.state.runeList[this.state.selectValue].primary.runes}/>
                                    </div>

                                    <div className="col-md-6 text-center centerItem">
                                        <RunePanel handler={this.handler} runetype="player-runes secondary-tree"
                                                   runes={this.state.playerSecondaryTree}
                                                   chosen={this.state.runeList[this.state.selectValue].secondary.runes}/>
                                    </div>
                                </div>
                            </div>
                            <div className="col-md-1 "></div>
                            <div className="col-md-4">
                                <RuneInfo rune={this.state.rune}/>
                            </div>
                            <div className="col-md-2 "></div>
                        </div>
                    </Modal>
                </div>);
        }
        return ret;
    }
});

if(document.getElementById('summonerNameHeading')) {
    ReactDOM.render(<h1>{SummonerName}</h1>, document.getElementById('summonerNameHeading'));
    ReactDOM.render(<MatchHistory />, document.getElementById('matchHistory'));
}
if(document.getElementById('runeBrowserPanel')) {
    ReactDOM.render(<RuneBrowserPanel/>, document.getElementById('runeBrowserPanel'));
}
