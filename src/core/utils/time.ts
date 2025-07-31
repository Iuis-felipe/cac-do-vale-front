import { TimeSlot } from "../models";

export const generateTimeSlots = (
  start: string = "08:00",    
  end: string = "18:00",      
  unavailableHours: string[] = [], 
  interval: string = "12:00",      
  intervalThreshold: string = "01:00"
): TimeSlot[] => {
  
  const slots: TimeSlot[] = [];
  
  const timeToMinutes = (time: string) => {
    const [hours, minutes] = time.split(':').map(Number);
    return hours * 60 + minutes;
  };

  const startMinutes = timeToMinutes(start);
  const endMinutes = timeToMinutes(end);
  const intervalMinutes = timeToMinutes(interval);
  const thresholdMinutes = timeToMinutes(intervalThreshold);
  
  // Calculate interval boundaries
  const intervalStart = intervalMinutes;
  const intervalEnd = intervalMinutes + thresholdMinutes;
  
  const unavailableMinutes = unavailableHours.map(timeToMinutes);

  for (let minutes = startMinutes; minutes <= endMinutes; minutes += 5) {
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    const timeString = `${String(hours).padStart(2, '0')}:${String(mins).padStart(2, '0')}`;
    
    // Check if current time falls within the interval (plus threshold on both sides)
    const isInInterval = minutes >= intervalStart && minutes < intervalEnd;
    const isUnavailable = unavailableMinutes.includes(minutes);
    
    slots.push({
      time: timeString,
      available: !isInInterval && !isUnavailable
    });
  }

  return slots;
};

/**
 * Calculates the number of calendar days needed to achieve a specific number of weekdays
 * @param weekdaysNeeded - Number of weekdays (Monday-Friday) desired
 * @param startDate - Optional start date, defaults to tomorrow
 * @returns Number of calendar days needed
 */
export const calculateCalendarDaysForWeekdays = (weekdaysNeeded: number, startDate?: Date): number => {
  if (weekdaysNeeded <= 0) return 0;
  
  const start = startDate || new Date();
  start.setDate(start.getDate() + 1); // Start from tomorrow
  
  let weekdaysFound = 0;
  let calendarDays = 0;
  const currentDate = new Date(start);
  
  while (weekdaysFound < weekdaysNeeded) {
    calendarDays++;
    
    // Check if current day is a weekday (Monday = 1, Friday = 5)
    const dayOfWeek = currentDate.getDay();
    if (dayOfWeek >= 1 && dayOfWeek <= 5) {
      weekdaysFound++;
    }
    
    // Move to next day
    currentDate.setDate(currentDate.getDate() + 1);
  }
  
  return calendarDays;
};

/**
 * Generates a list of weekday dates (Monday-Friday only)
 * @param weekdaysNeeded - Number of weekdays to generate
 * @param startDate - Optional start date, defaults to tomorrow
 * @returns Array of date strings in YYYY-MM-DD format for weekdays only
 */
export const generateWeekdayDates = (weekdaysNeeded: number, startDate?: Date): string[] => {
  if (weekdaysNeeded <= 0) return [];
  
  const start = startDate || new Date();
  start.setDate(start.getDate() + 1); // Start from tomorrow
  
  const weekdayDates: string[] = [];
  const currentDate = new Date(start);
  
  while (weekdayDates.length < weekdaysNeeded) {
    // Check if current day is a weekday (Monday = 1, Friday = 5)
    const dayOfWeek = currentDate.getDay();
    if (dayOfWeek >= 1 && dayOfWeek <= 5) {
      // Format date as YYYY-MM-DD
      const year = currentDate.getFullYear();
      const month = String(currentDate.getMonth() + 1).padStart(2, '0');
      const day = String(currentDate.getDate()).padStart(2, '0');
      weekdayDates.push(`${year}-${month}-${day}`);
    }
    
    // Move to next day
    currentDate.setDate(currentDate.getDate() + 1);
  }
  
  return weekdayDates;
};
