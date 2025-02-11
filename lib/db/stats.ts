import { startOfMonth, subMonths } from "date-fns";
import { supabase } from "../supabase";
import { TABLE_NAME } from "./students";

export interface StudentStats {
  totalStudents: number;
  activeStudents: number;
  currentMonthStudents: number;
  previousMonthStudents: number;
  studentGrowth: number;
}

export async function getStudentStats(): Promise<StudentStats> {
  try {
    const now = new Date();
    const startOfCurrentMonth = startOfMonth(now).toISOString();
    const startOfPreviousMonth = startOfMonth(subMonths(now, 1)).toISOString();

    // Get total students count (not deleted)
    const totalStudentsQuery = await supabase
      .from(TABLE_NAME)
      .select('*', { count: 'exact', head: true })

    // Get current month new students (not deleted)
    const currentMonthQuery = await supabase
      .from(TABLE_NAME)
      .select('*', { count: 'exact', head: true })
      .gte('created_at', startOfCurrentMonth);

    // Get previous month new students (not deleted)
    const previousMonthQuery = await supabase
      .from(TABLE_NAME)
      .select('*', { count: 'exact', head: true })
      .gte('created_at', startOfPreviousMonth)
      .lt('created_at', startOfCurrentMonth);

    // Get active students (not deleted and status active)
    const activeStudentsQuery = await supabase
      .from(TABLE_NAME)
      .select('*', { count: 'exact', head: true })
      .eq('status', 'active');

    // Log queries for debuggings
    console.log('Queries results:', {
      total: totalStudentsQuery,
      current: currentMonthQuery,
      previous: previousMonthQuery,
      active: activeStudentsQuery
    });

    // Check for errors in any query
    if (totalStudentsQuery.error) throw totalStudentsQuery.error;
    if (currentMonthQuery.error) throw currentMonthQuery.error;
    if (previousMonthQuery.error) throw previousMonthQuery.error;
    if (activeStudentsQuery.error) throw activeStudentsQuery.error;

    const totalStudents = totalStudentsQuery.count ?? 0;
    const currentMonthStudents = currentMonthQuery.count ?? 0;
    const previousMonthStudents = previousMonthQuery.count ?? 0;
    const activeStudents = activeStudentsQuery.count ?? 0;

    // Calculate percentage changes
    const studentGrowth = previousMonthStudents === 0 
      ? 100 
      : ((currentMonthStudents - previousMonthStudents) / previousMonthStudents) * 100;

    return {
      totalStudents,
      activeStudents,
      currentMonthStudents,
      previousMonthStudents,
      studentGrowth: Math.round(studentGrowth * 100) / 100,
    };
  } catch (error) {
    console.error('Error in getStudentStats:', error);
    throw new Error('Error fetching student statistics');
  }
} 