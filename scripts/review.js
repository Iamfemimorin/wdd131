const reviewCountKey = "productReviewCount";
let reviewCount = Number(localStorage.getItem(reviewCountKey)) || 0;

reviewCount += 1;
localStorage.setItem(reviewCountKey, reviewCount);

document.querySelector("#reviewCount").textContent = reviewCount;
document.querySelector("#reviewPlural").textContent = reviewCount === 1 ? "" : "s";

document.querySelector("#currentyear").textContent = new Date().getFullYear();
document.querySelector("#lastModified").textContent = `Last Modification: ${document.lastModified}`;
