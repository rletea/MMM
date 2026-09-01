"use client";

import React from "react";
import { GeneratedPostItem } from "@/lib/types";
import {
  Linkedin,
  Facebook,
  Instagram,
  Mail,
  Video,
  CheckCircle2,
} from "lucide-react";

interface CalendarViewProps {
  posts: GeneratedPostItem[];
  onSelectPost: (post: GeneratedPostItem) => void;
}

export function CalendarView({ posts, onSelectPost }: CalendarViewProps) {
  const getChannelBadge = (channel: string) => {
    switch (channel) {
      case "LINKEDIN":
        return {
          icon: <Linkedin className="w-3 h-3 text-[#0a66c2]" />,
          border: "border-blue-200 dark:border-blue-900 bg-blue-50/50 dark:bg-blue-950/30",
        };
      case "EMAIL":
        return {
          icon: <Mail className="w-3 h-3 text-emerald-500" />,
          border: "border-emerald-200 dark:border-emerald-900 bg-emerald-50/50 dark:bg-emerald-950/30",
        };
      case "INSTAGRAM":
        return {
          icon: <Instagram className="w-3 h-3 text-rose-500" />,
          border: "border-rose-200 dark:border-rose-900 bg-rose-50/50 dark:bg-rose-950/30",
        };
      case "TIKTOK":
        return {
          icon: <Video className="w-3 h-3 text-cyan-400" />,
          border: "border-cyan-200 dark:border-cyan-900 bg-cyan-50/50 dark:bg-cyan-950/30",
        };
      case "FACEBOOK":
        return {
          icon: <Facebook className="w-3 h-3 text-[#1877f2]" />,
          border: "border-indigo-200 dark:border-indigo-900 bg-indigo-50/50 dark:bg-indigo-950/30",
        };
      default:
        return { icon: null, border: "border-slate-200 bg-slate-50" };
    }
  };

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 lg:grid-cols-6 gap-3.5">
        {posts.map((post) => {
          const { icon, border } = getChannelBadge(post.channel);
          const isPublished = post.status === "PUBLISHED";
          const isCopied = post.status === "COPIED";

          return (
            <div
              key={post.id}
              onClick={() => onSelectPost(post)}
              className={`p-3.5 rounded-2xl border transition-all duration-200 cursor-pointer flex flex-col justify-between gap-3 group hover:scale-[1.02] hover:shadow-lg ${border}`}
            >
              {/* Top Row: Day & Channel */}
              <div className="flex items-center justify-between">
                <span className="text-xs font-black text-slate-900 dark:text-white">
                  Day {post.dayNumber}
                </span>
                <div className="flex items-center gap-1">
                  <div className="p-1 rounded bg-white dark:bg-slate-900 shadow-xs">
                    {icon}
                  </div>
                  {isPublished && (
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" />
                  )}
                </div>
              </div>

              {/* Hook text */}
              <div className="space-y-1">
                <div className="text-[9px] font-bold text-slate-400 uppercase tracking-wide">
                  {post.contentType}
                </div>
                <p className="text-xs font-semibold text-slate-800 dark:text-slate-200 line-clamp-3 leading-snug group-hover:text-indigo-600 transition-colors">
                  {post.hook}
                </p>
              </div>

              {/* Status Badge */}
              <div className="pt-2 border-t border-slate-200/40 dark:border-slate-800/40 flex items-center justify-between">
                <span
                  className={`text-[9px] font-extrabold uppercase px-1.5 py-0.5 rounded ${
                    isPublished
                      ? "bg-emerald-100 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-300"
                      : isCopied
                      ? "bg-sky-100 dark:bg-sky-950 text-sky-700 dark:text-sky-300"
                      : "bg-slate-100 dark:bg-slate-800 text-slate-500"
                  }`}
                >
                  {post.status}
                </span>
                <span className="text-[9px] text-slate-400 font-medium">
                  {post.pillar.split(":")[0] || "Pillar"}
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
