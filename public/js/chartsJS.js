const ctx1 = document.getElementById('chart-1').getContext('2d');

new Chart(ctx1, {
    type: 'polarArea',
    data: {
        labels: ['JavaScript', 'Python', 'HTML'],
        datasets: [{
        label: '# of Votes',
        data: [100, 200, 150],
        backgroundColor: [
            'rgba(255, 99, 132, 1)',
            'rgba(54, 162, 235, 1)',
            'rgba(255, 206, 86, 1)'
        ],
        }]
    },
    options: {
        responsive: true,
    }
    });

const ctx2 = document.getElementById('chart-2').getContext('2d');

new Chart(ctx2, {
    type: 'bar',
    data: {
        labels: ['JavaScript', 'Python', 'HTML'],
        datasets: [{
        label: 'Categorías más compradas',
        data: [100, 200, 150],
        backgroundColor: [
            'rgba(255, 99, 132, 1)',
            'rgba(54, 162, 235, 1)',
            'rgba(255, 206, 86, 1)'
        ],
        }]
    },
    options: {
        responsive: true,
    }
    });
