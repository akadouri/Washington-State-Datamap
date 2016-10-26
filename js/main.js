$.getJSON("data/2012_median_income.json", function(data) {
    buildMap(data);
});
$.getJSON("data/2012_election_results_president_only.json", function(data) {
    buildMap2(data);
});

function buildMap(data) {
  for (var key in data) {
      $("#form").html(function() {
          return $("#form").html() + "<div id=\"form-group\"><label>" + data[key].name + "</label>" +
              "<label>" + data[key].income + "</income></div>";
      });
  }
  var map = new Datamap({
      scope: 'gz_2010_us_050_00_500k',
      element: document.getElementById('container1'),
      projection: '',
      geographyConfig: {
          dataUrl: 'washington.json',
          popupTemplate: function(geo, data) {
              // don't show tooltip if country isn't present in dataset
              if (!data) {
                  return;
              }
              // tooltip content
              return ['<div class="hoverinfo">',
                  '<strong>', geo.properties.name, '</strong>',
                  '<br>Income: <strong>', data.income, '</strong>',
                  '</div>'
              ].join('');
          }
      },
      setProjection: function(element) {
          var projection = d3.geo.mercator()
              .center([-121, 47])
              .scale(6000)
              .translate([element.offsetWidth / 2, element.offsetHeight / 2]);
          var path = d3.geo.path()
              .projection(projection);

          return {
              path: path,
              projection: projection
          };
      },
      fills: {
          defaultFill: '#f0af0a',
          top1: "#003311",
          top2: "#006622",
          top3: "#009933",
          top4: "#00cc44",
          top5: "#00ff55",
          top6: "#33ff77",
          top7: "#66ff99",
          top8: "#d6f5d6",
      },
      data
  });
}

function buildMap2(data) {
  var map = new Datamap({
      scope: 'gz_2010_us_050_00_500k',
      element: document.getElementById('container2'),
      projection: '',
      geographyConfig: {
          dataUrl: 'washington.json',
          popupOnHover: true,
          popupTemplate: function(geo, data) {
              // don't show tooltip if country isn't present in dataset
              if (!data) {
                  return;
              }
              var votes = 0;
              var candidate;
              for(var i = 0; i < data.length; i++) {
                if(data[i].RaceName === "United States President/Vice President") {
                  if(parseInt(data[i].Votes) > votes) {
                    votes = parseInt(data[i].Votes);
                    candidate = data[i].Candidate;
                  }
                }
              }
             console.log(data.fillKey);
              return ['<div class=hoverinfo>',
                  '<strong>', data.races[0].County, '</strong>',
                  '<br><strong>', candidate, '</strong>',
                  '<br><strong>', votes, '</strong>',
                  '</div>'
              ].join('');
          }
      },
      setProjection: function(element) {
          var projection = d3.geo.mercator()
              .center([-121, 47])
              .scale(6000)
              .translate([element.offsetWidth / 2, element.offsetHeight / 2]);
          var path = d3.geo.path()
              .projection(projection);

          return {
              path: path,
              projection: projection
          };
      },
      fills: {
          defaultFill: '#f0af0a',
          Democratic: "#3333FF",
          Republican: "#EE3523"
      },
      data
  });
}
