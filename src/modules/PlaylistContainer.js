import React, { Component } from 'react'
import {
    Route,
    Switch,
    withRouter
} from 'react-router-dom'

import PlaylistList from './PlaylistList'
import PlaylistEdit from './PlaylistEdit'


class PlaylistContainer extends Component {
    render() {
        const InjectedPlaylistList = (props) => {
            return (
                <PlaylistList spotify={this.props.spotify}
                    {...props} />
            )
        }
        const InjectedPlaylistEdit = (props) => {
            return (
                <PlaylistEdit spotify={this.props.spotify}
                    {...props} />
            )
        }
        const TestStuff = (props) => {
            return (
                <div>TestStuff</div>
            )
        }

        return (
            <div className="mw7 pa2 center">
                <Switch>
                    <Route exact path="/playlist/list/:page" render={InjectedPlaylistList} />
                    <Route exact path="/playlist/edit/:playlistId" render={InjectedPlaylistEdit} />
                    <Route path="/playlist/test" render={TestStuff} />
                </Switch>
            </div>
        )
    }

}


export default withRouter(PlaylistContainer)
