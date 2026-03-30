export default function isValidMacAddress(rawInput: string) {
  const MacRegex = new RegExp(String.raw`\b(?:(?:[a-f\d]{2})(?:[:\-]|)){6}\b`);
  return MacRegex.test(rawInput.toLowerCase());
}
