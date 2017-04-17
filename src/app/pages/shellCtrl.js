(function () {
	'use strict';

	angular.module('app')
		.controller('shellCtrl',

		function ($scope, $state, loginService, $rootScope, coursesService) {
			var vm = this;
                vm.user = loginService.getUserData();
				vm.breadcrumbs = [];

			vm.logout = function () {
				loginService.changeAuthorized(false);
				$state.go('shell.login');
			};

			vm.checkLogin = function () {
				var state,
				user = loginService.getUserData();
				if (user.isAuthorized) {
					state = true;
                    vm.user = user;
				}
				else {
					state = false;
				}
				return state;
			};
			vm.checkBreadcrumbs = function () {
				var breadcrumbsWatcher,
                        nameWatcher;
                    vm.breadcrumbs = [];
                    if ($state.$current.name !== '') {
                        updateBreadcrumbsArray();
                    }
                    breadcrumbsWatcher = $scope.$on('$stateChangeSuccess', function () {
                        updateBreadcrumbsArray();
                    });
                    $scope.$on('$destroy', breadcrumbsWatcher);
                    nameWatcher = $rootScope.$on('changeName', function (event, data) {
                        if (vm.breadcrumbs.length > 1) {
                            var last = vm.breadcrumbs.slice(-1)[0];
                            last.name = data;
                        }
                    });
                    $scope.$on('$destroy', nameWatcher);


                    function updateBreadcrumbsArray() {
                        var workingState,
                            breadcrumbs = [];
                        workingState = $state.$current.name;
                        if ($state.$current.data.name !== false) {
                            breadcrumbs.push({
                                name: $state.$current.data.name,
                                route: workingState
                            });
                        }
                        breadcrumbs.reverse();
                        if ($state.$current.data.name !== 'Courses') {
                            var courseId,
                                course;
                            if ($state.$current.data.name === 'edit') {
								courseId = +$state.params.id;
                                coursesService.get({ id: courseId }, function (item) {
                                    course = item.course;
                                    if (typeof course !== 'undefined') {
                                        breadcrumbs = {
                                            name: course.name,
                                            route: workingState
                                        };
                                        vm.breadcrumbs.push(breadcrumbs);
                                    }
                                });
                            }
                            else if ($state.$current.data.name === 'new') {
                                breadcrumbs = {
                                    name: '',
                                    route: workingState
                                };
                                vm.breadcrumbs.push(breadcrumbs);
                            }
                            else if ($state.$current.data.name === false) {
                                vm.breadcrumbs = [];
                            }

                        }
                        else {
                            vm.breadcrumbs = breadcrumbs;
                        }
                    }
			};
			init();
			function init(){
				vm.checkBreadcrumbs();
			}
		});

}());
