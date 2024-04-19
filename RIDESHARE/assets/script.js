function getLocationAndSendEmail() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(function (position) {
            var form = document.getElementById("report-form");
            form.elements["latitude"].value = position.coords.latitude;
            form.elements["longitude"].value = position.coords.longitude;

            sendEmail();
}, function (error) {
            alert("Erro ao obter a localização:" + error.message);
        });
    } else {
        alert("Seu navegador não suporta geolocalização.");
    }
}

function sendEmail() {
    var form = document.getElementById("report-form");
    var name = form.elements["name"].value;
    var destino = form.elements["destino"].value;
    var veiculo = form.elements["veiculo"].value;
    var placa = form.elements["placa"].value;
    var hora = form.elements["hora"].value;
    var zap = form.elements["zap"].value;
    var latitude = form.elements["latitude"].value;
    var longitude = form.elements["longitude"].value;

    var mailtoLink = "mailto:seuemail@example.com" +
    "?subject=" + encodeURIComponent(name) +
    "&body=" + encodeURIComponent("Nome do motorista: " + name + "\n" +
        "destino: " + destino + "\n" +
        "veiculo: " + veiculo + "\n" +
        "placa: " + placa + "\n" +
        "hora: " + hora + "\n" +
        "Whatsapp: " + zap + "\n" +
        "latitude: " + latitude + "\n" +
        "longitude: " + longitude);

    window.location.href = mailtoLink;
}

function toggleMenu() {
var menu = document.getElementById("menu-dropdown");
if (menu.style.display === "block") {
menu.style.display = "none";
} else {
menu.style.display = "block"
}
}

window.onclick = function (event) {
if (!event.target.matches('.menu-icon')) {
var menu = document.getElementById("menu-dropdown");
if (menu.style.display === "block") {
    menu.style.display = "none";
}
}

}

document.addEventListener("DOMContentLoaded", function () {
    loadCases();
});

function loadCases() {
    fetch("motolista.json")
    .then(response => response.json())
    .then(data => {
        const casesList = document.getElementById("casesList");
        casesList.innerHTML = "";

        data.forEach(caseItem => {
            const li = document.createElement("li");
            const whatsLink = `<a class="whatsapp-link" href="https://wa.me/${caseItem.whatsapp}" target="_blank">Whatsapp</a>`;
            li.innerHTML = `<h3>${caseItem.nome}</h3>
                            <p><strong>destino:</strong> ${caseItem.destino}</p>
                            <p><strong>veiculo:</strong> ${caseItem.veiculo}</p>
                            <p><strong>placa:</strong> ${caseItem.placa}</p>
                            <p><strong>horario:</strong> ${caseItem.horario}</p>
                            <p>${whatsLink}</p>`;
            casesList.appendChild(li);
        });
    })
    .catch(error => console.error("Erro ao carregar:", error));
}