import '@opentok/client'
import './index.css'
import './polyfills'
import React from 'react'
import { OTSession, OTPublisher, OTStreams, OTSubscriber } from 'opentok-react'

import { SAMPLE_SERVER_BASE_URL, API_KEY, SESSION_ID, TOKEN } from './config'

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

  componentDidMount() {
    if (API_KEY && TOKEN && SESSION_ID) {
      this.setState({
        authenticated: true,
        credentials: {
          apiKey: API_KEY,
          sessionId: SESSION_ID,
          token: TOKEN,
        },
      })
    } else {
      fetch(SAMPLE_SERVER_BASE_URL + '/session')
        .then((data) => data.json())
        .then((data) => {
          console.log(data)
          this.setState({
            authenticated: true,
            credentials: {
              apiKey: API_KEY,
              sessionId: SESSION_ID,
              token: TOKEN,
            },
          })
        })
        .catch((err) => {
          console.error('Failed to get session credentials', err)
          alert(
            'Failed to get opentok sessionId and token. Make sure you have updated the config.js file.',
          )
        })
    }
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
    const { apiKey, sessionId, token, authenticated } = this.state.credentials
    const { error, connection, publishVideo } = this.state
    return (
      authenticated && (
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
