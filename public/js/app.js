/* Config files */
var userApp =  angular.module('usersApp', []);

userApp.controller('ListController', function($scope,$http){
	
	var successCallback = function(res){
		console.log(res.data.data);
		$scope.users = res.data.data;
	};
	var errorCallback = function(err){
		console.log(err);
	};
	
	$http.get('/api/users').then(successCallback, errorCallback);
	
	
	
	$scope.submitForm = function(){
		var formData = $scope.userForm;		
		$http({
			url: '/api/user',
			data: JSON.stringify(formData),
			method: 'POST',
			headers : {'Content-Type':'application/json'}
		}).then(function(result){
			console.log(result);
			// $scope.users.push(result.data);
			$scope.users = result.data.data;
			$scope.userForm = {};
		},function(err){
			console.log(err);
		})
	}
	
	$scope.editMode = false;
	// $scope.editForm = {};
	$scope.editUser = function(user){
		var data = $('form[name="editForm_'+user._id+'"]').serializeObject();
		console.log(data);
		
		$http.put('/api/updateuser/'+user._id, JSON.stringify(data)).then(function (result) {
			$scope.editMode = false;
			$scope.users = result.data.data;
		},function(err){
			console.log(err)
		});
		
	}
	
	
	
});

userApp.controller('LoginController', function($scope,$http){
	$scope.submitForm = function(){
		var formData = $scope.loginForm;		
		$http({
			url: '/api/login',
			data: JSON.stringify(formData),
			method: 'POST',
			headers : {'Content-Type':'application/json'}
		}).then(function(result){
			console.log(result);
			// $scope.users.push(result.data);
			$scope.users = result.data.data;
			$scope.userForm = {};
		},function(err){
			console.log(err);
		})
	}
})