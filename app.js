const appObj = {
    data(){
        return {
            info:[],
            storedData:[]
        }
    },
    methods:{
        getInfo(event){//gets the data from the file
            if(event.target.files){
            const reader = new FileReader();
            reader.onload = e=>{
                const regexp = /[^a-z\s\d.,-]/ig;
                const text = e.target.result;
                
                const arr = text.replace(regexp,'').split('\n');
                
                this.info=arr.map(elem=>elem.split(',')).filter(row=>row.length>1);
                this.setData();
            }
            const [file] = event.target.files;
            reader.readAsBinaryString(file);           
            }
        },
        generateUsers(){
            createEmployeeList();
            downloadCSV();
        },
        setData(){//processes the data
            if(this.info[0].length === 4 && this.info[0][0]==="EmpID"){
            let arr = [];
            //I create an array of arrays where each one contains all pieces employees working on a single project
            this.info.filter(item=>this.info.indexOf(item)>0).forEach(item=>arr[item[1]]?arr[item[1]].push(item):arr[item[1]]=[item]);
            const data = [["Employee 1", "Employee 2", "Project", "Days Worked"]];

            arr.forEach(set=>
                set.forEach(datum=>{
                    const index = set.indexOf(datum);
                    set.filter(item=>set.indexOf(item)!==index && compareDates(datum[2],item[2]) && compareDates(item[3],datum[3]))
                    .forEach(item=>{
                        data.push([datum[0],item[0],item[1],workedTogeather(datum[2],datum[3],item[2],item[3])]);//Storing the data as arrays might not be the most radable solution but it works for now
                    })
                }
                    )
                )
            this.storedData = [...data.sort((a,b)=>b[3]-a[3])]; //sorting the data by descending order        
        }
        
    }
    }
};


const app = Vue.createApp(appObj);

app.mount("#app");