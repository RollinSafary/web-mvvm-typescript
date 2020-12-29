import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import App from './App';
import AppFacade from './AppFacade';
import {
  disableConsoleFunctions,
  disableInspectElement,
  getMode,
} from './utils/Utils';

if (getMode() === 'production') {
  disableConsoleFunctions();
  disableInspectElement();
}

document.title = App.NAME;

window.onload = () => {
  AppFacade.getInstance();
};
