(function () {
    'use strict';

    angular.module('app.common')
        .directive('courseitem', createCourseItem);

    function createCourseItem($state) {
        var directive = {
            restrict: 'E',
            replace: true,
            templateUrl: 'app/common/directives/coursesitem/courseitem.html',
            scope: {
                course: '=',
                deleteCourse: '&'
            }
        };
        return directive;
    }

}());
