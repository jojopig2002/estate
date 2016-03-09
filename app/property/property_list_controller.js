(function() {
  'use strict';
  angular.module('propertList', []).controller('PropertyListController', function(
    ServerService) {
    var self = this;
    self.resultPropertyModel = [];
    self.savedPropertyModel = [];


    loadItems();

    self.deleteProp = function(idx) {
      self.savedPropertyModel.splice(idx, 1);
    };

    self.addProp = function(idx) {
      var oItem = angular.copy(self.resultPropertyModel[idx]);
      oItem.itemOption.type = 'saved';
      self.savedPropertyModel.push(oItem);
    };

    self.actionCallbacks = {
      deleteProperty: self.deleteProp,
      addProperty: self.addProp
    };

    function loadItems() {
      ServerService.getData('data.json').then(function(response) {
        self.resultPropertyModel = generatePropItem(response.data.results, 'result');
        self.savedPropertyModel = generatePropItem(response.data.saved, 'saved');
      });
    }

    function generatePropItem(aItem, type) {
      var aResult = [];
      aItem.forEach(function(el) {
        aResult.push({
          itemData: el,
          itemOption: {
            type: type
          }
        });
      });
      return aResult;
    }
  });
})();