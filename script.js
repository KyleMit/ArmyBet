// Code goes here
function BuildGrid() {
// var parker = [
//   {x: Date.parse('09/05/2017'), y: 283},
//   //{x: Date.parse('01/01/2018'), y: 230}
// ]
// var bryan = [
//   {x: Date.parse('09/05/2017'), y: 278},
//   //{x: Date.parse('01/01/2018'), y: 261.333}
// ]
// var kyle = [
//   {x: Date.parse('09/05/2017'), y: 214},
//   //{x: Date.parse('01/01/2018'), y: 197.333}
// ]
// var angel = [
//   {x: Date.parse('09/05/2017'), y: 227},
//   //{x: Date.parse('01/01/2018'), y: 193.666}
// ]
var target = [
  {x: Date.parse('09/05/2017'), y: 0},
  {x: Date.parse('01/01/2018'), y: -16}
]

var parker_mult = 3
var bryan_mult = 1
var kyle_mult = 1
var angel_mult = 2
var target_mult = 1

var margin = 3

var parker_max = Math.max.apply(Math,parker.map(function(o){return o.y;}))
var parker_min = Math.min.apply(Math,parker.map(function(o){return o.y;}))
var parker_diff = parker_max - parker_min

var bryan_max = Math.max.apply(Math,bryan.map(function(o){return o.y;}))
var bryan_min = Math.min.apply(Math,bryan.map(function(o){return o.y;}))
var bryan_diff = bryan_max - bryan_min

var kyle_max = Math.max.apply(Math,kyle.map(function(o){return o.y;}))
var kyle_min = Math.min.apply(Math,kyle.map(function(o){return o.y;}))
var kyle_diff = kyle_max - kyle_min

var angel_max = Math.max.apply(Math,angel.map(function(o){return o.y;}))
var angel_min = Math.min.apply(Math,angel.map(function(o){return o.y;}))
var angel_diff = angel_max - angel_min

var target_max = Math.max.apply(Math,target.map(function(o){return o.y;}))
var target_min = Math.min.apply(Math,target.map(function(o){return o.y;}))
var target_diff = target_max - target_min

var max_diff = Math.max(parker_diff / parker_mult,
                        bryan_diff  / bryan_mult, 
                        kyle_diff   / kyle_mult,
                        angel_diff  / angel_mult,
                        target_diff / target_mult)

var p_max = parker_max + margin * parker_mult
var p_min = p_max - (max_diff + margin * 2) * parker_mult

var b_max = bryan_max + margin * bryan_mult
var b_min = b_max - (max_diff + margin * 2) * bryan_mult

var k_max = kyle_max + margin * kyle_mult
var k_min = k_max - (max_diff + margin * 2) * kyle_mult

var a_max = angel_max + margin * angel_mult
var a_min = a_max - (max_diff + margin * 2) * angel_mult

var t_max = target_max + margin * target_mult
var t_min = t_max - (max_diff + margin * 2) * target_mult


Highcharts.chart('container', {
    chart: {
        zoomType: 'xy'
    },
    title: {
        text: 'Army Weight Challenge'
    },
    subtitle: {
        text: 'Drop 30 and give me 30'
    },
    credits: {
      enabled: false
    },
    xAxis: {
        type: 'datetime',
        // http://php.net/manual/en/function.strftime.php
        dateTimeLabelFormats: {
            second: '%b %e',
            minute: '%b %e',
            hour: '%b %e',
            day: '%b %e',
            week:'%b %e',
            month: '%b %e',
            year: '%Y'
        },
        title: {
            text: 'Date'
        },
        endOnTick: false,
        tickInterval: 7 * 24 * 60 * 60 * 1000,
    },
    yAxis: [
      
      { // Primary yAxis left - target
        //gridLineWidth: 0,
        title: {
            text: 'Δ lb',
            style: {
                color: Highcharts.getOptions().colors[1]
            },
            align: 'high',
            offset: 0,
            rotation: 0,
            y: -12,
            x: 30,
            reserveSpace: false,
        },
        labels: {
            format: '{value}',
            style: {
                color: Highcharts.getOptions().colors[1]
            }
        },
        opposite: false,
        max: t_max,
        min: t_min,
        alignTicks: false,
        endOnTick: false,
        maxPadding: 0,
        minPadding: 0,
        tickInterval: target_mult * 2

    },
      { // Primary yAxis right - parker 
        gridLineWidth: 0,
        title: {
            text: '<span class="p-label">P</span><img src="http://i.imgur.com/lpsn2c1.jpg?1" />', //'P',
            style: {
                color: Highcharts.getOptions().colors[0]
            },
            align: 'high',
            offset: 0,
            rotation: 0,
            y: -12,
            x: -15,
            reserveSpace: false,
        },
        labels: {
            format: '{value}',
            style: {
                color: Highcharts.getOptions().colors[0]
            }
        },
        opposite: true,
        max: p_max,
        min: p_min,
        alignTicks: false,
        endOnTick: false,
        maxPadding: 0,
        minPadding: 0,
        tickInterval: parker_mult * 5

    }, { // Secondary yAxis - bryan
        gridLineWidth: 0,
        title: {
            text: 'D',
            style: {
                color: Highcharts.getOptions().colors[2]
            },
            align: 'high',
            offset: 0,
            rotation: 0,
            y: -12,
            x: -15,
            reserveSpace: false,
        },
        labels: {
            format: '{value}',
            style: {
                color: Highcharts.getOptions().colors[2]
            }
        },
        opposite: true,
        max: b_max,
        min: b_min,
        alignTicks: false,
        endOnTick: false,
        maxPadding: 0,
        minPadding: 0,
        tickInterval: bryan_mult * 5

    }, { // Tertiary yAxis - kyle
        gridLineWidth: 0,
        title: {
            text: 'K',
            style: {
                color: Highcharts.getOptions().colors[3]
            },
            align: 'high',
            offset: 0,
            rotation: 0,
            y: -12,
            x: -15,
            reserveSpace: false,
        },
        labels: {
            format: '{value}',
            style: {
                color: Highcharts.getOptions().colors[3]
            }
        },
        opposite: true,
        max: k_max,
        min: k_min,
        alignTicks: false,
        endOnTick: false,
        maxPadding: 0,
        minPadding: 0,
        tickInterval: kyle_mult * 5
    }, { // Quartiary yAxis - angel
        gridLineWidth: 0,
        title: {
            text: 'A', 
            style: {
                color: Highcharts.getOptions().colors[4]
            },
            align: 'high',
            offset: 0,
            rotation: 0,
            y: -12,
            x: -15,
            reserveSpace: false,
        },
        labels: {
            format: '{value}',
            style: {
                color: Highcharts.getOptions().colors[4]
            }
        },
        opposite: true,
        max: a_max,
        min: a_min,
        alignTicks: false,
        endOnTick: false,
        maxPadding: 0,
        minPadding: 0,
        tickInterval: angel_mult * 5
    }],
    // tooltip: {
    //         formatter: function() {
    //             return  '<b>' + this.series.name +'</b><br/>' +
    //                 Highcharts.dateFormat('%e - %b - %Y',
    //                                       new Date(this.x))
    //             + ' date, ' + this.y + ' Kg.';
    //         }
    //     },
    tooltip: {
        shared: true,
        crosshairs: true,
        xDateFormat: '%Y-%m-%d',
        valueSuffix: ' lb',
        headerFormat: '<span style="font-size: 10px">{point.key}</span><br/>'
    },
    // tooltip: {
    //     useHTML: true,
    //     headerFormat: '<table>',
    //     pointFormat: '<tr><th colspan="2"><h3>{point.country}</h3></th></tr>' +
    //         '<tr><th>Fat intake:</th><td>{point.x}g</td></tr>' +
    //         '<tr><th>Sugar intake:</th><td>{point.y}g</td></tr>' +
    //         '<tr><th>Obesity (adults):</th><td>{point.z}%</td></tr>',
    //     footerFormat: '</table>',
    //     followPointer: true
    // },
    legend: {
        layout: 'vertical',
        align: 'left',
        verticalAlign: 'top',
        x: 45,
        y: 195,
        floating: true,
        //backgroundColor: (Highcharts.theme && Highcharts.theme.legendBackgroundColor) || '#FFFFFF'
    },
    series: [
       {
        name: 'Target',
        type: 'line',
        yAxis: 0,
        data: target,
        color: Highcharts.getOptions().colors[1],
        marker: {
          enabled: false
        }

    }, {
        name: 'Parker',
        type: 'line',
        yAxis: 1,
        data: parker,
        color: Highcharts.getOptions().colors[0]
        

    }, {
        name: 'Dad',
        type: 'line',
        yAxis: 2,
        data: bryan,
        // marker: {
        //     enabled: false
        // },
        color: Highcharts.getOptions().colors[2]

      }, {
        name: 'Kyle',
        type: 'line',
        yAxis: 3,
        data: kyle,
        color: Highcharts.getOptions().colors[3]
      }, {
        name: 'Angel',
        type: 'line',
        yAxis: 4,
        data: angel,
        color: Highcharts.getOptions().colors[4]
      },]
});
}