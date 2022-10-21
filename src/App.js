import React from 'react';
import Header from './home/layout/header'
import HomePage from './home/HomePage'
import Footer from './home/layout/footer'

const App = () => {
	return (
    <div className='App'>
      <Header />
      <HomePage />
      <Footer />
    </div>
	);
}

export default App;