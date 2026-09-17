"use client";

import { useState } from "react";
import Sidebar from "@/components/Sidebar";
import Header from "@/components/Header";

// Mock Data Types
interface FollowUpTask {
  id: string;
  name: string;
  initials: string;
  company: string;
  status: string;
  phone?: string;
  lineId?: string;
  email?: string;
  time: string;
  dealValue?: string;
  note: string;
  noteIcon: string;
  actionType: "phone" | "email" | "line";
  actionLabel: string;
  secondaryActionLabel: string;
  secondaryActionIcon: string;
}

const initialTasks: FollowUpTask[] = [
  {
    id: "1",
    name: "กวินทร์ สิริกุล",
    initials: "ก",
    company: "บริษัท เทควิชั่น จำกัด",
    status: "ต้องติดตามวันนี้",
    phone: "081-234-5678",
    lineId: "LINE: kawin_tv",
    time: "14:00 น. วันนี้",
    dealValue: "Deal: ฿450,000",
    note: "ส่งใบเสนอราคา Package Enterprise แล้ว รอคอนเฟิร์มงบประมาณไตรมาส 3/2025",
    noteIcon: "sticky_note_2",
    actionType: "phone",
    actionLabel: "โทรออก",
    secondaryActionLabel: "ส่ง LINE / ข้อความ",
    secondaryActionIcon: "send",
  },
  {
    id: "2",
    name: "สุชาวดี พรหมมินทร์",
    initials: "ส",
    company: "บมจ. ฟินเทคไทย",
    status: "ต้องติดตามวันนี้",
    email: "suchawadee@fintech.co.th",
    time: "15:30 น. (Google Meet)",
    dealValue: "Demo Request",
    note: "นัดโทร Demo ฟีเจอร์ใหม่ (Automated Lead Scoring และ CRM Integration) ผู้จัดการฝ่ายการเงินจะเข้าร่วมด้วย",
    noteIcon: "screen_share",
    actionType: "email",
    actionLabel: "ส่งอีเมลตอบกลับ",
    secondaryActionLabel: "เปิดห้องประชุม",
    secondaryActionIcon: "link",
  },
  {
    id: "3",
    name: "ปวริศา รัตนโชติ",
    initials: "ป",
    company: "Green Logistics Co.",
    status: "ต้องติดตามวันนี้",
    lineId: "LINE Official Contact",
    time: "16:45 น. วันนี้",
    dealValue: "Contract Review",
    note: "ติดตามสัญญาการให้บริการ (Service Level Agreement) ฝ่ายกฎหมายเซ็นอนุมัติแล้ว เหลือตราประทับ",
    noteIcon: "description",
    actionType: "line",
    actionLabel: "ส่งข้อความ LINE OA",
    secondaryActionLabel: "แนบเอกสาร PDF",
    secondaryActionIcon: "attachment",
  },
];

export default function DashboardPage() {
  const [tasks, setTasks] = useState<FollowUpTask[]>(initialTasks);
  const [activeDateTab, setActiveDateTab] = useState<"today" | "week" | "month">("today");

  // Quick Add Form State
  const [contactName, setContactName] = useState("");
  const [channel, setChannel] = useState("line");
  const [contactTime, setContactTime] = useState("");
  const [contactNote, setContactNote] = useState("");

  const handleQuickAdd = (e: React.FormEvent) => {
    e.preventDefault();
    if (!contactName.trim()) return;

    const newTask: FollowUpTask = {
      id: Date.now().toString(),
      name: contactName,
      initials: contactName.charAt(0) || "ผ",
      company: "บริษัททั่วไป",
      status: "ต้องติดตามวันนี้",
      time: contactTime || "17:00 น. วันนี้",
      note: contactNote || "ติดตามผลการติดต่อ",
      noteIcon: "sticky_note_2",
      actionType: channel === "phone" ? "phone" : channel === "email" ? "email" : "line",
      actionLabel: channel === "phone" ? "โทรออก" : channel === "email" ? "ส่งอีเมล" : "ส่ง LINE OA",
      secondaryActionLabel: "ส่งข้อความ",
      secondaryActionIcon: "send",
    };

    setTasks([newTask, ...tasks]);
    setContactName("");
    setContactTime("");
    setContactNote("");
  };

  const handleCompleteTask = (id: string) => {
    setTasks(tasks.filter((t) => t.id !== id));
  };

  return (
    <div className="min-h-screen bg-surface flex">
      {/* Fixed Left Sidebar */}
      <Sidebar />

      {/* Main Content Area (Offset by Sidebar 256px) */}
      <div className="pl-64 flex-1 flex flex-col min-w-0">
        <Header />

        <main className="relative pt-16 bg-surface min-h-screen w-full px-margin">
          <div className="flex flex-col w-full pb-space-xl">
            {/* Top Utility Bar: Page Header & Quick Controls */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-space-md py-space-lg">
              <div className="flex flex-col">
                <div className="flex items-center gap-space-xs font-mono text-[12px] text-secondary uppercase tracking-widest font-semibold">
                  <span className="w-2 h-2 rounded-full bg-secondary animate-pulse" />
                  <span>Executive Overview • Real-time Sync</span>
                </div>
                <div className="flex items-baseline gap-space-sm mt-0.5">
                  <h1 className="text-[24px] font-semibold text-on-surface">
                    ภาพรวมงานติดตามลูกค้า
                  </h1>
                  <span className="font-mono text-[13px] text-on-surface-variant">
                    ประจำวันที่ 24 พ.ค. 2025
                  </span>
                </div>
              </div>

              {/* Quick Action / Date Pill / Filter */}
              <div className="flex items-center gap-space-sm">
                <div className="flex items-center bg-surface-container-low p-1 rounded-xl shadow-sm border border-outline-variant/15">
                  <button
                    className={`px-space-md py-1 text-[13px] rounded-lg transition-colors ${
                      activeDateTab === "today"
                        ? "bg-surface-container-lowest text-on-surface shadow-sm font-semibold"
                        : "text-on-surface-variant hover:text-on-surface"
                    }`}
                    onClick={() => setActiveDateTab("today")}
                    type="button"
                  >
                    วันนี้ (Today)
                  </button>
                  <button
                    className={`px-space-md py-1 text-[13px] rounded-lg transition-colors ${
                      activeDateTab === "week"
                        ? "bg-surface-container-lowest text-on-surface shadow-sm font-semibold"
                        : "text-on-surface-variant hover:text-on-surface"
                    }`}
                    onClick={() => setActiveDateTab("week")}
                    type="button"
                  >
                    สัปดาห์นี้
                  </button>
                  <button
                    className={`px-space-md py-1 text-[13px] rounded-lg transition-colors ${
                      activeDateTab === "month"
                        ? "bg-surface-container-lowest text-on-surface shadow-sm font-semibold"
                        : "text-on-surface-variant hover:text-on-surface"
                    }`}
                    onClick={() => setActiveDateTab("month")}
                    type="button"
                  >
                    เดือนนี้
                  </button>
                </div>

                <button
                  className="flex items-center gap-1.5 px-space-md py-2 bg-surface-container-lowest text-on-surface text-[13px] font-medium rounded-xl shadow-sm hover:bg-surface-container border border-outline-variant/20 transition-colors"
                  type="button"
                >
                  <span className="material-symbols-outlined text-[18px] text-on-surface-variant">
                    tune
                  </span>
                  <span>ปรับแต่งมุมมอง</span>
                </button>
              </div>
            </div>

            {/* Row 1: KPI Stat Metrics (5 Micro-Surfaces) */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-space-md">
              {/* Stat 1: Total Contacts */}
              <div className="flex flex-col justify-between p-space-lg bg-surface-container-lowest rounded-xl border border-outline-variant/15 shadow-sm hover:shadow-md transition-shadow relative overflow-hidden group">
                <div className="flex items-center justify-between">
                  <span className="text-[11px] font-semibold uppercase text-on-surface-variant tracking-wider">
                    ผู้ติดต่อทั้งหมด
                  </span>
                  <div className="w-8 h-8 rounded-lg bg-surface-container-low flex items-center justify-center text-on-surface-variant">
                    <span className="material-symbols-outlined text-[18px]">group</span>
                  </div>
                </div>
                <div className="mt-space-md flex items-baseline justify-between">
                  <span className="text-[32px] font-bold text-on-surface font-mono">
                    128
                  </span>
                  <span className="inline-flex items-center gap-0.5 px-2 py-0.5 rounded-full bg-surface-container-high text-on-surface font-mono text-[11px] font-medium">
                    <span className="material-symbols-outlined text-[14px]">trending_up</span>
                    +12%
                  </span>
                </div>
                <span className="text-[12px] text-on-surface-variant mt-1">
                  เทียบกับ 7 วันที่ผ่านมา
                </span>
              </div>

              {/* Stat 2: Due Today */}
              <div className="flex flex-col justify-between p-space-lg bg-surface-container-lowest rounded-xl border border-outline-variant/15 shadow-sm relative overflow-hidden ring-2 ring-secondary/20">
                <div className="absolute -right-6 -top-6 w-20 h-20 bg-secondary/10 rounded-full blur-xl pointer-events-none" />
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-secondary animate-ping" />
                    <span className="text-[11px] font-bold uppercase text-secondary tracking-wider">
                      ต้องติดตามวันนี้
                    </span>
                  </div>
                  <div className="w-8 h-8 rounded-lg bg-surface-container text-secondary flex items-center justify-center">
                    <span className="material-symbols-outlined text-[18px]">
                      notifications_active
                    </span>
                  </div>
                </div>
                <div className="mt-space-md flex items-baseline justify-between">
                  <span className="text-[32px] font-bold text-secondary font-mono">
                    {tasks.length}
                  </span>
                  <span className="px-2 py-0.5 rounded-full bg-secondary-fixed text-secondary text-[11px] font-semibold">
                    ด่วนมาก
                  </span>
                </div>
                <span className="text-[12px] text-on-surface-variant mt-1">
                  รอการยืนยันคำสั่งซื้อ &amp; นัดโทร
                </span>
              </div>

              {/* Stat 3: Pending / Appointments */}
              <div className="flex flex-col justify-between p-space-lg bg-surface-container-lowest rounded-xl border border-outline-variant/15 shadow-sm hover:shadow-md transition-shadow">
                <div className="flex items-center justify-between">
                  <span className="text-[11px] font-semibold uppercase text-on-surface-variant tracking-wider">
                    รอดำเนินการ / นัดหมาย
                  </span>
                  <div className="w-8 h-8 rounded-lg bg-surface-container-low flex items-center justify-center text-on-surface-variant">
                    <span className="material-symbols-outlined text-[18px]">
                      event_repeat
                    </span>
                  </div>
                </div>
                <div className="mt-space-md flex items-baseline justify-between">
                  <span className="text-[32px] font-bold text-on-surface font-mono">
                    34
                  </span>
                  <span className="font-mono text-[11px] text-on-surface-variant">
                    26.5% รวม
                  </span>
                </div>
                <span className="text-[12px] text-on-surface-variant mt-1">
                  คิวเสนอราคาและรอพิจารณา
                </span>
              </div>

              {/* Stat 4: Won / Completed Deals */}
              <div className="flex flex-col justify-between p-space-lg bg-surface-container-lowest rounded-xl border border-outline-variant/15 shadow-sm hover:shadow-md transition-shadow">
                <div className="flex items-center justify-between">
                  <span className="text-[11px] font-semibold uppercase text-on-surface-variant tracking-wider">
                    ปิดการขาย / สำเร็จ
                  </span>
                  <div className="w-8 h-8 rounded-lg bg-surface-container-high flex items-center justify-center text-on-tertiary-container">
                    <span className="material-symbols-outlined text-[18px]">verified</span>
                  </div>
                </div>
                <div className="mt-space-md flex items-baseline justify-between">
                  <span className="text-[32px] font-bold text-on-surface font-mono">
                    68
                  </span>
                  <span className="px-2 py-0.5 rounded-full bg-surface-container-low text-on-tertiary-container font-mono text-[11px] font-semibold">
                    53.1%
                  </span>
                </div>
                <span className="text-[12px] text-on-surface-variant mt-1">
                  เป้าหมายประจำเดือน 75 ราย
                </span>
              </div>

              {/* Stat 5: Overdue */}
              <div className="flex flex-col justify-between p-space-lg bg-surface-container-lowest rounded-xl border border-outline-variant/15 shadow-sm hover:shadow-md transition-shadow">
                <div className="flex items-center justify-between">
                  <span className="text-[11px] font-semibold uppercase text-on-surface-variant tracking-wider">
                    เกินกำหนดติดตาม
                  </span>
                  <div className="w-8 h-8 rounded-lg bg-error-container/40 flex items-center justify-center text-error">
                    <span className="material-symbols-outlined text-[18px]">warning</span>
                  </div>
                </div>
                <div className="mt-space-md flex items-baseline justify-between">
                  <span className="text-[32px] font-bold text-error font-mono">
                    3
                  </span>
                  <span className="px-2 py-0.5 rounded-full bg-error-container text-on-error-container text-[11px] font-bold">
                    ค้างเกิน 3 วัน
                  </span>
                </div>
                <span className="text-[12px] text-on-surface-variant mt-1">
                  ต้องจัดการเพื่อรักษา Lead Score
                </span>
              </div>
            </div>

            {/* Main Section Split (8 Cols vs 4 Cols) */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-space-lg mt-space-lg items-start">
              {/* LEFT MAIN COLUMN: Follow-up Queue (8 of 12 columns) */}
              <div className="lg:col-span-8 flex flex-col gap-space-md">
                {/* Tasks Container */}
                <div className="bg-surface-container-lowest rounded-xl p-space-lg shadow-sm border border-outline-variant/15 flex flex-col gap-space-md">
                  {/* Header with Filters & Bulk Count */}
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-space-sm pb-space-sm border-b border-outline-variant/10">
                    <div className="flex items-center gap-space-sm">
                      <h2 className="text-[18px] font-semibold text-on-surface">
                        รายการที่ต้องติดตามวันนี้ (Due Today)
                      </h2>
                      <span className="px-2 py-0.5 rounded-full bg-secondary text-on-secondary font-mono text-[12px] font-bold">
                        {tasks.length} งาน
                      </span>
                    </div>
                    <div className="flex items-center gap-space-xs text-on-surface-variant text-[13px]">
                      <span className="text-[11px] uppercase font-semibold">
                        จัดเรียงตาม:
                      </span>
                      <button
                        className="flex items-center gap-0.5 text-on-surface hover:text-secondary font-semibold"
                        type="button"
                      >
                        <span>เวลาเร่งด่วน</span>
                        <span className="material-symbols-outlined text-[16px]">
                          arrow_drop_down
                        </span>
                      </button>
                    </div>
                  </div>

                  {/* Task List */}
                  {tasks.length === 0 ? (
                    <div className="py-12 flex flex-col items-center justify-center text-on-surface-variant">
                      <span className="material-symbols-outlined text-4xl mb-2 text-secondary">
                        check_circle
                      </span>
                      <p className="text-[14px]">ติดตามงานวันนี้ครบทั้งหมดแล้ว!</p>
                    </div>
                  ) : (
                    tasks.map((task) => (
                      <div
                        key={task.id}
                        className="p-space-md bg-surface-container-low rounded-xl flex flex-col gap-space-sm transition-all hover:bg-surface-container border border-outline-variant/10"
                      >
                        <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-space-sm">
                          <div className="flex items-start gap-space-md">
                            <div className="w-10 h-10 rounded-full bg-secondary text-on-secondary flex items-center justify-center text-[18px] font-bold shrink-0">
                              {task.initials}
                            </div>
                            <div className="flex flex-col">
                              <div className="flex flex-wrap items-center gap-x-space-sm gap-y-1">
                                <span className="text-[16px] font-semibold text-on-surface">
                                  {task.name}
                                </span>
                                <span className="px-2 py-0.5 rounded-md bg-surface-container-highest text-on-surface-variant text-[11px] font-medium">
                                  {task.company}
                                </span>
                                <span className="px-2 py-0.5 rounded-full bg-secondary-fixed text-on-secondary-fixed text-[11px] font-semibold flex items-center gap-1">
                                  <span className="w-1.5 h-1.5 rounded-full bg-secondary" />
                                  {task.status}
                                </span>
                              </div>
                              <div className="flex flex-wrap items-center gap-x-space-md gap-y-1 mt-1 text-[12px] text-on-surface-variant font-mono">
                                {task.phone && (
                                  <span className="flex items-center gap-1">
                                    <span className="material-symbols-outlined text-[15px]">
                                      phone
                                    </span>
                                    {task.phone}
                                  </span>
                                )}
                                {task.lineId && (
                                  <span className="flex items-center gap-1">
                                    <span className="material-symbols-outlined text-[15px]">
                                      chat
                                    </span>
                                    {task.lineId}
                                  </span>
                                )}
                                {task.email && (
                                  <span className="flex items-center gap-1">
                                    <span className="material-symbols-outlined text-[15px]">
                                      mail
                                    </span>
                                    {task.email}
                                  </span>
                                )}
                                <span className="flex items-center gap-1 text-secondary font-semibold">
                                  <span className="material-symbols-outlined text-[15px]">
                                    schedule
                                  </span>
                                  {task.time}
                                </span>
                              </div>
                            </div>
                          </div>

                          {task.dealValue && (
                            <span className="inline-flex self-start px-2.5 py-0.5 rounded bg-surface-container-highest text-on-surface text-[11px] font-semibold">
                              {task.dealValue}
                            </span>
                          )}
                        </div>

                        {/* Note Block */}
                        <div className="p-space-sm bg-surface-container-lowest rounded-lg text-[13px] text-on-surface flex items-start gap-space-xs border border-outline-variant/15">
                          <span className="material-symbols-outlined text-secondary text-[18px] shrink-0 mt-0.5">
                            {task.noteIcon}
                          </span>
                          <span>
                            <strong className="font-semibold text-on-surface">
                              บันทึก:{" "}
                            </strong>
                            {task.note}
                          </span>
                        </div>

                        {/* Action Buttons Bar */}
                        <div className="flex flex-wrap items-center justify-between gap-space-sm pt-space-xs">
                          <div className="flex items-center gap-space-xs">
                            <button
                              className="flex items-center gap-1.5 px-space-md py-1.5 bg-primary text-on-primary rounded-xl text-[13px] font-medium hover:bg-on-surface-variant transition-colors shadow-sm"
                              type="button"
                            >
                              <span className="material-symbols-outlined text-[16px]">
                                {task.actionType === "phone"
                                  ? "call"
                                  : task.actionType === "email"
                                  ? "send"
                                  : "chat_bubble"}
                              </span>
                              <span>{task.actionLabel}</span>
                            </button>
                            <button
                              className="flex items-center gap-1.5 px-space-md py-1.5 bg-surface-container-lowest text-on-surface rounded-xl text-[13px] font-medium hover:bg-surface-container-high transition-colors border border-outline-variant/15"
                              type="button"
                            >
                              <span className="material-symbols-outlined text-[16px]">
                                {task.secondaryActionIcon}
                              </span>
                              <span>{task.secondaryActionLabel}</span>
                            </button>
                          </div>

                          <div className="flex items-center gap-space-xs">
                            <button
                              className="flex items-center gap-1 px-space-sm py-1.5 text-on-surface-variant hover:text-on-surface text-[13px] rounded-lg transition-colors"
                              type="button"
                            >
                              <span className="material-symbols-outlined text-[16px]">
                                snooze
                              </span>
                              <span>เลื่อนนัด</span>
                            </button>
                            <button
                              onClick={() => handleCompleteTask(task.id)}
                              className="flex items-center gap-1 px-space-md py-1.5 bg-surface-container-high text-on-tertiary-container hover:bg-surface-container-highest text-[13px] rounded-xl font-semibold transition-colors"
                              type="button"
                            >
                              <span className="material-symbols-outlined text-[16px]">
                                done_all
                              </span>
                              <span>ทำเครื่องหมายเสร็จสิ้น</span>
                            </button>
                          </div>
                        </div>
                      </div>
                    ))
                  )}

                  {/* View More Link */}
                  {tasks.length > 0 && (
                    <div className="pt-space-xs flex justify-center">
                      <button
                        className="flex items-center gap-1 text-secondary text-[13px] font-semibold hover:underline py-1"
                        type="button"
                      >
                        <span>ดูรายการที่เหลืออีกสำหรับวันนี้</span>
                        <span className="material-symbols-outlined text-[16px]">
                          expand_more
                        </span>
                      </button>
                    </div>
                  )}
                </div>

                {/* Recent Completed Log Snip */}
                <div className="bg-surface-container-lowest rounded-xl p-space-lg shadow-sm border border-outline-variant/15 flex flex-col gap-space-sm">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-space-sm">
                      <span className="material-symbols-outlined text-on-tertiary-container text-[20px]">
                        task_alt
                      </span>
                      <h3 className="text-[16px] font-semibold text-on-surface">
                        ประวัติที่เพิ่งดำเนินการสำเร็จเมื่อเช้านี้
                      </h3>
                    </div>
                    <span className="font-mono text-[12px] text-on-surface-variant">
                      2 รายการเสร็จสิ้น
                    </span>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-space-sm mt-space-xs">
                    <div className="p-space-sm bg-surface-container-low rounded-lg flex items-center justify-between border border-outline-variant/10">
                      <div className="flex flex-col">
                        <span className="text-[13px] font-semibold text-on-surface">
                          ธีรภัทร ชาญวารินทร์
                        </span>
                        <span className="text-[12px] text-on-surface-variant">
                          โทรแจ้งผลใบเสนอราคาสำเร็จ
                        </span>
                      </div>
                      <span className="font-mono text-[11px] text-on-tertiary-container font-semibold">
                        10:15 น.
                      </span>
                    </div>
                    <div className="p-space-sm bg-surface-container-low rounded-lg flex items-center justify-between border border-outline-variant/10">
                      <div className="flex flex-col">
                        <span className="text-[13px] font-semibold text-on-surface">
                          ณิชาภัทร วัฒนกุล
                        </span>
                        <span className="text-[12px] text-on-surface-variant">
                          ส่งลิงก์ชำระเงินมัดจำผ่าน LINE
                        </span>
                      </div>
                      <span className="font-mono text-[11px] text-on-tertiary-container font-semibold">
                        11:30 น.
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* RIGHT SIDEBAR COLUMN: Breakdown & Quick Add (4 of 12 columns) */}
              <div className="lg:col-span-4 flex flex-col gap-space-md">
                {/* Card 1: Quick Add Contact Card */}
                <div className="bg-surface-container-lowest rounded-xl p-space-lg shadow-sm border border-outline-variant/15 flex flex-col gap-space-md">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-space-xs">
                      <div className="w-7 h-7 rounded-lg bg-secondary-container flex items-center justify-center text-on-secondary">
                        <span className="material-symbols-outlined text-[18px]">
                          add
                        </span>
                      </div>
                      <h3 className="text-[16px] font-semibold text-on-surface">
                        เพิ่มการติดต่อด่วน
                      </h3>
                    </div>
                    <span className="font-mono text-[11px] text-on-surface-variant">
                      Quick Entry
                    </span>
                  </div>

                  <form onSubmit={handleQuickAdd} className="flex flex-col gap-space-sm">
                    <div className="flex flex-col gap-1">
                      <label
                        className="text-[11px] font-semibold uppercase text-on-surface-variant"
                        htmlFor="contact-name"
                      >
                        ชื่อผู้ติดต่อ / บริษัท
                      </label>
                      <input
                        id="contact-name"
                        value={contactName}
                        onChange={(e) => setContactName(e.target.value)}
                        className="w-full px-space-md py-2 bg-surface-container-low text-on-surface placeholder-on-surface-variant rounded-xl text-[13px] focus:outline-none focus:bg-surface-container-lowest focus:ring-2 focus:ring-secondary transition-all border border-outline-variant/15"
                        placeholder="เช่น ชญานิน นครินทร์ (Siam Retail)"
                        required
                        type="text"
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-space-xs">
                      <div className="flex flex-col gap-1">
                        <label
                          className="text-[11px] font-semibold uppercase text-on-surface-variant"
                          htmlFor="contact-channel"
                        >
                          ช่องทาง
                        </label>
                        <select
                          id="contact-channel"
                          value={channel}
                          onChange={(e) => setChannel(e.target.value)}
                          className="w-full px-space-sm py-2 bg-surface-container-low text-on-surface rounded-xl text-[13px] focus:outline-none focus:bg-surface-container-lowest focus:ring-2 focus:ring-secondary transition-all border border-outline-variant/15"
                        >
                          <option value="line">LINE Official</option>
                          <option value="phone">โทรศัพท์มือถือ</option>
                          <option value="email">อีเมล</option>
                          <option value="meeting">นัดพบนอกสถานที่</option>
                        </select>
                      </div>

                      <div className="flex flex-col gap-1">
                        <label
                          className="text-[11px] font-semibold uppercase text-on-surface-variant"
                          htmlFor="contact-time"
                        >
                          กำหนดเวลา
                        </label>
                        <input
                          id="contact-time"
                          value={contactTime}
                          onChange={(e) => setContactTime(e.target.value)}
                          className="w-full px-space-sm py-2 bg-surface-container-low text-on-surface placeholder-on-surface-variant rounded-xl text-[13px] focus:outline-none focus:bg-surface-container-lowest focus:ring-2 focus:ring-secondary transition-all border border-outline-variant/15"
                          placeholder="17:00 น. วันนี้"
                          type="text"
                        />
                      </div>
                    </div>

                    <div className="flex flex-col gap-1">
                      <label
                        className="text-[11px] font-semibold uppercase text-on-surface-variant"
                        htmlFor="contact-note"
                      >
                        รายละเอียดที่ต้องทำ
                      </label>
                      <textarea
                        id="contact-note"
                        value={contactNote}
                        onChange={(e) => setContactNote(e.target.value)}
                        className="w-full px-space-md py-1.5 bg-surface-container-low text-on-surface placeholder-on-surface-variant rounded-xl text-[13px] focus:outline-none focus:bg-surface-container-lowest focus:ring-2 focus:ring-secondary transition-all resize-none border border-outline-variant/15"
                        placeholder="ระบุสิ่งที่ต้องติดตาม เช่น ส่งโบร์ชัวร์สินค้า..."
                        rows={2}
                      />
                    </div>

                    <button
                      className="w-full mt-space-xs py-2.5 px-space-md bg-secondary text-on-secondary hover:bg-secondary-container rounded-xl text-[13px] font-semibold flex items-center justify-center gap-1.5 transition-colors shadow-sm"
                      type="submit"
                    >
                      <span className="material-symbols-outlined text-[18px]">
                        bookmark_add
                      </span>
                      <span>บันทึกลงตารางติดตาม</span>
                    </button>
                  </form>
                </div>

                {/* Card 2: Status Breakdown Distribution */}
                <div className="bg-surface-container-lowest rounded-xl p-space-lg shadow-sm border border-outline-variant/15 flex flex-col gap-space-md">
                  <div className="flex items-center justify-between">
                    <h3 className="text-[16px] font-semibold text-on-surface">
                      สัดส่วนตามสถานะ
                    </h3>
                    <span className="font-mono text-[11px] text-on-surface-variant">
                      128 ทั้งหมด
                    </span>
                  </div>

                  {/* Segmented Multi-Bar Visualizer */}
                  <div className="flex flex-col gap-space-xs">
                    <div className="w-full h-3 bg-surface-container rounded-full overflow-hidden flex">
                      <div
                        className="h-full bg-secondary-container"
                        style={{ width: "53.1%" }}
                        title="ปิดการขาย / สำเร็จ (53.1%)"
                      />
                      <div
                        className="h-full bg-secondary-fixed-dim"
                        style={{ width: "26.5%" }}
                        title="รอดำเนินการ (26.5%)"
                      />
                      <div
                        className="h-full bg-secondary"
                        style={{ width: "18.0%" }}
                        title="ต้องติดตามวันนี้ (18.0%)"
                      />
                      <div
                        className="h-full bg-error"
                        style={{ width: "2.4%" }}
                        title="เกินกำหนด (2.4%)"
                      />
                    </div>
                    <div className="flex items-center justify-between font-mono text-[10px] text-on-surface-variant pt-0.5">
                      <span>0%</span>
                      <span>50%</span>
                      <span>100%</span>
                    </div>
                  </div>

                  {/* Breakdown List Items */}
                  <div className="flex flex-col gap-space-sm pt-space-xs">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-space-sm">
                        <span className="w-2.5 h-2.5 rounded-full bg-secondary-container" />
                        <span className="text-[13px] text-on-surface">
                          ปิดการขายสำเร็จ (Won)
                        </span>
                      </div>
                      <div className="flex items-center gap-space-sm font-mono">
                        <span className="font-semibold text-on-surface">68</span>
                        <span className="text-on-surface-variant text-[11px]">
                          53.1%
                        </span>
                      </div>
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-space-sm">
                        <span className="w-2.5 h-2.5 rounded-full bg-secondary-fixed-dim" />
                        <span className="text-[13px] text-on-surface">
                          รอดำเนินการ / นัดหมาย
                        </span>
                      </div>
                      <div className="flex items-center gap-space-sm font-mono">
                        <span className="font-semibold text-on-surface">34</span>
                        <span className="text-on-surface-variant text-[11px]">
                          26.5%
                        </span>
                      </div>
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-space-sm">
                        <span className="w-2.5 h-2.5 rounded-full bg-secondary" />
                        <span className="text-[13px] text-on-surface font-semibold">
                          ต้องติดตามวันนี้
                        </span>
                      </div>
                      <div className="flex items-center gap-space-sm font-mono">
                        <span className="font-semibold text-secondary">
                          {tasks.length}
                        </span>
                        <span className="text-secondary text-[11px] font-bold">
                          18.0%
                        </span>
                      </div>
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-space-sm">
                        <span className="w-2.5 h-2.5 rounded-full bg-error" />
                        <span className="text-[13px] text-on-surface">
                          เกินกำหนด (Overdue)
                        </span>
                      </div>
                      <div className="flex items-center gap-space-sm font-mono">
                        <span className="font-semibold text-error">3</span>
                        <span className="text-error text-[11px] font-bold">
                          2.4%
                        </span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Card 3: Channel Popularity */}
                <div className="bg-surface-container-lowest rounded-xl p-space-lg shadow-sm border border-outline-variant/15 flex flex-col gap-space-md">
                  <div className="flex items-center justify-between">
                    <h3 className="text-[16px] font-semibold text-on-surface">
                      ช่องทางติดต่อยอดนิยม
                    </h3>
                    <span className="material-symbols-outlined text-on-surface-variant text-[18px]">
                      hub
                    </span>
                  </div>

                  <div className="flex flex-col gap-space-md">
                    {/* LINE (48%) */}
                    <div className="flex flex-col gap-1.5">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <span className="w-6 h-6 rounded-lg bg-surface-container-high flex items-center justify-center text-on-tertiary-container">
                            <span className="material-symbols-outlined text-[15px]">
                              chat
                            </span>
                          </span>
                          <span className="text-[13px] font-semibold text-on-surface">
                            LINE Official
                          </span>
                        </div>
                        <span className="font-mono text-[13px] font-bold text-on-surface">
                          48%
                        </span>
                      </div>
                      <div className="w-full h-2 bg-surface-container rounded-full overflow-hidden">
                        <div
                          className="h-full bg-on-tertiary-container rounded-full"
                          style={{ width: "48%" }}
                        />
                      </div>
                    </div>

                    {/* Phone (32%) */}
                    <div className="flex flex-col gap-1.5">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <span className="w-6 h-6 rounded-lg bg-surface-container flex items-center justify-center text-secondary">
                            <span className="material-symbols-outlined text-[15px]">
                              call
                            </span>
                          </span>
                          <span className="text-[13px] font-semibold text-on-surface">
                            โทรศัพท์มือถือ (Phone)
                          </span>
                        </div>
                        <span className="font-mono text-[13px] font-bold text-on-surface">
                          32%
                        </span>
                      </div>
                      <div className="w-full h-2 bg-surface-container rounded-full overflow-hidden">
                        <div
                          className="h-full bg-secondary rounded-full"
                          style={{ width: "32%" }}
                        />
                      </div>
                    </div>

                    {/* Email (20%) */}
                    <div className="flex flex-col gap-1.5">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <span className="w-6 h-6 rounded-lg bg-surface-container-low flex items-center justify-center text-on-surface-variant">
                            <span className="material-symbols-outlined text-[15px]">
                              mail
                            </span>
                          </span>
                          <span className="text-[13px] font-semibold text-on-surface">
                            อีเมล (Email)
                          </span>
                        </div>
                        <span className="font-mono text-[13px] font-bold text-on-surface">
                          20%
                        </span>
                      </div>
                      <div className="w-full h-2 bg-surface-container rounded-full overflow-hidden">
                        <div
                          className="h-full bg-on-surface-variant rounded-full"
                          style={{ width: "20%" }}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
