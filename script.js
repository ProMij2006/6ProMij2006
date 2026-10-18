document.addEventListener("DOMContentLoaded", function () {
    const quantityInput = document.getElementById("quantityInput");
    const radioTypes = document.querySelectorAll("input[name='serviceType']");
    const selectContainer = document.getElementById("selectContainer");
    const productSelect = document.getElementById("productSelect");
    const checkboxContainer = document.getElementById("checkboxContainer");
    const propertyCheckbox = document.getElementById("propertyCheckbox");
    const calcBtn = document.getElementById("calcBtn");
    const resultDiv = document.getElementById("result");
    const errorDiv = document.getElementById("error");

    function calculate() {
        const quantityValue = quantityInput.value.trim();
        const regex = /^[0-9]+$/;

        if (quantityValue === "" || !regex.test(quantityValue) || parseInt(quantityValue, 10) <= 0) {
            quantityInput.classList.add("is-invalid");
            errorDiv.textContent = "Нужно вводить только целые числа больше нуля!";
            resultDiv.textContent = "";
            return;
        }

        quantityInput.classList.remove("is-invalid");
        errorDiv.textContent = "";

        const quantity = parseInt(quantityValue, 10);

        let basePrice = 1000;
        let selectedTypeVal = "1";

        radioTypes.forEach(function (radio) {
            if (radio.checked) {
                selectedTypeVal = radio.value;
                if (radio.value === "1") {
                    basePrice = 1000;
                } else if (radio.value === "2") {
                    basePrice = 2000;
                } else if (radio.value === "3") {
                    basePrice = 3000;
                }
            }
        });

        let additionalCost = 0;
        if (selectedTypeVal === "2") {
            additionalCost = parseInt(productSelect.value, 10);
        } else if (selectedTypeVal === "3") {
            if (propertyCheckbox.checked) {
                additionalCost = parseInt(propertyCheckbox.value, 10);
            }
        }

        const totalCost = (basePrice + additionalCost) * quantity;
        resultDiv.textContent = "Стоимость заказа: " + totalCost.toLocaleString('ru-RU') + " руб.";
    }

    function updateFormVisibility() {
        let selectedValue = "1";
        radioTypes.forEach(function (radio) {
            if (radio.checked) {
                selectedValue = radio.value;
            }
        });

        if (selectedValue === "1") {
            selectContainer.style.display = "none";
            checkboxContainer.style.display = "none";
        } else if (selectedValue === "2") {
            selectContainer.style.display = "block";
            checkboxContainer.style.display = "none";
        } else if (selectedValue === "3") {
            selectContainer.style.display = "none";
            checkboxContainer.style.display = "block";
        }

        calculate(); 
    }

    quantityInput.addEventListener("input", calculate);

    radioTypes.forEach(function (radio) {
        radio.addEventListener("change", updateFormVisibility);
    });

    productSelect.addEventListener("change", calculate);
    propertyCheckbox.addEventListener("change", calculate);

    calcBtn.addEventListener("click", function (e) {
        e.preventDefault();
        calculate();
    });

    updateFormVisibility();
});