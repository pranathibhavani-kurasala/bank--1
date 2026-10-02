function scrollToDashboard() {

    document
        .getElementById("dashboard")
        .scrollIntoView({
            behavior: "smooth"
        });

}


function analyzeTransaction() {

    const amount =
        Number(document.getElementById("amount").value);

    const location =
        document.getElementById("location").value;

    const device =
        document.getElementById("device").value;

    const frequency =
        document.getElementById("frequency").value;


    /*
        QUANTUM-INSPIRED RISK MODEL

        This is a prototype simulation.

        Later you can replace this section
        with a real quantum ML API/backend.
    */


    let amountRisk = 0;
    let locationRisk = 0;
    let deviceRisk = 0;
    let behaviorRisk = 0;


    // AMOUNT RISK

    if (amount < 5000) {

        amountRisk = 10;

    } else if (amount < 25000) {

        amountRisk = 30;

    } else if (amount < 75000) {

        amountRisk = 65;

    } else {

        amountRisk = 90;

    }


    // LOCATION RISK

    if (location === "normal") {

        locationRisk = 10;

    } else if (location === "unusual") {

        locationRisk = 60;

    } else {

        locationRisk = 90;

    }


    // DEVICE RISK

    if (device === "trusted") {

        deviceRisk = 10;

    } else if (device === "new") {

        deviceRisk = 55;

    } else {

        deviceRisk = 90;

    }


    // BEHAVIOR RISK

    if (frequency === "normal") {

        behaviorRisk = 10;

    } else if (frequency === "high") {

        behaviorRisk = 60;

    } else {

        behaviorRisk = 90;

    }


    /*
        WEIGHTED RISK SCORE

        In a real implementation,
        quantum model output would contribute here.
    */

    let riskScore =
        (amountRisk * 0.25) +
        (locationRisk * 0.25) +
        (deviceRisk * 0.25) +
        (behaviorRisk * 0.25);


    riskScore = Math.round(riskScore);


    // UPDATE UI

    document.getElementById("riskScore")
        .innerText = riskScore + "%";


    document.getElementById("amountBar")
        .style.width = amountRisk + "%";


    document.getElementById("locationBar")
        .style.width = locationRisk + "%";


    document.getElementById("deviceBar")
        .style.width = deviceRisk + "%";


    document.getElementById("behaviorBar")
        .style.width = behaviorRisk + "%";


    const status =
        document.getElementById("riskStatus");


    if (riskScore < 30) {

        status.innerText =
            "✓ LOW RISK — Transaction appears safe";

    }

    else if (riskScore < 65) {

        status.innerText =
            "⚠ MEDIUM RISK — Further verification recommended";

    }

    else {

        status.innerText =
            "🚨 HIGH RISK — Possible fraudulent transaction";

    }


    // ADD TRANSACTION TO TABLE

    const table =
        document.getElementById("transactionTable");


    const row =
        document.createElement("tr");


    let statusHTML;


    if (riskScore >= 65) {

        statusHTML =
            '<span class="fraud">FRAUD</span>';

    } else {

        statusHTML =
            '<span class="safe">SAFE</span>';

    }


    row.innerHTML = `

        <td>#TX${Math.floor(Math.random() * 9000 + 1000)}</td>

        <td>₹${amount.toLocaleString("en-IN")}</td>

        <td>${location}</td>

        <td>${device}</td>

        <td>${riskScore}%</td>

        <td>${statusHTML}</td>

    `;


    table.prepend(row);

}
