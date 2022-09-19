import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { ChakraProvider } from '@chakra-ui/react';
import { AppProvider } from './Context/appContext';
import polyfill from './polyfill'


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <AppProvider>
    <ChakraProvider>
    <App />
    </ChakraProvider>
    </AppProvider>
  </React.StrictMode>
);
<<<<<<<< HEAD:frontend/src/index.js
========


>>>>>>>> 74404bb5424e9bb590e2be44e8301627425fb45a:old/src/index.js
