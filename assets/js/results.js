var React = require('react')
var ReactDOM = require('react-dom')

// TODO: Create Match History Object

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
    render: function () {
        return (
            <div className="row profile match-panel table-responsive">
              <MatchResults match={MatchResponse}/>
              <div className="row">
                <div className="col-md-2">

                  <table className="rune-panel player-runes text-center">
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
                <table className="rune-panel player-runes text-center secondary-tree">
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

              <div className="col-md-4">
                <table className="rune-panel rune-description">
                    <thead>
                        <th className="chosen-rune"><img src={require('../img/perk/8112.png')} /></th>
                    </thead>
                    <tbody>
                    <tr className="chosen-rune-name">
                        <td>
                            Electrocute
                        </td>
                    </tr>
                    <tr>
                        <td>
                            <p className="optimal-roles-title">Optimal roles:</p> 
                            <p className="optimal-roles">Assassin, Mage </p>
                        </td>
                    </tr>
                    <tr className="rune-description-text">
                        <td>
                            Hello I am a rune description, I will go here
                        </td>
                    </tr>
                    </tbody>
                </table>
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
  render() {
    return (
      <div className="row profile-sidebar">
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

ReactDOM.render(<MatchPanel />, document.getElementById('test'))
