"use client";

import React, { useState } from "react";
import { GeneratedPostItem, ChannelType, FullProfilePayload } from "@/lib/types";
import {
  exportPostsToCSV,
  exportStrategyToMarkdown,
  downloadBlobFile,
} from "@/lib/export-utils";
import { useToast } from "../ui/Toast";
import {
  LayoutGrid,
  Calendar as CalendarIcon,
  Download,
  FileSpreadsheet,
  FileText,
  FileCode,
  CheckCheck,
  Search,
  Filter,
} from "lucide-react";

interface ExportToolbarProps {
  viewMode: "kanban" | "calendar";
  setViewMode: (mode: "kanban" | "calendar") => void;
  selectedChannel: string;
  setSelectedChannel: (channel: string) => void;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  posts: GeneratedPostItem[];
  profile: FullProfilePayload;
  onBatchPublish: () => void;
}

const CHANNELS: { id: string; label: string }[] = [
  { id: "ALL", label: "All Platforms" },
  { id: "LINKEDIN", label: "LinkedIn" },
  { id: "EMAIL", label: "Email" },
  { id: "INSTAGRAM", label: "Instagram" },
  { id: "TIKTOK", label: "TikTok" },
  { id: "FACEBOOK", label: "Facebook" },
];

export function ExportToolbar({
  viewMode,
  setViewMode,
  selectedChannel,
  setSelectedChannel,
  searchQuery,
  setSearchQuery,
  posts,
  profile,
  onBatchPublish,
}: ExportToolbarProps) {
  const { toast } = useToast();
  const [exportOpen, setExportOpen] = useState(false);

  const handleExportCSV = () => {
    const csv = exportPostsToCSV(posts);
    downloadBlobFile(csv, `${profile.businessProfile.businessName}-30day-calendar.csv`, "text/csv");
    toast("CSV exported! Ready for Buffer / Hootsuite / Meta Suite.", "success");
    setExportOpen(false);
  };

  const handleExportMarkdown = () => {
    const md = exportStrategyToMarkdown(
      profile.businessProfile,
      profile.strategy,
      profile.diagnostic.scoreBreakdown,
      posts
    );
    downloadBlobFile(md, `${profile.businessProfile.businessName}-Strategy.md`, "text/markdown");
    toast("Master Strategy Markdown downloaded!", "success");
    setExportOpen(false);
  };

  const handleExportJSON = () => {
    const json = JSON.stringify(profile, null, 2);
    downloadBlobFile(json, `${profile.businessProfile.businessName}-Backup.json`, "application/json");
    toast("Full JSON profile exported!", "success");
    setExportOpen(false);
  };

  return (
    <div className="p-4 rounded-3xl glass-card border border-slate-200/80 dark:border-slate-800 space-y-4 shadow-sm">
      {/* Top row: View Switcher, Search, and Action Buttons */}
      <div className="flex flex-col md:flex-row items-center justify-between gap-4">
        {/* View Mode Toggle */}
        <div className="flex items-center gap-1.5 p-1 rounded-xl bg-slate-100 dark:bg-slate-900 border border-slate-200/60 dark:border-slate-800 w-full md:w-auto">
          <button
            onClick={() => setViewMode("kanban")}
            className={`flex-1 md:flex-none flex items-center justify-center gap-1.5 px-4 py-1.5 rounded-lg text-xs font-bold transition-all ${
              viewMode === "kanban"
                ? "bg-white dark:bg-slate-800 text-indigo-600 dark:text-indigo-400 shadow-sm"
                : "text-slate-500 hover:text-slate-900 dark:hover:text-white"
            }`}
          >
            <LayoutGrid className="w-3.5 h-3.5" />
            Kanban Board
          </button>
          <button
            onClick={() => setViewMode("calendar")}
            className={`flex-1 md:flex-none flex items-center justify-center gap-1.5 px-4 py-1.5 rounded-lg text-xs font-bold transition-all ${
              viewMode === "calendar"
                ? "bg-white dark:bg-slate-800 text-indigo-600 dark:text-indigo-400 shadow-sm"
                : "text-slate-500 hover:text-slate-900 dark:hover:text-white"
            }`}
          >
            <CalendarIcon className="w-3.5 h-3.5" />
            30-Day Calendar
          </button>
        </div>

        {/* Search input */}
        <div className="relative w-full md:w-72">
          <Search className="absolute left-3 top-2.5 w-4 h-4 text-slate-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search hooks or topics..."
            className="w-full pl-9 pr-3.5 py-1.5 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-xs focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
        </div>

        {/* Batch & Export Actions */}
        <div className="flex items-center gap-2 w-full md:w-auto justify-end">
          <button
            type="button"
            onClick={onBatchPublish}
            className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl text-xs font-semibold text-slate-700 dark:text-slate-300 bg-slate-100 dark:bg-slate-900 hover:bg-slate-200 border border-slate-200 dark:border-slate-800 transition-colors"
          >
            <CheckCheck className="w-3.5 h-3.5 text-emerald-500" />
            Mark Filtered Published
          </button>

          {/* Export Dropdown */}
          <div className="relative">
            <button
              type="button"
              onClick={() => setExportOpen(!exportOpen)}
              className="flex items-center gap-1.5 px-4 py-1.5 rounded-xl text-xs font-bold text-white gradient-brand shadow-sm hover:opacity-95 transition-opacity"
            >
              <Download className="w-3.5 h-3.5" />
              Export & Download
            </button>

            {exportOpen && (
              <div className="absolute right-0 top-10 z-30 w-56 p-2 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xl space-y-1 animate-fade-in">
                <button
                  onClick={handleExportCSV}
                  className="w-full flex items-center gap-2 px-3 py-2 rounded-xl text-xs font-semibold text-slate-700 dark:text-slate-300 hover:bg-indigo-50 dark:hover:bg-indigo-950/60 hover:text-indigo-600 transition-colors"
                >
                  <FileSpreadsheet className="w-4 h-4 text-emerald-500" />
                  <span>CSV (Buffer / Hootsuite)</span>
                </button>
                <button
                  onClick={handleExportMarkdown}
                  className="w-full flex items-center gap-2 px-3 py-2 rounded-xl text-xs font-semibold text-slate-700 dark:text-slate-300 hover:bg-indigo-50 dark:hover:bg-indigo-950/60 hover:text-indigo-600 transition-colors"
                >
                  <FileText className="w-4 h-4 text-indigo-500" />
                  <span>Master Strategy (Markdown)</span>
                </button>
                <button
                  onClick={handleExportJSON}
                  className="w-full flex items-center gap-2 px-3 py-2 rounded-xl text-xs font-semibold text-slate-700 dark:text-slate-300 hover:bg-indigo-50 dark:hover:bg-indigo-950/60 hover:text-indigo-600 transition-colors"
                >
                  <FileCode className="w-4 h-4 text-amber-500" />
                  <span>Full Profile (JSON Backup)</span>
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Bottom row: Channel Badges Filter */}
      <div className="flex items-center gap-2 overflow-x-auto pb-1 pt-1 border-t border-slate-100 dark:border-slate-800/80">
        <span className="text-[11px] font-bold text-slate-400 uppercase mr-1 shrink-0 flex items-center gap-1">
          <Filter className="w-3 h-3" /> Platform:
        </span>
        {CHANNELS.map((ch) => {
          const isSelected = selectedChannel === ch.id;
          return (
            <button
              key={ch.id}
              onClick={() => setSelectedChannel(ch.id)}
              className={`px-3 py-1 rounded-xl text-xs font-bold transition-all shrink-0 border ${
                isSelected
                  ? "bg-indigo-600 text-white border-indigo-600 shadow-xs"
                  : "bg-slate-100/80 dark:bg-slate-900/80 text-slate-600 dark:text-slate-400 border-slate-200 dark:border-slate-800 hover:border-indigo-400"
              }`}
            >
              {ch.label}
            </button>
          );
        })}
      </div>
    </div>
  );
}
