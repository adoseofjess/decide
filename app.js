(function() {
	var app = angular.module("decide", []);

	app.controller('ProsConsController', ['$scope', function($scope){
		$scope.prosOrCons = [];
		$scope.weights = [
			{description: 'Very important', number: 3},
			{description: 'Somewhat important', number: 2},
			{description: 'Not that important', number: 1}
		];
		$scope.choiceOne = "";
		$scope.choiceTwo = "";
		$scope.answer = null;
		$scope.weighted = 0;

		$scope.add = function(reason, type){
			$scope.reason.type = type;
			$scope.reason.weight = $scope.weights[0]
			$scope.prosOrCons.push($scope.reason);
			$scope.reason = null;
			$scope.calculate();
		};

		$scope.calculate = function(){
			$scope.weighted = 0
			angular.forEach($scope.prosOrCons, function(value, key){
				var multiplier = (value.type === 'pro' ? 1 : -1);
				$scope.weighted = $scope.weighted + (multiplier * value.weight.number);
			});
			if ($scope.weighted > 0) {
				$scope.answer = "Go with " + $scope.choiceOne
			} else if ($scope.weighted === 0) {
				$scope.answer = "Not sure yet"
			} else {
				$scope.answer = "Go with " + $scope.choiceTwo 
			}
		}
	}]);

	app.directive('pro-con-input', function() {
		return {
			restrict: 'E',
			controller: 'ProsConsController',
			templateUrl: 'proconinput.html'
		}
	});	
})(); 
