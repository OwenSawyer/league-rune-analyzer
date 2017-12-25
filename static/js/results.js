var React = require('react')
var ReactDOM = require('react-dom')

// TODO: Create Match History Object

var MatchPanel = React.createClass({
    render: function () {
        return (
            <div className="row profile match-panel table-responsive">

                <div className="row profile-sidebar">
                    <div className="text-center col-md-2 profile-usertitle-time">
                      DD/MM/YYYY
                    </div>
                    <div className="profile-userpic col-md-2">
                      <img src="{% static 'img/MfIcon.png' %}" className="img-responsive" alt="" />
                    </div>
                    <div className="col-md-3 profile-usertitle">
                        <div className="profile-usertitle-name">
                            Miss Fortune
                          </div>
                          <div className="profile-usertitle-job">
                            ADC
                          </div>
                          <div className="profile-usertitle-kda">
                            15/0/1
                          </div>
                    </div>
                    <div className="profile-summ-spells col-md-2">
                      <img className="spell" src="{% static 'img/flash-icon.jpg' %}" className="img-responsive" alt="" />
                      <img className="spell" src="{% static 'img/flash-icon.jpg' %}" className="img-responsive" alt="" />
                    </div>
                    <div className="rune-rating col-md-3">
                      Hi! I am Radar
                    </div>
              </div>

              <div className="row">
                <div className="col-md-2">

                  <table className="rune-panel player-runes text-center">
                    <thead className="tree-icon text-center">
                        <th></th>
                        <th><img src="{% static 'img/perkStyle/8100.png' %}" /></th>
                    </thead>
                    <tbody>
                      <tr className="keystones">
                        <td className="active-keystone"><img src="{% static 'img/perk/8112.png' %}" /></td>
                        <td><img src="{% static 'img/perk/8124.png' %}" /></td>
                        <td><img src="{% static 'img/perk/8128.png' %}" /></td>
                      </tr>
                      <tr className="rune-row">
                        <td><img src="{% static 'img/perk/8126.png' %}" /></td>
                        <td className="active-rune"><img src="{% static 'img/perk/8139.png' %}" /></td>
                        <td><img src="{% static 'img/perk/8143.png' %}" /></td>
                      </tr>
                      <tr className="rune-row">
                        <td><img src="{% static 'img/perk/8136.png' %}" /></td>
                        <td><img src="{% static 'img/perk/8120.png' %}" /></td>
                        <td className="active-rune"><img src="{% static 'img/perk/8138.png' %}" /></td>
                      </tr>
                      <tr className="rune-row">
                        <td><img src="{% static 'img/perk/8135.png' %}" /></td>
                        <td><img src="{% static 'img/perk/8134.png' %}" /></td>
                        <td className="active-rune"><img src="{% static 'img/perk/8105.png' %}" /></td>
                      </tr>
                    </tbody>
                </table>
                
              </div>

              <div className="col-md-2">
                <table className="rune-panel player-runes text-center secondary-tree">
                    <thead className="tree-icon text-center">
                        <th></th>
                        <th><img src="{% static 'img/perkStyle/8100.png' %}" /></th>
                    </thead>
                    <tbody>
                      <tr className="keystones">
                        <td className="active-keystone"><img src="{% static 'img/perk/8112.png' %}" /></td>
                        <td><img src="{% static 'img/perk/8124.png' %}" /></td>
                        <td><img src="{% static 'img/perk/8128.png' %}" /></td>
                      </tr>
                      <tr className="rune-row">
                        <td><img src="{% static 'img/perk/8126.png' %}" /></td>
                        <td className="active-rune"><img src="{% static 'img/perk/8139.png' %}" /></td>
                        <td><img src="{% static 'img/perk/8143.png' %}" /></td>
                      </tr>
                      <tr className="rune-row">
                        <td><img src="{% static 'img/perk/8136.png' %}" /></td>
                        <td><img src="{% static 'img/perk/8120.png' %}" /></td>
                        <td className="active-rune"><img src="{% static 'img/perk/8138.png' %}" /></td>
                      </tr>
                      <tr className="rune-row">
                        <td><img src="{% static 'img/perk/8135.png' %}" /></td>
                        <td><img src="{% static 'img/perk/8134.png' %}" /></td>
                        <td className="active-rune"><img src="{% static 'img/perk/8105.png' %}" /></td>
                      </tr>
                    </tbody>
                </table>
              </div>

              <div className="col-md-4">
                <table className="rune-panel rune-description">
                    <thead>
                        <th className="chosen-rune"><img src="{% static 'img/perk/8112.png' %}" /></th>
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
                      <th><img src="{% static 'img/perkStyle/8100.png' %}" /></th>
                  </thead>
                  <tbody>
                    <tr className="keystones">
                      <td className="active-keystone"><img src="{% static 'img/perk/8112.png' %}" /></td>
                      <td><img src="{% static 'img/perk/8124.png' %}" /></td>
                      <td><img src="{% static 'img/perk/8128.png' %}" /></td>
                    </tr>
                    <tr className="rune-row">
                      <td><img src="{% static 'img/perk/8126.png' %}" /></td>
                      <td className="active-rune"><img src="{% static 'img/perk/8139.png' %}" /></td>
                      <td><img src="{% static 'img/perk/8143.png' %}" /></td>
                    </tr>
                    <tr className="rune-row">
                      <td><img src="{% static 'img/perk/8136.png' %}" /></td>
                      <td><img src="{% static 'img/perk/8120.png' %}" /></td>
                      <td className="active-rune"><img src="{% static 'img/perk/8138.png' %}" /></td>
                    </tr>
                    <tr className="rune-row">
                      <td><img src="{% static 'img/perk/8135.png' %}" /></td>
                      <td><img src="{% static 'img/perk/8134.png' %}" /></td>
                      <td className="active-rune"><img src="{% static 'img/perk/8105.png' %}" /></td>
                    </tr>
                  </tbody>
              </table>
            </div>

            <div className="col-md-2">
              <table className="rune-panel optimal-runes text-center secondary-tree">
                  <thead className="tree-icon text-center">
                      <th></th>
                      <th><img src="{% static 'img/perkStyle/8100.png' %}" /></th>
                  </thead>
                  <tbody>
                    <tr className="keystones">
                      <td className="active-keystone"><img src="{% static 'img/perk/8112.png' %}" /></td>
                      <td><img src="{% static 'img/perk/8124.png' %}" /></td>
                      <td><img src="{% static 'img/perk/8128.png' %}" /></td>
                    </tr>
                    <tr className="rune-row">
                      <td><img src="{% static 'img/perk/8126.png' %}" /></td>
                      <td className="active-rune"><img src="{% static 'img/perk/8139.png' %}" /></td>
                      <td><img src="{% static 'img/perk/8143.png' %}" /></td>
                    </tr>
                    <tr className="rune-row">
                      <td><img src="{% static 'img/perk/8136.png' %}" /></td>
                      <td><img src="{% static 'img/perk/8120.png' %}" /></td>
                      <td className="active-rune"><img src="{% static 'img/perk/8138.png' %}" /></td>
                    </tr>
                    <tr className="rune-row">
                      <td><img src="{% static 'img/perk/8135.png' %}"/></td>
                      <td><img src="{% static 'img/perk/8134.png' %}"/></td>
                      <td className="active-rune"><img src="{% static 'img/perk/8105.png' %}"/></td>
                    </tr>
                  </tbody>
              </table>
            </div>

            </div>
          </div>
        );
    }
});

ReactDOM.render(<MatchPanel />, document.getElementById('test'))
