const makeWorker = script => {
    const URL = window.URL || window.webkitURL;
    const { Blob, } = window;
    const { Worker, } = window;

    if (!URL || !Blob || !Worker || !script) {
        return null;
    }

    const blob = new Blob([script, ]);

    return new Worker(URL.createObjectURL(blob));
};

module.exports.makeWorker = makeWorker;
