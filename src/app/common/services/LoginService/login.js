(function () {
    'use strict';
    angular
        .module('app.common')
        .factory('sendLoginService', sendLoginService);

    function sendLoginService($resource) {
        return $resource('/api/login', {
        });
    }
}());
