
const getAverageNum = (numbersArr) => {
    let numbersSum = 0
    numbersArr.forEach(element => {
        numbersSum += element
    })
    return numbersSum / numbersArr.length
};
const numbers = [5,1,10,252,1]

console.log(getAverageNum(numbers))
