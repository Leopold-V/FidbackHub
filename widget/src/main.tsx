import React, { ReactNode } from 'react';
import ReactDOM from 'react-dom/client';
import Frame from 'react-frame-component';
import App from './App';

const apiKey: string = document.getElementById('script_widget')?.getAttribute('data-key') || '';

const widget_container = document.createElement('div');
widget_container.id = 'widget_fidbackhub';
document.body.appendChild(widget_container);

ReactDOM.createRoot(document.getElementsByTagName('body')[0]).render(
  <App apiKey={apiKey} />
,
);
