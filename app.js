  
  (function(){
  
  /*Motivos para se criar um service - Reusabilidade de código, chama-lo em varios pontos
  Service é um bom lugar para guardar informação, porque o angular instancia apenas
  uma vez aquele service para aquela aplication 
  Ajuda a diminuir a complexidade e separar respponsabilidades*/
  
  //Setando esse modulo do angular para a var APP
  //O segundo parametro é a lista de modulos que esse modulo depende
  //[] significa que ele não depende de nenhum outro modulo exceto o angular
  
  //Dependencia de ngRoute - outro modulo que o meu modulo necessita
  var app = angular.module("githubViewer", ["ngRoute"]);
  
  
  //Adicionando configurações para nossa aplicação para o angular criar esse modulo ja com essa configuração
  app.config(function($routeProvider){
    //entry point da aplicação
        $routeProvider.when("/main", {
          templateUrl:"main.html",
          controller:"MainController"
          
        }).when("/user/:username", {
          templateUrl:"user.html",
          controller:"UserController"
        })
        .when("/repos/:username/:reponame", {
          templateUrl:"repo.html",
          controller:"RepoController"
        })
        
        .otherwise({redirectTo:"/main"})
        
        //:username - parametro
        //Otherwise = caso entre em alguma url que nao seja compreendida
        
        
  });
  
  
  
  }());