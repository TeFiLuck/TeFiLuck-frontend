import App from '@/App/App';
import '@/assets/styles/main.css';
import 'antd/dist/antd.dark.less';
import ReactDOM from 'react-dom';
import { registerSW } from 'virtual:pwa-register';

registerSW();

ReactDOM.render(<App />, document.querySelector('#root'));
