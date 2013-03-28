

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
app.controller('dragdropCtrl', function($scope, $timeout, $compile) {
	  $scope.components = [{'class': 'componentWdgt'},{'class': 'componentImg'},{'class': 'componentTxt'}];

	  $scope.header = [];
	  
	  $scope.drops = [{'name':'Header','class': 'btnHeader','click':'addHeader'},
	                  {'name':'Products','class': 'btnProduct','click':'addProduct'},
	                  {'name':'Footer','class': 'btnFooter','click':'addFooter'}];
	  
	  $scope.containers = [{'name':'Header','class': 'dropHeader','option':'optionsHeader'},
	                      {'name':'Products','class': 'dropProduct','option':'optionsProduct'},
	                      {'name':'Footer','class': 'dropFooter','option':'optionsFooter'}];

	  $scope.hideMe = function() {
	    return $scope.header.length > 0;
	  }
	  
		// Limit items to be dropped in list1
		$scope.optionsHeader = {
		  accept: function(dragEl) {
		    if ($scope.header.length >= 3) {
		    	//console.log($scope.header.length);
		      return false;
		    } else {
		    	//console.log($scope.header.length);
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

//START CUSTOM DIRECTIVES
app.directive('dropZones', function() {
	  return {
	    restrict: 'A',
	    replace: true,
	    templateUrl : 'assets/app/partials/drop-container.html',
	    transclude : true
	  };
	});

//called when add button is clicked
app.directive('addContainer', function($compile) {
	'use strict';
	return {
		//transclude : true,
        compile: function(tElement, tAttrs) {
            var t = '<div data-pop></div>';
            return function(scope, iElement) {
				iElement.bind('click', function() {
                    $('#dragdropContainer').append($compile(t)(scope));
                    scope.$apply()
                });
            };
        }
	};
});
//initiated from addContainer directive
app.directive('pop', function() {
    'use strict';
    return {
       transclude : true,
       templateUrl: 'assets/app/partials/drop-container.html'
    };
});
	
//END CUSTOM DIRECTIVES

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