/*https://www.freecodecamp.org/learn/javascript-algorithms-and-data-structures/intermediate-algorithm-scripting/wherefore-art-thou
Intermediate Algorithm Scripting: Wherefore art thou
Make a function that looks through an array of objects (first argument) and returns an array of all objects that have matching name and value pairs (second argument). 
Each name and value pair of the source object has to be present in the object from the collection if it is to be included in the returned array.

For example, if the first argument is [{ first: "Romeo", last: "Montague" }, { first: "Mercutio", last: null }, { first: "Tybalt", last: "Capulet" }], 
and the second argument is { last: "Capulet" }, then you must return the third object from the array (the first argument), because it contains the name and its value, that was passed on as the second argument.*/
/*张磊的解法比答案好理解一点。
1.用forEach做第一层循环比两层循环要好写 
2. 判断条件不能是相等&&返回，会导致漏掉source后面的 
3.object-source没有length，得用srcKeys是array的length
4.注意arr.push放的地方
*/
function whatIsInAName(collection, source) {
  // What's in a name?
  // Only change code below this line
  var arr = [];
  var srcKeys = Object.keys(source);
  
  collection.forEach(

    function(item) { 
      for (var i = 0; i < srcKeys.length; i++){  
        if (!item.hasOwnProperty(srcKeys[i])){
          return;
        }
        if(item[srcKeys[i]] !== source[srcKeys[i]]){
          return; 
        }
      }
      arr.push(item);
   }
  
  );
  
  return arr;
}
  // Only change code above this line


whatIsInAName([{ "apple": 1, "bat": 2 }, { "bat": 2 }, { "apple": 1, "bat": 2, "cookie": 2 }], { "apple": 1, "bat": 2 });
