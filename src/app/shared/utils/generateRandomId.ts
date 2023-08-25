export function generateRandomId() {
  const timestamp = new Date().getTime().toString(16); // Marca de tiempo en hexadecimal
  const randomPart = Math.random().toString(16).slice(2, 10); // Número aleatorio en hexadecimal
  return timestamp + randomPart;
}