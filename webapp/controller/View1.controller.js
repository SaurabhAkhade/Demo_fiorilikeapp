sap.ui.define(
  ["kpit/fin/ap/controller/BaseController", 
    "sap/m/MessageBox",
    "sap/ui/model/Filter",
    "sap/ui/model/FilterOperator"
  ],
  function (BaseController, MessageBox, Filter,FilterOperator) {
    "use strict";
    return BaseController.extend("kpit.fin.ap.controller.View1", {
      onInit: function () {
        this.oRouter = this.getOwnerComponent().getRouter();
        this.oRouter.getRoute("detail").attachMatched(this.herculis.bind(this));
      },
      herculis:function(oEvent){
        var fruitId = oEvent.getParameter("arguments").fruitId;
        // Build the path again
        var sPath = "/fruits/" + fruitId;
        // perform element binding 
        var oList = this.getView().byId("idList");
        var aItems = oList.getItems();
        for (let i = 0; i < aItems.length; i++) {
          const element = aItems[i];
          var sItemPath = element.getBindingContextPath();
          if(sItemPath === sPath)
            {
              oList.setSelectedItem(element);
              return;
            }
          
        }
        
      },
      onGoTo: function (sIndex) {

         this.oRouter.navTo("detail",{
             fruitId: sIndex,
         });

        // Get  the object  of mother (app container control )

       // var oAppcon = this.getView().getParent();
        // Navigate  to  second view
        //oAppcon.to("idView2");

        // MessageBox.confirm("this functionality is under construction");
      },

      onItemPress: function (oEvent) {
        // which item selected by user
        var oSelectedItem = oEvent.getParameter("listItem");

        // path of the element
        var sPath = oSelectedItem.getBindingContextPath();

        // get object of target which is view2

        //var oView2 = this.getView().getParent().getPages()[1];

        //splitApp 
        //var oView2 = this.getView().getParent().getParent().getDetailPages()[0];

        // perform element binding with view2
        //oView2.bindElement(sPath);

        //Ususally my path  look like this -/fruits/index

        //extract the index which is unique for every fruit
         var sIndex = sPath.split("/")[sPath.split("/").length - 1];

        this.onGoTo(sIndex);
      },
      onItemDelted: function (oEvent) {
        // Step 1: get object of item
        var oItemToBeDeleted = oEvent.getParameter("listItem");
        // Step 2: get the list control object
        this.getView().byId("idList");
        var oList = oEvent.getSource();
        // Step 3: perform deletion of the item
        oList.removeItem(oItemToBeDeleted);
      },
      onItemsDelete: function(){
        // step 1: get list object 
           var oList = this.getView().byId("idList");
        // step 2: get all the selected item on that list 
           var aSelItems = oList.getSelectedItems();
        // step 3: Loop at all these items 
           for (let i = 0; i< aSelItems.length; i++) {
            const element = aSelItems[i];
            // step 4: Delete each item one by one
            oList.removeItem(element);
             
           }
        

      },
      onSearch: function(oEvent){
         // step 1 what is the value user is searching
         var sVal = oEvent.getParameter("query");
         // step 2 Constrcust a filter object using model class
         // like a if condition OP1 Operator OP2 - name CONTAINS search_string 
         var oFilter = new Filter("CATEGORY",FilterOperator.Contains,sVal);
        //  var oFilterCol = new Filter("color",FilterOperator.Contains,sVal);
        //  // step 3  it is mandatory to add this filter or Multiple filter in an array 
        //  var aFilter =  [oFilter,oFilterCol];
        //  // Consturct a speical OR filter
        //  var oFilterMain = new Filter({
        //      filters: aFilter,
        //      and: false
        //  });
         // step 4 get filtering of list  for items 
         var oBinding = this.getView().byId("idList").getBinding("items");
         // step 5 apply the filter on our binding
         oBinding.filter(oFilter);
      },
      onAddProduct: function(){
        this.oRouter.navTo("add");
      }
    });
  }
);
