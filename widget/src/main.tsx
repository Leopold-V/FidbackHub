import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'

const widget_container = document.createElement('div');
widget_container.id = 'widget_container_fidbackhub';
document.body.appendChild(widget_container);

ReactDOM.createRoot(document.getElementById('widget_container_fidbackhub') as HTMLElement).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)