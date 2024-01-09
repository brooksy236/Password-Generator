// Array of special characters to be included in password
var specialCharacters = [
  '@',
  '%',
  '+',
  '\\',
  '/',
  "'",
  '!',
  '#',
  '$',
  '^',
  '?',
  ':',
  ',',
  ')',
  '(',
  '}',
  '{',
  ']',
  '[',
  '~',
  '-',
  '_',
  '.'
];

// Array of numeric characters to be included in password
var numericCharacters = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'];

// Array of lowercase characters to be included in password
var lowerCasedCharacters = [
  'a',
  'b',
  'c',
  'd',
  'e',
  'f',
  'g',
  'h',
  'i',
  'j',
  'k',
  'l',
  'm',
  'n',
  'o',
  'p',
  'q',
  'r',
  's',
  't',
  'u',
  'v',
  'w',
  'x',
  'y',
  'z'
];

// Array of uppercase characters to be included in password
var upperCasedCharacters = [
  'A',
  'B',
  'C',
  'D',
  'E',
  'F',
  'G',
  'H',
  'I',
  'J',
  'K',
  'L',
  'M',
  'N',
  'O',
  'P',
  'Q',
  'R',
  'S',
  'T',
  'U',
  'V',
  'W',
  'X',
  'Y',
  'Z'
];

let passwordLength = 0; // these 3 variables are stored outside of the functions, globally, so that all the necessary functions can call them.
let finalChoices = [];
let randomPassword = "";

function getPasswordOptions() {
  passwordLength = prompt("How many characters long do you want your password to be? Enter a number between 8 & 128.");
  while (passwordLength < 8 || passwordLength > 128 || isNaN(passwordLength)) { // checks if the user has entered a number that is 8 or more, 128 or less and is actually a number, otherwise it asks for you to retry.
    passwordLength = prompt("How many characters long do you want your password to be? Enter a number between 8 & 128.");
  }

  let isValidChoice = false;
  do { // I used a do...while loop to make sure the user is prompted again if they didn't choose any options.
    confirm("Please choose at least ONE of the following:");

    const specialCharactersChoice = confirm("Would you like your password to have special characters?") ? specialCharacters  : []; //I used ternary operators at the end of the confirm to log whether the user chose an option or not, very neat and tidy.
    const numericCharactersChoice = confirm("Would you like it to have any numerical characters?") ? numericCharacters  : [];
    const lowerCasedCharactersChoice = confirm("Would you like it to have any lowercase characters?") ? lowerCasedCharacters  : [];
    const upperCasedCharactersChoice = confirm("Would you like it to have any uppercase characters?") ? upperCasedCharacters  : [];

    finalChoices = [
      ...specialCharactersChoice,     //
      ...numericCharactersChoice,     //I was using '+' to connect these together but then I changed some things and it stopped working so I found this, the spread operator, it is neater.
      ...lowerCasedCharactersChoice,  // 
      ...upperCasedCharactersChoice   //
    ];

    if (finalChoices.length > 0) { //this if statement checks that the length of the finalChoices array is greater than 0 
      isValidChoice = true; // and thus is true so stores the chosen arrays in the finalChoices array to be used in the generatePassword function.
    } else {
      alert("You need to choose at least one character type. Let's try again.");
    }
  } while (!isValidChoice);// else it loops back around if isValidChoice is false
}

function getRandom(arr) {
  const randomIndex = Math.floor(Math.random() * arr.length); // this generates the random characters from the arrays chosen
  return arr[randomIndex];
}

function generatePassword() {
  randomPassword = "";
  for (let i = 0; i < passwordLength; i++) { //this uses the password length chosen at the beginning...
    randomPassword += getRandom(finalChoices); //..and iterates through the finalChoices array the chosen amount of times to generate the password
  }
  return randomPassword;
}

function writePassword() {
  getPasswordOptions();
  var password = generatePassword();
  var passwordText = document.querySelector('#password');
  passwordText.value = password;
}

var generateBtn = document.querySelector('#generate');
generateBtn.addEventListener('click', writePassword);
