angular.module('saf.Applications.Configuration', ['ngRoute', 'ng-breadcrumbs']).

config(['$routeProvider', function($routeProvider) {
    $routeProvider.when('/applications/:uuid/config', {
        templateUrl: 'modules/application/config/config.html',
        controller: 'applicationConfigCtrl',
        label: 'Configuration',
    });
}]).

controller('applicationConfigCtrl', ['$routeParams', '$http', '$scope', function($routeParams, $http, $scope) {
    $http.defaults.headers.common.Authorization = 'Basic YWRtaW46YWRtaW4=';

    $scope.backup = {};                 // "old"-data
    $scope.data = {};                   // empty dict holding app data..
    $scope.changes = false;             // don't enable save button
    $scope.hostnameSearch = '';
    $scope.hostnameAdd = '';

    $scope.$watchCollection('data', function(newData, oldData) {
        if (! angular.equals(newData, $scope.backup)) {
            $scope.changes = true;
        }
    });

    $scope.removeHostname = function(index) {
        $scope.data.reduced_logging_hosts.splice(index, 1);
    };

    $scope.addHostname = function() {
        var hostname = $scope.hostnameAdd.trim();
        $scope.hostnameAdd = '';
        if (! angular.equals(hostname, '')) {
            $scope.data.reduced_logging_hosts.push(hostname);
        }
    };

    $scope.saveChanges = function() {
        $http({
            method: 'PUT',
            url: '/api/af/latest/applications/' + $routeParams.uuid,
            data: $scope.data,
        }).
        success(function(data, status, headers, config) {
            $scope.backup = angular.copy($scope.data);
            $scope.changes = false;
        }).
        error(function(data, status, headers, config) {
            $scope.changes = false;
            alert(data);
        });
    };

    $scope.revertChanges = function() {
        $scope.data = angular.copy($scope.backup);
        $scope.changes = false;
    };

    $http({
        method: 'GET',
        url: '/api/af/latest/applications/' + $routeParams.uuid,
    }).
    success(function(data, status, headers, config) {
        $scope.data = {};
        angular.forEach(['name', 'capability', 'default_charset', 'protected', 'reduced_logging_hosts', 'block_traffic', 'bypass_ruleset'], function(key) {
            $scope.data[key] = data[key];
        });
        $scope.backup = angular.copy($scope.data);
    }).
    error(function(data, status, headers, config) {
    });

}]);
