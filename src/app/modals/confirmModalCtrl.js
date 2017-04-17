(function () {
	'use strict';

	angular.module('app')
		.controller('confirmModalCtrl',

		function (header, body, $modalInstance) {
			var vm = this;
            vm.header = header;
            vm.body = body;

            vm.ok = function () {
                $modalInstance.close();
            };
            vm.cancel = function () {
                 $modalInstance.dismiss();
            };
		});

}());
