
export function useToast() {
  function toast({ title, description, variant } = {}) {
    const msg = [title, description].filter(Boolean).join(" — ");
    if (variant === "destructive") {
      console.error(msg);
    } else {
      console.log(msg);
    }
 
  }
  return { toast };
}
