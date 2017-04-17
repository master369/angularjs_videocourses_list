(function () {
    'use strict';

    angular.module('app.common')
        .service('loginService', loginService);


    function loginService($injector, coursesService, $browser, $state) {
        var userData = {
            isAuthorized: false
        };
        this.checkAccess = function (event, toState, toParams, fromState, fromParams) {
              var user = userData;

            if (toState.data.noLogin !== false && toState.data.noLogin) {
            }
            // вход с авторизацией
            else if (user.isAuthorized) {
                // event.preventDefault();
            }

            else {
                // если пользователь не авторизован - отправляем на страницу авторизации
                event.preventDefault();
                $state.go('shell.login');
            }
        };

        return {
            getUserData: getUserData,
            changeAuthorized: changeAuthorized,
            checkAccess: this.checkAccess,
            setUserData: setUserData
        };
        function getUserData() {
            return userData;
        }

        function changeAuthorized(flag) {
            userData.isAuthorized = flag;
        }

        function setUserData(item) {
            userData = item;
        }
    }
}());
