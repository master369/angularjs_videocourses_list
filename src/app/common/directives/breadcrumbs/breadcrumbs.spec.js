/// <reference path="../../../testHelpers/_reference.js" />

/// <reference path="breadcrumbs.js" />
(function () {
    'use strict';

    describe('breadcrumbs', function () {
        beforeEach(module('app'));
        beforeEach(module('app.common'));
        beforeEach(module('ngMockE2E'));

        var scope,
            element;

        beforeEach(inject(function ($rootScope, $compile) {
            var html = '<ol class="breadcrumb"><li ng-repeat="crumb in breadcrumbs"  ng-class="{ active: $last }"><a ui-sref="{{ crumb.route }}" ng-if="!$last">{{ crumb.name  }}</a><span ng-show="$last">{{ crumb.name }}</span></li></ol>';
            scope = $rootScope.$new();
            scope.breadcrumbs = [{
                name: 'courses',
                route: 'shell.courses'
            },
            {
                name: 'course',
                route: 'shell.login'
            }];
            element = $compile(html)(scope);
        }));

        it('should correctly compile', function () {
            // Arrange
            expect(element).toBeDefined();
        });

    });
}());
