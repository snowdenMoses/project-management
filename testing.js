const test1 = "hello"
const test2 = "World"
const sampleArray = [test1, test2]
// console.log(sampleArray["test1"]);

function reduceString(string, requiredLength = 4){
    let finalString = ""
    let i = 0;
    while ( string.indexOf(string[i]) != -1 && string.indexOf(string[i]) < requiredLength ){
        finalString += string[i]
        i++
    }
    if(finalString.length < requiredLength){
        finalString = finalString.concat(" ...")
    }
    return finalString;
}

console.log(reduceString("Hello"))