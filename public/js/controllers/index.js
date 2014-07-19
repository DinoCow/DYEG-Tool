'use strict';

angular.module('mean.system').controller('IndexController', ['$scope', '$http', 'Global', function ($scope, $http, Global) {
    $scope.global = Global;
    $scope.go = function(order) {
        window.location.href = '/#!/order/' + order._id;
    };

    var responsePromise = $http.get( window.location.origin + '/api/order');

    responsePromise.success(function(data, status){
        for(var i = 0; i < data.length; i++){
            data[i].dateCreated = new Date(data[i].dateCreated).toDateString();
        }
        $scope.orders = data;
       // console.log(data);
    });
    
}]);