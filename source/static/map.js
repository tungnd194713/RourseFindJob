function scale(xMax, xMin, yMax, yMin, yInput) {
  const percent = (yInput - yMin) / (yMax - yMin);
  return percent * (xMax - xMin) + xMin;
}

function getColorCode(target) {
  const c = Math.round(255.0 - scale(0,255,0,20,target)).toString(16).padStart(2, "0");
  return "#FF" + c + c;
}

const tooltipSpan = document.getElementById('tooltip');
window.onmousemove = function (e) {
    const x = e.clientX;
    const y = e.clientY;
    tooltipSpan.style.top = (y + 16) + 'px';
    tooltipSpan.style.left = (x + 16) + 'px';
};
const bridge = document.getElementById('test');
// eslint-disable-next-line no-unused-vars,no-undef,new-cap
const d = new jpmap.japanMap(document.getElementById("my-map"), {
  areas: [
    { "code":1, "color": getColorCode(2), "number": 2 },
    { "code":2, "color": getColorCode(0), "number": 0 },
    { "code":3, "color": getColorCode(0), "number": 0 },
    { "code":4, "color": getColorCode(0), "number": 0 },
    { "code":5, "color": getColorCode(0), "number": 0 },
    { "code":6, "color": getColorCode(0), "number": 0 },
    { "code":7, "color": getColorCode(0), "number": 0 },
    { "code":8, "color": getColorCode(0), "number": 0 },
    { "code":9, "color": getColorCode(0), "number": 0 },
    { "code":10, "color": getColorCode(0), "number": 0 },
    { "code":11, "color": getColorCode(1), "number": 1 },
    { "code":12, "color": getColorCode(6), "number": 6 },
    { "code":13, "color": getColorCode(18), "number": 18 },
    { "code":14, "color": getColorCode(4), "number": 4 },
    { "code":15, "color": getColorCode(0), "number": 0 },
    { "code":16, "color": getColorCode(0), "number": 0 },
    { "code":17, "color": getColorCode(0), "number": 0 },
    { "code":18, "color": getColorCode(0), "number": 0 },
    { "code":19, "color": getColorCode(0), "number": 0 },
    { "code":20, "color": getColorCode(0), "number": 0 },
    { "code":21, "color": getColorCode(0), "number": 0 },
    { "code":22, "color": getColorCode(0), "number": 0 },
    { "code":23, "color": getColorCode(4), "number": 4 },
    { "code":24, "color": getColorCode(1), "number": 1 },
    { "code":25, "color": getColorCode(0), "number": 0 },
    { "code":26, "color": getColorCode(2), "number": 2 },
    { "code":27, "color": getColorCode(1), "number": 1 },
    { "code":28, "color": getColorCode(0), "number": 0 },
    { "code":29, "color": getColorCode(1), "number": 1 },
    { "code":30, "color": getColorCode(5), "number": 5 },
    { "code":31, "color": getColorCode(0), "number": 0 },
    { "code":32, "color": getColorCode(0), "number": 0 },
    { "code":33, "color": getColorCode(0), "number": 0 },
    { "code":34, "color": getColorCode(0), "number": 0 },
    { "code":35, "color": getColorCode(0), "number": 0 },
    { "code":36, "color": getColorCode(0), "number": 0 },
    { "code":37, "color": getColorCode(0), "number": 0 },
    { "code":38, "color": getColorCode(0), "number": 0 },
    { "code":39, "color": getColorCode(0), "number": 0 },
    { "code":40, "color": getColorCode(0), "number": 0 },
    { "code":41, "color": getColorCode(0), "number": 0 },
    { "code":42, "color": getColorCode(0), "number": 0 },
    { "code":43, "color": getColorCode(0), "number": 0 },
    { "code":44, "color": getColorCode(0), "number": 0 },
    { "code":45, "color": getColorCode(0), "number": 0 },
    { "code":46, "color": getColorCode(0), "number": 0 },
    { "code":47, "color": getColorCode(1), "number": 1 }
  ],
  hoverColor: "#ffdd00",
  movesIslands : true,
  borderLineColor: "#000000",
  showsPrefectureName: true,
  width: 704,
  drawsBoxLine: false,
  fontSize: 11,
  lang: 'en',
  onHover(data){
    const tt = document.getElementById("tooltip");

    if (data.area.number === 0) {
      tt.innerHTML = (data.name);
    } else {
      tt.innerHTML = (data.name + " 感染者数: " + data.area.number);
    }

    tt.style = "display:block; position:fixed; overflow:hidden;";
  },
  onHoverOut(data) {
    const tt = document.getElementById("tooltip");
    tt.style = "display:none;";
  },
  onSelect(data){
    bridge.innerHTML = data.code
    alert(data.code);
  }
});
const canvas = document.querySelector('canvas');
canvas.style = "position: absolute;margin-left: auto;margin-right: auto;left: -290px;right: 0;z-index: 99;border-radius: 40px;top: 50px;border-style:none !important"


