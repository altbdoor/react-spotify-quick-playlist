import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'

import EmptyToken from './EmptyToken'
import PlaylistList from './PlaylistList'


class PlaylistContainer extends Component {
    constructor(props) {
        super(props)

        this.state = {
            list: [],
            page: 0,
            maxPage: 0,
            loading: true,
        }

        this.changePage = this.changePage.bind(this)
    }

    componentDidMount() {
        this.updateList()
    }

    componentDidUpdate(prevProps, prevState) {
        if (prevState.page !== this.state.page) {
            this.updateList()
        }
    }

    render() {
        const spotify = this.props.spotify
        const token = spotify.getAccessToken()

        let content = null

        if (token) {
            content = (
                <PlaylistList playlists={this.state.list}
                    changePage={this.changePage}
                    isLoading={this.state.loading} />
            )
        }
        else {
            content = (
                <EmptyToken />
            )
        }

        return (
            <div className="container">
                {content}
            </div>
        )
    }

    // =====

    updateList(limit=5) {
        const spotify = this.props.spotify

        this.setState({
            loading: true,
        })

        const queryArgs = {
            offset: (this.state.page * limit),
            limit: limit,
        }

        spotify.getUserPlaylists(queryArgs).then((data) => {
            const maxPage = parseInt(data.total / limit, 10)

            this.setState({
                list: data.items,
                loading: false,
                maxPage: maxPage,
            })
        }).catch(() => {
            this.props.history.push('/auth')
        })
    }

    changePage(e, modifier) {
        let currentPage = this.state.page
        currentPage += modifier

        currentPage = Math.max(0, currentPage)
        currentPage = Math.min(this.state.maxPage, currentPage)

        this.setState({
            page: currentPage,
        })
    }
}


export default withRouter(PlaylistContainer)
