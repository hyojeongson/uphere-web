import React, { PropTypes } from 'react';

import ChatRoom from '../ChatRoom/ChatRoom';
import UserList from '../UserList/UserList';
import ChatList from '../ChatList/ChatList';
import s from './styles.css';

class Home extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className={`${s.home_container}`}>
        <div className={`${s.chatlist}`}>
          <ChatList
            user={this.props.user}
            chats={this.props.chatList}
            showChat={this.props.showChat} />
        </div>
        <div className={`${s.chatroom}`}>
          <ChatRoom
            chat={this.props.currentChatRoom}
            newMessage={this.props.newMessage}
            user={this.props.user} />
        </div>
        <div className={`${s.friend_list}`}>
          <UserList
            showChat={this.props.showChat}
            chats={this.props.chatList}
            onNewChat={this.props.onNewChat}
            friendList={this.props.friendList}
            user={this.props.user} />
        </div>
      </div>
    );
  }
}

export default Home;
