(function () {
    'use strict';
    angular
        .module('app.backend')
        .run(runBlock);

    function runBlock($httpBackend) {
        var courses = [
            {
                id: '1',
                name: 'Course 1',
                dateCreation: '21.12.2001',
                description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras erat nisl, iaculis vitae felis sed, scelerisque molestie lorem. Morbi accumsan sed urna eget consequat. Nunc quam nulla, lacinia ut tempor vel, venenatis a libero. Quisque nec ipsum ornare, convallis massa eu, aliquet tellus. Nam fermentum tellus id mi bibendum viverra. Cras et diam nulla. Nullam nec mauris nulla. In placerat quam quis accumsan accumsan. Quisque convallis posuere sapien eu tempor. Sed tristique lobortis ligula eu ornare.',
                duration: '360',
                authors: [
                    {
                        'id': '1',
                        'name': 'Author 1'
                    },
                    {
                        'id': '2',
                        'name': 'Author 2'
                    }
                ]
            },
            {
                id: '2',
                name: 'Course 2',
                dateCreation: '01.01.2014',
                description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras erat nisl, iaculis vitae felis sed, scelerisque molestie lorem. Morbi accumsan sed urna eget consequat. Nunc quam nulla, lacinia ut tempor vel, venenatis a libero. Quisque nec ipsum ornare, convallis massa eu, aliquet tellus. Nam fermentum tellus id mi bibendum viverra. Cras et diam nulla. Nullam nec mauris nulla. In placerat quam quis accumsan accumsan. Quisque convallis posuere sapien eu tempor. Sed tristique lobortis ligula eu ornare.',
                duration: '244',
                authors: [
                    {
                        'id': '3',
                        'name': 'Author 3'
                    },
                    {
                        'id': '4',
                        'name': 'Author 4'
                    }
                ]
            },
            {
                id: '3',
                name: 'Course 3',
                dateCreation: '21.02.2003',
                description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras erat nisl, iaculis vitae felis sed, scelerisque molestie lorem. Morbi accumsan sed urna eget consequat. Nunc quam nulla, lacinia ut tempor vel, venenatis a libero. Quisque nec ipsum ornare, convallis massa eu, aliquet tellus. Nam fermentum tellus id mi bibendum viverra. Cras et diam nulla. Nullam nec mauris nulla. In placerat quam quis accumsan accumsan. Quisque convallis posuere sapien eu tempor. Sed tristique lobortis ligula eu ornare.',
                duration: '128',
                authors: [
                    {
                        'id': '1',
                        'name': 'Author 1'
                    },
                    {
                        'id': '2',
                        'name': 'Author 2'
                    },
                    {
                        'id': '3',
                        'name': 'Author 3'
                    },
                    {
                        'id': '4',
                        'name': 'Author 4'
                    }
                ]
            }
        ],
        authors = [
                {
                    id: '1',
                    name: 'Author 1'
                },
                {
                    id: '2',
                    name: 'Author 2'
                },
                {
                    id: '3',
                    name: 'Author 3'
                },
                {
                    id: '4',
                    name: 'Author 4'
                },
                {
                    id: '5',
                    name: 'Author 5'
                }
            ],
            userData = {
				login: 'Admin',
				password: '123',
				isAuthorized: false
			},
            courseId = 10;

        $httpBackend.whenGET(/api\/courses$/)
            .respond(function () {
                return [200, courses];
            });

        $httpBackend.whenDELETE(/api\/courses\/(\d+)$/)
            .respond(function (method, url, data, headers) {
                var id = url.match(/api\/courses\/(\d+)/)[1],
                    res;
                res = deleteCourses(id);
                if (res) {
                    return [204, {}];
                }
                return [404, {}];
            });

        $httpBackend.whenGET(/api\/courses\/(\d+)/)
            .respond(function (method, url, data, headers) {
                var dataID = url.match(/api\/courses\/(\d+)/),
                    course = {},
                    id;

                if (data !== null) {
                    id = dataID[1];
                }

                if (angular.isUndefined(id)) {
                    course.course = {
                        id: 'new',
                        name: '',
                        dateCreation: '',
                        description: '',
                        duration: '',
                        authors: []
                    };
                }
                else {
                    course.course = getCourseById(id);
                }
                course.authors = getAllAuthors();
                if (angular.isUndefined(course)) {
                    return [404, undefined];
                }
                return [200, course];
            });

            $httpBackend.whenGET(/api\/courses\/(new)/)
            .respond(function (method, url, data, headers) {
                var course = {};
                    course.course = {
                        id: 'new',
                        name: '',
                        dateCreation: '',
                        description: '',
                        duration: '',
                        authors: []
                    };
                course.authors = getAllAuthors();
                if (angular.isUndefined(course)) {
                    return [404, undefined];
                }
                return [200, course];
            });


        $httpBackend.whenPUT(/api\/courses\/(\d+)/)
            .respond(function (method, url, data, headers) {
                var id = url.match(/api\/courses\/(\d+)/)[1],
                    course = angular.fromJson(data);

                course = editCourse(id, course);
                if (angular.isUndefined(course)) {
                    return [404, undefined];
                }
                return [200, course];
            });

            $httpBackend.whenPOST(/api\/login/)
            .respond(function (method, url, data, headers) {
                var enterData = angular.fromJson(data),
                    user;

                user = getData();

                if (user.login === enterData.userlogin && user.password === enterData.password) {
                    userData.isAuthorized = true;
                    return [200, user];
                }
                return [401];
            });

        $httpBackend.whenPOST(/api\/courses\/(new)/)
            .respond(function (method, url, data, headers) {
                var course = angular.fromJson(data),
                    res;

                res = addCourse(course);
                if (res) {
                    return [200];
                }
                return [500];
            });

        function addCourse(course) {
            var coursesLength = courses.length;
            course.id = getLastId() + '';
            courses[coursesLength] = course;
            return true;
        }

        function getCourseById(id) {
            return _.find(courses, function (o) { return o.id === id; });
        }

        function editCourse(id, course) {
            var index = _.findIndex(courses, function (o) { return o.id === id; });
            if (angular.isUndefined(index)) {
                return undefined;
            }
            courses[index] = course;
            return courses[index];
        }

        function deleteCourses(id) {
            courses = _.remove(courses, function (n) {
                return n.id !== id;
            });
            return true;
        }

        function getAllAuthors() {
            return authors;
        }

        function getData() {
            return userData;
        }
        function getLastId () {
            courseId++;
            return courseId;
        }
    }
}());
