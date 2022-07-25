export const sign_up_page = {
  firstName_field: "#firstName",
  lastName_field: "#lastName",
  username_field: "#username",
  password_field: "#password",
  confirmPassword_field: "#confirmPassword",
  firstName_validation_message: "#firstName-helper-text",
  lastName_validation_message: "#lastName-helper-text",
  username_validation_message: "#username-helper-text",
  password_validation_message: "#password-helper-text",
  confirmPassword_validation_message: "#confirmPassword-helper-text",
  signUp_button: '[data-test="signup-submit"]',
  generateUsername() {
    const names = [
      "Alex",
      "Viktor",
      "Ivan",
      "Ostap",
      "Igor",
      "Michael",
      "nagibator2007",
    ];
    const randomNum = Math.floor(Math.random() * 1000);
    const pickedNameIndex = Math.floor(Math.random() * names.length);
    return `${names[pickedNameIndex]}${randomNum}`;
  },
};
