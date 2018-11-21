angular.module('MyApp', ['ngMaterial', 'ngMessages'])
 .controller('MyCtrl', function ($scope, $http , $mdToast) {
 
 $scope.login = {};
 $scope.company = {};
 $scope.client = {};

    var serverDetails="";

    $scope.signup = function(data){
        var techtrill = data;

        $http({
            method: 'post',
            url: serverDetails+''+techtrill;
        }).then(function (response)) {
            if(response.data.message != null && response.data.company){
                $scope.company.name=;
                $scope.company.email=;
                $scope.company.phonemunber=;
                $scope.company.username=;
                $scope.company.password=;
                $scope.company.confirmpassword=;
                $scope.comapny.termandconditions=;
            else if(response.data.message != null && response.data.client){
                $scope.client.name=;
                $scope.client.email=;
                $scope.client.phonemunber=;
                $scope.client.username=;
                $scope.client.password=;
                $scope.client.confirmpassword=;
                $scope.client.termandconditions=;
            }
            
            }
        }
    }

    $scope.login = function(data){
        var companyLogin = data;
        var clientLogin = data;

        $http({
            method: 'get',
            url: ServerDetails+''+companyLogin;
        }).then(function (response)) {
            if(response.data.message != null && response.data.company){
                $scope.login.company.username=;
                $scope.login.company.password=;
            }
            else if(response.data.message != null && response.data.client){
                $scope.login.client.username=;
                $scope.login.client.password=;
            }
        }
    }

 });