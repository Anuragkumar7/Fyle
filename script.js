$(document).ready(function() {
    // Tax calculation function
    function calculateTax(income, age) {
        const exemptedIncome = 800000;
        let taxableIncome = income - exemptedIncome;
        let tax = 0;

        if (taxableIncome <= 0) {
            return 0;
        }

        if (age < 40) {
            tax = taxableIncome * 0.3;
        } else if (age >= 40 && age < 60) {
            tax = taxableIncome * 0.4;
        } else {
            tax = taxableIncome * 0.1;
        }

        return tax;
    }

    // Form validation and submission
    $('#taxForm').submit(function(e) {
        e.preventDefault();
        clearErrors();

        const grossIncome = parseFloat($('#grossIncome').val().replace(/,/g, '')) || 0;
        const extraIncome = parseFloat($('#extraIncome').val().replace(/,/g, '')) || 0;
        const deductions = parseFloat($('#deductions').val().replace(/,/g, '')) || 0;
        const ageGroup = $('#ageGroup').val();

        let errors = false;

        if (isNaN(grossIncome) || grossIncome < 0) {
            showError('#grossIncomeError', 'Please enter a valid positive number');
            errors = true;
        }

        if (isNaN(extraIncome) || extraIncome < 0) {
            showError('#extraIncomeError', 'Please enter a valid positive number');
            errors = true;
        }

        if (isNaN(deductions) || deductions < 0) {
            showError('#deductionsError', 'Please enter a valid positive number');
            errors = true;
        }

        if (ageGroup === '') {
            showError('#ageGroupError', 'Age group is required');
            errors = true;
        }

        if (!errors) {
            const income = grossIncome + extraIncome - deductions;
            let age;

            switch (ageGroup) {
                case '<40':
                    age = 30;
                    break;
                case '>=40&<60':
                    age = 50;
                    break;
                case '>=60':
                    age = 65;
                    break;
            }

            const tax = calculateTax(income, age);
            const overall = income-tax;
            $('#taxResult').text(`Your overall income will be ${overall.toFixed(2)}`);
            $('#taxModal').modal('show');
        }
    });

    // Clear error icons and tooltips
    function clearErrors() {
        $('.error-icon').text('').tooltip('dispose');
    }

    // Show error icon and tooltip
    function showError(selector, message) {
        $(selector)
            .text('!')
            .attr('data-toggle', 'tooltip')
            .attr('title', message)
            .tooltip('show')
            .addClass('error-icon');
    }

    // Enable tooltips
    $(function() {
        $('[data-toggle="tooltip"]').tooltip();
    });
});