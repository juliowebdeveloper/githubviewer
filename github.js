(function(){


var github = function($http){
  
  
  /*Quando chamare o getUser, será feita uma chamada ao http.get
  esse metodo retorna uma promise, será chamado um .then nessa promise
  e quando estiver completo, irá chamar essa function que recebe o response
  e returna a informação em si */
  
  var getUser = function(username){
    //retorno do retorno da informação
    return $http.get("https://api.github.com/users/"+ username).then(function(response){
      return response.data;
    });
    
    
  };
  
  
  //Retorna a promise que irá retornar uma informação igual no getUser
  var getRepos = function(user){
        //retorno do retorno da informação

      return  $http.get(user.repos_url).then(function(response){
          return response.data;
        });

  };
  
  
  var getRepoDetails = function(username,reponame){
    var repo;
    var repoUrl = "https://api.github.com/repos/" + username +"/" + reponame;
    
    //Fazendo um pequeno processamento para retornar a informação.
    //com isso o .then() pode ser encadeado e assim ir chamando as informações
    //Com isso voce vai montando a var repo da maneira necessaria 
    //cada retorno serve como input para a proxima function sucedida
    return $http.get(repoUrl).then(function(response){
      repo =response.data
      return $http.get(repoUrl + "/collaborators");
    }).then(function(response){
      //pegando a informação dos colaboradores e anexando à var repo
       repo.collaborators = response.data;
       return repo;
    });
    
    
    
  };
  
  
  
  //Revealing Module design pattern
  return  {
    //Expondo os metodos atraves desses atributos
    getUser: getUser,
    getRepos: getRepos,
    getRepoDetails: getRepoDetails
  };
  
  
};

//Não está criando o modulo, apenas fazendo a referencia à esse modulo já criado
//Ja que o script.js é carregado antes 
//Lá que o módulo é criado
var module = angular.module("githubViewer");


//Registrando o modulo no angular
//Coloca-se o modulo, e passa-se a function que está relacionada declarada la em cima.
module.factory("github", github);
//sempre que chamado "me de algo chamado github" irá retornar o objeto que possui um getUser e um getRepos






}());