function ProductListCtrl($scope) {
  $scope.products = [
    {"name": "hotel1",
     "snippet": "Hotel Tier 1"},
    {"name": "package1",
     "snippet": "Package Tier 1"}
  ];
}

function BaseInfoCtrl($scope) {
	  $scope.baseFields = [

	  ];
}

function ProductDetailCtrl($scope, $routeParams) {
	  $scope.productId = $routeParams.productId;
	}