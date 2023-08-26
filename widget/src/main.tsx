import ReactDOM from 'react-dom/client';
import App from './App';

const apiKey: string = document.getElementById('script_widget')?.getAttribute('data-key') || '';

const widget_container = document.createElement('div');
widget_container.id = 'widget_fidbackhub';

document.body.appendChild(widget_container);

ReactDOM.createRoot(document.getElementById('widget_fidbackhub') as HTMLElement).render(<App apiKey={apiKey} />);
