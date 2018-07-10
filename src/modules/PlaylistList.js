import React, { Component } from 'react'
import { Link } from 'react-router-dom'

import PlaylistItem from './PlaylistItem'


class PlaylistList extends Component {
    render() {
        let content = null

        if (this.props.isLoading) {
            content = (
                <div>Loading...</div>
            )
        }
        else {
            content = this.props.playlists.map((item) => {
                return (
                    <PlaylistItem data={item} key={item.id} />
                )
            })
        }

        return (
            <div>
                {content}

                <Link to={this.props.prevPageUrl}>Prev</Link>
                <Link to={this.props.nextPageUrl}>Next</Link>
            </div>
        )
    }
}


export default PlaylistList
