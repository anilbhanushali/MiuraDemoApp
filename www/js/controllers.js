angular.module('starter.controllers', [])

.controller('DashCtrl', function($scope,$timeout) {
  $scope.username = '';
  $scope.password = '';
  $scope.orderid = '11243';
  $scope.amount = '2.10';
  $scope.paymentResult = {};

  $scope.processSale = function(username,password,orderid,amount){
    if(username && password && orderid && parseFloat(amount)){
      $scope.paymentResult.result = 'Processing...'
      cordova.plugins.MiuraMosambee.sale(amount,orderid,username,password, function(result){
          console.log(result);
          $timeout(function(){
            $scope.paymentResult.result = result.reason;
          })
      }, function(err){
          $timeout(function(){
            $scope.paymentResult.result = 'ERROR'
          })
      })
    }else{
      alert('Enter all details')
    }
  }
})

.controller('ChatsCtrl', function($scope, Chats) {
  // With the new view caching in Ionic, Controllers are only called
  // when they are recreated or on app start, instead of every page change.
  // To listen for when this page is active (for example, to refresh data),
  // listen for the $ionicView.enter event:
  //
  //$scope.$on('$ionicView.enter', function(e) {
  //});

  $scope.chats = Chats.all();
  $scope.remove = function(chat) {
    Chats.remove(chat);
  };
})

.controller('ChatDetailCtrl', function($scope, $stateParams, Chats) {
  $scope.chat = Chats.get($stateParams.chatId);
})

.controller('AccountCtrl', function($scope) {
  $scope.settings = {
    enableFriends: true
  };
});
