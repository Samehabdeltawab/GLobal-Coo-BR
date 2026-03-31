// helper/captcha.js
const Tesseract = require('tesseract.js');
const path = require('path');

async function solveCaptcha(imagePath) {
  try {
    const result = await Tesseract.recognize(
      imagePath,
      'eng',
      { logger: m => console.log(m) }
    );
    const captchaText = result.data.text.replace(/\D/g, ''); // remove non-digits
    return captchaText;
  } catch (error) {
    console.error('Error solving CAPTCHA:', error);
    return '';
  }
}

module.exports = { solveCaptcha };