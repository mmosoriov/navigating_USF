import { Navigation, Clock, MapPin as MapPinIcon, Check } from "lucide-react";
import { Button } from "./ui/button";

export interface Suggestion {
  id: string;
  name: string;
  reason: string;
  etaMin: number;
  distanceM: number;
  lat: number;
  lng: number;
}

interface SuggestionCardProps {
  suggestion: Suggestion;
  isSelected: boolean;
  onSelect: (suggestion: Suggestion) => void;
  onNavigate: (suggestion: Suggestion) => void;
  variant?: 'default' | 'hover' | 'selected';
}

export function SuggestionCard({
  suggestion,
  isSelected,
  onSelect,
  onNavigate,
  variant = 'default',
}: SuggestionCardProps) {
  const distanceMiles = (suggestion.distanceM / 1609.34).toFixed(1);

  return (
    <div
      onClick={() => onSelect(suggestion)}
      className={`
        rounded-xl p-5 border-2 transition-all cursor-pointer relative
        ${
          isSelected
            ? "border-[#006747] bg-[#006747] shadow-lg" // Selected state: USF Green
            : "border-gray-200 bg-white hover:border-[#006747]/40 hover:shadow-md"
        }
      `}
      id="SuggestionCard"
      data-variant={isSelected ? 'selected' : variant}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          onSelect(suggestion);
        }
      }}
    >
      {/* Check Icon for Selected State */}
      {isSelected && (
        <div className="absolute top-4 right-4 w-6 h-6 bg-white rounded-full flex items-center justify-center">
          <Check className="w-4 h-4 text-[#006747]" />
        </div>
      )}

      {/* Place Name */}
      <div className="mb-2 pr-8">
        <h3 className={isSelected ? "text-white" : "text-gray-900"}>
          {suggestion.name}
        </h3>
      </div>

      {/* Reason (1-2 lines from AI) */}
      <p className={`text-sm mb-3 line-clamp-2 ${isSelected ? "text-white/90" : "text-gray-600"}`}>
        {suggestion.reason}
      </p>

      {/* ETA and Distance Chips */}
      <div className="flex items-center gap-3 mb-4">
        <div className={`flex items-center gap-1.5 text-sm px-3 py-1 rounded-full ${
          isSelected ? "bg-white/20 text-white" : "bg-gray-100 text-gray-700"
        }`}>
          <Clock className="w-3.5 h-3.5" />
          <span>{suggestion.etaMin} min</span>
        </div>
        <div className={`flex items-center gap-1.5 text-sm px-3 py-1 rounded-full ${
          isSelected ? "bg-white/20 text-white" : "bg-gray-100 text-gray-700"
        }`}>
          <MapPinIcon className="w-3.5 h-3.5" />
          <span>{distanceMiles} mi</span>
        </div>
      </div>

      {/* Tap to Select Note */}
      {!isSelected && (
        <p className="text-xs text-gray-400 text-center mb-3">
          Tap to select route
        </p>
      )}

      {/* Navigate Button */}
      {isSelected && (
        <Button
          variant="outline"
          size="sm"
          onClick={(e) => {
            e.stopPropagation();
            onNavigate(suggestion);
          }}
          className="w-full bg-white text-[#006747] border-white hover:bg-gray-50"
        >
          <Navigation className="w-4 h-4 mr-2" />
          Start Navigation
        </Button>
      )}
    </div>
  );
}