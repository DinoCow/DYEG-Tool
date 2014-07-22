'use strict';

//Setting up route
angular.module('mean').config(['$routeProvider',
    function($routeProvider) {
        $routeProvider.
        when('/', {
            templateUrl: 'views/index.html'
        }).
        when('/order/new',{
            templateUrl: 'views/neworder.html'
        }).
        when('/order/:id', {
            templateUrl: 'views/order.html'
        }).
        when('/order/:orderId/giftList/:giftListId', {
            templateUrl: 'views/giftList.html'
        }).
        otherwise({
            redirectTo: '/'
        });
    }
]);

//Setting HTML5 Location Mode
angular.module('mean').config(['$locationProvider',
    function($locationProvider) {
        $locationProvider.hashPrefix('!');
    }
]);
