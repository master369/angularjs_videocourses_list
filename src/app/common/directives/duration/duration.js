(function () {
    'use strict';

    angular
        .module('app')
        .directive('duration', duration);

    function duration($filter) {
        return {
            restrict: 'A',
            require: 'ngModel',
            link: function (scope, elem, attrs, ngModelCtrl) {
                var filterName = attrs.duration;
                var timeElem = angular.element('<span class="input-group-addon" id="basic-addon4">');
                elem.parent().append(timeElem);

                var watcherFunction = function () {
                    return ngModelCtrl.$modelValue;
                };

                scope.$on('$destroy',
                    scope.$watch(watcherFunction, function (newValue) {
                        var time = parseInt(newValue, 10) ? $filter(filterName)(newValue) : '';
                        timeElem.text(time);
                    }));
            }
        };
    }

}());
