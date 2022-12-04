/* Realizar importaciones en crudo */
import html from './app.html?raw';
import todoStore, { Filters } from '../store/todo.store'
import { renderTodos, renderPending } from './models/use-cases';


/* Crear variables de las clases */
const ElementId = {
    todoList: '.todo-list',
    NewTodoInput: '#new-todo-input',
    ClearCompletedButton: '.clear-completed',
    TodoFilters: '.filtro',
    PendingCountLabel: '#pending-count',
}

export const App = (elementId) => {

    const displayTodos = ()=>{
        const todos = todoStore.getTodos(todoStore.getCurrentFilter());
        renderTodos(ElementId.todoList, todos);
        updateCountPending
    }

    /* Conteo de los pendientes */
    const updateCountPending = () =>{
        renderPending(ElementId.PendingCountLabel);
    }

    /* Función app se llama con una funcion anonima */
    (()=>{
        const app = document.createElement('div');
        /* muestra el contenido HTML en la import html */
        app.innerHTML = html;
        document.querySelector(elementId).append(app);
        displayTodos()
    })();

    // Referencias HTML
    const newDescriptionInput = document.querySelector(ElementId.NewTodoInput);
    const todoListUl = document.querySelector(ElementId.todoList);
    const clearCompletedButton = document.querySelector(ElementId.ClearCompletedButton);
    const filtersUl = document.querySelectorAll(ElementId.TodoFilters)

    // Listeners
    newDescriptionInput.addEventListener('keyup', (event)=> {
        /* si oprimen enter que es igual a 13 retorna */
        if (event.keyCode != 13) return;
        /* si la longitud tiene espacios adelante y atras los quita con trim()
        si es igual a 0 retorna
        */
        if (event.target.value.trim().length === 0) return;
        
        /* Añadir el elemento */
        todoStore.addTodo(event.target.value);
        /* Mostrar todos los elementos */
        displayTodos();
        event.target.value = '';
    });

    todoListUl.addEventListener('click', (event)=>{
        /* Buscar el id de elemento */
        const element = event.target.closest('[data-id]');
        /* Enviar el id del elemento */
        todoStore.toggleTodo(element.getAttribute('data-id'))
        displayTodos()
    })
    todoListUl.addEventListener('click', (event)=>{
        const destroyElement = event.target.className === 'destroy';
        /* Buscar el id de elemento */
        const element = event.target.closest('[data-id]');
        if (!element || !destroyElement) return;
        /* Eliminar los elementos */
        todoStore.deleteTodo(element.getAttribute('data-id'))
        displayTodos();
        
    })
    /* Eliminar todos los completados */
    clearCompletedButton.addEventListener('click',()=>{
        todoStore.deleteCompleted();
        displayTodos();
    })

    filtersUl.forEach(element =>{
        element.addEventListener('click',(element)=>{
            /* Escoger la opcion todo-pendiente-completado */
            filtersUl.forEach(el=>{el.classList.remove('selected')})
            element.target.classList.add('selected');
            switch(element.target.text){
                case 'Todos':
                    todoStore.setFilter(Filters.All)
                break;
                case 'Completados':
                    todoStore.setFilter(Filters.Completed)
                break;
                case 'Pendientes':
                    todoStore.setFilter(Filters.Pending)
                break;
            }

            displayTodos()
        })
    })
}

