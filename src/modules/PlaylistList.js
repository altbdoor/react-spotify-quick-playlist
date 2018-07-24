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
        }

        this.deletePlaylist = this.deletePlaylist.bind(this)
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
                <div className="pb2 tc f3 f1-ns fw6">Loading...</div>
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

        return (
            <div>
                {content}

                <div className="flex justify-between">
                    <Link to={prevPageUrl} className={btnClass}>
                        Prev
                    </Link>
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

    deletePlaylist(e, playlistName, playlistId) {
        // https://developer.spotify.com/documentation/general/guides/working-with-playlists/#following-and-unfollowing-a-playlist
        // console.log(playlistId)

        swalPatch({
            type: 'warning',
            title: `Delete "${playlistName}"?`,
            text: `Are you sure you want to delete the playlist?`,
            showCancelButton: true,
            confirmButtonText: `Yes, delete it`,
            cancelButtonText: `No, cancel`,
        })
    }

}


export default withRouter(PlaylistList)
