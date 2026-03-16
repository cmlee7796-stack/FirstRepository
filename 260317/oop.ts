class Employee{

    
    constructor(
        private _empName : string, 
        private _age : number, 
        private _empJob : string){
    }


    get empName() : string {
        return this._empName;
    }
    get age() : number {
        return this._age;
    }
    get empJob() : string {
        return this._empJob;
    }

    set empName(empName : string){
        this._empName = empName;
    }
    set age(age : number){
        this._age = age;
    }
    set empJob(empJob : string){
        this._empJob = empJob;
    }


    printEmp() : void {
        console.log(this._empName + '의 나이는 ' + this._age + '이고, 직업은 ' + this._empJob + '입니다.');
    }

}

let employee1 = new Employee('lee', 20, 'developer');
employee1.empName = 'kim';
employee1.printEmp();