Return the provided string with the first letter of each word capitalized. Make sure the rest of the word is in lower case.
For the purpose of this exercise, you should also capitalize connecting words like "the" and "of".
------------------------------------------
function titleCase(str) {
  var str2 = str.split(" ");
  var result2 = "";
  for (var i = 0; i < str2.length; i++) {
    var result = "";
    for (var j = 0; j < str2[i].length; j++) {
      if (j == 0) {
        var cap = str2[i][j].toUpperCase();
      } else if(j > 0) {
        var cap = str2[i][j].toLowerCase();
      }
      result = result.concat(cap); 
    }
    if (i == 0){
      result2 = result2.concat(result);
    } else if(i > 0){
      result2 = result2.concat(" ",result);
    }
  }
  return result2;
}

titleCase("I'm a little tea pot");
-----------------------参考解法
https://www.freecodecamp.org/forum/t/freecodecamp-challenge-guide-title-case-a-sentence/16088
