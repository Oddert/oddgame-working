const defaultBoards = [
  {
    data: [
      [{ type: 'wall' }, { type: 'wall' }, { type: 'wall' }, { type: 'wall' }, { type: 'wall' }, { type: 'wall' }, { type: 'wall' }, { type: 'wall' }, { type: 'wall' }, { type: 'wall' }, { type: 'wall' }],
      [{ type: 'wall' }, { type: 'floor' }, { type: 'floor' }, { type: 'floor' }, { type: 'floor' }, { type: 'floor' }, { type: 'floor' }, { type: 'floor' }, { type: 'floor' }, { type: 'floor' }, { type: 'wall' }],
      [{ type: 'wall' }, { type: 'floor' }, { type: 'floor' }, { type: 'floor' }, { type: 'floor' }, { type: 'floor' }, { type: 'floor' }, { type: 'floor' }, { type: 'floor' }, { type: 'floor' }, { type: 'wall' }],
      [{ type: 'wall' }, { type: 'wall' }, { type: 'floor' }, { type: 'floor' }, { type: 'floor' }, { type: 'floor' }, { type: 'floor' }, { type: 'floor' }, { type: 'floor' }, { type: 'floor' }, { type: 'wall' }],
      [{ type: 'wall' }, { type: 'floor' }, { type: 'floor' }, { type: 'wall' }, { type: 'floor' }, { type: 'floor' }, { type: 'floor' }, { type: 'floor' }, { type: 'floor' }, { type: 'floor' }, { type: 'wall' }],
      [{ type: 'wall' }, { type: 'marble', direction: 'right' }, { type: 'marble', direction: 'right' }, { type: 'marble', direction: 'right' }, { type: 'marble', direction: 'right' }, { type: 'marble', direction: 'right' }, { type: 'marble', direction: 'right' }, { type: 'floor' }, { type: 'floor' }, { type: 'floor' }, { type: 'wall' }],
      [{ type: 'wall' }, { type: 'floor' }, { type: 'floor' }, { type: 'floor' }, { type: 'wall' }, { type: 'floor' }, { type: 'floor' }, { type: 'floor' }, { type: 'floor' }, { type: 'floor' }, { type: 'wall' }],
      [{ type: 'wall' }, { type: 'floor' }, { type: 'floor' }, { type: 'wall' }, { type: 'floor' }, { type: 'floor' }, { type: 'floor' }, { type: 'floor' }, { type: 'floor' }, { type: 'floor' }, { type: 'wall' }],
      [{ type: 'wall' }, { type: 'floor' }, { type: 'floor' }, { type: 'floor' }, { type: 'floor' }, { type: 'floor' }, { type: 'floor' }, { type: 'floor' }, { type: 'floor' }, { type: 'floor' }, { type: 'wall' }],
      [{ type: 'wall' }, { type: 'floor' }, { type: 'floor' }, { type: 'floor' }, { type: 'floor' }, { type: 'floor' }, { type: 'floor' }, { type: 'floor' }, { type: 'floor' }, { type: 'floor' }, { type: 'wall' }],
      [{ type: 'wall' }, { type: 'wall' }, { type: 'wall' }, { type: 'wall' }, { type: 'wall' }, { type: 'wall' }, { type: 'wall' }, { type: 'wall' }, { type: 'wall' }, { type: 'wall' }, { type: 'wall' }],
    ]
  },
  {
    data: [
      [{ type: 'wall' }, { type: 'wall' }, { type: 'wall' }, { type: 'wall' }, { type: 'wall' }, { type: 'wall' }, { type: 'wall' }, { type: 'wall' }, { type: 'wall' }, { type: 'wall' }, { type: 'wall' }, { type: 'wall' }, { type: 'wall' }, { type: 'wall' }, { type: 'wall' }, { type: 'wall' }, { type: 'wall' }, { type: 'wall' }, { type: 'wall' }, { type: 'wall' }, { type: 'wall' }, { type: 'wall' }, { type: 'wall' }, { type: 'wall' }, { type: 'wall' }, { type: 'wall' }, { type: 'wall' }, { type: 'wall' }, { type: 'wall' }, { type: 'wall' }],
      [{ type: 'wall' }, { type: 'floor' }, { type: 'marble', direction: 'right' }, { type: 'marble', direction: 'right' }, { type: 'marble', direction: 'right' }, { type: 'marble', direction: 'right' }, { type: 'floor' }, { type: 'floor' }, { type: 'floor' }, { type: 'floor' }, { type: 'floor' }, { type: 'floor' }, { type: 'floor' }, { type: 'floor' }, { type: 'floor' }, { type: 'floor' }, { type: 'floor' }, { type: 'floor' }, { type: 'floor' }, { type: 'floor' }, { type: 'floor' }, { type: 'floor' }, { type: 'floor' }, { type: 'floor' }, { type: 'floor' }, { type: 'floor' }, { type: 'floor' }, { type: 'floor' }, { type: 'floor' }, { type: 'wall' }],
      [{ type: 'wall' }, { type: 'marble', direction: 'right' }, { type: 'marble', direction: 'right' }, { type: 'marble', direction: 'right' }, { type: 'marble', direction: 'right' }, { type: 'marble', direction: 'right' }, { type: 'floor' }, { type: 'floor' }, { type: 'floor' }, { type: 'floor' }, { type: 'wall' }, { type: 'floor' }, { type: 'floor' }, { type: 'floor' }, { type: 'floor' }, { type: 'floor' }, { type: 'floor' }, { type: 'floor' }, { type: 'floor' }, { type: 'floor' }, { type: 'wall' }, { type: 'floor' }, { type: 'floor' }, { type: 'floor' }, { type: 'floor' }, { type: 'floor' }, { type: 'floor' }, { type: 'floor' }, { type: 'floor' }, { type: 'wall' }],
      [{ type: 'wall' }, { type: 'wall' }, { type: 'wall' }, { type: 'wall' }, { type: 'wall' }, { type: 'wall' }, { type: 'wall' }, { type: 'floor' }, { type: 'floor' }, { type: 'floor' }, { type: 'wall' }, { type: 'wall' }, { type: 'floor' }, { type: 'floor' }, { type: 'floor' }, { type: 'floor' }, { type: 'floor' }, { type: 'floor' }, { type: 'floor' }, { type: 'wall' }, { type: 'wall' }, { type: 'floor' }, { type: 'floor' }, { type: 'floor' }, { type: 'floor' }, { type: 'floor' }, { type: 'floor' }, { type: 'floor' }, { type: 'floor' }, { type: 'wall' }],
      [{ type: 'wall' }, { type: 'floor' }, { type: 'floor' }, { type: 'floor' }, { type: 'floor' }, { type: 'floor' }, { type: 'wall' }, { type: 'floor' }, { type: 'floor' }, { type: 'floor' }, { type: 'wall' }, { type: 'wall' }, { type: 'wall' }, { type: 'floor' }, { type: 'floor' }, { type: 'floor' }, { type: 'floor' }, { type: 'floor' }, { type: 'wall' }, { type: 'wall' }, { type: 'wall' }, { type: 'wall' }, { type: 'floor' }, { type: 'wall' }, { type: 'wall' }, { type: 'floor' }, { type: 'floor' }, { type: 'floor' }, { type: 'floor' }, { type: 'wall' }],
      [{ type: 'wall' }, { type: 'floor' }, { type: 'floor' }, { type: 'floor' }, { type: 'floor' }, { type: 'floor' }, { type: 'wall' }, { type: 'floor' }, { type: 'floor' }, { type: 'floor' }, { type: 'wall' }, { type: 'floor' }, { type: 'wall' }, { type: 'wall' }, { type: 'floor' }, { type: 'floor' }, { type: 'floor' }, { type: 'wall' }, { type: 'wall' }, { type: 'floor' }, { type: 'wall' }, { type: 'wall' }, { type: 'floor' }, { type: 'floor' }, { type: 'wall' }, { type: 'floor' }, { type: 'floor' }, { type: 'floor' }, { type: 'floor' }, { type: 'wall' }],
      [{ type: 'wall' }, { type: 'floor' }, { type: 'floor' }, { type: 'floor' }, { type: 'floor' }, { type: 'floor' }, { type: 'wall' }, { type: 'floor' }, { type: 'floor' }, { type: 'floor' }, { type: 'wall' }, { type: 'floor' }, { type: 'floor' }, { type: 'wall' }, { type: 'wall' }, { type: 'floor' }, { type: 'wall' }, { type: 'wall' }, { type: 'floor' }, { type: 'floor' }, { type: 'wall' }, { type: 'wall' }, { type: 'floor' }, { type: 'floor' }, { type: 'wall' }, { type: 'floor' }, { type: 'floor' }, { type: 'floor' }, { type: 'floor' }, { type: 'wall' }],
      [{ type: 'wall' }, { type: 'floor' }, { type: 'floor' }, { type: 'floor' }, { type: 'floor' }, { type: 'floor' }, { type: 'floor' }, { type: 'wall' }, { type: 'floor' }, { type: 'floor' }, { type: 'wall' }, { type: 'floor' }, { type: 'wall' }, { type: 'wall' }, { type: 'marble', direction: 'up' }, { type: 'marble', direction: 'up' }, { type: 'marble', direction: 'up' }, { type: 'wall' }, { type: 'wall' }, { type: 'floor' }, { type: 'wall' }, { type: 'wall' }, { type: 'floor' }, { type: 'floor' }, { type: 'wall' }, { type: 'floor' }, { type: 'floor' }, { type: 'floor' }, { type: 'floor' }, { type: 'wall' }],
      [{ type: 'wall' }, { type: 'floor' }, { type: 'wall' }, { type: 'wall' }, { type: 'wall' }, { type: 'wall' }, { type: 'floor' }, { type: 'floor' }, { type: 'wall' }, { type: 'floor' }, { type: 'wall' }, { type: 'wall' }, { type: 'wall' }, { type: 'marble', direction: 'up' }, { type: 'marble', direction: 'up' }, { type: 'marble', direction: 'up' }, { type: 'marble', direction: 'up' }, { type: 'marble', direction: 'up' }, { type: 'wall' }, { type: 'wall' }, { type: 'wall' }, { type: 'wall' }, { type: 'floor' }, { type: 'floor' }, { type: 'wall' }, { type: 'floor' }, { type: 'floor' }, { type: 'floor' }, { type: 'floor' }, { type: 'wall' }],
      [{ type: 'wall' }, { type: 'floor' }, { type: 'marble', direction: 'down' }, { type: 'marble', direction: 'down' }, { type: 'marble', direction: 'down' }, { type: 'floor' }, { type: 'wall' }, { type: 'floor' }, { type: 'floor' }, { type: 'wall' }, { type: 'wall' }, { type: 'wall' }, { type: 'marble', direction: 'up' }, { type: 'marble', direction: 'up' }, { type: 'marble', direction: 'up' }, { type: 'marble', direction: 'up' }, { type: 'marble', direction: 'up' }, { type: 'marble', direction: 'up' }, { type: 'marble', direction: 'up' }, { type: 'wall' }, { type: 'wall' }, { type: 'wall' }, { type: 'floor' }, { type: 'floor' }, { type: 'wall' }, { type: 'floor' }, { type: 'floor' }, { type: 'floor' }, { type: 'floor' }, { type: 'wall' }],
      [{ type: 'wall' }, { type: 'marble', direction: 'down' }, { type: 'marble', direction: 'down' }, { type: 'marble', direction: 'down' }, { type: 'marble', direction: 'down' }, { type: 'marble', direction: 'down' }, { type: 'wall' }, { type: 'wall' }, { type: 'floor' }, { type: 'floor' }, { type: 'wall' }, { type: 'floor' }, { type: 'floor' }, { type: 'floor' }, { type: 'floor' }, { type: 'floor' }, { type: 'floor' }, { type: 'floor' }, { type: 'floor' }, { type: 'floor' }, { type: 'floor' }, { type: 'wall' }, { type: 'floor' }, { type: 'floor' }, { type: 'wall' }, { type: 'floor' }, { type: 'floor' }, { type: 'floor' }, { type: 'floor' }, { type: 'wall' }],
      [{ type: 'wall' }, { type: 'marble', direction: 'down' }, { type: 'marble', direction: 'down' }, { type: 'marble', direction: 'down' }, { type: 'marble', direction: 'down' }, { type: 'wall' }, { type: 'wall' }, { type: 'wall' }, { type: 'wall' }, { type: 'floor' }, { type: 'floor' }, { type: 'wall' }, { type: 'floor' }, { type: 'floor' }, { type: 'floor' }, { type: 'floor' }, { type: 'floor' }, { type: 'floor' }, { type: 'floor' }, { type: 'floor' }, { type: 'floor' }, { type: 'wall' }, { type: 'floor' }, { type: 'floor' }, { type: 'wall' }, { type: 'floor' }, { type: 'floor' }, { type: 'floor' }, { type: 'floor' }, { type: 'wall' }],
      [{ type: 'wall' }, { type: 'marble', direction: 'down' }, { type: 'marble', direction: 'down' }, { type: 'marble', direction: 'down' }, { type: 'wall' }, { type: 'wall' }, { type: 'wall' }, { type: 'wall' }, { type: 'wall' }, { type: 'wall' }, { type: 'floor' }, { type: 'floor' }, { type: 'wall' }, { type: 'wall' }, { type: 'wall' }, { type: 'wall' }, { type: 'wall' }, { type: 'wall' }, { type: 'wall' }, { type: 'wall' }, { type: 'wall' }, { type: 'wall' }, { type: 'wall' }, { type: 'wall' }, { type: 'wall' }, { type: 'floor' }, { type: 'floor' }, { type: 'floor' }, { type: 'floor' }, { type: 'wall' }],
      [{ type: 'wall' }, { type: 'marble', direction: 'down' }, { type: 'marble', direction: 'down' }, { type: 'wall' }, { type: 'wall' }, { type: 'floor' }, { type: 'floor' }, { type: 'floor' }, { type: 'wall' }, { type: 'wall' }, { type: 'wall' }, { type: 'floor' }, { type: 'floor' }, { type: 'floor' }, { type: 'wall' }, { type: 'marble', direction: 'left' }, { type: 'marble', direction: 'left' }, { type: 'marble', direction: 'left' }, { type: 'marble', direction: 'left' }, { type: 'marble', direction: 'left' }, { type: 'marble', direction: 'left' }, { type: 'floor' }, { type: 'floor' }, { type: 'floor' }, { type: 'wall' }, { type: 'floor' }, { type: 'floor' }, { type: 'floor' }, { type: 'floor' }, { type: 'wall' }],
      [{ type: 'wall' }, { type: 'floor' }, { type: 'floor' }, { type: 'floor' }, { type: 'wall' }, { type: 'wall' }, { type: 'floor' }, { type: 'floor' }, { type: 'floor' }, { type: 'wall' }, { type: 'wall' }, { type: 'wall' }, { type: 'floor' }, { type: 'floor' }, { type: 'marble', direction: 'left' }, { type: 'marble', direction: 'left' }, { type: 'marble', direction: 'left' }, { type: 'marble', direction: 'left' }, { type: 'marble', direction: 'left' }, { type: 'marble', direction: 'left' }, { type: 'marble', direction: 'left' }, { type: 'floor' }, { type: 'floor' }, { type: 'floor' }, { type: 'wall' }, { type: 'floor' }, { type: 'floor' }, { type: 'floor' }, { type: 'floor' }, { type: 'wall' }],
      [{ type: 'wall' }, { type: 'floor' }, { type: 'floor' }, { type: 'floor' }, { type: 'floor' }, { type: 'wall' }, { type: 'wall' }, { type: 'floor' }, { type: 'floor' }, { type: 'floor' }, { type: 'wall' }, { type: 'wall' }, { type: 'wall' }, { type: 'floor' }, { type: 'wall' }, { type: 'marble', direction: 'left' }, { type: 'marble', direction: 'left' }, { type: 'marble', direction: 'left' }, { type: 'marble', direction: 'left' }, { type: 'marble', direction: 'left' }, { type: 'marble', direction: 'left' }, { type: 'floor' }, { type: 'floor' }, { type: 'floor' }, { type: 'wall' }, { type: 'floor' }, { type: 'floor' }, { type: 'floor' }, { type: 'wall' }, { type: 'wall' }],
      [{ type: 'wall' }, { type: 'floor' }, { type: 'floor' }, { type: 'floor' }, { type: 'floor' }, { type: 'floor' }, { type: 'floor' }, { type: 'marble', direction: 'up' }, { type: 'marble', direction: 'up' }, { type: 'floor' }, { type: 'floor' }, { type: 'floor' }, { type: 'floor' }, { type: 'floor' }, { type: 'floor' }, { type: 'wall' }, { type: 'wall' }, { type: 'wall' }, { type: 'wall' }, { type: 'wall' }, { type: 'wall' }, { type: 'wall' }, { type: 'wall' }, { type: 'wall' }, { type: 'wall' }, { type: 'marble', direction: 'down' }, { type: 'marble', direction: 'down' }, { type: 'wall' }, { type: 'wall' }, { type: 'wall' }],
      [{ type: 'wall' }, { type: 'wall' }, { type: 'wall' }, { type: 'wall' }, { type: 'wall' }, { type: 'wall' }, { type: 'wall' }, { type: 'wall' }, { type: 'wall' }, { type: 'wall' }, { type: 'wall' }, { type: 'wall' }, { type: 'wall' }, { type: 'wall' }, { type: 'wall' }, { type: 'wall' }, { type: 'wall' }, { type: 'wall' }, { type: 'wall' }, { type: 'wall' }, { type: 'wall' }, { type: 'wall' }, { type: 'wall' }, { type: 'wall' }, { type: 'wall' }, { type: 'wall' }, { type: 'wall' }, { type: 'wall' }, { type: 'wall' }, { type: 'wall' }],
    ]
  }
]

export default defaultBoards
