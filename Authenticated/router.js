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
            .when("/Friends", {
                controller: "FriendCtrl",
                templateUrl: "Friend.html",
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
            $scope.id = Userdata[0];
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



app.controller('MessageCtrl', function($scope, $http) {
    $scope.selectedUser = 17;
    $scope.userId = $scope.$parent.id;
    $scope.message = "";
    $scope.messages = [];
    $scope.left = 'chat-bubble chat-bubble--left';
    $scope.right = "chat-bubble chat-bubble--right";
    $http({
            method: 'POST',
            url: '../phpscripts/getMessages.php',
            data: {
                'id': 17
            }
        })
        .then(function(data) {
            $scope.messages = data.data;
            console.log($scope.messages)
        })
})

app.controller('FriendCtrl', function($http, $scope) {
    $scope.friends = [];
    $scope.pending = [];
    $http({
            method: 'GET',
            url: '../phpscripts/getFriends.php'
        })
        .then(function(data) {
            $scope.friends = data.data;
        })
    $http({
            method: 'GET',
            url: '../phpscripts/Pending.php'
        })
        .then(function(data) {
            $scope.pending = data.data;
        })
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
        })
    $scope.handleRequest = function(id) {
        $http({
                method: "POST",
                url: "../phpscripts/checkFriend.php",
                data: {
                    'id': id
                }
            })
            .then(function(data) {
                const status = data;
                if (!status.data.isFriend) {
                    $http({
                        method: "POST",
                        url: "../phpscripts/AddFriend.php",
                        data: {
                            'id': id
                        }
                    })
                }
            })
    }
    $scope.fetchUser = function() {

    }
})