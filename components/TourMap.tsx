"use client";

import { useEffect, useRef, useMemo, useState } from "react";
import { MapContainer, TileLayer, Marker, Popup, Polyline, useMap } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import type { Location, RoutePath } from "@/lib/locations";

// Fix for default marker icons in Next.js
delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon-2x.png",
  iconUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon.png",
  shadowUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-shadow.png",
});

// Custom icon for adventure theme
const createCustomIcon = (number: number, isActive: boolean = false, isHovered: boolean = false) => {
  const size = isActive ? 40 : 32;
  const borderWidth = isActive ? 4 : isHovered ? 4 : 3;
  const shadow = isHovered 
    ? "0 8px 16px rgba(251, 191, 36, 0.6), 0 4px 8px rgba(0,0,0,0.4)" 
    : isActive 
    ? "0 6px 12px rgba(0,0,0,0.4)" 
    : "0 4px 8px rgba(0,0,0,0.3)";
  const borderColor = isHovered ? "#fcd34d" : "#fbbf24"; // lighter amber when hovered
  const zIndex = isHovered ? "1000" : isActive ? "500" : "100";
  const fontSize = isActive ? "18px" : "14px";
  
  return L.divIcon({
    className: `custom-marker ${isHovered ? "marker-hovered" : ""} ${isActive ? "marker-active" : ""}`,
    html: `
      <div style="
        background: linear-gradient(135deg, #92400e 0%, #78350f 100%);
        width: ${size}px;
        height: ${size}px;
        border-radius: 50% 50% 50% 0;
        transform: rotate(-45deg) scale(${isHovered ? "1.1" : "1"});
        border: ${borderWidth}px solid ${borderColor};
        box-shadow: ${shadow};
        position: relative;
        transition: all 0.3s ease;
        z-index: ${zIndex};
      ">
        <div style="
          transform: rotate(45deg);
          color: ${borderColor};
          font-size: ${fontSize};
          font-weight: bold;
          display: flex;
          align-items: center;
          justify-content: center;
          height: 100%;
          text-shadow: 1px 1px 2px rgba(0,0,0,0.5);
          font-family: system-ui, -apple-system, sans-serif;
        ">${number}</div>
      </div>
    `,
    iconSize: [size, size],
    iconAnchor: [size / 2, size],
    popupAnchor: [0, -size],
  });
};

interface MapControllerProps {
  center: [number, number];
  zoom: number;
}

function MapController({ center, zoom }: MapControllerProps) {
  const map = useMap();
  const hasInitializedRef = useRef(false);
  
  useEffect(() => {
    // Only set initial view once, don't interfere with subsequent zoom changes
    if (!hasInitializedRef.current) {
      map.setView(center, zoom);
      hasInitializedRef.current = true;
    }
  }, [map, center, zoom]);
  
  return null;
}

interface ActiveLocationControllerProps {
  activeLocationId: string | null;
  locations: Location[];
  showFullRoute: boolean;
}

function ActiveLocationController({ activeLocationId, locations, showFullRoute }: ActiveLocationControllerProps) {
  const map = useMap();
  const previousLocationIdRef = useRef<string | null>(null);
  const previousShowFullRouteRef = useRef(false);
  const targetZoom = 17; // Consistent zoom level for all focused markers
  
  useEffect(() => {
    // Handle full route display
    if (showFullRoute) {
      if (!previousShowFullRouteRef.current) {
        // Show full route - calculate bounds to include all locations
        const bounds = L.latLngBounds(
          locations.map((loc) => loc.coordinates)
        );
        map.fitBounds(bounds, {
          padding: [50, 50],
          animate: true,
          duration: 0.5,
        });
        previousShowFullRouteRef.current = true;
        previousLocationIdRef.current = null;
      }
      // Don't do anything else if showing full route
      return;
    }
    
    // If we were showing full route but now we're not, reset the flag
    if (!showFullRoute && previousShowFullRouteRef.current) {
      previousShowFullRouteRef.current = false;
    }
    
    // Handle location focus when not showing full route
    if (activeLocationId && activeLocationId !== previousLocationIdRef.current) {
      const activeLocation = locations.find((loc) => loc.id === activeLocationId);
      if (activeLocation) {
        // Always set view with target zoom for consistency
        map.setView(activeLocation.coordinates, targetZoom, {
          animate: true,
          duration: 0.5,
        });
        previousLocationIdRef.current = activeLocationId;
      }
    } else if (!activeLocationId) {
      previousLocationIdRef.current = null;
    }
  }, [map, activeLocationId, locations, targetZoom, showFullRoute]);
  
  return null;
}

interface MarkerWithIconProps {
  location: Location;
  number: number;
  isActive: boolean;
  onLocationClick: (locationId: string) => void;
}

function MarkerWithIcon({ location, number, isActive, onLocationClick }: MarkerWithIconProps) {
  const markerRef = useRef<L.Marker | null>(null);
  const [isHovered, setIsHovered] = useState(false);
  
  useEffect(() => {
    if (markerRef.current) {
      markerRef.current.setIcon(createCustomIcon(number, isActive, isHovered));
      // Set z-index for active markers
      if (isActive && !isHovered) {
        markerRef.current.setZIndexOffset(500);
      } else if (isHovered) {
        markerRef.current.setZIndexOffset(1000);
      } else {
        markerRef.current.setZIndexOffset(0);
      }
    }
  }, [number, isActive, isHovered]);
  
  return (
    <Marker
      position={location.coordinates}
      icon={createCustomIcon(number, isActive, isHovered)}
      eventHandlers={{
        add: (e) => {
          markerRef.current = e.target;
          // Set initial z-index for active markers
          if (isActive) {
            e.target.setZIndexOffset(500);
          }
        },
        mouseover: (e) => {
          setIsHovered(true);
          if (e.target) {
            e.target.setZIndexOffset(1000);
          }
        },
        mouseout: (e) => {
          setIsHovered(false);
          if (e.target) {
            if (isActive) {
              e.target.setZIndexOffset(500);
            } else {
              e.target.setZIndexOffset(0);
            }
          }
        },
      }}
      zIndexOffset={isActive ? 500 : isHovered ? 1000 : 0}
    >
      <Popup className="custom-popup">
        <div className="p-2">
          <h3 className="font-serif text-lg font-bold text-amber-900">{location.name}</h3>
          <p className="mt-1 text-sm text-amber-800/80">{location.description}</p>
          <button
            onClick={() => {
              onLocationClick(location.id);
            }}
            className="mt-2 w-full text-left text-xs italic text-amber-700/70 hover:text-amber-900 transition-colors underline cursor-pointer"
          >
            View this location
          </button>
        </div>
      </Popup>
    </Marker>
  );
}

interface TourMapProps {
  locations: Location[];
  routePaths: RoutePath[];
  onLocationClick: (locationId: string) => void;
  activeLocationId?: string | null;
  showFullRoute?: boolean;
}

export default function TourMap({ locations, routePaths, onLocationClick, activeLocationId = null, showFullRoute = false }: TourMapProps) {
  const mapRef = useRef<L.Map | null>(null);

  // Calculate center point from all locations
  const centerLat = locations.reduce((sum, loc) => sum + loc.coordinates[0], 0) / locations.length;
  const centerLng = locations.reduce((sum, loc) => sum + loc.coordinates[1], 0) / locations.length;
  const center: [number, number] = [centerLat, centerLng];

  // Route path color matching KML (orange/amber)
  const routePathOptions = {
    color: "#f59e0b", // amber-500
    weight: 5,
    opacity: 0.8,
  };

  return (
    <div className="relative h-[500px] w-full overflow-hidden rounded-lg border-4 border-amber-900/30 shadow-2xl sm:h-[600px]">
      <MapContainer
        center={center}
        zoom={15}
        style={{ height: "100%", width: "100%" }}
        className="z-0"
        ref={mapRef}
      >
        <MapController center={center} zoom={15} />
        <ActiveLocationController activeLocationId={activeLocationId} locations={locations} showFullRoute={showFullRoute} />
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {/* Render route paths */}
        {routePaths.map((path, index) => (
          <Polyline
            key={`path-${index}`}
            positions={path.coordinates}
            pathOptions={routePathOptions}
          />
        ))}
        {/* Render location markers */}
        {locations.map((location, index) => (
          <MarkerWithIcon
            key={location.id}
            location={location}
            number={index + 1}
            isActive={activeLocationId === location.id}
            onLocationClick={onLocationClick}
          />
        ))}
      </MapContainer>
    </div>
  );
}

