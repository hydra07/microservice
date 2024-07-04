export function debounce<Params extends any[]>(
    func: (...args: Params) => void,
    delay: number
  ): (...args: Params) => void {
    let timeoutId: ReturnType<typeof setTimeout> | undefined;
  
    return (...args: Params) => {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(() => func(...args), delay);
    };
  }