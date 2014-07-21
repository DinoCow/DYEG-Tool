'use strict';

angular.module('mean.system').controller('NewOrderController', ['$scope', '$http', 'Global', function ($scope, $http, Global) {
    $scope.global = Global;
    $scope.save = function(){
    	var recipient = {
    		gender: $scope.recipientGender, 
    		interests: $scope.interests.split(";"),
    		age: $scope.recipientAge
    	};

    	var gifter = {
    		gender: $scope.gender,
    		age: $scope.age,
    		name: $scope.name
    	};

    	var data = {
    		owner: $scope.owner, 
    		recipient: recipient,
    		gifter: gifter,
    		dueDate: new Date(Date.parse($scope.dueDate)).toString(),
    		info: $scope.info,
    		occasion: $scope.occasion
    	};

        var responsePromise = $http.put( window.location.origin + '/api/order/', data);
        responsePromise.success(function(data, status){
        	console.log(data);
        	if(status == 200){
        		window.location.href = '/#!/order/' + data.id;
        	} else {
        		alert("Failed to create order!");
        	}
        });
    }   
    

}]);
