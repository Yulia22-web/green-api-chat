import MessageList from './MessageList';
import MessageInput from './MessageInput';

export default function ChatWindow({ chatId, messages, onSend, isPolling }) {
  const phone = chatId.replace('@c.us', '');
  const initials = phone.slice(-2);

  return (
    <div className="chat-window">
      <header className="chat-window__header">
        <div className="chat-window__profile">
          <span className="chat-window__avatar">{initials}</span>
          <div className="chat-window__meta">
            <span className="chat-window__peer">{phone}</span>
            <span className="chat-window__status">
              {isPolling ? 'онлайн' : 'подключение...'}
            </span>
          </div>
        </div>
      </header>

      <MessageList messages={messages} />
      <MessageInput onSend={onSend} />
    </div>
  );
}