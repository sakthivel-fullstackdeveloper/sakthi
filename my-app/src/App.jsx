import React from 'react';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import UiPreview from './components/UiPreview';
import './assets/todo.css'

function App() {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-grow">
        <UiPreview />
      </main>
      <Footer />
    </div>
  );
}

export default App;
