const { convertArrayToCSV } = require('convert-array-to-csv');
const converter = require('convert-array-to-csv');

// const header = ['number', 'first', 'last', 'handle'];
// const dataArrays = [
  //     [1, 'Mark', 'Otto', '@mdo'],
  //     [2, 'Jacob', 'Thornton', '@fat'],
  //     [3, 'Larry', 'the Bird', '@twitter'],
  // ];
  
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

const csvFromArrayOfArrays = convertArrayToCSV(dataArrays, {
  header,
  separator: ','
});

console.log(csvFromArrayOfArrays);




// **

// Use the following example when data is in JSON format

//**

// const dataObjects = [
//     {
//       number: 1,
//       first: 'Mark',
//       last: 'Otto',
//       handle: '@mdo',
//     },
//     {
//       number: 2,
//       first: 'Jacob',
//       last: 'Thornton',
//       handle: '@fat',
//     },
//     {
//       number: 3,
//       first: 'Larry',
//       last: 'the Bird',
//       handle: '@twitter',
//     },
//   ];


// const csvFromArrayOfObjects = convertArrayToCSV(dataObjects);
// console.log(csvFromArrayOfObjects);

