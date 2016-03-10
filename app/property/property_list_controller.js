(function() {
  'use strict';
  angular.module('propertList', []).controller('PropertyListController', function(
    $scope,
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
      oItem.itemOption.dragOption = null;
      self.savedPropertyModel.push(oItem);
    };

    self.dragHelper = function() {
      var clone = $(this).clone();
      // clone[0].remove(".label-default");
      return clone;
    };

    self.dragStart = function(e, ui) {
      // $rootScope.sortableActive = true;
      $scope.$apply();
    };

    self.dragStop = function(e, ui) {
      // $rootScope.sortableActive = false;
      $scope.$apply();
    };

    self.actionCallbacks = {
      deleteProperty: self.deleteProp,
      addProperty: self.addProp,
      dragHelper: self.dragHelper,
      dragStart: self.dragStart,
      dragStop: self.dragStop
    };

    $scope.$on('sortable-added', function(ev, val) {
      // create new item at position
      var oItem = angular.copy(self.resultPropertyModel[val.from]);
      oItem.itemOption.type = 'saved';
      oItem.itemOption.dragOption = null;
      self.savedPropertyModel.splice(val.to, 0, oItem);
    });

    $scope.$on('sortable-sorted', function(ev, val) {
      // rearrange $scope.items
      if (val.to == val.from) {
        return;
      }

      var oItem = self.savedPropertyModel.splice(val.from, 1)[0];
      self.savedPropertyModel.splice(val.to, 0, oItem);
    });

    function loadItems() {
      ServerService.getData('data.json').then(function(response) {
        self.resultPropertyModel = generatePropItem(response.data.results, 'result');
        self.savedPropertyModel = generatePropItem(response.data.saved, 'saved');
      });
    }

    function generatePropItem(aItem, type) {
      var aResult = [];
      var dragOption = {
        connectToSortable: '#property-panel-right-right',
        appendTo: 'body',
        revert: 'invalid'
      };
      aItem.forEach(function(el) {
        if (type === 'saved') {
          aResult.push({
            itemData: el,
            itemOption: {
              type: type,
              dragOption: null
            }
          });
        } else {
          aResult.push({
            itemData: el,
            itemOption: {
              type: type,
              dragOption: dragOption
            }
          });
        }
      });
      return aResult;
    }
  });
})();