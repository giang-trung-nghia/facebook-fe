import { isValid, parseISO } from "date-fns";

export const formatDateInRequest = (data: any): any => {
  if (!data || typeof data !== "object") return data;

  if (data instanceof Date) {
    return (
      `${data.getFullYear()}-${String(data.getMonth() + 1).padStart(2, "0")}-${String(data.getDate()).padStart(2, "0")}T` +
      `${String(data.getHours()).padStart(2, "0")}:${String(data.getMinutes()).padStart(2, "0")}:${String(data.getSeconds()).padStart(2, "0")}.` +
      `${String(data.getMilliseconds()).padStart(7, "0")}`
    );
  }

  if (Array.isArray(data)) {
    return data.map(formatDateInRequest);
  }

  return Object.fromEntries(
    Object.entries(data).map(([key, value]) => [key, formatDateInRequest(value)])
  );
};

export const parseDate = (value: any): any => {
  if (typeof value === "string" && /^\d{4}-\d{2}-\d{2}$/.test(value)) {
    const date = parseISO(value);
    return isValid(date) ? date : value;
  }
  return value;
};

export const traverseAndParseDates = (data: any): any => {
  if (Array.isArray(data)) {
    return data.map(traverseAndParseDates); // Process arrays
  } else if (data && typeof data === 'object') {
    const newData: Record<string, any> = {};
    for (const [key, value] of Object.entries(data)) {
      newData[key] = traverseAndParseDates(value); // Recursively process
    }
    return newData;
  }
  return parseDate(data); // Parse individual strings
};