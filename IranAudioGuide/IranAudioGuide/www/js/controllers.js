angular.module('app.controllers', [])

.controller('homeCtrl', function ($scope, SlideShows, Places, $cordovaSQLite, $cordovaFile) {
    $scope.PageTitle = 'Iranian Audio Guide'
    $scope.SlideShows = SlideShows.all();
    $scope.Places = Places.all();
    document.addEventListener('deviceready', function () {
        $scope.urlForImage = cordova.file.dataDirectory + "/TumbNameil_dir/testImage.png";
    });

    $scope.insert = function (firstname, lastname) {
        var query = "INSERT INTO people (firstname, lastname) VALUES (?,?)";
        $cordovaSQLite.execute(db, query, [firstname, lastname]).then(function (result) {
            console.log("INSERT ID -> " + result.insertId);
        }, function (error) {
            console.error(error);
        });
    };

    $scope.select = function (lastname) {
        var query = "SELECT firstname, lastname FROM people WHERE lastname = ?";
        $cordovaSQLite.execute(db, query, [lastname]).then(function (result) {
            if (result.rows.length > 0) {
                console.log("SELECTED -> " + result.rows.item(0).firstname + " " + result.rows.item(0).lastname);
            } else {
                console.log("NO ROWS EXIST");
            }
        }, function (error) {
            console.error(error);
        });
    };
})
.controller('favoritsCtrl', function ($scope, Places) {
    $scope.PageTitle = "Favorits"
    $scope.Places = Places.range(2, 5);

})

.controller('searchCtrl', function ($scope) {
    $scope.PageTitle = "Search"
    $scope.Clear = function () {
        $scope.search = '';
    }
})

.controller('palaceCtrl', function ($scope, AudioServices, $rootScope, $ionicLoading) {
    $scope.PageTitle = "Tomb of Hafez"
    $scope.Audios = AudioServices.all();
    var playNewAudio = function (url) {
        var audioPath = "file:///android_asset/www/audio/" + url;
        $rootScope.audio.media = new Media(audioPath, null, null, mediaStatusCallback);
        $rootScope.audio.media.play();
    }
    $scope.playPause = function (audio) {
        if ($rootScope.audio.media == null) { //No audio loaded yet
            playNewAudio(audio.URL);
            audio.icoStatus = 'pause';
        }
        else if ($rootScope.audio.index != audio.index) { //another audio is playing so firs pause the playing one
            $rootScope.media.pause();
            $scope.Audios($rootScope.audio.index).icoStatus = 'play';
            playNewAudio(audio.URL);
            audio.icoStatus = 'pause';
        }
        else if (audio.icoStatus == 'pause') {//same audio is playing
            $rootScope.media.pause();
            audio.icoStatus == 'play'
        }
        else { //playe paused audio
            $rootScope.media.play();
            audio.icoStatus == 'pause'
        }
        //if ($rootScope.activeAudioId == audio_id) {
        //    if ($rootScope.AudioPlayed) {
        //        pause(audio_id);
        //    }
        //    else {
        //        play(audio_id);
        //    }
        //}
        //else {
        //    if (media != null) {
        //        pause($rootScope.activeAudioId);
        //        media.release();
        //    }
        //    var src = PlayList.get(audio_id).URL;
        //    media = new Media(src, null, null, mediaStatusCallback);
        //    //media = $cordovaMedia.newMedia(src);
        //    $rootScope.activeAudioId = audio_id;
        //    play(audio_id);
        //}
    }

    var iOSPlayOptions = {
        numberOfLoops: 1,
        playAudioWhenScreenIsLocked: true
    }
    var mediaStatusCallback = function (status) {
        if (status == 1) {
            $ionicLoading.show({ template: 'Loading...' });
        } else {
            $ionicLoading.hide();
        }
    }
    //var play = function (id) {
    //    //$cordovaMedia.play(media);
    //    media.play();
    //    $rootScope.AudioPlayed = true;
    //    document.getElementById("i-" + id).classList.remove('ion-play');
    //    document.getElementById("i-" + id).classList.add('ion-pause');
    //}
    //var pause = function (id) {
    //    //$cordovaMedia.pause(media);
    //    media.pause();
    //    $rootScope.AudioPlayed = false;
    //    document.getElementById("i-" + id).classList.remove('ion-pause');
    //    document.getElementById("i-" + id).classList.add('ion-play');
    //}
});