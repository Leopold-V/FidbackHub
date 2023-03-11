import FidbackHub from './components/FidbackHub';
import React from 'react';
import ReactDOM from 'react-dom/client';
import Frame from 'react-frame-component';

const widget_container = document.createElement('div');
widget_container.id = 'widget_fidbackhub';
document.body.appendChild(widget_container);
widget_container.style.position = 'fixed';
widget_container.style.bottom = '0';
widget_container.style.right = '0';

ReactDOM.createRoot(document.getElementById('widget_fidbackhub') as HTMLElement).render(
  <Frame>
    <FidbackHub apiKey="OX3bW6wtUaz/9zmf0KWvLu/KrUgVswf2kZy0kNR+7lBRHzyp0l6VCNanJkbBmjd5N/rcdP99sc6mbXhxquZmFg==" />
  </Frame>,
);

//export default FidbackHub;
