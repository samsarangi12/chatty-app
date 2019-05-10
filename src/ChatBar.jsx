import React, {Component} from 'react';

class ChatBar extends Component {
  _handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      let newMessageInput = "";
      newMessageInput = e.target.value;
      let currentUser = document.getElementById("username").value;
      this.props.addNewMessage(currentUser, newMessageInput);
      e.target.value = "";
    }
  };
  _changeUser = (e) => {
    let newUser = "";
    newUser = e.target.value;
    this.props.changeUser(newUser);
  };
  render() {

    return (
        <footer className="chatbar">
          <input className="chatbar-username" id="username" onBlur={this._changeUser} placeholder="Enter user-name" />
          <input className="chatbar-message" onKeyDown={this._handleKeyDown} placeholder="Type a message and hit ENTER" />
        </footer>     
    );
  }
}
export default ChatBar;
