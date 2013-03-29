

var app = angular.module('SelfService', ['ngDragDrop','selfserviceFilters']);

//ROOT SCOPE
app.factory('mySharedService', function($rootScope) {
    var sharedService = {};

    sharedService.count = 0;

    sharedService.prepForBroadcast = function(_count) {
        this.count = _count;
        this.broadcastItem();
    };

    sharedService.broadcastItem = function() {
        $rootScope.$broadcast('handleBroadcast');
    };

    return sharedService;
});
//END ROOT SCOPE

//START ROUTING CONFIGURATION
app.config(['$routeProvider', function($routeProvider) {
	  $routeProvider.
	      when('/info', {templateUrl: 'assets/app/partials/base-info.html', controller: BaseInfoCtrl}).
	      when('/header/:siteId', {templateUrl: 'assets/app/partials/components.html', controller: ComponentCtrl}).
	      otherwise({redirectTo: '/info'});
	}]);
//END ROUTING CONFIGURATION


//START ANGULAR DRAGDROP
app.controller('dragdropCtrl', function($scope, $timeout, $compile) {
	  $scope.components = [{'class': 'componentWdgt'},{'class': 'componentImg'},{'class': 'componentTxt'}];

	  $scope.header = [];
	  
	  $scope.buttons = [{'name':'Header','class': 'btnHeader','click':'addHeader'},
	                  {'name':'Products','class': 'btnProduct','click':'addProduct'},
	                  {'name':'Footer','class': 'btnFooter','click':'addFooter'}];

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
	  
	  //count for model index
	  $scope.header.editIndex = 0;
	  $scope.header.edit = function(i) { $scope.editIndex = i; }
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

//START FILTERS
angular.module('selfserviceFilters', []).filter('increment', function() {
	  return function() {
		  var count = 0;
		  count++;
		  console.log(count);
		 return $('.dropzone').attr('ng-model', ('header'+count));
//	    return "ng-model='header'";
	  };
	});
//END FILTERS

//START CONTROLLERS
function BaseInfoCtrl($scope, $http) {
	$scope.url = '/info';
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

function ComponentCtrl($scope) {
	  
}
//END CONTROLLERS