const app = angular.module("app", ["ngRoute"]);
app.config([
    "$routeProvider",
    function($routeProvider) {
        $routeProvider
            .when("/", {
                templateUrl: "Profile.html",
            })
            .when("/Messages", {
                controller: "MessageCtrl",
                templateUrl: "Messages.html",
            })
            .when("/Search", {
                controller: "SearchCtrl",
                templateUrl: "Search.html",
            })
    },
]);

app.controller("ProfileCtrl", function($scope, $http, $window) {
    $http({
            method: "GET",
            url: "../phpscripts/getAccountStats.php"
        })
        .then(function(data) {
            const Userdata = data.data;
            if (Userdata.error) {
                $window.location.href = '/semester/'
            }
            $scope.handle = Userdata[4];
            $scope.username = Userdata[1];
            $scope.followers = Userdata[6];
            $scope.following = Userdata[7];
            $scope.posts = Userdata[8];
            $scope.profilepic = Userdata[10];
        })
})

app.controller('LogoutCtrl', function($scope, $http, $window) {
    $scope.destroysession = function() {
        $http({
                method: "GET",
                url: "../phpscripts/Logout.php"
            })
            .then(function(data) {
                $window.location.href = '/semester/';
            })
    }
});



app.controller('MessageCtrl', function() {

})

app.controller('SearchCtrl', function($scope, $http) {
    $scope.query = "";
    $scope.users = [];
    $http({
            method: 'POST',
            url: '../phpscripts/Allusers.php',
            data: {
                'query': $scope.query
            }
        })
        .then(function(data) {
            $scope.users = data.data;
            console.log($scope.users)
        })
    $scope.handleRequest = function(id) {
        console.log(id)
        $http({
                method: "POST",
                url: "../phpscripts/checkFriend.php",
                data: {
                    'id': id
                }
            })
            .then(function(data) {
                console.log(data);
            })
    }
})