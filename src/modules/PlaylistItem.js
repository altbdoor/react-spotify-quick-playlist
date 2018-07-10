import React, { Component } from 'react'


class PlaylistItem extends Component {
    render() {
        const data = this.props.data

        const images = data.images
        let playlistImage = null

        if (images.length > 0) {
            if (images.length === 1) {
                playlistImage = images[0].url
            }
            else {
                playlistImage = images[1].url
            }
        }

        return (
            <div className="flex flex-row pb3">
                <div className="flex flex-shrink-0 mw4">
                    <div>
                        <img className="db w-100 h-auto" src={playlistImage} alt={data.name} width="185" height="185" />
                    </div>
                </div>
                <div className="flex flex-grow-1 pl2">
                    <div class="w-100">
                        <div className="white truncate w-100 f2 f1-ns fw6">
                            {data.name}
                        </div>

                        <div className="tracked ttu f6 mv1">
                            {data.tracks.total} song(s)
                        </div>

                        <a href={data.external_urls.spotify}>Open in Spotify</a> <br />
                        <b className="dn">{data.id}</b>
                    </div>
                </div>
            </div>
        )
    }

    // =====
}


export default PlaylistItem
