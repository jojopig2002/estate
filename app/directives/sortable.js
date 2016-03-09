(function() {
  'use strict';

  angular.module('estate')
    .directive('sortable', function(
      $timeout
    ) {
      return {
        restrict: 'A',
        link: function(scope, el, attrs) {
          $(el).sortable({
            start: function(e, ui) {
              $(e.target).data('ui-sortable').floating = true;
            },
            revert: true,
            helper: 'clone',
            //appendTo: 'body',
            placeholder: 'tile-placeholder'
          });
          $(el).disableSelection();

          $(el).on('sortdeactivate', function(event, ui) {
            var from = angular.element(ui.item).scope().$index;
            var to = $(el).children().index(ui.item);
            // var type = angular.element(ui.item).data('type');
            if (to >= 0) {
              scope.$apply(function() {
                if (from >= 0) {
                  scope.$emit('sortable-sorted', {
                    from: from,
                    to: to
                  });
                } else {
                  scope.$emit('sortable-added', {
                    to: to,
                    from: $(ui.item).data('index')
                      //name: ui.item.text()
                  });
                  angular.element(ui.item).remove();
                }
              });
            }
          });
        }
      };
    });
})();