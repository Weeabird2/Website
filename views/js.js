
'use strict';
let createElement = (neuerBlock) => {
    let container = document.getElementById ("contentwrapper");
    const newpost = document.querySelector (".inhalt");
    let newElm = newpost.cloneNode(true);
    newElm.querySelector(".überschrift").innerText = titelname;
    container.appendChild(newElm);

}

document.addEventListener("DOMContentLoaded", function () {
    document.getElementById ("uploadForm")
        .addEventListener("click", createElement);
        console.log()
});