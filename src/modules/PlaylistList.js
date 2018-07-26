import React, { Component } from 'react'
import { Link, withRouter } from 'react-router-dom'

import swalPatch from '../swalPatch'
import PlaylistListItem from './PlaylistListItem'


class PlaylistList extends Component {
    constructor(props) {
        super(props)

        this.state = {
            list: [],
            loading: true,
            prevPage: 0,
            nextPage: 0,
            maxPage: 0,
        }

        this.deletePlaylist = this.deletePlaylist.bind(this)
        this.createPlaylist = this.createPlaylist.bind(this)
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

        let content = null

        if (this.state.loading) {
            content = (
                <div className="pv2 tc f3 f1-ns fw6">Loading...</div>
            )
        }
        else {
            content = this.state.list.map((item) => {
                return (
                    <PlaylistListItem data={item} key={item.id}
                        delete={this.deletePlaylist} />
                )
            })
        }

        const btnClass = `
            dib pv2 ph3 pv3-ns ph4-ns
            ba bw1 br-pill b--mid-gray mid-gray bg-transparent
            hover-bg-mid-gray hover-white pointer
            no-underline ttu tracked fw6
        `

        const displayCurrentPage = parseInt(this.props.match.params.page, 10) + 1
        const displayMaxPage = this.state.maxPage + 1

        return (
            <div>
                <div className="flex justify-end pb3">
                    <button type="button" className={btnClass} onClick={(e) => this.createPlaylist(e)}>
                        New Playlist
                    </button>
                </div>

                {content}

                <div className="flex justify-between items-center">
                    <Link to={prevPageUrl} className={btnClass}>
                        Prev
                    </Link>
                    <div>
                        {displayCurrentPage} / {displayMaxPage}
                    </div>
                    <Link to={nextPageUrl} className={btnClass}>
                        Next
                    </Link>
                </div>
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

            const currentPage = parseInt(this.props.match.params.page, 10)

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
                    maxPage: maxPage,
                })
            }).catch(() => {
                this.props.history.push('/auth/tokenexpire')
            })
        }
        else {
            this.props.history.push('/auth')
        }
    }

    createPlaylist(e) {
        swalPatch({
            title: 'New Playlist',
            input: 'text',
            inputPlaceholder: 'Playlist name',
            showCancelButton: true,
            inputValidator: ((value) => {
                return !value && 'Invalid playlist name'
            })
        }).then((result) => {
            if (result.value) {
                const spotify = this.props.spotify
                spotify.lazyGetId().then((id) => {
                    spotify.createPlaylist(id, {
                        name: result.value,
                    })
                })
            }
        })
    }

    deletePlaylist(e, playlistName, playlistId) {
        const deleteSpotifyUrl = 'https://developer.spotify.com/documentation/general/guides/working-with-playlists/#following-and-unfollowing-a-playlist'

        swalPatch({
            type: 'warning',
            title: `Delete "${playlistName}"?`,
            html: `
                Are you sure you want to delete the playlist?
                Do note that its not possible to
                <a target="_blank" class="green" href="${deleteSpotifyUrl}">completely delete a playlist</a>.
            `,
            showCancelButton: true,
            confirmButtonText: `Yes, delete it`,
            cancelButtonText: `No, cancel`,
        })
    }

}


export default withRouter(PlaylistList)
