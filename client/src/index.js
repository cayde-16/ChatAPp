import React from 'react';
import {createRoot} from 'react-dom/client';
import './index.css';
import App from './App'; 

const Apps = ()  => <App/>

const root = createRoot(document.getElementById('root'));

root.render(<Apps/>);