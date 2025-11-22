import { useState, useEffect } from "react";
import { Play, Pause, Volume2 } from "lucide-react";
import { Button } from "./ui/button";
import { Slider } from "./ui/slider";

interface AudioGuidePlayerProps {
  destinationName: string;
}

export function AudioGuidePlayer({ destinationName }: AudioGuidePlayerProps) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const totalDuration = 45; // seconds

  useEffect(() => {
    if (!isPlaying) return;

    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          setIsPlaying(false);
          return 0;
        }
        return prev + (100 / totalDuration);
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [isPlaying]);

  const handlePlayPause = () => {
    setIsPlaying(!isPlaying);
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs.toString().padStart(2, "0")}`;
  };

  const currentTime = Math.floor((progress / 100) * totalDuration);
  const remainingTime = totalDuration;

  return (
    <div className="bg-gradient-to-r from-[#e6f2ed] to-[#f5f1e6] rounded-lg p-4 border border-[#CFC493]/30 shadow-sm">
      <div className="flex items-center gap-3 mb-2">
        <Volume2 className="w-5 h-5 text-[#006747]" />
        <h4 className="text-[#006747]">Audio Guide</h4>
      </div>

      <p className="text-sm text-gray-700 mb-3">
        Turn-by-turn directions to {destinationName}
      </p>

      <div className="flex items-center gap-3">
        {/* Play/Pause Button */}
        <Button
          variant="outline"
          size="icon"
          onClick={handlePlayPause}
          className="flex-shrink-0 border-[#006747] text-[#006747] hover:bg-[#006747] hover:text-white"
        >
          {isPlaying ? (
            <Pause className="w-4 h-4" />
          ) : (
            <Play className="w-4 h-4 ml-0.5" />
          )}
        </Button>

        {/* Progress Bar */}
        <div className="flex-1">
          <Slider
            value={[progress]}
            onValueChange={(value) => setProgress(value[0])}
            max={100}
            step={1}
            className="w-full"
          />
        </div>

        {/* Duration */}
        <span className="text-sm text-gray-600 flex-shrink-0 min-w-[60px] text-right">
          {formatTime(currentTime)} / {formatTime(remainingTime)}
        </span>
      </div>

      {isPlaying && (
        <p className="text-xs text-gray-600 mt-2 italic">
          🎧 Now playing: "Head southeast toward Cooper Hall..."
        </p>
      )}
    </div>
  );
}
