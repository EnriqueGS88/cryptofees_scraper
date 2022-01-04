const scrapeTime = new Date().toLocaleString()
.replaceAll('/', '')
.replaceAll(':', '')
.replaceAll(', ', '_');

console.log(scrapeTime);

