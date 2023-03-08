import FidbackHub from './components/FidbackHub';
import React from 'react';
import ReactDOM from 'react-dom/client';

const widget_container = document.createElement('div');
widget_container.id = 'widget_container_fidbackhub';
document.body.appendChild(widget_container);

ReactDOM.createRoot(document.getElementById('widget_container_fidbackhub') as HTMLElement).render(
  <React.StrictMode>
    <FidbackHub apiKey="OX3bW6wtUaz/9zmf0KWvLu/KrUgVswf2kZy0kNR+7lBRHzyp0l6VCNanJkbBmjd5N/rcdP99sc6mbXhxquZmFg==" />
  </React.StrictMode>,
);
