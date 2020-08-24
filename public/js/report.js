const DAYS = [
    'Monday',
    'Tuesday',
    'Wednesday',
    'Thursday',
    'Friday',
    'Saturday',
    'Sunday',
  ],
  WEEKS = ['W1', 'W2', 'W3', 'W4'],
  MONTHS = [
    'Jan',
    'Feb',
    'Mar',
    'Apr',
    'May',
    'Jun',
    'Jul',
    'Aug',
    'Sep',
    'Oct',
    'Nov',
    'Dec',
  ],
  COLORS = [
    'rgba(255, 99, 132, 0.8)',
    'rgba(54, 162, 235, 0.8)',
    'rgba(255, 206, 86, 0.8)',
    'rgba(75, 192, 192, 0.8)',
    'rgba(153, 102, 255, 0.8)',
    'rgba(255, 159, 64, 0.8)',
    'rgba(125, 149, 64, 0.8)',
    'rgba(155, 99, 92, 0.8)',
    'rgba(100, 1, 235, 0.8)',
    'rgba(2, 206, 86, 0.8)',
    'rgba(75, 152, 100, 0.8)',
    'rgba(103, 92, 255, 0.4)',
  ];

const select = document.querySelector('.custom-select'),
  prev = document.querySelector('.prev'),
  next = document.querySelector('.next');

let data,
  labels,
  color,
  timeframe = 'daily',
  index = 0;

select.addEventListener('change', (e) => {
  timeframe = e.target.value;
  if (
    timeframe === 'daily' ||
    timeframe === 'weekly' ||
    timeframe === 'monthly'
  ) {
    setFetchData();
  } else {
    return undefined;
  }
});

prev.addEventListener('click', () => {
  index === 0 ? index : --index;
  renderBarchart();
});
next.addEventListener('click', () => {
  index === data.length - 1 ? index : ++index;
  renderBarchart();
});

const setFetchData = () => {
  fetch(`http://localhost:3000/api/pain/5f361412ff733839089f63c6/${timeframe}`)
    .then((response) => response.json())
    .then((result) => {
      data = result[timeframe];
      index = result[timeframe].length - 1;
      if (timeframe === 'daily') {
        labels = DAYS;
      } else if (timeframe === 'weekly') {
        let month = MONTHS[new Date().getMonth()];
        labels = WEEKS.filter((week, i) => {
          if (i < data[index].length) return `${month} ${week}`;
        });
      } else {
        labels = MONTHS;
      }
      color = COLORS;
      renderBarchart();
    })
    .catch((err) => {
      console.log(err);
    });
};

const renderBarchart = () => {
  console.log(data[index]);
  const ctx = document.getElementById('myChart').getContext('2d');
  const myChart = new Chart(ctx, {
    type: 'bar',
    data: {
      labels: labels.filter((label, i) => {
        if (i <= data[index].length - 1) return label;
      }),
      datasets: [
        {
          label: 'Report Data',
          data: data[index],
          backgroundColor: color,
          borderColor: color,
          borderWidth: 1,
        },
      ],
    },
    options: {
      scales: {
        yAxes: [
          {
            ticks: {
              beginAtZero: true,
            },
          },
        ],
      },
    },
  });
};

setFetchData();
