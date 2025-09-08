"use server";

import prisma from "@/lib/prisma";
import { startOfMonth, endOfMonth } from "date-fns";

export async function getAttendanceByUserForMonth(userId: string) {
  const start = startOfMonth(new Date());
  const end = endOfMonth(new Date());

  console.log("userId passed:", userId);
  console.log("start date:", start);
  console.log("end date:", end);

  const records = await prisma.attendance.findMany({
    where: {
      userId,
      date: {
        gte: start,
        lte: end,
      },
    },
    orderBy: {
      date: "asc",
    },
  });

  console.log("server records", records);
  console.log("Total records fetched:", records.length);

  if (records.length > 0) {
    console.log("First record status:", records[0].status);
    console.log("First record date:", records[0].date);
  }

  return records;
}
