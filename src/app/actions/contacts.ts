"use server";

import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { headers } from "next/headers";
import { revalidatePath } from "next/cache";

async function getSessionUser() {
  const reqHeaders = await headers();
  const session = await auth.api.getSession({
    headers: reqHeaders,
  });

  if (!session?.user?.id) {
    throw new Error("Unauthorized: กรุณาเข้าสู่ระบบ");
  }

  return session.user;
}

// 1. ดึงรายการ Contact เฉพาะของ user ที่ล็อกอินอยู่
export async function getContacts() {
  const user = await getSessionUser();

  const contacts = await prisma.contact.findMany({
    where: {
      userId: user.id,
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  return contacts;
}

// 2. เพิ่ม Contact ให้ผูกกับ user ตัวเอง
export async function createContact(data: {
  name: string;
  company?: string;
  email?: string;
  phone?: string;
  channel?: string;
  interests?: string;
  status?: string;
  followUpDate?: string;
  note?: string;
}) {
  const user = await getSessionUser();

  const contact = await prisma.contact.create({
    data: {
      name: data.name,
      company: data.company || null,
      email: data.email || null,
      phone: data.phone || null,
      channel: data.channel || "LINE Official",
      interests: data.interests || null,
      status: data.status || "รายการใหม่",
      followUpDate: data.followUpDate || null,
      note: data.note || null,
      userId: user.id,
    },
  });

  revalidatePath("/contacts");
  revalidatePath("/dashboard");
  return contact;
}

// 3. แก้ไข Contact เฉพาะของตัวเอง (ตรวจสิทธิ์ userId)
export async function updateContact(
  id: string,
  data: {
    name?: string;
    company?: string;
    email?: string;
    phone?: string;
    channel?: string;
    interests?: string;
    status?: string;
    followUpDate?: string;
    note?: string;
  }
) {
  const user = await getSessionUser();

  // ตรวจสอบว่า Contact นี้เป็นของ user จริงหรือไม่
  const existing = await prisma.contact.findFirst({
    where: {
      id,
      userId: user.id,
    },
  });

  if (!existing) {
    throw new Error("ไม่พบข้อมูลผู้ติดต่อ หรือไม่มีสิทธิ์เข้าถึง");
  }

  const updated = await prisma.contact.update({
    where: {
      id,
    },
    data: {
      ...data,
    },
  });

  revalidatePath("/contacts");
  revalidatePath("/dashboard");
  return updated;
}

// 4. ลบ Contact เฉพาะของตัวเอง (ตรวจสิทธิ์ userId)
export async function deleteContact(id: string) {
  const user = await getSessionUser();

  // ตรวจสอบว่า Contact นี้เป็นของ user จริงหรือไม่
  const existing = await prisma.contact.findFirst({
    where: {
      id,
      userId: user.id,
    },
  });

  if (!existing) {
    throw new Error("ไม่พบข้อมูลผู้ติดต่อ หรือไม่มีสิทธิ์เข้าถึง");
  }

  await prisma.contact.delete({
    where: {
      id,
    },
  });

  revalidatePath("/contacts");
  revalidatePath("/dashboard");
  return { success: true };
}
