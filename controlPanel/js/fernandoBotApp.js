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
}]);