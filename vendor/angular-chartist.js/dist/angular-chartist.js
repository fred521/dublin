!function(t,e){"function"==typeof define&&define.amd?define(["angular","chartist"],e):"object"==typeof exports?module.exports=e(require("angular"),require("chartist")):t.angularChartist=e(t.angular,t.Chartist)}(this,function(t,e){"use strict";function n(t){this.data=t.data(),this.chartType=t.chartType,this.events=t.events()||{},this.options=t.chartOptions()||null,this.responsiveOptions=t.responsiveOptions()||null}var r=t.module("angular-chartist",[]);return n.prototype.bindEvents=function(t){Object.keys(this.events).forEach(function(e){t.on(e,this.events[e])},this)},n.prototype.renderChart=function(t,n){return n&&(this.chartType=n),e[this.chartType](t,this.data,this.options,this.responsiveOptions)},r.directive("chartist",[function(){return{restrict:"EA",scope:{data:"&chartistData",chartType:"@chartistChartType",events:"&chartistEvents",chartOptions:"&chartistChartOptions",responsiveOptions:"&chartistResponsiveOptions"},controller:["$scope",n],link:function(t,e,n,r){var i=e[0],a=r.renderChart(i);r.bindEvents(a),t.$watch(function(){return{data:t.data(),chartType:t.chartType,chartOptions:t.chartOptions()}},function(t,e){var n=t.data,s=e.data,o=t.chartType,h=e.chartType,c=t.chartOptions,p=e.chartOptions;(n!==s||c!==p)&&a.update(n,c,!0),o!==h&&(a=r.renderChart(i,o))},!0),t.$on("$destroy",function(){a.detach()})}}}]),r});