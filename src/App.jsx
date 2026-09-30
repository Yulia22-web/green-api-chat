import { useState } from 'react';
import AuthForm from './components/AuthForm';
import ChatWindow from './components/ChatWindow';
import { useGreenApi } from './hooks/useGreenApi';

function App() {
  const [credentials, setCredentials] = useState(null);
  const { messages, send, startPolling, isPolling } = useGreenApi();

  const handleAuth = (data) => {
    setCredentials(data);
    startPolling(data);
  };

  const handleSend = async (text) => {
    if (!credentials) return;
    await send({ ...credentials, text });
  };

  return (
    <div className="app">
      {!credentials ? (
        <AuthForm onSubmit={handleAuth} />
      ) : (
        <ChatWindow
          chatId={credentials.chatId}
          messages={messages}
          onSend={handleSend}
          isPolling={isPolling}
        />
      )}
    </div>
  );
}

export default App;