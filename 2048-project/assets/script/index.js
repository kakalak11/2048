function gameplay(array, reverse) {
    if (reverse) array = array.reverse();
    console.log(array);
    slide(array);
    console.log(array);
    combine(array);
    console.log(array);
    slide(array);
    console.log(array);

    function slide(array) {
        for (let i = 0; i < array.length; i++) {
            if (!array[i]) continue;
            if (array[i + 1] === undefined) break;
            if (!array[i + 1]) {
                array[i + 1] = array[i];
                array[i] = 0;
            }
        }
    }

    function combine(array) {
        for (let i = 0; i < array.length; i++) {
            if (!array[i]) continue;
            if (array[i + 1] === undefined) break;
            if (array[i + 1] === array[i]) {
                array[i + 1] *= 2;
                array[i] = 0
            }
        }
    }
    if (reverse) return array.reverse();
    return array;

}

let array = [2, 2, 0, 0];

// gameplay([2, 2, 2, 2]);
// gameplay(gameplay([2, 2, 2, 2]));

// gameplay([0, 0, 2, 2], true);
console.log(gameplay([0, 0, 2, 2], true));