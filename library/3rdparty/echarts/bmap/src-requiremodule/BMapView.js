define(function (require) {

    return require('echarts').extendComponentView({
        type: 'bmap',

        render: function (bMapModel, ecModel, api) {debugger
            var rendering = true;

            var bmap = bMapModel.getBMap();
            var viewportRoot = api.getZr().painter.getViewportRoot();
            var coordSys = bMapModel.coordinateSystem;
            var moveHandler = function (type, target) {
                if (rendering) {
                    return;
                }
                var offsetEl = viewportRoot.parentNode.parentNode.parentNode;
                var mapOffset = [
                    -parseInt(offsetEl.style.left, 10) || 0,
                    -parseInt(offsetEl.style.top, 10) || 0
                ];
                viewportRoot.style.left = mapOffset[0] + 'px';
                viewportRoot.style.top = mapOffset[1] + 'px';

                coordSys.setMapOffset(mapOffset);
                bMapModel.__mapOffset = mapOffset;

                api.dispatchAction({
                    type: 'bmapRoam'
                });
            };

            function zoomEndHandler() {
                if (rendering) {
                    return;
                }
                api.dispatchAction({
                    type: 'bmapRoam'
                });
            }

            bmap.off('pan', this._oldMoveHandler);
            // FIXME
            // Moveend may be triggered by centerAndZoom method when creating coordSys next time
            // bmap.removeEventListener('moveend', this._oldMoveHandler);
            bmap.off('zoom-end', this._oldZoomEndHandler);
            bmap.on('pan', moveHandler);
            // bmap.addEventListener('moveend', moveHandler);
            bmap.on('zoom-end', zoomEndHandler);

            this._oldMoveHandler = moveHandler;
            this._oldZoomEndHandler = zoomEndHandler;
            rendering = false;
        }
    });
});