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
    spotifyService = null

    constructor(props) {
        super(props)

        SpotifyWebApi.prototype.lazyGetId = function () {
            const promise = new Promise((resolve, reject) => {
                if (!this.__userId) {
                    this.getMe().then((data) => {
                        this.__userId = data.id
                        resolve(this.__userId)
                    })
                }
                else {
                    resolve(this.__userId)
                }
            })

            return promise
        }
        this.spotifyService = new SpotifyWebApi()

        this.setAccessToken = this.setAccessToken.bind(this)

        const token = localStorage.getItem('debugtoken')
        if (token) {
            this.spotifyService.setAccessToken(token)
        }

        // this.spotifyService.lazyGetId().then((x) => { console.log('before', x) })
        // setTimeout(() => {
        //     this.spotifyService.lazyGetId().then((x) => { console.log('after', x) })
        // }, 1000)

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
                    <Route path="/playlist" render={InjectedPlaylistContainer} />
                    <Redirect to="/auth" />
                </Switch>
            </HashRouter>
        )
    }

    // =====

    setAccessToken(token) {
        this.spotifyService.setAccessToken(token)
        localStorage.setItem('debugtoken', token)
    }

}

export default App
