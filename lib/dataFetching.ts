export const mockFetchData = <T>(
  data: T, // Second parameter, the data to return
  props1?: any, // First optional parameter of any type
  delay: number = 1000 // Third optional parameter, delay in milliseconds (default to 1 second)
): Promise<T> => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (data) {
        resolve(data); // Resolve with the provided data after the delay
      } else {
        reject("No data provided!"); // Reject if no data is provided
      }
    }, delay);
  });
};
