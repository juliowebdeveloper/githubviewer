
(function(){
  
  

//Agora só há uma referencia ao githubviewer (criado no app.js)
 var app = angular.module("githubViewer");

//Adicionando o built-in service $interval para fazer a chamada do countdown a cada x segundos
//anchorScroll - permite que a window desça até um monto da tela especifico
//locaton - permite manipular um fragmento de id  dentro da URL   
var MainController = function($scope,  $interval, $location){

  
  //Função search do scope que recebe o username  - Função de escopo que pode ser chamada na pagina
  $scope.search = function(username){
      if(countdownInterval){
        $interval.cancel(countdownInterval);
        $scope.countdown = null;
      }
      //utilizando o location para navegar entre as urls passando o username como parametro
      $location.path("/user/" + username);
      
      //
      
  };
  
  
  var countdownInterval = null;
  var startCountdown = function(){
    //Parametros: qual é a função, o tempo a ser chamada, e quantas vezes será chamada(passando o valor da countdown)
    countdownInterval = $interval(decrementCountdown, 1000, $scope.countdown);
  };
  
  //Fazendo um jogo com o usuário, contagem regressiva até 0 e fará então uma busca automatica com o que estiver no input
  var decrementCountdown = function(){
     $scope.countdown -=1;
     if($scope.countdown < 1){
       $scope.search($scope.username);
     }
  };
  

  $scope.countdown = 5;
  $scope.message = "Github Viewer";
  $scope.username = "Angular";
  
  //chamando a startCountdown() assim que carrega
  startCountdown();
};





//Registrando o controller no módulo e dizendo qual function que será 
//quando esse maincontroller for requerido
//app.controller("MainController", MainController);

//Nota importante: Em aplicações Angular, normalmente se passa o Controller de maneira diferente
//Devido à um processo chamado Minifier, que diminui o nome dos parametros utilizados
//Para que a pagina carregue mais rapido. Nesse processo o código fica dessa maneira:
app.controller("MainController", MainController);
//Quando se cria o MainController, precisa-se passar $scope e $http
//Que são os parametros que o angular enxerga. Isso não importa o nome que você de para eles dentro da function


}());