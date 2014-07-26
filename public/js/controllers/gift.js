'use strict';

angular.module('mean.system').controller('GiftController', ['$scope','$http', '$routeParams', 'Global', function ($scope, $http, $routeParams, Global) {
    $scope.global = Global;
    $scope.orderId = $routeParams.orderId;
    var responsePromise = $http.get( window.location.origin + '/api/order/' + $routeParams.orderId + '/giftList/' + $routeParams.giftListId);

    responsePromise.success(function(data, status){
    	console.log(data);
    	$scope.giftList = data.gifts;
    	$scope.name = data.name;
    });

    $scope.search = function(){
    	$scope.page = 1;
   	    var responsePromise = $http.get( window.location.origin + '/api/gift?Keywords=' + $scope.searchTerm + "&" + $scope.page);

    	responsePromise.success(function(data, status){
    		var Item = data.Item;
    		console.log(data);

    		for(var i = 0; i < Item.length; i++){
    			if (Item[i].ItemAttributes && Item[i].ItemAttributes.Title.length > 30){
            		Item[i].ItemAttributes.Title = Item[i].ItemAttributes.Title.substr(0, 30).concat("...") ;
        		}
        	}
   	 		$scope.searchedGift = Item;
   	 		$scope.totalPage = data.TotalPages;
    	});
    }

    $scope.nextpage = function(){
    	$scope.page = $scope.page + 1;
   	    var responsePromise = $http.get( window.location.origin + '/api/gift?Keywords=' + $scope.searchTerm + "&ItemPage=" + $scope.page);

    	responsePromise.success(function(data, status){
    		var Item = data.Item;
    		console.log(data);

    		for(var i = 0; i < Item.length; i++){
    			if (Item[i].ItemAttributes && Item[i].ItemAttributes.Title.length > 30){
            		Item[i].ItemAttributes.Title = Item[i].ItemAttributes.Title.substr(0, 30).concat("...") ;
        		}
        	}
   	 		$scope.searchedGift = Item;
   	 		$('html, body').animate({ scrollTop: 200 }, 'fast');
    	});
    }

    $scope.addToList = function(item){
    	var data = {
            name: item.ItemAttributes.Title,
            asin: item.ASIN,
            url: item.DetailPageURL,
            thumbnail: item.MediumImage.URL,
            price: item.ItemAttributes.ListPrice.FormattedPrice
        };

        var responsePromise = $http.put( window.location.origin + '/api/giftList/' + $routeParams.giftListId + '/gift', data);
        responsePromise.success(function(data, status){
            console.log(data);
            if(status == 200){
                $scope.giftList.push(data);
                alert("Added successfully!")
            } else {
                alert("Failed to create giftList!");
            }
        });
    }

    $scope.remove = function(item){
        var responsePromise = $http.delete( window.location.origin + '/api/giftList/' + $routeParams.giftListId + '/gift?giftId=' + item._id);
        responsePromise.success(function(data, status){
            if(status == 200){

                var responsePromise = $http.get( window.location.origin + '/api/order/' + $routeParams.orderId + '/giftList/' + $routeParams.giftListId);

                responsePromise.success(function(data, status){
                    console.log(data);
                    $scope.giftList = data.gifts;
                    $scope.name = data.name;
                });
            } else {
                alert("Failed to create giftList!");
            }
        });


    }

    $scope.showNext = function(){
    	return $scope.page >=1 && $scope.page < $scope.totalPage;
    }

    $scope.showItem = function(item){
        return item.ItemAttributes && item.DetailPageURL && item.MediumImage && item.ItemAttributes.Title && item.ItemAttributes.ListPrice;
    }

}]);
