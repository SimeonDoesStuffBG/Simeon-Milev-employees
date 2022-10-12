const header = ["EmpID", "ProjectID","DateFrom","DateTo"];
const data = [];
const dayInMiliseconds = 24 * 3600 * 1000;//milliseconds in a day should be self explanatory

function createEmployeeList(number=300,employees=100, projects=19,start=new Date(1999,6,21),end=new Date()){//create a random of employees working on projects
    for(let i =0; i<number; i++){
        const from = randomDate(start,end);//get a start date for working
        const to = random(1,25)<25?randomDate(new Date(from), end):null;//get an end date(has a 1 in 25 chance to be null) 

        const employee = {//create a new Employee
            EmpId:random(1,employees),//get random employee Id
            ProjectId:random(1,projects),//get random project Id
            DateFrom:from,
            DateTo:to
        }        
        data.push(employee);//add employee to data
    }
}

function downloadCSV(arrayHeader=header, arrayData=data, delimiter=',', fileName='file') {//exports data as a new csv file with
    let header = arrayHeader.join(delimiter) + '\n';
    let csv = header;
    arrayData.forEach( obj => {
        let row = [];
        for (key in obj) {
            if (obj.hasOwnProperty(key)) {
                row.push(obj[key]);
            }
        }
        csv += row.join(delimiter)+"\n";
    });

    let csvData = new Blob([csv], { type: 'text/csv' });  
    let csvUrl = URL.createObjectURL(csvData);

    let hiddenElement = document.createElement('a');
    hiddenElement.href = csvUrl;
    hiddenElement.target = '_blank';
    hiddenElement.download = fileName + '.csv';
    hiddenElement.click();
}

function random(min, max){//generates a random int between 2 values
    
    let helper = Math.max(min, max);
    min = Math.min(min,max);
    max = helper;

    return Math.round(min + Math.random() * (max-min));
}

function randomDate(start, end) {//gets arandom date between 2 dates
    const date = new Date(Math.round(start.getTime() + dayInMiliseconds + Math.random() * (end.getTime()-start.getTime())));//I put the date to be at least 1 day before the start and one after the end
    const text=`${date.getFullYear()}-${date.getMonth()<9?'0':''}${date.getMonth()+1}-${date.getDate()<10?'0':''}${date.getDate()}`;
    return text;
}

function compareDates(date1, date2){//compare 2 dates to see if the first date given is before the second
    time1 = isToday(date1)?new Date():new Date(date1).getTime();
    time2 = isToday(date2)?new Date():new Date(date2).getTime();

    return time1<=time2;
}

function workedTogeather(start1, end1, start2, end2){//takes 2 intervals and returns the amount of time they overlap in days(rounding up)
    if(compareDates(end1,start2)||compareDates(end2,start1)){return 0}//if the intervals don't overlap return 0;
    const totalStart = Math.max(new Date(start1).getTime(),new Date(start2).getTime());
    const totalEnd = Math.min(isToday(end1)?new Date():new Date(end1).getTime(), isToday(end2)?new Date():new Date(end2).getTime());

    return Math.ceil((totalEnd-totalStart)/dayInMiliseconds);
}

function isToday(date){//checks if a date is null or undefined assumed to be today.
    return !date || date===null;
}