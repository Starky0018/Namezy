const axios = require('axios');

// Example with domainsdb.info API
async function checkDomainAvailability(name) {
  const domain = `${name.replace(/[^a-zA-Z0-9]/g, '').toLowerCase()}.com`;
  const res = await axios.get(`https://api.domainsdb.info/v1/domains/search?domain=${domain}&zone=com`);
  return !res.data.domains || res.data.domains.length === 0;
}

module.exports = { checkDomainAvailability };