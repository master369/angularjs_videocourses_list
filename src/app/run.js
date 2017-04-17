(function () {
	'use strict';

	angular
		.module('app')
		.run(run);

	function run($rootScope, $state, $stateParams, loginService) {
		$rootScope.$on('$destroy',
			$rootScope.$on('$stateChangeStart', function (e, toState, toStateParams) {
			}));

		$rootScope.$state = $state;
		//$rootScope.$state = $state.get('shell.login');
		$rootScope.$stateParams = $stateParams;

		$rootScope.user = null;
		// check authorize
		$rootScope.$on('$destroy',
			$rootScope.$on('$stateChangeStart',
				function (event, toState, toParams, fromState, fromParams) {
					loginService.checkAccess(event, toState, toParams, fromState, fromParams);
				}
			));
	}
}());
