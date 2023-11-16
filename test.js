const formData = new FormData();
formData.append('key', '1000101');
formData.append('username', 'test123124124');
formData.append('password', 'test');
const data = await fetch('http://192.168.127.66:5000/createAccount', {
  method: 'POST',
  body: formData,
});

console.log(data);
