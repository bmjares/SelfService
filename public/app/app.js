

var app = angular.module('SelfService', ['ngDragDrop']);

app.config(['$routeProvider', function($routeProvider) {
	  $routeProvider.
	      when('/products', {templateUrl: 'assets/app/partials/product-list.html',   controller: ProductListCtrl}).
	      when('/info', {templateUrl: 'assets/app/partials/base-info.html', controller: BaseInfoCtrl}).
	      when('/test', {templateUrl: 'assets/app/partials/test-droppable.html', controller: BaseInfoCtrl}).
	      when('/header/:siteId', {templateUrl: 'assets/app/partials/components.html', controller: ComponentCtrl}).
	      when('/products/:productId', {templateUrl: 'assets/app/partials/product-detail.html', controller: ProductDetailCtrl}).
	      otherwise({redirectTo: '/products'});
	}]);



//START ANGULAR DRAGDROP
app.controller('oneCtrl', function($scope, $timeout) {
    $scope.list1 = [];
    $scope.list2 = [];
    $scope.list3 = [];
    $scope.list4 = [];
    
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
    $scope.optionsList1 = {
      accept: function(dragEl) {
        if ($scope.list1.length >= 2) {
          return false;
        } else {
          return true;
        }
      }
    };
    
      $scope.startCallback = function(event, ui) {
        console.log('You started draggin');
	  };
	
	  $scope.stopCallback = function(event, ui) {
	    console.log('Why did you stop draggin me?');
	  };
	
	  $scope.dragCallback = function(event, ui) {
	    console.log('hey, look I`m flying');
	  };
	
	  $scope.dropCallback = function(event, ui) {
	    console.log('hey, you dumped me :-(');
	  };
	
	  $scope.overCallback = function(event, ui) {
	    console.log('Look, I`m over you');
	  };
	
	  $scope.outCallback = function(event, ui) {
	    console.log('I`m not, hehe');
	  };
  });



app.controller('test', function($scope, $timeout) {
	  $scope.list1 = [{'title': 'Lolcat Shirt'},{'title': 'Cheezeburger Shirt'},{'title': 'Buckit Shirt'}];
	  $scope.list2 = [{'title': 'Zebra Striped'},{'title': 'Black Leather'},{'title': 'Alligator Leather'}];
	  $scope.list3 = [{'title': 'iPhone'},{'title': 'iPod'},{'title': 'iPad'}];

	  $scope.list4 = [];

	  $scope.hideMe = function() {
	    return $scope.list4.length > 0;
	  }
	  $scope.startCallback = function(event, ui) {
		    console.log('You started draggin');
	  };

	  $scope.stopCallback = function(event, ui) {
	    console.log('Why did you stop draggin me?');
	  };

	  $scope.dragCallback = function(event, ui) {
	    console.log('hey, look I`m flying');
	  };

	  $scope.dropCallback = function(event, ui) {
	    console.log('hey, you dumped me :-(');
	  };

	  $scope.overCallback = function(event, ui) {
	    console.log('Look, I`m over you');
	  };

	  $scope.outCallback = function(event, ui) {
	    console.log('I`m not, hehe');
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