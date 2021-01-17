import '@opentok/client'
import './index.css'
import './polyfills'
import React from 'react'
import { OTSession, OTPublisher, OTStreams, OTSubscriber } from 'opentok-react'
import { API_KEY } from './config'

let prompts = [
  "What’s something not many people know about you?",
  "What are you most passionate about?",
  "What makes you laugh out loud?",
  "What was your favorite thing to do as a kid?",
  "Who do you text the most?",
  "What do you like to cook the most?",
  "What’s your favorite TV show?",
  "What is your favorite book?",
  "Who is most influential in your life?",
  "What was your best friend’s name growing up?",
  "How do you spend your mornings?",
  "What’s your all-time favorite band?",
  "What’s your dream job?",
  "What did you study?",
  "What did you want to be growing up?",
  "What is the best pickup line you’ve ever used? Heard?",
  "Do you have any nicknames?",
  "What talent do you wish you had?",
  "Where do you see yourself living when you retire?",
  "What is your favorite weekend activity?",
  "Do you have any pet peeves?",
  "Who was your favorite teacher and why?",
  "What makes you most uncomfortable about dating?",
  "What is your favorite place in the entire world?",
  "Does pineapple belong on pizza?",
]

export default class VideoChat extends React.Component {
  constructor(props) {
    super(props)
    

    this.state = {
      error: null,
      prompts: prompts,
      currentPrompt: "Does pineapple belong on pizza?",
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

  onButtonClick = () => {
    // var p = this.state.prompts[Math.floor(Math.random() * this.state.prompts.length)]; 
    this.setState({ currentPrompt: this.state.prompts[Math.floor(Math.random() * this.state.prompts.length)]});
  }

  async componentDidMount() {
    
    const callID = this.props.match.params.id;
    const callResponse = await axios({
      method: 'get',
      url: `${BACKEND_ADDRESS}/calls/sessionAndToken`,
      params: {callID}
    })
    
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

            <div class="container">
            <OTStreams>
              <OTSubscriber
                properties={{ width: 800, height: 600, showControls: false,}}
                onSubscribe={this.onSubscribe}
                onError={this.onSubscribeError}
                eventHandlers={this.subscriberEventHandlers}
                
              />
            </OTStreams>
            </div>
            <div class="container">
              <OTPublisher
              // MAKE SURE TO SET publishAudio to TRUE 
                properties={{ publishVideo, width: 200, height: 150, showControls: false, publishAudio: false}}
                onPublish={this.onPublish}
                onError={this.onPublishError}
                eventHandlers={this.publisherEventHandlers}
              />
              <div className= "ui-area">
                <div className="prompt-header titled">
                    <header>
                        I want to know...
                      </header>
                  </div>
                  <div className="prompt subtitled">
                    <header>
                      {this.state.currentPrompt}
                    </header>
                  </div>
                  <button
                  className="new-prompt-btn"
                  onClick={this.onButtonClick}>
                    New prompt
                  </button>
              </div>


            </div>


          </OTSession>
            

            
        </div>
      )
    ) 
  }
}
