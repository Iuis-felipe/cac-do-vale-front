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
