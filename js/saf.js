/* saf */

angular.module('saf', [
    'ng-breadcrumbs', 'ngRoute', 'frapontillo.bootstrap-switch', 'saf.Home',
    'saf.Applications', 'saf.Applications.Configuration']).
config(['$routeProvider', function($routeProvider) {
    $routeProvider.otherwise({ redirectTo: '/' });
}]).
controller('safMainCtrl', ['$scope', 'breadcrumbs', function($scope, breadcrumbs) {
    $scope.breadcrumbs = breadcrumbs;
    console.log(breadcrumbs);
}]);
