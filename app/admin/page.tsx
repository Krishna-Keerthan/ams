import { AppSidebar } from "@/components/AppSidebar"
import React from "react"
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"

export default function Dashboard() {
  // For now hardcoding, later you can fetch from DB
  const totalPresent = 45
  const totalAbsent = 12

  return (
    <div className="flex w-full">

      {/* Main content */}
      <main className="flex-1 p-6 bg-gray-50 min-h-screen">
        <h1 className="text-2xl font-bold mb-6">Welcome Admin</h1>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Present Box */}
          <Card className="border-l-4 border-green-500 shadow-sm">
            <CardHeader>
              <CardTitle>Total Present Today</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-3xl font-semibold text-green-600">
                {totalPresent}
              </p>
            </CardContent>
          </Card>

          {/* Absent Box */}
          <Card className="border-l-4 border-red-500 shadow-sm">
            <CardHeader>
              <CardTitle>Total Absent Today</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-3xl font-semibold text-red-600">
                {totalAbsent}
              </p>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  )
}


