'use client';

export default function PrintButton() {
  return (
    <button
      type="button"
      onClick={() => window.print()}
      className="group inline-flex flex-col items-start gap-0.5 rounded-full border border-hairline px-6 py-2.5 min-h-[44px] text-paper transition-colors hover:border-paper/30"
    >
      <span className="text-sm font-medium">Print / Save as PDF</span>
      <span className="font-mono text-[11px] text-muted2">⌘P / Ctrl+P</span>
    </button>
  );
}
