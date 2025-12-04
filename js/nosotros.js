
const timelineData = [
    { date: "Sep 2014", desc: "Inicio de operaciones de EcoByte con un pequeño equipo.", progress: "5%" },
    { date: "Sep 2016", desc: "Expansión de la red de contactos y primeras alianzas.", progress: "25%" },
    { date: "Jun 2016", desc: "Alcanzamos los 50,000 usuarios registrados y ese mismo año alcanzamos por primera vez nuestra máxima cantidad de ventas", progress: "50%" },
    { date: "Ago 2018", desc: "Inauguración de planta principal y tienda online.", progress: "75%" },
    { date: "Abr 2020", desc: "Consolidación como líderes en sostenibilidad tecnológica.", progress: "95%" }
];

const tlDate = document.getElementById('tl-date');
const tlDesc = document.getElementById('tl-desc');
const tlProgress = document.getElementById('tl-progress');
const tlPoints = document.querySelectorAll('.tl-point');

function setTimeline(index) {
    tlPoints.forEach(p => p.classList.remove('active'));
    tlPoints[index].classList.add('active');

    tlProgress.style.width = timelineData[index].progress;

    tlDate.style.opacity = 0;
    tlDesc.style.opacity = 0;

    setTimeout(() => {
        tlDate.innerText = timelineData[index].date;
        tlDesc.innerText = timelineData[index].desc;
        tlDate.style.opacity = 1;
        tlDesc.style.opacity = 1;
    }, 200);
}

if (tlDate) tlDate.style.transition = "opacity 0.2s";
if (tlDesc) tlDesc.style.transition = "opacity 0.2s";