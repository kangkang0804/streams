import React from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { streamsList } from '../../actions'

class StreamList extends React.Component {
  componentDidMount () {
    this.props.streamsList()
  }

  renderAdmin (stream) {
    if (stream.userId === this.props.myId) {
      return (
        <div className='right floated content'>
          <Link className='ui button primary' to={`/streams/edit/${stream.id}`}>
            Edit
          </Link>
          <button className='ui button negative'>Delete</button>
        </div>
      )
    }
  }

  renderStreamsList = () => {
    return this.props.streams.map(stream => {
      return (
        <div className='item' key={stream.id}>
          {this.renderAdmin(stream)}
          <i className='large middle aligned icon camera' />
          <div className='content'>
            {stream.title}
            <div className='description'>{stream.description}</div>
          </div>
        </div>
      )
    })
  }

  renderCreate () {
    if (this.props.isSignedIn) {
      return (
        <div style={{ textAlign: 'right' }}>
          <Link to='/streams/new' className='ui button primary'>
            Create stream
          </Link>
        </div>
      )
    }
  }

  render () {
    // console.log(this.props.streams)
    return (
      <div>
        <h2>Streams</h2>
        <div className='ui celled list'>{this.renderStreamsList()}</div>
        {this.renderCreate()}
      </div>
    )
  }
}

const mapStateToProps = state => {
  // console.log(state.streams)
  return {
    myId: state.auth.userId,
    isSignedIn: state.auth.isSignedIn,
    streams: Object.values(state.streams)
  }
}

export default connect(mapStateToProps, { streamsList })(StreamList)