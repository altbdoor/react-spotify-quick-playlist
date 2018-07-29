import { Component } from 'react'

import playlistLogo from '../img/music.png'


class BasePlaylistComponent extends Component {
    baseBtnClass = `
        dib pv2 ph3 pv3-ns ph4-ns
        ba bw1 br-pill b--mid-gray mid-gray bg-transparent
        hover-bg-mid-gray hover-white pointer
        no-underline ttu tracked fw6
    `

    getPlaylistImage(images) {
        let playlistImage = playlistLogo

        if (images.length > 0) {
            if (images.length === 1) {
                playlistImage = images[0].url
            }
            else {
                playlistImage = images[1].url
            }
        }

        return playlistImage
    }
}


export default BasePlaylistComponent
