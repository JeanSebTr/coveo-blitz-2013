
function SearchController($scope, $http){
    $scope.data = {};
    $scope.query = null;
    $scope.search = function(){
        $http.get('/search?q=' + $scope.query).
            success(function(data, status){
                $scope.data = data;
            }).
            error(function(data, status){
                $scope.data = {};
            });
    };
};
