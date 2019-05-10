import React, {Component} from 'react';

class NotificationMsgs extends Component {
  render() {
    return (
      <div className="message system">{this.props.allMessages.content}</div>
    );
  }
}
export default NotificationMsgs;
