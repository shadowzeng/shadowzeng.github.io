require([
    '../../lib/zrender/zrender-4.0.4'
], function(zrender) {debugger
    var container = document.getElementById('map');
    var zr = zrender.init(container);

    var w = zr.getWidth();
    var h = zr.getHeight();

    var r = 40;
    var circle = new zrender.Circle({
        shape: {
            cx: r,
            cy: h / 2,
            r: r
        },
        style: {
            fill: 'transparent',
            stroke: '#FF6EBE'
        },
        silent: true
    });

    // circle.animate('shape', true)
    //     .when(5000, {
    //         cx: w - r
    //     })
    //     .when(10000, {
    //         cx: r
    //     })
    //     .start();

    zr.add(circle);
});