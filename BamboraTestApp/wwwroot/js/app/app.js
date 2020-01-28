var paymentApp = angular.module('paymentTestApp', []);

paymentApp.controller('paymentController', ['$scope', function ($scope) {
    $scope.toggle = false;
    $scope.toggleForm = function () {
        $scope.toggle = !$scope.toggle;   
    };
}]);
