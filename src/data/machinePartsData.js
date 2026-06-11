export const initialDcmParts = [
  {
    "name": "Conveyor",
    "function": "Transports the produced parts/flashes/scraps to the next stage of the process.",
    "images": [
      "/assets/components/conveyor1.png",
      "/assets/components/conveyor2.png"
    ],
    "x": 15,
    "y": 80,
    "mapId": 1,
    "box": {
      "left": 8.727034120734908,
      "top": 56.926217556138816,
      "width": 32.41469816272966,
      "height": 12.598425196850393
    },
    "areas": [
      {
        "left": 4.88599348534202,
        "top": 56.306446589847404,
        "width": 33.22475570032573,
        "height": 9.716599190283397,
        "type": "box"
      },
      {
        "left": 43.97394136807817,
        "top": 62.03674867642479,
        "width": 21.661237785016283,
        "height": 20.4297726564933,
        "type": "box"
      },
      {
        "left": 32.08469055374593,
        "top": 39.36468389909685,
        "width": 6.677524429967427,
        "height": 28.40236686390532,
        "type": "box"
      }
    ]
  },
  {
    "name": "Robot Extractor",
    "function": "Automatically removes the part from the die after the machine opens.",
    "images": ["/assets/components/robot-extractor.png"],
    "x": 14.501312335958005,
    "y": 63.6920384951881,
    "mapId": 1,
    "areas": [
      {
        "left": 35.36745406824147,
        "top": 48.99387576552931,
        "width": 8.136482939632543,
        "height": 13.065033537474484,
        "type": "box"
      }
    ]
  },
  {
    "name": "Die",
    "function": "Metal mold where molten aluminum is injected to form the part.",
    "images": ["/assets/components/die.png"],
    "x": 40,
    "y": 50,
    "mapId": 1,
    "areas": [
      {
        "left": 31.036745406824146,
        "top": 29.862933799941676,
        "width": 16.535433070866148,
        "height": 15.398075240594924,
        "type": "box"
      }
    ]
  },
  {
    "name": "Plunger/Shot Sleeve",
    "function": "Piston that pushes the molten metal into the die under high pressure, and the injection chamber where liquid metal is deposited.",
    "images": ["/assets/components/plunger.png"],
    "x": 55,
    "y": 50,
    "mapId": 1,
    "areas": [
      {
        "left": 13.925081433224756,
        "top": 35.03313166234515,
        "width": 22.638436482084693,
        "height": 10.141169691731484,
        "type": "box"
      }
    ]
  },
  {
    "name": "Robot Sprayer",
    "function": "Applies release agent and/or cooling to the die between cycles.",
    "images": ["/assets/components/sprayer.png"],
    "x": 40,
    "y": 30,
    "mapId": 1,
    "areas": [
      {
        "left": 28.41207349081365,
        "top": 25.896762904636923,
        "width": 7.874015748031493,
        "height": 12.131816856226301,
        "type": "box"
      }
    ]
  },
  {
    "name": "Ladle",
    "function": "Automatic or manual cup that transfers molten metal from the furnace to the injection chamber.",
    "images": ["/assets/components/ladle.png"],
    "x": 65,
    "y": 40,
    "mapId": 1,
    "areas": [
      {
        "left": 15.68241469816273,
        "top": 18.4310294546515,
        "width": 16.666666666666664,
        "height": 21.69728783902012,
        "type": "box"
      }
    ]
  },
  {
    "name": "Furnace",
    "function": "Furnace that keeps the aluminum (or other metal) molten at the proper temperature.",
    "images": ["/assets/components/furnance.png"],
    "x": 80,
    "y": 40,
    "mapId": 1,
    "areas": [
      {
        "left": 9.93485342019544,
        "top": 19.682341949548427,
        "width": 14.657980456026058,
        "height": 12.457178449081287,
        "type": "box"
      }
    ]
  },

  {
    "name": "Tie Bars",
    "function": "Clamping columns that support the locking force of the die during injection.",
    "images": ["/assets/components/tie-bar.png"],
    "x": 35,
    "y": 40,
    "mapId": 1,
    "areas": [
      {
        "left": 28.937007874015748,
        "top": 28.9297171186935,
        "width": 23.884514435695543,
        "height": 4.666083406240883,
        "type": "box"
      },
      {
        "left": 28.018372703412076,
        "top": 43.62787984835229,
        "width": 24.409448818897637,
        "height": 3.499562554680658,
        "type": "box"
      }
    ]
  },
  {
    "name": "Ejector System",
    "function": "Extraction/ejection system to release and push the part out of the die.",
    "images": ["/assets/components/ejector.png"],
    "x": 25,
    "y": 50,
    "mapId": 1,
    "areas": [
      {
        "left": 41.01049868766404,
        "top": 27.52989209682123,
        "width": 6.955380577427825,
        "height": 22.630504520268303,
        "type": "box"
      }
    ]
  },
  {
    "name": "HMI/Control Panel",
    "function": "Operation panel (Human-Machine Interface) for configuring and monitoring the process.",
    "images": [
      "/assets/components/hmi.png"
    ],
    "x": 10,
    "y": 40,
    "mapId": 1,
    "areas": [
      {
        "left": 31.107491856677527,
        "top": 22.42292120834631,
        "width": 5.8631921824104225,
        "height": 9.218312052320147,
        "type": "box"
      },
      {
        "left": 64.33224755700326,
        "top": 69.76019931485519,
        "width": 4.071661237785008,
        "height": 6.477732793522264,
        "type": "box"
      },
      {
        "left": 55.37459283387622,
        "top": 83.4630956088446,
        "width": 6.351791530944631,
        "height": 8.470881345375261,
        "type": "box"
      }
    ]
  },

  {
    "name": "Trim Press",
    "function": "Machine used to trim excess metal (flash) and runners from the cast part.",
    "images": [
      "/assets/components/trimpress.png"
    ],
    "x": 80,
    "y": 80,
    "mapId": 1,
    "areas": [
      {
        "left": 29.80456026058632,
        "top": 65.52475864216754,
        "width": 10.097719869706843,
        "height": 13.453752725007789,
        "type": "box"
      }
    ]
  },
  {
    "name": "TCU",
    "function": "Temperature Control Unit. Maintains the die at the optimal operating temperature.",
    "images": [
      "/assets/components/tcu1.png",
      "/assets/components/tcu2.png"
    ],
    "x": 20,
    "y": 20,
    "mapId": 1,
    "areas": [
      {
        "left": 44.62540716612378,
        "top": 13.204609156026159,
        "width": 19.21824104234527,
        "height": 13.204609156026159,
        "type": "box"
      }
    ]
  },
  {
    "name": "Vacuum Valve",
    "function": "Extracts air and gases from the die cavity before metal injection to reduce porosity.",
    "images": [
      "/assets/components/valves.png"
    ],
    "x": 30,
    "y": 20,
    "mapId": 1,
    "areas": [
      {
        "left": 31.39389229543999,
        "top": 33.39285405022781,
        "width": 5.880522378109582,
        "height": 14.249998912811364,
        "type": "box"
      }
    ]
  },
  {
    "name": "Quench Tank / Fan Cooler",
    "function": "Cools the cast part after it is extracted from the die.",
    "images": [
      "/assets/components/quench-tank.png",
      "/assets/components/quench-tank2.png",
      "/assets/components/fan cooler.png"
    ],
    "x": 50,
    "y": 50,
    "mapId": 1,
    "areas": [
      {
        "left": 46.67968365829453,
        "top": 51.5,
        "width": 14.973957738321715,
        "height": 15.75,
        "type": "box"
      }
    ]
  },
  {
    "name": "Hydraulics Core (Moving Cores)",
    "function": "Hydraulic cylinders used to move cores in and out of the die cavity.",
    "images": [
      "/assets/components/moving-cores.mp4"
    ],
    "x": 50,
    "y": 50,
    "mapId": 1,
    "areas": []
  }
].sort((a, b) => a.name.localeCompare(b.name));
