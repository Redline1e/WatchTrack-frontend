"use client";
import { FC } from "react";
import { useWatchlist } from "@/hooks/useWatchlist";
import { WatchStatus } from "@/types/watch-status";
import { PlusCircle, PlayCircle, CheckCircle, RefreshCw } from "lucide-react";

interface WatchButtonProps {
  filmId: number;
  className?: string;
}

const STATUS_CONFIG = {
  [WatchStatus.PLANNED]: {
    label: "Start Watching",
    icon: <PlayCircle className="h-5 w-5" />,
    color: "bg-yellow-500 hover:bg-yellow-600",
  },
  [WatchStatus.WATCHING]: {
    label: "Mark as Watched",
    icon: <CheckCircle className="h-5 w-5" />,
    color: "bg-green-500 hover:bg-green-600",
  },
  [WatchStatus.WATCHED]: {
    label: "Watched",
    icon: <RefreshCw className="h-5 w-5" />,
    color: "bg-gray-500 cursor-not-allowed",
  },
};

const WatchButton: FC<WatchButtonProps> = ({ filmId, className = "" }) => {
  const { data, add, updateStatus } = useWatchlist();
  const item = data?.find((wi) => wi.film.id === filmId);

  const baseClasses = `flex items-center gap-2 px-4 py-2 rounded-lg text-white font-semibold shadow ${className}`;

  if (!item) {
    return (
      <button
        onClick={() => add.mutate(filmId)}
        disabled={add.isPending}
        className={`${baseClasses} bg-blue-500 hover:bg-blue-600 disabled:opacity-50 disabled:cursor-not-allowed`}
      >
        {add.isPending ? (
          <>
            <RefreshCw className="h-5 w-5 animate-spin" /> Adding...
          </>
        ) : (
          <>
            <PlusCircle className="h-5 w-5" /> Add to Watchlist
          </>
        )}
      </button>
    );
  }

  const currentConfig = STATUS_CONFIG[item.status as WatchStatus];
  const nextStatus =
    item.status === WatchStatus.PLANNED
      ? WatchStatus.WATCHING
      : WatchStatus.WATCHED;

  return (
    <button
      onClick={() => updateStatus.mutate({ id: item.id, status: nextStatus })}
      disabled={updateStatus.isPending || item.status === WatchStatus.WATCHED}
      className={`${baseClasses} ${currentConfig.color} disabled:opacity-50 disabled:cursor-not-allowed`}
    >
      {updateStatus.isPending ? (
        <>
          <RefreshCw className="h-5 w-5 animate-spin" /> Updating...
        </>
      ) : (
        <>
          {currentConfig.icon} {currentConfig.label}
        </>
      )}
    </button>
  );
};

export default WatchButton;
