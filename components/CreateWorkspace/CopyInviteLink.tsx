"use client";

import Link from "next/link";
import { toast } from "sonner";
import { useCopyToClipboard } from "@uidotdev/usehooks";

import { ROUTES } from "@/lib/routes";
import { WorkspaceData } from ".";

interface Props {
  workspaceData: WorkspaceData;
}

export default function CopyInviteLink({
  workspaceData: { inviteCode, workspaceSlug },
}: Props) {
  const [copiedLink, copyToClipboard] = useCopyToClipboard();
  const hasCopiedLink = Boolean(copiedLink);

  return (
    <div>
      <h1 className="text-center">Invite members</h1>
      <p className="text-center">
        Share invite link with people you want to add as members.
      </p>

      <p>Copy invite link:</p>
      <button
        type="button"
        onClick={async () => {
          await copyToClipboard(
            `${window.location.origin}/invitation/${inviteCode}`
          );
          toast.info("Invite code copied!");
        }}
        className="p-2 border my-2 w-full flex justify-between"
      >
        <span>
          {window.location.origin}/invitation/{inviteCode}
        </span>

        {hasCopiedLink ? (
          <i className="ri-check-line"></i>
        ) : (
          <i className="ri-file-copy-line"></i>
        )}
      </button>

      <Link href={ROUTES.DASHBOARD(workspaceSlug)}>Go to dashboard</Link>
    </div>
  );
}
