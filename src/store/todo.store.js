

import { Todo } from "../todos/models/todo.model";

export const Filters = {
    All:'all',
    Completed: 'Completed',
    Pending: 'Pending'
}

/* Definir el estado global */
const state = {
    todos: [
        new Todo('Piedra del alma'),
        new Todo('Pidera de fuego')
    ],
    filter: Filters.All
}

/* Init store */
const initStore = ()=> {
    loadStore()
    console.log('init Store');
}
/*  cargar lo que se encuentra en persistencia */
const loadStore = ()=>{
    if(!localStorage.getItem('state'))return
    /* Desestructuracion */
    const {todos = [],filter = Filters.All} = JSON.parse(localStorage.getItem('state'));
    state.todos = todos;
    state.filter = filter;
}

/* Persistencia */
const saveStateToLocalStorage = () =>{
    localStorage.setItem('state',JSON.stringify(state))
}

const getTodos = (filter=Filters.All)=>{
    switch(filter){
        case Filters.All:
            /* Enviar el contenido del arreglo */
            return [...state.todos];
        case Filters.Completed:
            /* Envia todos los que estan en true */
            return state.todos.filter(todo => todo.done)
        case Filters.Pending:
            /* Envia todos los que estan en false */
            return state.todos.filter(todo => !todo.done)
        default:
            throw new Error(`Opción ${filter} no permitida`)
    }
}

 /**
  * 
  * @param {String} description 
  */
const addTodo = (description)=>{
    if(!description) throw new Error('Descripción es requerida')
    state.todos.push(new Todo(description))
    saveStateToLocalStorage()
}

const toggleTodo = (todoId)=>{
    /* Barrer todos los todos */
    state.todos = state.todos.map( todo =>{
        if(todo.id === todoId){
            todo.done = !todo.done
        }
        return todo;
    })
    saveStateToLocalStorage();
}

const deleteTodo = (todoId)=>{
    state.todos = state.todos.filter(todo => todo.id !== todoId)
    saveStateToLocalStorage();
}
const deleteCompleted = ()=>{
    state.todos = state.todos.filter(todo => !todo.done)
    saveStateToLocalStorage();
}

/**
 * 
 * @param {Filters} newFilter 
 */
const setFilter = (newFilter = Filters.All)=>{
    state.filter = newFilter;
    saveStateToLocalStorage();
}

const getCurrentFilter = ()=>{
    return state.filter
}

export default {
    addTodo,
    deleteCompleted,
    deleteTodo,
    getCurrentFilter,
    getTodos,
    initStore,
    loadStore,
    setFilter,
    toggleTodo
}