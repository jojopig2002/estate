(function() {
  'use strict';

  describe('property_list_controller_test', function() {

    var createController,
      $scope,
      $rootScope;

    beforeEach(function() {

      module('propertList', function($provide) {
        $provide.value('ServerService', {
          getData: function() {
            return {
              then: function() {}
            };
          }
        });
      });

      inject(function($injector) {

        $rootScope = $injector.get('$rootScope');
        $scope = $rootScope.$new();
        var $controller = $injector.get('$controller');

        createController = function() {
          return $controller('PropertyListController', {
            $scope: $scope
          });
        };

      });

    });

    it('should add 1 property to saved set', function() {
      var controller = createController();
      controller.resultPropertyModel.push({
        itemData: 'property1',
        itemOption: {
          type: 'result'
        }
      });
      controller.resultPropertyModel.push({
        itemData: 'property2',
        itemOption: {
          type: 'result'
        }
      });
      controller.addProp(0);
      expect(controller.savedPropertyModel.length).toBe(1);
      expect(controller.savedPropertyModel[0].itemData).toBe('property1');
    });

    it('should delete 1 property to saved set', function() {
      var controller = createController();
      controller.savedPropertyModel.push({
        itemData: 'property1',
        itemOption: {
          type: 'result'
        }
      });
      controller.savedPropertyModel.push({
        itemData: 'property2',
        itemOption: {
          type: 'result'
        }
      });
      controller.deleteProp(0);
      expect(controller.savedPropertyModel.length).toBe(1);
      expect(controller.savedPropertyModel[0].itemData).toBe('property2');
    });
  });
})();