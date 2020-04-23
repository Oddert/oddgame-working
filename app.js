var nodes = [
  {"name": "Leafy Greens", "nodeType": "food"},
  {"name": "Beans", "nodeType": "food"},
  {"name": "Red Meat", "nodeType": "food"},
  {"name": "Muscles", "nodeType": "food"},
  {"name": "Fish", "nodeType": "food"},
  {"name": "Seeds", "nodeType": "food"},
  {"name": "Organ Meat", "nodeType": "food"},
  {"name": "Shellfish", "nodeType": "food"},
  {"name": "Sardines", "nodeType": "food"},
  {"name": "Dark Leafy Greens", "nodeType": "food"},
  {"name": "Dairy", "nodeType": "food"},
  {"name": "Egg", "nodeType": "food"},
  {"name": "Seaweed", "nodeType": "food"},

  {"name": "Fatty Fish", "nodeType": "food"},
  {"name": "Egg Yolk", "nodeType": "food"},
  {"name": "Cod Liver Oil", "nodeType": "food"},
  {"name": "Sun Exposure", "nodeType": "food"},
  {"name": "Milk", "nodeType": "food"},

  {"name": "Iron", "nodeType": "nutriant"},
  {"name": "Iodine", "nodeType": "nutriant"},
  {"name": "Vitamin D", "nodeType": "nutriant"},
  {"name": "Vitamin B12", "nodeType": "nutriant"},
];

var links = [
  {"target": "Fish", "source": "Fatty Fish"},
  {"target": "Egg", "source": "Egg Yolk"},

  {"target": "Iron", "source": "Red Meat"},
  {"target": "Iron", "source": "Organ Meat"},
  {"target": "Iron", "source": "Shellfish"},
  {"target": "Iron", "source": "Sardines"},
  {"target": "Iron", "source": "Beans"},
  {"target": "Iron", "source": "Seeds"},
  {"target": "Iron", "source": "Dark Leafy Greens"},

  {"target": "Iodine", "source": "Seaweed"},
  {"target": "Iodine", "source": "Fish"},
  {"target": "Iodine", "source": "Dairy"},
  {"target": "Iodine", "source": "Egg"},

  {"target": "Vitamin D", "source": "Cod Liver Oil"},
  {"target": "Vitamin D", "source": "Fatty Fish"},
  {"target": "Vitamin D", "source": "Egg Yolk"},
  {"target": "Vitamin D", "source": "Sun Exposure"},

  {"target": "Vitamin B12", "source" "Shellfish"},
  {"target": "Vitamin B12", "source": "Organ Meat"},
  {"target": "Vitamin B12", "source": "Meat"},
  {"target": "Vitamin B12", "source": "Egg"},
  {"target": "Vitamin B12", "source": "Milk"},
];

console.log(nodes, links)
