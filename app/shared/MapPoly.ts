// /**
//  * Created by promie on 09-Jan-17.
//  */
// // Production steps of ECMA-262, Edition 6, 22.1.2.1
//     class ArrayConstructor{
//         private static toStr = Object.prototype.toString;
//         private static isCallable(fn) {
//             return typeof fn === 'function' || ArrayConstructor.toStr.call(fn) === '[object Function]';
//         };
//         private static toInteger (value) {
//             var number = Number(value);
//             if (isNaN(number)) { return 0; }
//             if (number === 0 || !isFinite(number)) { return number; }
//             return (number > 0 ? 1 : -1) * Math.floor(Math.abs(number));
//         };
//         private static maxSafeInteger = Math.pow(2, 53) - 1;

//         private static toLength (value) {
//             var len = ArrayConstructor.toInteger(value);
//             return Math.min(Math.max(len, 0), ArrayConstructor.maxSafeInteger);
//         };

//         // The length property of the from method is 1.
//         from(arrayLike, mapFn?, thisArg?) {
//             // 1. Let C be the this value.
//             var C = this;

//             // 2. Let items be ToObject(arrayLike).
//             var items = Object(arrayLike);

//             // 3. ReturnIfAbrupt(items).
//             if (arrayLike == null) {
//                 throw new TypeError("Array.from requires an array-like object - not null or undefined");
//             }

//             // 4. If mapfn is undefined, then let mapping be false.
//             var mapFn = arguments.length > 1 ? arguments[1] : void undefined;
//             var T;
//             if (typeof mapFn !== 'undefined') {
//                 // 5. else
//                 // 5. a If IsCallable(mapfn) is false, throw a TypeError exception.
//                 if (!ArrayConstructor.isCallable(mapFn)) {
//                     throw new TypeError('Array.from: when provided, the second argument must be a function');
//                 }

//                 // 5. b. If thisArg was supplied, let T be thisArg; else let T be undefined.
//                 if (arguments.length > 2) {
//                     T = arguments[2];
//                 }
//             }

//             // 10. Let lenValue be Get(items, "length").
//             // 11. Let len be ToLength(lenValue).
//             var len = ArrayConstructor.toLength(items.length);

//             // 13. If IsConstructor(C) is true, then
//             // 13. a. Let A be the result of calling the [[Construct]] internal method
//             // of C with an argument list containing the single item len.
//             // 14. a. Else, Let A be ArrayCreate(len).
//             var A = ArrayConstructor.isCallable(C) ? Object(new C(len)) : new Array(len);

//             // 16. Let k be 0.
//             var k = 0;
//             // 17. Repeat, while k < len… (also steps a - h)
//             var kValue;
//             while (k < len) {
//                 kValue = items[k];
//                 if (mapFn) {
//                     A[k] = typeof T === 'undefined' ? mapFn(kValue, k) : mapFn.call(T, kValue, k);
//                 } else {
//                     A[k] = kValue;
//                 }
//                 k += 1;
//             }
//             // 18. Let putStatus be Put(A, "length", len, true).
//             A.length = len;
//             // 20. Return A.
//             return A;
//         };
//     };