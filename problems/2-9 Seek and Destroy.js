/* https://www.freecodecamp.org/learn/javascript-algorithms-and-data-structures/intermediate-algorithm-scripting/seek-and-destroy
Intermediate Algorithm Scripting: Seek and Destroy
You will be provided with an initial array (the first argument in the destroyer function), followed by one or more arguments. 
Remove all elements from the initial array that are of the same value as these arguments.
destroyer([1, 2, 3, 1, 2, 3], 2, 3) should return [1, 1].
destroyer([2, 3, 2, 3], 2, 3) should return []. */

function destroyer(arr) {
  var args = Array.prototype.slice.call(arguments);
  console.log(arr);
  console.log(args);
  for (var i = 0;i < arr.length;i++) {
    for (var j = 0; j < args.length; j++){
      if (arr[i] === args[j]) {
        delete arr[i];
      }
    }
  }
  console.log(arr)
  return arr.filter(Boolean);
}

destroyer([1, 2, 3, 1, 2, 3], 2, 3);

/*output
[ 1, 2, 3, 1, 2, 3 ]
[ [ 1, 2, 3, 1, 2, 3 ], 2, 3 ]
[ 1, , , 1, ,  ]
*/
