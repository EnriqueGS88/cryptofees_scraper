const { convertArrayToCSV } = require('convert-array-to-csv');
const converter = require('convert-array-to-csv');
const fs = require('fs-extra');

// Set headers and sample data for the output CSV
const header = ['scrapedURL', 'actualObject'];
const dataArrays = [
    [
        'https://www.ariba.com/solutions/solutions-overview/supplier-management/supplier-lifecycle-management',
        'Supplier Lifecycle Management'
    ],
    [
        'https://www.ariba.com/ariba-network',       
        'Ariba Network – Where Companies Connect to Get Business Done'
  ],
  [
      'https://www.ariba.com/solutions/solutions-overview/strategic-sourcing/sourcing-solutions',   
      'Strategic Sourcing Solutions and Software'  
    ]
]

// Convert sample data using the headers and separator below
const csvFromArrayOfArrays = convertArrayToCSV(dataArrays, {
    header,
  separator: ','
});

// Save this data into utf8 format and print it if all good
async function example(f) {
    try{
        await fs.outputFile(f, csvFromArrayOfArrays)
        const data = await fs.readFile(f, 'utf8')
        console.log(data)
    } catch (err) {
        console.error(err)
    }
    
}

// Get the current time to add it as suffix in the CSV file name
const scrapeTime = new Date().toLocaleString()
.replaceAll('/','')
.replaceAll(':','')
.replaceAll(', ','_');

// Name the CSV file
let file = `./output/scrape_${scrapeTime}.csv`;
example(file);

