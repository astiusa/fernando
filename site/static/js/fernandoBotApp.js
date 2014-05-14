'use strict';

var app = angular.module('FernandoBot', []);

app.controller('fernandoController', ['$scope', function($scope) {
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
}])

    .factory('fernandoService', ['$http', '$q', function($http, $q) {
        function getServers() {
            var deferred = $q.defer();

            $http.get('/api/servers').then(function(data, status) {
                deferred.resolve(data.servers);
            }, function() {
                deferred.reject();
            });

            return deferred.promise;
        }

        function getServer(serverId) {
            var deferred = $q.defer();

            $http.get('/api/servers/' + serverId).then(function(data, status) {
                deferred.resolve(data);
            }, function() {
                deferred.reject();
            });

            return deferred.promise;
        }

        function getChannel(serverId, channelName) {
            var deferred = $q.defer();

            $http.get('/api/servers/' + serverId + '/' + channelName).then(function(data, status) {
                deferred.resolve(data);
            }, function() {
                deferred.reject();
            });

            return deferred.promise;
        }

        return {
            getServers: getServers
        };
    }]);