import React, { ReactNode } from 'react'
import ReactDOM from 'react-dom/client'
import Frame from 'react-frame-component';
import App from './App'

// @ts-ignore
const apiKey: string = document.getElementById("script_widget").getAttribute("data-key");

const widget_container = document.createElement('div');
widget_container.id = 'widget_fidbackhub';
document.body.appendChild(widget_container);
widget_container.style.position = "fixed";
widget_container.style.bottom = "0";
widget_container.style.right = "0";

const Head: ReactNode = <link
href="https://cdn.jsdelivr.net/npm/tailwindcss/dist/tailwind.min.css"
rel="stylesheet"
/>

ReactDOM.createRoot(document.getElementById('widget_fidbackhub') as HTMLElement).render(
  <Frame head={Head} height={500} width={384} style={{border: "none", backgroundColor: 'red'}}>
    <App apiKey={apiKey} />
  </Frame>,
)