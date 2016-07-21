
angular.module('app', ['ionic', 'ionic.service.core', 'app.controllers', 'app.routes', 'app.services', 'app.directives', 'ngCordova'])

.run(function ($ionicPlatform, $rootScope, $cordovaDialogs, ApiServices, dbServices, FileServices) {
    $ionicPlatform.ready(function () {
        $rootScope.waitingUpdates = -1;
        navigator.splashscreen.show();
        //checkConnection();

        // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
        // for form inputs)
        if (window.cordova && window.cordova.plugins && window.cordova.plugins.Keyboard) {
            cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
            cordova.plugins.Keyboard.disableScroll(true);
        }
        if (window.StatusBar) {
            // org.apache.cordova.statusbar required
            StatusBar.styleDefault();
        }
        $rootScope.audio = {};
        $rootScope.audio.media = null;

        dbServices.openDB();
        var LstUpdtNum = window.localStorage.getItem("LastUpdateNumber");
        if (LstUpdtNum) {
            navigator.splashscreen.hide();
        }
        else {
            FileServices.createDirs();
            //FileServices.downloadTest();
            dbServices.initiate();
            var networkState = navigator.connection.type;
            while (networkState == Connection.NONE)
                alert('check internet connection');
            //$cordovaDialogs.alert('check your internet connection and try again.', 'Network error', 'Try again')
            ApiServices.GetAll(0);
            //window.localStorage.setItem("LastUpdateNumber", 0);
        }
    });
    $rootScope.$on('ServerConnFailde', function (event, error) {
        console.log(error);
        alert("try again.");
        var LstUpdtNum = window.localStorage.getItem("LastUpdateNumber") || 0;
        ApiServices.GetAll(LstUpdtNum);
        //$cordovaDialogs.alert("Couldn�t connect to server, check your internet connection and try again.", 'Network error', 'Try again');
    });
    $rootScope.$on('PopulateTables', function (event, Data) {
        dbServices.populatePlaces(Data.Data.Places);
        dbServices.populateAudios(Data.Data.Audios);
        dbServices.populateCities(Data.Data.Cities);
        dbServices.populateImages(Data.Data.Images);
        waitForUpdate(Data.Data.UpdateNumber);
    });
    $rootScope.$on('CleanPlaceTumbnail', function (event, placeId) {
        dbServices.CleanPlaceTumbnail(placeId);
    });
    var waitForUpdate = function (updateNumber) {
        if ($rootScope.waitingUpdates == 0) {
            window.localStorage.setItem("LastUpdateNumber", updateNumber);
            navigator.splashscreen.hide();
        }
        else
            setTimeout(waitForUpdate, 100, updateNumber);
    };
});
function checkConnection() {
    var networkState = navigator.connection.type;

    var states = {};
    states[Connection.UNKNOWN] = 'Unknown connection';
    states[Connection.ETHERNET] = 'Ethernet connection';
    states[Connection.WIFI] = 'WiFi connection';
    states[Connection.CELL_2G] = 'Cell 2G connection';
    states[Connection.CELL_3G] = 'Cell 3G connection';
    states[Connection.CELL_4G] = 'Cell 4G connection';
    states[Connection.CELL] = 'Cell generic connection';
    states[Connection.NONE] = 'No network connection';

    alert('Connection type: ' + states[networkState]);
}