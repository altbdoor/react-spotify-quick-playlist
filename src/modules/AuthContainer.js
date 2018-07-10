import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'


class AuthContainer extends Component {
    render() {
        let textContent = (
            <p className="lh-copy">
                You need to authorize this web application first before proceeding.
            </p>
        )

        if (this.props.match.params.error === 'tokenexpire') {
            textContent = (
                <p className="lh-copy">
                    The session has expired. You need to reauthorize this web application first before proceeding.
                </p>
            )
        }

        return (
            <div className="mw7 ph2 center">
                <div className="pv5 tc">
                    <p>
                        <button type="button" className="pv3 ph4 ba bw1 br-pill b--green green dib bg-transparent hover-bg-green hover-white pointer no-underline ttu tracked fw7"
                            onClick={(e) => this.authClickHandler(e)}
                        >
                            Authorize
                        </button>
                    </p>

                    {textContent}
                </div>
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

        let onAuthMessage = ((e) => {
            if (e.data) {
                self.props.setAccessToken(e.data)
                window.removeEventListener('message', onAuthMessage, false);
                self.props.history.push('/playlist/list/0')
            }
        })

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
