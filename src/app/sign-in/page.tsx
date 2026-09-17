"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { signIn } from "@/lib/auth-client";

export default function SignInPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      const res = await signIn.email({
        email,
        password,
      });

      if (res.error) {
        setError(res.error.message || "อีเมลหรือรหัสผ่านไม่ถูกต้อง");
      } else {
        router.push("/dashboard");
      }
    } catch {
      setError("ไม่สามารถเชื่อมต่อเซิร์ฟเวอร์ได้ กรุณาลองใหม่อีกครั้ง");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-surface flex flex-col justify-center items-center px-4 py-12">
      <div className="w-full max-w-md">
        {/* Brand Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-secondary text-on-secondary shadow-sm mb-3">
            <span className="material-symbols-outlined text-[28px]">
              view_kanban
            </span>
          </div>
          <h1 className="text-[24px] font-semibold text-on-surface">
            เข้าสู่ระบบ Follow-up Board
          </h1>
          <p className="text-[13px] text-on-surface-variant mt-1">
            ลงชื่อเข้าใช้งานเพื่อดูภาพรวมและติดตามลูกค้าของคุณ
          </p>
        </div>

        {/* Card */}
        <div className="bg-surface-container-lowest p-8 rounded-2xl border border-outline-variant/20 shadow-sm">
          {error && (
            <div className="mb-6 p-3.5 bg-error-container/40 border border-error-container text-on-error-container rounded-xl text-[13px] flex items-center gap-2">
              <span className="material-symbols-outlined text-[18px] text-error">
                error
              </span>
              <span>{error}</span>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label
                className="block text-[11px] font-semibold uppercase text-on-surface-variant mb-1"
                htmlFor="email"
              >
                อีเมล
              </label>
              <input
                id="email"
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="name@company.com"
                className="w-full px-3.5 py-2.5 bg-surface-container-low border border-outline-variant/20 rounded-xl text-[13px] text-on-surface placeholder-on-surface-variant focus:outline-none focus:bg-surface-container-lowest focus:ring-2 focus:ring-secondary transition-all"
              />
            </div>

            <div>
              <div className="flex items-center justify-between mb-1">
                <label
                  className="block text-[11px] font-semibold uppercase text-on-surface-variant"
                  htmlFor="password"
                >
                  รหัสผ่าน
                </label>
              </div>
              <input
                id="password"
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full px-3.5 py-2.5 bg-surface-container-low border border-outline-variant/20 rounded-xl text-[13px] text-on-surface placeholder-on-surface-variant focus:outline-none focus:bg-surface-container-lowest focus:ring-2 focus:ring-secondary transition-all"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full mt-2 py-2.5 px-4 bg-primary text-on-primary rounded-xl text-[13px] font-semibold hover:bg-on-surface-variant transition-all shadow-sm flex items-center justify-center gap-2 disabled:opacity-60"
            >
              {loading ? (
                <>
                  <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  <span>กำลังเข้าสู่ระบบ...</span>
                </>
              ) : (
                <>
                  <span className="material-symbols-outlined text-[18px]">
                    login
                  </span>
                  <span>เข้าสู่ระบบ</span>
                </>
              )}
            </button>
          </form>

          <div className="mt-6 text-center text-[13px] text-on-surface-variant">
            ยังไม่มีบัญชีผู้ใช้?{" "}
            <Link
              href="/sign-up"
              className="text-secondary font-semibold hover:underline"
            >
              สมัครสมาชิกที่นี่
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
