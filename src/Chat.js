import React, { useState, useEffect } from 'react';

const Chat = ({ theme, onFinish, userInfo }) => { // userInfoを受け取る
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchInitialGuidance = async () => {
      setIsLoading(true);
      try {
        const apiUrl = process.env.REACT_APP_API_URL || 'http://localhost:3001';
        const response = await fetch(`${apiUrl}/api/initial-guidance`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ theme, userInfo }),
        });

        if (!response.ok) {
          throw new Error('初期指導APIからの応答がありません');
        }

        const data = await response.json();
        setMessages([{ sender: 'ai', text: data.guidance }]);
      } catch (error) {
        console.error('初期指導生成エラー:', error);
        setMessages([{ sender: 'ai', text: '初期指導の生成中にエラーが発生しました。' }]);
      } finally {
        setIsLoading(false);
      }
    };

    fetchInitialGuidance();
  }, [theme, userInfo]); // themeとuserInfoが変更されたときに再実行

  const handleSend = async () => {
    if (input.trim() === '') return;

    const newMessages = [...messages, { sender: 'user', text: input }];
    setMessages(newMessages);
    const currentInput = input;
    setInput('');
    setIsLoading(true);

    try {
      const apiUrl = process.env.REACT_APP_API_URL || 'http://localhost:3001';
      const response = await fetch(`${apiUrl}/api/chat`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ 
          message: currentInput,
          history: messages, 
          userInfo: userInfo, // userInfoを渡す
          theme: theme, // themeも渡す
        }),
      });

      if (!response.ok) {
        throw new Error('APIからの応答がありません');
      }

      const data = await response.json();
      setMessages([...newMessages, { sender: 'ai', text: data.reply }]);
    } catch (error) {
      console.error(error);
      setMessages([...newMessages, { sender: 'ai', text: 'エラーが発生しました。もう一度試してください。' }]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="Chat">
      <div className="chat-header">
        <h2>{theme}</h2>
        <button onClick={() => onFinish(messages)} className="finish-button" disabled={isLoading}>終了</button> {/* 履歴を渡す */}
      </div>
      <div className="message-area">
        {messages.map((msg, index) => (
          <div key={index} className={`message ${msg.sender}`}>
            <p>{msg.text}</p>
          </div>
        ))}
        {isLoading && <div className="message ai"><p>考え中...</p></div>}
      </div>
      <div className="input-area">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyPress={(e) => e.key === 'Enter' && !isLoading && handleSend()}
          placeholder="質問を入力してください..."
          disabled={isLoading}
        />
        <button onClick={handleSend} disabled={isLoading}>
          {isLoading ? '送信中...' : '送信'}
        </button>
      </div>
    </div>
  );
};

export default Chat;