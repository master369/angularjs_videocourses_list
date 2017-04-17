(function () {
    'use strict';
    angular.module('app.common')
        .service('modalService', modalService);
    modalService.$inject = ['$modal'];
    function modalService($modal) {
        this.confirm = function (config) {
            return $modal.open({
                templateUrl: './app/modals/confirmModal.html',
                controller: 'confirmModalCtrl',
                controllerAs: 'vm',
                size: 'sm',
                resolve: {
                    header: function () {
                        return config.header;
                    },
                    body: function () {
                        return config.body;
                    }
                }
            }).result;
        };

    }
}());

