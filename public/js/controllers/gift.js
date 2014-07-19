'use strict';

angular.module('mean.system').controller('GiftController', ['$scope','$http', 'Global', function ($scope, $http, Global) {
    $scope.global = Global;
    var gifts = "B002LRTM0O,B0011MKW6I,B0088BMYN4,B00IYA2RAY,B00GW115SW,B00GOZE632,B00G9N3I7O,B007474Y04,B00FH9I0FQ,B00DR0PDNE",
        url =  window.location.origin + '/gift?itemId=';
    
    url = url + gifts;
    var responsePromise = $http.get(url);


    responsePromise.success(function(data, status){
      $scope.gifts = data.Item;
      console.log(data);
    });
}]);
