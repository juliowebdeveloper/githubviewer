(function(){
 
 
 
 var module = angular.module("githubViewer");
 
 
 var RepoController = function($scope, $routeParams, github){
   
   //Definido no appconfig o reponame
   var reponame = $routeParams.reponame;
   var username = $routeParams.username;
   
   var onRepoDetails = function(data){
     $scope.repo = data;
   }
   
   var onError = function(reason){
     $scope.error = reason;
   }
   
   
   github.getRepoDetails(username, reponame).then(
     onRepoDetails, onError);
   
   
   
   
   
   
 };
 
 
 module.controller("RepoController", RepoController);
 
 
 
  
}());