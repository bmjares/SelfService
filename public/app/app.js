angular.module('SelfService', []).
  config(['$routeProvider', function($routeProvider) {
  $routeProvider.
      when('/products', {templateUrl: 'assets/app/partials/product-list.html',   controller: ProductListCtrl}).
      when('/info', {templateUrl: 'assets/app/partials/base-info.html', controller: BaseInfoCtrl}).
      when('/header/:siteId', {templateUrl: 'assets/app/partials/components.html', controller: ComponentCtrl}).
      when('/products/:productId', {templateUrl: 'assets/app/partials/product-detail.html', controller: ProductDetailCtrl}).
      otherwise({redirectTo: '/products'});
}]);