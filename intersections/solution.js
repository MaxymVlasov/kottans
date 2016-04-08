'use strict'

function intersects (fig1, fig2) {
  function equationOfLine (begin, end) {
    var line = {x: null, y: null, z: null}
    line.x = end.y - begin.y
    line.y = begin.x - end.x
    line.z = -begin.x * (end.y - begin.y) + begin.y * (end.x - begin.x)

    return {x: line.x, y: line.y, z: line.z}
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
