const kaifarikCreator = (name, color, age, isGay) => {
    return {
        name,
        color,
        age,
        isGay
    }
}
let kaifarikisNames = ['Pupa', 'Lupa', 'Penguin']
let availableColors = ['Red', 'Blue', 'Green']
let kaifarikisArr = []

for (let i = 0; i < kaifarikisNames.length; i++) {
    for (let j = 0; j < availableColors.length; j++) {
        let kaifarikisObjTemp = kaifarikCreator(kaifarikisNames[i], availableColors[j], Math.floor(Math.random() * 30), Math.random() < 0.5)
        //console.log(kaifarikisObjTemp)
        kaifarikisArr.push(kaifarikisObjTemp)
    }
}
kaifarikisArr.forEach(element => {
    console.log(`
    Kaifarik ${element.name} is ${element.age} years old, ${element.color}, and if you ask if he's gay, that's totally ${element.isGay}
    `)
});
//comment here