angular.module('app.controllers', [])

.controller('homeCtrl', function ($scope, SlideShows, Places) {
    $scope.PageTitle = 'Iranian Audio Guide'
    $scope.SlideShows = SlideShows.all();
    $scope.Places = Places.all();
})

.controller('favoritsCtrl', function ($scope, Places) {
    $scope.PageTitle = "Favorits"
    $scope.Places = Places.range(2, 5);

})

.controller('searchCtrl', function ($scope) {
    $scope.PageTitle = "Search"

})

.controller('palaceCtrl', function ($scope) {
    $scope.PageTitle = "Tomb of Hafez"

})
