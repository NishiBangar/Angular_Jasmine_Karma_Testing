describe("Service Module Test :",function(){
	
	//Register an INSTANCE of the module.
	beforeEach(
		angular.mock.module('userApp')
	);
	
	
	// Module is loaded ,reference to $controller resolved.
	
	
	describe("CatalogHomeCtrl :",function(){
		
		/* Ones modules has been INITIALISED , 
		 * call INJECT(), so that the reference to 
		 * $Controller service can be resolved  */
		var $controller;
		var controller;
		var $scope;
		var $httpBackend;
		var $q;
		var deferred;
		beforeEach(angular.mock.inject(function(_$controller_,_$rootScope_,_$http_,_$httpBackend_,_$q_,userInfoFactory){
			$controller = _$controller_;
			$scope=_$rootScope_.$new();
			$http=_$http_;
			$httpBackend=_$httpBackend_;
			$q=_$q_;
			
			
			// We use $q service to create a mock instance of defer
			deferred=$q.defer();
			//******************Spies**************************
			 	spyOn(userInfoFactory,'fetchSessionInfo').and.returnValue(deferred.promise);
			 	
			//*************************************************
			
			//create custom spy 
//			var servicecatalog=new Object();
//			 servicecatalog.query=jasmine.createSpy("servicecatalog.query()").and.returnValue(deferred.promise);
			
			 
			//Getting the instance of a specific Controller
			controller=$controller('CatalogHomeCtrl',{$scope : $scope});
			
		}));
		// Now $controller service can be used to get the INSTANCE of any controller within the module;
		
		
//		//Get the INSTANCE OF 'CatalogHomeCtrl' controller
//		beforeEach(function(){
//			
//		});
		
		//SPECS
		it("check $scope.testing 's value",function(){
//		console.log("$scope.testing  :  "+$scope.testing);
//			console.log(controller);
			expect($scope.testing).toBe("testing");
		});
		
		it("call to userInfoFactory,fetchSessionInfo(), result should be Defined",function(){
			deferred.resolve({"fetchSessionInfo":"defined"});
			$scope.$apply();
//			console.log(angular.mock.dump($scope.fetchUserInfoStatus));
			expect($scope.fetchUserInfoStatus).toBeDefined();
			
		});
		
		
		
		 xit("call to onLoadFunction.getAllServices() should return an Array type ",function(){
			/*spyOn($scope.onLoadFunction,'getAllServices').and.returnValue(deferred.promise);
			deferred.resolve([{"service":"defined"}]);
			$scope.$apply();
			console.log(angular.mock.dump($scope.catalogs));
			expect($scope.catalogs).toBeDefined();*/
			 $http.get('redirect_catalog.html').success(function(response){
				$scope.catalogs=response; 
				$scope.catalogs = {"key1":"value1"};
			 }).error(function(response){
				 $scope.catalogs=response;
			 });
			
			$httpBackend.when('GET','redirect_catalog.html')
				.respond(200,["array1","array2"]);
			
			$httpBackend.flush();
			
			expect($scope.catalogs).toEqual(["array1","array2"]);
			
		});
		
		it("call to testingFunction() should return the sum of the arguments passed",function(){
			expect($scope.testingFunction(1,1)).toEqual(2);
		});
		
	});
	
	
	
	//Test Factory
	describe("'Test Factory'",function(){
		var TestFactory;
		
		
		beforeEach(inject(function(_TestFactory_){
			TestFactory=_TestFactory_;
		}));
		
		
		it("should be Defined",function(){
			expect(TestFactory).toBeDefined();
		});
		
		describe(" all() ",function(){
			var userList = [
			                {
			                  id: '1',
			                  name: 'Jane',
			                  role: 'Designer',
			                  location: 'New York',
			                  twitter: 'gijane'
			                },
			                {
			                  id: '2',
			                  name: 'Bob',
			                  role: 'Developer',
			                  location: 'New York',
			                  twitter: 'billybob'
			                },
			                {
			                  id: '3',
			                  name: 'Jim',
			                  role: 'Developer',
			                  location: 'Chicago',
			                  twitter: 'jimbo'
			                }]; 
			it("should be Defined",function(){
				expect(TestFactory.all).toBeDefined();
			});
			
			it("should be equals to UserList",function(){
				expect(TestFactory.all()).toEqual(userList); 
			});
		});
	});
	
	
});
