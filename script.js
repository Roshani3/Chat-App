var socket = io();
var messages = document.getElementById('messages');
var form = document.getElementById('form');
var input = document.getElementById('input');
var parent = document.getElementById('connected');
var chat = document.getElementById('chat');

const username=prompt("Enter username");
if(username=="" || username==null){
    alert("Enter valid name");
    location.reload();
}
else{
    socket.emit('new-user',username);
    
    socket.on('user-exist',(data)=>{
        alert('Useer '+data+' exist');
        location.reload();
    });
}
form.addEventListener('submit', function(e) {
  e.preventDefault();
  if (input.value) {
    if(parent.value==='Everyone'){
    socket.emit('chat message', {msg:input.value,userName:parent.value,user:username});
    }
    else{
    socket.emit('private message', {msg:input.value,userName:parent.value,user:username});
    }
    input.value = '';
   } 
});
socket.on('leave',(uname)=>{
  messages.innerHTML+=`<p class="user">${uname===username?"You":uname} : leave chat</p>`;
});
socket.on('add',(uname)=>{
  messages.innerHTML+=`<p class="user">${uname===username?"You":uname} : join chat</p>`
});
socket.on('connected-user',(data,uname)=>{
  
   
    parent.innerHTML = "";
   var op = document.createElement('option');
   op.innerText="Everyone";
   parent.appendChild(op);
   data.map((val,ind)=>{
    if(val!==username){
    var op = document.createElement('option');
    op.innerText=val;
    parent.appendChild(op);
}
   });

});
socket.on('everyone chat', function(obj) {
  
  if(obj.user===username){
    messages.innerHTML+=`<div class="sender"><span >you:</span> <div class="send-msg">${obj.msg}</div></div>`
  }else{
  messages.innerHTML+=`<div class="receive"><span>${obj.user}:</span><div class="receive-msg">${obj.msg}</div></div>`
  }
  // chat.scrollTo = chat.scrollHeight;
  chat.scrollTo(0, chat.scrollHeight);
});
socket.on('private message', function(obj) {
  if(obj.user===username){
    messages.innerHTML+=`<div class="sender"><span >you:</span> <div class="send-msg">${obj.msg}</div></div>`
  }else{
  messages.innerHTML+=`<div class="receive"><span>${obj.user}:</span><div class="receive-msg">${obj.msg}</div></div>`
  }
    // chat.scrollTo(0, document.body.scrollHeight);
    // chat.scrollTo = chat.scrollHeight;
    chat.scrollTo(0, chat.scrollHeight);
  });
