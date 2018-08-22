import React, { Component } from 'react'

class PlaylistEditTrack extends Component {
    // constructor(props) {
    //     super(props)

    //     // this.state = {
    //     //     playlist: {
    //     //         name: '...',
    //     //         images: [],
    //     //         tracks: {
    //     //             items: [],
    //     //             total: 0,
    //     //         }
    //     //     },
    //     // }

    //     // this.deletePlaylist = this.deletePlaylist.bind(this)
    //     // this.createPlaylist = this.createPlaylist.bind(this)
    // }

    render() {
        return (
            <tr>
                <td className="pa2 v-top tc" style={{width: '01%'}}>{this.props.index}</td>
                <td className="pa2 v-top" style={{width: '99%'}}>{this.props.track.name}</td>
            </tr>
        )
    }

    // =====

}


export default PlaylistEditTrack
