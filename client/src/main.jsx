import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css';


const loadingGifPath = '/narutorun.gif';

const Main = () => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {

    setTimeout(() => {
      setIsLoading(false);
    }, 10000);
  }, []);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <img src={loadingGifPath} alt="Loading..." className="w-60 h-60" />
      </div>
    );
  }

  return <App />;
};

ReactDOM.createRoot(document.getElementById('root')).render(<Main />);
