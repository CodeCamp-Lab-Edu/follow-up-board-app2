"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { signUp } from "@/lib/auth-client";

export default function SignUpPage() {
  const router = useRouter();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (password !== confirmPassword) {
      setError("รหัสผ่านและการยืนยันรหัสผ่านไม่ตรงกัน");
      return;
    }

    if (password.length < 8) {
      setError("รหัสผ่านต้องมีความยาวอย่างน้อย 8 ตัวอักษร");
      return;
    }

    setLoading(true);

    try {
      const res = await signUp.email({
        name,
        email,
        password,
      });

      if (res.error) {
        setError(res.error.message || "เกิดข้อผิดพลาดในการสมัครสมาชิก");
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
            สมัครสมาชิก Follow-up Board
          </h1>
          <p className="text-[13px] text-on-surface-variant mt-1">
            เริ่มต้นจัดการรายชื่อผู้ติดต่อและการติดตามงานอย่างมีประสิทธิภาพ
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
                htmlFor="name"
              >
                ชื่อ - นามสกุล
              </label>
              <input
                id="name"
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="เช่น พิมพ์พิศา วงศ์สวัสดิ์"
                className="w-full px-3.5 py-2.5 bg-surface-container-low border border-outline-variant/20 rounded-xl text-[13px] text-on-surface placeholder-on-surface-variant focus:outline-none focus:bg-surface-container-lowest focus:ring-2 focus:ring-secondary transition-all"
              />
            </div>

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
              <label
                className="block text-[11px] font-semibold uppercase text-on-surface-variant mb-1"
                htmlFor="password"
              >
                รหัสผ่าน (อย่างน้อย 8 ตัวอักษร)
              </label>
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

            <div>
              <label
                className="block text-[11px] font-semibold uppercase text-on-surface-variant mb-1"
                htmlFor="confirm-password"
              >
                ยืนยันรหัสผ่าน
              </label>
              <input
                id="confirm-password"
                type="password"
                required
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full px-3.5 py-2.5 bg-surface-container-low border border-outline-variant/20 rounded-xl text-[13px] text-on-surface placeholder-on-surface-variant focus:outline-none focus:bg-surface-container-lowest focus:ring-2 focus:ring-secondary transition-all"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full mt-2 py-2.5 px-4 bg-secondary text-on-secondary rounded-xl text-[13px] font-semibold hover:bg-secondary-container transition-all shadow-sm flex items-center justify-center gap-2 disabled:opacity-60"
            >
              {loading ? (
                <>
                  <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  <span>กำลังสร้างบัญชี...</span>
                </>
              ) : (
                <>
                  <span className="material-symbols-outlined text-[18px]">
                    person_add
                  </span>
                  <span>สมัครสมาชิก</span>
                </>
              )}
            </button>
          </form>

          <div className="mt-6 text-center text-[13px] text-on-surface-variant">
            มีบัญชีผู้ใช้อยู่แล้ว?{" "}
            <Link
              href="/sign-in"
              className="text-secondary font-semibold hover:underline"
            >
              เข้าสู่ระบบ
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
