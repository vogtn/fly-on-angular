angular.module("FlyApp")
.controller("PlanesCtrl", ["$scope", "PlanesAPI", function($scope, PlanesAPI){
  $scope.title = "Look at all my planes!";
  $scope.planes = [];

  PlanesAPI.getPlanes().then(function success(response){
    $scope.planes = response.data;
  }, function error(err){
    console.log("Oh no", err);
  })
}])
.controller("DetailCtrl", ["$scope", "$stateParams", "PlanesAPI", function($scope, $stateParams, PlanesAPI){
  $scope.plane = {};

  PlanesAPI.getPlane($stateParams.id).then(function success(response){
    console.log("success", response);
    $scope.plane = response.data;
  }, function error(err){
    console.log("error", err);
  })
}])
.filter("fixgrammar", function() {
  return function(input){
    if(input == 1){
      return "1 engine";
    }
    else{
      return input + " engines";
    }
  }
})

.controller("DeleteCtrl", ["$scope", "$stateParams", "PlanesAPI", function($scope, $stateParams, PlanesAPI){

    PlanesAPI.deletePlane($stateParams.id);
}])

.controller("CreateCtrl", ["$scope","$location", "$stateParams", "PlanesAPI", function($scope, $location,  $stateParams, PlanesAPI){
    // $scope.myFunc = function () {
    //     console.log('itworks')
    // }
    $scope.submit = function() {
        $location.path('/')
        console.log(this.engine);
        var plane = {
            "manufacturer": this.manufacturer,
            "model": this.model,
            'engines': this.engine,
            'url': this.url
        }
        PlanesAPI.addPlane(plane)
    }
}]);