// Customer Biling Controller
reportingMainApp.controller('CustomerBillingCtrl', [ '$scope', '$http', '$resource', '$timeout', '$filter',
		'HttpServiceAPI', 'ResourceServiceAPI',
		function($scope, $http, $resource, $timeout, $filter, HttpServiceAPI, ResourceServiceAPI) {
			$scope.customerBilling = [];
			$scope.invalidDate = false;

			// Check Invalid Dates
			$scope.checkInvalidDates = function() {
				var fromDate = $filter('date')(new Date($scope.fromDate), "yyyy-MM-dd");
				var toDate = $filter('date')(new Date($scope.toDate), "yyyy-MM-dd");
				if (fromDate > toDate) {
					$scope.invalidDate = true;
				}
				else {
					$scope.invalidDate = false;
				}

			}
			$scope.customerBillingObject = {
				"restCall" : function() {
				}
			};
			// Get Customer Billing Data Based on From and To Dates
			$scope.getCustomerBillingData = function() {

				// console.log($scope.fromDate + " " + $scope.toDate);
				var dateLimits = {
					"from" : $filter('date')(new Date($scope.fromDate), "yyyy-MM-dd").toString(),
					"to" : $filter('date')(new Date($scope.toDate), "yyyy-MM-dd").toString()
				};
				// console.log(dateLimits);

				/*
				 * var resourceObj = $resource("reporting/customerBilling.html",
				 * {}, { getCustomerBilling : { method : 'POST', isArray : true }
				 * });
				 * resourceObj.getCustomerBilling(dateLimits).$promise.then(function(successResponse) {
				 * $scope.customerBilling = successResponse;
				 * console.log(angular.mock.dump($scope.customerBilling)); },
				 * function(errorResponse) {
				 * 
				 * });
				 */

				// ************************************************************
				// ***** CustomerBilling.html using 'HttpServiceAPI' **********
				// ************************************************************
				/*
				 * HttpServiceAPI.post("reporting/customerBilling.html",
				 * dateLimits).then(function(res) { $scope.customerBilling =
				 * res; });
				 */
				// ************************************************************
				// ************************************************************
				// ************************************************************
				// ***** CustomerBilling.html using 'ResourceServiceAPI' ******
				// ************************************************************
				// ************************************************************
				ResourceServiceAPI.query({
					endPoint : "customerBilling.html",
					from : dateLimits.from,
					to : dateLimits.to
				}).$promise.then(function(successResponse) {
					$scope.customerBilling = successResponse;
					// console.log(angular.mock.dump($scope.customerBilling));
				}, function(errorResponse) {
					// console.log(errorResponse);
					$scope.customerBilling = errorResponse;
				});
				// ************************************************************
				// ************************************************************
				// ************************************************************
			};

		} ]);

/*
 * reportingMainApp.factory('ResourceServiceAPI', function($resource) { var
 * ResourceServiceAPI = {};
 * 
 * return ResourceServiceAPI; });
 */

// Resuable HttpServiceAPI
reportingMainApp.factory('HttpServiceAPI', function($http) {
	var httpServiceAPI = {};

	httpServiceAPI.get = function() {

	};

	httpServiceAPI.post = function(url, param) {
		// console.log(url + " " + param);

		return $http.post(url, param).then(function(successResponse) {
			// console.log("factory " + successResponse.data);
			return successResponse.data;
		}, function(errorResponse) {
			return errorResponse.data;
		});
	};

	return httpServiceAPI;
});

// $resource Service API
reportingMainApp.factory('ResourceServiceAPI', function($resource) {

	var ResourceServiceAPI = {};
	var url = "reporting";

	ResourceServiceAPI.setUrl = function(urlToInvoke) {
		url = urlToInvoke;
	};

	ResourceServiceAPI.resourceObject = function() {
		return $resource(url);
	}

	var resourceObject = $resource(url + "/:endPoint", {
		endPoint : '@endPoint'
	});

	return resourceObject;
});
