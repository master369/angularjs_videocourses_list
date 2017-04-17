(function () {
	'use strict';

	angular.module('app')
		.controller('coursesCtrl',

		function (modalService, coursesService) {
			var vm = this;
			vm.searchValue = '';
			vm.deleteCourse = function (item) {
				modalService.confirm({ header: 'Confirm', body: 'Delete course "' + item.name + '"?' })
					.then(function () {
						coursesService.deleteCourses({ id: item.id });
						vm.courses = coursesService.query();
					});
			};
			init();
			function init() {
				vm.courses = coursesService.query();
			}
		});
}());
