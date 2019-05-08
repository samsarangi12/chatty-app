import React, {Component} from 'react';
import ChatBar from './ChatBar.jsx';
import MessageList from './MessageList.jsx';


// function generateRandomString() {
//   var text = "";
//   var possible = "01234567";
//   for (var i = 0; i < 7; i++) {
//     text += possible.charAt(Math.floor(Math.random() * possible.length))
//   }
//   return parseInt(text);
// }

const webSocket = new WebSocket("ws://localhost:3001")

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentUser: {}, // optional. if currentUser is not defined, it means the user is Anonymous
      messages: []
    }
    this.addNewMessage = this.addNewMessage.bind(this)
  }

  addNewMessage(curentUser, newMessage) {
    const newMessagesObject = {
      username: curentUser,
      content: newMessage,
    };
    webSocket.send(JSON.stringify(newMessagesObject));
  }

  componentDidMount() {
    console.log("componentDidMount <App />");
    webSocket.onmessage = evt => {
      // on receiving a message, add it to the list of messages
      const message = JSON.parse(evt.data)

      const oldMessages = this.state.messages;
      const incomingMessages = {
        id: message.id,
        username: message.username,
        content: message.content,
      };
      const newTasks = [...oldMessages, incomingMessages];
      this.setState({ messages: newTasks });
    }
  }
  render() {
    const messageList = this.state.messages.map(message => {
      return <MessageList key={message.id} allMessages={message} />;
    });
    return (
      <div>
        <main className="messages">{messageList} </main>
        <ChatBar addNewMessage={this.addNewMessage}/>
      </div>
    );
  }
}
export default App;
