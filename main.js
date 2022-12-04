import './style.css'
import {App} from './src/todos/app';

/* Importar initstore */
import todoStore from './src/store/todo.store';
todoStore.initStore()
/* id donde se va a renderizar el archivo app */
App('#app')
