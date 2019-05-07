import React, {Component} from 'react';
import ChatBar from './ChatBar.jsx';
import MessageList from './MessageList.jsx';

function generateRandomString() {
  var text = "";
  var possible = "01234567";
  for (var i = 0; i < 7; i++) {
    text += possible.charAt(Math.floor(Math.random() * possible.length))
  }
  return parseInt(text);
}

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentUser: {name: "Bob"}, // optional. if currentUser is not defined, it means the user is Anonymous
      messages: [
        {
          username: "Bob",
          content: "Has anyone seen my marbles?",
          id: "BOB234627663"
        },
        {
          username: "Anonymous",
          content: "No, I think you lost them. You lost your marbles Bob. You lost them for good.",
          id: "ANO999227621"
        }
      ]
    }
    this.addNewMessage = this.addNewMessage.bind(this)
  }


  addNewMessage(newMessage) {
    const oldMessages = this.state.messages;
    const newMessagesObject = {};
    newMessagesObject.username = this.state.currentUser.name;
    newMessagesObject.content = newMessage;
    newMessagesObject.id =  generateRandomString();
    const newTasks = [...oldMessages, newMessagesObject];
    this.setState({ messages: newTasks });
  }

  componentDidMount() {
    console.log("componentDidMount <App />");
    setTimeout(() => {
      console.log("Simulating incoming message");
      // Add a new message to the list of messages in the data store
      const newMessage = {id: 3, username: "Michelle", content: "Hello there!"};
      const messages = this.state.messages.concat(newMessage)
      // Update the state of the app component.
      // Calling setState will trigger a call to render() in App and all child components.
      this.setState({messages: messages})
    }, 3000);
  }
  render() {
    const messageList = this.state.messages.map(message => {
      return <MessageList key={message.id} allMessages={message} />;
    });
    return (
      <div>
        <main className="messages">{messageList} </main>
        <ChatBar currentUser={this.state.currentUser} addNewMessage={this.addNewMessage}/>
      </div>
    );
  }
}
export default App;
