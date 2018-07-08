import React, { Component } from 'react'

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
                <button disabled={this.props.isLoading} onClick={(e) => this.props.changePage(e, -1)}>Prev</button>
                <button disabled={this.props.isLoading} onClick={(e) => this.props.changePage(e, +1)}>Next</button>
            </div>
        )
    }
}


export default PlaylistList
