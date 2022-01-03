const data = {
  characters: [
    { name: "Tommy Vercetti", location: "Vice City" },
    { name: "Carl Johnson", location: "Grove Street" },
    { name: "Niko Bellic", location: "Liberty City" },
  ],
};

const test = { date: '2022-01-01', protocol: 'MakerDAO', fee: '391062' }

// const data = '{"characters":[{"name":"Tommy Vercetti","location":"Vice City"},{"name":"Carl Johnson","location":"Grove Street"},{"name":"Niko Bellic","location":"Liberty City"}]}';

// const obj = JSON.parse(data);

// data["characters"].push({ name: "Ken Rosenberg", location: "Vice City" });

data['characters'].push(test);

// JSON.stringify(data);

console.log(data);

