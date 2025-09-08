"use client";

import { useEffect, useState } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Calendar } from "@/components/ui/calendar";
import { getAttendanceByUserForMonth } from "@/actions/attendance";
import { useSession } from "next-auth/react";

type AttendanceRecord = {
  date: string;
  status: "PRESENT" | "ABSENT" | "HALF_PRESENT";
};

export default function UserDashboard() {
  const { data: session } = useSession();
  const [records, setRecords] = useState<AttendanceRecord[]>([]);
  console.log(session?.user.id)
  console.log("records for student attendance", records)

  useEffect(() => {
    if (!session?.user.id) return;

    (async () => {
      if (!session.user.id) {
        return;
      }
      const res = await getAttendanceByUserForMonth(session.user?.id);
      setRecords(res);
      console.log("attendance response", res)
    })();
  }, [session?.user.id]);

  const presentDaysSet = new Set(
    records
      .filter((r) => r.status === "PRESENT" || r.status === "HALF_PRESENT")
      .map((r) => new Date(r.date).toDateString()) // ✅ full date as string
  );

  const absentDaysSet = new Set(
    records
      .filter((r) => r.status === "ABSENT")
      .map((r) => new Date(r.date).toDateString())
  );


  return (
    <div className="max-w-5xl mx-auto p-6 space-y-8">
      {/* ---- Stats ---- */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        <Card className="bg-green-50 border-green-200">
          <CardHeader>
            <CardTitle className="text-green-700">Present Days</CardTitle>
          </CardHeader>
          <CardContent className="text-3xl font-bold text-green-800">
            {presentDaysSet.size}
          </CardContent>
        </Card>

        <Card className="bg-red-50 border-red-200">
          <CardHeader>
            <CardTitle className="text-red-700">Absent Days</CardTitle>
          </CardHeader>
          <CardContent className="text-3xl font-bold text-red-800">
            {absentDaysSet.size}
          </CardContent>
        </Card>
      </div>

      {/* ---- Calendar ---- */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg font-semibold">
            Attendance Calendar
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Calendar
            className="rounded-md border"
            modifiers={{
              present: (day) => presentDaysSet.has(day.toDateString()),
              absent: (day) => absentDaysSet.has(day.toDateString()),
            }}
            modifiersClassNames={{
              present: "bg-green-500 text-white rounded-full",
              absent: "bg-red-500 text-white rounded-full",
            }}
          />

        </CardContent>
      </Card>
    </div>
  );
}
