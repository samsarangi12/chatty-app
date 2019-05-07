import React, {Component} from 'react';

class MessageList extends Component {
  render() {
    return (
      <div className="message">
        <span className="message-username">{this.props.allMessages.username}</span>
        <span className="message-content">{this.props.allMessages.content}</span>
      </div>
    );
  }
}
export default MessageList;
