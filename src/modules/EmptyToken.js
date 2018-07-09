import React, { Component } from 'react'
import { Link } from 'react-router-dom'


class EmptyToken extends Component {
    render() {
        return (
            <div className="pa5 tc">
                <p className="lh-copy">No token found. Please login first to proceed.</p>
                <Link to="/login" className="pv3 ph4 ba bw1 br-pill b--green green dib bg-transparent hover-bg-green hover-white pointer no-underline">
                    Go to Login page
                </Link>
            </div>
        )
    }
}


export default EmptyToken
