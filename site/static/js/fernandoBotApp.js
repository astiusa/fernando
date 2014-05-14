'use strict';

var app = angular.module('FernandoBot', []);

app.controller('fernandoController', ['$scope', 'fernandoService', function($scope, fernandoService) {
    $scope.bot = {
        name: ''
    };

    $scope.data = {};

    $scope.startBot = function startBot() {
        console.log('starting...');
    };

    $scope.endBot = function endBot() {
        console.log('ending...');
    };

    $scope.joinChannel = function joinChannel(channelName) {
        console.log('joining ', channelName);
    };

    $scope.leaveChannel = function leaveChannel(channelName) {
        console.log('leaving ', channelName);
    };

    $scope.say = function say(textToSay) {
        console.log('saying ', textToSay);
    };

    $scope.givePermissions = function givePermissions(userName, permissions) {
        console.log('giving ', userName, 'permissions: ', permissions);
    };

    fernandoService.getServers().then(function(servers) {
        console.log('servers', servers);
    });
}])

    .factory('fernandoService', ['$http', '$q', function($http, $q) {
        function getServers() {
            var deferred = $q.defer();

            $http.get('/api/servers').then(function(received) {
                deferred.resolve(received.data);
            }, function() {
                deferred.reject();
            });

            return deferred.promise;
        }

        function getServer(serverId) {
            var deferred = $q.defer();

            $http.get('/api/servers/' + serverId).then(function(received) {
                deferred.resolve(received.data);
            }, function() {
                deferred.reject();
            });

            return deferred.promise;
        }

        function getChannel(serverId, channelName) {
            var deferred = $q.defer();

            $http.get('/api/servers/' + serverId + '/' + channelName).then(function(received) {
                deferred.resolve(received.data);
            }, function() {
                deferred.reject();
            });

            return deferred.promise;
        }

        return {
            getServers: getServers
        };
    }]);