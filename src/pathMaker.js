/**
 * Hace crawling a todos los formularios de cada administracion y rellena la lista de tramites disponibles en cada oficina para ofrecerlos en el menu.
 * */

function generateJsonFromHtml(htmlElement) {
    const jsonData = {
        administration: {
            label: "",
            placeholder: "",
            optGroups: []
        }
    };

    const form = htmlElement.querySelector("form");
    const label = form.querySelector("label");
    const select = form.querySelector("select");

    jsonData.administration.label = label.textContent;
    jsonData.administration.placeholder = select.querySelector("option[disabled]").textContent;

    const optGroups = select.querySelectorAll("optgroup");
    optGroups.forEach(optGroup => {
        const group = {
            id: optGroup.getAttribute("id"),
            label: optGroup.getAttribute("label"),
            options: []
        };

        const options = optGroup.querySelectorAll("option");
        options.forEach(option => {
            const optionData = {
                value: option.getAttribute("value"),
                text: option.textContent
            };
            group.options.push(optionData);
        });

        jsonData.administration.optGroups.push(group);
    });

    return jsonData;
}

// Example usage
const htmlForm = document.querySelector("form");
const jsonStructure = generateJsonFromHtml(htmlForm);
console.log(jsonStructure);
