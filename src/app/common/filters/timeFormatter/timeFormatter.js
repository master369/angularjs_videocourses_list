(function () {
    'use strict';

    angular.module('app')
        .filter('timeFormatter', function () {
            return function (str) {
                if (angular.isUndefined(str) && isNaN(parseInt(str, 10))) {
                    return str;
                }
                var min = parseInt(str, 10),
                textHour = ['час', 'часа', 'часов'],
                textMinutes = ['минута', 'минуты', 'минут'],
                hours = Math.floor(min / 60),
                time = hours !== 0 ? min % 60 : min,
                output = '';

                if (hours) {
                    output = calcCurrentTime(hours, textHour);
                    if (time) {
                        output = calcCurrentTime(hours, textHour) + ' ' + calcCurrentTime(time, textMinutes);
                    }
                }
                else {
                    output += ' ' + calcCurrentTime(time, textMinutes);
                }

                function calcCurrentTime(value, array) {
                    var result = '';
                    var rest = value % 10;

                    if (value >= 10 && value <= 20) {
                       return result = value + ' ' + array[2];//eslint-disable-line
                    }

                    if (rest > 1 && rest < 5) {
                        result = value + ' ' + array[1];
                    }
                    else if (rest === 1) {
                        result = value + ' ' + array[0];
                    }
                    else {
                        result = value + ' ' + array[2];
                    }

                    return result;
                }

                return output;
            };
        });
}());

