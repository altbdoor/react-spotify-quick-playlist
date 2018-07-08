import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'


class AuthContainer extends Component {
    render() {
        return (
            <div className="pa5 tc">
                <p>
                    <button type="button" className="pv3 ph4 ba bw1 br-pill b--green green dib bg-transparent hover-bg-green hover-white pointer no-underline"
                        onClick={(e) => this.authClickHandler(e)}
                    >
                        Authorize
                    </button>
                </p>
                <p>
                    You need to authorize this web application first before proceeding.
                </p>
            </div>
        )
    }

    // =====

    authClickHandler(e) {
        let self = this

        const clientID = self.props.clientID
        let redirectUrl = window.location.href
        redirectUrl = redirectUrl.replace(window.location.hash, '')
        redirectUrl += 'callback.html'

        const scopes = [
            'playlist-modify-private',
            'playlist-read-private',
            'playlist-read-collaborative',
            'playlist-modify-public',
        ]

        // prepare auth args
        const authArgs = {
            client_id: clientID,
            redirect_uri: encodeURIComponent(redirectUrl),
            scope: encodeURIComponent(scopes.join(' ')),
            response_type: 'token',
            // show_dialog: 'true',
        }

        const authArgsList = this.serializeArgsDict(authArgs)
        const authUrl = 'https://accounts.spotify.com/authorize?' + authArgsList.join('&')

        // prepare window open args
        const popupArgs = {
            width: 500,
            height: 600,
            location: 0,
            menubar: 0,
            resizable: 0,
            scrollbars: 1,
            status: 0,
        }

        popupArgs['top'] = (window.screen.height - popupArgs['height']) / 2
        popupArgs['left'] = (window.screen.width - popupArgs['width']) / 2

        const popupArgsList = this.serializeArgsDict(popupArgs)
        window.open(authUrl, 'Spotify', popupArgsList.join(','))

        function onAuthMessage (e) {
            if (e.data) {
                self.props.setAccessToken(e.data)
                window.removeEventListener('message', onAuthMessage, false);
                self.props.history.push('/playlist')
            }
        }

        window.addEventListener('message', onAuthMessage, false);
    }

    serializeArgsDict(argDict) {
        let argList = []

        for (let key in argDict) {
            argList.push(key + '=' + argDict[key])
        }

        return argList
    }
}


export default withRouter(AuthContainer)
