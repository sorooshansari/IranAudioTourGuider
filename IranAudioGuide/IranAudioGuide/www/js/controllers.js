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

.controller('palaceCtrl', function ($scope, PlayList, $rootScope) {
    $scope.PageTitle = "Tomb of Hafez"
    var mediaStatusCallback;
    $scope.playList = PlayList.all();
    var media = null;
    $scope.playPause = function (audio_id) {
        if ($rootScope.activeAudioId == audio_id) {
            if ($rootScope.AudioPlayed) {
                pause(audio_id);
            }
            else {
                play(audio_id);
            }
        }
        else {
            if (media != null) {
                pause($rootScope.activeAudioId);
                media.release();
            }
            media = new Media(PlayList.get(audio_id).URL, null, null, mediaStatusCallback);
            $rootScope.activeAudioId = audio_id;
            play(audio_id);
        }
    }
    var play = function (id) {
        media.play();
        $rootScope.AudioPlayed = true;
        document.getElementById("i-" + id).classList.remove('ion-play');
        document.getElementById("i-" + id).classList.add('ion-pause');
    }
    var pause = function (id) {
        media.pause();
        $rootScope.AudioPlayed = false;
        document.getElementById("i-" + id).classList.remove('ion-pause');
        document.getElementById("i-" + id).classList.add('ion-play');
    }
});