import { Box } from "@open-pioneer/chakra-integration";
import { MapContainer } from "@open-pioneer/experimental-ol-map";
import { useService } from "open-pioneer:react-hooks";
import { useEffect } from "react";
import { useAsync } from "react-use";

import VectorLayer from "ol/layer/Vector";
import VectorSource from "ol/source/Vector";
import GeoJSON from "ol/format/GeoJSON";
import { ResourceGeometry } from "../../../views/Dataset/Dataset";

export function Map(props: { geometry: ResourceGeometry; mapId: string }) {
    const { geometry, mapId } = props;
    const height = "45vh";

    const geoJSONFormat = new GeoJSON();
    const features = geoJSONFormat.readFeatures(geometry, {
        featureProjection: "EPSG:3857"
    });

    const vectorSource = new VectorSource({
        features: features
    });

    const vectorLayer = new VectorLayer({
        source: vectorSource
    });

    const olMapRegistry = useService("ol-map.MapRegistry");
    const mapState = useAsync(async () => await olMapRegistry.getMap(mapId));

    useEffect(() => {
        if (mapState.value) {
            const map = mapState.value;
            map.getLayers().forEach((layer) => {
                if (layer instanceof VectorLayer) {
                    map.removeLayer(layer);
                }
            });
            map.addLayer(vectorLayer);
            map.getView().fit(vectorSource.getExtent(), { maxZoom: 4 });
        }
    }, [mapState.value, vectorLayer]);


    return (
        <Box w="100%" h={height} overflow="hidden" position="relative" flex="1">
            <MapContainer mapId={mapId} />
        </Box>
    );
}
