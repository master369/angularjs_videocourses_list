(function () {
	'use strict';

	angular
		.module('app')
		.config(routes);

	function routes($stateProvider, $urlRouterProvider) {

		$stateProvider
			.state('shell', {
				url: '',
				abstract: true,
				controller: 'shellCtrl',
				controllerAs: 'vm',
				templateUrl: 'app/pages/shell.html'
			})
			.state('shell.login', {
				url: '/login',
				templateUrl: 'app/pages/login/login.html',
				controller: 'loginCtrl',
				controllerAs: 'vm',
				title: 'login',
				data: {
					noLogin: true,
					name: false
				}
			})
			.state('shell.add', {
				url: '/courses/new',
				templateUrl: 'app/pages/editcourses/editcourses.html',
				controller: 'editCtrl',
				controllerAs: 'vm',
				title: 'add',
				data: {
					noLogin: false,
					name: 'new'
				}
			})
			.state('shell.edit', {
				url: '/courses/:id',
				templateUrl: 'app/pages/editcourses/editcourses.html',
				controller: 'editCtrl',
				controllerAs: 'vm',
				title: 'edit',
				params: {
					id: {
						value: ''
					}
				},
				data: {
					noLogin: false,
					name: 'edit'
				}
			})
			.state('shell.courses', {
				url: '/courses',
				templateUrl: 'app/pages/courses/courses.html',
				controller: 'coursesCtrl',
				controllerAs: 'vm',
				title: 'courses',
				data: {
					noLogin: false,
					name: 'Courses'
				}
			});

		$urlRouterProvider.otherwise(function ($injector, $location) {
			var $state = $injector.get('$state');
			$state.go('shell.courses');
		});
	}
}());
