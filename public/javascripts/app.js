
var _module = angular.module('coveo', []);

_module.config(function($routeProvider, $locationProvider){
    $locationProvider.html5Mode(false).hashPrefix('!');
    $routeProvider.
        when('/', {controller: SearchController, templateUrl: '/partials/search'});
});
