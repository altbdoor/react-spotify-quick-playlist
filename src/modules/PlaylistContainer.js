import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'

import PlaylistList from './PlaylistList'


class PlaylistContainer extends Component {
    constructor(props) {
        super(props)

        this.state = {
            list: [],
            page: this.props.match.params.page,
            loading: true,
            prevPage: 0,
            nextPage: 0,
        }
    }

    componentDidMount() {
        this.updateList()
    }

    componentDidUpdate(prevProps, prevState) {
        if (prevState.page !== this.state.page) {
            this.updateList()
        }
        else if (prevProps.match.params.page !== this.props.match.params.page) {
            this.setState({
                page: this.props.match.params.page,
            })
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

            const queryArgs = {
                offset: (this.state.page * limit),
                limit: limit,
            }

            spotify.getUserPlaylists(queryArgs).then((data) => {
                const maxPage = parseInt(data.total / limit, 10)
                const prevPage = Math.max(0, this.state.page - 1)
                const nextPage = Math.min(maxPage, this.state.page + 1)

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

}


export default withRouter(PlaylistContainer)
