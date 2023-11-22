/* eslint-disable */
import CryptoJS from "crypto-js";
const en = {
  key: '@hKe9@A1lKe9$Tz1kE@8HnG7',
  iv: '1234567890123456'
}
/**
 * aes加密解密
 * 加密encrypt
 * 解密decrypt
 */
function encrypt(data) {
  var key = CryptoJS.enc.Utf8.parse(en.key)
  var iv = CryptoJS.enc.Utf8.parse(en.iv)
  var encrypted = CryptoJS.AES.encrypt(data, key, {
    iv: iv,
    mode: CryptoJS.mode.CBC,
    padding: CryptoJS.pad.Pkcs7
  });
  return encrypted.toString()
}

function decrypt(data) {
  var key = CryptoJS.enc.Utf8.parse(en.key)
  var iv = CryptoJS.enc.Utf8.parse(en.iv)
  // var base64 = CryptoJS.enc.Base64.parse(data)
  // var src = CryptoJS.enc.Base64.stringify(base64)
  var decrypted = CryptoJS.AES.decrypt(data, key, {
    iv: iv,
    mode: CryptoJS.mode.CBC,
    padding: CryptoJS.pad.Pkcs7
  })
  return decrypted.toString(CryptoJS.enc.Utf8)
}

const endata = encrypt('http://proxy.hn885.com/m/')
console.log('encrypt ------ ', endata)

const dedata = decrypt(endata)
console.log('decrypt ------ ', dedata)

