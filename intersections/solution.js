'use strict'

function intersects (fig1, fig2) {
  function equationOfLine (begin, end) {
    var line = {x: null, y: null, z: null}
    line.x = end.y - begin.y
    line.y = begin.x - end.x
    line.z = -begin.x * (end.y - begin.y) + begin.y * (end.x - begin.x)

    return {x: line.x, y: line.y, z: line.z}
  }

  function intersectPoint (line1, line2) {
    var coefficient = line2.x / line1.x
    if (coefficient !== 0) {
      line2.y -= line1.y * coefficient
      line2.z -= line1.z * coefficient
    }
    var y = line2.z / -line2.y
    var x = -(line1.y * y + line1.z) / line1.x

    return {x: x, y: y}
  }

  function boundBox (point1, point2) {
    var b = {xmax: null, ymax: null, xmin: null, ymin: null}
    if (point1.x > point2.x) {
      b.xmax = point1.x
      b.xmin = point2.x
    } else {
      b.xmax = point2.x
      b.xmin = point1.x
    }
    if (point1.y > point2.y) {
      b.ymax = point1.y
      b.ymin = point2.y
    } else {
      b.ymax = point2.y
      b.ymin = point1.y
    }
    return {xmax: b.xmax, xmin: b.xmin, ymax: b.ymax, ymin: b.ymin}
  }

  fig1.push(fig1[0])
  fig2.push(fig2[0])

  var pointIntersec = []

  for (var i = 0; i < fig1.length - 1; i++) {
    var bBox1 = boundBox(fig1[i], fig1[i + 1])

    for (var j = 0; j < fig2.length - 1; j++) {
      var bBox2 = boundBox(fig2[j], fig2[j + 1])

      if (bBox1.xmax < bBox2.xmin ||
          bBox2.xmax < bBox1.xmin ||
          bBox1.ymax < bBox2.ymin ||
          bBox2.ymax < bBox1.ymin) { continue }

      // TODO: one else if

      var line1 = equationOfLine(fig1[i], fig1[i + 1])
      var line2 = equationOfLine(fig2[j], fig2[j + 1])

      var point = intersectPoint(line1, line2)

      if (isNaN(point.x) || isNaN(point.y)) { continue }

      pointIntersec.push(point)
    }
  }

  return [
    [
      { x: 60,  y: 240 },
      { x: 90,  y: 240 },
      { x: 120, y: 180 },
      { x: 90,  y: 90  },
      { x: 60,  y: 150 },
    ],
    [
      { x: 270, y: 240 },
      { x: 300, y: 240 },
      { x: 300, y: 150 },
      { x: 270, y: 90  },
      { x: 240, y: 180 },
    ],
    [
      { x: 150, y: 180 },
      { x: 180, y: 240 },
      { x: 210, y: 180 },
      { x: 210, y: 90  },
      { x: 180, y: 60  },
      { x: 150, y: 90  }
    ]
  ];
}
