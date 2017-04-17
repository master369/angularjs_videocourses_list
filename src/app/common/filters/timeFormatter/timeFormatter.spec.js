/// <reference path="../../../testHelpers/_reference.js" />

/// <reference path="timeFormatter.js" />

(function () {
	'use strict';

	describe('timeFormatter', function () {
		beforeEach(module('app'));
		beforeEach(module('app.common'));
		beforeEach(module('ngMockE2E'));

		var timeFormatter;

		beforeEach(inject(function ($filter) {
			timeFormatter = $filter('timeFormatter');
		}));

		it('should be correctly created', function () {
			expect(timeFormatter).toBeDefined();
		});

		it('should correctly convert to full time format', function () {
			// Arrange
            var onlyHours = 362,
                withMinuts = 135,
                withOneMinut = 61;
            expect(timeFormatter(onlyHours)).toEqual('6 часов 2 минуты');
            expect(timeFormatter(withMinuts)).toEqual('2 часа 15 минут');
            expect(timeFormatter(withOneMinut)).toEqual('1 час 1 минута');
			// Assert
		});

	});
}());
