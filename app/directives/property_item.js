(function() {
  'use strict';
  var PropItem = function(oItem, actionCallbacks, oElement) {
    this.propItem = oItem;
    this.element = oElement;
    this.callbacks = actionCallbacks;
  };
  PropItem.prototype.init = function() {
    if (this.propItem.itemOption.dragOption) {
      //init draggable option for a media item
      this.propItem.itemOption.dragOption.helper = this.callbacks.dragHelper;
      this.propItem.itemOption.dragOption.start = this.callbacks.dragStart;
      this.propItem.itemOption.dragOption.stop = this.callbacks.dragStop;
      $(this.element).draggable(this.propItem.itemOption.dragOption);
    }
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
        var oPropItem = new PropItem(scope.oItem, scope.callbacks, element);
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