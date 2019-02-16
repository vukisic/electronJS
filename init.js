const $ = require('jquery');
const { remote } = require('electron');
const ipc = require('electron').ipcRenderer;
var window=remote.getCurrentWindow();
let counter=0;

var title=document.getElementById('title').innerHTML;
document.getElementById('titleShown').innerHTML=title;

const ul=document.querySelector('#tasks');

const deleteTodo = (e) => {
    ipc.send('delete', e.target.textContent)
  }

$('#close').click(function(){
    window.close();
});

$(document).ready(function(){
    ipc.send("todos");
});

$('#addBtn').click(function(){
    ipc.send('add');
    
});

$('#clearBtn').click(function(){
    ipc.send('clean');
    ul.innerHTML='';
});

ipc.on('item',function(e,todo){
    const todoList = document.getElementById('tasks');
    var html=`<li class="list-group-item">${todo}</li>`;
    todoList.innerHTML += html;
    todoList.querySelectorAll('.list-group-item').forEach(item => {
        item.addEventListener('dblclick', deleteTodo)
    });
});

ipc.on('todos', (event, todos) => {
    const todoList = document.getElementById('tasks');
    const todoItems = todos.reduce((html, todo) => {
      html += `<li class="list-group-item">${todo}</li>`
      return html
    }, '');
    todoList.innerHTML = todoItems;
    todoList.querySelectorAll('.list-group-item').forEach(item => {
        item.addEventListener('dblclick', deleteTodo)
      });
  });