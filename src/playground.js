function testReassignment() {
    console.log('I am the function!')
}
testReassignment();
console.log(testReassignment)
testReassignment = 2 //checking that function could be reassigned
console.log(`I was a function before, but now I'm '${testReassignment}'`)

const logHelloWorldWithAdjective = (adj) => {
    console.log(`Hello ${adj} World!`)
}
logHelloWorldWithAdjective('JS')

/*logHelloWorldWithAdjective = 2 //expected output is TypeError since we declaring function with const keyword
console.log(logHelloWorldWithAdjective)*/

logHelloWorldWithAdjective('homo sapiens')


const randomString = (length) => {
    let result = ''
    let cymbols = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
    let lettersLength = cymbols.length

    for (let i = 0; i < length; i++) {
        result += cymbols.charAt(Math.floor(Math.random() * lettersLength))
    }
    return result
}
let randomStringResult = randomString(5)
console.log(randomStringResult)
