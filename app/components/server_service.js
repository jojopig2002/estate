(function() {
  'use strict';
  angular.module('estate').factory('ServerService', function(
    $http,
    $q) {
    var service = {};
    service.getData = function(fileName) {
      var d = $q.defer();
      $http({
        method: 'GET',
        url: '/data.json'
      }).then(function(response) {
        d.resolve(response);
      });
      return d.promise;
    };
    return service;
  });
})();