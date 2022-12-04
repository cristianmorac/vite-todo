import { Todo } from "../todo.model";
import { createTodoHTML } from "./create-todo-html";

/* GUardar en la variable el selector para ser consultado a futuro */
let element;
/**
 * 
 * @param {String} elementId 
 * @param {Todo} todos 
 */
export const renderTodos = (elementId,todos=[])=> {
    // TODO: referencia
    if(!element)
        element = document.querySelector(elementId);
    if (!element) throw new Error(`EL elemento ${elementId} no existe`)
    element.innerHTML = '';
    todos.forEach(todo=>{
        element.append( createTodoHTML(todo) )
    })
}