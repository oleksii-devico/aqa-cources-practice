function testReassignment(){
    console.log('I am the function!')
}
testReassignment();
testReassignment = 2 //checking that function could be reassigned
console.log(testReassignment) //output '2'

const logHelloWorldWithAdjective = (adj) => {
    console.log(`Hello ${adj} World!`)
}
logHelloWorldWithAdjective('JS')

/*logHelloWorldWithAdjective = 2 //expected output is TypeError since we declaring function with const keyword
console.log(logHelloWorldWithAdjective)*/

logHelloWorldWithAdjective('homo sapiens')
