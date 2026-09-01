"use client";

import React from "react";
import { GeneratedPostItem, ContentStatusType } from "@/lib/types";
import {
  Linkedin,
  Facebook,
  Instagram,
  Mail,
  Video,
  Copy,
  CheckCircle2,
  Calendar,
  ChevronRight,
  ChevronLeft,
  Eye,
} from "lucide-react";

interface KanbanBoardProps {
  posts: GeneratedPostItem[];
  onSelectPost: (post: GeneratedPostItem) => void;
  onUpdateStatus: (id: string, status: ContentStatusType) => void;
  onQuickCopy: (text: string) => void;
}

const COLUMNS: {
  id: ContentStatusType;
  title: string;
  badgeColor: string;
  nextStatus?: ContentStatusType;
  prevStatus?: ContentStatusType;
}[] = [
  {
    id: "DRAFT",
    title: "Drafts",
    badgeColor: "bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-300",
    nextStatus: "SCHEDULED",
  },
  {
    id: "SCHEDULED",
    title: "Scheduled",
    badgeColor: "bg-indigo-100 text-indigo-800 dark:bg-indigo-950/80 dark:text-indigo-300",
    prevStatus: "DRAFT",
    nextStatus: "COPIED",
  },
  {
    id: "COPIED",
    title: "Copied / Queued",
    badgeColor: "bg-sky-100 text-sky-800 dark:bg-sky-950/80 dark:text-sky-300",
    prevStatus: "SCHEDULED",
    nextStatus: "PUBLISHED",
  },
  {
    id: "PUBLISHED",
    title: "Published",
    badgeColor: "bg-emerald-100 text-emerald-800 dark:bg-emerald-950/80 dark:text-emerald-300",
    prevStatus: "COPIED",
  },
];

export function KanbanBoard({
  posts,
  onSelectPost,
  onUpdateStatus,
  onQuickCopy,
}: KanbanBoardProps) {
  const getChannelIcon = (channel: string) => {
    switch (channel) {
      case "LINKEDIN":
        return <Linkedin className="w-3.5 h-3.5 text-[#0a66c2]" />;
      case "EMAIL":
        return <Mail className="w-3.5 h-3.5 text-emerald-500" />;
      case "INSTAGRAM":
        return <Instagram className="w-3.5 h-3.5 text-rose-500" />;
      case "TIKTOK":
        return <Video className="w-3.5 h-3.5 text-cyan-400" />;
      case "FACEBOOK":
        return <Facebook className="w-3.5 h-3.5 text-[#1877f2]" />;
      default:
        return null;
    }
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6 items-start">
      {COLUMNS.map((col) => {
        const columnPosts = posts.filter((p) => p.status === col.id);
        return (
          <div
            key={col.id}
            className="rounded-3xl bg-slate-100/60 dark:bg-slate-900/40 border border-slate-200/80 dark:border-slate-800 p-4 space-y-3 min-h-[500px]"
          >
            {/* Column Header */}
            <div className="flex items-center justify-between pb-2 border-b border-slate-200/60 dark:border-slate-800/60">
              <div className="flex items-center gap-2">
                <span className="font-bold text-sm text-slate-900 dark:text-white">
                  {col.title}
                </span>
                <span className={`text-[10px] font-extrabold px-2 py-0.5 rounded-full ${col.badgeColor}`}>
                  {columnPosts.length}
                </span>
              </div>
            </div>

            {/* Post Cards */}
            <div className="space-y-3">
              {columnPosts.map((post) => (
                <div
                  key={post.id}
                  className="p-4 rounded-2xl glass-card border border-slate-200/80 dark:border-slate-800 hover:border-indigo-400/60 transition-all duration-200 shadow-sm space-y-2.5 group relative"
                >
                  {/* Card Header */}
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-1.5">
                      <div className="p-1 rounded-md bg-slate-100 dark:bg-slate-800">
                        {getChannelIcon(post.channel)}
                      </div>
                      <span className="text-[10px] font-bold uppercase text-slate-500">
                        Day {post.dayNumber}
                      </span>
                    </div>

                    <span className="text-[9px] font-semibold px-1.5 py-0.5 rounded bg-slate-100 dark:bg-slate-800 text-slate-500">
                      {post.contentType}
                    </span>
                  </div>

                  {/* Hook preview */}
                  <h4
                    onClick={() => onSelectPost(post)}
                    className="text-xs font-bold text-slate-900 dark:text-white line-clamp-2 cursor-pointer hover:text-indigo-600 transition-colors"
                  >
                    {post.hook}
                  </h4>

                  {/* Body Snippet */}
                  <p
                    onClick={() => onSelectPost(post)}
                    className="text-[11px] text-slate-500 dark:text-slate-400 line-clamp-2 cursor-pointer"
                  >
                    {post.bodyContent}
                  </p>

                  {/* Actions footer */}
                  <div className="flex items-center justify-between pt-2 border-t border-slate-100 dark:border-slate-800/80">
                    <div className="flex items-center gap-1">
                      <button
                        onClick={() => onSelectPost(post)}
                        title="View Full Post"
                        className="p-1 rounded hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-400 hover:text-indigo-600 transition-colors"
                      >
                        <Eye className="w-3.5 h-3.5" />
                      </button>
                      <button
                        onClick={() => onQuickCopy(post.bodyContent)}
                        title="Quick Copy"
                        className="p-1 rounded hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-400 hover:text-indigo-600 transition-colors"
                      >
                        <Copy className="w-3.5 h-3.5" />
                      </button>
                    </div>

                    {/* Column Shift buttons */}
                    <div className="flex items-center gap-1">
                      {col.prevStatus && (
                        <button
                          onClick={() => onUpdateStatus(post.id, col.prevStatus!)}
                          title={`Move back to ${col.prevStatus}`}
                          className="p-1 rounded text-slate-400 hover:text-slate-700 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800"
                        >
                          <ChevronLeft className="w-3.5 h-3.5" />
                        </button>
                      )}
                      {col.nextStatus && (
                        <button
                          onClick={() => onUpdateStatus(post.id, col.nextStatus!)}
                          title={`Move to ${col.nextStatus}`}
                          className="px-2 py-0.5 rounded text-[10px] font-bold bg-indigo-50 dark:bg-indigo-950 text-indigo-600 dark:text-indigo-400 border border-indigo-200 dark:border-indigo-800 hover:bg-indigo-100 flex items-center gap-0.5"
                        >
                          <span>{col.nextStatus}</span>
                          <ChevronRight className="w-3 h-3" />
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              ))}

              {columnPosts.length === 0 && (
                <div className="text-center py-12 text-xs text-slate-400 italic">
                  No posts in {col.title.toLowerCase()}
                </div>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
}
