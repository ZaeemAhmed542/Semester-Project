const app = angular.module("app", ["ngRoute"]);
app.config([
    "$routeProvider",
    function($routeProvider) {
        $routeProvider
            .when("/", {
                templateUrl: "home.html",
            })
            .when("/Login", {
                controller: "LoginCtrl",
                templateUrl: "Login.html",
            })
            .when("/SignUp", {
                controller: "SignUpCtrl",
                templateUrl: "SignUp.html",
            });
    },
]);
app.controller("LoginCtrl", function($scope, $http, $window) {
    $scope.email = "";
    $scope.password = "";
    $scope.onSubmit = function() {
        $http({
            method: "POST",
            url: "phpscripts/Login.php",
            data: {
                email: $scope.email,
                password: $scope.password,
            },
        }).then(function(data) {
            const userData = data.data;
            console.log(userData)
            if (userData["error"] === "") {
                $window.location.href = "Authenticated/";
            }
        });
    };
});
app.controller("SignUpCtrl", function($scope, $http, $window) {
    $scope.name = "";
    $scope.email = "";
    $scope.password = "";
    $scope.platforms = ["facebook", "instagram"];
    $scope.handle = "";
    $scope.platform = "";
    $scope.followers = "";
    $scope.following = "";
    $scope.posts = "";
    $scope.profilepic = "";

    $scope.onSubmit = function() {
        $http({
            method: "POST",
            url: "phpscripts/SignUp.php",
            data: {
                name: $scope.name,
                email: $scope.email,
                handle: $scope.handle,
                password: $scope.password,
                platform: $scope.platform,
                followers: $scope.followers,
                following: $scope.following,
                posts: $scope.posts,
                profilepic: $scope.profilepic,
                action: "insert",
            },
        }).then(function(data) {
            $window.location.href = "Authenticated/";
        });
    };
});