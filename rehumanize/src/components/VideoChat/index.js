import '@opentok/client'
import './index.css'
import './polyfills'
import React from 'react'
import { OTSession, OTPublisher, OTStreams, OTSubscriber } from 'opentok-react'
import { API_KEY } from './config'

export default class VideoChat extends React.Component {
  constructor(props) {
    super(props)
    

    this.state = {
      error: null,
      connection: 'Connecting',
      publishVideo: true,
      authenticated: false,
      credentials: {
        apiKey: '',
        sessionId: '',
        token: '',
      },
    }

    this.sessionEventHandlers = {
      sessionConnected: () => {
        this.setState({ connection: 'Connected' })
      },
      sessionDisconnected: () => {
        this.setState({ connection: 'Disconnected' })
      },
      sessionReconnected: () => {
        this.setState({ connection: 'Reconnected' })
      },
      sessionReconnecting: () => {
        this.setState({ connection: 'Reconnecting' })
      },
    }

    this.publisherEventHandlers = {
      accessDenied: () => {
        console.log('User denied access to media source')
      },
      streamCreated: () => {
        console.log('Publisher stream created')
      },
      streamDestroyed: ({ reason }) => {
        console.log(`Publisher stream destroyed because: ${reason}`)
      },
    }

    this.subscriberEventHandlers = {
      videoEnabled: () => {
        console.log('Subscriber video enabled')
      },
      videoDisabled: () => {
        console.log('Subscriber video disabled')
      },
    }
  }

  async componentDidMount() {
    
    const callID = this.props.match.params.id;
    const callResponse = await axios({
      method: 'get',
      url: `${BACKEND_ADDRESS}/calls/sessionAndToken`,
      params: {callID}
    })

    const {sessionID, token} = callResponse.data;
    this.setState({
      authenticated: true,
      credentials: {
        apiKey: API_KEY,
        sessionId: sessionID,
        token: token,
      },
    })
  }

  onSessionError = (error) => {
    this.setState({ error })
  }

  onPublish = () => {
    console.log('Publish Success')
  }

  onPublishError = (error) => {
    this.setState({ error })
  }

  onSubscribe = () => {
    console.log('Subscribe Success')
  }

  onSubscribeError = (error) => {
    this.setState({ error })
  }

  toggleVideo = () => {
    this.setState((state) => ({
      publishVideo: !state.publishVideo,
    }))
  }

  render() {
    const { apiKey, sessionId, token } = this.state.credentials
    const { error, connection, publishVideo } = this.state
    return (
      this.state.authenticated && (
        <div>
          {/* <div id="sessionStatus">Session Status: {connection}</div> */}
          {error ? (
            <div className="error">
              <strong>Error:</strong> {error}
            </div>
          ) : null}
          <OTSession
            apiKey={apiKey}
            sessionId={sessionId}
            token={token}
            onError={this.onSessionError}
            eventHandlers={this.sessionEventHandlers}
          >
            {/* <button id="videoButton" onClick={this.toggleVideo}>
            {publishVideo ? 'Disable' : 'Enable'} Video
          </button> */}
            <OTPublisher
              properties={{ publishVideo, width: 200, height: 150 }}
              onPublish={this.onPublish}
              onError={this.onPublishError}
              eventHandlers={this.publisherEventHandlers}
            />
            <OTStreams>
              <OTSubscriber
                properties={{ width: 800, height: 600 }}
                onSubscribe={this.onSubscribe}
                onError={this.onSubscribeError}
                eventHandlers={this.subscriberEventHandlers}
              />
            </OTStreams>
          </OTSession>
        </div>
      )
    ) 
  }
}
