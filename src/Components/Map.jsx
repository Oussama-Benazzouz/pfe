import { useState } from "react";
import ReactMapGL from "react-map-gl";

function Map() {
  const [viewport, setViewport] = useState({
    width: "100%",
    height: "100vh",
    latitude: 30.427755,
    longitude: -9.598107,
    zoom: 8,
  });

  return (
    <ReactMapGL
      mapStyle={"mapbox://styles/jokra25111/clffezd2y00n701mocwhbubqm"}
      mapboxAccessToken={process.env.mapbox_key}
      {...viewport}
      onViewportChange={(nextViewport) => setViewport(nextViewport)}
    ></ReactMapGL>
  );
}

export default Map;
