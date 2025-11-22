import { useState } from "react";
import { MapPin, Loader2 } from "lucide-react";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";
import { Button } from "./ui/button";

interface InputSectionProps {
  onSearch: (location: string, prompt: string) => void;
  isLoading: boolean;
  mode?: 'hero' | 'compact'; // Hero = centered, large; Compact = small, top/left
}

export function InputSection({ onSearch, isLoading, mode = 'hero' }: InputSectionProps) {
  const [currentLocation, setCurrentLocation] = useState("");
  const [userPrompt, setUserPrompt] = useState("");
  const [isGettingLocation, setIsGettingLocation] = useState(false);

  const handleGetLocation = () => {
    setIsGettingLocation(true);
    
    // Simulate GPS location detection
    setTimeout(() => {
      setCurrentLocation("Marshall Center");
      setIsGettingLocation(false);
    }, 1000);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (currentLocation.trim() && userPrompt.trim()) {
      onSearch(currentLocation, userPrompt);
    }
  };

  // Hero Mode: Large, centered, with glassmorphism
  if (mode === 'hero') {
    return (
      <div className="w-full max-w-2xl mx-auto">
        <div 
          className="bg-white/90 backdrop-blur-md rounded-2xl shadow-2xl p-8 md:p-10 border border-white/20"
          style={{ boxShadow: '0 8px 32px rgba(0, 103, 71, 0.15)' }}
        >
          <div className="text-center mb-8">
            <h1 className="text-gray-900 mb-2">Where are you going?</h1>
            <p className="text-gray-600">Tell us where you are and what you need</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Current Location Input */}
            <div className="space-y-3">
              <label htmlFor="InputCurrentLocation" className="block text-gray-700">
                Current location
              </label>
              <div className="flex gap-3">
                <Input
                  id="InputCurrentLocation"
                  type="text"
                  placeholder="e.g., Marshall Center, Library, ENG"
                  value={currentLocation}
                  onChange={(e) => setCurrentLocation(e.target.value)}
                  className="flex-1 h-12 text-base"
                />
                <Button
                  type="button"
                  variant="outline"
                  size="icon"
                  onClick={handleGetLocation}
                  disabled={isGettingLocation}
                  className="flex-shrink-0 h-12 w-12 border-[#006747] text-[#006747] hover:bg-[#e6f2ed]"
                >
                  {isGettingLocation ? (
                    <Loader2 className="w-5 h-5 animate-spin" />
                  ) : (
                    <MapPin className="w-5 h-5" />
                  )}
                </Button>
              </div>
            </div>

            {/* User Prompt Input */}
            <div className="space-y-3">
              <label htmlFor="InputUserPrompt" className="block text-gray-700">
                What do you want?
              </label>
              <Textarea
                id="InputUserPrompt"
                placeholder="I want coffee near the library"
                value={userPrompt}
                onChange={(e) => setUserPrompt(e.target.value)}
                rows={4}
                className="resize-none text-base"
              />
              <p className="text-xs text-gray-500">
                Speak naturally — SmartNav handles vague requests.
              </p>
            </div>

            {/* Submit Button */}
            <Button
              type="submit"
              className="w-full h-12 bg-[#006747] hover:bg-[#004d33] text-white text-base"
              disabled={isLoading || !currentLocation.trim() || !userPrompt.trim()}
              id="ButtonFindSpot"
            >
              {isLoading ? (
                <>
                  <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                  Thinking...
                </>
              ) : (
                "Find me a spot"
              )}
            </Button>
          </form>
        </div>
      </div>
    );
  }

  // Compact Mode: Small, streamlined
  return (
    <div className="bg-white rounded-xl shadow-md p-4 border border-gray-200">
      <form onSubmit={handleSubmit} className="space-y-3">
        {/* Current Location Input */}
        <div className="space-y-1.5">
          <label htmlFor="InputCurrentLocation" className="block text-sm text-gray-700">
            Current location
          </label>
          <div className="flex gap-2">
            <Input
              id="InputCurrentLocation"
              type="text"
              placeholder="e.g., Marshall Center"
              value={currentLocation}
              onChange={(e) => setCurrentLocation(e.target.value)}
              className="flex-1 h-9 text-sm"
            />
            <Button
              type="button"
              variant="outline"
              size="icon"
              onClick={handleGetLocation}
              disabled={isGettingLocation}
              className="flex-shrink-0 h-9 w-9 border-[#006747] text-[#006747] hover:bg-[#e6f2ed]"
            >
              {isGettingLocation ? (
                <Loader2 className="w-3.5 h-3.5 animate-spin" />
              ) : (
                <MapPin className="w-3.5 h-3.5" />
              )}
            </Button>
          </div>
        </div>

        {/* User Prompt Input */}
        <div className="space-y-1.5">
          <label htmlFor="InputUserPrompt" className="block text-sm text-gray-700">
            What do you want?
          </label>
          <Textarea
            id="InputUserPrompt"
            placeholder="Coffee near library..."
            value={userPrompt}
            onChange={(e) => setUserPrompt(e.target.value)}
            rows={2}
            className="resize-none text-sm"
          />
        </div>

        {/* Submit Button */}
        <Button
          type="submit"
          className="w-full h-9 bg-[#006747] hover:bg-[#004d33] text-white text-sm"
          disabled={isLoading || !currentLocation.trim() || !userPrompt.trim()}
          id="ButtonFindSpot"
        >
          {isLoading ? (
            <>
              <Loader2 className="w-4 h-4 mr-2 animate-spin" />
              Searching...
            </>
          ) : (
            "Find me a spot"
          )}
        </Button>
      </form>
    </div>
  );
}