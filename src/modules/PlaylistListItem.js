import React, { Component } from 'react'
import { Link } from 'react-router-dom'

import playlistLogo from '../img/music.png'


class PlaylistListItem extends Component {
    render() {
        const data = this.props.data

        const images = data.images
        let playlistImage = playlistLogo

        if (images.length > 0) {
            if (images.length === 1) {
                playlistImage = images[0].url
            }
            else {
                playlistImage = images[1].url
            }
        }

        const editUrl = `/playlist/edit/${data.id}`
        const btnClass = `
            pv2 ph3 ba bw1 br-pill f7 f6-ns dib mr1
            no-underline pointer bg-transparent
        `

        return (
            <div className="flex flex-row pb3">
                <div className="flex flex-shrink-0 mw3 mw4-ns">
                    <div>
                        <Link to={editUrl} className="db shadow-1">
                            <img className="db w-100 h-auto" src={playlistImage} alt={data.name} width="185" height="185" />
                        </Link>
                    </div>
                </div>
                <div className="flex flex-grow-1 pl2 minw0">
                    <div className="w-100">
                        <div className="truncate w-100 f3 f1-ns fw6 mb1">
                            <Link to={editUrl} className="white no-underline">
                                {data.name}
                            </Link>
                        </div>

                        <div className="tracked ttu f7 f6-ns mb1 dn db-ns">
                            {data.tracks.total} songs
                        </div>

                        <div>
                            <Link to={editUrl} className={`${btnClass} b--green green hover-bg-green hover-white`}>
                                Open
                            </Link>
                            <button type="button" className={`${btnClass} b--red red hover-bg-red hover-white`}
                                onClick={(e) => this.props.delete(e, data.name, data.id)}>
                                Delete
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        )
        // <a target="_blank" href={data.external_urls.spotify} className="pv2 ph3 ba bw1 br3 f7 f6-ns dn dib-ns">
        //     Open in Spotify
        // </a>
    }

    // =====
}


export default PlaylistListItem
