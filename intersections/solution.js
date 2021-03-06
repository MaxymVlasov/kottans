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

    return {x: x, y: y, line1: line1, line2: line2}
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

  function pointInPolygon (point, p) {
    var j = p.length - 1
    var bool = 0
    for (var i = 0; i < p.length; i++) {
      if (((p[i].y <= point.y && point.y < p[j].y) ||
           (p[j].y <= point.y && point.y < p[i].y)) &&
           (point.x >
           (p[j].x - p[i].x) * (point.y - p[i].y) / (p[j].y - p[i].y) + p[i].x)) {

        bool = !bool
      }
      j = i
    }

    return bool
  }

  function addAllPointsInsidePolygon (points, polygon) {
    for (var i = 0; i < points.length; i++) {
      if (pointInPolygon(points[i], polygon)) {
        var prev = i - 1
        var next = i + 1
        if (i === 0) prev = points.length - 1
        if (i === points.length - 1) next = 0

        points[i].line1 = equationOfLine(points[i], points[prev])
        points[i].line2 = equationOfLine(points[i], points[next])

        pointIntersec.push(points[i])
      }
    }
  }

  function invert (line) {
    return {x: -line.x, y: -line.y, z: -line.z}
  }

  function equalEquationOfLines (obj1, obj2) {
    var o1l1 = obj1.line1 || {}
    var o1l2 = obj1.line2 || {}
    var o2l1 = obj2.line1 || {}
    var o2l2 = obj2.line2 || {}
    var i_o2l1 = invert(obj2.line1 || {})
    var i_o2l2 = invert(obj2.line2 || {})

    if ((o1l1.x === o2l1.x && o1l1.y === o2l1.y && o1l1.z === o2l1.z) ||
        (o1l1.x === i_o2l1.x && o1l1.y === i_o2l1.y && o1l1.z === i_o2l1.z)) {
      delete obj1.line1
      delete obj2.line1
      return true
    }
    if ((o1l1.x === o2l2.x && o1l1.y === o2l2.y && o1l1.z === o2l2.z) ||
        (o1l1.x === i_o2l2.x && o1l1.y === i_o2l2.y && o1l1.z === i_o2l2.z)) {
      delete obj1.line1
      delete obj2.line2
      return true
    }
    if ((o1l2.x === o2l1.x && o1l2.y === o2l1.y && o1l2.z === o2l1.z) ||
         (o1l2.x === i_o2l1.x && o1l2.y === i_o2l1.y && o1l2.z === i_o2l1.z)) {
      delete obj1.line2
      delete obj2.line1
      return true
    }
    if ((o1l2.x === o2l2.x && o1l2.y === o2l2.y && o1l2.z === o2l2.z) ||
        (o1l2.x === i_o2l2.x && o1l2.y === i_o2l2.y && o1l2.z === i_o2l2.z)) {
      delete obj1.line2
      delete obj2.line2
      return true
    }

    return false
  }

  function copyObj (from, to) {
    for (var key in from) to[key] = from[key]
  }

  function turn (p1, p2, p3) {
    var v1 = {x: p2.x - p1.x, y: p2.y - p1.y}
    var v2 = {x: p3.x - p2.x, y: p3.y - p2.y}

    return Math.sign(v1.x * v2.y - v2.x * v1.y)
  }

  function bindPoints (from, to) {
    for (var i = 0; i < from.length; i++) {
      var p1 = {}
      copyObj(from[i], p1)

      for (var j = i + 1; j < from.length; j++) {
        var p2 = {}
        copyObj(from[j], p2)

        if (equalEquationOfLines(p1, p2)) {
          to.push([p1, p2])
        }
      }
    }
  }

  function bindPoints2 (from, to) {
    for (var i = 0; i < from.length; i++) {
      var p1 = from[i][from[i].length - 1]

      for (var j = i + 1; j < from.length; j++) {
        var p2 = {}
        copyObj(from[j][0], p2)

        if (equalEquationOfLines(p1, p2) &&
            turn(from[i][0], from[i][1], p2) !== 0) {
          if (p2.line1 === undefined && p2.line2 === undefined) { continue }

          var tmp = from[i].slice()
          tmp.push(p2)
          to.push(tmp)
        }
      }
    }
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

      var vectorProduct1 = ((bBox2.xmin - bBox1.xmin) * (bBox1.ymax - bBox1.ymin)) -
                           ((bBox2.ymin - bBox1.ymin) * (bBox1.xmax - bBox1.xmin))

      var vectorProduct2 = ((bBox2.xmax - bBox1.xmin) * (bBox1.ymax - bBox1.ymin)) -
                           ((bBox2.ymax - bBox1.ymin) * (bBox1.xmax - bBox1.xmin))

      var vectorProduct3 = ((bBox1.xmin - bBox2.xmin) * (bBox2.ymax - bBox2.ymin)) -
                           ((bBox1.ymin - bBox2.ymin) * (bBox2.xmax - bBox2.xmin))

      var vectorProduct4 = ((bBox1.xmax - bBox2.xmin) * (bBox2.ymax - bBox2.ymin)) -
                           ((bBox1.ymax - bBox2.ymin) * (bBox2.xmax - bBox2.xmin))

      if (Math.sign(vectorProduct1) === Math.sign(vectorProduct2) ||
          Math.sign(vectorProduct3) === Math.sign(vectorProduct4)) { continue }

      var line1 = equationOfLine(fig1[i], fig1[i + 1])
      var line2 = equationOfLine(fig2[j], fig2[j + 1])

      var point = intersectPoint(line1, line2)

      if (isNaN(point.x) || isNaN(point.y)) { continue }

      pointIntersec.push(point)
    }
  }

  addAllPointsInsidePolygon(fig1, fig2)
  addAllPointsInsidePolygon(fig2, fig1)

  pointIntersec.sort((a, b) => {
    if (a.x > b.x) return 1
    if (b.x > a.x) return -1
    if (a.x === b.x) {
      if (a.y > b.y) return 1
      if (b.y > a.y) return -1
    }
    return 0
  })

  var allConnect = []
  bindPoints(pointIntersec, allConnect)

  var allConnect2 = []
  bindPoints2(allConnect, allConnect2)

  var allConnect3 = []
  bindPoints2(allConnect2, allConnect3)

  console.log(pointIntersec)
  return [pointIntersec]

  // console.log(allConnect)
  // return allConnect

  // console.log(allConnect2)
  // return allConnect2

  // console.log(allConnect3)
  // return allConnect3
}
