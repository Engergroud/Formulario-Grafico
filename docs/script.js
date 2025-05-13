let myChart;
let datosPorPresidente = {
    "Presidente A": { regiones: {}, totalVotos: 0 },
    "Presidente B": { regiones: {}, totalVotos: 0 },
    "Presidente C": { regiones: {}, totalVotos: 0 }
};

document.getElementById('tipoGrafico').addEventListener('change', function() {
    const tipoGrafico = document.getElementById('tipoGrafico').value;
    if (tipoGrafico) {
        document.getElementById('votosForm').style.display = 'block';
        inicializarGrafico(tipoGrafico);
    } else {
        document.getElementById('votosForm').style.display = 'none';
    }
});

document.getElementById('presidente').addEventListener('change', function() {
    const presidente = document.getElementById('presidente').value;
    if (presidente) {
        mostrarGraficoPorPresidente(presidente);
    }
});

document.getElementById('agregarDatos').addEventListener('click', function() {
    const presidente = document.getElementById('presidente').value;
    const region = document.getElementById('region').value;
    const votos = parseFloat(document.getElementById('votos').value);

    if (presidente && region && !isNaN(votos)) {
        agregarDatosAlGrafico(presidente, region, votos);
        document.getElementById('region').value = '';
        document.getElementById('votos').value = '';
    } else {
        alert('Por favor, complete todos los campos con valores válidos.');
    }
});

document.getElementById('generarGraficoGeneral').addEventListener('click', function() {
    generarGraficoGeneral();
    document.getElementById('botonesGrafico').style.display = 'block';
});

document.getElementById('mostrarGraficoGeneral').addEventListener('click', function() {
    generarGraficoGeneral();
});

document.getElementById('cambiarTipoGrafico').addEventListener('click', function() {
    const selectTipoGrafico = document.getElementById('tipoGrafico');
    const opciones = Array.from(selectTipoGrafico.options).filter(opcion => opcion.value !== "");

    if (opciones.length === 0) {
        alert('No hay tipos de gráfico válidos disponibles.');
        return;
    }

    const indiceActual = opciones.findIndex(opcion => opcion.selected);
    const siguienteIndice = (indiceActual + 1) % opciones.length;

    selectTipoGrafico.selectedIndex = opciones[siguienteIndice].index;
    const tipoGrafico = selectTipoGrafico.value;

    if (tipoGrafico) {
        cambiarTipoGrafico(tipoGrafico);
    } else {
        alert('Por favor, seleccione un tipo de gráfico.');
    }
});

document.getElementById('mostrarGraficoPorRegiones').addEventListener('click', function() {
    const presidente = document.getElementById('presidente').value;
    if (presidente) {
        mostrarGraficoPorPresidente(presidente);
    } else {
        alert('Por favor, seleccione un presidente.');
    }
});

document.getElementById('volverPrincipal').addEventListener('click', function() {
    window.location.href = 'index.html'; // Asegúrate de que 'index.html' sea la URL correcta de tu página principal
});

function inicializarGrafico(tipoGrafico) {
    const ctx = document.getElementById('myChart').getContext('2d');

    if (myChart instanceof Chart) {
        myChart.destroy();
    }

    myChart = new Chart(ctx, {
        type: tipoGrafico,
        data: {
            labels: [],
            datasets: [{
                label: 'Votos por Región',
                data: [],
                backgroundColor: [],
                borderColor: [],
                borderWidth: 2
            }]
        },
        options: {
            scales: {
                y: {
                    beginAtZero: true
                }
            }
        }
    });
}

function agregarDatosAlGrafico(presidente, region, votos) {
    if (!datosPorPresidente[presidente].regiones[region]) {
        datosPorPresidente[presidente].regiones[region] = 0;
    }
    datosPorPresidente[presidente].regiones[region] += votos;
    datosPorPresidente[presidente].totalVotos += votos;

    const backgroundColor = `rgba(${Math.floor(Math.random() * 255)}, ${Math.floor(Math.random() * 255)}, ${Math.floor(Math.random() * 255)}, 0.7)`;
    const borderColor = `rgba(${Math.floor(Math.random() * 255)}, ${Math.floor(Math.random() * 255)}, ${Math.floor(Math.random() * 255)}, 1)`;

    myChart.data.labels.push(`${presidente} - ${region}`);
    myChart.data.datasets[0].data.push(datosPorPresidente[presidente].regiones[region]);
    myChart.data.datasets[0].backgroundColor.push(backgroundColor);
    myChart.data.datasets[0].borderColor.push(borderColor);

    myChart.update();
}

function mostrarGraficoPorPresidente(presidente) {
    const ctx = document.getElementById('myChart').getContext('2d');

    if (myChart instanceof Chart) {
        myChart.destroy();
    }

    const regiones = Object.keys(datosPorPresidente[presidente].regiones);
    const votos = regiones.map(region => datosPorPresidente[presidente].regiones[region]);
    const backgroundColors = regiones.map(() => `rgba(${Math.floor(Math.random() * 255)}, ${Math.floor(Math.random() * 255)}, ${Math.floor(Math.random() * 255)}, 0.7)`);
    const borderColors = regiones.map(() => `rgba(${Math.floor(Math.random() * 255)}, ${Math.floor(Math.random() * 255)}, ${Math.floor(Math.random() * 255)}, 1)`);

    myChart = new Chart(ctx, {
        type: document.getElementById('tipoGrafico').value,
        data: {
            labels: regiones,
            datasets: [{
                label: `Votos por Región para ${presidente}`,
                data: votos,
                backgroundColor: backgroundColors,
                borderColor: borderColors,
                borderWidth: 2
            }]
        },
        options: {
            scales: {
                y: {
                    beginAtZero: true
                }
            }
        }
    });
}

function generarGraficoGeneral() {
    const ctx = document.getElementById('myChart').getContext('2d');

    if (myChart instanceof Chart) {
        myChart.destroy();
    }

    const presidentes = Object.keys(datosPorPresidente);
    const regiones = [...new Set(presidentes.flatMap(presidente => Object.keys(datosPorPresidente[presidente].regiones)))];
    const datasets = presidentes.map(presidente => {
        const votosPorRegion = regiones.map(region => datosPorPresidente[presidente].regiones[region] || 0);
        return {
            label: `Votos para ${presidente}`,
            data: votosPorRegion,
            backgroundColor: `rgba(${Math.floor(Math.random() * 255)}, ${Math.floor(Math.random() * 255)}, ${Math.floor(Math.random() * 255)}, 0.7)`,
            borderColor: `rgba(${Math.floor(Math.random() * 255)}, ${Math.floor(Math.random() * 255)}, ${Math.floor(Math.random() * 255)}, 1)`,
            borderWidth: 2
        };
    });

    myChart = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: regiones,
            datasets: datasets
        },
        options: {
            scales: {
                y: {
                    beginAtZero: true
                }
            }
        }
    });
}

function cambiarTipoGrafico(tipoGrafico) {
    const ctx = document.getElementById('myChart').getContext('2d');

    if (myChart instanceof Chart) {
        myChart.destroy();
    }

    const presidentes = Object.keys(datosPorPresidente);
    const regiones = [...new Set(presidentes.flatMap(presidente => Object.keys(datosPorPresidente[presidente].regiones)))];
    const datasets = presidentes.map(presidente => {
        const votosPorRegion = regiones.map(region => datosPorPresidente[presidente].regiones[region] || 0);
        return {
            label: `Votos para ${presidente}`,
            data: votosPorRegion,
            backgroundColor: `rgba(${Math.floor(Math.random() * 255)}, ${Math.floor(Math.random() * 255)}, ${Math.floor(Math.random() * 255)}, 0.7)`,
            borderColor: `rgba(${Math.floor(Math.random() * 255)}, ${Math.floor(Math.random() * 255)}, ${Math.floor(Math.random() * 255)}, 1)`,
            borderWidth: 2
        };
    });

    myChart = new Chart(ctx, {
        type: tipoGrafico,
        data: {
            labels: regiones,
            datasets: datasets
        },
        options: {
            scales: {
                y: {
                    beginAtZero: true
                }
            }
        }
    });
}