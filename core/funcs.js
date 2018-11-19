const Q = require('q');

var promiseWhile = (condition, body) => {
    var done = Q.defer();

    function loop() {
        if (!condition())
            return done.resolve();
        Q.when(body(), loop, done.reject);
    }

    Q.nextTick(loop);

    return done.promise;
};

var promiseForEach = (tab, body) => {
    var i = 0;
    var l = tab.length;
    return promiseWhile(() => {
        return i < l;
    }, () => {
        return Q.when(body(tab[i], i))
            .then(result => {
                i++;
                return Q.when(result);
            });
    });
};

module.exports.promiseWhile = promiseWhile;
module.exports.promiseForEach = promiseForEach;
