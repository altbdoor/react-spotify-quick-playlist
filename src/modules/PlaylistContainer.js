import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'

// import swal from 'sweetalert2/dist/sweetalert2.js'

import PlaylistList from './PlaylistList'


class PlaylistContainer extends Component {
    constructor(props) {
        super(props)

        this.state = {
            list: [],
            loading: true,
            prevPage: 0,
            nextPage: 0,
        }
    }

    componentDidMount() {
        this.updateList()
    }

    componentDidUpdate(prevProps, prevState) {
        if (prevProps.match.params.page !== this.props.match.params.page) {
            this.updateList()
        }
    }

    render() {
        const prevPageUrl = `/playlist/list/${this.state.prevPage}`
        const nextPageUrl = `/playlist/list/${this.state.nextPage}`

        return (
            <div className="mw7 ph2 center">
                <PlaylistList playlists={this.state.list}
                    prevPageUrl={prevPageUrl}
                    nextPageUrl={nextPageUrl}
                    isLoading={this.state.loading} />
            </div>
        )
    }

    // =====

    updateList(limit=5) {
        const spotify = this.props.spotify

        if (spotify.getAccessToken()) {
            this.setState({
                loading: true,
            })

            const currentPage = this.props.match.params.page

            const queryArgs = {
                offset: (currentPage * limit),
                limit: limit,
            }

            spotify.getUserPlaylists(queryArgs).then((data) => {
                const maxPage = parseInt(data.total / limit, 10)
                const prevPage = Math.max(0, currentPage - 1)
                const nextPage = Math.min(maxPage, currentPage + 1)

                this.setState({
                    list: data.items,
                    loading: false,
                    prevPage: prevPage,
                    nextPage: nextPage,
                })
            }).catch(() => {
                this.props.history.push('/auth/tokenexpire')
            })
        }
        else {
            this.props.history.push('/auth')
        }
    }

    unfollowPlaylist(e, playlistId) {
        // https://developer.spotify.com/documentation/general/guides/working-with-playlists/#following-and-unfollowing-a-playlist
    }

}


export default withRouter(PlaylistContainer)
