angular.module('MyApp', ['ngMaterial', 'ngMessages' ])
  .controller('MyCtrl', function ($scope, $http , $mdToast) {

    $scope.user = {};
    $scope.redeemData = {}
    $scope.searchPhNo;
    $scope.loadSearchButton = false;
    $scope.myFile;
 
var serverDetails="http://localhost:8080/news/rest/";

    $scope.search = function (data) {
      var mobile = data;
      $http({
        method: 'get',
        url: serverDetails+'userdetMob/' + mobile,
      }).then(function (response) {
        $scope.loadSearchButton = true;
        $scope.responseStatus=response.data.message;
        if(response.data.message != null){
          $scope.user.email = response.data.message.emailId;
          $scope.user.availablecredits = response.data.message.userprofile.credits.availableCredits;
  
          $scope.user.usedcredits = response.data.message.userprofile.credits.usedCredits;
          $scope.user.name = response.data.message.fullName;
          $scope.user.phone = response.data.message.mobileNo;
  
        }else {
          alert(response.data.message );
          window.location = "index.html";
        }
      });
      $scope.loadSearchButton = false;
    }

    $scope.login = function () {
      var  myJSONObject = {
        "username":$scope.user.name,
        "email":"saihari.adabala@gmail.com",
        "userrole":"developer",
        "mobileno":"9491408259",
        "password": $scope.user.password
      };
      $http({
        method: "POST",
        url: serverDetails+"User/userlogin/",
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
          'webapp': false
      },
      data: myJSONObject
       }).then(function (response) {
         console.log(response.status);
         if(response.status == 200 || response.status == 201 ||response.status == 202){
          window.location.href = "home.html";
         }
         $scope.otpStatus=response.status;
          if(response.data.status){
            $mdToast.show (
              $mdToast.simple()
              .textContent(response.data.message )                       
              .hideDelay(3000)
           );
          }else{
            alert(response.data.message );
           
          }
      
      });
    };

    $scope.signUpPage = function () {
      var  myJSONObject = {
        "username":$scope.user.signUpName,
        "email":$scope.user.signUpEmail,
        "userrole":$scope.user.signUpRole,
        "mobileno":$scope.user.signUpPhoneNumber,
        "password": $scope.user.signUpPassword
      };
      $http({
        method: 'POST',
        url: serverDetails+'User/userregistration',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
          'webapp': 'false'
      },
        data: myJSONObject
       }).then(function (response) {
        //  console.log(response);
        if(response.status == 200 || response.status == 201 ||response.status == 202){
          window.location.href = "login.html";
         }
         $scope.otpStatus=response.status;
          if(response.data.status){
            $mdToast.show (
              $mdToast.simple()
              .textContent(response.data.message )                       
              .hideDelay(3000)
           );
          }else{
            alert(response.data.message );
           
          }
      
      });
    }

    
    function uploadFileToUrl(file) {
      var fd = new FormData();
      fd.append('file', file);
      /* $http({
        method: 'POST',
        url: serverDetails + 'image/uploadimage/43243242',
		data: fd,
		transformRequest : angular.identity,
		headers : { 'Content-Type' :  'multipart/form-data; boundary=----WebKitFormBoundary7MA4YWxkTrZu0gW'},
		transformRequest : angular.identity
		//mimeType : 'multipart/form-data'
      }).then(function (response) {
        //  console.log(response);
        if(response.status == 200 || response.status == 201 ||response.status == 202){
          window.location.href = "login.html";
         }
         $scope.otpStatus=response.status;
          if(response.data.status){
            $mdToast.show (
              $mdToast.simple()
              .textContent(response.data.message )                       
              .hideDelay(3000)
           );
          }else{
            alert(response.data.message );
           
          }
      
      }); */
	  
	   $http.post(serverDetails + 'image/uploadimage/43243242', fd,{
                    transformRequest : angular.identity,
                    headers : {
                        'Content-Type' : undefined
                    }})
                    .then(
                        function (response) {
                            if(response.status == 200 || response.status == 201 ||response.status == 202){
          window.location.href = "login.html";
         }
                        },
                        function (errResponse) {
                            alert(errResponse.data.errorMessage);
                            deferred.reject(errResponse);
                        }
                    );
                return deferred.promise;
    }
$scope.file = '';
    $scope.uploadFile = function(){
      var file =  document.getElementById('file').files[0];
      console.dir(file);
      uploadFileToUrl(file);
  };
  

    $scope.redeem = function (data) {
        $http({
          method: 'post',
          url: serverDetails+'UserOtpValidate/' + $scope.searchPhNo,
         data:data,
           headers:{'Content-Type': 'application/json'}
         }).then(function (response) {
            if(response.data.status == true){
              //$scope.user.availablecredits = ;
              $mdToast.show (
                $mdToast.simple()
                .textContent(response.data.message )                       
                .hideDelay(3000)
             );
             $scope.user.availablecredits = response.data.data.userprofile.credits.availableCredits;
              $scope.user.usedcredits = response.data.data.userprofile.credits.usedCredits;
              
            }else if(response.data.status == false){
               console.log(response.data.message);
                $mdToast.show (
                $mdToast.simple()
                .textContent(response.data.message)                       
                .hideDelay(3000)
             );
            }
        
        });
      }
  });
