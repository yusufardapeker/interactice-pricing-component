const rangeInput = document.querySelector(".range-input");
const pageviews = document.querySelector(".pageviews");
const amountNumber = document.querySelector(".amount-number");

const yearlyDiscount = document.querySelector(".yearly-billing-discount");
const toggleBtn = document.querySelector(".toggle-btn");

const displayData = async () => {
	const res = await fetch("data.json");
	const data = await res.json();

	let initialAmountNumbers = [8, 12, 16, 24, 36];

	rangeInput.addEventListener("input", () => {
		document.documentElement.style.setProperty("--track-width", `${rangeInput.value}%`);

		data.forEach((object, index) => {
			object.amountNumber = initialAmountNumbers[index]; // If we omit this statement, line 26 will evaluate previous number so its apply discount process that already discounted numbers in each execute.

			if (rangeInput.value == object.rangeValue) {
				pageviews.textContent = object.pageviews;
				amountNumber.textContent = `$${object.amountNumber}.00`;
			}

			if (toggleBtn.classList.value.includes("active") && rangeInput.value == object.rangeValue) {
				amountNumber.textContent = `$${(object.amountNumber -= object.amountNumber * 0.25)}.00`;
			}
		});
	});

	toggleBtn.addEventListener("click", () => {
		toggleBtn.classList.toggle("active");

		data.forEach((object, index) => {
			object.amountNumber = initialAmountNumbers[index]; // same logic that explained above

			if (toggleBtn.classList.value.includes("active") && rangeInput.value == object.rangeValue) {
				amountNumber.textContent = `$${(object.amountNumber -= object.amountNumber * 0.25)}.00`;
			}

			if (toggleBtn.classList.length === 1 && rangeInput.value == object.rangeValue) {
				amountNumber.textContent = `$${object.amountNumber}.00`;
			}
		});
	});
};

displayData();

if (window.innerWidth >= 1440) {
	yearlyDiscount.textContent = "-25% discount";
} else {
	yearlyDiscount.textContent = "-25%";
}

window.addEventListener("resize", () => {
	if (window.innerWidth >= 1440) {
		yearlyDiscount.textContent = "-25% discount";
	} else {
		yearlyDiscount.textContent = "-25%";
	}
});
