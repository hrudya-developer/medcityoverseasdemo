/**
 * Join class names and collapse whitespace so SSR and client hydration match.
 */
export function cn(...inputs) {
  return inputs
    .flatMap((value) => {
      if (value == null || value === false) {
        return [];
      }

      return String(value).split(/\s+/);
    })
    .filter(Boolean)
    .join(" ");
}

export default cn;
