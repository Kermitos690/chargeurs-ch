
import React from 'react';
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ChatInterface from "@/components/chat/ChatInterface";

interface LayoutProps {
  children: React.ReactNode;
  hideFooter?: boolean;
}

const Layout: React.FC<LayoutProps> = ({ children, hideFooter = false }) => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow">
        {children}
      </main>
      {!hideFooter && <Footer />}
      <ChatInterface />
    </div>
  );
};

export default Layout;
