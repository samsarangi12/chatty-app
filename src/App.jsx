import React, {Component} from 'react';
import ChatBar from './ChatBar.jsx';
import MessageList from './MessageList.jsx';
import NotificationMsgs from './notificationmsgs.jsx';

const webSocket = new WebSocket("ws://localhost:3001")
let clientCount = "";
let totalClients = "";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      type: {},
      currentUser: {name: "Anonymous"}, // optional. if currentUser is not defined, it means the user is Anonymous
      messages: [],
      clientCount: 0
    }
    this.addNewMessage = this.addNewMessage.bind(this)
    this.changeUser = this.changeUser.bind(this)
  }

  addNewMessage(curentUser, newMessage) {
    let changedUser =  curentUser;
    if (!curentUser) {
      changedUser = "Anonymous"
    }
    const newMessagesObject = {
      type: "postMessage",
      username: changedUser,
      content: newMessage,
    };
    webSocket.send(JSON.stringify(newMessagesObject));
  }

  changeUser(newUser) {
    let changedUser = newUser;
    if (!newUser) {
      changedUser = "Anonymous"
    }

    let currentUser = this.state.currentUser.name
    if(!this.state.currentUser.name) {
      currentUser = "Anonymous"
    }
    
    const newMessagesObject = {
      type: "postNotification",
      username: newUser,
      content: `${currentUser} has changed their name to ${changedUser}`,
    };

    this.setState({currentUser: {name: newUser}}, () => {
      if (newUser !== currentUser) {
        webSocket.send(JSON.stringify(newMessagesObject));
      }
    })
  }
  
  componentDidMount() {
    console.log("componentDidMount <App />");
    console.log("user connected")

    webSocket.onmessage = evt => {
      // on receiving a message, add it to the list of messages
      const message = JSON.parse(evt.data);
      let oldMessages = "";
      const incomingMessages = {};
      let newTasks = [];

      if (Number.isInteger(message)) {
        this.setState({ clientCount: message })
      }

      switch(message.type) {
        case "incomingMessage":
          oldMessages = this.state.messages;
          incomingMessages.type = message.type;
          incomingMessages.id = message.id;
          incomingMessages.username = message.username;
          incomingMessages.content = message.content;
          newTasks = [...oldMessages, incomingMessages];
          this.setState({ messages: newTasks});
          break;
        case "incomingNotification":
          oldMessages = this.state.messages;
          incomingMessages.type = message.type;
          incomingMessages.id = message.id;
          //incomingMessages.username = message.username;
          incomingMessages.content = message.content;
          newTasks = [...oldMessages, incomingMessages];
          this.setState({ messages: newTasks })
          break;
      }
    }
  }
  render() {
    const messageList = this.state.messages.map(message => {
      if (message.type === "incomingMessage") {
        return <MessageList key={message.id} allMessages={message} />
      } else if (message.type === "incomingNotification") {
        return <NotificationMsgs key={message.id} allMessages={message} />;
      }
    });

    return (
      <div>
        <nav className="navbar">
          <a href="/" className="navbar-brand">Chatty</a>
          <p className="usersonline">{this.state.clientCount} users connected</p>
        </nav>
        <main className="messages">{messageList}</main>
        <ChatBar addNewMessage={this.addNewMessage} changeUser={this.changeUser}/>
      </div>
    );
  }
}
export default App;
