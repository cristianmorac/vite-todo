import { Todo } from "../todo.model";

/**
 * 
 * @param {Todo} todo 
 */
export const createTodoHTML = (todo) =>{
    if (!todo) throw new Error('El objeto Todo es requerido')
    /* desestructurar el todo */
    const {done,id,description} = todo;
    const html = `
    <div class="view">
        <!-- SI es verdad pone checked, si no lo deja vacio -->
        <input class="toggle" type="checkbox" ${ done ? 'checked' : '' }>
        <label>${description}</label>
        <button class="destroy"></button>
    </div>
    <input class="edit" value="Create a TodoMVC template">
    `;
    const liElement = document.createElement('li')
    liElement.innerHTML = html
    /* Colocar el id en el li */
    liElement.setAttribute('data-id',id)
    /* Agregar la clase al li */
    if (done)
        liElement.classList.add('completed')
    return liElement;
}