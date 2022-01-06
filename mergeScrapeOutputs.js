// Merge a series of files by appending them to each other

// const fs = require('fs-extra');
const input = require('./output/cryptofees_scrape_03012022')

console.log(input)

fs.appendFile( '/output/cryptofees_scrape_03012022', 'data appended', function(err) {
    if (err) throw err;
    console.log('data saved')
} )

await fs.appendFile( './output/cryptofees_scrape_03012022', 'data appended', function(err) {
    if (err) throw err;
    console.log('data saved')
} )