
sap.ui.define([
        'sap/ui/core/UIComponent'
],function(UIComponent){
    'use strict';
    //my Component.js inherits from standard SAP UI5 class
    return UIComponent.extend("kpit.fin.ap.Component",{
        metadata:{
            manifest: "json"
        },
        init: function(){
                  // here we will call base class constructor -- prototype to invoke parent
                  UIComponent.prototype.init.apply(this);

                  //get the router object 
                  var oRoute = this.getRouter();

                  //call intilzation of the router
                  oRoute.initialize();
                   

        },
        // createContent: function(){

        //    // create the object of our Root view 
        //      var oView = new sap.ui.view({
        //         id:"idRoot",
        //         viewName: "kpit.fin.ap.view.App",
        //         type:"XML"
        //      });

        //      // create object of our view  = v1, v2
        //      var oView1 = new sap.ui.view({
        //         id:"idView1",
        //         viewName: "kpit.fin.ap.view.View1",
        //         type:"XML"
        //      });

        //      var oView2 = new sap.ui.view({
        //         id:"idView2",
        //         viewName: "kpit.fin.ap.view.View2",
        //         type:"XML"
        //      });             

        //      // Get the object of container control from Root view
        //       var oAppcon = oView.byId("idAppCon");
        //      // Inculcate(Add) the view1 and view2 to the Container control
        //     //  oAppcon.addPage(oView1).addPage(oView2);
                
        //         // splitAPP 
        //         oAppcon.addMasterPage(oView1).addDetailPage(oView2);
   
        //      return oView;






            // return new sap.m.Button({text:"kay zala"});
        // },
        destroy: function(){

        }

    });
});