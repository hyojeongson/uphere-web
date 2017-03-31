import React from 'react';
import s from './ChatList.css';

class ChatList extends React.Component {
  constructor(props) {
    super(props);

    const defaultCurrentChatIndex = this.props.chats.map(chat => chat.uphere_id).indexOf(this.props.currentChatID);

    this.state = {
      currentChatIndex: defaultCurrentChatIndex < 0 ? 0 : defaultCurrentChatIndex
    };
  }

  componentWillReceiveProps(nextProps) {
    const defaultCurrentChatIndex = nextProps.chats.map(chat => chat.uphere_id).indexOf(nextProps.currentChatID);
    const newCurrentChatIndex = defaultCurrentChatIndex < 0 ? 0 : defaultCurrentChatIndex;

    this.setState({
      currentChatIndex: newCurrentChatIndex
    });
  }

  clickHandler(chat) {
    this.props.showChat(chat);
  }

  _getFriend(chat) {
    const friend = chat.participants.filter((user) => {
      return user.uphere_id !== this.props.user.uphere_id;
    })[0];

    return friend;
  }

  _isYourMessage(message) {
    return message.sender_id === this.props.user.uphere_id;
  }

  render() {
    let lastmsgDate = create_at => {
      let date = new Date(Date.parse(create_at)).toString();
      let month = create_at[5] === '0' ? create_at.slice(6, 7) : create_at.slice(5, 7);
      let day = date.split(' ')[2];
      return `${month}/${day} ${date.slice(0, 3)}`;
    };

    return (
      <div>
        <div className={`${s.chatlist_header}`}>
          <div>
            <i className="fa fa-cog fa-lg" aria-hidden="true"></i>
          </div>
          <div>
            <h4>Messenger</h4>
          </div>
          <div>
            <i className="fa fa-commenting-o fa-lg" aria-hidden="true"></i>
          </div>
        </div>
        <ul className={s.chatlist_container}>
        {this.props.chats.length > 0 && this.props.chats.map((chat, i) => {
          return (
            <li ref="chatroom" key={i}
              className={`${s.chatroom_container} ${this.state.currentChatIndex === i ? s.chatroom_click : ''}`}
              onClick={(e) => {
                e.preventDefault();
                this.setState({
                  currentChatIndex: i
                });
                this.clickHandler(chat);
            }}>
              <img src={this._getFriend(chat).profile_image_url} />
              <span className={`${s.chatroom_username}`}>
                { this._getFriend(chat).name }
              </span>
              <span className={`${s.chatroom_time}`}>
                <i className="fa fa-check" aria-hidden="true">{chat.messages.length > 0 ? lastmsgDate(chat.messages[chat.messages.length - 1].created_at) : null}</i>
              </span>
                <span className={`${s.chatroom_preview}`}>
                  {
                    chat.messages.length <= 0 ? null :
                      <span>
                        {
                          this._isYourMessage(chat.messages[chat.messages.length - 1]) ?
                            'You: ' : null
                        }
                        { chat.messages[chat.messages.length - 1].text }
                      </span>
                  }
                </span>
            </li>
          );
        })}
        </ul>
      </div>
    );
  }
}

export default ChatList;
