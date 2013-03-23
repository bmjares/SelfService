

var app = angular.module('SelfService', ['ngDragDrop']);

app.config(['$routeProvider', function($routeProvider) {
	  $routeProvider.
	      when('/products', {templateUrl: 'assets/app/partials/product-list.html',   controller: ProductListCtrl}).
	      when('/info', {templateUrl: 'assets/app/partials/base-info.html', controller: BaseInfoCtrl}).
	      when('/header/:siteId', {templateUrl: 'assets/app/partials/components.html', controller: ComponentCtrl}).
	      when('/products/:productId', {templateUrl: 'assets/app/partials/product-detail.html', controller: ProductDetailCtrl}).
	      otherwise({redirectTo: '/products'});
	}]);



//START ANGULAR DRAGDROP
app.controller('dragdropCtrl', function($scope, $timeout) {
    $scope.header = [];
    $scope.list2 = [];
    $scope.list3 = [];
    $scope.list4 = [];
    
    $scope.list5 = [
      { 'title': 'Widget', 'drag': true },
      { 'title': 'Image', 'drag': true },
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
        if ($scope.header.length >= 2) {
        	console.log($scope.header.length);
          return false;
        } else {
        	console.log($scope.header.length);
          return true;
        }
      }
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