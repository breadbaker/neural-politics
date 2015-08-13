'use strict';
// main entry point for the application

$.ajaxSetup({
    statusCode: {
        403: function(error, callback){
            window.location.pathname = '/web/call-limit.html';
        }
    }
});
var MainApp = require('./apps/main-app');
window.App = new MainApp();


App.initialize();