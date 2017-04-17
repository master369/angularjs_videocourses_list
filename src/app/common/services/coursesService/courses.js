(function () {
    'use strict';
    angular
        .module('app.common')
        .factory('coursesService', coursesService);

    function coursesService($resource) {
        return $resource('/api/courses/:id', { id: '@id' }, {
            'update': {
                method: 'PUT'
            },
            'deleteCourses': {
                method: 'DELETE'
            }
        });
    }
}());
