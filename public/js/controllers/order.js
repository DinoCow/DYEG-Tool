'use strict';

angular.module('mean.system').controller('OrderController', ['$scope', '$routeParams', '$http', 'Global', function ($scope, $routeParams, $http, Global) {
    $scope.global = Global;
  	var responsePromise = $http.get( window.location.origin + '/api/order/' + $routeParams.id);

    responsePromise.success(function(data, status){
    	console.log(data);
    	data.dueDate = new Date(data.dueDate).toDateString();
    	data.recipient.interests = data.recipient.interests.join(';');
    	$scope.order = data;
    });

}]);
