sap.ui.define([
    'kpit/fin/ap/controller/BaseController',
    'sap/m/MessageBox',
    'sap/m/MessageToast',
    'sap/ui/core/Fragment',
    'sap/ui/model/Filter',
    'sap/ui/model/FilterOperator'
    // 'sap/ui/core/routing/Router'
    
], function(BaseController,MessageBox,MessageToast,Fragment,Filter,FilterOperator){
    'use strict';
    return BaseController.extend("kpit.fin.ap.controller.View2",{
        onInit: function(){
            // step  1 get my router
            this.oRouter = this.getOwnerComponent().getRouter();
            //step 2 Register the RMH event
            this.oRouter.getRoute("detail").attachMatched(this.herculis.bind(this));
        },
        herculis: function(oEvent){
              //   debugger;
             // Extract the parameter
            var fruitId = oEvent.getParameter("arguments").fruitId;
            // Build the path again
            var sPath = "/" + fruitId;
            // perform element binding 
            this.getView().bindElement(sPath,{
                expand: 'ToSupplier'
            });


        },
        onSupplierSelect: function(oEvent){
            // step 1 Extract the path  of the  item
            var sPath = oEvent.getParameter("listItem").getBindingContextPath();
            // step 2 get the index of the supplier
            var sIndex = sPath.split("/")[sPath.split("/").length - 1];
            // step 3 use  router  to navigate 
            this.oRouter.navTo("supplier",{
                suppId: sIndex
            });

        },
        oSupplierpopup:null,
        onFilterSupplier: function(){
            // MessageBox.confirm("This functionality is under construction");
        if(!this.oSupplierpopup){
            Fragment.load({
                id: 'supplier',
                name:'kpit.fin.ap.fragments.popup',
                type: 'XML',
                controller: this
            }).then(function(oFragment){
                // set global variable when first line object is created 
                this.oSupplierpopup = oFragment;
                 // this object is acting like remote control 
                this.oSupplierpopup.setTitle("supplier");
                // Allowing access  of all models which view has acces to fragment 
                  this.getView().addDependent(this.oSupplierpopup,this);
                 // Dynamic binding with our fragment to show suplliers 
                this.oSupplierpopup.bindAggregation("items",{
                    path:'/supplier' ,
                    template: new  sap.m.ObjectListItem({
                        title:'{name}',
                        intro:'{city}',
                        icon:'sap-icon://supplier'
                    })
                });
                this.oSupplierpopup.setMultiSelect(true);
                this.oSupplierpopup.open();      
                

                
            } // explicitiy passing my controller object to the promise function
            .bind(this));
        }else{
            this.oSupplierpopup.open();
        }
        },
        oCityPopup:null,
        oFiled:null,
        onF4Help : function(oEvent){
            this.oFiled = oEvent.getSource();
           // MessageBox.confirm("This functionality is under construction");
            if(!this.oCityPopup){
                Fragment.load({
                    id: 'city',
                    name:'kpit.fin.ap.fragments.popup',
                    type: 'XML',
                    controller: this
                }).then(function(oFragment){
                    // set global variable when first line object is created 
                    this.oCityPopup = oFragment;
                     // this object is acting like remote control 
                    this.oCityPopup.setTitle("city");
                    // Allowing access  of all models which view has acces to fragment 
                      this.getView().addDependent(this.oCityPopup,this);
                     // Dynamic binding with our fragment to show suplliers 
                    this.oCityPopup.bindAggregation("items",{
                        path:'/cities' ,
                        template: new  sap.m.ObjectListItem({
                            title:'{name}',
                            intro:'{state}',
                            icon:'sap-icon://home'
                        })
                    });
                    this.oCityPopup.open();      
                    
    
                    
                } // explicitiy passing my controller object to the promise function
                .bind(this));
            }else{
                this.oCityPopup.open();
            }
        },
        //set value to the filed 
        onConfirm: function(oEvent){
             var sId = oEvent.getSource().getId();
             var aFilter = [];
             if(sId.indexOf("city") !== -1){
                var oSelectedItem = oEvent.getParameter("selectedItem");
                var sVal = oSelectedItem.getTitle();
                this.oFiled.setValue(sVal);
             }
             else{
                var aItems = oEvent.getParameter("selectedItems");
                for (let i = 0; i < aItems.length; i++) {
                    const element = aItems[i];
                    aFilter.push(new Filter("name",FilterOperator.EQ, element .getTitle()));
                } 
                var oFilter = new Filter({
                    filters: aFilter,
                    and: false
                });
                var oTable =  this.getView().byId("Suppliers");  
                oTable.getBinding("items").filter(oFilter);    


             }

        },
        onSave: function(){
            MessageBox.confirm(" Do you want to save ",{
                title: "Wow",
                onClose:function(status){
                    if(status === "OK"){
                       MessageToast.show("Your order has been saved");
                    }else{
                      MessageBox.alert("Cancelled");
                    
                    }
                }
            });
        },
        onCancel: function(){
            MessageBox.error("oops... action was cancelled");
            
        },
        onGoBack: function(){
            //MessageBox.confirm("this functionality is under construction");

            var oAppcon = this.getView().getParent();
            // Navigate  to  second view 
            oAppcon.to("idView1");
        }

    });
});