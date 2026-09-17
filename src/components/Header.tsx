import Link from "next/link";
import { useRouter } from "next/navigation";
import { signOut, useSession } from "@/lib/auth-client";

export default function Header() {
  const router = useRouter();
  const { data: session } = useSession();

  const handleSignOut = async () => {
    await signOut();
    router.push("/sign-in");
  };

  const userName = session?.user?.name || "พิมพ์พิศา ว.";
  const userInitial = userName.charAt(0) || "พ";
  const userEmail = session?.user?.email;

  return (
    <header className="fixed top-0 left-64 right-0 h-16 bg-surface-container-lowest/90 backdrop-blur-xl border-b border-outline-variant/15 z-40 flex items-center justify-between px-margin shadow-[0_1px_8px_rgba(0,0,0,0.02)]">
      <div className="flex items-center gap-space-lg">
        {/* Breadcrumbs */}
        <div className="flex items-center gap-space-xs text-[13px] text-on-surface-variant font-medium">
          <span className="hover:text-on-surface cursor-pointer">Workspace</span>
          <span className="material-symbols-outlined text-[16px]">chevron_right</span>
          <span className="text-on-surface font-semibold">Follow-up Board</span>
        </div>

        {/* Search Bar */}
        <div className="relative flex items-center">
          <span className="material-symbols-outlined absolute left-space-md text-[18px] text-on-surface-variant">
            search
          </span>
          <input
            className="w-72 pl-9 pr-space-md py-1.5 bg-surface-container-low text-on-surface placeholder-on-surface-variant rounded-xl text-[12px] focus:outline-none focus:ring-1 focus:ring-secondary transition-all"
            placeholder="ค้นหาผู้ติดต่อ, บริษัท, หรือแท็ก... (⌘K)"
            type="text"
          />
        </div>
      </div>

      {/* Right User Actions */}
      <div className="flex items-center gap-space-md">
        <Link
          href="/contacts"
          className="flex items-center gap-space-xs px-space-md py-1.5 bg-primary text-on-primary rounded-xl text-[13px] font-medium hover:bg-on-surface-variant transition-all shadow-[0_1px_4px_rgba(0,0,0,0.08)]"
        >
          <span className="material-symbols-outlined text-[18px]">person_add</span>
          <span>+ เพิ่มผู้ติดต่อ</span>
        </Link>

        <div className="relative flex items-center">
          <button
            className="p-2 rounded-xl text-on-surface-variant hover:bg-surface-container hover:text-on-surface transition-all"
            type="button"
            aria-label="การแจ้งเตือน"
          >
            <span className="material-symbols-outlined text-[22px]">notifications</span>
          </button>
          <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-error" />
        </div>

        <div className="h-6 w-px bg-outline-variant/30" />

        <div className="flex items-center gap-space-sm group relative">
          <div className="w-8 h-8 rounded-full bg-secondary-container text-on-secondary-container flex items-center justify-center font-bold text-sm">
            {userInitial}
          </div>
          <div className="flex flex-col text-left">
            <span className="text-[13px] text-on-surface font-semibold leading-tight">
              {userName}
            </span>
            <span className="text-[11px] text-on-surface-variant">
              {userEmail ? "Online" : "Sales Lead"}
            </span>
          </div>

          {session?.user && (
            <button
              onClick={handleSignOut}
              className="ml-1 p-1.5 text-on-surface-variant hover:text-error hover:bg-error-container/30 rounded-lg transition-colors"
              title="ออกจากระบบ"
              type="button"
            >
              <span className="material-symbols-outlined text-[18px]">
                logout
              </span>
            </button>
          )}
        </div>
      </div>
    </header>
  );
}
