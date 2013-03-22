function ProductListCtrl($scope) {
  $scope.products = [
    {"name": "hotel1",
     "snippet": "Hotel Tier 1"},
    {"name": "package1",
     "snippet": "Package Tier 1"}
  ];
}

function BaseInfoCtrl($scope, $http) {
	$scope.url = '/info'; // The url of our search
	$scope.save = function() {
		$http.post($scope.url, { 
			"siteId" : $scope.siteId,
			"templateName" : $scope.templateName
			}).
	      success(function(data){
	          $scope.success = true;
	          $scope.msg = {};
	        }).
	        error(function(data){
	          $scope.httpError = true;
	        });
	}
}

function ProductDetailCtrl($scope, $routeParams) {
	  $scope.productId = $routeParams.productId;
	}

function ComponentCtrl($scope) {
	  
	}


//START ANGULAR DRAGDROP
var App = angular.module('SelfService', ['SelfService']);

App.controller('dragdropCtrl', function($scope, $timeout) {
  $scope.header = [];
  
  $scope.list5 = [
    { 'title': 'Item 1', 'drag': true },
    { 'title': 'Item 2', 'drag': true },
    { 'title': 'Item 3', 'drag': true },
    { 'title': 'Item 4', 'drag': true },
    { 'title': 'Item 5', 'drag': true },
    { 'title': 'Item 6', 'drag': true },
    { 'title': 'Item 7', 'drag': true },
    { 'title': 'Item 8', 'drag': true }
  ];

  // Limit items to be dropped in list1
  $scope.optionsHeader = {
    accept: function(dragEl) {
      if ($scope.header.length >= 3) {
        return false;
      } else {
        return true;
      }
    }
  };
});
//END ANGULAR DRAGDROP