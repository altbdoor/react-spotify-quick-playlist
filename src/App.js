import React, { Component } from 'react'
import {
    HashRouter,
    Route,
    Switch,
    Redirect,
} from 'react-router-dom'

import * as SpotifyWebApi from 'spotify-web-api-js'

import AuthContainer from './modules/AuthContainer'
import PlaylistContainer from './modules/PlaylistContainer'


class App extends Component {
    spotifyClientID = 'c9f614b01e0c4cc09f5539f0fd695a60'
    spotifyService = new SpotifyWebApi()

    constructor(props) {
        super(props)

        this.setAccessToken = this.setAccessToken.bind(this)

        const token = localStorage.getItem('token')
        if (token) {
            this.spotifyService.setAccessToken(token)
        }
    }

    render() {
        const InjectedAuthContainer = (props) => {
            return (
                <AuthContainer clientID={this.spotifyClientID}
                    setAccessToken={this.setAccessToken}
                    {...props} />
            )
        }

        const InjectedPlaylistContainer = (props) => {
            return (
                <PlaylistContainer spotify={this.spotifyService}
                    {...props} />
            )
        }

        return (
            <HashRouter>
                <Switch>
                    <Route path="/auth/:error?" render={InjectedAuthContainer} />
                    <Route path="/playlist/list/:page?" render={InjectedPlaylistContainer} />
                    <Redirect to="/auth" />
                </Switch>
            </HashRouter>
        )
    }

    // =====

    setAccessToken(token) {
        this.spotifyService.setAccessToken(token)
        localStorage.setItem('token', token)
    }

}

export default App
