import React from 'react'
import ReactDOM from 'react-dom/client'
import Frame from 'react-frame-component';
import App from './App'

const widget_container = document.createElement('div');
widget_container.id = 'widget_fidbackhub';
document.body.appendChild(widget_container);

ReactDOM.createRoot(document.getElementById('widget_fidbackhub') as HTMLElement).render(
  <Frame>
    <App />
  </Frame>,
)