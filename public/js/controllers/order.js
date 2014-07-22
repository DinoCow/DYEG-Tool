'use strict';

angular.module('mean.system').controller('OrderController', ['$scope', '$routeParams', '$http', 'Global', function ($scope, $routeParams, $http, Global) {
    $scope.global = Global;
  	var responsePromise = $http.get( window.location.origin + '/api/order/' + $routeParams.id);

    responsePromise.success(function(data, status){
    	//console.log(data);
    	data.dueDate = new Date(data.dueDate).toDateString();
    	data.recipient.interests = data.recipient.interests.join(';');
    	$scope.order = data;
    });

    var responsePromise = $http.get( window.location.origin + '/api/order/' + $routeParams.id + '/giftList');

    responsePromise.success(function(data, status){
        console.log(data);
        $scope.giftLists  = data;
    });
    
    $scope.AddGiftList= function(){
        var data = {
            name: $scope.giftListName
        };

        var responsePromise = $http.put( window.location.origin + '/api/order/' + $routeParams.id + '/giftList', data);
        responsePromise.success(function(data, status){
            console.log(data);
            if(status == 200){
                $scope.giftLists.push(data);
                $('#GiftList').modal('hide');
            } else {
                alert("Failed to create giftList!");
            }
        });
    }

    $scope.CompleteOrder = function(){
    	var responsePromise = $http.post( window.location.origin + '/api/order/' + $routeParams.id);

        responsePromise.success(function(data, status){
            //console.log(data);
            if(data.num == 1){
                $('#Complete').modal('hide');
                alert("Order set to completed!");
            } else {
                alert("error has occured");
            }
        });
    }

}]);
