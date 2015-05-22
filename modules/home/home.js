angular.module('saf.Home', ['ngRoute', 'ng-breadcrumbs']).

config(['$routeProvider', function($routeProvider) {
    $routeProvider.when('/', {
        templateUrl: 'modules/home/home.html',
        controller: 'homeCtrl',
        label: 'Home',
    });
}]).
controller('homeCtrl', [function() {

}]);
