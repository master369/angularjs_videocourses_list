(function () {
    'use strict';

    angular//eslint-disable-line
        .module('app')
        .directive('breadcrumbs', function () {
            return {
                restrict: 'E',
                templateUrl: 'app/common/directives/breadcrumbs/breadcrumbs.html',
                scope: {
                    breadcrumbs: '='
                }
            };
        });
}());
