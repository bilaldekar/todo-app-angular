var Service = require('node-windows').Service;

// Create a new service object
var svc = new Service({
  name:'todo',
  description: 'todo',
  script: 'C:\\work\\todo-app\\todo.js'
});

// Listen for the "install" event, which indicates the
// process is available as a service.
svc.on('install',function(){
  svc.start();
});

svc.install();