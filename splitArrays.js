// Split the array positions by the comma in the string
let data = ["A123,G,2323232", null, "F345,G,345667", "T677,G,-34343", "G454,G,4343", ""],

result = data
    .filter(Boolean)
    .map(s => {
        let [UserId, Type, Values] = s.match(/[^,]+/g);
        return { UserId, Type, Values };
});                
console.log(result);