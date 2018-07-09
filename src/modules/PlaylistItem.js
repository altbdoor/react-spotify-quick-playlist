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
            <div className="row no-gutters">
                <div className="col-auto">
                    <img className="db" src={playlistImage} alt={data.name} width="185" height="185" />
                </div>
                <div className="col">
                    <h1 className="mt0 mb1 white truncate w-100">
                        {data.name}
                    </h1>

                    <div className="tracked ttu f7">
                        {data.tracks.total} song(s)
                    </div>

                    <a href={data.external_urls.spotify}>Open in Spotify</a> <br />
                    <b className="dn">{data.id}</b>
                </div>
            </div>
        )
    }

    // =====
}


export default PlaylistItem
