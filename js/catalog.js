// Global product catalog for OSWAL GIFT N STATIONERY.
// Single source of truth for categories, series and SKUs.
// This is pure data; UI and cart logic read from here.

window.OswalCatalog = [
  {
    id: 'report-cover-files',
    title: 'Report cover files',
    groups: [
      {
        title: 'Strip file',
        items: [
          {
            name: 'Strip File',
            spec: 'CL10 (Ikon), CL12, CL22, CL286 | A4/FC | 0.10mm, 0.12mm, 0.22mm, 0.32mm | 10/1500/Ctn, 10/1300/Ctn, 10/1000/Ctn, 10/180/720/Ctn | Clear',
          },
        ],
      },
      { title: 'L folder', items: [{ name: 'L Folder' }] },
      { title: 'Report file', items: [{ name: 'Report File' }] },
      { title: 'Flat file', items: [{ name: 'Flat File' }] },
      { title: 'Swing grip file', items: [{ name: 'Swing Grip File' }] },
      { title: 'Slide bar file', items: [{ name: 'Slide Bar File' }] },
      { title: 'Rigid files', items: [{ name: 'Rigid File' }] },
    ],
  },

  {
    id: 'sheet-protectors',
    title: 'Sheet protectors',
    groups: [
      { title: 'Sheet protectors', items: [{ name: 'Sheet Protector' }] },
      { title: '10 cards', items: [{ name: '10 Cards Sheet Protector' }] },
    ],
  },

  {
    id: 'clip-files-series',
    title: 'Clip files series',
    groups: [
      { title: 'Punchless clip files', items: [{ name: 'Punchless Clip File' }] },
      { title: 'Spring clip files', items: [{ name: 'Spring Clip File' }] },
      { title: 'Ring binders', items: [{ name: 'Ring Binder' }] },
      { title: 'Dual clip files', items: [{ name: 'Dual Clip File' }] },
    ],
  },

  {
    id: 'clear-books-series',
    title: 'Clear books series',
    groups: [
      {
        title: 'Display Book',
        items: [
          { sku: 'CL10', size: 'A4/FC', spec: '10 Pocket Display Book', packing: '24/192/Ctn' },
          { sku: 'CL20', size: 'A4/FC', spec: '20 Pocket Display Book', packing: '12/144/Ctn' },
          { sku: 'CL30', size: 'A4/FC', spec: '30 Pocket Display Book', packing: '12/120/Ctn' },
          { sku: 'CL40', size: 'A4/FC', spec: '40 Pocket Display Book', packing: '12/96/Ctn' },
          { sku: 'CL60', size: 'A4/FC', spec: '60 Pocket Display Book', packing: '12/72/Ctn' },
          { sku: 'CL80', size: 'A4/FC', spec: '80 Pocket Display Book with Tr. Case', packing: '6/24/Ctn' },
          { sku: 'CL100', size: 'A4/FC', spec: '100 Pocket Display Book with Tr. Case', packing: '6/24/Ctn' },
        ],
      },
      {
        title: 'B4 Certificate File',
        items: [
          { sku: 'CL772', size: 'B4', spec: '20 Display Pockets', packing: '50/100' },
        ],
      },
      {
        title: 'A3 Designer Display Book',
        items: [
          { sku: 'CL10', size: 'A3', spec: '10 Display Pocket', packing: '12/96/Ctn' },
          { sku: 'CL20', size: 'A3', spec: '20 Display Pocket', packing: '12/72/Ctn' },
          { sku: 'CL30', size: 'A3', spec: '30 Display Pocket', packing: '12/72/Ctn' },
          { sku: 'CL40', size: 'A3', spec: '40 Display Pocket', packing: '12/48/Ctn' },
        ],
      },
      {
        title: 'B4 PP Certificate File / Zip Closure',
        items: [
          {
            sku: 'FULLSCAPE-ZIP',
            size: 'B4/FC',
            spec: 'Full Scape PP Display File Zip Closure (10)',
            packing: '25/100/Ctn',
          },
          { sku: 'CL-CF20', size: 'B4', spec: 'PP Certificate File', packing: '25/100/Ctn' },
          { sku: 'CL-CF30', size: 'B4', spec: 'PP Certificate File', packing: '25/100/Ctn' },
          { sku: 'CL-CF40', size: 'B4', spec: 'PP Certificate File', packing: '25/100/Ctn' },
        ],
      },
    ],
  },

  {
    id: 'visiting-card-holders',
    title: 'Visiting card holders series',
    groups: [
      {
        title: 'Albums',
        items: [
          { sku: 'CL40K', spec: '40 cards album' },
          { sku: 'CL120K', spec: '120 cards album' },
          { sku: 'CL240K', spec: '240 cards album' },
          { sku: 'CL480K', spec: '480 cards album' },
          { sku: 'CL600', spec: '600 cards album' },
        ],
      },
    ],
  },

  {
    id: 'button-bags-series',
    title: 'Button bags series',
    groups: [
      {
        title: 'Stitched button bags',
        items: [
          { sku: 'CL303CHQ', notes: 'Needs WhatsApp image' },
          { sku: 'CL503A3', notes: 'Needs WhatsApp image' },
          { sku: 'CL603F', notes: 'Image present in drive' },
          { sku: 'CL703FT', notes: 'Needs WhatsApp image' },
          { sku: 'CL803F', notes: 'Needs WhatsApp image' },
          { sku: 'CL903F', notes: 'Needs WhatsApp image' },
          { sku: 'CL605F', notes: 'Image present in drive' },
          { sku: 'IKON603ECO', notes: 'Needs WhatsApp image' },
        ],
      },
      {
        title: 'Envelope bags',
        items: [
          {
            sku: 'C114F',
            notes: 'Use button image from CL119F; remove colours card',
          },
          {
            sku: 'CL119F',
            notes: 'Patchwork reference for C114F',
          },
        ],
      },
      {
        title: 'Printed button bags',
        items: [
          { sku: 'CL801' }, { sku: 'CL802' }, { sku: 'CL804F' }, { sku: 'CL805F' },
          { sku: 'CL1000F' }, { sku: 'CL1027F' }, { sku: 'CL1032F' }, { sku: 'CL1034F' },
          { sku: 'CL1041F' }, { sku: 'CL1042F' }, { sku: 'CL1043F' }, { sku: 'CL1044F' },
          { sku: 'CL2000F' }, { sku: 'CL2001F' }, { sku: 'CL2002F' }, { sku: 'CL2003F' },
          { sku: 'CL2004F' }, { sku: 'CL2005F' }, { sku: 'CL2029F' }, { sku: 'CL2030F' },
          { sku: 'CL2401F' }, { sku: 'CL2402F' }, { sku: 'CL3000F' }, { sku: 'CL3020F' },
          { sku: 'CL3021F' }, { sku: 'CL3022F' }, { sku: 'CL3026F' }, { sku: 'CL4000F' },
          { sku: 'CL5000F' },
        ],
      },
      {
        title: 'Double pocket bags',
        items: [
          { sku: 'CL211F' },
          { sku: 'CL212F' },
          { sku: 'CL236F' },
        ],
      },
      {
        title: 'Premium button bags',
        items: [
          { sku: 'CL402F' },
          { sku: 'CL408F' },
          { sku: 'CL410' },
        ],
      },
    ],
  },

  {
    id: 'zipper-bag-series',
    title: 'Zipper bag series',
    groups: [
      {
        title: 'PP zipper bags',
        items: [
          { sku: 'CLP53' },
          { sku: 'CLP54' },
          { sku: 'CLP55' },
          { sku: 'CLP56' },
          { sku: 'CLP57' },
        ],
      },
      {
        title: 'PVC clear zipper bags',
        items: [{ name: 'PVC Clear Zipper Bag' }],
      },
      {
        title: 'Satin zipper bags',
        items: [{ name: 'Satin Zipper Bag' }],
      },
      {
        title: 'Mesh zipper bags',
        items: [{ name: 'Mesh Zipper Bag' }],
      },
    ],
  },

  {
    id: 'documents-bags-expanding-files',
    title: 'Documents Bag / Expanding Files Series',
    groups: [
      {
        title: 'Expanding files',
        items: [
          { sku: 'CL813F' },
          { sku: 'CL1212F' },
          { sku: 'CL8821', size: 'A4/FC' },
          { sku: 'CL8065F' },
          { sku: 'CL6016F' },
          { sku: 'CL6018', size: 'A4/FC' },
          { sku: 'CL6026F' },
          { sku: 'CL6028F' },
        ],
      },
      {
        title: 'Expanding wallets',
        items: [
          { sku: 'CL8057A', spec: '5 pockets' },
          { sku: 'CL8071A', spec: '5 pockets' },
          { sku: 'CL816A', spec: '6 pockets' },
        ],
      },
      {
        title: 'Cheque book expanding bags',
        items: [
          { sku: 'CL4406' },
          { sku: 'CL4409' },
        ],
      },
      {
        title: 'Document case FC',
        items: [{ sku: 'CL812F' }],
      },
    ],
  },

  {
    id: 'index-seperators-series',
    title: 'Index/Seperators series',
    groups: [
      {
        title: 'PP colours separators with index tabs',
        items: [{ sku: 'CL010' }],
      },
      {
        title: 'PP white index',
        items: [
          { sku: 'WHITE-1-5', spec: '1 to 5' },
          { sku: 'WHITE-1-10', spec: '1 to 10' },
          { sku: 'WHITE-1-12', spec: '1 to 12' },
          { sku: 'WHITE-1-15', spec: '1 to 15' },
          { sku: 'WHITE-1-20', spec: '1 to 20' },
          { sku: 'WHITE-1-31', spec: '1 to 31' },
          { sku: 'WHITE-A-Z', spec: 'A to Z' },
        ],
      },
    ],
  },

  {
    id: 'paper-board-files',
    title: 'Paper board files series',
    groups: [
      {
        title: 'Double side PP coated lever arch clip file',
        items: [{ sku: 'CL556F' }],
      },
      {
        title: 'PP / printed board lamination ring binder',
        items: [
          { sku: 'CL309A' },
          { sku: 'CL309F' },
        ],
      },
      {
        title: 'PP / printed board lamination long lever clip file',
        items: [
          { sku: 'CL308A' },
          { sku: 'CL308F' },
        ],
      },
    ],
  },

  {
    id: 'display-solution-products',
    title: 'Display solution products series',
    groups: [
      {
        title: 'PVC clear card case',
        items: [
          { sku: 'CL201', variant: 'T' },
          { sku: 'CL202', variant: 'T' },
          { sku: 'CL203', variant: 'B' },
          { sku: 'CL204', variant: 'B' },
        ],
      },
      {
        title: 'Magnetic display products',
        items: [
          { name: 'Magnetic card case' },
          { name: 'Info folder (panel)' },
          { name: 'Magnetic panel folder' },
          { name: 'Wall unit bracket with folders' },
          { name: 'Wall hangers' },
          { name: 'Peel and stick sheet' },
          { name: 'Desk organizer' },
        ],
      },
    ],
  },

  {
    id: 'leatherite-executive-bags',
    title: 'Leatherite bags series',
    groups: [
      {
        title: 'Leatherite bags',
        items: [{ name: 'Leatherite bags' }],
      },
    ],
  },

  {
    id: 'pp-leatherite-conference-files',
    title: 'PP & Leatherite conference files / Hotel files',
    groups: [
      {
        title: 'Presentation files PP',
        items: [{ sku: 'CL261A' }],
      },
    ],
  },

  {
    id: 'stationery-products',
    title: 'Stationery products',
    groups: [
      { title: 'Magazine racks', items: [
        { name: 'Single column magazine rack' },
        { name: '4 column magazine rack' },
      ]},
      { title: 'Trays', items: [
        { name: '2 tier tray' },
        { name: '3 tier tray' },
      ]},
    ],
  },
];

