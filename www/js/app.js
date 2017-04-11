// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
angular.module('starter', ['ionic','firebase','ui.utils.masks'])

.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    if(window.cordova && window.cordova.plugins.Keyboard) {
      // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
      // for form inputs)
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);

      // Don't remove this line unless you know what you are doing. It stops the viewport
      // from snapping when text inputs are focused. Ionic handles this internally for
      // a much nicer keyboard experience.
      cordova.plugins.Keyboard.disableScroll(true);
    }
    if(window.StatusBar) {
      StatusBar.styleDefault();
    }
  });
})

.controller("cadastroProdutoCtrl", function($scope,Produtos,$firebase){
    
    $scope.produto=objProduto();
    $scope.produtos=[];
    //$scope.produtos.push($scope.produto1);
    
    
    
    $scope.cadastrarProduto = function(){
        firebase.database().ref().child('produtos/').push($scope.produto);
        $scope.produto=objProduto();
    };
    
    
    $scope.diminuiQuantidade = function(){
        if($scope.produto.quantidade >0){
            $scope.produto.quantidade = $scope.produto.quantidade -1;
        }
    };
    
    $scope.aumentaQuantidade = function(){
        $scope.produto.quantidade = $scope.produto.quantidade +1;
    };
    $scope.listaProdutos = function(){
        var ref =firebase.database().ref("produtos");
        ref.on("child_added", function(snapshot){
            var prod=snapshot.val();
            $scope.produtos.push(prod);
        });
    }
    $scope.listaProdutos();
})


.factory('Produtos', function($firebase){
    
    var ref =firebase.database().ref("produtos");
    ref.on("child_added", function(snapshot){
       produtos = snapshot.toJSON();
    });
    
    
    return{
        all:function(){
            return produtos;
        }
    }
});

function objProduto() {
    return {
        nome:'',
        preco:'',
        quantidade:0
    };
}
