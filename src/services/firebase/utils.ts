
import { Timestamp } from 'firebase/firestore';

// Timestamp converters
export const fromTimestamp = (timestamp: Timestamp) => {
  return timestamp ? timestamp.toDate() : null;
};

export const toTimestamp = (date: Date) => {
  return date ? Timestamp.fromDate(date) : null;
};
