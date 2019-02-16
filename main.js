const electron = require('electron');
const url = require('url');
const path = require('path');
const ipc = require('electron').ipcMain;
const DataStore = require('./DataStore');
const todosData = new DataStore({ name: 'MainStorage' })

const{app,BrowserWindow}=electron;

let mainWindow;
let addWindow;

function createAddWindow()
{
    addWindow=new BrowserWindow({
        width: 400,
        height: 280,
        frame:false,
        resizable:false
    });

    addWindow.loadURL(url.format({
        pathname: path.join(__dirname,'add.html'),
        protocol: 'file:',
        slashes: true
    }));

    addWindow.on('close',function(){
        addWindow=null;
    })
}

ipc.on('add', (event, arg) => {
   createAddWindow();
});

ipc.on('clean', (event, arg) => {
    todosData.clear();
 });

ipc.on('delete', (event, todo) => {
    const updatedTodos = todosData.deleteTodo(todo).todos
    mainWindow.send('todos', updatedTodos)
 });

ipc.on('todos', (event, arg) => {
    mainWindow.send('todos', todosData.getTodos().todos);
 });

ipc.on('item', (e, item) => {
    mainWindow.webContents.send('item',item);
    todosData.addTodo(item);
    addWindow.close();
    addWindow=null;
 });

//Listen for app ready
app.on('ready',function(){
    
    //Create new Window
    mainWindow=new BrowserWindow({
        width: 800,
        height:600,
        frame: false,
        resizable: false
    });
/*
    //Load HTML
    mainWindow.loadURL(url.format({
        pathname: path.join(__dirname,'main.html'),
        protocol: 'file:',
        slashes: true
    }));
*/
    mainWindow.loadURL('https://gmail.com');

    //Quit app
    mainWindow.on('closed',function(){
        app.quit();
    });

});