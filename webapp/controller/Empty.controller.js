sap.ui.define([
    'kpit/fin/ap/controller/BaseController'
], function(BaseController){
    'use strict';
    return BaseController.extend ("kpit.fin.ap.controller.Empthy",{
        onInit: function(){
                //if we want to call base class constructor
             BaseController.prototype.onInit.apply(this);
        }
    });
}
)