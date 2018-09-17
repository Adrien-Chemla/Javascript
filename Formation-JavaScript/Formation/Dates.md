# Dates
let dateStart = new Date();
console.log(dateStart); //return today's date

## Specific date
let birthdayDate = newDate("June 21, 1986 12:00:00");
let newYearDate = newDate("2018-12-31T23:59:59");

## Days
/!\
console.log(dateStart.getDay()); //return weekly day from 0:Sunday ... to 6:Saturday

console.log(dateStart.getDate()); //return day of the month from 1 to 31
dateStart.setDate(21); //will set day to 21th day of the month

## Months
/!\
console.log(dateStart.getMonth()); //return month from 0 to 11
dateStart.setMonth(5); //will set month to July

## Year
console.log(dateStart.getFullYear()); //return year
dateStart.setFullYear(1986); //will set year to 1986

## Calculate
let nextYearDate = newYearDate;
nextYearDate.setDate(nextYearDate.getDate() + 1); //expected output "2019-01-01T23:59:59"
nextYearDate.setMonth(nextYearDate.getMonth() + 1); //expected output "2019-02-01T23:59:59"
nextYearDate.setFullYear(nextYearDate.getFullYear() - 1); //expected output "2018-02-01T23:59:59"

## Time
getTime(); return the number of milliseconds since 1st Jan 1970, 00:00:00.000 GMT
after that breaking point : positive number
before that breaking point : negative number

console.log(birthdayDate.getTime()); //return 519732000000 ms (519 billion of ms between 01 01 1970 and 21 06 1970)

Useful to calculate interval of time.
let oneDay = 1000*60*60*24;