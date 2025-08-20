import React from 'react';
import './App.css';
import ChatContainer from './components/Chat/ChatContainer';

const App: React.FC = () => {
  return (
    <div className="App min-h-screen bg-gray-100">
      <ChatContainer />
    </div>
  );
};

export default App;
