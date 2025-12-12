"use client";

import { useState, useRef, useEffect } from "react";
import { Play, Pause, Volume2, ChevronDown, ChevronUp } from "lucide-react";
import type { Location } from "@/lib/locations";
import { assetUrl } from "@/lib/utils";

interface AudioSectionProps {
  location: Location;
}

export default function AudioSection({ location }: AudioSectionProps) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [isExpanded, setIsExpanded] = useState(false);
  const [needsExpansion, setNeedsExpansion] = useState(false);
  const transcriptRef = useRef<HTMLDivElement>(null);
  const audioRef = useRef<HTMLAudioElement>(null);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio || !location.audioUrl) return;

    // Reset state when location changes
    setCurrentTime(0);
    setDuration(0);
    setIsPlaying(false);

    const updateTime = () => setCurrentTime(audio.currentTime);
    const updateDuration = () => {
      if (!isNaN(audio.duration) && audio.duration > 0) {
        setDuration(audio.duration);
      }
    };
    const handleEnded = () => setIsPlaying(false);
    const handleLoadedMetadata = () => {
      if (!isNaN(audio.duration) && audio.duration > 0) {
        setDuration(audio.duration);
      }
    };
    const handlePlay = () => setIsPlaying(true);
    const handlePause = () => setIsPlaying(false);

    audio.addEventListener("timeupdate", updateTime);
    audio.addEventListener("loadedmetadata", handleLoadedMetadata);
    audio.addEventListener("durationchange", updateDuration);
    audio.addEventListener("ended", handleEnded);
    audio.addEventListener("play", handlePlay);
    audio.addEventListener("pause", handlePause);

    // Try to load duration if already available
    if (audio.readyState >= 1) {
      updateDuration();
    }

    return () => {
      audio.removeEventListener("timeupdate", updateTime);
      audio.removeEventListener("loadedmetadata", handleLoadedMetadata);
      audio.removeEventListener("durationchange", updateDuration);
      audio.removeEventListener("ended", handleEnded);
      audio.removeEventListener("play", handlePlay);
      audio.removeEventListener("pause", handlePause);
    };
  }, [location.audioUrl]);

  const togglePlay = async () => {
    const audio = audioRef.current;
    if (!audio) return;

    if (isPlaying) {
      audio.pause();
    } else {
      try {
        await audio.play();
      } catch (error) {
        console.error("Error playing audio:", error);
      }
    }
  };

  const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
    const audio = audioRef.current;
    if (!audio) return;
    const newTime = parseFloat(e.target.value);
    audio.currentTime = newTime;
    setCurrentTime(newTime);
  };

  const formatTime = (seconds: number) => {
    if (isNaN(seconds)) return "0:00";
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs.toString().padStart(2, "0")}`;
  };

  // Check if transcript needs expansion
  useEffect(() => {
    const checkHeight = () => {
      if (transcriptRef.current) {
        // Temporarily remove max-height to get true scrollHeight
        const originalMaxHeight = transcriptRef.current.style.maxHeight;
        transcriptRef.current.style.maxHeight = "none";
        const scrollHeight = transcriptRef.current.scrollHeight;
        transcriptRef.current.style.maxHeight = originalMaxHeight;
        
        const maxHeight = 120; // Max height in pixels
        const needsExpansionCheck = scrollHeight > maxHeight;
        setNeedsExpansion(needsExpansionCheck);
      }
    };
    // Check after a brief delay to ensure DOM is ready
    const timeoutId = setTimeout(checkHeight, 100);
    window.addEventListener("resize", checkHeight);
    return () => {
      clearTimeout(timeoutId);
      window.removeEventListener("resize", checkHeight);
    };
  }, [location.transcript]);

  const handleCardClick = () => {
    if (!isExpanded && needsExpansion) {
      setIsExpanded(true);
    }
  };

  return (
    <section
      id={location.id}
      className={`scroll-mt-24 rounded-lg border-2 border-amber-900/30 bg-linear-to-br from-amber-50/80 to-amber-100/60 p-6 shadow-lg backdrop-blur-sm transition-all hover:shadow-xl ${
        !isExpanded && needsExpansion ? "cursor-pointer" : ""
      }`}
      onClick={handleCardClick}
    >
      <div className="mb-4">
        <h2 className="font-serif text-2xl font-bold text-amber-900 sm:text-3xl">
          {location.name}
        </h2>
        <p className="mt-1 font-serif italic text-amber-800/80">{location.description}</p>
      </div>

      {location.imageUrl && (
        <div className="mb-4">
          <img
            src={location.imageUrl.startsWith('http') ? location.imageUrl : assetUrl(location.imageUrl)}
            alt={location.name}
            className="w-full rounded-lg border border-amber-900/20 shadow-md"
          />
        </div>
      )}

      {location.audioUrl && (
        <div className="mb-4 rounded-lg bg-amber-900/10 p-4">
          <div className="mb-3 flex items-center gap-3">
            <button
              onClick={(e) => {
                e.stopPropagation();
                togglePlay();
              }}
              className="flex h-12 w-12 items-center justify-center rounded-full bg-amber-900 text-amber-50 shadow-md transition-all hover:bg-amber-800 hover:shadow-lg active:scale-95"
              aria-label={isPlaying ? "Pause" : "Play"}
            >
              {isPlaying ? (
                <Pause className="h-6 w-6" />
              ) : (
                <Play className="ml-1 h-6 w-6" />
              )}
            </button>
            <div className="flex flex-1 items-center gap-2">
              <Volume2 className="h-5 w-5 text-amber-900/70" />
              <div className="flex-1">
                <input
                  type="range"
                  min="0"
                  max={duration || 100}
                  step="0.1"
                  value={currentTime}
                  onChange={handleSeek}
                  onClick={(e) => e.stopPropagation()}
                  className="h-2 w-full cursor-pointer appearance-none rounded-lg bg-amber-900/20 accent-amber-900"
                  style={{
                    background: `linear-gradient(to right, #92400e 0%, #92400e ${duration ? (currentTime / duration) * 100 : 0}%, rgba(146, 64, 14, 0.2) ${duration ? (currentTime / duration) * 100 : 0}%, rgba(146, 64, 14, 0.2) 100%)`
                  }}
                />
              </div>
              <span className="text-sm font-medium text-amber-900/80">
                {formatTime(currentTime)} / {formatTime(duration)}
              </span>
            </div>
          </div>
          <audio 
            key={location.id}
            ref={audioRef} 
            src={location.audioUrl} 
            preload="metadata"
            onLoadedMetadata={(e) => {
              const audio = e.currentTarget;
              if (!isNaN(audio.duration) && audio.duration > 0) {
                setDuration(audio.duration);
              }
            }}
          />
        </div>
      )}

      <div className="rounded-lg border border-amber-900/20 bg-amber-50/50 p-4">
        <div className="mb-2 flex items-center justify-between">
          <h3 className="font-serif text-lg font-semibold text-amber-900">Transcript</h3>
          {needsExpansion && (
            <button
              onClick={(e) => {
                e.stopPropagation();
                setIsExpanded(!isExpanded);
              }}
              className="flex items-center gap-1 text-sm font-medium text-amber-900/80 hover:text-amber-900 transition-colors"
            >
              {isExpanded ? (
                <>
                  <span>See less</span>
                  <ChevronUp className="h-4 w-4" />
                </>
              ) : (
                <>
                  <span>See more</span>
                  <ChevronDown className="h-4 w-4" />
                </>
              )}
            </button>
          )}
        </div>
        <div
          ref={transcriptRef}
          className={`font-serif leading-relaxed text-amber-900/90 transition-all overflow-hidden ${
            isExpanded ? "max-h-none" : "max-h-[120px]"
          }`}
        >
          {location.transcript.split("\n\n").map((paragraph, index) => (
            <p key={index} className={index > 0 ? "mt-4" : ""}>
              {paragraph.trim()}
            </p>
          ))}
        </div>
        {!isExpanded && needsExpansion && (
          <div className="mt-2 flex justify-center">
            <button
              onClick={(e) => {
                e.stopPropagation();
                setIsExpanded(true);
              }}
              className="flex items-center gap-1 text-sm font-medium text-amber-900/80 hover:text-amber-900 transition-colors"
            >
              <span>See more</span>
              <ChevronDown className="h-4 w-4" />
            </button>
          </div>
        )}
      </div>
    </section>
  );
}

