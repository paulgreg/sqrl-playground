Camera = (function(undefined) {

    isCameraAvailable = function() {
        return !!(navigator.getUserMedia || navigator.webkitGetUserMedia ||
        navigator.mozGetUserMedia || navigator.msGetUserMedia);
    };

    getEntropyFromCamera = function(elementToInsertCanvas, callback) {
        if (isCameraAvailable()) {
            var video = document.createElement('video');
            var canvas = document.createElement('canvas');
            var width = 640;
            var height = 480;
            var stream;

            navigator.getMedia = ( navigator.getUserMedia || navigator.webkitGetUserMedia || navigator.mozGetUserMedia || navigator.msGetUserMedia);

            navigator.getMedia( { video: true, audio: false }, function(s) {
                stream = s;
                if (navigator.mozGetUserMedia) {
                    video.mozSrcObject = stream;
                } else {
                    var vendorURL = window.URL || window.webkitURL;
                    video.src = vendorURL.createObjectURL(stream);
                }
                video.play();
            }, function(err) {
                console.log("An error occured! " + err);
                callback();
            });

            var captureVideo = function() {
                canvas.getContext('2d').drawImage(video, 0, 0, width, height);
                stream.stop();

                var data = canvas.toDataURL('image/bmp');
                var hash = CryptoJS.SHA3(data, { outputLength: 512 });

                if (elementToInsertCanvas) {
                    elementToInsertCanvas.appendChild(canvas);
                }

                callback(hash.toString(CryptoJS.enc.Hex));
            };

            video.addEventListener('canplay', function(){
                canvas.width = width;
                canvas.height = height;
                setTimeout(captureVideo, 2500);
            }, false);
        } else {
            calback();
        }
    };

    return {
        'isCameraAvailable': isCameraAvailable,
        'getEntropyFromCamera': getEntropyFromCamera
    };
})();

