(function () {
    'use strict';

    angular.module('app')
        .controller('editCtrl',

        function ($scope, $stateParams, $state, coursesService, $rootScope) {
            var vm = this,
                currentId = +$stateParams.id;
            vm.default = {};
            vm.selectedAuthors = [];
            vm.selectedAllAuthors = [];
            vm.regex = '\\d\\d\.\\d\\d\.\\d\\d\\d\\d';
            vm.item = {};
            vm.getCourse = function (courseId) {
                coursesService.get({ id: courseId }, function (item) {
                    var course = item.course;
                    vm.allAuthors = item.authors;
                    vm.default = angular.copy(course);
                    vm.item = vm.default;
                    if (vm.item.authors.length !== 0){

                    vm.allAuthors = vm.allAuthors.reduce(function (prev, value) {

                        var isDuplicate = false;
                        for (var i = 0; i < vm.item.authors.length; i++) {
                            if (value.id === vm.item.authors[i].id) {
                                isDuplicate = true;
                                break;
                            }
                        }

                        if (!isDuplicate) {
                            prev.push(value);
                        }

                        return prev;

                    }, []);
                    }

                });
            };
            vm.submit = function (item) {
                if ($state.includes('shell.add')) {
                    coursesService.save({ id: 'new' }, item);
                }
                else {
                    coursesService.update(item);
                }
                $state.go('shell.courses');
            };
            vm.reset = function () {
                if (currentId) {
                    vm.item = vm.default;
                    vm.submit(vm.item);
                }
                $state.go('shell.courses');
            };
            vm.moveItems = function (items, from, to) {
                items.forEach(function (item) {
                    var idx = from.indexOf(item);
                    if (idx !== -1) {
                        from.splice(idx, 1);
                        to.push(item);
                    }
                });
            };
            init();
            function init() {
                var nameWatcher;
                if (currentId) {
                    vm.getCourse(currentId);
                }
                else {
                    vm.getCourse('new');
                }
                nameWatcher = $scope.$watch(function () { return vm.item.name; }, function (newValue, oldValue) {
                    $rootScope.$emit('changeName', newValue);
                });
                $scope.$on('$destroy', nameWatcher);
            }
        });
}());
