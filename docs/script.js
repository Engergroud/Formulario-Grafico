let myChart;
let datosPorPresidente = {
    "Presidente A": {
        "totalVotos": 148583,
        "regiones": {
            "Distrito Nacional": 3732,
            "Santo Domingo": 4264,
            "Santiago": 5859,
            "San Cristóbal": 8891,
            "La Vega": 5373,
            "San Pedro de Macorís": 6874,
            "La Romana": 7744,
            "Puerto Plata": 4468,
            "Barahona": 1705,
            "Espaillat": 3599,
            "La Altagracia": 3222,
            "San Juan": 8768,
            "Monte Plata": 3897,
            "Azua": 1537,
            "Valverde": 7216,
            "María Trinidad Sánchez": 7921,
            "Sánchez Ramírez": 7036,
            "Peravia": 3163,
            "Hato Mayor": 6072,
            "Dajabón": 5851,
            "Monseñor Nouel": 8877,
            "El Seibo": 3046,
            "Monte Cristi": 2871,
            "San José de Ocoa": 8599,
            "Samaná": 3496,
            "Independencia": 9291,
            "Pedernales": 1755,
            "Elías Piña": 1797,
            "Bahoruco": 1659
        }
    },
    "Presidente B": {
        "totalVotos": 174947,
        "regiones": {
            "Distrito Nacional": 4219,
            "Santo Domingo": 9615,
            "Santiago": 8456,
            "San Cristóbal": 4337,
            "La Vega": 3745,
            "San Pedro de Macorís": 5735,
            "La Romana": 9736,
            "Puerto Plata": 7687,
            "Barahona": 1714,
            "Espaillat": 3292,
            "La Altagracia": 9343,
            "San Juan": 2207,
            "Monte Plata": 7172,
            "Azua": 9994,
            "Valverde": 8221,
            "María Trinidad Sánchez": 7021,
            "Sánchez Ramírez": 4622,
            "Peravia": 4560,
            "Hato Mayor": 9948,
            "Dajabón": 2641,
            "Monseñor Nouel": 5984,
            "El Seibo": 5353,
            "Monte Cristi": 9622,
            "San José de Ocoa": 8250,
            "Samaná": 5187,
            "Independencia": 3659,
            "Pedernales": 3956,
            "Elías Piña": 3251,
            "Bahoruco": 5420
        }
    },
    "Presidente C": {
        "totalVotos": 174689,
        "regiones": {
            "Distrito Nacional": 8108,
            "Santo Domingo": 2071,
            "Santiago": 6251,
            "San Cristóbal": 8012,
            "La Vega": 4918,
            "San Pedro de Macorís": 2684,
            "La Romana": 8098,
            "Puerto Plata": 3957,
            "Barahona": 5469,
            "Espaillat": 9752,
            "La Altagracia": 6795,
            "San Juan": 2472,
            "Monte Plata": 8263,
            "Azua": 8365,
            "Valverde": 9448,
            "María Trinidad Sánchez": 7001,
            "Sánchez Ramírez": 4762,
            "Peravia": 3435,
            "Hato Mayor": 2634,
            "Dajabón": 1973,
            "Monseñor Nouel": 5464,
            "El Seibo": 9393,
            "Monte Cristi": 3418,
            "San José de Ocoa": 4455,
            "Samaná": 7167,
            "Independencia": 6819,
            "Pedernales": 7521,
            "Elías Piña": 7242,
            "Bahoruco": 8742
        }
    }
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
    cambiargrafica(2);
});

document.getElementById('cambiarTipoGrafico').addEventListener('click', function() {
    cambiargrafica(1);
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

function cambiargrafica(indice) {
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

    if (indice === 1) {
        if (tipoGrafico) {
            cambiarTipoGrafico(tipoGrafico);
        } else {
            alert('Por favor, seleccione un tipo de gráfico.');
        }
    }else if(indice ==2){
        if (tipoGrafico) {
            cambiarTipoGraficoGeneral(tipoGrafico);
        } else {
            alert('Por favor, seleccione un tipo de gráfico.');
        }
    }
}

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

    // Destruir el gráfico solo si es necesario
    if (myChart instanceof Chart) {
        myChart.destroy();
    }

    const presidentes = Object.keys(datosPorPresidente);
    const totalVotos = presidentes.map(presidente => datosPorPresidente[presidente].totalVotos);
    const backgroundColors = presidentes.map(() => `rgba(${Math.floor(Math.random() * 255)}, ${Math.floor(Math.random() * 255)}, ${Math.floor(Math.random() * 255)}, 0.7)`);
    const borderColors = presidentes.map(() => `rgba(${Math.floor(Math.random() * 255)}, ${Math.floor(Math.random() * 255)}, ${Math.floor(Math.random() * 255)}, 1)`);

    myChart = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: presidentes,
            datasets: [{
                label: 'Total de Votos por Presidente',
                data: totalVotos,
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

function cambiarTipoGraficoGeneral(tipoGrafico) {
    const ctx = document.getElementById('myChart').getContext('2d');

    // Destruir el gráfico solo si es necesario
    if (myChart instanceof Chart) {
        myChart.destroy();
    }

    const presidentes = Object.keys(datosPorPresidente);
    const totalVotos = presidentes.map(presidente => datosPorPresidente[presidente].totalVotos);
    const backgroundColors = presidentes.map(() => `rgba(${Math.floor(Math.random() * 255)}, ${Math.floor(Math.random() * 255)}, ${Math.floor(Math.random() * 255)}, 0.7)`);
    const borderColors = presidentes.map(() => `rgba(${Math.floor(Math.random() * 255)}, ${Math.floor(Math.random() * 255)}, ${Math.floor(Math.random() * 255)}, 1)`);

    myChart = new Chart(ctx, {
        type: tipoGrafico,
        data: {
            labels: presidentes,
            datasets: [{
                label: 'Total de Votos por Presidente',
                data: totalVotos,
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
