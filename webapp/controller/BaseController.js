sap.ui.define([
    'sap/ui/core/mvc/Controller',
    'kpit/fin/ap/util/Formatter'
], function(Controller,Formatter){
    'use strict';
    return Controller.extend("kpit.fin.ap.controller.BaseController",{
        // reUsable variable
        formatter:Formatter,
        saurabh: 3.14,
        myReuseFunction(){
           alert("just for testing purpose");
        },
        onInit: function(){
            console.log("I am base constuctor");
        }

    });
});