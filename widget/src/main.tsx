//@ts-nocheck
import ReactDOM from 'react-dom/client';
import App from './App';

const screenshot: string = document.getElementById('script_widget')?.getAttribute('data-screenshot') || null;
const video: string = document.getElementById('script_widget')?.getAttribute('data-video') || null;
const widget_container = document.createElement('div');
widget_container.id = 'widget_fidbackhub';
document.body.appendChild(widget_container);

ReactDOM.createRoot(document.getElementById('widget_fidbackhub') as HTMLElement).render(
  <App screenshot={screenshot} video={video} />,
);
