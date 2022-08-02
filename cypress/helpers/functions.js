export const functions = {
  generateUsername() {
    const names = [
      "alex",
      "viktor",
      "ivan",
      "ostap",
      "igor",
      "michael",
      "nagibator2007",
    ];
    const randomNum = Math.floor(Math.random() * 1000);
    const pickedNameIndex = Math.floor(Math.random() * names.length);
    return `${names[pickedNameIndex]}${randomNum}`;
  },
};
