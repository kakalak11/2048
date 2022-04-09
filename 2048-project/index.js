const onExitCallback = function () {
    console.log('nodejs is closing');
    return null;
};

const onLaunchCallback = function () {
    console.log('nodejs is starting');
    return null;
};

process.on('exit', onExitCallback);
process.on('start', onLaunchCallback);