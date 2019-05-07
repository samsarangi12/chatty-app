import React, {Component} from 'react';

let newMessageInput = "";
class ChatBar extends Component {
  _handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      console.log('enter key pressed')
      newMessageInput = e.target.value;
      this.props.addNewMessage(newMessageInput);
      e.target.value = "";
    }
  };
  render() {

    return (
        <footer className="chatbar">
          <input className="chatbar-username" value={this.props.currentUser.name} />
          <input className="chatbar-message" onKeyDown={this._handleKeyDown} placeholder="Type a message and hit ENTER" />
        </footer>     
    );
  }
}
export default ChatBar;
