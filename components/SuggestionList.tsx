import { AlertCircle, Search } from "lucide-react";
import { SuggestionCard, Suggestion } from "./SuggestionCard";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";

interface SuggestionListProps {
  suggestions: Suggestion[];
  selectedId: string | null;
  onSelect: (suggestion: Suggestion) => void;
  onNavigate: (suggestion: Suggestion) => void;
  isLoading: boolean;
  error: string | null;
  onRetry?: () => void;
}

export function SuggestionList({
  suggestions,
  selectedId,
  onSelect,
  onNavigate,
  isLoading,
  error,
  onRetry,
}: SuggestionListProps) {
  // Loading State with Skeletons
  if (isLoading) {
    return (
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-gray-900">Suggestions</h3>
          <Badge variant="secondary" className="animate-pulse">
            Loading...
          </Badge>
        </div>
        <div className="space-y-3">
          {[1, 2, 3].map((i) => (
            <div
              key={i}
              className="rounded-xl p-4 border-2 border-gray-200 bg-white animate-pulse"
            >
              <div className="h-5 bg-gray-200 rounded w-3/4 mb-3"></div>
              <div className="h-4 bg-gray-200 rounded w-full mb-2"></div>
              <div className="h-4 bg-gray-200 rounded w-5/6 mb-3"></div>
              <div className="flex gap-4 mb-3">
                <div className="h-4 bg-gray-200 rounded w-20"></div>
                <div className="h-4 bg-gray-200 rounded w-16"></div>
              </div>
              <div className="h-9 bg-gray-200 rounded"></div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  // Error State
  if (error) {
    return (
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-gray-900">Suggestions</h3>
        </div>
        <div className="rounded-xl p-6 border-2 border-red-200 bg-red-50 text-center">
          <AlertCircle className="w-12 h-12 text-red-500 mx-auto mb-3" />
          <h4 className="text-red-900 mb-2">Oops! Something went wrong</h4>
          <p className="text-sm text-red-700 mb-4">{error}</p>
          {onRetry && (
            <Button
              onClick={onRetry}
              variant="outline"
              className="border-red-300 text-red-700 hover:bg-red-100"
            >
              Try Again
            </Button>
          )}
        </div>
      </div>
    );
  }

  // Empty State
  if (suggestions.length === 0) {
    return (
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-gray-900">Suggestions</h3>
          <Badge variant="secondary">Walking</Badge>
        </div>
        <div className="rounded-xl p-8 border-2 border-dashed border-gray-300 bg-gray-50 text-center">
          <Search className="w-12 h-12 text-gray-400 mx-auto mb-3" />
          <h4 className="text-gray-700 mb-1">No matches yet</h4>
          <p className="text-sm text-gray-500">
            Try describing what you need in the search box above
          </p>
        </div>
      </div>
    );
  }

  // Suggestions List
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-gray-900">Suggestions</h3>
        <Badge variant="secondary" className="bg-[#e6f2ed] text-[#006747]">
          Walking
        </Badge>
      </div>
      <div className="space-y-3 max-h-[600px] overflow-y-auto pr-2">
        {suggestions.map((suggestion) => (
          <SuggestionCard
            key={suggestion.id}
            suggestion={suggestion}
            isSelected={selectedId === suggestion.id}
            onSelect={onSelect}
            onNavigate={onNavigate}
          />
        ))}
      </div>
    </div>
  );
}
