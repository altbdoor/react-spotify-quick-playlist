import React, { Component } from 'react'
import { Link, withRouter } from 'react-router-dom'

import swalPatch from '../swalPatch'
// import PlaylistListItem from './PlaylistListItem'


class PlaylistEdit extends Component {
    constructor(props) {
        super(props)

        this.state = {
            playlist: {},
        }

        // this.deletePlaylist = this.deletePlaylist.bind(this)
        // this.createPlaylist = this.createPlaylist.bind(this)
    }

    componentDidMount() {
        this.getPlaylist()
    }

    render() {
        return (
            <div>
                <div className="flex flex-row pb3">
                    <div className="flex flex-shrink-0 mw3 mw4-ns">
                        <div>
                            <img className="db shadow-1 w-100 h-auto" alt={this.state.playlist.name} width="185" height="185" />
                        </div>
                    </div>
                    <div className="flex flex-grow-1 pl2 minw0">
                        <div className="w-100">
                            <div className="truncate w-100 f3 f1-ns fw6 mb1 white">
                                {this.state.playlist.name}
                            </div>

                            <div className="tracked ttu f7 f6-ns mb1 dn db-ns">
                                0 songs
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }

    // =====

    getPlaylist() {
        const playlistId = this.props.match.params.playlistId
        const spotify = this.props.spotify

        spotify.lazyGetId().then((id) => {
            return spotify.getPlaylist(id, playlistId, {
                fields: 'name,images',
            })
        }).then((data) => {
            this.setState({
                playlist: data,
            })
        })
    }
}


export default withRouter(PlaylistEdit)
