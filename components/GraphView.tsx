import React, { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { Skeleton } from './ui/skeleton';
import { MapView } from './MapView';

interface GraphViewProps {
  // Map View props
  currentLocation: { lat: number; lng: number };
  destination: { lat: number; lng: number } | null;
  route: Array<[number, number]>; // Normalized coordinates (0-1 range)
  
  // Graph View props
  graphImageBase64?: string; // Base64 PNG from Matplotlib backend
  isLoadingGraph?: boolean;
  
  // General
  className?: string;
}

export function GraphView({
  currentLocation,
  destination,
  route,
  graphImageBase64,
  isLoadingGraph = false,
  className = '',
}: GraphViewProps) {
  const [activeView, setActiveView] = useState<'map' | 'graph'>('map');

  return (
    <div className={`flex flex-col h-full ${className}`}>
      <Tabs value={activeView} onValueChange={(value) => setActiveView(value as 'map' | 'graph')} className="flex flex-col h-full">
        <div className="border-b border-gray-200 bg-white px-4 py-2">
          <TabsList className="w-full grid grid-cols-2 bg-gray-100">
            <TabsTrigger 
              value="map"
              className="data-[state=active]:bg-[#006747] data-[state=active]:text-white"
            >
              Map View
            </TabsTrigger>
            <TabsTrigger 
              value="graph"
              className="data-[state=active]:bg-[#006747] data-[state=active]:text-white"
            >
              Graph View
            </TabsTrigger>
          </TabsList>
        </div>

        <TabsContent value="map" className="flex-1 m-0 p-0">
          <MapView
            userLocation={currentLocation}
            destination={destination ? { ...destination, name: 'Destination' } : null}
            route={route.length > 0 ? route : null}
          />
        </TabsContent>

        <TabsContent value="graph" className="flex-1 m-0 p-0 bg-gray-50">
          <div className="w-full h-full flex items-center justify-center p-6" id="GraphView">
            {isLoadingGraph ? (
              <GraphLoadingSkeleton />
            ) : graphImageBase64 ? (
              <div className="w-full h-full flex items-center justify-center" id="GraphView/graphImage">
                <img
                  src={`data:image/png;base64,${graphImageBase64}`}
                  alt="Graph Visualization from Matplotlib"
                  className="max-w-full max-h-full object-contain rounded-lg shadow-lg"
                />
              </div>
            ) : (
              <GraphEmptyState />
            )}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}

function GraphLoadingSkeleton() {
  return (
    <div className="w-full h-full flex flex-col items-center justify-center gap-4 p-8" id="GraphView/loadingSkeleton">
      <Skeleton className="w-full h-full rounded-lg" />
      <div className="text-center">
        <p className="text-gray-500">Loading graph visualization...</p>
      </div>
    </div>
  );
}

function GraphEmptyState() {
  return (
    <div 
      className="flex flex-col items-center justify-center gap-4 p-8 text-center max-w-md" 
      id="GraphView/emptyState"
    >
      <div className="w-20 h-20 rounded-full bg-gray-200 flex items-center justify-center">
        <svg
          className="w-10 h-10 text-gray-400"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <circle cx="12" cy="12" r="3" strokeWidth="2" />
          <circle cx="6" cy="18" r="2" strokeWidth="2" />
          <circle cx="18" cy="6" r="2" strokeWidth="2" />
          <circle cx="18" cy="18" r="2" strokeWidth="2" />
          <path d="M12 9v6m-3-3l6-6m-6 6l6 6" strokeWidth="2" strokeLinecap="round" />
        </svg>
      </div>
      <div>
        <h3 className="text-gray-700 mb-2">Graph Visualization</h3>
        <p className="text-sm text-gray-500">
          Matplotlib graph loads here (Base64 PNG from backend).
        </p>
        <p className="text-xs text-gray-400 mt-2">
          Select a route to view the campus graph with nodes and edges.
        </p>
      </div>
    </div>
  );
}