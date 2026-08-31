const viewer = document.getElementById("viewer");

const buttons = document.querySelectorAll("button");

buttons.forEach(button => {

    button.addEventListener("click", () => {

        const evidence = button.textContent;

        viewer.innerHTML = `
            <h3>${evidence}</h3>

            <hr>

            <p>Evidence category loaded.</p>

            <p>
                STATUS:
                <strong>UNDER ANALYSIS</strong>
            </p>
        `;

    });

});