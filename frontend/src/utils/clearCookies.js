// clearCookies.js
const clearCookies = () => {
  // Get all cookies
  const cookies = document.cookie.split(";");

  // Iterate through all cookies and clear them
  for (let cookie of cookies) {
    const eqPos = cookie.indexOf("=");
    const name = eqPos > -1 ? cookie.substr(0, eqPos).trim() : cookie.trim();
    document.cookie = `${name}=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT;`;
  }
};

export default clearCookies;
