(function() {
  'use strict';
  var PropItem = function(oItem) {
    this.propItem = oItem;
  };
  PropItem.prototype.init = function() {

  };

  angular.module('estate').directive('propertyItem', function() {
    return {
      scope: {
        propertyItem: '@',
        callbacks: '=',
        itemIdx: '@'
      },
      link: function(scope, element, attr) {
        scope.oItem = JSON.parse(scope.propertyItem);
        scope.$watch('propertyItem', function(newValue, oldValue) {
          scope.oItem = JSON.parse(newValue);
        });
        var oPropItem = new PropItem(scope.oItem);
        oPropItem.init();
        scope.deleteProp = function() {
          scope.callbacks.deleteProperty(scope.itemIdx);
        };
        scope.addProp = function() {
          scope.callbacks.addProperty(scope.itemIdx);
        };
      },
      templateUrl: 'app/directives/property_item.html'
    };
  });
})();