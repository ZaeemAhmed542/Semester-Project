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
            $scope.followers = Userdata[6] > 1000000 ? (Userdata[6] / 1000000).toFixed(2) +
                "m" : (Userdata[6] > 1000 ? (Userdata[6] / 1000).toFixed(2) + 'k' : Userdata[6]);
            $scope.following = Userdata[7] > 1000 ? (Userdata[7] / 1000).toFixed(2) + 'k' : Userdata[7];
            $scope.posts = Userdata[8] > 1000 ? (Userdata[8] / 1000).toFixed(2) + 'k' : Userdata[8];
            $scope.profilepic = Userdata[10];
        })
})

app.controller('LogoutCtrl', function($scope, $http, $window) {
    $scope.destroysession = function() {
        $window.location.href = '/semester/phpscripts/Logout.php';
    }
});



app.controller('MessageCtrl', function($scope, $http) {
    $scope.selectedUser = null;
    $scope.userId = $scope.$parent.id;
    $scope.message = "";
    $scope.messages = [];
    $scope.friends = [];
    $http({
            method: 'GET',
            url: '../phpscripts/getFriends.php'
        })
        .then(function(data) {
            $scope.friends = data.data;
        })
    $scope.init = function() {
        $http({
                method: 'POST',
                url: '../phpscripts/getMessages.php',
                data: {
                    'userId': $scope.userId,
                    'id': $scope.selectedUser
                }
            })
            .then(function(data) {
                $scope.messages = data.data;
            })
    }
    $scope.set = function(ID) {
        $scope.selectedUser = ID;
        $http({
                method: 'POST',
                url: '../phpscripts/getMessages.php',
                data: {
                    'userId': $scope.userId,
                    'id': $scope.selectedUser
                }
            })
            .then(function(data) {
                $scope.messages = data.data;
            })
    }

    $scope.sendMessage = function() {
        $http({
                method: "POST",
                url: '../phpscripts/addMessage.php',
                data: {
                    'userId': $scope.userId,
                    'id': $scope.selectedUser,
                    'message': $scope.message,
                }
            })
            .then(function(data) {
                $scope.init();
                $scope.message = "";
            })
    }

    setInterval(() => {
        $scope.init();
    },100);
})

app.controller('FriendCtrl', function($http, $scope) {
    $scope.friends = [];
    $scope.pending = [];
    $scope.userId = $scope.$parent.id;
    $scope.init = function() {
        $http({
                method: 'POST',
                url: '../phpscripts/getFriends.php',
                data: {
                    'userId': $scope.userId,
                    'id': $scope.selectedUser
                }
            })
            .then(function(data) {
                $scope.friends = data.data;
            })
    }

    $scope.Pending = function() {
        $http({
                method: 'GET',
                url: '../phpscripts/Pending.php'
            })
            .then(function(data) {
                $scope.pending = data.data;
            })
    }
    $scope.beFriend = function(ID) {
        $http({
                method: 'POST',
                url: '../phpscripts/AddFriend.php',
                data: {
                    'id': ID,
                }
            })
            .then(function(data) {
                $scope.init();
                $scope.Pending();
            })
    }

    $scope.reject = function(ID) {
        $http({
                method: 'POST',
                url: '../phpscripts/removeConnection.php',
                data: {
                    'userId': $scope.userId,
                    'id': ID,
                }
            })
            .then(function(data) {
                $scope.Pending();
            })
    }

    $scope.unFriend = function(ID) {
        $http({
                method: 'POST',
                url: '../phpscripts/removeFriend.php',
                data: {
                    'userId': $scope.userId,
                    'id': ID,
                }
            })
            .then(function(data) {
                $scope.init();
            })
    }

    $scope.init();
    $scope.Pending();
})

app.controller('SearchCtrl', function($scope, $http) {
    $scope.query = "";
    $scope.users = [];

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
                        url: "../phpscripts/AddConnection.php",
                        data: {
                            'id': id
                        }
                    })
                }
            })
    }
    $scope.fetchUser = function() {
        if ($scope.query === '') {
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
        } else {
            $http({
                    method: 'POST',
                    url: '../phpscripts/getUser.php',
                    data: {
                        'query': $scope.query
                    }
                })
                .then(function(data) {
                    $scope.users = data.data;
                })
        }
    }
    $scope.fetchUser();
})