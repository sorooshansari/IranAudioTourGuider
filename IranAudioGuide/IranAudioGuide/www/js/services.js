angular.module('app.services', [])

.factory('SlideShows', function () {
    var SlideShow = [
        {
            id: 0,
            URL: '../img/2.jpg'
        },
    {
        id: 1,
        URL: '../img/3.jpg'
    }];

    return {
        all: function () {
            return SlideShow;
        },
        get: function (Slide_id) {
            for (var i = 0; i < SlideShow.length; i++) {
                if (SlideShow[i].id === parseInt(Slide_id)) {
                    return SlideShow[i];
                }
            }
            return null;
        }
    };
})
.factory('Places', function () {

    var Places = [{
        id: 0,
        name: 'place one',
        city: 'Shiraz',
        address: 'Street Roseville NH 11523',
        logo: 'img/1.jpg'
    }, {
        id: 1,
        name: 'place two',
        city: 'Shiraz',
        address: 'Street Roseville NH 11523',
        logo: 'img/2.jpg'
    }, {
        id: 2,
        name: 'place three',
        city: 'Shiraz',
        address: 'Street Roseville NH 11523',
        logo: 'img/3.jpg'
    }, {
        id: 3,
        name: 'place four',
        city: 'Shiraz',
        address: 'Street Roseville NH 11523',
        logo: 'img/4.jpg'
    }, {
        id: 4,
        name: 'place five',
        city: 'Shiraz',
        address: 'Street Roseville NH 11523',
        logo: 'img/5.jpg'
    }, {
        id: 5,
        name: 'place six',
        city: 'Shiraz',
        address: 'Street Roseville NH 11523',
        logo: 'img/6.jpg'
    }];

    return {
        all: function () {
            return Places;
        },
        remove: function (place) {
            Places.splice(Places.indexOf(place), 1);
        },
        get: function (id_local) {
            for (var i = 0; i < Places.length; i++) {
                if (Places[i].id === parseInt(id_local)) {
                    return Places[i];
                }
            }
            return null;
        },
        range: function (from, to) {
            return Places.slice(from, to);
        }
    };
})
.factory('BlankFactory', [function () {

}])

.service('BlankService', [function () {

}]);

