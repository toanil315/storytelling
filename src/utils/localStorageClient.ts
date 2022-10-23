export const localStorageClient = {
  readValue: (key: string) => {
    const item = window.localStorage.getItem(key);
    return item ? parseJSON(item) : undefined;
  },

  setValue: (key: string, value: any) => {
    // Prevent build error "window is undefined" but keeps working
    window.localStorage.setItem(key, JSON.stringify(value));
  },

  removeValue: (key: string) => {
    // Prevent build error "window is undefined" but keeps working
    window.localStorage.removeItem(key);
  },
};

// A wrapper for "JSON.parse()"" to support "undefined" value
function parseJSON<T>(value: string | null): T | undefined {
  try {
    return value === "undefined" ? undefined : JSON.parse(value ?? "");
  } catch {
    console.log("parsing error on", { value });
    return undefined;
  }
}
