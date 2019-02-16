const $ = require('jquery');
const { remote } = require('electron');
const ipc = require('electron').ipcRenderer;
var window=remote.getCurrentWindow();

var title=document.getElementById('title').innerHTML;
document.getElementById('titleShown').innerHTML=title;

$('#subBtn').click(function(e){
    e.preventDefault();
    const item=document.querySelector('#item').value;
    ipc.send('item',item);
});

$('#close').click(function(){
    window.close();
});