angular.module('saf.Applications', ['ngRoute', 'ng-breadcrumbs']).

config(['$routeProvider', function($routeProvider) {
    $routeProvider.when('/applications', {
        templateUrl: 'modules/applications/applications.html',
        controller: 'applicationsCtrl',
        label: 'Applications',
    });
}]).
controller('applicationsCtrl', ['$http', '$scope', function($http, $scope) {
    $scope.applications = [];
    $scope.errorText = '';
    $scope.search = '';

    $http.defaults.headers.common.Authorization = 'Basic YWRtaW46YWRtaW4=';

    $http({
        method: 'GET',
        url: '/api/af/latest/applications',
        data: 'foo',
    }).
    success(function(data, status, headers, config) {
        var applications = [];
        angular.forEach(data.applications, function(value, key) {
            value.uuid = key;
            applications.push(value);
        });
        $scope.errorText = '';
        $scope.applications = applications;
    }).
    error(function(data, status, headers, config) {
        $scope.errorText = 'Cannot get applications';
    });
}]);
