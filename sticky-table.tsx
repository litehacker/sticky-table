"use client"

import { useState } from "react"
import { Checkbox } from "@/components/ui/checkbox"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

// Sample data with many columns
const sampleData = [
  {
    id: 1,
    name: "John Doe",
    email: "john@example.com",
    phone: "+1-555-0101",
    department: "Engineering",
    position: "Senior Developer",
    salary: "$95,000",
    startDate: "2022-01-15",
    manager: "Sarah Wilson",
    location: "New York",
    skills: "React, Node.js",
    experience: "5 years",
    education: "BS Computer Science",
    certification: "AWS Certified",
    project: "E-commerce Platform",
    status: "Active",
    performance: "Excellent",
    bonus: "$5,000",
    vacation: "15 days",
    benefits: "Health, Dental",
  },
  {
    id: 2,
    name: "Jane Smith",
    email: "jane@example.com",
    phone: "+1-555-0102",
    department: "Marketing",
    position: "Marketing Manager",
    salary: "$85,000",
    startDate: "2021-03-20",
    manager: "Mike Johnson",
    location: "Los Angeles",
    skills: "SEO, Analytics",
    experience: "7 years",
    education: "MBA Marketing",
    certification: "Google Ads",
    project: "Brand Campaign",
    status: "Active",
    performance: "Good",
    bonus: "$3,000",
    vacation: "20 days",
    benefits: "Health, Vision",
  },
  {
    id: 3,
    name: "Bob Johnson",
    email: "bob@example.com",
    phone: "+1-555-0103",
    department: "Sales",
    position: "Sales Representative",
    salary: "$65,000",
    startDate: "2023-06-10",
    manager: "Lisa Brown",
    location: "Chicago",
    skills: "CRM, Negotiation",
    experience: "3 years",
    education: "BA Business",
    certification: "Salesforce",
    project: "Q4 Sales Drive",
    status: "Active",
    performance: "Good",
    bonus: "$2,500",
    vacation: "10 days",
    benefits: "Health",
  },
  {
    id: 4,
    name: "Alice Brown",
    email: "alice@example.com",
    phone: "+1-555-0104",
    department: "HR",
    position: "HR Specialist",
    salary: "$70,000",
    startDate: "2020-11-05",
    manager: "David Lee",
    location: "Austin",
    skills: "Recruitment, Training",
    experience: "6 years",
    education: "MS Psychology",
    certification: "SHRM-CP",
    project: "Onboarding Process",
    status: "Active",
    performance: "Excellent",
    bonus: "$4,000",
    vacation: "18 days",
    benefits: "Health, Dental, Vision",
  },
  {
    id: 5,
    name: "Charlie Wilson",
    email: "charlie@example.com",
    phone: "+1-555-0105",
    department: "Finance",
    position: "Financial Analyst",
    salary: "$75,000",
    startDate: "2022-09-12",
    manager: "Emma Davis",
    location: "Boston",
    skills: "Excel, SQL",
    experience: "4 years",
    education: "BS Finance",
    certification: "CFA Level 1",
    project: "Budget Planning",
    status: "Active",
    performance: "Good",
    bonus: "$3,500",
    vacation: "12 days",
    benefits: "Health, 401k",
  },
]

const columns = [
  { key: "id", label: "Employee ID", width: "120px" },
  { key: "name", label: "Full Name", width: "200px" },
  { key: "email", label: "Email Address", width: "280px" },
  { key: "phone", label: "Phone Number", width: "180px" },
  { key: "department", label: "Department", width: "160px" },
  { key: "position", label: "Job Position", width: "220px" },
  { key: "salary", label: "Annual Salary", width: "140px" },
  { key: "startDate", label: "Start Date", width: "150px" },
  { key: "manager", label: "Direct Manager", width: "200px" },
  { key: "location", label: "Office Location", width: "160px" },
  { key: "skills", label: "Technical Skills", width: "220px" },
  { key: "experience", label: "Years of Experience", width: "180px" },
  { key: "education", label: "Educational Background", width: "250px" },
  { key: "certification", label: "Professional Certifications", width: "220px" },
  { key: "project", label: "Current Project Assignment", width: "280px" },
  { key: "status", label: "Employment Status", width: "160px" },
  { key: "performance", label: "Performance Rating", width: "180px" },
  { key: "bonus", label: "Annual Bonus", width: "140px" },
  { key: "vacation", label: "Vacation Days Remaining", width: "200px" },
  { key: "benefits", label: "Benefits Package", width: "250px" },
]

export default function Component() {
  const [stickyColumns, setStickyColumns] = useState<string[]>(["id", "name"])

  const toggleStickyColumn = (columnKey: string) => {
    setStickyColumns((prev) =>
      prev.includes(columnKey) ? prev.filter((key) => key !== columnKey) : [...prev, columnKey],
    )
  }

  const getStickyStyle = (columnKey: string, index: number) => {
    if (!stickyColumns.includes(columnKey)) return {}

    const stickyIndex = stickyColumns.indexOf(columnKey)
    const leftOffset = stickyColumns.slice(0, stickyIndex).reduce((acc, key) => {
      const column = columns.find((col) => col.key === key)
      return acc + Number.parseInt(column?.width || "0px")
    }, 0)

    return {
      position: "sticky" as const,
      left: `${leftOffset}px`,
      zIndex: stickyColumns.includes(columnKey) ? 10 : 1,
      backgroundColor: "white",
      borderRight: "2px solid #e5e7eb",
    }
  }

  return (
    <div className="w-full max-w-6xl mx-auto space-y-4">
      <Card>
        <CardHeader>
          <CardTitle>Employee Data Table with Sticky Columns</CardTitle>
          <div className="space-y-2">
            <p className="text-sm text-muted-foreground">
              Check columns below to make them sticky while scrolling horizontally
            </p>
            <div className="flex flex-wrap gap-4">
              {columns.map((column) => (
                <div key={column.key} className="flex items-center space-x-2">
                  <Checkbox
                    id={column.key}
                    checked={stickyColumns.includes(column.key)}
                    onCheckedChange={() => toggleStickyColumn(column.key)}
                  />
                  <label
                    htmlFor={column.key}
                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                  >
                    {column.label}
                  </label>
                </div>
              ))}
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="border rounded-lg overflow-hidden">
            <div className="overflow-x-auto max-w-full">
              <div style={{ minWidth: "3800px" }}>
                {" "}
                {/* Force minimum width to ensure scrolling */}
                <table className="w-full">
                  <thead>
                    <tr className="border-b bg-muted/50">
                      {columns.map((column, index) => (
                        <th
                          key={column.key}
                          className="h-12 px-4 text-left align-middle font-medium text-muted-foreground whitespace-nowrap"
                          style={{
                            ...getStickyStyle(column.key, index),
                            width: column.width,
                            minWidth: column.width,
                          }}
                        >
                          {column.label}
                          {stickyColumns.includes(column.key) && (
                            <span className="ml-2 text-xs bg-blue-100 text-blue-800 px-1 rounded">Sticky</span>
                          )}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {sampleData.map((row, rowIndex) => (
                      <tr key={row.id} className="border-b hover:bg-muted/50">
                        {columns.map((column, colIndex) => (
                          <td
                            key={`${row.id}-${column.key}`}
                            className="p-4 align-middle whitespace-nowrap"
                            style={{
                              ...getStickyStyle(column.key, colIndex),
                              width: column.width,
                              minWidth: column.width,
                            }}
                          >
                            {row[column.key as keyof typeof row]}
                          </td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </CardContent>
        <div className="border-t bg-muted/30 px-6 py-3">
          <p className="text-sm text-muted-foreground text-center">
            Created by{" "}
            <a
              href="https://www.linkedin.com/in/litehacker/"
              target="_blank"
              rel="noopener noreferrer"
              className="font-medium text-blue-600 hover:text-blue-800 hover:underline"
            >
              Giorgi Gvimradze
            </a>
          </p>
        </div>
      </Card>
    </div>
  )
}
