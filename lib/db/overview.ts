import { startOfMonth, subMonths, eachMonthOfInterval, format } from "date-fns";
import { es } from "date-fns/locale";
import { supabase } from "../supabase";
import { TABLE_NAME } from "./students";

export interface MonthlyStudentCount {
  month: string;
  count: number;
}

export async function getMonthlyStudentCounts(career: string): Promise<MonthlyStudentCount[]> {
  const endDate = new Date();
  const startDate = subMonths(endDate, 11); // Get data for the last 12 months
  
  // Transform career ID from hyphen to underscore
  const formattedCareer = career.replace(/-/g, '_');

  // Get all months in the range
  const months = eachMonthOfInterval({ start: startDate, end: endDate });

  // Initialize the monthly data with all months and zero counts
  const initialMonthlyData = months.reduce((acc: { [key: string]: number }, date) => {
    const monthKey = format(date, "MMM yy", { locale: es });
    acc[monthKey] = 0;
    return acc;
  }, {});

  // Fetch data from Supabase
  const { data, error } = await supabase
    .from(TABLE_NAME)
    .select('created_at')
    .eq('study_branch', formattedCareer)
    .gte('created_at', startDate.toISOString())
    .lte('created_at', endDate.toISOString())
    .order('created_at', { ascending: true });

  if (error) {
    console.error('Error fetching monthly student counts:', error);
    return Object.entries(initialMonthlyData).map(([month, count]) => ({
      month,
      count,
    }));
  }

  // Update counts for months with data
  const monthlyData = data.reduce((acc: { [key: string]: number }, student) => {
    const month = format(new Date(student.created_at), "MMM yy", { locale: es });
    acc[month] = (acc[month] || 0) + 1;
    return acc;
  }, initialMonthlyData);

  // Convert to array format and ensure correct order
  return months.map(date => ({
    month: format(date, "MMM yy", { locale: es }),
    count: monthlyData[format(date, "MMM yy", { locale: es })] || 0,
  }));
} 