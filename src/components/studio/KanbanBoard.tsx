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
  ChevronRight,
  ChevronLeft,
  Eye,
} from "lucide-react";
import { useLanguage } from "@/lib/i18n/LanguageContext";

interface KanbanBoardProps {
  posts: GeneratedPostItem[];
  onSelectPost: (post: GeneratedPostItem) => void;
  onUpdateStatus: (id: string, status: ContentStatusType) => void;
  onQuickCopy: (text: string) => void;
}

export function KanbanBoard({
  posts,
  onSelectPost,
  onUpdateStatus,
  onQuickCopy,
}: KanbanBoardProps) {
  const { t } = useLanguage();

  const columns: {
    id: ContentStatusType;
    title: string;
    badgeColor: string;
    nextStatus?: ContentStatusType;
    prevStatus?: ContentStatusType;
  }[] = [
    {
      id: "DRAFT",
      title: t("studio.col_drafts"),
      badgeColor: "bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-300",
      nextStatus: "SCHEDULED",
    },
    {
      id: "SCHEDULED",
      title: t("studio.col_scheduled"),
      badgeColor: "bg-indigo-100 text-indigo-800 dark:bg-indigo-950/80 dark:text-indigo-300",
      prevStatus: "DRAFT",
      nextStatus: "COPIED",
    },
    {
      id: "COPIED",
      title: t("studio.col_copied"),
      badgeColor: "bg-sky-100 text-sky-800 dark:bg-sky-950/80 dark:text-sky-300",
      prevStatus: "SCHEDULED",
      nextStatus: "PUBLISHED",
    },
    {
      id: "PUBLISHED",
      title: t("studio.col_published"),
      badgeColor: "bg-emerald-100 text-emerald-800 dark:bg-emerald-950/80 dark:text-emerald-300",
      prevStatus: "COPIED",
    },
  ];

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
      {columns.map((col) => {
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
              {columnPosts.length > 0 ? (
                columnPosts.map((post) => (
                  <div
                    key={post.id}
                    className="p-4 rounded-2xl glass-card border border-slate-200/80 dark:border-slate-800 shadow-sm hover:shadow-md transition-all space-y-3 group"
                  >
                    {/* Card Top Meta */}
                    <div className="flex items-center justify-between text-xs">
                      <div className="flex items-center gap-1.5 font-bold text-slate-700 dark:text-slate-300">
                        {getChannelIcon(post.channel)}
                        <span className="text-[11px] font-extrabold text-indigo-600 dark:text-indigo-400">
                          {t("studio.day")} {post.dayNumber}
                        </span>
                      </div>
                      <span className="text-[10px] font-semibold text-slate-400 uppercase tracking-wider">
                        {post.format || (post as any).contentType}
                      </span>
                    </div>

                    {/* Hook Headline */}
                    <h4
                      onClick={() => onSelectPost(post)}
                      className="font-bold text-xs sm:text-sm text-slate-900 dark:text-white line-clamp-2 cursor-pointer hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors"
                    >
                      {post.hook}
                    </h4>

                    {/* Body Snippet */}
                    <p
                      onClick={() => onSelectPost(post)}
                      className="text-xs text-slate-500 line-clamp-3 leading-relaxed cursor-pointer font-sans"
                    >
                      {post.body || (post as any).bodyContent}
                    </p>

                    {/* Card Actions Footer */}
                    <div className="pt-2 border-t border-slate-100 dark:border-slate-800/80 flex items-center justify-between gap-1">
                      <button
                        type="button"
                        onClick={() => onQuickCopy(post.body || (post as any).bodyContent)}
                        className="flex items-center gap-1 text-[11px] font-bold text-indigo-600 dark:text-indigo-400 hover:text-indigo-700 dark:hover:text-indigo-300 transition-colors"
                        title={t("studio.copy_post")}
                      >
                        <Copy className="w-3.5 h-3.5" />
                        <span>{t("studio.copy_post")}</span>
                      </button>

                      <div className="flex items-center gap-1">
                        {col.prevStatus && (
                          <button
                            type="button"
                            onClick={() => onUpdateStatus(post.id, col.prevStatus!)}
                            className="p-1 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 transition-colors"
                            title={`Move to ${col.prevStatus}`}
                          >
                            <ChevronLeft className="w-3.5 h-3.5" />
                          </button>
                        )}
                        <button
                          type="button"
                          onClick={() => onSelectPost(post)}
                          className="p-1 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-400 hover:text-indigo-600 transition-colors"
                          title="Inspect Details"
                        >
                          <Eye className="w-3.5 h-3.5" />
                        </button>
                        {col.nextStatus && (
                          <button
                            type="button"
                            onClick={() => onUpdateStatus(post.id, col.nextStatus!)}
                            className="p-1 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 transition-colors"
                            title={`Move to ${col.nextStatus}`}
                          >
                            <ChevronRight className="w-3.5 h-3.5" />
                          </button>
                        )}
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <div className="p-6 rounded-2xl border border-dashed border-slate-200 dark:border-slate-800 text-center text-xs text-slate-400">
                  {t("studio.no_posts")}
                </div>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
}
