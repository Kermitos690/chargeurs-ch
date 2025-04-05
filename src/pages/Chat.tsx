
import React from 'react';
import ChatComponent from '@/components/chat/ChatComponent';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

const Chat = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow mt-16 container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-3xl font-bold mb-6">Chat en temps réel</h1>
          <p className="text-gray-600 mb-8">
            Discutez en temps réel avec d'autres utilisateurs. Notre système utilise Supabase pour offrir une expérience de chat instantanée.
          </p>
          <ChatComponent />
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Chat;
