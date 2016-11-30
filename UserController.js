
(function(){
  
  

//Agora só há uma referencia ao githubviewer (criado no app.js)
 var app = angular.module("githubViewer");

//Utilizando o RouteParams pois agora com o Routing, o parametro para busca virá pelo search e pela url (:username)
var UserController = function($scope, github, $routeParams){
  
  
  var onUserComplete = function(data){
    //Com o novo service, simplifica pois ja temos a data vindo do github.getUser.then
    $scope.user = data;
    //github.getRepos agora recebe um user para trazer seus repositórios.
    github.getRepos($scope.user).then(onRepos, onError);
  };
  
  
  var onRepos = function(data){
    $scope.repos = data;
  };
  
  
  
  var onError = function(reason){
    $scope.error = "Could not fetch the data"
  };
  
  
  //Criando uma propriedade para fazer o filtro 
  $scope.repoSortOrder ="-stargazers_count";
  $scope.username = $routeParams.username;
  //chamando o github service, e após ser completado são chamadas as functions
  //onUserComplete e onError
  github.getUser($scope.username).then(onUserComplete, onError);

  
};



app.controller("UserController", UserController);


}());