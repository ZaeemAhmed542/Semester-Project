const app = angular.module('app',["ngRoute"]);
app.config(['$routeProvider',function ($routeProvider){
    $routeProvider
            .when('/',{
                templateUrl: 'home.html'
            })
            .when('/Login',{
                controller:"LoginCtrl",
                templateUrl: 'Login.html'
            })
            .when('/SignUp',{
                controller:"SignUpCtrl",
                templateUrl: 'SignUp.html'
            })
}]);
app.controller('LoginCtrl', function($scope, $http) {
    $scope.email = "";
    $scope.password = "";
    $scope.onSubmit = function(){
        $http({
            method:"POST",
            url:"phpscripts/Login.php",
            data:{
                'email':$scope.email,
                'password':$scope.password,
            }
        })
        .then(function(data){
            console.log(data)
        })
    }
}) 
app.controller('SignUpCtrl', function($scope, $http) {
    $scope.name = "";
    $scope.email = "";
    $scope.password = "";
    $scope.FB = "";
    $scope.INSTA = "";
    $scope.TWITTER = "";
    $scope.onSubmit = function(){
        $http({
            method:"POST",
            url:"phpscripts/SignUp.php",
            data:{
                'name':$scope.name,
                'email':$scope.email,
                'password':$scope.password,
                'FB':$scope.FB,
                'INSTA':$scope.INSTA,
                'TWITTER':$scope.TWITTER,
                'action':'insert'
            }
        })
        .then(function(data){
            console.log(data)
        })
    }
}) 
