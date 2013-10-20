SQRL = (function(undefined) {

    var generateMasterKey = function(moreEntropy) {
        var prng = uheprng();
        prng.initState();

        if (moreEntropy) {
            prng.addEntropy(moreEntropy);
        }

        if (window.crypto.getRandomValues) {
            var array = new Uint32Array(16);
            window.crypto.getRandomValues(array);
            for (var ir = 0; ir < array.length; ir++) {
                prng.addEntropy(array[ir]);
            }
        }
        
        for (var s = '', i = 0; i < 64; i++ ) {
            var r = prng(16);
            var hex = (+r).toString(16).toUpperCase();
            s += hex; 
        }
        return s;
    };

    return {
        'generateMasterKey': generateMasterKey
    };

})();
