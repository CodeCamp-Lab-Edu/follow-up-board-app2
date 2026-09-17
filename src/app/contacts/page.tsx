"use client";

import { useState, useEffect } from "react";
import Sidebar from "@/components/Sidebar";
import Header from "@/components/Header";
import {
  getContacts,
  createContact,
  updateContact,
  deleteContact,
} from "@/app/actions/contacts";

export type ContactStatus = "รายการใหม่" | "กำลังคุย" | "ปิดงาน";

export interface ContactItem {
  id: string;
  name: string;
  company: string;
  email: string;
  phone: string;
  channel: string;
  interests: string;
  status: ContactStatus;
  followUpDate: string;
  note: string;
}

export default function ContactsPage() {
  const [contacts, setContacts] = useState<ContactItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("ทั้งหมด");
  const [channelFilter, setChannelFilter] = useState<string>("ทั้งหมด");

  // Modal State for Add/Edit
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingContact, setEditingContact] = useState<ContactItem | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Form Fields State
  const [formName, setFormName] = useState("");
  const [formCompany, setFormCompany] = useState("");
  const [formEmail, setFormEmail] = useState("");
  const [formPhone, setFormPhone] = useState("");
  const [formChannel, setFormChannel] = useState("LINE Official");
  const [formInterests, setFormInterests] = useState("");
  const [formStatus, setFormStatus] = useState<ContactStatus>("รายการใหม่");
  const [formFollowUpDate, setFormFollowUpDate] = useState("");
  const [formNote, setFormNote] = useState("");

  useEffect(() => {
    let isMounted = true;

    async function load() {
      try {
        const data = await getContacts();
        if (!isMounted) return;
        const mapped: ContactItem[] = data.map((c) => ({
          id: c.id,
          name: c.name,
          company: c.company || "",
          email: c.email || "",
          phone: c.phone || "",
          channel: c.channel || "LINE Official",
          interests: c.interests || "",
          status: (c.status as ContactStatus) || "รายการใหม่",
          followUpDate: c.followUpDate || "",
          note: c.note || "",
        }));
        setContacts(mapped);
      } catch (err) {
        console.error("Failed to load contacts:", err);
      } finally {
        if (isMounted) setIsLoading(false);
      }
    }

    load();

    return () => {
      isMounted = false;
    };
  }, []);

  const refreshContacts = async () => {
    try {
      const data = await getContacts();
      const mapped: ContactItem[] = data.map((c) => ({
        id: c.id,
        name: c.name,
        company: c.company || "",
        email: c.email || "",
        phone: c.phone || "",
        channel: c.channel || "LINE Official",
        interests: c.interests || "",
        status: (c.status as ContactStatus) || "รายการใหม่",
        followUpDate: c.followUpDate || "",
        note: c.note || "",
      }));
      setContacts(mapped);
    } catch (err) {
      console.error("Failed to refresh contacts:", err);
    }
  };

  const openAddModal = () => {
    setEditingContact(null);
    setFormName("");
    setFormCompany("");
    setFormEmail("");
    setFormPhone("");
    setFormChannel("LINE Official");
    setFormInterests("");
    setFormStatus("รายการใหม่");
    setFormFollowUpDate(new Date().toISOString().split("T")[0]);
    setFormNote("");
    setIsModalOpen(true);
  };

  const openEditModal = (contact: ContactItem) => {
    setEditingContact(contact);
    setFormName(contact.name);
    setFormCompany(contact.company);
    setFormEmail(contact.email);
    setFormPhone(contact.phone);
    setFormChannel(contact.channel);
    setFormInterests(contact.interests);
    setFormStatus(contact.status);
    setFormFollowUpDate(contact.followUpDate);
    setFormNote(contact.note);
    setIsModalOpen(true);
  };

  const handleSaveContact = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formName.trim()) return;

    setIsSubmitting(true);
    try {
      if (editingContact) {
        // Edit mode
        await updateContact(editingContact.id, {
          name: formName,
          company: formCompany,
          email: formEmail,
          phone: formPhone,
          channel: formChannel,
          interests: formInterests,
          status: formStatus,
          followUpDate: formFollowUpDate,
          note: formNote,
        });
      } else {
        // Add mode
        await createContact({
          name: formName,
          company: formCompany,
          email: formEmail,
          phone: formPhone,
          channel: formChannel,
          interests: formInterests,
          status: formStatus,
          followUpDate: formFollowUpDate,
          note: formNote,
        });
      }

      await refreshContacts();
      setIsModalOpen(false);
    } catch (err) {
      alert("เกิดข้อผิดพลาดในการบันทึกข้อมูล กรุณาลองใหม่อีกครั้ง");
      console.error(err);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDeleteContact = async (id: string) => {
    if (confirm("คุณต้องการลบรายชื่อผู้ติดต่อนี้ใช่หรือไม่?")) {
      try {
        await deleteContact(id);
        await refreshContacts();
      } catch (err) {
        alert("เกิดข้อผิดพลาดในการลบข้อมูล");
        console.error(err);
      }
    }
  };

  // Filtered Contacts
  const filteredContacts = contacts.filter((c) => {
    const matchQuery =
      c.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.company.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.phone.includes(searchQuery) ||
      c.email.toLowerCase().includes(searchQuery.toLowerCase());

    const matchStatus =
      statusFilter === "ทั้งหมด" || c.status === statusFilter;

    const matchChannel =
      channelFilter === "ทั้งหมด" || c.channel === channelFilter;

    return matchQuery && matchStatus && matchChannel;
  });

  // KPI Metrics Calculation
  const totalCount = contacts.length;
  const newCount = contacts.filter((c) => c.status === "รายการใหม่").length;
  const inProgressCount = contacts.filter((c) => c.status === "กำลังคุย").length;
  const closedCount = contacts.filter((c) => c.status === "ปิดงาน").length;

  return (
    <div className="min-h-screen bg-surface flex">
      {/* Sidebar Navigation */}
      <Sidebar />

      {/* Main Content Area */}
      <div className="pl-64 flex-1 flex flex-col min-w-0">
        <Header />

        <main className="relative pt-16 bg-surface min-h-screen w-full px-margin pb-space-xl">
          <div className="flex flex-col w-full">
            {/* Top Title & Quick Actions */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-space-md py-space-lg">
              <div>
                <h1 className="text-[24px] font-semibold text-on-surface">
                  รายชื่อผู้ติดต่อ (Contacts)
                </h1>
                <p className="text-[13px] text-on-surface-variant mt-0.5">
                  จัดการรายชื่อผู้ติดต่อ สถานะ และกำหนดวันติดตามงาน (Follow-up)
                </p>
              </div>

              <div className="flex items-center gap-space-sm">
                <button
                  onClick={openAddModal}
                  className="flex items-center gap-1.5 px-4 py-2 bg-primary text-on-primary rounded-xl text-[13px] font-semibold hover:bg-on-surface-variant transition-all shadow-sm"
                  type="button"
                >
                  <span className="material-symbols-outlined text-[18px]">
                    person_add
                  </span>
                  <span>+ เพิ่มผู้ติดต่อ</span>
                </button>
              </div>
            </div>

            {/* KPI Metrics Row */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-space-md mb-space-lg">
              {/* Total Contacts */}
              <div className="bg-surface-container-lowest p-space-md rounded-xl border border-outline-variant/15 shadow-sm flex items-center justify-between">
                <div>
                  <p className="text-[11px] font-semibold uppercase text-on-surface-variant tracking-wider mb-1">
                    ผู้ติดต่อทั้งหมด
                  </p>
                  <div className="flex items-baseline gap-1.5">
                    <span className="text-[26px] font-bold text-on-surface font-mono">
                      {totalCount}
                    </span>
                    <span className="text-[12px] text-on-surface-variant">ราย</span>
                  </div>
                </div>
                <div className="w-10 h-10 rounded-xl bg-surface-container text-secondary flex items-center justify-center">
                  <span className="material-symbols-outlined text-[20px]">
                    contacts
                  </span>
                </div>
              </div>

              {/* In Progress */}
              <div className="bg-surface-container-lowest p-space-md rounded-xl border border-outline-variant/15 shadow-sm flex items-center justify-between">
                <div>
                  <p className="text-[11px] font-semibold uppercase text-secondary font-bold tracking-wider mb-1">
                    กำลังคุย (In Progress)
                  </p>
                  <div className="flex items-baseline gap-1.5">
                    <span className="text-[26px] font-bold text-secondary font-mono">
                      {inProgressCount}
                    </span>
                    <span className="text-[12px] text-on-surface-variant">ราย</span>
                  </div>
                </div>
                <div className="w-10 h-10 rounded-xl bg-secondary-fixed text-on-secondary-fixed flex items-center justify-center">
                  <span className="material-symbols-outlined text-[20px]">
                    forum
                  </span>
                </div>
              </div>

              {/* New Leads */}
              <div className="bg-surface-container-lowest p-space-md rounded-xl border border-outline-variant/15 shadow-sm flex items-center justify-between">
                <div>
                  <p className="text-[11px] font-semibold uppercase text-on-surface-variant tracking-wider mb-1">
                    รายการใหม่
                  </p>
                  <div className="flex items-baseline gap-1.5">
                    <span className="text-[26px] font-bold text-on-surface font-mono">
                      {newCount}
                    </span>
                    <span className="text-[12px] text-on-surface-variant">ราย</span>
                  </div>
                </div>
                <div className="w-10 h-10 rounded-xl bg-surface-container-high text-on-surface flex items-center justify-center">
                  <span className="material-symbols-outlined text-[20px]">
                    fiber_new
                  </span>
                </div>
              </div>

              {/* Closed / Won */}
              <div className="bg-surface-container-lowest p-space-md rounded-xl border border-outline-variant/15 shadow-sm flex items-center justify-between">
                <div>
                  <p className="text-[11px] font-semibold uppercase text-on-tertiary-container font-bold tracking-wider mb-1">
                    ปิดงานแล้ว
                  </p>
                  <div className="flex items-baseline gap-1.5">
                    <span className="text-[26px] font-bold text-on-surface font-mono">
                      {closedCount}
                    </span>
                    <span className="text-[12px] text-on-surface-variant">ราย</span>
                  </div>
                </div>
                <div className="w-10 h-10 rounded-xl bg-surface-container-low text-on-tertiary-container flex items-center justify-center">
                  <span className="material-symbols-outlined text-[20px]">
                    task_alt
                  </span>
                </div>
              </div>
            </div>

            {/* Filter & Search Toolbar */}
            <div className="bg-surface-container-lowest p-space-md rounded-xl border border-outline-variant/15 shadow-sm space-y-3 mb-space-md">
              <div className="flex flex-col lg:flex-row items-center justify-between gap-3">
                {/* Search Input */}
                <div className="relative w-full lg:flex-1">
                  <span className="material-symbols-outlined absolute left-3 top-2.5 text-[18px] text-on-surface-variant">
                    search
                  </span>
                  <input
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full pl-9 pr-12 py-2 text-[13px] bg-surface-container-low border border-outline-variant/20 rounded-xl text-on-surface placeholder-on-surface-variant focus:bg-surface-container-lowest focus:border-secondary focus:ring-1 focus:ring-secondary transition-all"
                    placeholder="ค้นหาด้วยชื่อ, เบอร์โทร, อีเมล หรือชื่อบริษัท..."
                    type="text"
                  />
                  {searchQuery && (
                    <button
                      onClick={() => setSearchQuery("")}
                      className="absolute right-3 top-2.5 text-on-surface-variant hover:text-on-surface"
                      type="button"
                    >
                      <span className="material-symbols-outlined text-[18px]">
                        close
                      </span>
                    </button>
                  )}
                </div>

                {/* Filters */}
                <div className="flex flex-wrap items-center gap-2 w-full lg:w-auto">
                  {/* Status Dropdown */}
                  <select
                    value={statusFilter}
                    onChange={(e) => setStatusFilter(e.target.value)}
                    className="bg-surface-container-low border border-outline-variant/20 rounded-xl px-3 py-2 text-[13px] text-on-surface focus:outline-none focus:ring-1 focus:ring-secondary font-medium"
                  >
                    <option value="ทั้งหมด">สถานะ: ทั้งหมด</option>
                    <option value="รายการใหม่">รายการใหม่</option>
                    <option value="กำลังคุย">กำลังคุย</option>
                    <option value="ปิดงาน">ปิดงาน</option>
                  </select>

                  {/* Channel Dropdown */}
                  <select
                    value={channelFilter}
                    onChange={(e) => setChannelFilter(e.target.value)}
                    className="bg-surface-container-low border border-outline-variant/20 rounded-xl px-3 py-2 text-[13px] text-on-surface focus:outline-none focus:ring-1 focus:ring-secondary font-medium"
                  >
                    <option value="ทั้งหมด">ช่องทาง: ทั้งหมด</option>
                    <option value="LINE Official">LINE Official</option>
                    <option value="โทรศัพท์">โทรศัพท์</option>
                    <option value="อีเมล">อีเมล</option>
                  </select>

                  {(statusFilter !== "ทั้งหมด" ||
                    channelFilter !== "ทั้งหมด" ||
                    searchQuery) && (
                    <button
                      onClick={() => {
                        setStatusFilter("ทั้งหมด");
                        setChannelFilter("ทั้งหมด");
                        setSearchQuery("");
                      }}
                      className="flex items-center gap-1 text-[13px] text-on-surface-variant hover:text-secondary px-2 py-2 font-medium transition-colors"
                      type="button"
                    >
                      <span className="material-symbols-outlined text-[16px]">
                        restart_alt
                      </span>
                      <span>ล้างตัวกรอง</span>
                    </button>
                  )}
                </div>
              </div>
            </div>

            {/* Contacts Table */}
            <div className="bg-surface-container-lowest rounded-xl border border-outline-variant/15 shadow-sm overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse text-[13px]">
                  <thead>
                    <tr className="border-b border-outline-variant/20 bg-surface-container-low/50 text-[11px] font-semibold text-on-surface-variant uppercase tracking-wider">
                      <th className="py-3 px-4" scope="col">
                        ผู้ติดต่อ / บริษัท
                      </th>
                      <th className="py-3 px-4" scope="col">
                        ช่องทางติดต่อ
                      </th>
                      <th className="py-3 px-4" scope="col">
                        สิ่งที่สนใจ
                      </th>
                      <th className="py-3 px-4 text-center" scope="col">
                        สถานะ
                      </th>
                      <th className="py-3 px-4" scope="col">
                        กำหนด Follow-up
                      </th>
                      <th className="py-3 px-4" scope="col">
                        หมายเหตุ
                      </th>
                      <th className="py-3 px-4 text-center" scope="col">
                        จัดการ
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-outline-variant/10">
                    {isLoading ? (
                      <tr>
                        <td
                          colSpan={7}
                          className="py-12 text-center text-on-surface-variant text-[14px]"
                        >
                          <div className="flex items-center justify-center gap-2">
                            <span className="w-5 h-5 border-2 border-secondary/30 border-t-secondary rounded-full animate-spin" />
                            <span>กำลังโหลดข้อมูลผู้ติดต่อ...</span>
                          </div>
                        </td>
                      </tr>
                    ) : filteredContacts.length === 0 ? (
                      <tr>
                        <td
                          colSpan={7}
                          className="py-12 text-center text-on-surface-variant text-[14px]"
                        >
                          ไม่พบข้อมูลผู้ติดต่อที่ตรงกับเงื่อนไขการค้นหา
                        </td>
                      </tr>
                    ) : (
                      filteredContacts.map((contact) => (
                        <tr
                          key={contact.id}
                          className="hover:bg-surface-container-low/60 transition-colors"
                        >
                          {/* Name & Company */}
                          <td className="py-3.5 px-4 align-top">
                            <div className="flex items-center gap-3">
                              <div className="w-9 h-9 rounded-lg bg-secondary text-on-secondary font-bold flex items-center justify-center text-[14px] shrink-0">
                                {contact.name.charAt(0)}
                              </div>
                              <div>
                                <div className="font-semibold text-on-surface text-[14px]">
                                  {contact.name}
                                </div>
                                <p className="text-[12px] text-on-surface-variant mt-0.5">
                                  {contact.company || "-"}
                                </p>
                              </div>
                            </div>
                          </td>

                          {/* Contact Info (Phone, Email, Channel) */}
                          <td className="py-3.5 px-4 align-top">
                            <div className="space-y-0.5 font-mono text-[12px]">
                              {contact.phone && (
                                <div className="flex items-center gap-1.5 text-on-surface">
                                  <span className="material-symbols-outlined text-[15px] text-on-surface-variant">
                                    phone
                                  </span>
                                  <span>{contact.phone}</span>
                                </div>
                              )}
                              {contact.email && (
                                <div className="flex items-center gap-1.5 text-on-surface-variant text-[11px]">
                                  <span className="material-symbols-outlined text-[15px]">
                                    mail
                                  </span>
                                  <span>{contact.email}</span>
                                </div>
                              )}
                              <div className="flex items-center gap-1 text-[11px] text-secondary font-sans font-medium">
                                <span className="material-symbols-outlined text-[14px]">
                                  chat
                                </span>
                                <span>{contact.channel}</span>
                              </div>
                            </div>
                          </td>

                          {/* Interests */}
                          <td className="py-3.5 px-4 align-top">
                            <span className="text-[12px] text-on-surface bg-surface-container-high px-2 py-0.5 rounded-md inline-block">
                              {contact.interests || "-"}
                            </span>
                          </td>

                          {/* Status Pill */}
                          <td className="py-3.5 px-4 align-top text-center">
                            <span
                              className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-semibold ${
                                contact.status === "รายการใหม่"
                                  ? "bg-surface-container-high text-on-surface"
                                  : contact.status === "กำลังคุย"
                                  ? "bg-secondary-fixed text-on-secondary-fixed"
                                  : "bg-surface-container-low text-on-tertiary-container"
                              }`}
                            >
                              <span
                                className={`w-1.5 h-1.5 rounded-full ${
                                  contact.status === "รายการใหม่"
                                    ? "bg-on-surface-variant"
                                    : contact.status === "กำลังคุย"
                                    ? "bg-secondary"
                                    : "bg-on-tertiary-container"
                                }`}
                              />
                              <span>{contact.status}</span>
                            </span>
                          </td>

                          {/* Follow-up Date */}
                          <td className="py-3.5 px-4 align-top font-mono text-[12px]">
                            <div className="flex items-center gap-1 text-secondary font-medium">
                              <span className="material-symbols-outlined text-[16px]">
                                event
                              </span>
                              <span>{contact.followUpDate || "-"}</span>
                            </div>
                          </td>

                          {/* Note */}
                          <td className="py-3.5 px-4 align-top max-w-xs">
                            <p className="text-[12px] text-on-surface-variant line-clamp-2">
                              {contact.note || "-"}
                            </p>
                          </td>

                          {/* Actions: Edit & Delete */}
                          <td className="py-3.5 px-4 align-top text-center">
                            <div className="flex items-center justify-center gap-1">
                              <button
                                onClick={() => openEditModal(contact)}
                                className="p-1 text-on-surface-variant hover:text-secondary hover:bg-surface-container rounded-lg transition-colors"
                                title="แก้ไข"
                                type="button"
                              >
                                <span className="material-symbols-outlined text-[18px]">
                                  edit
                                </span>
                              </button>
                              <button
                                onClick={() => handleDeleteContact(contact.id)}
                                className="p-1 text-on-surface-variant hover:text-error hover:bg-error-container/30 rounded-lg transition-colors"
                                title="ลบ"
                                type="button"
                              >
                                <span className="material-symbols-outlined text-[18px]">
                                  delete
                                </span>
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </main>
      </div>

      {/* Add / Edit Contact Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 bg-primary/40 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-surface-container-lowest rounded-2xl shadow-xl max-w-lg w-full p-space-lg border border-outline-variant/20 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between pb-space-sm border-b border-outline-variant/15">
              <h3 className="text-[18px] font-semibold text-on-surface">
                {editingContact ? "แก้ไขรายชื่อผู้ติดต่อ" : "เพิ่มผู้ติดต่อใหม่"}
              </h3>
              <button
                onClick={() => setIsModalOpen(false)}
                className="p-1 rounded-lg text-on-surface-variant hover:text-on-surface hover:bg-surface-container"
                type="button"
              >
                <span className="material-symbols-outlined text-[20px]">
                  close
                </span>
              </button>
            </div>

            <form onSubmit={handleSaveContact} className="flex flex-col gap-space-sm mt-space-md">
              <div className="flex flex-col gap-1">
                <label className="text-[11px] font-semibold uppercase text-on-surface-variant">
                  ชื่อผู้ติดต่อ *
                </label>
                <input
                  required
                  value={formName}
                  onChange={(e) => setFormName(e.target.value)}
                  placeholder="เช่น ชญานินทร์ มงคลสุข"
                  className="w-full px-3 py-2 bg-surface-container-low border border-outline-variant/20 rounded-xl text-[13px] text-on-surface focus:outline-none focus:ring-2 focus:ring-secondary"
                  type="text"
                />
              </div>

              <div className="flex flex-col gap-1">
                <label className="text-[11px] font-semibold uppercase text-on-surface-variant">
                  บริษัทหรือองค์กร
                </label>
                <input
                  value={formCompany}
                  onChange={(e) => setFormCompany(e.target.value)}
                  placeholder="เช่น Siam Retail Tech"
                  className="w-full px-3 py-2 bg-surface-container-low border border-outline-variant/20 rounded-xl text-[13px] text-on-surface focus:outline-none focus:ring-2 focus:ring-secondary"
                  type="text"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-space-sm">
                <div className="flex flex-col gap-1">
                  <label className="text-[11px] font-semibold uppercase text-on-surface-variant">
                    อีเมล
                  </label>
                  <input
                    value={formEmail}
                    onChange={(e) => setFormEmail(e.target.value)}
                    placeholder="email@company.com"
                    className="w-full px-3 py-2 bg-surface-container-low border border-outline-variant/20 rounded-xl text-[13px] text-on-surface focus:outline-none focus:ring-2 focus:ring-secondary"
                    type="email"
                  />
                </div>
                <div className="flex flex-col gap-1">
                  <label className="text-[11px] font-semibold uppercase text-on-surface-variant">
                    เบอร์โทรศัพท์
                  </label>
                  <input
                    value={formPhone}
                    onChange={(e) => setFormPhone(e.target.value)}
                    placeholder="081-xxx-xxxx"
                    className="w-full px-3 py-2 bg-surface-container-low border border-outline-variant/20 rounded-xl text-[13px] text-on-surface focus:outline-none focus:ring-2 focus:ring-secondary"
                    type="tel"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-space-sm">
                <div className="flex flex-col gap-1">
                  <label className="text-[11px] font-semibold uppercase text-on-surface-variant">
                    ช่องทางติดต่อ
                  </label>
                  <select
                    value={formChannel}
                    onChange={(e) => setFormChannel(e.target.value)}
                    className="w-full px-3 py-2 bg-surface-container-low border border-outline-variant/20 rounded-xl text-[13px] text-on-surface focus:outline-none focus:ring-2 focus:ring-secondary"
                  >
                    <option value="LINE Official">LINE Official</option>
                    <option value="โทรศัพท์">โทรศัพท์</option>
                    <option value="อีเมล">อีเมล</option>
                    <option value="นัดพบ">นัดพบ</option>
                  </select>
                </div>
                <div className="flex flex-col gap-1">
                  <label className="text-[11px] font-semibold uppercase text-on-surface-variant">
                    สถานะ
                  </label>
                  <select
                    value={formStatus}
                    onChange={(e) => setFormStatus(e.target.value as ContactStatus)}
                    className="w-full px-3 py-2 bg-surface-container-low border border-outline-variant/20 rounded-xl text-[13px] text-on-surface focus:outline-none focus:ring-2 focus:ring-secondary"
                  >
                    <option value="รายการใหม่">รายการใหม่</option>
                    <option value="กำลังคุย">กำลังคุย</option>
                    <option value="ปิดงาน">ปิดงาน</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-space-sm">
                <div className="flex flex-col gap-1">
                  <label className="text-[11px] font-semibold uppercase text-on-surface-variant">
                    สิ่งที่สนใจ
                  </label>
                  <input
                    value={formInterests}
                    onChange={(e) => setFormInterests(e.target.value)}
                    placeholder="เช่น ERP, POS, Cloud"
                    className="w-full px-3 py-2 bg-surface-container-low border border-outline-variant/20 rounded-xl text-[13px] text-on-surface focus:outline-none focus:ring-2 focus:ring-secondary"
                    type="text"
                  />
                </div>
                <div className="flex flex-col gap-1">
                  <label className="text-[11px] font-semibold uppercase text-on-surface-variant">
                    วันที่ต้อง Follow-up
                  </label>
                  <input
                    value={formFollowUpDate}
                    onChange={(e) => setFormFollowUpDate(e.target.value)}
                    className="w-full px-3 py-2 bg-surface-container-low border border-outline-variant/20 rounded-xl text-[13px] text-on-surface focus:outline-none focus:ring-2 focus:ring-secondary"
                    type="date"
                  />
                </div>
              </div>

              <div className="flex flex-col gap-1">
                <label className="text-[11px] font-semibold uppercase text-on-surface-variant">
                  หมายเหตุ
                </label>
                <textarea
                  value={formNote}
                  onChange={(e) => setFormNote(e.target.value)}
                  placeholder="รายละเอียดเพิ่มเติม หรือสิ่งที่ต้องทำต่อไป..."
                  rows={2}
                  className="w-full px-3 py-2 bg-surface-container-low border border-outline-variant/20 rounded-xl text-[13px] text-on-surface focus:outline-none focus:ring-2 focus:ring-secondary resize-none"
                />
              </div>

              <div className="flex items-center justify-end gap-space-sm pt-space-sm border-t border-outline-variant/15 mt-space-xs">
                <button
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2 rounded-xl text-[13px] font-medium text-on-surface-variant hover:bg-surface-container transition-colors"
                  type="button"
                >
                  ยกเลิก
                </button>
                <button
                  disabled={isSubmitting}
                  className="px-4 py-2 bg-secondary text-on-secondary rounded-xl text-[13px] font-semibold hover:bg-secondary-container transition-colors shadow-sm flex items-center gap-1.5 disabled:opacity-60"
                  type="submit"
                >
                  {isSubmitting && (
                    <span className="w-3.5 h-3.5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  )}
                  <span>{editingContact ? "บันทึกการแก้ไข" : "เพิ่มผู้ติดต่อ"}</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
