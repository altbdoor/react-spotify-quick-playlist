import React from 'react'
import { withRouter } from 'react-router-dom'

import BasePlaylistComponent from './BasePlaylistComponent'
import PlaylistEditTrack from './PlaylistEditTrack'


class PlaylistEdit extends BasePlaylistComponent {
    constructor(props) {
        super(props)

        this.state = {
            playlist: {
                name: '...',
                images: [],
                public: null,
            },
            trackItems: [],
            trackTotal: 0,
        }
    }

    componentDidMount() {
        this.getPlaylistInfo()
        this.getPlaylistTracks()
    }

    render() {
        const playlistImage = this.getPlaylistImage(this.state.playlist.images)

        const playlistTracks = this.state.trackItems.map((item, index) => {
            return (
                <PlaylistEditTrack key={index}
                    track={item.track} index={index + 1} />
            )
        })

        let playlistPublicStatus = '...'
        if (this.state.playlist.public !== null) {
            playlistPublicStatus = 'Private'

            if (this.state.playlist.public) {
                playlistPublicStatus = 'Public'
            }
        }

        return (
            <div>
                <div className="flex justify-start pb3">
                    <button type="button" className={this.baseBtnClass} onClick={(e) => this.props.history.goBack()}>
                        Back
                    </button>
                </div>

                <div className="flex flex-row pb3">
                    <div className="flex flex-shrink-0 mw3 mw4-ns">
                        <div>
                            <img className="db shadow-1 w-100 h-auto" src={playlistImage} alt={this.state.playlist.name} width="185" height="185" />
                        </div>
                    </div>
                    <div className="flex flex-grow-1 pl2 minw0">
                        <div className="w-100">
                            <div className="truncate w-100 f3 f1-ns fw6 mb1 white">
                                {this.state.playlist.name}
                            </div>

                            <div className="tracked ttu f7 f6-ns mb1 db-ns">
                                {this.state.trackTotal} songs
                            </div>

                            <div className="tracked ttu f7 f6-ns mb1 db-ns">
                                {playlistPublicStatus}
                            </div>
                        </div>
                    </div>
                </div>

                <table>
                    <tbody>
                        {playlistTracks}
                    </tbody>
                </table>
            </div>
        )
    }

    // =====

    getPlaylistInfo() {
        const playlistId = this.props.match.params.playlistId
        const spotify = this.props.spotify

        // todo: fix after #105
        spotify.getPlaylist(null, playlistId, {
            fields: 'name,images,public',
        }).then((data) => {
            this.setState({
                playlist: data,
            })
        })

        // i do not catch this, since getPlaylistTracks will be called more
        // often, and will catch any failure in spotify api
    }

    getPlaylistTracks() {
        const playlistId = this.props.match.params.playlistId
        const spotify = this.props.spotify

        const trackPromise = new Promise((resolve, reject) => {
            let trackList = []

            const recursiveGetTracks = ((limit=100, offset=0) => {
                // todo: fix after #105
                spotify.getPlaylistTracks(null, playlistId, {
                    // note: artists nesting field filter does not work
                    fields: 'items(track(id,name,artists(id,name))),total,next',
                    limit: limit,
                    offset: offset,
                }).then((data) => {
                    trackList = trackList.concat(data.items)

                    if (data.next) {
                        offset += limit
                        recursiveGetTracks(limit, offset)
                    }
                    else {
                        resolve(trackList)
                    }

                }).catch(() => {
                    reject()
                })
            })

            recursiveGetTracks()
        })

        trackPromise.then((trackList) => {
            this.setState({
                trackItems: trackList,
                trackTotal: trackList.length,
            })
        }).catch(() => {
            this.redirectToAuth()
        })
    }

    redirectToAuth() {
        this.props.history.push('/auth/tokenexpire')
    }
}


export default withRouter(PlaylistEdit)
