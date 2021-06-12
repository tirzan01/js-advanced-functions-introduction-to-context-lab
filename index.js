// Your code here

function createEmployeeRecord (array){
    let obj = {}
    obj['firstName'] = array[0]
    obj['familyName'] = array[1]
    obj['title'] = array[2]
    obj['payPerHour'] = array[3]
    obj['timeInEvents'] = []
    obj['timeOutEvents'] = []
    return obj
}

function createEmployeeRecords (array){
    const newArray = []
    for (let i = 0; i < array.length; i++) {
        newArray.push(createEmployeeRecord(array[i]))
    }
    return newArray
}

function createTimeInEvent (employee, timeIn){
    const [d, h] = timeIn.split(' ')
    employee.timeInEvents.push({
        type: 'TimeIn',
        date: d,
        hour: parseInt(h)
    })
    return employee
}

function createTimeOutEvent (employee, timeOut){
    const [d, h] = timeOut.split(' ')
    employee.timeOutEvents.push(
        {
            type: 'TimeOut',
            date: d,
            hour: parseInt(h)
        }
    )
    return employee
}


function hoursWorkedOnDate(employee, date){
    let dateTimeIn = employee.timeInEvents.filter(e => e.date === date)
    let dateTimeOut = employee.timeOutEvents.filter(e => e.date === date)
    if(dateTimeIn.length !== 0){
        return (dateTimeOut[0].hour - dateTimeIn[0].hour) / 100
    }
    return 0
}

function wagesEarnedOnDate(employee, date){
    return hoursWorkedOnDate(employee, date) * employee.payPerHour
}

function allWagesFor(employee){
    let workedDate = employee.timeInEvents
    const salaryByDay = workedDate.map(h=>wagesEarnedOnDate(employee, h.date))
    return salaryByDay.reduce((acc, curr)=>acc+curr, 0)
}

function findEmployeeByFirstName (srcArray, employeeName){
    let matchName = srcArray.filter(employee=>employee.firstName === employeeName)
    if (matchName.lenght === 1){
        return matchName[0]
    }else if (matchName.lenght !== 0){
        return matchName[0]
    }
    return undefined
}

function calculatePayroll (employees){
    let weeklyWages = []
    for (const employee of employees) {
        let weeklySalary = allWagesFor(employee)
        weeklyWages.push(weeklySalary)
    }
    return weeklyWages.reduce((acc, curr)=>acc + curr, 0)
}