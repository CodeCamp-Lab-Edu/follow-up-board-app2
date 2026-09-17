import { describe, it, expect, vi, beforeEach } from "vitest";

// Mock dependencies before importing the module under test
vi.mock("next/headers", () => ({
  headers: vi.fn(),
}));

vi.mock("next/cache", () => ({
  revalidatePath: vi.fn(),
}));

vi.mock("@/lib/auth", () => ({
  auth: {
    api: {
      getSession: vi.fn(),
    },
  },
}));

vi.mock("@/lib/prisma", () => ({
  prisma: {
    contact: {
      findMany: vi.fn(),
      findFirst: vi.fn(),
      create: vi.fn(),
      update: vi.fn(),
      delete: vi.fn(),
    },
  },
}));

import {
  getContacts,
  createContact,
  updateContact,
  deleteContact,
} from "@/app/actions/contacts";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

describe("Feature: Contacts Management", () => {
  const mockUser = {
    id: "user_123",
    email: "test@example.com",
    name: "Tester",
  };

  const mockContact = {
    id: "cnt_01",
    name: "ชญานินทร์ มงคลสุข",
    company: "Siam Retail Tech",
    email: "chayanin@siamretail.co.th",
    phone: "081-455-9821",
    channel: "LINE Official",
    interests: "ERP Integration, POS System",
    status: "กำลังคุย",
    followUpDate: "2025-05-24",
    note: "นัดส่งใบเสนอราคา Enterprise Package",
    userId: "user_123",
    createdAt: new Date(),
    updatedAt: new Date(),
  };

  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe("Authentication Guard", () => {
    it("should throw an unauthorized error if user is not logged in", async () => {
      vi.mocked(auth.api.getSession).mockResolvedValueOnce(null);

      await expect(getContacts()).rejects.toThrow("Unauthorized: กรุณาเข้าสู่ระบบ");
    });
  });

  describe("1. Get Contacts (ดูรายการ Contact)", () => {
    it("should return contacts belonging ONLY to the logged in user", async () => {
      vi.mocked(auth.api.getSession).mockResolvedValueOnce({
        session: { id: "sess_1", expiresAt: new Date(), token: "tok_1", createdAt: new Date(), updatedAt: new Date(), ipAddress: null, userAgent: null, userId: "user_123" },
        user: mockUser,
      });

      vi.mocked(prisma.contact.findMany).mockResolvedValueOnce([mockContact]);

      const result = await getContacts();

      expect(prisma.contact.findMany).toHaveBeenCalledWith({
        where: {
          userId: "user_123",
        },
        orderBy: {
          createdAt: "desc",
        },
      });
      expect(result).toHaveLength(1);
      expect(result[0].name).toBe("ชญานินทร์ มงคลสุข");
    });
  });

  describe("2. Create Contact (เพิ่ม Contact)", () => {
    it("should create a new contact scoped to the authenticated user", async () => {
      vi.mocked(auth.api.getSession).mockResolvedValueOnce({
        session: { id: "sess_1", expiresAt: new Date(), token: "tok_1", createdAt: new Date(), updatedAt: new Date(), ipAddress: null, userAgent: null, userId: "user_123" },
        user: mockUser,
      });

      const newContactInput = {
        name: "วสวัตติ์ อภิมหาพร",
        company: "Bangkok Logistics Hub",
        email: "wasawat@bkkgistics.co.th",
        phone: "02-890-3341",
        channel: "โทรศัพท์",
        interests: "Fleet Management",
        status: "รายการใหม่",
        followUpDate: "2025-05-22",
        note: "ขอเอกสารสัญญา NDA",
      };

      vi.mocked(prisma.contact.create).mockResolvedValueOnce({
        id: "cnt_02",
        ...newContactInput,
        userId: "user_123",
        createdAt: new Date(),
        updatedAt: new Date(),
      });

      const created = await createContact(newContactInput);

      expect(prisma.contact.create).toHaveBeenCalledWith({
        data: {
          name: newContactInput.name,
          company: newContactInput.company,
          email: newContactInput.email,
          phone: newContactInput.phone,
          channel: newContactInput.channel,
          interests: newContactInput.interests,
          status: newContactInput.status,
          followUpDate: newContactInput.followUpDate,
          note: newContactInput.note,
          userId: "user_123",
        },
      });
      expect(created.userId).toBe("user_123");
      expect(created.name).toBe("วสวัตติ์ อภิมหาพร");
    });
  });

  describe("3. Update Contact (แก้ไข Contact)", () => {
    it("should allow editing contact if it belongs to the current user", async () => {
      vi.mocked(auth.api.getSession).mockResolvedValueOnce({
        session: { id: "sess_1", expiresAt: new Date(), token: "tok_1", createdAt: new Date(), updatedAt: new Date(), ipAddress: null, userAgent: null, userId: "user_123" },
        user: mockUser,
      });

      vi.mocked(prisma.contact.findFirst).mockResolvedValueOnce(mockContact);
      vi.mocked(prisma.contact.update).mockResolvedValueOnce({
        ...mockContact,
        status: "ปิดงาน",
        note: "ปิดการขายเรียบร้อย",
      });

      const updated = await updateContact("cnt_01", {
        status: "ปิดงาน",
        note: "ปิดการขายเรียบร้อย",
      });

      expect(prisma.contact.findFirst).toHaveBeenCalledWith({
        where: {
          id: "cnt_01",
          userId: "user_123",
        },
      });
      expect(prisma.contact.update).toHaveBeenCalledWith({
        where: { id: "cnt_01" },
        data: {
          status: "ปิดงาน",
          note: "ปิดการขายเรียบร้อย",
        },
      });
      expect(updated.status).toBe("ปิดงาน");
    });

    it("should reject editing if contact belongs to another user", async () => {
      vi.mocked(auth.api.getSession).mockResolvedValueOnce({
        session: { id: "sess_1", expiresAt: new Date(), token: "tok_1", createdAt: new Date(), updatedAt: new Date(), ipAddress: null, userAgent: null, userId: "user_123" },
        user: mockUser,
      });

      // Not found for user_123
      vi.mocked(prisma.contact.findFirst).mockResolvedValueOnce(null);

      await expect(
        updateContact("cnt_other", {
          name: "Hacked Name",
        })
      ).rejects.toThrow("ไม่พบข้อมูลผู้ติดต่อ หรือไม่มีสิทธิ์เข้าถึง");
    });
  });

  describe("4. Delete Contact (ลบ Contact)", () => {
    it("should allow deleting contact if it belongs to the current user", async () => {
      vi.mocked(auth.api.getSession).mockResolvedValueOnce({
        session: { id: "sess_1", expiresAt: new Date(), token: "tok_1", createdAt: new Date(), updatedAt: new Date(), ipAddress: null, userAgent: null, userId: "user_123" },
        user: mockUser,
      });

      vi.mocked(prisma.contact.findFirst).mockResolvedValueOnce(mockContact);
      vi.mocked(prisma.contact.delete).mockResolvedValueOnce(mockContact);

      const res = await deleteContact("cnt_01");

      expect(prisma.contact.findFirst).toHaveBeenCalledWith({
        where: {
          id: "cnt_01",
          userId: "user_123",
        },
      });
      expect(prisma.contact.delete).toHaveBeenCalledWith({
        where: { id: "cnt_01" },
      });
      expect(res.success).toBe(true);
    });

    it("should reject deleting if contact belongs to another user", async () => {
      vi.mocked(auth.api.getSession).mockResolvedValueOnce({
        session: { id: "sess_1", expiresAt: new Date(), token: "tok_1", createdAt: new Date(), updatedAt: new Date(), ipAddress: null, userAgent: null, userId: "user_123" },
        user: mockUser,
      });

      vi.mocked(prisma.contact.findFirst).mockResolvedValueOnce(null);

      await expect(deleteContact("cnt_other")).rejects.toThrow(
        "ไม่พบข้อมูลผู้ติดต่อ หรือไม่มีสิทธิ์เข้าถึง"
      );
    });
  });
});
