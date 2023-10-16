let utils = {
    makeOptionsForSelect: function (formId,  selectData) {
        // Get the form element
        const form = document.getElementById(formId);

        // Create a label element
        const label = document.createElement('label');
        label.textContent = selectData.label;

        // Create a select element
        const select = document.createElement('select');


        //Hook up next
        select.addEventListener('change', async (ev) => {
            let selectedOption = ev.target.options[ev.target.selectedIndex];
            let currentOptGroup = selectData.optGroups[selectedOption.parentElement.id]
            let currentSelectOption = currentOptGroup.options[selectedOption.value];
            let currentSelectData = currentSelectOption.rel;
            for (let i = 0; i < currentSelectData.length; i++) {
                utils.makeOptionsForSelect(formId, currentSelectData[i]);
            }
        })

        // Add default option
        const defaultOption = document.createElement('option');
        defaultOption.textContent = selectData.placeholder;
        defaultOption.setAttribute('value', '');
        select.appendChild(defaultOption);

        // Iterate through optGroups in JSON
        for (const optGroupId in selectData.optGroups) {
            if (selectData.optGroups.hasOwnProperty(optGroupId)) {
                const optGroup = selectData.optGroups[optGroupId];

                // Create optgroup element
                const optgroup = document.createElement('optgroup');
                optgroup.id = optGroupId;
                optgroup.setAttribute('label', optGroup.label);

                // Iterate through options in the optgroup
                for (const value in optGroup.options) {
                    if (optGroup.options.hasOwnProperty(value)) {
                        const text = optGroup.options[value].value;

                        // Create option element
                        const option = document.createElement('option');
                        option.setAttribute('value', value);
                        option.textContent = text;


                        // Append option to optgroup
                        optgroup.appendChild(option);
                    }
                }

                // Append optgroup to select
                select.appendChild(optgroup);
            }
        }

        // Append label and select to the form+
        form.appendChild(label);
        form.appendChild(select);
    }
}

