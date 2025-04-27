// Water distribution networks data for UAE
const waterNetworks = {
    "abu-dhabi": {
      nodes: [
        {id: "tank1", name: "Main Reservoir", capacity: 4500, type: "desalination"},
        {id: "tank2", name: "North Tank", capacity: 2800, type: "storage"},
        {id: "tank3", name: "South Tank", capacity: 3200, type: "distribution"},
        {id: "tank4", name: "East Tank", capacity: 2100, type: "storage"}
      ],
      links: [
        {source: "tank1", target: "tank2", flow: 520, type: "primary"},
        {source: "tank1", target: "tank3", flow: 650, type: "primary"},
        {source: "tank2", target: "tank4", flow: 310, type: "secondary"},
        {source: "tank3", target: "tank4", flow: 280, type: "secondary"}
      ]
    },
    "dubai": {
      nodes: [
        {id: "tank1", name: "Central Plant", capacity: 7200, type: "desalination"},
        {id: "tank2", name: "City Tank", capacity: 4100, type: "distribution"},
        {id: "tank3", name: "Industrial Zone", capacity: 5500, type: "industrial"},
        {id: "tank4", name: "Residential Area", capacity: 3800, type: "distribution"},
        {id: "tank5", name: "Reserve Storage", capacity: 6300, type: "storage"},
        {id: "tank6", name: "Mountain Source", capacity: 4800, type: "freshwater"}
      ],
      links: [
        {source: "tank1", target: "tank2", flow: 890, type: "primary"},
        {source: "tank1", target: "tank3", flow: 1150, type: "primary"},
        {source: "tank1", target: "tank5", flow: 760, type: "primary"},
        {source: "tank2", target: "tank4", flow: 510, type: "secondary"},
        {source: "tank3", target: "tank4", flow: 420, type: "secondary"},
        {source: "tank5", target: "tank4", flow: 380, type: "secondary"},
        {source: "tank6", target: "tank5", flow: 640, type: "primary"},
        {source: "tank6", target: "tank3", flow: 350, type: "secondary"}
      ]
    },
    "sharjah": {
      nodes: [
        {id: "tank1", name: "Main Plant", capacity: 9500, type: "desalination"},
        {id: "tank2", name: "North District", capacity: 5200, type: "distribution"},
        {id: "tank3", name: "South District", capacity: 5800, type: "distribution"},
        {id: "tank4", name: "East Storage", capacity: 6700, type: "storage"},
        {id: "tank5", name: "West Storage", capacity: 6200, type: "storage"},
        {id: "tank6", name: "Industrial Complex", capacity: 7400, type: "industrial"},
        {id: "tank7", name: "Coastal Facility", capacity: 8100, type: "desalination"},
        {id: "tank8", name: "Highland Reservoir", capacity: 4900, type: "freshwater"}
      ],
      links: [
        {source: "tank1", target: "tank2", flow: 1240, type: "primary"},
        {source: "tank1", target: "tank3", flow: 1380, type: "primary"},
        {source: "tank1", target: "tank4", flow: 950, type: "primary"},
        {source: "tank7", target: "tank5", flow: 1120, type: "primary"},
        {source: "tank7", target: "tank6", flow: 1350, type: "primary"},
        {source: "tank2", target: "tank5", flow: 740, type: "secondary"},
        {source: "tank3", target: "tank6", flow: 820, type: "secondary"},
        {source: "tank4", target: "tank3", flow: 610, type: "secondary"},
        {source: "tank5", target: "tank6", flow: 580, type: "secondary"},
        {source: "tank8", target: "tank4", flow: 850, type: "primary"},
        {source: "tank8", target: "tank5", flow: 690, type: "secondary"}
      ]
    },
    "ras-al-khaimah": {
      nodes: [
        {id: "tank1", name: "Central Hub", capacity: 6800, type: "storage"},
        {id: "tank2", name: "North Zone", capacity: 4500, type: "distribution"},
        {id: "tank3", name: "South Zone", capacity: 4700, type: "distribution"},
        {id: "tank4", name: "East Plant", capacity: 5900, type: "desalination"},
        {id: "tank5", name: "West Plant", capacity: 5600, type: "desalination"}
      ],
      links: [
        {source: "tank1", target: "tank2", flow: 780, type: "primary"},
        {source: "tank1", target: "tank3", flow: 820, type: "primary"},
        {source: "tank1", target: "tank4", flow: 680, type: "secondary"},
        {source: "tank1", target: "tank5", flow: 710, type: "secondary"},
        {source: "tank2", target: "tank3", flow: 530, type: "secondary"},
        {source: "tank2", target: "tank4", flow: 490, type: "secondary"},
        {source: "tank2", target: "tank5", flow: 420, type: "secondary"},
        {source: "tank3", target: "tank4", flow: 550, type: "secondary"},
        {source: "tank3", target: "tank5", flow: 580, type: "secondary"},
        {source: "tank4", target: "tank5", flow: 650, type: "primary"}
      ]
    },
    "fujairah": {
      nodes: [
        {id: "tank1", name: "Central Plant", capacity: 8400, type: "desalination"},
        {id: "tank2", name: "North District", capacity: 4300, type: "distribution"},
        {id: "tank3", name: "Northeast District", capacity: 4100, type: "distribution"},
        {id: "tank4", name: "East District", capacity: 3900, type: "distribution"},
        {id: "tank5", name: "Southeast District", capacity: 4000, type: "distribution"},
        {id: "tank6", name: "South District", capacity: 4200, type: "distribution"},
        {id: "tank7", name: "West District", capacity: 4500, type: "distribution"}
      ],
      links: [
        {source: "tank1", target: "tank2", flow: 920, type: "primary"},
        {source: "tank1", target: "tank3", flow: 880, type: "primary"},
        {source: "tank1", target: "tank4", flow: 850, type: "primary"},
        {source: "tank1", target: "tank5", flow: 860, type: "primary"},
        {source: "tank1", target: "tank6", flow: 900, type: "primary"},
        {source: "tank1", target: "tank7", flow: 950, type: "primary"}
      ]
    },
    "umm-al-quwain": {
      nodes: [
        {id: "tank1", name: "Main Reservoir", capacity: 5500, type: "desalination"},
        {id: "tank2", name: "City Center", capacity: 3200, type: "distribution"},
        {id: "tank3", name: "Coastal Area", capacity: 2900, type: "distribution"},
        {id: "tank4", name: "Industrial Zone", capacity: 4100, type: "industrial"}
      ],
      links: [
        {source: "tank1", target: "tank2", flow: 620, type: "primary"},
        {source: "tank1", target: "tank3", flow: 580, type: "primary"},
        {source: "tank1", target: "tank4", flow: 710, type: "primary"},
        {source: "tank2", target: "tank3", flow: 340, type: "secondary"},
        {source: "tank3", target: "tank4", flow: 290, type: "secondary"}
      ]
    },
    "ajman": {
      nodes: [
        {id: "tank1", name: "Desalination Plant", capacity: 6100, type: "desalination"},
        {id: "tank2", name: "Central Storage", capacity: 4700, type: "storage"},
        {id: "tank3", name: "Residential Area", capacity: 3500, type: "distribution"},
        {id: "tank4", name: "Commercial Zone", capacity: 3200, type: "distribution"},
        {id: "tank5", name: "Coastal Facility", capacity: 5300, type: "desalination"}
      ],
      links: [
        {source: "tank1", target: "tank2", flow: 850, type: "primary"},
        {source: "tank2", target: "tank3", flow: 510, type: "primary"},
        {source: "tank2", target: "tank4", flow: 480, type: "primary"},
        {source: "tank5", target: "tank2", flow: 740, type: "primary"},
        {source: "tank3", target: "tank4", flow: 320, type: "secondary"},
        {source: "tank5", target: "tank3", flow: 420, type: "secondary"}
      ]
    }
  };