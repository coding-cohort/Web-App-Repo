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
  ],
  select = document.querySelector('.custom-select'),
  id = select.id,
  prev = document.querySelector('.prev'),
  next = document.querySelector('.next');

let data,
  labels,
  timeframe = 'daily',
  index = 0,
  myChart;

select.addEventListener('change', (e) => {
  timeframe = e.target.value;
  if (
    timeframe === 'daily' ||
    timeframe === 'weekly' ||
    timeframe === 'monthly'
  ) {
    fetchData();
  } else {
    return undefined;
  }
});

prev.addEventListener('click', () => {
  index === 0 ? (index = data.length - 1) : --index;
  renderBarchart();
});

next.addEventListener('click', () => {
  index === data.length - 1 ? (index = 0) : ++index;
  renderBarchart();
});

const fetchData = () => {
  console.log(id, timeframe);
  fetch(`http://localhost:3000/api/pain/${id}/${timeframe}`)
    .then((response) => response.json())
    .then((result) => {
      if (result.success === 'No data!') {
        showText(result.success);
      } else {
        data = result[timeframe];
        index = result[timeframe].length - 1;
        if (timeframe === 'daily') {
          labels = DAYS;
        } else if (timeframe === 'weekly') {
          let month = MONTHS[new Date().getMonth()];
          labels = WEEKS.map((week) => `${month} ${week}`);
        } else {
          labels = MONTHS;
        }
        renderBarchart();
      }
    })
    .catch((err) => {
      console.log(err);
    });
};

const showText = (text) => {
  document.querySelector('.no-text').innerHTML = text;
};

const renderBarchart = () => {
  if (myChart) myChart.destroy();
  const ctx = document.getElementById('myChart').getContext('2d');
  myChart = new Chart(ctx, {
    type: 'bar',
    data: {
      labels: iterateArray(labels),
      datasets: [
        {
          label: 'Report Data',
          data: data[index],
          backgroundColor: iterateArray(COLORS),
          borderColor: iterateArray(COLORS),
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

const iterateArray = (array) =>
  array.filter((ele, i) => {
    if (i < data[index].length) return ele;
  });

fetchData();
