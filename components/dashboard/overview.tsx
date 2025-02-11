"use client"

import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis } from "recharts"

const data = [
  {
    name: "Ene",
    total: 1500,
  },
  {
    name: "Feb",
    total: 2300,
  },
  {
    name: "Mar",
    total: 1800,
  },
  {
    name: "Abr",
    total: 3200,
  },
  {
    name: "May",
    total: 4800,
  },
  {
    name: "Jun",
    total: 2400,
  },
  {
    name: "Jul",
    total: 1400,
  },
  {
    name: "Ago",
    total: 4600,
  },
  {
    name: "Sep",
    total: 4000,
  },
  {
    name: "Oct",
    total: 3200,
  },
  {
    name: "Nov",
    total: 2800,
  },
  {
    name: "Dic",
    total: 2000,
  },
]

export function Overview() {
  return (
    <ResponsiveContainer width="100%" height={350}>
      <BarChart data={data}>
        <XAxis
          dataKey="name"
          stroke="#888888"
          fontSize={12}
          tickLine={false}
          axisLine={false}
        />
        <YAxis
          stroke="#888888"
          fontSize={12}
          tickLine={false}
          axisLine={false}
          tickFormatter={(value) => `${value}`}
        />
        <Bar
          dataKey="total"
          fill="currentColor"
          radius={[4, 4, 0, 0]}
          className="fill-primary"
        />
      </BarChart>
    </ResponsiveContainer>
  )
} 