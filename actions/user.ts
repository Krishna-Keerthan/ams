"use server";

import prisma from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/next-auth-options"; // make sure this points to your auth config

type UserData = {
  name: string;
  email: string;
  password: string;
  role: "STUDENT" | "WORKER" | "ADMIN" | "SUPER_ADMIN";
  regNo?: string;
  phone?: string;
  dob?: Date;
  gender?: "MALE" | "FEMALE" | "OTHER";
  hostelBlock: "B1" | "B2" | "B3"; 
  roomNumber?: string;
};

export async function addUser(userData: UserData) {
  try {
    const session = await getServerSession(authOptions);

    if (!session || session.user.role !== "SUPER_ADMIN") {
      throw new Error("Unauthorized: Only SUPER_ADMIN can add users.");
    }

    const newUser = await prisma.user.create({
      data: {
        name: userData.name,
        email: userData.email,
        password: userData.password, // TODO: hash the password here
        role: userData.role,
        regNo: userData.regNo,
        phone: userData.phone,
        dob: userData.dob,
        gender: userData.gender ,
        hostelBlock: userData.hostelBlock,
        roomNumber: userData.roomNumber,
      },
    });

    return { success: true, user: newUser };
  } catch (error: any) {
    console.error("Error adding user:", error);
    return { success: false, error: error.message || "Failed to add user." };
  }
}
