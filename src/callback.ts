export function timer(callback: (str: string) => void) {
  setTimeout(() => {
    callback("success");
  }, 1000);
}
