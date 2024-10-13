export function urlify(text) {
  if (text) {
    const withLineBreaks = text?.replace(/\n/g, "<br>");
    return withLineBreaks;
  }
}
