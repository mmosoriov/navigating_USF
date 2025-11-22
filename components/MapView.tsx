import { useEffect, useRef, useState } from "react";
import { Crosshair, MapPin, Star } from "lucide-react";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";

interface MapViewProps {
  userLocation: { lat: number; lng: number } | null;
  destination: { lat: number; lng: number; name: string } | null;
  route: Array<[number, number]> | null;
}

export function MapView({ userLocation, destination, route }: MapViewProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [zoom, setZoom] = useState(1);

  // USF Campus center (Tampa, FL)
  const campusCenter = { lat: 28.0587, lng: -82.4139 };

  const handleRecenter = () => {
    setZoom(1);
  };

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const width = canvas.width;
    const height = canvas.height;

    // Clear canvas
    ctx.fillStyle = "#f0f4f8";
    ctx.fillRect(0, 0, width, height);

    // Draw grid
    ctx.strokeStyle = "#d1d5db";
    ctx.lineWidth = 1;
    for (let i = 0; i < width; i += 40) {
      ctx.beginPath();
      ctx.moveTo(i, 0);
      ctx.lineTo(i, height);
      ctx.stroke();
    }
    for (let i = 0; i < height; i += 40) {
      ctx.beginPath();
      ctx.moveTo(0, i);
      ctx.lineTo(width, i);
      ctx.stroke();
    }

    // Draw campus buildings (mock representation)
    const buildings = [
      { x: 150, y: 180, w: 80, h: 60, label: "Library" },
      { x: 300, y: 150, w: 100, h: 80, label: "Marshall" },
      { x: 450, y: 200, w: 70, h: 70, label: "ENG" },
      { x: 250, y: 300, w: 90, h: 50, label: "MSC" },
      { x: 400, y: 350, w: 60, h: 60, label: "BSF" },
    ];

    buildings.forEach((building) => {
      ctx.fillStyle = "#cbd5e1";
      ctx.fillRect(building.x, building.y, building.w, building.h);
      ctx.strokeStyle = "#94a3b8";
      ctx.lineWidth = 2;
      ctx.strokeRect(building.x, building.y, building.w, building.h);
    });

    // Draw route if available
    if (route && route.length > 0) {
      ctx.strokeStyle = "#006747";
      ctx.lineWidth = 4;
      ctx.lineCap = "round";
      ctx.lineJoin = "round";
      
      ctx.beginPath();
      route.forEach((point, index) => {
        const x = point[0] * width;
        const y = point[1] * height;
        if (index === 0) {
          ctx.moveTo(x, y);
        } else {
          ctx.lineTo(x, y);
        }
      });
      ctx.stroke();

      // Draw route with shadow
      ctx.shadowColor = "rgba(0, 103, 71, 0.3)";
      ctx.shadowBlur = 8;
      ctx.stroke();
      ctx.shadowBlur = 0;
    }

    // Draw user location marker (green bull pin)
    if (userLocation) {
      const x = width * 0.3;
      const y = height * 0.4;

      // User marker circle
      ctx.fillStyle = "#006747";
      ctx.beginPath();
      ctx.arc(x, y, 16, 0, Math.PI * 2);
      ctx.fill();
      
      ctx.strokeStyle = "#ffffff";
      ctx.lineWidth = 3;
      ctx.stroke();

      // Inner dot
      ctx.fillStyle = "#ffffff";
      ctx.beginPath();
      ctx.arc(x, y, 6, 0, Math.PI * 2);
      ctx.fill();
    }

    // Draw destination marker (gold star)
    if (destination) {
      const x = width * 0.7;
      const y = height * 0.6;

      // Star background circle
      ctx.fillStyle = "#CFC493";
      ctx.beginPath();
      ctx.arc(x, y, 18, 0, Math.PI * 2);
      ctx.fill();
      
      ctx.strokeStyle = "#ffffff";
      ctx.lineWidth = 3;
      ctx.stroke();

      // Star shape
      ctx.fillStyle = "#ffffff";
      ctx.beginPath();
      for (let i = 0; i < 5; i++) {
        const angle = (i * 4 * Math.PI) / 5 - Math.PI / 2;
        const radius = i % 2 === 0 ? 8 : 4;
        const px = x + Math.cos(angle) * radius;
        const py = y + Math.sin(angle) * radius;
        if (i === 0) {
          ctx.moveTo(px, py);
        } else {
          ctx.lineTo(px, py);
        }
      }
      ctx.closePath();
      ctx.fill();
    }
  }, [userLocation, destination, route, zoom]);

  return (
    <div className="relative h-full w-full bg-[#f0f4f8] rounded-xl overflow-hidden border border-gray-200 shadow-inner">
      {/* Map Header Overlay */}
      <div className="absolute top-0 left-0 right-0 bg-gradient-to-b from-white/95 to-transparent p-4 z-10">
        <div className="flex items-center justify-between">
          <h3 className="text-gray-900">Campus Map</h3>
          <div className="flex gap-2">
            <Badge variant="secondary" className="bg-white shadow-sm">
              <div className="w-3 h-3 rounded-full bg-[#006747] mr-2"></div>
              You
            </Badge>
            {destination && (
              <Badge variant="secondary" className="bg-white shadow-sm">
                <Star className="w-3 h-3 text-[#CFC493] mr-1 fill-[#CFC493]" />
                Destination
              </Badge>
            )}
          </div>
        </div>
      </div>

      {/* Canvas Map */}
      <canvas
        ref={canvasRef}
        width={800}
        height={600}
        className="w-full h-full"
        style={{ imageRendering: "auto" }}
      />

      {/* Map loads here placeholder (when no data) */}
      {!userLocation && !destination && (
        <div className="absolute inset-0 flex items-center justify-center bg-[#f0f4f8]">
          <div className="text-center">
            <MapPin className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <p className="text-gray-500">Map loads here</p>
            <p className="text-sm text-gray-400 mt-1">
              Enter your location and search to see navigation
            </p>
          </div>
        </div>
      )}

      {/* Recenter Button */}
      <Button
        variant="secondary"
        size="icon"
        onClick={handleRecenter}
        className="absolute bottom-4 right-4 shadow-lg bg-white hover:bg-gray-50"
        title="Recenter map"
      >
        <Crosshair className="w-5 h-5" />
      </Button>

      {/* Route legend (if route exists) */}
      {route && (
        <div className="absolute bottom-4 left-4 bg-white rounded-lg shadow-lg p-3 border border-gray-200">
          <div className="flex items-center gap-2 text-sm">
            <div className="w-4 h-1 bg-[#006747] rounded-full"></div>
            <span className="text-gray-700">Walking route</span>
          </div>
        </div>
      )}
    </div>
  );
}
