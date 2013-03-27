

var app = angular.module('SelfService', ['ngDragDrop']);

//START ROUTING CONFIGURATION
app.config(['$routeProvider', function($routeProvider) {
	  $routeProvider.
	      when('/products', {templateUrl: 'assets/app/partials/product-list.html',   controller: ProductListCtrl}).
	      when('/info', {templateUrl: 'assets/app/partials/base-info.html', controller: BaseInfoCtrl}).
	      when('/header/:siteId', {templateUrl: 'assets/app/partials/components.html', controller: ComponentCtrl}).
	      when('/products/:productId', {templateUrl: 'assets/app/partials/product-detail.html', controller: ProductDetailCtrl}).
	      otherwise({redirectTo: '/products'});
	}]);
//END ROUTING CONFIGURATION


//START ANGULAR DRAGDROP
app.controller('dragdropCtrl', function($scope, $timeout) {
	  $scope.components = [{'class': 'componentWdgt'},{'class': 'componentImg'},{'class': 'componentTxt'}];

	  $scope.header = [];

	  $scope.hideMe = function() {
	    return $scope.header.length > 0;
	  }
	  
		// Limit items to be dropped in list1
		$scope.optionsHeader = {
		  accept: function(dragEl) {
		    if ($scope.header.length >= 2) {
		    	console.log($scope.header.length);
		      return false;
		    } else {
		    	console.log($scope.header.length);
		      return true;
		    }
		  }
		};
		
	  $scope.dropCallback = function(event, ui) {
		  //ui.draggable[0].className
		  $scope.components.push({'class': ui.helper.context.className});
	  };


});
//END ANGULAR DRAGDROP


//START CONTROLLERS
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
//END CONTROLLERS
	
	
//START CUSTOM DIRECTIVES
app.directive('dropZones', function() {
	  return {
	    restrict: 'E',
	    templateUrl : 'assets/app/partials/drop-container.html',
	    transclude : true
	  };
	});
	
	
//END CUSTOM DIRECTIVES