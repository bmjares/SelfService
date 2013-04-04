

var app = angular.module('SelfService', ['ngDragDrop']);

//START ANGULAR DRAGDROP
app.controller('dragdropCtrl', function($scope, $timeout, $compile) {
	  $scope.model = {};
	  $scope.model.components = [{'class': 'componentWdgt'},{'class': 'componentImg'},{'class': 'componentTxt'}];

	  $scope.model.header = [{'name':'header','class':[]}];
	  
	  $scope.model.containers = [{'name':'header','id':'1','components':[]},
	                       {'name':'header2','id':'2','components':[]}];
	  
	  $scope.buttons = [{'name':'Header','class': 'btnHeader','click':'addHeader'},
	                  {'name':'Products','class': 'btnProduct','click':'addProduct'},
	                  {'name':'Footer','class': 'btnFooter','click':'addFooter'}];

	  $scope.hideMe = function() {
	    return $scope.model.header.length > 0;
	  }
	  
		// Limit items to be dropped in header
		$scope.optionsHeader = {
		  accept: function(dragEl) {
		    if ($scope.model.header.length >= 3) {
		      return false;
		    } else {
		      return true;
		    }
		  }
		};
		
	  $scope.dropCallback = function(event, ui) {
		  //ui.draggable[0].className
		  $scope.model.header.push({'class' : ui.helper.context.className});
//		  for (var i = 0; i < $scope.model.header.length; i++) {
//			    if($scope.model.header[i].name) {
//			    	$scope.model.header[i].class.push({'class' : ui.helper.context.className});
//			    }
//			}

	  };
});
//END ANGULAR DRAGDROP

//START CUSTOM DIRECTIVES
app.directive('drops', function() {
	  var dragEl = angular.element("<span data-drag='true' ng-repeat='item in model.header' class=\"{{item.class}}\" jqyoui-draggable=\"{index: {{$index}}}\" data-jqyoui-options=\"{revert: 'invalid'}\">{{$index}}</span>");
	  return {
	    restrict: 'E',
	    replace: true,	    
//	    templateUrl : 'assets/app/partials/drop-container2.html',
	    template: "<section ng-repeat='container in model.containers'><h3 class='ui-widget-header'>{{container.name}}  index: {{$index}}</h3><div class='ui-widget-content'><div class='dropzone' data-drop='true' ng-model='model.containers' jqyoui-droppable=\"{onDrop: 'dropCallback'}\" data-jqyoui-options='optionsHeader'><dragholder></dragholder></div></div></section>",
	    compile: function(tElem) {
	    	tElem.append(dragEl);
	    }
	  };
	});


//app.directive('dragholder', function() {
//	  return {
//	    restrict: 'E',
//	    replace: true,	    
//	    template: "<span data-drag='true' ng-repeat='item in model.header' class=\"{{item.class}}\" jqyoui-draggable=\"{index: {{$index}}}\" data-jqyoui-options=\"{revert: 'invalid'}\">{{$index}}</span>"
//	  };
//	});

//END CUSTOM DIRECTIVES

//START CONTROLLERS
app.controller('BaseInfoCtrl', function($scope, $timeout, $http) {
	$scope.url = '/info';
	$scope.save = function() {
		$http.post($scope.url, { 
			"siteId" : $scope.siteId,
			"templateName" : $scope.templateName
			}).
	      success(function(data){
	          $scope.success = true;
	          $scope.msg = {};
	          redirectTo: '/header/'+$scope.siteId;
	        }).
	        error(function(data){
	          $scope.httpError = true;
	        });
	}
});
//END CONTROLLERS

//START ROUTING CONFIGURATION
app.config(['$routeProvider', function($routeProvider) {
	  $routeProvider.
	      when('/info', {templateUrl: 'assets/app/partials/base-info.html', controller: this.BaseInfoCtrl}).
	      when('/header/:siteId', {templateUrl: 'assets/app/partials/components2.html', controller: this.dragdropCtrl}).
	      otherwise({redirectTo: '/info'});
	}]);
//END ROUTING CONFIGURATION