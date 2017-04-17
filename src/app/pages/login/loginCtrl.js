(function () {
	'use strict';

	angular.module('app')
		.controller('loginCtrl',

		function ($scope, $state, sendLoginService, loginService) {
			var vm = this;
			vm.regexLogin = '[A-Za-z][A-Za-z]*';
			vm.regexPass = '[A-Za-z0-9][A-Za-z0-9]*';
			vm.user = {};
			vm.loginUser = function () {
				var item = {},
				user = {};
				item.userlogin = vm.user.login;
				item.password = vm.user.password;
				sendLoginService.save(item, function (data){
					user.login = data.login;
					user.password = data.password;
					user.isAuthorized = data.isAuthorized;
				loginService.setUserData(user);
				$state.go('shell.courses');
				});
			};

		});

}());
