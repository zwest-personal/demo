/**
 * Notes for below:
 * Everything after this comment block I generated in IntelliJ
 * prior to test. I used one of the other tests to
 * prep a template to work in, including testing.
 * I didn't want to include any actual unit test libraries in the process so it stick to built(ish) ins.
 *
 * During test I mostly worked here and copied over the solution I was working on in pieces so
 * that progress was more visible.
 *
 * I do comment pretty heavily but not necessarily *this* heavily, but given the nature of the test
 * and the lack of real time visibility into what I was doing I wanted everything to be clear.
 *
 * Comment formatting is a bit more GoDoc than JSDoc, though when working in a proper TS or JS env
 * I do stick to JSDoc.  Even if I don't necessarily *like* a convention more than another, I do stick
 * to individual language best practices, especially since JSDoc isn't going to understand WTF my notes
 * mean if I did another format.
 *
 * I'm including the final solution function, unit tests, etc for reference.  I tried to balance doing
 * the task the way that suits me best (in my IDE, with my setup) over what is actually most auditable
 * (doing it in Codility's web editor) just for the sake of the realities of widespread LLM use in these sorts
 * of things.
 */
const assert = require('node:assert/strict');

// Test Cases
const tests = [
    {
        name: '',
        input: [],
        expects: 0
    }
];

// Solution code - param will change depending on what the actual codility test is
function solution(I) {
    return 1;
}

// Test Script - Run and test outputs
// The partialDeepStrictEqual won't work on Codility as it is (due to their Node version) but
// don't need this function in their editor anyways
(test = () => {
    for (let t of tests) {
        console.time(t.name);
        assert.partialDeepStrictEqual(solution(t.input), t.expects, 'Solution failed');
        console.timeEnd(t.name);
    }
})();