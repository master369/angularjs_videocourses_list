/// <reference path="../testHelpers/_reference.js" />
/// <reference path="shellCtrl.js" />
(function () {
	'use strict';

	describe('shellCtrl', function () {
		beforeEach(module('app'));
		beforeEach(module('app.common'));
		beforeEach(module('ngMockE2E'));

		var vm;

		beforeEach(inject(function ($controller, $rootScope) {
			var mockLoginService = {
				getUserData: function () {
					return {
					login: 'Admin',
					password: '123',
					isAuthorized: false
				};
				}
			},
			state = {
				params: {
					id: '1'
				},
				$current: {
					data: {
						name: 'edit'
					}
				}
			},

			mockCoursesService = {
				get: function(id) {
					var item = {
						course: {
							name: 'course1'
						}
					};
					return item;
				}
			};
			vm = $controller('shellCtrl', {
				$scope: $rootScope.$new(),
				$state: state,
				loginService: mockLoginService,
				$rootScope: $rootScope,
				coursesService: mockCoursesService

			});

		}));

		it('should propperly initialize', function () {
			// Assert
			expect(vm).toBeDefined();
			expect(vm.user).toBeDefined({
					login: 'Admin',
					password: '123',
					isAuthorized: false
				});
			expect(vm.checkLogin).toBeDefined(false);
		});

	});

}());
