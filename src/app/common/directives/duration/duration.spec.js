/// <reference path="../../../testHelpers/_reference.js" />

/// <reference path="duration.js" />
(function () {
	'use strict';

	describe('duration', function () {
		beforeEach(module('app'));
		beforeEach(module('app.common'));
		beforeEach(module('ngMockE2E'));

		var scope,
			element;

		beforeEach(inject(function ($rootScope, $compile, $filter) {
			var html = '<input id="inputDuration" placeholder="Duration" duration="timeFormatter" type="text" name="formDuration" class="form-control" ng-model="vm.item.duration" aria-describedby="basic-addon4" required/>';
			scope = $rootScope.$new();
            scope.timeFormatter = $filter('timeFormatter');
			element = $compile(html)(scope);
		}));

		it('should be compile', function () {
			// Arrange
			scope.$digest();
			// Assert
			expect(element.hasClass('ng-invalid')).toBe(true);
		});

	});
}());
