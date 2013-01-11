
function SearchController($scope, $http){
    $scope.results = new Array();
    $scope.query = null;
    $scope.search = function(){
        $http.get('/api/search?q=' + $scope.query).
            success(function(data, status){
                $scope.results = data;
            }).
            error(function(data, status){
                $scope.results = new Array();
            });
    };
};
