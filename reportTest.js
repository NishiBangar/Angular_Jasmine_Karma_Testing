describe("Reporting Module Test >",function(){
	var $controller;
	var $q;
	var $httpBackend;
	beforeEach(function(){
		angular.mock.module('reportingMainApp');
		angular.mock.module('ngResource'); 
		
		inject(function(_$controller_,_$q_,_$httpBackend_){
			$controller=_$controller_;
			$q=_$q_;
			$httpBackend=_$httpBackend_;
		});
		
		
	});
	
	it("should be Defined",function(){
		expect(reportingMainApp).toBeDefined();
	});
	
	//Test Factory
	describe("'Test Factory'",function(){
		var TestFactory;
		
		//Add Pokeapi endpoint
		var API="http://pokeapi.co/api/v2/pokemon/";
		
		// Add mocked Pokeapi response
		var RESPONSE_SUCCESS={
				'id': 25,
			    'name': 'pikachu',
			    'sprites': {
			      'front_default': 'http://pokeapi.co/media/sprites/pokemon/25.png'
			    },
			    'types': [{
			      'type': { 'name': 'electric' }
			    }]
		};
		
		var RESPONSE_ERROR={
				'detail':"Not found"
		};
		
		
		beforeEach(inject(function(_TestFactory_){
			TestFactory=_TestFactory_;
		}));
		
		
		it("should be Defined",function(){
			expect(TestFactory).toBeDefined();
		});
		
		describe(" all() ",function(){
			var userList = [ {
				id : '1',
				name : 'Jane',
				role : 'Designer',
				location : 'New York',
				twitter : 'gijane',
				pokemon : {
					name : 'blastoise'
				}
			}, {
				id : '2',
				name : 'Bob',
				role : 'Developer',
				location : 'New York',
				twitter : 'billybob',
				pokemon : {
					name : 'growlithe'
				}
			}, {
				id : '3',
				name : 'Jim',
				role : 'Developer',
				location : 'Chicago',
				twitter : 'jimbo',
				pokemon : {
					name : 'hitmonchan'
				}

			}, {
				id : '4',
				name : 'Bill',
				role : 'Designer',
				location : 'LA',
				twitter : 'dabill',
				pokemon : {
					name : 'barney'
				}
			}, {
				id : '5',
				name : 'Nishi',
				role : 'Developer',
				location : 'Miami',
				twitter : 'nishibangar',
				pokemon : {
					name : 'pikachu'
				}
			} ,{
				id : '6',
				name : 'Mark',
				role : 'Developer',
				location : 'Florida',
				twitter : 'mark',
				pokemon : {
					name : 'kai'
				}
			}];
			
			
			it("should be Defined",function(){
				expect(TestFactory.all).toBeDefined();
			});
			
			it("should be equals to UserList",function(){
				expect(TestFactory.all()).toEqual(userList); 
			});
		});
		
		describe("findByName() >",function(){
			var result;
			
			beforeEach(function(){
				result={}
				
				spyOn(TestFactory,"findByName").and.callThrough();
			});
			
			it("should return a Pokemon when called with a valid name",function(){
				var search='pikachu';
				
				// Declare the endpoint we expect our service to hit and provide it with our mocked result
				$httpBackend.whenGET(API + search).respond(200,$q.when(RESPONSE_SUCCESS));
				
				expect(TestFactory.findByName).not.toHaveBeenCalled();
				expect(result).toEqual({});
				
				TestFactory.findByName(search).then(function(res){ /*Success Function */
					result=res;
				});
				
				// Flush pending HTTP requests
				$httpBackend.flush();	
//				console.log("Test (resolved)  :  "+result.name);
				
				expect(TestFactory.findByName).toHaveBeenCalledWith(search);
				expect(result.id).toEqual(25);
				expect(result.name).toEqual('pikachu');
				expect(result.sprites.front_default).toContain('.png');
			    expect(result.types[0].type.name).toEqual('electric');
			});
			
			it("should return a 404 when called with an invalid name",function(){
				var search='godzilla';
				
				// Update Status code and response object (reject instead of When/resolve)
				$httpBackend.whenGET(API + search).respond(404,$q.reject(RESPONSE_ERROR));
				
				expect(TestFactory.findByName).not.toHaveBeenCalled();
				expect(result).toEqual({});
				
				//Update Chained method to catch
				/*TestFactory.findByName(search).catch(function(response){
					
				})*/
				TestFactory.findByName(search).then(function(response){
					
				},function(response){
					result=response;
				}); 
				
				$httpBackend.flush();	
				
//				console.log("Test (rejected)   :  "+result.detail);
				
				expect(TestFactory.findByName).toHaveBeenCalledWith(search);
				expect(result.detail).toEqual("Not found");
			});
		});
	});
	
	
	// Test Controller 
	describe("Test Controller >",function(){
		var TestController;
		var $scope;
		
		beforeEach(function(){
			TestController=$controller("TestController",{$scope:$scope});
		});
		
		it("should be Defined",function(){
			expect(TestController).toBeDefined();
		});
	});
	
	
	
	//--User Quote Controller---
	xdescribe("userQuoteCtrl >",function(){
		
		var userQuoteCtrl;
		var $scope;
		var TestFactory;
		var result={};
		
		 var API = 'http://pokeapi.co/api/v2/pokemon/';
		  var RESPONSE_SUCCESS = {
		    'id': 58,
		    'name': 'growlithe',
		    'sprites': {
		      'front_default': 'http://pokeapi.co/media/sprites/pokemon/58.png'
		    },
		    'types': [{
		      'type': { 'name': 'fire' }
		    }]
		  };
		  
		  var success_userQuoteList=[ {
			  "userId": "USER222222",
			  "userName": "Nishi Bangar",
			  "TotalQuotes": 39,
			  "Approved": 4,
			  "Rejected": 1,
			  "Completed": 4,
			  "WorkInProgress": 4
			}, {
			  "userId": "USER232169",
			  "userName": "Nishchith Bangar brt",
			  "TotalQuotes": 6,
			  "Approved": 2,
			  "Rejected": 1,
			  "Completed": 1,
			  "WorkInProgress": 0
			} ];
		
		beforeEach(function(){
			
			inject(function(_$rootScope_,_TestFactory_){
				$scope=_$rootScope_; 
				TestFactory=_TestFactory_;
			});
			
			userQuoteCtrl=$controller('userQuoteCtrl',{$scope:$scope});
			
			result=[];
			
			spyOn($scope.onLoad,"fetchUserQuoteDetails").and.callThrough();
		});
		
		it("should be Defined",function(){
			expect(userQuoteCtrl).toBeDefined();
		});
		
	});
	
	
	describe("Customer Billing Ctrl >",function(){
		var customerBillingCtrl;
		var $scope;
		var result=[];
		var HttpServiceAPI;
		var ResourceServiceAPI;
		var $q;
		var deferred;
		
		var successResponse=[{"cid":"CUS--1789977423",
							  "customerName":"Nishi Bangar",
							  "email":"nishchith.bangar@blueracetechnologies.com"},
							 {"cid":"CUS--1789977423",
							  "customerName":"Nishi Bangar",
							  "email":"nishchith.bangar@blueracetechnologies.com"}];
		
		var errorResponse=[{"data":"not found"}];
		
		beforeEach(function(){
			inject(function(_$rootScope_,_$q_,_ResourceServiceAPI_,_HttpServiceAPI_){
				$q=_$q_;
				$scope=_$rootScope_;
				ResourceServiceAPI=_ResourceServiceAPI_;
				HttpServiceAPI=_HttpServiceAPI_;
			});
			
			
			//Creating a mock instance for ResourceServiceAPi
			ResourceServiceAPI={
					query:function(){
						deferred=$q.defer();	
						return {$promise:deferred.promise};
					}
			};
			
			spyOn(ResourceServiceAPI,"query").and.callThrough();  
			
			customerBillingCtrl=$controller("CustomerBillingCtrl",{'$scope':$scope,"ResourceServiceAPI":ResourceServiceAPI});
			
		});
		  
		it("should be Defined",function(){
			expect(customerBillingCtrl).toBeDefined();
		});
		
		//Resource.query()
		describe("ResourceServiceAPI.query()  with successResponse >",function(){
			
			beforeEach(function(){
				// Function call to invoke 'ResourceServiceAPI.query();
				$scope.getCustomerBillingData();
				deferred.resolve(successResponse);
				$scope.$apply();
			});          
			
			it("should query the ResourceServiceAPI",function(){
				
				/*ResourceServiceAPI.query({
					endPoint : "customerBilling.html",
					from : "01-09-2016",
					to : "01-09-2016"
				});*/   
//				console.log(angular.mock.dump($scope.customerBilling));
				expect(ResourceServiceAPI.query).toHaveBeenCalled();
			});
			
			it("should set response of ResourceServiceAPI to $scope.customerBilling",function(){
				expect($scope.customerBilling).toEqual(successResponse);
			});
		});
		
		describe("ResourceServiceAPi.query() with errorResponse >",function(){
			beforeEach(function(){
				// Function call to invoke 'ResourceServiceAPI.query();
				$scope.getCustomerBillingData();
				deferred.reject(errorResponse);
				$scope.$apply();
			});     
			  
			it("should query the ResourceServiceAPI",function(){
				expect(ResourceServiceAPI.query).toHaveBeenCalled();
			});
			
			it("should set response of ResponseServiceAPI to $scope.customerBilling",function(){
//				console.log(angular.mock.dump($scope.customerBilling));
				expect($scope.customerBilling).toEqual(errorResponse);
			});
		});
		
	}); 
	
	
	
	
	//HttpServiceAPI
	describe("HttpServiceAPI >",function(){
		var HttpServiceAPI;
		
		var url="reporting/customerBilling.html";
		var param={from: "2016-09-01", to: "2016-09-14"};
		
		var successResponse=[{"cid":"CUS--1789977423",
							  "customerName":"Nishi Bangar",
							  "email":"nishchith.bangar@blueracetechnologies.com"},
							 {"cid":"CUS--1789977423",
							  "customerName":"Nishi Bangar",
							  "email":"nishchith.bangar@blueracetechnologies.com"}];
		var errorResponse=[{"data":"not found"}];
		
		beforeEach(function(){
			inject(function(_HttpServiceAPI_){
				HttpServiceAPI=_HttpServiceAPI_;
				
				spyOn(HttpServiceAPI,"post").and.callThrough();
				result=[];
			});
		});
		
		it("should be Defined",function(){
			expect(HttpServiceAPI).toBeDefined();
		});
		
		//Suite for get()
		describe("GET()",function(){
			it("should be Defined",function(){
				expect(HttpServiceAPI.get).toBeDefined();
			});
		});
		
		//Suite for post()
		describe("POST() >",function(){
			it("should be Defined",function(){
				expect(HttpServiceAPI.post).toBeDefined();
			})
			
			it("should provide 200 status with  successResponse on '$http' call",function(){
				var url="reporting/customerBilling.html";
				var param={from: "2016-09-01", to: "2016-09-14"};
				$httpBackend.whenPOST("reporting/customerBilling.html").respond(200,$q.when(successResponse));
				
				expect(HttpServiceAPI.post).not.toHaveBeenCalled();
				HttpServiceAPI.post(url,param).then(function(successResponse){
//					console.log("test");
//					console.log(angular.mock.dump(successResponse));
					result=successResponse;
				});
				
				
				$httpBackend.flush();
				
				expect(HttpServiceAPI.post).toHaveBeenCalled();
				expect(HttpServiceAPI.post).toHaveBeenCalledWith(url,param);
//				console.log("test");
//				console.log(angular.mock.dump(result));
				expect(result).toEqual(successResponse);
				
			});
			
			it("should return 404 status and error response if url not valid",function(){
				
				$httpBackend.whenPOST(url+"/invalidUrl").respond(404,$q.reject(errorResponse));
				
				expect(HttpServiceAPI.post).not.toHaveBeenCalled();
				HttpServiceAPI.post(url+"/invalidUrl",param).then(function(successResponse){
					
				},function(errorResponse){
					result=errorResponse;
				});
				
				$httpBackend.flush();
				
				expect(HttpServiceAPI.post).toHaveBeenCalled();
				expect(HttpServiceAPI.post).toHaveBeenCalledWith(url+"/invalidUrl",param);
//				console.log("test");
//				console.log(angular.mock.dump(result));
				expect(result).toEqual(errorResponse);
			})
		});
	});
	
	
	//ResourceServiceAPI
	describe("ResourceServiceAPI >",function(){
		var userList = [ {
			id : '1',
			name : 'Jane',
			role : 'Designer',
			location : 'New York',
			twitter : 'gijane',
			pokemon : {
				name : 'blastoise'
			}
		}, {
			id : '2',
			name : 'Bob',
			role : 'Developer',
			location : 'New York',
			twitter : 'billybob',
			pokemon : {
				name : 'growlithe'
			}
		}, {
			id : '3',
			name : 'Jim',
			role : 'Developer',
			location : 'Chicago',
			twitter : 'jimbo',
			pokemon : {
				name : 'hitmonchan'
			}

		}, {
			id : '4',
			name : 'Bill',
			role : 'Designer',
			location : 'LA',
			twitter : 'dabill',
			pokemon : {
				name : 'barney'
			}
		}, {
			id : '5',
			name : 'Nishi',
			role : 'Developer',
			location : 'Miami',
			twitter : 'nishibangar',
			pokemon : {
				name : 'pikachu'
			}
		} ,{
			id : '6',
			name : 'Mark',
			role : 'Developer',
			location : 'Florida',
			twitter : 'mark',
			pokemon : {
				name : 'kai'
			}
		}];
		
		var result;
		var ResourceServiceAPI;
		    
		beforeEach(function(){
			inject(function(_ResourceServiceAPI_){
				ResourceServiceAPI=_ResourceServiceAPI_;
			});
			
			spyOn(ResourceServiceAPI,"query").and.callThrough();
			spyOn(ResourceServiceAPI,"save").and.callThrough();
			
			
		});
		 
		it("should be Defined",function(){
			expect(ResourceServiceAPI).toBeDefined();
		});
		
		describe("query() >",function(){
			beforeEach(function(){
				result=[];
			});
			
			it("should successfully return success response with 200 status for valid url",function(){
				$httpBackend.whenGET("reporting/validUrl").respond(200,userList);
				
				result=ResourceServiceAPI.query({endPoint:"validUrl"});
				
				$httpBackend.flush();
				expect(ResourceServiceAPI.query).toHaveBeenCalled();
//				console.log(angular.mock.dump(result));
				expect(result.length).toEqual(6);
			});
		});
		
		describe("save() >",function(){
			var user;
			beforeEach(function(){
				 user={
							id : '5',
							name : 'Nishi',
							role : 'Developer',
							location : 'Miami',
							twitter : 'nishibangar',
							pokemon : {
								name : 'pikachu'
							}
						};
				result={};
			});
		
			it("should successfully return success response with 200 status for valid url",function(){
				$httpBackend.whenPOST("reporting/validUrl").respond(200,user);
				
				result=ResourceServiceAPI.save({endPoint:"validUrl"});
				$httpBackend.flush();
				
				expect(ResourceServiceAPI.save).toHaveBeenCalled();
//				console.log(angular.mock.dump(result));
				expect(result).toBeDefined();
			});
		});
		
		
	});
	
});
