import type { SVGGalleryNotificationProps } from "@/tipos/ui";

export default function SVGGalleryNotification({
  message,
}: SVGGalleryNotificationProps): React.ReactElement {
  return (
    <div className="iconMd shadowNotification notificationFixedTopRight rounded border border-[var(--accent-green)] bg-[var(--success)] px-5 py-3 font-mono font-medium text-[var(--vscode-bg)]">
      {message}
    </div>
  );
}
