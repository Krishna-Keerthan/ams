"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { format } from "date-fns"
import { addUser } from "@/actions/user"

export default function AddUserPage() {
    const [dob, setDob] = useState<Date | undefined>(undefined)
    const [role, setRole] = useState<string>("")
    const [gender, setGender] = useState<string>("")
    const [hostelBlock, setHostelBlock] = useState<string>("")

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        const form = e.target as HTMLFormElement
        const formData = new FormData(form)
        const data = {
            name: formData.get("name") as string,
            email: formData.get("email") as string,
            password: formData.get("password") as string,
            role: formData.get("role") as "STUDENT" | "WORKER" | "ADMIN" | "SUPER_ADMIN",
            regNo: formData.get("regNo") as string | null,
            phone: formData.get("phone") as string | null,
            dob: dob || null,
            gender: formData.get("gender") as "MALE" | "FEMALE" | "OTHER" | null,
            hostelBlock: formData.get("hostelBlock") as "B1" | "B2" | "B3",
            roomNumber: formData.get("roomNumber") as string | null,
        }   

        await addUser(data)
        form.reset()
        setDob(undefined)
        setRole("")
        setGender("")
        setHostelBlock("")
    }

    return (
        <div className="flex justify-center items-center min-h-screen bg-muted/30 p-6 w-full">
            <Card className="w-full max-w-2xl shadow-md">
                <CardHeader>
                    <CardTitle className="text-2xl font-bold">Add New User</CardTitle>
                </CardHeader>
                <CardContent>
                    <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {/* Name */}
                        <div>
                            <Label className="mb-2" htmlFor="name">Name</Label>
                            <Input id="name" name="name" placeholder="Enter full name" required />
                        </div>

                        {/* Email */}
                        <div>
                            <Label className="mb-2" htmlFor="email">Email</Label>
                            <Input id="email" name="email" type="email" placeholder="Enter email" required />
                        </div>

                        {/* Password */}
                        <div>
                            <Label className="mb-2" htmlFor="password">Password</Label>
                            <Input id="password" name="password" type="password" placeholder="Enter password" required />
                        </div>

                        {/* Role */}
                        <div>
                            <Label className="mb-2" htmlFor="role">Role</Label>
                            <Select value={role} onValueChange={setRole}>
                                <SelectTrigger className="w-full">
                                    <SelectValue placeholder="Select role" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="STUDENT">Student</SelectItem>
                                    <SelectItem value="WORKER">Worker</SelectItem>
                                    <SelectItem value="ADMIN">Admin</SelectItem>
                                    <SelectItem value="SUPER_ADMIN">Super Admin</SelectItem>
                                </SelectContent>
                            </Select>
                            <input type="hidden" name="role" value={role} />
                        </div>

                        {/* Reg No */}
                        <div>
                            <Label className="mb-2" htmlFor="regNo">Registration No</Label>
                            <Input id="regNo" name="regNo" placeholder="Optional" />
                        </div>

                        {/* Phone */}
                        <div>
                            <Label className="mb-2" htmlFor="phone">Phone</Label>
                            <Input id="phone" name="phone" type="tel" placeholder="Optional" />
                        </div>

                        {/* DOB */}
                        <div>
                            <Label className="mb-2">Date of Birth</Label>
                            <Popover>
                                <PopoverTrigger asChild>
                                    <Button
                                        variant="outline"
                                        className="w-full justify-start text-left font-normal"
                                    >
                                        {dob ? format(dob, "PPP") : "Pick a date"}
                                    </Button>
                                </PopoverTrigger>
                                <PopoverContent className="p-0" align="start">
                                    <Calendar
                                        mode="single"
                                        selected={dob}
                                        onSelect={setDob}
                                        initialFocus
                                    />
                                </PopoverContent>
                            </Popover>
                        </div>

                        {/* Gender */}
                        <div>
                            <Label className="mb-2" htmlFor="gender">Gender</Label>
                            <Select value={gender} onValueChange={setGender}>
                                <SelectTrigger className="w-full">
                                    <SelectValue placeholder="Select gender" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="MALE">Male</SelectItem>
                                    <SelectItem value="FEMALE">Female</SelectItem>
                                    <SelectItem value="OTHER">Other</SelectItem>
                                </SelectContent>
                            </Select>
                            <input type="hidden" name="gender" value={gender} />
                        </div>

                        {/* Hostel Block */}
                        <div>
                            <Label className="mb-2" htmlFor="hostelBlock">Hostel Block</Label>
                            <Select value={hostelBlock} onValueChange={setHostelBlock}>
                                <SelectTrigger className="w-full">
                                    <SelectValue placeholder="Select block" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="B1">Block B1</SelectItem>
                                    <SelectItem value="B2">Block B2</SelectItem>
                                    <SelectItem value="B3">Block B3</SelectItem>
                                </SelectContent>
                            </Select>
                            <input type="hidden" name="hostelBlock" value={hostelBlock} />
                        </div>

                        {/* Room Number */}
                        <div>
                            <Label className="mb-2" htmlFor="roomNumber">Room Number</Label>
                            <Input id="roomNumber" name="roomNumber" placeholder="Optional" />
                        </div>

                        {/* Submit */}
                        <div className="md:col-span-2 flex justify-end">
                            <Button type="submit" className="mt-4">
                                Add User
                            </Button>
                        </div>
                    </form>
                </CardContent>
            </Card>
        </div>
    )
}
