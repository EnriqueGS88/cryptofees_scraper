// List all dates between within a range period

let getDaysArray = function(start, end) {
    let arr=[];
    for(dt=new Date(start); dt<=end; dt.setDate(dt.getDate()+1)) {
        arr.push(new Date(dt));
    }
    return arr;
};

let daylist = getDaysArray(new Date("2018-05-01"), new Date("2018-05-10"));

let days = daylist.map( (v) => v.toISOString().slice(0,10));

console.log(days);
