import React, { useEffect, useRef, useState } from "react";
import Globe from "react-globe.gl";
import { useLayoutEffect } from "react";

export default function GlobeCanvas() {
  const globeRef = useRef();
  const containerRef = useRef();

  const [countries, setCountries] = useState([]);
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });

  const highlightedCountries = ["United States", "Canada", "Brazil"];
  // Load countries GeoJSON
  useEffect(() => {
    fetch("/world.geojson") // Make sure this file exists in /public
      .then((res) => res.json())
      .then((data) => setCountries(data.features));
  }, []);

  // Auto-rotate
  useEffect(() => {
    if (globeRef.current) {
      globeRef.current.controls().autoRotate = true;
      globeRef.current.controls().autoRotateSpeed = 1;
    }
  }, [globeRef.current]);

  // ResizeObserver to track parent size
  useEffect(() => {
    const observer = new ResizeObserver(([entry]) => {
      const { width, height } = entry.contentRect;
      setDimensions({ width, height });
    });

    if (containerRef.current) observer.observe(containerRef.current);
    return () => observer.disconnect();
  }, []);

  const getPolygonCapColor = (country) => {
    if (highlightedCountries.includes(country.properties.ADMIN)) {
      return "rgba(255, 0, 0, 0.8)"; // Highlighted color (red)
    }
    return "rgba(238, 243, 243, 0.6)"; // Default color (cyan)
  };

  return (
    <div
      ref={containerRef}
      style={{
        width: "100%",
        height: "100%",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {dimensions.width > 0 && dimensions.height > 0 && (
        <Globe
          ref={globeRef}
          width={dimensions.width}
          height={dimensions.height}
          globeImageUrl="//cdn.jsdelivr.net/npm/three-globe/example/img/earth-dark.jpg"
          polygonsData={countries}
          polygonSideColor={() => "rgba(11, 65, 146, 0.15)"}
          polygonCapColor={getPolygonCapColor} // Apply the custom color logic
          polygonStrokeColor={() =>
            localStorage.getItem("isDark") === "true" ? "gray" : "white"
          }
          polygonLabel={({ properties }) =>
            `<div style="text-align: left;">
              <strong>${properties.ADMIN}</strong><br/>
              Population: ${Number(properties.POP_EST).toLocaleString()}<br/>
              Region: ${properties.REGION_UN || "N/A"}
            </div>`
          }
          backgroundColor="rgba(0,0,0,0)"
          atmosphereColor="rgba(209, 209, 209, 0)" // ✅ Add gray halo
          atmosphereAltitude={0.15}
        />
      )}
    </div>
  );
}
