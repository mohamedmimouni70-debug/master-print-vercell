/**
 * ماستر برينت - تدبير الصندوق والمخزون والطلبيات
 * لغة عربية خالصة واستخدام "درهم" وتنسيق متقن
 */

// ==============================================
// كتالوج أنواع الأكياس والقياسات المتوفرة لكل نوع
// ==============================================
const SAC_CATALOG = {
  "Non Tissé - Poignée": [
    "25cm x 20cm",
    "29cm x 22cm",
    "35cm x 25cm",
    "37cm x 30cm",
    "35cm x 40cm x 10cm",
    "50cm x 40cm x 10cm",
    "50cm x 50cm x 10cm"
  ],
  "Non Tissé - Anses": [
    "30cm x 30cm",
    "30cm x 30cm x 10cm",
    "39cm x 40cm",
    "35cm x 40cm x 10cm",
    "40cm x 40cm x 10cm",
    "45cm x 40cm x 10cm",
    "50cm x 40cm x 10cm",
    "50cm x 50cm x 10cm",
    "60cm x 50cm x 10cm"
  ],
  "Kraft": [
    "18x24x8 cm",
    "22x28x10 cm",
    "25x35x10 cm",
    "28x38x12 cm",
    "32x42x12 cm",
    "42x50x14 cm"
  ],
  "Kraft - Torsadé": [
    "18x24x8 cm",
    "22x28x10 cm",
    "25x35x10 cm",
    "28x38x12 cm",
    "32x42x12 cm",
    "42x50x14 cm"
  ],
  "Kraft - Plat": [
    "18x24x8 cm",
    "22x28x10 cm",
    "25x35x10 cm",
    "28x38x12 cm",
    "32x42x12 cm",
    "42x50x14 cm"
  ],
  "Papier Luxe": [
    "15x20x7 cm",
    "20x25x10 cm",
    "25x32x11 cm",
    "32x40x12 cm",
    "42x50x14 cm",
    "54x45x14 cm"
  ],
  "Carton": [
    "20x15x8 cm",
    "25x20x10 cm",
    "30x25x10 cm",
    "35x30x12 cm",
    "25x35x10 cm",
    "32x42x12 cm"
  ],
  "Carton - Boîte valise": [
    "20x15x8 cm",
    "25x20x10 cm",
    "30x25x10 cm",
    "35x30x12 cm",
    "25x35x10 cm",
    "32x42x12 cm"
  ],
  "Carton - Caisse américaine": [
    "20x15x15 cm",
    "25x20x15 cm",
    "30x25x20 cm",
    "35x30x25 cm",
    "40x35x30 cm",
    "50x40x35 cm"
  ],
  "Plastique": [
    "25x35 cm",
    "30x40 cm",
    "35x45 cm",
    "40x50 cm",
    "45x55 cm",
    "50x60 cm"
  ],
  "Ruban": [
    "10 mm",
    "15 mm",
    "20 mm",
    "25 mm",
    "30 mm",
    "40 mm"
  ]
};

// ==============================================
// تسعيرة شراء الأكياس والتغليف الافتراضية خام (درهم/حبة أو درهم/متر)
// ==============================================
const SAC_DEFAULT_COSTS = {
  "Non Tissé - Poignée": {
    "25cm x 20cm": 0.25,
    "29cm x 22cm": 0.30,
    "35cm x 25cm": 0.45,
    "37cm x 30cm": 0.55,
    "35cm x 40cm x 10cm": 0.68,
    "50cm x 40cm x 10cm": 0.90,
    "50cm x 50cm x 10cm": 1.10
  },
  "Non Tissé - Anses": {
    "30cm x 30cm": 0.53,
    "30cm x 30cm x 10cm": 0.58,
    "39cm x 40cm": 0.75,
    "35cm x 40cm x 10cm": 0.78,
    "40cm x 40cm x 10cm": 0.86,
    "45cm x 40cm x 10cm": 0.95,
    "50cm x 40cm x 10cm": 1.00,
    "50cm x 50cm x 10cm": 1.15,
    "60cm x 50cm x 10cm": 1.45
  },
  "Kraft": {
    "18x24x8 cm": 0.75,
    "22x28x10 cm": 0.95,
    "25x35x10 cm": 1.15,
    "28x38x12 cm": 1.35,
    "32x42x12 cm": 1.60,
    "42x50x14 cm": 2.20
  },
  "Kraft - Torsadé": {
    "18x24x8 cm": 0.85,
    "22x28x10 cm": 1.05,
    "25x35x10 cm": 1.25,
    "28x38x12 cm": 1.45,
    "32x42x12 cm": 1.70,
    "42x50x14 cm": 2.30
  },
  "Kraft - Plat": {
    "18x24x8 cm": 0.70,
    "22x28x10 cm": 0.90,
    "25x35x10 cm": 1.10,
    "28x38x12 cm": 1.30,
    "32x42x12 cm": 1.50,
    "42x50x14 cm": 2.10
  },
  "Papier Luxe": {
    "15x20x7 cm": 2.50,
    "20x25x10 cm": 3.20,
    "25x32x11 cm": 3.90,
    "32x40x12 cm": 4.80,
    "42x50x14 cm": 5.90,
    "54x45x14 cm": 7.20
  },
  "Carton": {
    "20x15x8 cm": 1.80,
    "25x20x10 cm": 2.30,
    "30x25x10 cm": 2.80,
    "35x30x12 cm": 3.50,
    "25x35x10 cm": 2.90,
    "32x42x12 cm": 3.80
  },
  "Carton - Boîte valise": {
    "20x15x8 cm": 1.90,
    "25x20x10 cm": 2.40,
    "30x25x10 cm": 2.90,
    "35x30x12 cm": 3.60,
    "25x35x10 cm": 3.00,
    "32x42x12 cm": 3.90
  },
  "Carton - Caisse américaine": {
    "20x15x15 cm": 1.80,
    "25x20x15 cm": 2.30,
    "30x25x20 cm": 2.80,
    "35x30x25 cm": 3.50,
    "40x35x30 cm": 4.50,
    "50x40x35 cm": 5.80
  },
  "Plastique": {
    "25x35 cm": 0.40,
    "30x40 cm": 0.55,
    "35x45 cm": 0.70,
    "40x50 cm": 0.85,
    "45x55 cm": 1.05,
    "50x60 cm": 1.30
  },
  "Ruban": {
    "10 mm": 0.20,
    "15 mm": 0.30,
    "20 mm": 0.40,
    "25 mm": 0.50,
    "30 mm": 0.65,
    "40 mm": 0.85
  }
};

const AUTHENTIC_DATABASE = {
    "orders":  [
                   {
                       "id":  "طلب-2026-100",
                       "clientName":  "AHMED GTARNI",
                       "clientPhone":  "0605153186",
                       "clientCity":  "وجدة",
                       "clientGender":  "male",
                       "type":  "serigraphie",
                       "sacCategory":  "Non Tissé",
                       "handleType":  "poignee",
                       "kraftHandle":  "",
                       "cartonType":  "",
                       "plastiqueColor":  "",
                       "sacSize":  "29cm x 22cm",
                       "designation":  "Non Tissé (Poignée - 29cm x 22cm)",
                       "impressionName":  "",
                       "impressionSize":  "",
                       "subSupplier":  "",
                       "subCost":  0,
                       "subPrice":  0,
                       "quantity":  50,
                       "unitPrice":  2,
                       "buyPrice":  0.3,
                       "netProfit":  85,
                       "colorsCount":  "1",
                       "extraColorPrice":  0,
                       "totalAmount":  100,
                       "avanceAmount":  100,
                       "resteAmount":  0,
                       "deliveryType":  "direct",
                       "localLivreur":  "",
                       "localDeliveryFee":  0,
                       "ozoneTracking":  "",
                       "ozoneFees":  0,
                       "ozoneTransferStatus":  "",
                       "status":  "livree",
                       "notes":  "",
                       "date":  "2026-09-17",
                       "autoCaisseLogged":  true,
                       "bagSource":  "supplier",
                       "bagCost":  15,
                       "autoCaisseBuyLogged":  true,
                       "stockItemId":  "",
                       "isStockClient":  false,
                       "deliveredQuantity":  50,
                       "remainingQuantity":  0,
                       "deliveries":  [

                                      ]
                   },
                   {
                       "id":  "طلب-2026-101",
                       "clientName":  "MR OTMAN",
                       "clientPhone":  "0707076650",
                       "clientCity":  "AGADIR",
                       "clientGender":  "male",
                       "type":  "serigraphie",
                       "sacCategory":  "Impression Seule",
                       "handleType":  "",
                       "kraftHandle":  "",
                       "cartonType":  "",
                       "plastiqueColor":  "",
                       "sacSize":  "43cm x 32cm",
                       "designation":  "طباعة فقط: LEYAN PARIS PLASTIQUE ECOM (43cm x 32cm)",
                       "impressionName":  "LEYAN PARIS PLASTIQUE ECOM",
                       "impressionSize":  "43cm x 32cm",
                       "subSupplier":  "",
                       "subCost":  0,
                       "subPrice":  0,
                       "quantity":  2000,
                       "unitPrice":  0.4,
                       "buyPrice":  0,
                       "netProfit":  800,
                       "colorsCount":  "1",
                       "extraColorPrice":  0,
                       "totalAmount":  800,
                       "avanceAmount":  800,
                       "resteAmount":  0,
                       "deliveryType":  "direct",
                       "localLivreur":  "",
                       "localDeliveryFee":  0,
                       "ozoneTracking":  "",
                       "ozoneFees":  0,
                       "ozoneTransferStatus":  "",
                       "status":  "livree",
                       "notes":  "",
                       "date":  "2026-09-17",
                       "autoCaisseLogged":  true,
                       "bagSource":  "external",
                       "bagCost":  0,
                       "autoCaisseBuyLogged":  false,
                       "stockItemId":  "",
                       "isStockClient":  false,
                       "deliveredQuantity":  2000,
                       "remainingQuantity":  0,
                       "deliveries":  [

                                      ]
                   },
                   {
                       "id":  "طلب-2026-102",
                       "clientName":  "MR OTMAN",
                       "clientPhone":  "0707076650",
                       "clientCity":  "AGADIR",
                       "clientGender":  "male",
                       "type":  "serigraphie",
                       "sacCategory":  "Impression Seule",
                       "handleType":  "",
                       "kraftHandle":  "",
                       "cartonType":  "",
                       "plastiqueColor":  "",
                       "sacSize":  "50cm x 40cm",
                       "designation":  "طباعة فقط: LEYAN PARIS PLASTIQUE ECOM (50cm x 40cm)",
                       "impressionName":  "LEYAN PARIS PLASTIQUE ECOM",
                       "impressionSize":  "50cm x 40cm",
                       "subSupplier":  "",
                       "subCost":  0,
                       "subPrice":  0,
                       "quantity":  500,
                       "unitPrice":  0.6,
                       "buyPrice":  0,
                       "netProfit":  300,
                       "colorsCount":  "1",
                       "extraColorPrice":  0,
                       "totalAmount":  300,
                       "avanceAmount":  300,
                       "resteAmount":  0,
                       "deliveryType":  "direct",
                       "localLivreur":  "",
                       "localDeliveryFee":  0,
                       "ozoneTracking":  "",
                       "ozoneFees":  0,
                       "ozoneTransferStatus":  "",
                       "status":  "livree",
                       "notes":  "",
                       "date":  "2026-09-17",
                       "autoCaisseLogged":  true,
                       "bagSource":  "external",
                       "bagCost":  0,
                       "autoCaisseBuyLogged":  false,
                       "stockItemId":  "",
                       "isStockClient":  false,
                       "deliveredQuantity":  500,
                       "remainingQuantity":  0,
                       "deliveries":  [

                                      ]
                   },
                   {
                       "id":  "طلب-2026-103",
                       "clientName":  "MR OTMAN",
                       "clientPhone":  "0707076650",
                       "clientCity":  "AGADIR",
                       "clientGender":  "male",
                       "type":  "serigraphie",
                       "sacCategory":  "Impression Seule",
                       "handleType":  "",
                       "kraftHandle":  "",
                       "cartonType":  "",
                       "plastiqueColor":  "",
                       "sacSize":  "cm47cm/32cm/22",
                       "designation":  "طباعة فقط: LEYAN PARIS CAISSE AMERICAIN (cm47cm/32cm/22)",
                       "impressionName":  "LEYAN PARIS CAISSE AMERICAIN",
                       "impressionSize":  "cm47cm/32cm/22",
                       "subSupplier":  "",
                       "subCost":  0,
                       "subPrice":  0,
                       "quantity":  100,
                       "unitPrice":  0.8,
                       "buyPrice":  0,
                       "netProfit":  80,
                       "colorsCount":  "1",
                       "extraColorPrice":  0,
                       "totalAmount":  80,
                       "avanceAmount":  80,
                       "resteAmount":  0,
                       "deliveryType":  "direct",
                       "localLivreur":  "",
                       "localDeliveryFee":  0,
                       "ozoneTracking":  "",
                       "ozoneFees":  0,
                       "ozoneTransferStatus":  "",
                       "status":  "livree",
                       "notes":  "",
                       "date":  "2026-09-17",
                       "autoCaisseLogged":  true,
                       "bagSource":  "external",
                       "bagCost":  0,
                       "autoCaisseBuyLogged":  false,
                       "stockItemId":  "",
                       "isStockClient":  false,
                       "deliveredQuantity":  100,
                       "remainingQuantity":  0,
                       "deliveries":  [

                                      ]
                   },
                   {
                       "id":  "طلب-2026-104",
                       "clientName":  "MR OTMAN",
                       "clientPhone":  "0707076650",
                       "clientCity":  "AGADIR",
                       "clientGender":  "male",
                       "type":  "serigraphie",
                       "sacCategory":  "Impression Seule",
                       "handleType":  "",
                       "kraftHandle":  "",
                       "cartonType":  "",
                       "plastiqueColor":  "",
                       "sacSize":  "30cm/15cm/15cm",
                       "designation":  "طباعة فقط: LEYAN PARIS CAISSE AMERICAIN (30cm/15cm/15cm)",
                       "impressionName":  "LEYAN PARIS CAISSE AMERICAIN",
                       "impressionSize":  "30cm/15cm/15cm",
                       "subSupplier":  "",
                       "subCost":  0,
                       "subPrice":  0,
                       "quantity":  200,
                       "unitPrice":  0.8,
                       "buyPrice":  0,
                       "netProfit":  160,
                       "colorsCount":  "1",
                       "extraColorPrice":  0,
                       "totalAmount":  160,
                       "avanceAmount":  160,
                       "resteAmount":  0,
                       "deliveryType":  "direct",
                       "localLivreur":  "",
                       "localDeliveryFee":  0,
                       "ozoneTracking":  "",
                       "ozoneFees":  0,
                       "ozoneTransferStatus":  "",
                       "status":  "livree",
                       "notes":  "",
                       "date":  "2026-09-17",
                       "autoCaisseLogged":  true,
                       "bagSource":  "external",
                       "bagCost":  0,
                       "autoCaisseBuyLogged":  false,
                       "stockItemId":  "",
                       "isStockClient":  false,
                       "deliveredQuantity":  200,
                       "remainingQuantity":  0,
                       "deliveries":  [

                                      ]
                   },
                   {
                       "id":  "طلب-2026-105",
                       "clientName":  "MR OTMAN",
                       "clientPhone":  "0707076650",
                       "clientCity":  "AGADIR",
                       "clientGender":  "male",
                       "type":  "serigraphie",
                       "sacCategory":  "Impression Seule",
                       "handleType":  "",
                       "kraftHandle":  "",
                       "cartonType":  "",
                       "plastiqueColor":  "",
                       "sacSize":  "30cm/20cm/25cm",
                       "designation":  "طباعة فقط: LEYAN PARIS CAISSE AMERICAIN (30cm/20cm/25cm)",
                       "impressionName":  "LEYAN PARIS CAISSE AMERICAIN",
                       "impressionSize":  "30cm/20cm/25cm",
                       "subSupplier":  "",
                       "subCost":  0,
                       "subPrice":  0,
                       "quantity":  200,
                       "unitPrice":  0.8,
                       "buyPrice":  0,
                       "netProfit":  160,
                       "colorsCount":  "1",
                       "extraColorPrice":  0,
                       "totalAmount":  160,
                       "avanceAmount":  160,
                       "resteAmount":  0,
                       "deliveryType":  "direct",
                       "localLivreur":  "",
                       "localDeliveryFee":  0,
                       "ozoneTracking":  "",
                       "ozoneFees":  0,
                       "ozoneTransferStatus":  "",
                       "status":  "livree",
                       "notes":  "",
                       "date":  "2026-09-17",
                       "autoCaisseLogged":  true,
                       "bagSource":  "external",
                       "bagCost":  0,
                       "autoCaisseBuyLogged":  false,
                       "stockItemId":  "",
                       "isStockClient":  false,
                       "deliveredQuantity":  200,
                       "remainingQuantity":  0,
                       "deliveries":  [

                                      ]
                   },
                   {
                       "id":  "طلب-2026-106",
                       "clientName":  "MR OTMAN",
                       "clientPhone":  "0707076650",
                       "clientCity":  "AGADIR",
                       "clientGender":  "male",
                       "type":  "serigraphie",
                       "sacCategory":  "Impression Seule",
                       "handleType":  "",
                       "kraftHandle":  "",
                       "cartonType":  "",
                       "plastiqueColor":  "",
                       "sacSize":  "30cm/30cm/8cm",
                       "designation":  "طباعة فقط: LKHIR NTMAZIRT BOIT VALISE NOIR (30cm/30cm/8cm)",
                       "impressionName":  "LKHIR NTMAZIRT BOIT VALISE NOIR",
                       "impressionSize":  "30cm/30cm/8cm",
                       "subSupplier":  "",
                       "subCost":  0,
                       "subPrice":  0,
                       "quantity":  100,
                       "unitPrice":  0.8,
                       "buyPrice":  0,
                       "netProfit":  80,
                       "colorsCount":  "1",
                       "extraColorPrice":  0,
                       "totalAmount":  80,
                       "avanceAmount":  80,
                       "resteAmount":  0,
                       "deliveryType":  "direct",
                       "localLivreur":  "",
                       "localDeliveryFee":  0,
                       "ozoneTracking":  "",
                       "ozoneFees":  0,
                       "ozoneTransferStatus":  "",
                       "status":  "livree",
                       "notes":  "",
                       "date":  "2026-09-17",
                       "autoCaisseLogged":  true,
                       "bagSource":  "external",
                       "bagCost":  0,
                       "autoCaisseBuyLogged":  false,
                       "stockItemId":  "",
                       "isStockClient":  false,
                       "deliveredQuantity":  100,
                       "remainingQuantity":  0,
                       "deliveries":  [

                                      ]
                   },
                   {
                       "id":  "طلب-2026-107",
                       "clientName":  "PARA RICH",
                       "clientPhone":  "0673501593",
                       "clientCity":  "AGADIR",
                       "clientGender":  "male",
                       "type":  "serigraphie",
                       "sacCategory":  "Non Tissé",
                       "handleType":  "poignee",
                       "kraftHandle":  "",
                       "cartonType":  "",
                       "plastiqueColor":  "",
                       "sacSize":  "29cm x 22cm",
                       "designation":  "Non Tissé (Poignée - 29cm x 22cm)",
                       "impressionName":  "",
                       "impressionSize":  "",
                       "subSupplier":  "",
                       "subCost":  0,
                       "subPrice":  0,
                       "quantity":  2000,
                       "unitPrice":  0.65,
                       "buyPrice":  0.3,
                       "netProfit":  700.0000000000001,
                       "colorsCount":  "1",
                       "extraColorPrice":  0,
                       "totalAmount":  1300,
                       "avanceAmount":  1300,
                       "resteAmount":  0,
                       "deliveryType":  "direct",
                       "localLivreur":  "",
                       "localDeliveryFee":  0,
                       "ozoneTracking":  "",
                       "ozoneFees":  0,
                       "ozoneTransferStatus":  "",
                       "status":  "livree",
                       "notes":  "",
                       "date":  "2026-09-22",
                       "autoCaisseLogged":  true,
                       "bagSource":  "supplier",
                       "bagCost":  600,
                       "autoCaisseBuyLogged":  true,
                       "stockItemId":  "",
                       "isStockClient":  false,
                       "deliveredQuantity":  2000,
                       "remainingQuantity":  0,
                       "deliveries":  [

                                      ],
                       "countdown":  {
                                         "enabled":  true,
                                         "durationDays":  20,
                                         "durationHours":  0,
                                         "durationMinutes":  0,
                                         "durationSeconds":  0,
                                         "startDate":  "2026-09-25T14:37:23.225Z",
                                         "targetDate":  "2026-10-15T14:37:23.225Z",
                                         "status":  "running",
                                         "autoNotify":  true
                                     }
                   },
                   {
                       "id":  "طلب-2026-108",
                       "clientName":  "CLOTHING PALACE",
                       "clientPhone":  "0620684721",
                       "clientCity":  "AGADIR",
                       "clientGender":  "male",
                       "type":  "serigraphie",
                       "sacCategory":  "Non Tissé",
                       "handleType":  "anses",
                       "kraftHandle":  "",
                       "cartonType":  "",
                       "plastiqueColor":  "",
                       "sacSize":  "50cm x 40cm x 10cm",
                       "designation":  "Non Tissé (Ance - 50cm x 40cm x 10cm)",
                       "impressionName":  "",
                       "impressionSize":  "",
                       "subSupplier":  "",
                       "subCost":  0,
                       "subPrice":  0,
                       "quantity":  500,
                       "unitPrice":  1.75,
                       "buyPrice":  1,
                       "netProfit":  375,
                       "colorsCount":  "1",
                       "extraColorPrice":  0,
                       "totalAmount":  875,
                       "avanceAmount":  875,
                       "resteAmount":  0,
                       "deliveryType":  "direct",
                       "localLivreur":  "",
                       "localDeliveryFee":  0,
                       "ozoneTracking":  "",
                       "ozoneFees":  0,
                       "ozoneTransferStatus":  "",
                       "status":  "livree",
                       "notes":  "",
                       "date":  "2026-09-22",
                       "autoCaisseLogged":  true,
                       "bagSource":  "supplier",
                       "bagCost":  500,
                       "autoCaisseBuyLogged":  true,
                       "stockItemId":  "",
                       "isStockClient":  false,
                       "deliveredQuantity":  500,
                       "remainingQuantity":  0,
                       "deliveries":  [

                                      ]
                   },
                   {
                       "id":  "طلب-2026-109",
                       "clientName":  "CLOTHING PALACE",
                       "clientPhone":  "0620684721",
                       "clientCity":  "AGADIR",
                       "clientGender":  "male",
                       "type":  "serigraphie",
                       "sacCategory":  "Non Tissé",
                       "handleType":  "anses",
                       "kraftHandle":  "",
                       "cartonType":  "",
                       "plastiqueColor":  "",
                       "sacSize":  "35cm x 40cm x 10cm",
                       "designation":  "Non Tissé (Ance - 35cm x 40cm x 10cm)",
                       "impressionName":  "",
                       "impressionSize":  "",
                       "subSupplier":  "",
                       "subCost":  0,
                       "subPrice":  0,
                       "quantity":  500,
                       "unitPrice":  0,
                       "buyPrice":  0.78,
                       "netProfit":  -390,
                       "colorsCount":  "1",
                       "extraColorPrice":  0,
                       "totalAmount":  750,
                       "avanceAmount":  750,
                       "resteAmount":  0,
                       "deliveryType":  "direct",
                       "localLivreur":  "",
                       "localDeliveryFee":  0,
                       "ozoneTracking":  "",
                       "ozoneFees":  0,
                       "ozoneTransferStatus":  "",
                       "status":  "livree",
                       "notes":  "",
                       "date":  "2026-09-22",
                       "autoCaisseLogged":  true,
                       "bagSource":  "supplier",
                       "bagCost":  390,
                       "autoCaisseBuyLogged":  true,
                       "stockItemId":  "",
                       "isStockClient":  false,
                       "deliveredQuantity":  500,
                       "remainingQuantity":  0,
                       "deliveries":  [

                                      ]
                   },
                   {
                       "id":  "طلب-2026-110",
                       "clientName":  "MANAHIL ABOU IMRAN",
                       "clientPhone":  "0633978065",
                       "clientCity":  "AGADIR",
                       "clientGender":  "male",
                       "type":  "serigraphie",
                       "sacCategory":  "Non Tissé",
                       "handleType":  "anses",
                       "kraftHandle":  "",
                       "cartonType":  "",
                       "plastiqueColor":  "",
                       "sacSize":  "30cm x 30cm",
                       "designation":  "Non Tissé (Ance - 30cm x 30cm)",
                       "impressionName":  "",
                       "impressionSize":  "",
                       "subSupplier":  "",
                       "subCost":  0,
                       "subPrice":  0,
                       "quantity":  1000,
                       "unitPrice":  0,
                       "buyPrice":  0.53,
                       "netProfit":  -530,
                       "colorsCount":  "1",
                       "extraColorPrice":  0,
                       "totalAmount":  930,
                       "avanceAmount":  930,
                       "resteAmount":  0,
                       "deliveryType":  "direct",
                       "localLivreur":  "",
                       "localDeliveryFee":  0,
                       "ozoneTracking":  "",
                       "ozoneFees":  0,
                       "ozoneTransferStatus":  "",
                       "status":  "livree",
                       "notes":  "",
                       "date":  "2026-09-24",
                       "autoCaisseLogged":  true,
                       "bagSource":  "supplier",
                       "bagCost":  530,
                       "autoCaisseBuyLogged":  true,
                       "stockItemId":  "",
                       "isStockClient":  false,
                       "deliveredQuantity":  1000,
                       "remainingQuantity":  0,
                       "deliveries":  [

                                      ],
                       "countdown":  {
                                         "enabled":  true,
                                         "durationDays":  20,
                                         "durationHours":  0,
                                         "durationMinutes":  0,
                                         "durationSeconds":  0,
                                         "startDate":  "2026-09-26T17:03:43.730Z",
                                         "targetDate":  "2026-10-16T17:03:43.730Z",
                                         "status":  "running",
                                         "autoNotify":  true
                                     }
                   },
                   {
                       "id":  "طلب-2026-111",
                       "clientName":  "VENOM SHOP",
                       "clientPhone":  "0627814642",
                       "clientCity":  "AGADIR",
                       "clientGender":  "male",
                       "type":  "serigraphie",
                       "sacCategory":  "Non Tissé",
                       "handleType":  "anses",
                       "kraftHandle":  "",
                       "cartonType":  "",
                       "plastiqueColor":  "",
                       "sacSize":  "35cm x 40cm x 10cm",
                       "designation":  "Non Tissé (Ance - 35cm x 40cm x 10cm)",
                       "impressionName":  "",
                       "impressionSize":  "",
                       "subSupplier":  "",
                       "subCost":  0,
                       "subPrice":  0,
                       "quantity":  1000,
                       "unitPrice":  0,
                       "buyPrice":  0.78,
                       "netProfit":  -780,
                       "colorsCount":  "1",
                       "extraColorPrice":  0,
                       "totalAmount":  1230,
                       "avanceAmount":  0,
                       "resteAmount":  1230,
                       "deliveryType":  "direct",
                       "localLivreur":  "",
                       "localDeliveryFee":  0,
                       "ozoneTracking":  "",
                       "ozoneFees":  0,
                       "ozoneTransferStatus":  "",
                       "status":  "partielle",
                       "notes":  "",
                       "date":  "2026-09-24",
                       "autoCaisseLogged":  true,
                       "bagSource":  "supplier",
                       "bagCost":  780,
                       "autoCaisseBuyLogged":  true,
                       "stockItemId":  "",
                       "isStockClient":  true,
                       "deliveredQuantity":  0,
                       "remainingQuantity":  1000,
                       "deliveries":  [

                                      ]
                   },
                   {
                       "id":  "طلب-2026-112",
                       "clientName":  "AZ STORE",
                       "clientPhone":  "0661738799",
                       "clientCity":  "AGADIR",
                       "clientGender":  "male",
                       "type":  "serigraphie",
                       "sacCategory":  "Non Tissé",
                       "handleType":  "anses",
                       "kraftHandle":  "",
                       "cartonType":  "",
                       "plastiqueColor":  "",
                       "sacSize":  "39cm x 40cm",
                       "designation":  "Non Tissé (Ance - 39cm x 40cm)",
                       "impressionName":  "",
                       "impressionSize":  "",
                       "subSupplier":  "",
                       "subCost":  0,
                       "subPrice":  0,
                       "quantity":  500,
                       "unitPrice":  1.45,
                       "buyPrice":  0.75,
                       "netProfit":  350,
                       "colorsCount":  "1",
                       "extraColorPrice":  0,
                       "totalAmount":  725,
                       "avanceAmount":  725,
                       "resteAmount":  0,
                       "deliveryType":  "direct",
                       "localLivreur":  "",
                       "localDeliveryFee":  0,
                       "ozoneTracking":  "",
                       "ozoneFees":  0,
                       "ozoneTransferStatus":  "",
                       "status":  "livree",
                       "notes":  "",
                       "date":  "2026-09-25",
                       "autoCaisseLogged":  true,
                       "bagSource":  "supplier",
                       "bagCost":  375,
                       "autoCaisseBuyLogged":  true,
                       "stockItemId":  "",
                       "isStockClient":  false,
                       "deliveredQuantity":  500,
                       "remainingQuantity":  0,
                       "deliveries":  [

                                      ]
                   },
                   {
                       "id":  "طلب-2026-113",
                       "clientName":  "BRAHIML BIJOUX",
                       "clientPhone":  "0670374350",
                       "clientCity":  "AGADIR",
                       "clientGender":  "male",
                       "type":  "soustraitance",
                       "sacCategory":  "",
                       "handleType":  "",
                       "kraftHandle":  "",
                       "cartonType":  "",
                       "plastiqueColor":  "",
                       "sacSize":  "",
                       "designation":  "CARNET BOON",
                       "impressionName":  "",
                       "impressionSize":  "",
                       "subSupplier":  "ARIA IMP",
                       "subCost":  630,
                       "subPrice":  780,
                       "quantity":  30,
                       "unitPrice":  26,
                       "buyPrice":  21,
                       "netProfit":  150,
                       "colorsCount":  "مطبعة خارجية",
                       "extraColorPrice":  0,
                       "totalAmount":  780,
                       "avanceAmount":  780,
                       "resteAmount":  0,
                       "deliveryType":  "direct",
                       "localLivreur":  "",
                       "localDeliveryFee":  0,
                       "ozoneTracking":  "",
                       "ozoneFees":  0,
                       "ozoneTransferStatus":  "",
                       "status":  "livree",
                       "notes":  "",
                       "date":  "2026-09-26",
                       "autoCaisseLogged":  true,
                       "bagSource":  "supplier",
                       "bagCost":  630,
                       "autoCaisseBuyLogged":  true,
                       "stockItemId":  "",
                       "isStockClient":  false,
                       "deliveredQuantity":  30,
                       "remainingQuantity":  0,
                       "deliveries":  [

                                      ]
                   },
                   {
                       "id":  "طلب-2026-114",
                       "clientName":  "JARDIN D\u0027EDEN BEAUTY",
                       "clientPhone":  "0779593332",
                       "clientCity":  "casablanca",
                       "clientGender":  "female",
                       "type":  "serigraphie",
                       "sacCategory":  "Non Tissé",
                       "handleType":  "anses",
                       "kraftHandle":  "",
                       "cartonType":  "",
                       "plastiqueColor":  "",
                       "sacSize":  "39cm x 40cm",
                       "designation":  "Non Tissé (Ance - 39cm x 40cm)",
                       "impressionName":  "",
                       "impressionSize":  "",
                       "subSupplier":  "",
                       "subCost":  0,
                       "subPrice":  0,
                       "quantity":  50,
                       "unitPrice":  2.55,
                       "buyPrice":  0.75,
                       "netProfit":  89.99999999999999,
                       "colorsCount":  "1",
                       "extraColorPrice":  0,
                       "totalAmount":  130,
                       "avanceAmount":  130,
                       "resteAmount":  0,
                       "deliveryType":  "direct",
                       "localLivreur":  "",
                       "localDeliveryFee":  0,
                       "ozoneTracking":  "",
                       "ozoneFees":  0,
                       "ozoneTransferStatus":  "",
                       "status":  "livree",
                       "notes":  "",
                       "date":  "2026-09-29",
                       "autoCaisseLogged":  true,
                       "bagSource":  "supplier",
                       "bagCost":  37.5,
                       "autoCaisseBuyLogged":  true,
                       "stockItemId":  "",
                       "isStockClient":  false,
                       "deliveredQuantity":  50,
                       "remainingQuantity":  0,
                       "deliveries":  [

                                      ]
                   },
                   {
                       "id":  "طلب-2026-115",
                       "clientName":  "ZCOFEE OUJDA",
                       "clientPhone":  "0642202825",
                       "clientCity":  "OUJDA",
                       "clientGender":  "male",
                       "type":  "serigraphie",
                       "sacCategory":  "Carton",
                       "handleType":  "valise",
                       "kraftHandle":  "",
                       "cartonType":  "valise",
                       "plastiqueColor":  "",
                       "sacSize":  "11x11x5 black",
                       "designation":  "Carton (Boîte valise - 11x11x5 black)",
                       "impressionName":  "",
                       "impressionSize":  "",
                       "subSupplier":  "",
                       "subCost":  0,
                       "subPrice":  0,
                       "quantity":  150,
                       "unitPrice":  0,
                       "buyPrice":  1.95,
                       "netProfit":  -292.5,
                       "colorsCount":  "1",
                       "extraColorPrice":  0,
                       "totalAmount":  445,
                       "avanceAmount":  445,
                       "resteAmount":  0,
                       "deliveryType":  "direct",
                       "localLivreur":  "",
                       "localDeliveryFee":  0,
                       "ozoneTracking":  "",
                       "ozoneFees":  0,
                       "ozoneTransferStatus":  "",
                       "status":  "livree",
                       "notes":  "",
                       "date":  "2026-10-01",
                       "autoCaisseLogged":  true,
                       "bagSource":  "supplier",
                       "bagCost":  292.5,
                       "autoCaisseBuyLogged":  true,
                       "stockItemId":  "",
                       "isStockClient":  false,
                       "deliveredQuantity":  150,
                       "remainingQuantity":  0,
                       "deliveries":  [
                                          {
                                              "id":  "deliv_init_1790864992994",
                                              "date":  "2026-10-01",
                                              "quantity":  150,
                                              "paidAmount":  0,
                                              "deliveryType":  "direct",
                                              "notes":  "الدفعة الأولى عند تسجيل الطلبية"
                                          }
                                      ]
                   },
                   {
                       "id":  "طلب-2026-116",
                       "clientName":  "BLACK STREET",
                       "clientPhone":  "0673751574",
                       "clientCity":  "AGADIR",
                       "clientGender":  "male",
                       "type":  "serigraphie",
                       "sacCategory":  "Non Tissé",
                       "handleType":  "anses",
                       "kraftHandle":  "",
                       "cartonType":  "",
                       "plastiqueColor":  "",
                       "sacSize":  "40cm x 40cm x 10cm",
                       "designation":  "Non Tissé (Ance - 40cm x 40cm x 10cm)",
                       "impressionName":  "",
                       "impressionSize":  "",
                       "subSupplier":  "",
                       "subCost":  0,
                       "subPrice":  0,
                       "quantity":  500,
                       "unitPrice":  1.56,
                       "buyPrice":  0.86,
                       "netProfit":  350.00000000000006,
                       "colorsCount":  "1",
                       "extraColorPrice":  0,
                       "totalAmount":  780,
                       "avanceAmount":  780,
                       "resteAmount":  0,
                       "deliveryType":  "direct",
                       "localLivreur":  "",
                       "localDeliveryFee":  0,
                       "ozoneTracking":  "",
                       "ozoneFees":  0,
                       "ozoneTransferStatus":  "",
                       "status":  "livree",
                       "notes":  "",
                       "date":  "2026-10-03",
                       "autoCaisseLogged":  true,
                       "bagSource":  "supplier",
                       "bagCost":  430,
                       "autoCaisseBuyLogged":  true,
                       "stockItemId":  "",
                       "isStockClient":  false,
                       "deliveredQuantity":  500,
                       "remainingQuantity":  0,
                       "deliveries":  [

                                      ]
                   },
                   {
                       "id":  "طلب-2026-117",
                       "clientName":  "INAYA MODE",
                       "clientPhone":  "0766752571",
                       "clientCity":  "AGADIR",
                       "clientGender":  "male",
                       "type":  "serigraphie",
                       "sacCategory":  "Non Tissé",
                       "handleType":  "anses",
                       "kraftHandle":  "",
                       "cartonType":  "",
                       "plastiqueColor":  "",
                       "sacSize":  "39cm x 40cm",
                       "designation":  "Non Tissé (Ance - 39cm x 40cm)",
                       "impressionName":  "",
                       "impressionSize":  "",
                       "subSupplier":  "",
                       "subCost":  0,
                       "subPrice":  0,
                       "quantity":  1000,
                       "unitPrice":  1.25,
                       "buyPrice":  0.75,
                       "netProfit":  500,
                       "colorsCount":  "1",
                       "extraColorPrice":  0,
                       "totalAmount":  1250,
                       "avanceAmount":  1250,
                       "resteAmount":  0,
                       "deliveryType":  "direct",
                       "localLivreur":  "",
                       "localDeliveryFee":  0,
                       "ozoneTracking":  "",
                       "ozoneFees":  0,
                       "ozoneTransferStatus":  "",
                       "status":  "livree",
                       "notes":  "",
                       "date":  "2026-10-03",
                       "autoCaisseLogged":  true,
                       "bagSource":  "supplier",
                       "bagCost":  750,
                       "autoCaisseBuyLogged":  true,
                       "stockItemId":  "",
                       "isStockClient":  false,
                       "deliveredQuantity":  1000,
                       "remainingQuantity":  0,
                       "deliveries":  [

                                      ]
                   },
                   {
                       "id":  "طلب-2026-118",
                       "clientName":  "MR JAMAL",
                       "clientPhone":  "0639929143",
                       "clientCity":  "AGADIR",
                       "clientGender":  "male",
                       "type":  "serigraphie",
                       "sacCategory":  "Impression Seule",
                       "handleType":  "",
                       "kraftHandle":  "",
                       "cartonType":  "",
                       "plastiqueColor":  "",
                       "sacSize":  "masary MB 2couleurs",
                       "designation":  "طباعة فقط: PLASTIQUE (masary MB 2couleurs)",
                       "impressionName":  "PLASTIQUE",
                       "impressionSize":  "masary MB 2couleurs",
                       "subSupplier":  "",
                       "subCost":  0,
                       "subPrice":  0,
                       "quantity":  50,
                       "unitPrice":  0,
                       "buyPrice":  0,
                       "netProfit":  0,
                       "colorsCount":  "1",
                       "extraColorPrice":  0,
                       "totalAmount":  80,
                       "avanceAmount":  80,
                       "resteAmount":  0,
                       "deliveryType":  "direct",
                       "localLivreur":  "",
                       "localDeliveryFee":  0,
                       "ozoneTracking":  "",
                       "ozoneFees":  0,
                       "ozoneTransferStatus":  "",
                       "status":  "livree",
                       "notes":  "",
                       "date":  "2026-10-07",
                       "autoCaisseLogged":  true,
                       "bagSource":  "external",
                       "bagCost":  0,
                       "autoCaisseBuyLogged":  false,
                       "stockItemId":  "",
                       "isStockClient":  false,
                       "deliveredQuantity":  50,
                       "remainingQuantity":  0,
                       "deliveries":  [

                                      ]
                   },
                   {
                       "id":  "طلب-2026-119",
                       "clientName":  "MR JAMAL",
                       "clientPhone":  "0639929143",
                       "clientCity":  "AGADIR",
                       "clientGender":  "male",
                       "type":  "serigraphie",
                       "sacCategory":  "Impression Seule",
                       "handleType":  "",
                       "kraftHandle":  "",
                       "cartonType":  "",
                       "plastiqueColor":  "",
                       "sacSize":  "chama MB",
                       "designation":  "طباعة فقط: SACHETTES PLASTIQUE ECOMERCE (chama MB)",
                       "impressionName":  "SACHETTES PLASTIQUE ECOMERCE",
                       "impressionSize":  "chama MB",
                       "subSupplier":  "",
                       "subCost":  0,
                       "subPrice":  0,
                       "quantity":  100,
                       "unitPrice":  0,
                       "buyPrice":  0,
                       "netProfit":  0,
                       "colorsCount":  "1",
                       "extraColorPrice":  0,
                       "totalAmount":  80,
                       "avanceAmount":  80,
                       "resteAmount":  0,
                       "deliveryType":  "direct",
                       "localLivreur":  "",
                       "localDeliveryFee":  0,
                       "ozoneTracking":  "",
                       "ozoneFees":  0,
                       "ozoneTransferStatus":  "",
                       "status":  "livree",
                       "notes":  "",
                       "date":  "2026-10-07",
                       "autoCaisseLogged":  true,
                       "bagSource":  "external",
                       "bagCost":  0,
                       "autoCaisseBuyLogged":  false,
                       "stockItemId":  "",
                       "isStockClient":  false,
                       "deliveredQuantity":  100,
                       "remainingQuantity":  0,
                       "deliveries":  [

                                      ]
                   },
                   {
                       "id":  "طلب-2026-120",
                       "clientName":  "MR JAMAL",
                       "clientPhone":  "0639929143",
                       "clientCity":  "AGADIR",
                       "clientGender":  "male",
                       "type":  "serigraphie",
                       "sacCategory":  "Impression Seule",
                       "handleType":  "",
                       "kraftHandle":  "",
                       "cartonType":  "",
                       "plastiqueColor":  "",
                       "sacSize":  "az artgift KRA 2couleurs",
                       "designation":  "طباعة فقط: SAC CRAFT (az artgift KRA 2couleurs)",
                       "impressionName":  "SAC CRAFT",
                       "impressionSize":  "az artgift KRA 2couleurs",
                       "subSupplier":  "",
                       "subCost":  0,
                       "subPrice":  0,
                       "quantity":  50,
                       "unitPrice":  0,
                       "buyPrice":  0,
                       "netProfit":  0,
                       "colorsCount":  "1",
                       "extraColorPrice":  0,
                       "totalAmount":  80,
                       "avanceAmount":  80,
                       "resteAmount":  0,
                       "deliveryType":  "direct",
                       "localLivreur":  "",
                       "localDeliveryFee":  0,
                       "ozoneTracking":  "",
                       "ozoneFees":  0,
                       "ozoneTransferStatus":  "",
                       "status":  "livree",
                       "notes":  "",
                       "date":  "2026-10-07",
                       "autoCaisseLogged":  true,
                       "bagSource":  "external",
                       "bagCost":  0,
                       "autoCaisseBuyLogged":  false,
                       "stockItemId":  "",
                       "isStockClient":  false,
                       "deliveredQuantity":  50,
                       "remainingQuantity":  0,
                       "deliveries":  [

                                      ]
                   },
                   {
                       "id":  "طلب-2026-121",
                       "clientName":  "MR JAMAL",
                       "clientPhone":  "0639929143",
                       "clientCity":  "AGADIR",
                       "clientGender":  "male",
                       "type":  "serigraphie",
                       "sacCategory":  "Impression Seule",
                       "handleType":  "",
                       "kraftHandle":  "",
                       "cartonType":  "",
                       "plastiqueColor":  "",
                       "sacSize":  "domain malek NT",
                       "designation":  "طباعة فقط: NON TISSE (domain malek NT)",
                       "impressionName":  "NON TISSE",
                       "impressionSize":  "domain malek NT",
                       "subSupplier":  "",
                       "subCost":  0,
                       "subPrice":  0,
                       "quantity":  100,
                       "unitPrice":  0,
                       "buyPrice":  0,
                       "netProfit":  0,
                       "colorsCount":  "1",
                       "extraColorPrice":  0,
                       "totalAmount":  80,
                       "avanceAmount":  80,
                       "resteAmount":  0,
                       "deliveryType":  "direct",
                       "localLivreur":  "",
                       "localDeliveryFee":  0,
                       "ozoneTracking":  "",
                       "ozoneFees":  0,
                       "ozoneTransferStatus":  "",
                       "status":  "livree",
                       "notes":  "",
                       "date":  "2026-10-07",
                       "autoCaisseLogged":  true,
                       "bagSource":  "external",
                       "bagCost":  0,
                       "autoCaisseBuyLogged":  false,
                       "stockItemId":  "",
                       "isStockClient":  false,
                       "deliveredQuantity":  100,
                       "remainingQuantity":  0,
                       "deliveries":  [

                                      ]
                   },
                   {
                       "id":  "طلب-2026-122",
                       "clientName":  "MR JAMAL",
                       "clientPhone":  "0639929143",
                       "clientCity":  "AGADIR",
                       "clientGender":  "male",
                       "type":  "serigraphie",
                       "sacCategory":  "Impression Seule",
                       "handleType":  "",
                       "kraftHandle":  "",
                       "cartonType":  "",
                       "plastiqueColor":  "",
                       "sacSize":  "dar tajhizat NT 40x40",
                       "designation":  "طباعة فقط: NON TISSE (dar tajhizat NT 40x40)",
                       "impressionName":  "NON TISSE",
                       "impressionSize":  "dar tajhizat NT 40x40",
                       "subSupplier":  "",
                       "subCost":  0,
                       "subPrice":  0,
                       "quantity":  500,
                       "unitPrice":  0,
                       "buyPrice":  0,
                       "netProfit":  0,
                       "colorsCount":  "1",
                       "extraColorPrice":  0,
                       "totalAmount":  225,
                       "avanceAmount":  225,
                       "resteAmount":  0,
                       "deliveryType":  "direct",
                       "localLivreur":  "",
                       "localDeliveryFee":  0,
                       "ozoneTracking":  "",
                       "ozoneFees":  0,
                       "ozoneTransferStatus":  "",
                       "status":  "livree",
                       "notes":  "",
                       "date":  "2026-10-07",
                       "autoCaisseLogged":  true,
                       "bagSource":  "external",
                       "bagCost":  0,
                       "autoCaisseBuyLogged":  false,
                       "stockItemId":  "",
                       "isStockClient":  false,
                       "deliveredQuantity":  500,
                       "remainingQuantity":  0,
                       "deliveries":  [

                                      ]
                   },
                   {
                       "id":  "طلب-2026-123",
                       "clientName":  "MR JAMAL",
                       "clientPhone":  "0639929143",
                       "clientCity":  "AGADIR",
                       "clientGender":  "male",
                       "type":  "serigraphie",
                       "sacCategory":  "Impression Seule",
                       "handleType":  "",
                       "kraftHandle":  "",
                       "cartonType":  "",
                       "plastiqueColor":  "",
                       "sacSize":  "dar tajhizat NT 40x50",
                       "designation":  "طباعة فقط: NON TISSE (dar tajhizat NT 40x50)",
                       "impressionName":  "NON TISSE",
                       "impressionSize":  "dar tajhizat NT 40x50",
                       "subSupplier":  "",
                       "subCost":  0,
                       "subPrice":  0,
                       "quantity":  500,
                       "unitPrice":  0,
                       "buyPrice":  0,
                       "netProfit":  0,
                       "colorsCount":  "1",
                       "extraColorPrice":  0,
                       "totalAmount":  225,
                       "avanceAmount":  225,
                       "resteAmount":  0,
                       "deliveryType":  "direct",
                       "localLivreur":  "",
                       "localDeliveryFee":  0,
                       "ozoneTracking":  "",
                       "ozoneFees":  0,
                       "ozoneTransferStatus":  "",
                       "status":  "livree",
                       "notes":  "",
                       "date":  "2026-10-07",
                       "autoCaisseLogged":  true,
                       "bagSource":  "external",
                       "bagCost":  0,
                       "autoCaisseBuyLogged":  false,
                       "stockItemId":  "",
                       "isStockClient":  false,
                       "deliveredQuantity":  500,
                       "remainingQuantity":  0,
                       "deliveries":  [

                                      ]
                   },
                   {
                       "id":  "طلب-2026-124",
                       "clientName":  "MR JAMAL",
                       "clientPhone":  "0639929143",
                       "clientCity":  "AGADIR",
                       "clientGender":  "male",
                       "type":  "serigraphie",
                       "sacCategory":  "Impression Seule",
                       "handleType":  "",
                       "kraftHandle":  "",
                       "cartonType":  "",
                       "plastiqueColor":  "",
                       "sacSize":  "dar tajhizat NT 50x50",
                       "designation":  "طباعة فقط: NON TISSE (dar tajhizat NT 50x50)",
                       "impressionName":  "NON TISSE",
                       "impressionSize":  "dar tajhizat NT 50x50",
                       "subSupplier":  "",
                       "subCost":  0,
                       "subPrice":  0,
                       "quantity":  500,
                       "unitPrice":  0,
                       "buyPrice":  0,
                       "netProfit":  0,
                       "colorsCount":  "1",
                       "extraColorPrice":  0,
                       "totalAmount":  225,
                       "avanceAmount":  225,
                       "resteAmount":  0,
                       "deliveryType":  "direct",
                       "localLivreur":  "",
                       "localDeliveryFee":  0,
                       "ozoneTracking":  "",
                       "ozoneFees":  0,
                       "ozoneTransferStatus":  "",
                       "status":  "livree",
                       "notes":  "",
                       "date":  "2026-10-07",
                       "autoCaisseLogged":  true,
                       "bagSource":  "external",
                       "bagCost":  0,
                       "autoCaisseBuyLogged":  false,
                       "stockItemId":  "",
                       "isStockClient":  false,
                       "deliveredQuantity":  500,
                       "remainingQuantity":  0,
                       "deliveries":  [

                                      ]
                   },
                   {
                       "id":  "طلب-2026-125",
                       "clientName":  "MR JAMAL",
                       "clientPhone":  "0639929143",
                       "clientCity":  "AGADIR",
                       "clientGender":  "male",
                       "type":  "serigraphie",
                       "sacCategory":  "Impression Seule",
                       "handleType":  "",
                       "kraftHandle":  "",
                       "cartonType":  "",
                       "plastiqueColor":  "",
                       "sacSize":  "dar tajhizat NT 50x60",
                       "designation":  "طباعة فقط: NON TISSE (dar tajhizat NT 50x60)",
                       "impressionName":  "NON TISSE",
                       "impressionSize":  "dar tajhizat NT 50x60",
                       "subSupplier":  "",
                       "subCost":  0,
                       "subPrice":  0,
                       "quantity":  500,
                       "unitPrice":  0,
                       "buyPrice":  0,
                       "netProfit":  0,
                       "colorsCount":  "1",
                       "extraColorPrice":  0,
                       "totalAmount":  225,
                       "avanceAmount":  225,
                       "resteAmount":  0,
                       "deliveryType":  "direct",
                       "localLivreur":  "",
                       "localDeliveryFee":  0,
                       "ozoneTracking":  "",
                       "ozoneFees":  0,
                       "ozoneTransferStatus":  "",
                       "status":  "livree",
                       "notes":  "",
                       "date":  "2026-10-07",
                       "autoCaisseLogged":  true,
                       "bagSource":  "external",
                       "bagCost":  0,
                       "autoCaisseBuyLogged":  false,
                       "stockItemId":  "",
                       "isStockClient":  false,
                       "deliveredQuantity":  500,
                       "remainingQuantity":  0,
                       "deliveries":  [

                                      ]
                   },
                   {
                       "id":  "طلب-2026-126",
                       "clientName":  "MR JAMAL",
                       "clientPhone":  "0639929143",
                       "clientCity":  "AGADIR",
                       "clientGender":  "male",
                       "type":  "serigraphie",
                       "sacCategory":  "Impression Seule",
                       "handleType":  "",
                       "kraftHandle":  "",
                       "cartonType":  "",
                       "plastiqueColor":  "",
                       "sacSize":  "inkagps carton",
                       "designation":  "طباعة فقط: CARTON (inkagps carton)",
                       "impressionName":  "CARTON",
                       "impressionSize":  "inkagps carton",
                       "subSupplier":  "",
                       "subCost":  0,
                       "subPrice":  0,
                       "quantity":  100,
                       "unitPrice":  0,
                       "buyPrice":  0,
                       "netProfit":  0,
                       "colorsCount":  "1",
                       "extraColorPrice":  0,
                       "totalAmount":  80,
                       "avanceAmount":  80,
                       "resteAmount":  0,
                       "deliveryType":  "direct",
                       "localLivreur":  "",
                       "localDeliveryFee":  0,
                       "ozoneTracking":  "",
                       "ozoneFees":  0,
                       "ozoneTransferStatus":  "",
                       "status":  "livree",
                       "notes":  "",
                       "date":  "2026-10-07",
                       "autoCaisseLogged":  true,
                       "bagSource":  "external",
                       "bagCost":  0,
                       "autoCaisseBuyLogged":  false,
                       "stockItemId":  "",
                       "isStockClient":  false,
                       "deliveredQuantity":  100,
                       "remainingQuantity":  0,
                       "deliveries":  [

                                      ]
                   },
                   {
                       "id":  "طلب-2026-127",
                       "clientName":  "ROSSO STORE",
                       "clientPhone":  "0648338137",
                       "clientCity":  "Agadir",
                       "clientGender":  "male",
                       "type":  "serigraphie",
                       "sacCategory":  "Non Tissé",
                       "handleType":  "poignee",
                       "kraftHandle":  "",
                       "cartonType":  "",
                       "plastiqueColor":  "",
                       "sacSize":  "35cm x 40cm x 10cm",
                       "designation":  "Non Tissé (Poignée - 35cm x 40cm x 10cm)",
                       "impressionName":  "",
                       "impressionSize":  "",
                       "subSupplier":  "",
                       "subCost":  0,
                       "subPrice":  0,
                       "quantity":  300,
                       "unitPrice":  0,
                       "buyPrice":  0.68,
                       "netProfit":  -204.00000000000003,
                       "colorsCount":  "1",
                       "extraColorPrice":  0,
                       "totalAmount":  500,
                       "avanceAmount":  300,
                       "resteAmount":  200,
                       "deliveryType":  "direct",
                       "localLivreur":  "",
                       "localDeliveryFee":  0,
                       "ozoneTracking":  "",
                       "ozoneFees":  0,
                       "ozoneTransferStatus":  "",
                       "status":  "impression",
                       "notes":  "",
                       "date":  "2026-10-07",
                       "autoCaisseLogged":  true,
                       "bagSource":  "supplier",
                       "bagCost":  204.00000000000003,
                       "autoCaisseBuyLogged":  true,
                       "stockItemId":  "",
                       "isStockClient":  false,
                       "deliveredQuantity":  300,
                       "remainingQuantity":  0,
                       "deliveries":  [

                                      ]
                   },
                   {
                       "id":  "طلب-2026-128",
                       "clientName":  "SAIF EDDINE MSAAD",
                       "clientPhone":  "0616016489",
                       "clientCity":  "OUJDA",
                       "clientGender":  "male",
                       "type":  "serigraphie",
                       "sacCategory":  "Non Tissé",
                       "handleType":  "poignee",
                       "kraftHandle":  "",
                       "cartonType":  "",
                       "plastiqueColor":  "",
                       "sacSize":  "29cm x 22cm",
                       "designation":  "Non Tissé (Poignée - 29cm x 22cm)",
                       "impressionName":  "",
                       "impressionSize":  "",
                       "subSupplier":  "",
                       "subCost":  0,
                       "subPrice":  0,
                       "quantity":  3000,
                       "unitPrice":  0.65,
                       "buyPrice":  0.3,
                       "netProfit":  1050,
                       "colorsCount":  "1",
                       "extraColorPrice":  0,
                       "totalAmount":  1950,
                       "avanceAmount":  0,
                       "resteAmount":  1950,
                       "deliveryType":  "direct",
                       "localLivreur":  "",
                       "localDeliveryFee":  0,
                       "ozoneTracking":  "",
                       "ozoneFees":  0,
                       "ozoneTransferStatus":  "",
                       "status":  "impression",
                       "notes":  "",
                       "date":  "2026-10-07",
                       "autoCaisseLogged":  true,
                       "bagSource":  "supplier",
                       "bagCost":  900,
                       "autoCaisseBuyLogged":  true,
                       "stockItemId":  "",
                       "isStockClient":  false,
                       "deliveredQuantity":  3000,
                       "remainingQuantity":  0,
                       "deliveries":  [

                                      ]
                   },
                   {
                       "id":  "طلب-2026-129",
                       "clientName":  "JARDIN D\u0027EDEN BEAUTY",
                       "clientPhone":  "0779593332",
                       "clientCity":  "CASABLANCA",
                       "clientGender":  "male",
                       "type":  "serigraphie",
                       "sacCategory":  "Non Tissé",
                       "handleType":  "anses",
                       "kraftHandle":  "",
                       "cartonType":  "",
                       "plastiqueColor":  "",
                       "sacSize":  "39cm x 40cm",
                       "designation":  "Non Tissé (Ance - 39cm x 40cm)",
                       "impressionName":  "",
                       "impressionSize":  "",
                       "subSupplier":  "",
                       "subCost":  0,
                       "subPrice":  0,
                       "quantity":  50,
                       "unitPrice":  2.55,
                       "buyPrice":  0.75,
                       "netProfit":  89.99999999999999,
                       "colorsCount":  "1",
                       "extraColorPrice":  0,
                       "totalAmount":  130,
                       "avanceAmount":  0,
                       "resteAmount":  130,
                       "deliveryType":  "direct",
                       "localLivreur":  "",
                       "localDeliveryFee":  0,
                       "ozoneTracking":  "",
                       "ozoneFees":  0,
                       "ozoneTransferStatus":  "",
                       "status":  "livraison",
                       "notes":  "",
                       "date":  "2026-10-07",
                       "autoCaisseLogged":  true,
                       "bagSource":  "supplier",
                       "bagCost":  37.5,
                       "autoCaisseBuyLogged":  true,
                       "stockItemId":  "",
                       "isStockClient":  false,
                       "deliveredQuantity":  50,
                       "remainingQuantity":  0,
                       "deliveries":  [

                                      ]
                   },
                   {
                       "id":  "طلب-2026-130",
                       "clientName":  "JARDIN D\u0027EDEN BEAUTY",
                       "clientPhone":  "0779593332",
                       "clientCity":  "CASABLANCA",
                       "clientGender":  "male",
                       "type":  "serigraphie",
                       "sacCategory":  "Plastique",
                       "handleType":  "noir",
                       "kraftHandle":  "",
                       "cartonType":  "",
                       "plastiqueColor":  "noir",
                       "sacSize":  "37cmx48cm",
                       "designation":  "Plastique (NOIR - 37cmx48cm)",
                       "impressionName":  "",
                       "impressionSize":  "",
                       "subSupplier":  "",
                       "subCost":  0,
                       "subPrice":  0,
                       "quantity":  50,
                       "unitPrice":  3,
                       "buyPrice":  1.2,
                       "netProfit":  90,
                       "colorsCount":  "1",
                       "extraColorPrice":  0,
                       "totalAmount":  150,
                       "avanceAmount":  0,
                       "resteAmount":  150,
                       "deliveryType":  "direct",
                       "localLivreur":  "",
                       "localDeliveryFee":  0,
                       "ozoneTracking":  "",
                       "ozoneFees":  0,
                       "ozoneTransferStatus":  "",
                       "status":  "livraison",
                       "notes":  "",
                       "date":  "2026-10-07",
                       "autoCaisseLogged":  true,
                       "bagSource":  "supplier",
                       "bagCost":  60,
                       "autoCaisseBuyLogged":  true,
                       "stockItemId":  "",
                       "isStockClient":  false,
                       "deliveredQuantity":  50,
                       "remainingQuantity":  0,
                       "deliveries":  [

                                      ]
                   }
               ],
    "caisse":  [
                   {
                       "id":  "trx_stock_1789681200141",
                       "type":  "sortie",
                       "category":  "consommables",
                       "amount":  130,
                       "description":  "شراء مواد استهلاك: BLUE ROI AMK (+1 كيلو × 130.00 د)",
                       "paymentMethod":  "especes",
                       "date":  "2026-09-17"
                   },
                   {
                       "id":  "trx_stock_1789681247356",
                       "type":  "sortie",
                       "category":  "consommables",
                       "amount":  137,
                       "description":  "شراء مواد استهلاك وطباعة: JAUNE AMK (1 كيلو × 137.00 د)",
                       "paymentMethod":  "especes",
                       "date":  "2026-09-17"
                   },
                   {
                       "id":  "trx_stock_1789681290604",
                       "type":  "sortie",
                       "category":  "consommables",
                       "amount":  150,
                       "description":  "شراء مواد استهلاك وطباعة: 🧼 ديكابو / Décapant (1 لتر × 150.00 د)",
                       "paymentMethod":  "especes",
                       "date":  "2026-09-17"
                   },
                   {
                       "id":  "trx_buy_1789681456679",
                       "type":  "sortie",
                       "category":  "matieres",
                       "amount":  15,
                       "description":  "شراء أكياس خام طلبية طلب-2026-100 (50 حبة × 0.3 د) - AHMED GTARNI",
                       "paymentMethod":  "especes",
                       "date":  "2026-09-17",
                       "orderId":  "طلب-2026-100",
                       "isBagPurchase":  true
                   },
                   {
                       "id":  "trx_1790012872950",
                       "type":  "entree",
                       "category":  "solde_cmd",
                       "amount":  1580,
                       "description":  "خلاص باقي الحساب للزبون (MR OTMAN)",
                       "paymentMethod":  "especes",
                       "date":  "2026-09-21"
                   },
                   {
                       "id":  "trx_buy_1790086040013",
                       "type":  "sortie",
                       "category":  "matieres",
                       "amount":  600,
                       "description":  "شراء أكياس خام طلبية طلب-2026-107 (2000 حبة × 0.3 د) - PARA RICH",
                       "paymentMethod":  "especes",
                       "date":  "2026-09-22",
                       "orderId":  "طلب-2026-107",
                       "isBagPurchase":  true
                   },
                   {
                       "id":  "trx_buy_1790113270555",
                       "type":  "sortie",
                       "category":  "matieres",
                       "amount":  500,
                       "description":  "شراء أكياس خام طلبية طلب-2026-108 (500 حبة × 1 د) - CLOTHING PALACE",
                       "paymentMethod":  "especes",
                       "date":  "2026-09-22",
                       "orderId":  "طلب-2026-108",
                       "isBagPurchase":  true
                   },
                   {
                       "id":  "trx_buy_1790113809030",
                       "type":  "sortie",
                       "category":  "matieres",
                       "amount":  390,
                       "description":  "شراء أكياس خام طلبية طلب-2026-109 (500 حبة × 0.78 د) - CLOTHING PALACE",
                       "paymentMethod":  "especes",
                       "date":  "2026-09-22",
                       "orderId":  "طلب-2026-109",
                       "isBagPurchase":  true
                   },
                   {
                       "id":  "trx_1790284616129",
                       "type":  "entree",
                       "category":  "solde_cmd",
                       "amount":  100,
                       "description":  "استخلاص باقي طلبية طلب-2026-100 عبر التسليم بالورشة (AHMED GTARNI)",
                       "paymentMethod":  "especes",
                       "date":  "2026-09-24"
                   },
                   {
                       "id":  "trx_buy_1790285165191",
                       "type":  "sortie",
                       "category":  "matieres",
                       "amount":  530,
                       "description":  "شراء أكياس خام طلبية طلب-2026-110 (1000 حبة × 0.53 د) - MANAHIL ABOU IMRAN",
                       "paymentMethod":  "especes",
                       "date":  "2026-09-24",
                       "orderId":  "طلب-2026-110",
                       "isBagPurchase":  true
                   },
                   {
                       "id":  "trx_buy_1790285328708",
                       "type":  "sortie",
                       "category":  "matieres",
                       "amount":  780,
                       "description":  "شراء أكياس خام طلبية طلب-2026-111 (1000 حبة × 0.78 د) - VENOM SHOP",
                       "paymentMethod":  "especes",
                       "date":  "2026-09-24",
                       "orderId":  "طلب-2026-111",
                       "isBagPurchase":  true
                   },
                   {
                       "id":  "trx_1790347007275",
                       "type":  "entree",
                       "category":  "solde_cmd",
                       "amount":  1300,
                       "description":  "استخلاص باقي طلبية طلب-2026-107 عبر التسليم بالورشة (PARA RICH)",
                       "paymentMethod":  "especes",
                       "date":  "2026-09-25"
                   },
                   {
                       "id":  "trx_buy_1790363751957",
                       "type":  "sortie",
                       "category":  "matieres",
                       "amount":  375,
                       "description":  "شراء أكياس خام طلبية طلب-2026-112 (500 حبة × 0.75 د) - AZ STORE",
                       "paymentMethod":  "especes",
                       "date":  "2026-09-25",
                       "orderId":  "طلب-2026-112",
                       "isBagPurchase":  true
                   },
                   {
                       "id":  "trx_1790441425662",
                       "type":  "entree",
                       "category":  "solde_cmd",
                       "amount":  930,
                       "description":  "خلاص باقي الحساب للزبون (MANAHIL ABOU IMRAN)",
                       "paymentMethod":  "especes",
                       "date":  "2026-09-26"
                   },
                   {
                       "id":  "trx_buy_1790444393838",
                       "type":  "sortie",
                       "category":  "soustraitance",
                       "amount":  630,
                       "description":  "تكلفة مطبعة شريكة طلبية طلب-2026-113 (CARNET BOON) - ARIA IMP",
                       "paymentMethod":  "especes",
                       "date":  "2026-09-26",
                       "orderId":  "طلب-2026-113",
                       "isBagPurchase":  true
                   },
                   {
                       "id":  "trx_1790595968779",
                       "type":  "entree",
                       "category":  "solde_cmd",
                       "amount":  780,
                       "description":  "استخلاص باقي طلبية طلب-2026-113 عبر التسليم بالورشة (BRAHIML BIJOUX)",
                       "paymentMethod":  "especes",
                       "date":  "2026-09-28"
                   },
                   {
                       "id":  "trx_1790596045326",
                       "type":  "entree",
                       "category":  "solde_cmd",
                       "amount":  1565,
                       "description":  "خلاص باقي الحساب للزبون (CLOTHING PALACE)",
                       "paymentMethod":  "especes",
                       "date":  "2026-09-28"
                   },
                   {
                       "id":  "trx_1790596589531",
                       "type":  "sortie",
                       "amount":  725,
                       "category":  "transport",
                       "description":  "t3dal motor",
                       "paymentMethod":  "especes",
                       "date":  "2026-09-28"
                   },
                   {
                       "id":  "trx_1790606299009",
                       "type":  "sortie",
                       "amount":  50,
                       "category":  "consommables",
                       "description":  "LIGOUYAT",
                       "paymentMethod":  "especes",
                       "date":  "2026-09-28"
                   },
                   {
                       "id":  "trx_buy_1790710531297",
                       "type":  "sortie",
                       "category":  "matieres",
                       "amount":  37.5,
                       "description":  "شراء أكياس خام طلبية طلب-2026-114 (50 حبة × 0.75 د) - JARDIN D\u0027EDEN BEAUTY",
                       "paymentMethod":  "especes",
                       "date":  "2026-09-29",
                       "orderId":  "طلب-2026-114",
                       "isBagPurchase":  true
                   },
                   {
                       "id":  "trx_1790710562672",
                       "type":  "sortie",
                       "amount":  13,
                       "category":  "transport",
                       "description":  "slsla diyal motor",
                       "paymentMethod":  "especes",
                       "date":  "2026-09-29"
                   },
                   {
                       "id":  "trx_stock_1790710598506",
                       "type":  "sortie",
                       "category":  "consommables",
                       "amount":  137,
                       "description":  "شراء مواد استهلاك: JAUNE AMK (+1 كيلو × 137.00 د)",
                       "paymentMethod":  "especes",
                       "date":  "2026-09-29"
                   },
                   {
                       "id":  "trx_1790861440216",
                       "type":  "entree",
                       "category":  "solde_cmd",
                       "amount":  400,
                       "description":  "خلاص باقي الحساب للزبون (AZ STORE)",
                       "paymentMethod":  "especes",
                       "date":  "2026-10-01"
                   },
                   {
                       "id":  "trx_buy_1790864992994",
                       "type":  "sortie",
                       "category":  "matieres",
                       "amount":  292.5,
                       "description":  "شراء أكياس خام طلبية طلب-2026-115 (150 حبة × 1.95 د) - ZCOFEE OUJDA",
                       "paymentMethod":  "especes",
                       "date":  "2026-10-01",
                       "orderId":  "طلب-2026-115",
                       "isBagPurchase":  true
                   },
                   {
                       "id":  "trx_1790875006201",
                       "type":  "entree",
                       "category":  "solde_cmd",
                       "amount":  50,
                       "description":  "خلاص باقي الحساب للزبون (CLOTHING PALACE)",
                       "paymentMethod":  "especes",
                       "date":  "2026-10-01"
                   },
                   {
                       "id":  "trx_buy_1791053626355",
                       "type":  "sortie",
                       "category":  "matieres",
                       "amount":  430,
                       "description":  "شراء أكياس خام طلبية طلب-2026-116 (500 حبة × 0.86 د) - BLACK STREET",
                       "paymentMethod":  "especes",
                       "date":  "2026-10-03",
                       "orderId":  "طلب-2026-116",
                       "isBagPurchase":  true
                   },
                   {
                       "id":  "trx_1791053697329",
                       "type":  "sortie",
                       "amount":  150,
                       "category":  "consommables",
                       "description":  "BLANC SERIFLEX",
                       "paymentMethod":  "especes",
                       "date":  "2026-10-03"
                   },
                   {
                       "id":  "trx_1791053709064",
                       "type":  "sortie",
                       "amount":  120,
                       "category":  "consommables",
                       "description":  "VERT 2003",
                       "paymentMethod":  "especes",
                       "date":  "2026-10-03"
                   },
                   {
                       "id":  "trx_buy_1791053816456",
                       "type":  "sortie",
                       "category":  "matieres",
                       "amount":  750,
                       "description":  "شراء أكياس خام طلبية طلب-2026-117 (1000 حبة × 0.75 د) - INAYA MODE",
                       "paymentMethod":  "especes",
                       "date":  "2026-10-03",
                       "orderId":  "طلب-2026-117",
                       "isBagPurchase":  true
                   },
                   {
                       "id":  "trx_1791220669034",
                       "type":  "entree",
                       "category":  "solde_cmd",
                       "amount":  325,
                       "description":  "خلاص باقي الحساب للزبون (AZ STORE)",
                       "paymentMethod":  "especes",
                       "date":  "2026-10-05"
                   },
                   {
                       "id":  "trx_1791407867641",
                       "type":  "entree",
                       "category":  "solde_cmd",
                       "amount":  780,
                       "description":  "خلاص باقي الحساب للزبون (BLACK STREET)",
                       "paymentMethod":  "especes",
                       "date":  "2026-10-07"
                   },
                   {
                       "id":  "trx_1791407881736",
                       "type":  "entree",
                       "category":  "solde_cmd",
                       "amount":  445,
                       "description":  "خلاص باقي الحساب للزبون (ZCOFEE OUJDA)",
                       "paymentMethod":  "especes",
                       "date":  "2026-10-07"
                   },
                   {
                       "id":  "trx_1791407930958",
                       "type":  "entree",
                       "category":  "solde_cmd",
                       "amount":  1250,
                       "description":  "خلاص باقي الحساب للزبون (INAYA MODE)",
                       "paymentMethod":  "especes",
                       "date":  "2026-10-07"
                   },
                   {
                       "id":  "trx_buy_1791408642319",
                       "type":  "sortie",
                       "category":  "matieres",
                       "amount":  204.00000000000003,
                       "description":  "شراء أكياس خام طلبية طلب-2026-127 (300 حبة × 0.68 د) - ROSSO STORE",
                       "paymentMethod":  "especes",
                       "date":  "2026-10-07",
                       "orderId":  "طلب-2026-127",
                       "isBagPurchase":  true
                   },
                   {
                       "id":  "trx_1791408659849",
                       "type":  "entree",
                       "category":  "avance_cmd",
                       "amount":  300,
                       "description":  "عربون طلبية طلب-2026-127 (ROSSO STORE)",
                       "paymentMethod":  "especes",
                       "date":  "2026-10-07",
                       "orderId":  "طلب-2026-127"
                   },
                   {
                       "id":  "trx_buy_1791408826845",
                       "type":  "sortie",
                       "category":  "matieres",
                       "amount":  900,
                       "description":  "شراء أكياس خام طلبية طلب-2026-128 (3000 حبة × 0.3 د) - SAIF EDDINE MSAAD",
                       "paymentMethod":  "especes",
                       "date":  "2026-10-07",
                       "orderId":  "طلب-2026-128",
                       "isBagPurchase":  true
                   },
                   {
                       "id":  "trx_buy_1791409111053",
                       "type":  "sortie",
                       "category":  "matieres",
                       "amount":  37.5,
                       "description":  "شراء أكياس خام طلبية طلب-2026-129 (50 حبة × 0.75 د) - JARDIN D\u0027EDEN BEAUTY",
                       "paymentMethod":  "especes",
                       "date":  "2026-10-07",
                       "orderId":  "طلب-2026-129",
                       "isBagPurchase":  true
                   },
                   {
                       "id":  "trx_buy_1791409276742",
                       "type":  "sortie",
                       "category":  "matieres",
                       "amount":  60,
                       "description":  "شراء أكياس خام طلبية طلب-2026-130 (50 حبة × 1.2 د) - JARDIN D\u0027EDEN BEAUTY",
                       "paymentMethod":  "especes",
                       "date":  "2026-10-07",
                       "orderId":  "طلب-2026-130",
                       "isBagPurchase":  true
                   },
                   {
                       "id":  "trx_stock_1791409493317",
                       "type":  "sortie",
                       "category":  "consommables",
                       "amount":  240,
                       "description":  "شراء مواد استهلاك: 🎨 Noir 2003 (+2 كيلو × 120.00 د)",
                       "paymentMethod":  "especes",
                       "date":  "2026-10-07"
                   },
                   {
                       "id":  "trx_1791409593403",
                       "type":  "sortie",
                       "amount":  160,
                       "category":  "consommables",
                       "description":  "Gélatine",
                       "paymentMethod":  "especes",
                       "date":  "2026-10-07"
                   },
                   {
                       "id":  "trx_1791409615104",
                       "type":  "sortie",
                       "amount":  34,
                       "category":  "consommables",
                       "description":  "☁️ قطن وشيفون / Coton",
                       "paymentMethod":  "especes",
                       "date":  "2026-10-07"
                   },
                   {
                       "id":  "trx_1791409639129",
                       "type":  "sortie",
                       "amount":  20,
                       "category":  "consommables",
                       "description":  "☁️ قطن وشيفون / Coton",
                       "paymentMethod":  "especes",
                       "date":  "2026-10-07"
                   },
                   {
                       "id":  "trx_1791409751455",
                       "type":  "sortie",
                       "amount":  100,
                       "category":  "consommables",
                       "description":  "graffeuz pistolet + charge",
                       "paymentMethod":  "especes",
                       "date":  "2026-10-07"
                   },
                   {
                       "id":  "trx_1791409776534",
                       "type":  "sortie",
                       "amount":  15,
                       "category":  "consommables",
                       "description":  "10 cartes PVC",
                       "paymentMethod":  "especes",
                       "date":  "2026-10-07"
                   },
                   {
                       "id":  "trx_1791411001042",
                       "type":  "entree",
                       "category":  "avance_cmd",
                       "amount":  130,
                       "description":  "عربون طلبية طلب-2026-114 (JARDIN D\u0027EDEN BEAUTY)",
                       "paymentMethod":  "especes",
                       "date":  "2026-10-07",
                       "orderId":  "طلب-2026-114"
                   },
                   {
                       "id":  "trx_1791411209094",
                       "type":  "entree",
                       "category":  "solde_cmd",
                       "amount":  10,
                       "description":  "خلاص باقي الحساب للزبون (CLOTHING PALACE)",
                       "paymentMethod":  "especes",
                       "date":  "2026-10-07"
                   },
                   {
                       "id":  "trx_1791411900141",
                       "type":  "sortie",
                       "amount":  10,
                       "category":  "transport",
                       "description":  "piyassa motor",
                       "paymentMethod":  "especes",
                       "date":  "2026-10-07"
                   },
                   {
                       "id":  "trx_1791637254032",
                       "type":  "entree",
                       "category":  "solde_cmd",
                       "amount":  1300,
                       "description":  "خلاص باقي الحساب للزبون (MR JAMAL)",
                       "paymentMethod":  "especes",
                       "date":  "2026-10-10"
                   },
                   {
                       "id":  "trx_1791638191669",
                       "type":  "sortie",
                       "amount":  20,
                       "category":  "transport",
                       "description":  "sican mn casa diya sif optique",
                       "paymentMethod":  "especes",
                       "date":  "2026-10-10"
                   },
                   {
                       "id":  "trx_1791638945569",
                       "type":  "sortie",
                       "amount":  125,
                       "category":  "consommables",
                       "description":  "dilio",
                       "paymentMethod":  "especes",
                       "date":  "2026-10-10"
                   },
                   {
                       "id":  "trx_1791638986944",
                       "type":  "sortie",
                       "amount":  34,
                       "category":  "divers",
                       "description":  "remake rosso store sac",
                       "paymentMethod":  "especes",
                       "date":  "2026-10-10"
                   },
                   {
                       "id":  "trx_stock_1791642497620",
                       "type":  "sortie",
                       "category":  "matieres",
                       "amount":  60,
                       "description":  "شراء سلعة أكياس: plastique Ecom noir mat 37x48cm (50 حبة × 1.20 د)",
                       "paymentMethod":  "especes",
                       "date":  "2026-10-10"
                   },
                   {
                       "id":  "trx_1791671671553",
                       "type":  "entree",
                       "category":  "solde_cmd",
                       "amount":  150,
                       "description":  "دفع باقي طلبية طلب-2026-130 لـ الزبون/ة: كوثر (JARDIN D\u0027EDEN BEAUTY)",
                       "paymentMethod":  "especes",
                       "date":  "2026-10-10"
                   },
                   {
                       "id":  "trx_1791671682881",
                       "type":  "entree",
                       "category":  "solde_cmd",
                       "amount":  130,
                       "description":  "دفع باقي طلبية طلب-2026-129 لـ الزبون/ة: كوثر (JARDIN D\u0027EDEN BEAUTY)",
                       "paymentMethod":  "especes",
                       "date":  "2026-10-10"
                   },
                   {
                       "id":  "trx_stock_1791675988858",
                       "type":  "sortie",
                       "category":  "matieres",
                       "amount":  60,
                       "description":  "شراء سلعة أكياس: plastique Ecom noir mat 37x48cm (50 حبة × 1.20 د)",
                       "paymentMethod":  "especes",
                       "date":  "2026-10-10"
                   },
                   {
                       "id":  "trx_draw_1791833807634",
                       "type":  "sortie",
                       "category":  "retrait_p1",
                       "amount":  600,
                       "description":  "[تسبيق] تسبيق Mohamed",
                       "paymentMethod":  "especes",
                       "date":  "2026-09-10"
                   },
                   {
                       "id":  "trx_draw_1791833840443",
                       "type":  "sortie",
                       "category":  "retrait_p2",
                       "amount":  600,
                       "description":  "[تسبيق] تسبيق Youssef",
                       "paymentMethod":  "especes",
                       "date":  "2026-09-10"
                   }
               ],
    "stock":  [
                  {
                      "id":  "stk_1789681148029",
                      "supplier":  "AMK",
                      "name":  "BLUE ROI AMK",
                      "category":  "consommables",
                      "unit":  "كيلو",
                      "quantity":  1,
                      "minAlert":  10,
                      "costPrice":  130,
                      "sellPrice":  0,
                      "titleColor":  "#1E40AF",
                      "consumedManual":  0,
                      "consumedQr":  0,
                      "initialQuantity":  1
                  },
                  {
                      "id":  "stk_1789681247356",
                      "supplier":  "AMK",
                      "name":  "JAUNE AMK",
                      "category":  "consommables",
                      "unit":  "كيلو",
                      "quantity":  1,
                      "minAlert":  10,
                      "costPrice":  137,
                      "sellPrice":  0,
                      "titleColor":  "#EAB308",
                      "consumedManual":  0,
                      "consumedQr":  0,
                      "initialQuantity":  1
                  },
                  {
                      "id":  "stk_1789681290604",
                      "name":  "🧼 ديكابو / Décapant",
                      "category":  "consommables",
                      "unit":  "لتر",
                      "quantity":  0,
                      "minAlert":  10,
                      "costPrice":  150,
                      "sellPrice":  0,
                      "titleColor":  "#059669",
                      "consumedManual":  0,
                      "consumedQr":  0,
                      "initialQuantity":  0
                  },
                  {
                      "id":  "stk_1789999447389",
                      "name":  "🧪 ديليون 1050",
                      "category":  "consommables",
                      "unit":  "بيدو",
                      "quantity":  0,
                      "minAlert":  1,
                      "costPrice":  240,
                      "sellPrice":  0,
                      "titleColor":  "#0284C7",
                      "consumedManual":  0,
                      "consumedQr":  0,
                      "initialQuantity":  0
                  },
                  {
                      "id":  "stk_1790114076869",
                      "name":  "🎨 Noir 2003",
                      "category":  "consommables",
                      "unit":  "كيلو",
                      "quantity":  1,
                      "minAlert":  2,
                      "costPrice":  120,
                      "sellPrice":  0,
                      "titleColor":  "#111111",
                      "consumedManual":  1,
                      "consumedQr":  0,
                      "initialQuantity":  2,
                      "supplier":  "2003"
                  },
                  {
                      "id":  "stk_1790625371996",
                      "name":  "VERT",
                      "category":  "consommables",
                      "unit":  "كيلو",
                      "quantity":  0,
                      "minAlert":  1,
                      "costPrice":  120,
                      "sellPrice":  0,
                      "titleColor":  "#16a34a",
                      "consumedManual":  0,
                      "consumedQr":  1,
                      "initialQuantity":  1,
                      "supplier":  "2003"
                  },
                  {
                      "id":  "stk_1791642497620",
                      "name":  "plastique Ecom noir mat 37x48cm",
                      "category":  "sacs",
                      "unit":  "حبة",
                      "quantity":  50,
                      "minAlert":  10,
                      "costPrice":  1.2,
                      "sellPrice":  0,
                      "titleColor":  "#111111",
                      "supplier":  "lihoudi",
                      "initialQuantity":  50,
                      "consumedManual":  0,
                      "consumedQr":  0
                  }
              ],
    "settings":  {
                     "workshopName":  "MASTER PRINT",
                     "phone":  "0663103599",
                     "city":  "Agadir, Maroc",
                     "receiptNote":  "المرجو التأكد والموافقة على نموذج التصميم (BAT) قبل انطلاق الطباعة. البضاعة المطبوعة لا ترد ولا تستبدل بعد الموافقة.",
                     "initialCapital":  22385,
                     "bagCosts":  {
                                      "Non Tissé - Poignée":  {
                                                                  "25cm x 20cm":  0.25,
                                                                  "29cm x 22cm":  0.3,
                                                                  "35cm x 25cm":  0.45,
                                                                  "37cm x 30cm":  0.55,
                                                                  "35cm x 40cm x 10cm":  0.68,
                                                                  "50cm x 40cm x 10cm":  0.9,
                                                                  "50cm x 50cm x 10cm":  1.1
                                                              },
                                      "Non Tissé - Anses":  {
                                                                "30cm x 30cm":  0.53,
                                                                "30cm x 30cm x 10cm":  0.58,
                                                                "39cm x 40cm":  0.75,
                                                                "35cm x 40cm x 10cm":  0.8,
                                                                "40cm x 40cm x 10cm":  0.86,
                                                                "45cm x 40cm x 10cm":  0.95,
                                                                "50cm x 40cm x 10cm":  1,
                                                                "50cm x 50cm x 10cm":  1.15,
                                                                "60cm x 50cm x 10cm":  1.45
                                                            },
                                      "Kraft - Torsadé":  {
                                                              "18x24x8 cm":  0.85,
                                                              "22x28x10 cm":  1.05,
                                                              "25x35x10 cm":  1.25,
                                                              "28x38x12 cm":  1.45,
                                                              "32x42x12 cm":  1.7,
                                                              "42x50x14 cm":  2.3
                                                          },
                                      "Kraft - Plat":  {
                                                           "18x24x8 cm":  0.7,
                                                           "22x28x10 cm":  0.9,
                                                           "25x35x10 cm":  1.1,
                                                           "28x38x12 cm":  1.3,
                                                           "32x42x12 cm":  1.5,
                                                           "42x50x14 cm":  2.1
                                                       },
                                      "Papier Luxe":  {
                                                          "15x20x7 cm":  2.5,
                                                          "20x25x10 cm":  3.2,
                                                          "25x32x11 cm":  3.9,
                                                          "32x40x12 cm":  4.8,
                                                          "42x50x14 cm":  5.9,
                                                          "54x45x14 cm":  7.2
                                                      },
                                      "Carton - Boîte valise":  {
                                                                    "20x15x8 cm":  1.9,
                                                                    "25x20x10 cm":  2.4,
                                                                    "30x25x10 cm":  2.9,
                                                                    "35x30x12 cm":  3.6,
                                                                    "25x35x10 cm":  3,
                                                                    "32x42x12 cm":  3.9
                                                                },
                                      "Carton - Caisse américaine":  {
                                                                         "20x15x15 cm":  1.8,
                                                                         "25x20x15 cm":  2.3,
                                                                         "30x25x20 cm":  2.8,
                                                                         "35x30x25 cm":  3.5,
                                                                         "40x35x30 cm":  4.5,
                                                                         "50x40x35 cm":  5.8
                                                                     },
                                      "Plastique":  {
                                                        "25x35 cm":  0.4,
                                                        "30x40 cm":  0.55,
                                                        "35x45 cm":  0.7,
                                                        "40x50 cm":  0.85,
                                                        "45x55 cm":  1.05,
                                                        "50x60 cm":  1.3
                                                    },
                                      "Ruban":  {
                                                    "10 mm":  0.2,
                                                    "15 mm":  0.3,
                                                    "20 mm":  0.4,
                                                    "25 mm":  0.5,
                                                    "30 mm":  0.65,
                                                    "40 mm":  0.85
                                                },
                                      "Kraft":  {
                                                    "18x24x8 cm":  0.75,
                                                    "22x28x10 cm":  0.95,
                                                    "25x35x10 cm":  1.15,
                                                    "28x38x12 cm":  1.35,
                                                    "32x42x12 cm":  1.6,
                                                    "42x50x14 cm":  2.2
                                                },
                                      "Carton":  {
                                                     "20x15x8 cm":  1.8,
                                                     "25x20x10 cm":  2.3,
                                                     "30x25x10 cm":  2.8,
                                                     "35x30x12 cm":  3.5,
                                                     "25x35x10 cm":  2.9,
                                                     "32x42x12 cm":  3.8
                                                 }
                                  },
                     "sacCatalog":  {
                                        "Non Tissé - Poignée":  [
                                                                    "25cm x 20cm",
                                                                    "29cm x 22cm",
                                                                    "35cm x 25cm",
                                                                    "37cm x 30cm",
                                                                    "35cm x 40cm x 10cm",
                                                                    "50cm x 40cm x 10cm",
                                                                    "50cm x 50cm x 10cm"
                                                                ],
                                        "Non Tissé - Anses":  [
                                                                  "30cm x 30cm",
                                                                  "30cm x 30cm x 10cm",
                                                                  "39cm x 40cm",
                                                                  "35cm x 40cm x 10cm",
                                                                  "40cm x 40cm x 10cm",
                                                                  "45cm x 40cm x 10cm",
                                                                  "50cm x 40cm x 10cm",
                                                                  "50cm x 50cm x 10cm",
                                                                  "60cm x 50cm x 10cm"
                                                              ],
                                        "Kraft - Torsadé":  [
                                                                "18x24x8 cm",
                                                                "22x28x10 cm",
                                                                "25x35x10 cm",
                                                                "28x38x12 cm",
                                                                "32x42x12 cm",
                                                                "42x50x14 cm"
                                                            ],
                                        "Kraft - Plat":  [
                                                             "18x24x8 cm",
                                                             "22x28x10 cm",
                                                             "25x35x10 cm",
                                                             "28x38x12 cm",
                                                             "32x42x12 cm",
                                                             "42x50x14 cm"
                                                         ],
                                        "Papier Luxe":  [
                                                            "15x20x7 cm",
                                                            "20x25x10 cm",
                                                            "25x32x11 cm",
                                                            "32x40x12 cm",
                                                            "42x50x14 cm",
                                                            "54x45x14 cm"
                                                        ],
                                        "Carton - Boîte valise":  [
                                                                      "20x15x8 cm",
                                                                      "25x20x10 cm",
                                                                      "30x25x10 cm",
                                                                      "35x30x12 cm",
                                                                      "25x35x10 cm",
                                                                      "32x42x12 cm"
                                                                  ],
                                        "Carton - Caisse américaine":  [
                                                                           "20x15x15 cm",
                                                                           "25x20x15 cm",
                                                                           "30x25x20 cm",
                                                                           "35x30x25 cm",
                                                                           "40x35x30 cm",
                                                                           "50x40x35 cm"
                                                                       ],
                                        "Plastique":  [
                                                          "25x35 cm",
                                                          "30x40 cm",
                                                          "35x45 cm",
                                                          "40x50 cm",
                                                          "45x55 cm",
                                                          "50x60 cm"
                                                      ],
                                        "Ruban":  [
                                                      "10 mm",
                                                      "15 mm",
                                                      "20 mm",
                                                      "25 mm",
                                                      "30 mm",
                                                      "40 mm"
                                                  ],
                                        "Kraft":  [
                                                      "18x24x8 cm",
                                                      "22x28x10 cm",
                                                      "25x35x10 cm",
                                                      "28x38x12 cm",
                                                      "32x42x12 cm",
                                                      "42x50x14 cm"
                                                  ],
                                        "Carton":  [
                                                       "20x15x8 cm",
                                                       "25x20x10 cm",
                                                       "30x25x10 cm",
                                                       "35x30x12 cm",
                                                       "25x35x10 cm",
                                                       "32x42x12 cm"
                                                   ]
                                    },
                     "startOrderNumber":  100,
                     "partner1Name":  "Mohamed",
                     "partner2Name":  "Youssef",
                     "cycleStartDay":  10,
                     "employees":  [
                                       {
                                           "name":  "ahmed garroum",
                                           "role":  "عامل بالورشة",
                                           "phone":  "0663002276"
                                       }
                                   ],
                     "cloudEmail":  "masterprintmorocco@gmail.com",
                     "googleScriptUrl":  "",
                     "serverNetworkUrl":  "http://10.237.240.108:8080"
                 },
    "stockQrTokens":  [
                          {
                              "token":  "MP-STK-MULO4KHT-VQA3-1",
                              "stockId":  "stk_1790625371996",
                              "stockName":  "VERT",
                              "category":  "consommables",
                              "unit":  "كيلو",
                              "deductQty":  1,
                              "status":  "active",
                              "createdAt":  "2026-09-28T19:56:33.857Z",
                              "consumedAt":  null,
                              "consumedBy":  ""
                          },
                          {
                              "token":  "MP-STK-MULO4KHT-G409-2",
                              "stockId":  "stk_1790625371996",
                              "stockName":  "VERT",
                              "category":  "consommables",
                              "unit":  "كيلو",
                              "deductQty":  1,
                              "status":  "active",
                              "createdAt":  "2026-09-28T19:56:33.857Z",
                              "consumedAt":  null,
                              "consumedBy":  ""
                          },
                          {
                              "token":  "MP-STK-MULO6KTA-JXET-1",
                              "stockId":  "stk_1790625371996",
                              "stockName":  "VERT",
                              "category":  "consommables",
                              "unit":  "كيلو",
                              "deductQty":  1,
                              "status":  "consumed",
                              "createdAt":  "2026-09-28T19:58:07.582Z",
                              "consumedAt":  "2026-09-28T23:47:35.098Z",
                              "consumedBy":  ""
                          },
                          {
                              "token":  "MP-STK-MULO6KTA-MYDR-2",
                              "stockId":  "stk_1790625371996",
                              "stockName":  "VERT",
                              "category":  "consommables",
                              "unit":  "كيلو",
                              "deductQty":  1,
                              "status":  "active",
                              "createdAt":  "2026-09-28T19:58:07.582Z",
                              "consumedAt":  null,
                              "consumedBy":  ""
                          },
                          {
                              "token":  "MP-STK-MULO7I14-NUU9-1",
                              "stockId":  "stk_1790625371996",
                              "stockName":  "VERT",
                              "category":  "consommables",
                              "unit":  "كيلو",
                              "deductQty":  1,
                              "status":  "active",
                              "createdAt":  "2026-09-28T19:58:50.632Z",
                              "consumedAt":  null,
                              "consumedBy":  ""
                          },
                          {
                              "token":  "MP-STK-MULO7I14-4WYY-2",
                              "stockId":  "stk_1790625371996",
                              "stockName":  "VERT",
                              "category":  "consommables",
                              "unit":  "كيلو",
                              "deductQty":  1,
                              "status":  "active",
                              "createdAt":  "2026-09-28T19:58:50.632Z",
                              "consumedAt":  null,
                              "consumedBy":  ""
                          },
                          {
                              "token":  "MP-STK-MULP2O6V-QRBF-1",
                              "stockId":  "stk_1790625371996",
                              "stockName":  "VERT",
                              "category":  "consommables",
                              "unit":  "كيلو",
                              "deductQty":  1,
                              "status":  "active",
                              "createdAt":  "2026-09-28T20:23:04.951Z",
                              "consumedAt":  null,
                              "consumedBy":  ""
                          },
                          {
                              "token":  "MP-STK-MULP2O6V-4QSH-2",
                              "stockId":  "stk_1790625371996",
                              "stockName":  "VERT",
                              "category":  "consommables",
                              "unit":  "كيلو",
                              "deductQty":  1,
                              "status":  "active",
                              "createdAt":  "2026-09-28T20:23:04.951Z",
                              "consumedAt":  null,
                              "consumedBy":  ""
                          },
                          {
                              "token":  "MP-STK-MULP4VGE-5QHL-1",
                              "stockId":  "stk_1790625371996",
                              "stockName":  "VERT",
                              "category":  "consommables",
                              "unit":  "كيلو",
                              "deductQty":  1,
                              "status":  "active",
                              "createdAt":  "2026-09-28T20:24:47.678Z",
                              "consumedAt":  null,
                              "consumedBy":  ""
                          },
                          {
                              "token":  "MP-STK-MULP4VGE-H9PC-2",
                              "stockId":  "stk_1790625371996",
                              "stockName":  "VERT",
                              "category":  "consommables",
                              "unit":  "كيلو",
                              "deductQty":  1,
                              "status":  "active",
                              "createdAt":  "2026-09-28T20:24:47.678Z",
                              "consumedAt":  null,
                              "consumedBy":  ""
                          },
                          {
                              "token":  "MP-STK-MV2HOMZP-WC14-1",
                              "stockId":  "stk_1791642497620",
                              "stockName":  "plastique Ecom noir mat 37x48cm",
                              "category":  "sacs",
                              "unit":  "حبة",
                              "deductQty":  1,
                              "status":  "active",
                              "createdAt":  "2026-10-10T14:28:17.893Z",
                              "consumedAt":  null,
                              "consumedBy":  ""
                          },
                          {
                              "token":  "MP-STK-MV2HOMZP-SF1X-2",
                              "stockId":  "stk_1791642497620",
                              "stockName":  "plastique Ecom noir mat 37x48cm",
                              "category":  "sacs",
                              "unit":  "حبة",
                              "deductQty":  1,
                              "status":  "active",
                              "createdAt":  "2026-10-10T14:28:17.893Z",
                              "consumedAt":  null,
                              "consumedBy":  ""
                          },
                          {
                              "token":  "MP-STK-MV2HOMZP-5FX9-3",
                              "stockId":  "stk_1791642497620",
                              "stockName":  "plastique Ecom noir mat 37x48cm",
                              "category":  "sacs",
                              "unit":  "حبة",
                              "deductQty":  1,
                              "status":  "active",
                              "createdAt":  "2026-10-10T14:28:17.893Z",
                              "consumedAt":  null,
                              "consumedBy":  ""
                          },
                          {
                              "token":  "MP-STK-MV2HOMZP-1SBN-4",
                              "stockId":  "stk_1791642497620",
                              "stockName":  "plastique Ecom noir mat 37x48cm",
                              "category":  "sacs",
                              "unit":  "حبة",
                              "deductQty":  1,
                              "status":  "active",
                              "createdAt":  "2026-10-10T14:28:17.893Z",
                              "consumedAt":  null,
                              "consumedBy":  ""
                          },
                          {
                              "token":  "MP-STK-MV2HOMZP-9KQV-5",
                              "stockId":  "stk_1791642497620",
                              "stockName":  "plastique Ecom noir mat 37x48cm",
                              "category":  "sacs",
                              "unit":  "حبة",
                              "deductQty":  1,
                              "status":  "active",
                              "createdAt":  "2026-10-10T14:28:17.893Z",
                              "consumedAt":  null,
                              "consumedBy":  ""
                          },
                          {
                              "token":  "MP-STK-MV2HOMZP-V6AG-6",
                              "stockId":  "stk_1791642497620",
                              "stockName":  "plastique Ecom noir mat 37x48cm",
                              "category":  "sacs",
                              "unit":  "حبة",
                              "deductQty":  1,
                              "status":  "active",
                              "createdAt":  "2026-10-10T14:28:17.893Z",
                              "consumedAt":  null,
                              "consumedBy":  ""
                          },
                          {
                              "token":  "MP-STK-MV2HOMZP-S3UD-7",
                              "stockId":  "stk_1791642497620",
                              "stockName":  "plastique Ecom noir mat 37x48cm",
                              "category":  "sacs",
                              "unit":  "حبة",
                              "deductQty":  1,
                              "status":  "active",
                              "createdAt":  "2026-10-10T14:28:17.893Z",
                              "consumedAt":  null,
                              "consumedBy":  ""
                          },
                          {
                              "token":  "MP-STK-MV2HOMZP-4H4R-8",
                              "stockId":  "stk_1791642497620",
                              "stockName":  "plastique Ecom noir mat 37x48cm",
                              "category":  "sacs",
                              "unit":  "حبة",
                              "deductQty":  1,
                              "status":  "active",
                              "createdAt":  "2026-10-10T14:28:17.893Z",
                              "consumedAt":  null,
                              "consumedBy":  ""
                          },
                          {
                              "token":  "MP-STK-MV2HOMZP-2ZWR-9",
                              "stockId":  "stk_1791642497620",
                              "stockName":  "plastique Ecom noir mat 37x48cm",
                              "category":  "sacs",
                              "unit":  "حبة",
                              "deductQty":  1,
                              "status":  "active",
                              "createdAt":  "2026-10-10T14:28:17.893Z",
                              "consumedAt":  null,
                              "consumedBy":  ""
                          },
                          {
                              "token":  "MP-STK-MV2HOMZP-FC3B-10",
                              "stockId":  "stk_1791642497620",
                              "stockName":  "plastique Ecom noir mat 37x48cm",
                              "category":  "sacs",
                              "unit":  "حبة",
                              "deductQty":  1,
                              "status":  "active",
                              "createdAt":  "2026-10-10T14:28:17.893Z",
                              "consumedAt":  null,
                              "consumedBy":  ""
                          },
                          {
                              "token":  "MP-STK-MV2HOMZP-N2V9-11",
                              "stockId":  "stk_1791642497620",
                              "stockName":  "plastique Ecom noir mat 37x48cm",
                              "category":  "sacs",
                              "unit":  "حبة",
                              "deductQty":  1,
                              "status":  "active",
                              "createdAt":  "2026-10-10T14:28:17.893Z",
                              "consumedAt":  null,
                              "consumedBy":  ""
                          },
                          {
                              "token":  "MP-STK-MV2HOMZP-OM3H-12",
                              "stockId":  "stk_1791642497620",
                              "stockName":  "plastique Ecom noir mat 37x48cm",
                              "category":  "sacs",
                              "unit":  "حبة",
                              "deductQty":  1,
                              "status":  "active",
                              "createdAt":  "2026-10-10T14:28:17.893Z",
                              "consumedAt":  null,
                              "consumedBy":  ""
                          },
                          {
                              "token":  "MP-STK-MV2HOMZP-P2AT-13",
                              "stockId":  "stk_1791642497620",
                              "stockName":  "plastique Ecom noir mat 37x48cm",
                              "category":  "sacs",
                              "unit":  "حبة",
                              "deductQty":  1,
                              "status":  "active",
                              "createdAt":  "2026-10-10T14:28:17.893Z",
                              "consumedAt":  null,
                              "consumedBy":  ""
                          },
                          {
                              "token":  "MP-STK-MV2HOMZP-SSV7-14",
                              "stockId":  "stk_1791642497620",
                              "stockName":  "plastique Ecom noir mat 37x48cm",
                              "category":  "sacs",
                              "unit":  "حبة",
                              "deductQty":  1,
                              "status":  "active",
                              "createdAt":  "2026-10-10T14:28:17.893Z",
                              "consumedAt":  null,
                              "consumedBy":  ""
                          },
                          {
                              "token":  "MP-STK-MV2HOMZP-LMA3-15",
                              "stockId":  "stk_1791642497620",
                              "stockName":  "plastique Ecom noir mat 37x48cm",
                              "category":  "sacs",
                              "unit":  "حبة",
                              "deductQty":  1,
                              "status":  "active",
                              "createdAt":  "2026-10-10T14:28:17.893Z",
                              "consumedAt":  null,
                              "consumedBy":  ""
                          },
                          {
                              "token":  "MP-STK-MV2HOMZP-TZ0C-16",
                              "stockId":  "stk_1791642497620",
                              "stockName":  "plastique Ecom noir mat 37x48cm",
                              "category":  "sacs",
                              "unit":  "حبة",
                              "deductQty":  1,
                              "status":  "active",
                              "createdAt":  "2026-10-10T14:28:17.893Z",
                              "consumedAt":  null,
                              "consumedBy":  ""
                          },
                          {
                              "token":  "MP-STK-MV2HOMZP-VBX8-17",
                              "stockId":  "stk_1791642497620",
                              "stockName":  "plastique Ecom noir mat 37x48cm",
                              "category":  "sacs",
                              "unit":  "حبة",
                              "deductQty":  1,
                              "status":  "active",
                              "createdAt":  "2026-10-10T14:28:17.893Z",
                              "consumedAt":  null,
                              "consumedBy":  ""
                          },
                          {
                              "token":  "MP-STK-MV2HOMZP-U4HJ-18",
                              "stockId":  "stk_1791642497620",
                              "stockName":  "plastique Ecom noir mat 37x48cm",
                              "category":  "sacs",
                              "unit":  "حبة",
                              "deductQty":  1,
                              "status":  "active",
                              "createdAt":  "2026-10-10T14:28:17.893Z",
                              "consumedAt":  null,
                              "consumedBy":  ""
                          },
                          {
                              "token":  "MP-STK-MV2HOMZP-9V4R-19",
                              "stockId":  "stk_1791642497620",
                              "stockName":  "plastique Ecom noir mat 37x48cm",
                              "category":  "sacs",
                              "unit":  "حبة",
                              "deductQty":  1,
                              "status":  "active",
                              "createdAt":  "2026-10-10T14:28:17.893Z",
                              "consumedAt":  null,
                              "consumedBy":  ""
                          },
                          {
                              "token":  "MP-STK-MV2HOMZP-MM3B-20",
                              "stockId":  "stk_1791642497620",
                              "stockName":  "plastique Ecom noir mat 37x48cm",
                              "category":  "sacs",
                              "unit":  "حبة",
                              "deductQty":  1,
                              "status":  "active",
                              "createdAt":  "2026-10-10T14:28:17.893Z",
                              "consumedAt":  null,
                              "consumedBy":  ""
                          },
                          {
                              "token":  "MP-STK-MV2HOMZP-9JVI-21",
                              "stockId":  "stk_1791642497620",
                              "stockName":  "plastique Ecom noir mat 37x48cm",
                              "category":  "sacs",
                              "unit":  "حبة",
                              "deductQty":  1,
                              "status":  "active",
                              "createdAt":  "2026-10-10T14:28:17.893Z",
                              "consumedAt":  null,
                              "consumedBy":  ""
                          },
                          {
                              "token":  "MP-STK-MV2HOMZP-4RTC-22",
                              "stockId":  "stk_1791642497620",
                              "stockName":  "plastique Ecom noir mat 37x48cm",
                              "category":  "sacs",
                              "unit":  "حبة",
                              "deductQty":  1,
                              "status":  "active",
                              "createdAt":  "2026-10-10T14:28:17.893Z",
                              "consumedAt":  null,
                              "consumedBy":  ""
                          },
                          {
                              "token":  "MP-STK-MV2HOMZP-R8IL-23",
                              "stockId":  "stk_1791642497620",
                              "stockName":  "plastique Ecom noir mat 37x48cm",
                              "category":  "sacs",
                              "unit":  "حبة",
                              "deductQty":  1,
                              "status":  "active",
                              "createdAt":  "2026-10-10T14:28:17.893Z",
                              "consumedAt":  null,
                              "consumedBy":  ""
                          },
                          {
                              "token":  "MP-STK-MV2HOMZP-2QQN-24",
                              "stockId":  "stk_1791642497620",
                              "stockName":  "plastique Ecom noir mat 37x48cm",
                              "category":  "sacs",
                              "unit":  "حبة",
                              "deductQty":  1,
                              "status":  "active",
                              "createdAt":  "2026-10-10T14:28:17.893Z",
                              "consumedAt":  null,
                              "consumedBy":  ""
                          },
                          {
                              "token":  "MP-STK-MV2HOMZP-BIVD-25",
                              "stockId":  "stk_1791642497620",
                              "stockName":  "plastique Ecom noir mat 37x48cm",
                              "category":  "sacs",
                              "unit":  "حبة",
                              "deductQty":  1,
                              "status":  "active",
                              "createdAt":  "2026-10-10T14:28:17.893Z",
                              "consumedAt":  null,
                              "consumedBy":  ""
                          },
                          {
                              "token":  "MP-STK-MV2HOMZP-F5HJ-26",
                              "stockId":  "stk_1791642497620",
                              "stockName":  "plastique Ecom noir mat 37x48cm",
                              "category":  "sacs",
                              "unit":  "حبة",
                              "deductQty":  1,
                              "status":  "active",
                              "createdAt":  "2026-10-10T14:28:17.893Z",
                              "consumedAt":  null,
                              "consumedBy":  ""
                          },
                          {
                              "token":  "MP-STK-MV2HOMZP-KK06-27",
                              "stockId":  "stk_1791642497620",
                              "stockName":  "plastique Ecom noir mat 37x48cm",
                              "category":  "sacs",
                              "unit":  "حبة",
                              "deductQty":  1,
                              "status":  "active",
                              "createdAt":  "2026-10-10T14:28:17.893Z",
                              "consumedAt":  null,
                              "consumedBy":  ""
                          },
                          {
                              "token":  "MP-STK-MV2HOMZP-1N41-28",
                              "stockId":  "stk_1791642497620",
                              "stockName":  "plastique Ecom noir mat 37x48cm",
                              "category":  "sacs",
                              "unit":  "حبة",
                              "deductQty":  1,
                              "status":  "active",
                              "createdAt":  "2026-10-10T14:28:17.893Z",
                              "consumedAt":  null,
                              "consumedBy":  ""
                          },
                          {
                              "token":  "MP-STK-MV2HOMZP-X7S5-29",
                              "stockId":  "stk_1791642497620",
                              "stockName":  "plastique Ecom noir mat 37x48cm",
                              "category":  "sacs",
                              "unit":  "حبة",
                              "deductQty":  1,
                              "status":  "active",
                              "createdAt":  "2026-10-10T14:28:17.893Z",
                              "consumedAt":  null,
                              "consumedBy":  ""
                          },
                          {
                              "token":  "MP-STK-MV2HOMZP-V6FZ-30",
                              "stockId":  "stk_1791642497620",
                              "stockName":  "plastique Ecom noir mat 37x48cm",
                              "category":  "sacs",
                              "unit":  "حبة",
                              "deductQty":  1,
                              "status":  "active",
                              "createdAt":  "2026-10-10T14:28:17.893Z",
                              "consumedAt":  null,
                              "consumedBy":  ""
                          },
                          {
                              "token":  "MP-STK-MV2HOMZP-NQ4A-31",
                              "stockId":  "stk_1791642497620",
                              "stockName":  "plastique Ecom noir mat 37x48cm",
                              "category":  "sacs",
                              "unit":  "حبة",
                              "deductQty":  1,
                              "status":  "active",
                              "createdAt":  "2026-10-10T14:28:17.893Z",
                              "consumedAt":  null,
                              "consumedBy":  ""
                          },
                          {
                              "token":  "MP-STK-MV2HOMZP-LMIW-32",
                              "stockId":  "stk_1791642497620",
                              "stockName":  "plastique Ecom noir mat 37x48cm",
                              "category":  "sacs",
                              "unit":  "حبة",
                              "deductQty":  1,
                              "status":  "active",
                              "createdAt":  "2026-10-10T14:28:17.893Z",
                              "consumedAt":  null,
                              "consumedBy":  ""
                          },
                          {
                              "token":  "MP-STK-MV2HOMZP-49YU-33",
                              "stockId":  "stk_1791642497620",
                              "stockName":  "plastique Ecom noir mat 37x48cm",
                              "category":  "sacs",
                              "unit":  "حبة",
                              "deductQty":  1,
                              "status":  "active",
                              "createdAt":  "2026-10-10T14:28:17.893Z",
                              "consumedAt":  null,
                              "consumedBy":  ""
                          },
                          {
                              "token":  "MP-STK-MV2HOMZP-4H1A-34",
                              "stockId":  "stk_1791642497620",
                              "stockName":  "plastique Ecom noir mat 37x48cm",
                              "category":  "sacs",
                              "unit":  "حبة",
                              "deductQty":  1,
                              "status":  "active",
                              "createdAt":  "2026-10-10T14:28:17.893Z",
                              "consumedAt":  null,
                              "consumedBy":  ""
                          },
                          {
                              "token":  "MP-STK-MV2HOMZP-M6YH-35",
                              "stockId":  "stk_1791642497620",
                              "stockName":  "plastique Ecom noir mat 37x48cm",
                              "category":  "sacs",
                              "unit":  "حبة",
                              "deductQty":  1,
                              "status":  "active",
                              "createdAt":  "2026-10-10T14:28:17.893Z",
                              "consumedAt":  null,
                              "consumedBy":  ""
                          },
                          {
                              "token":  "MP-STK-MV2HOMZP-787I-36",
                              "stockId":  "stk_1791642497620",
                              "stockName":  "plastique Ecom noir mat 37x48cm",
                              "category":  "sacs",
                              "unit":  "حبة",
                              "deductQty":  1,
                              "status":  "active",
                              "createdAt":  "2026-10-10T14:28:17.893Z",
                              "consumedAt":  null,
                              "consumedBy":  ""
                          },
                          {
                              "token":  "MP-STK-MV2HOMZP-I0YT-37",
                              "stockId":  "stk_1791642497620",
                              "stockName":  "plastique Ecom noir mat 37x48cm",
                              "category":  "sacs",
                              "unit":  "حبة",
                              "deductQty":  1,
                              "status":  "active",
                              "createdAt":  "2026-10-10T14:28:17.893Z",
                              "consumedAt":  null,
                              "consumedBy":  ""
                          },
                          {
                              "token":  "MP-STK-MV2HOMZP-7NCT-38",
                              "stockId":  "stk_1791642497620",
                              "stockName":  "plastique Ecom noir mat 37x48cm",
                              "category":  "sacs",
                              "unit":  "حبة",
                              "deductQty":  1,
                              "status":  "active",
                              "createdAt":  "2026-10-10T14:28:17.893Z",
                              "consumedAt":  null,
                              "consumedBy":  ""
                          },
                          {
                              "token":  "MP-STK-MV2HOMZP-612Z-39",
                              "stockId":  "stk_1791642497620",
                              "stockName":  "plastique Ecom noir mat 37x48cm",
                              "category":  "sacs",
                              "unit":  "حبة",
                              "deductQty":  1,
                              "status":  "active",
                              "createdAt":  "2026-10-10T14:28:17.893Z",
                              "consumedAt":  null,
                              "consumedBy":  ""
                          },
                          {
                              "token":  "MP-STK-MV2HOMZP-SBN1-40",
                              "stockId":  "stk_1791642497620",
                              "stockName":  "plastique Ecom noir mat 37x48cm",
                              "category":  "sacs",
                              "unit":  "حبة",
                              "deductQty":  1,
                              "status":  "active",
                              "createdAt":  "2026-10-10T14:28:17.893Z",
                              "consumedAt":  null,
                              "consumedBy":  ""
                          },
                          {
                              "token":  "MP-STK-MV2HOMZP-A0MP-41",
                              "stockId":  "stk_1791642497620",
                              "stockName":  "plastique Ecom noir mat 37x48cm",
                              "category":  "sacs",
                              "unit":  "حبة",
                              "deductQty":  1,
                              "status":  "active",
                              "createdAt":  "2026-10-10T14:28:17.893Z",
                              "consumedAt":  null,
                              "consumedBy":  ""
                          },
                          {
                              "token":  "MP-STK-MV2HOMZP-XFC8-42",
                              "stockId":  "stk_1791642497620",
                              "stockName":  "plastique Ecom noir mat 37x48cm",
                              "category":  "sacs",
                              "unit":  "حبة",
                              "deductQty":  1,
                              "status":  "active",
                              "createdAt":  "2026-10-10T14:28:17.893Z",
                              "consumedAt":  null,
                              "consumedBy":  ""
                          },
                          {
                              "token":  "MP-STK-MV2HOMZP-PZ1X-43",
                              "stockId":  "stk_1791642497620",
                              "stockName":  "plastique Ecom noir mat 37x48cm",
                              "category":  "sacs",
                              "unit":  "حبة",
                              "deductQty":  1,
                              "status":  "active",
                              "createdAt":  "2026-10-10T14:28:17.893Z",
                              "consumedAt":  null,
                              "consumedBy":  ""
                          },
                          {
                              "token":  "MP-STK-MV2HOMZP-RIFY-44",
                              "stockId":  "stk_1791642497620",
                              "stockName":  "plastique Ecom noir mat 37x48cm",
                              "category":  "sacs",
                              "unit":  "حبة",
                              "deductQty":  1,
                              "status":  "active",
                              "createdAt":  "2026-10-10T14:28:17.893Z",
                              "consumedAt":  null,
                              "consumedBy":  ""
                          },
                          {
                              "token":  "MP-STK-MV2HOMZP-O42W-45",
                              "stockId":  "stk_1791642497620",
                              "stockName":  "plastique Ecom noir mat 37x48cm",
                              "category":  "sacs",
                              "unit":  "حبة",
                              "deductQty":  1,
                              "status":  "active",
                              "createdAt":  "2026-10-10T14:28:17.893Z",
                              "consumedAt":  null,
                              "consumedBy":  ""
                          },
                          {
                              "token":  "MP-STK-MV2HOMZP-KRMA-46",
                              "stockId":  "stk_1791642497620",
                              "stockName":  "plastique Ecom noir mat 37x48cm",
                              "category":  "sacs",
                              "unit":  "حبة",
                              "deductQty":  1,
                              "status":  "active",
                              "createdAt":  "2026-10-10T14:28:17.893Z",
                              "consumedAt":  null,
                              "consumedBy":  ""
                          },
                          {
                              "token":  "MP-STK-MV2HOMZP-EXO9-47",
                              "stockId":  "stk_1791642497620",
                              "stockName":  "plastique Ecom noir mat 37x48cm",
                              "category":  "sacs",
                              "unit":  "حبة",
                              "deductQty":  1,
                              "status":  "active",
                              "createdAt":  "2026-10-10T14:28:17.893Z",
                              "consumedAt":  null,
                              "consumedBy":  ""
                          },
                          {
                              "token":  "MP-STK-MV2HOMZP-OK72-48",
                              "stockId":  "stk_1791642497620",
                              "stockName":  "plastique Ecom noir mat 37x48cm",
                              "category":  "sacs",
                              "unit":  "حبة",
                              "deductQty":  1,
                              "status":  "active",
                              "createdAt":  "2026-10-10T14:28:17.893Z",
                              "consumedAt":  null,
                              "consumedBy":  ""
                          },
                          {
                              "token":  "MP-STK-MV2HOMZP-4SG0-49",
                              "stockId":  "stk_1791642497620",
                              "stockName":  "plastique Ecom noir mat 37x48cm",
                              "category":  "sacs",
                              "unit":  "حبة",
                              "deductQty":  1,
                              "status":  "active",
                              "createdAt":  "2026-10-10T14:28:17.893Z",
                              "consumedAt":  null,
                              "consumedBy":  ""
                          },
                          {
                              "token":  "MP-STK-MV2HOMZP-JN4O-50",
                              "stockId":  "stk_1791642497620",
                              "stockName":  "plastique Ecom noir mat 37x48cm",
                              "category":  "sacs",
                              "unit":  "حبة",
                              "deductQty":  1,
                              "status":  "active",
                              "createdAt":  "2026-10-10T14:28:17.893Z",
                              "consumedAt":  null,
                              "consumedBy":  ""
                          }
                      ]
};

const DEFAULT_SETTINGS = AUTHENTIC_DATABASE.settings || {
  workshopName: "MASTER PRINT",
  phone: "0663103599",
  city: "Agadir, Maroc",
  receiptNote: "Ø§Ù„Ù…Ø±Ø¬Ùˆ Ø§Ù„ØªØ£ÙƒØ¯ ÙˆØ§Ù„Ù…ÙˆØ§ÙÙ‚Ø© Ø¹Ù„Ù‰ Ù†Ù…ÙˆØ°Ø¬ Ø§Ù„ØªØµÙ…ÙŠÙ… (BAT) Ù‚Ø¨Ù„ Ø§Ù†Ø·Ù„Ø§Ù‚ Ø§Ù„Ø·Ø¨Ø§Ø¹Ø©. Ø§Ù„Ø¨Ø¶Ø§Ø¹Ø© Ø§Ù„Ù…Ø·Ø¨ÙˆØ¹Ø© Ù„Ø§ ØªØ±Ø¯ ÙˆÙ„Ø§ ØªØ³ØªØ¨Ø¯Ù„ Ø¨Ø¹Ø¯ Ø§Ù„Ù…ÙˆØ§ÙÙ‚Ø©.",
  initialCapital: 22385,
  startOrderNumber: 100,
  partner1Name: "Mohamed",
  partner2Name: "Youssef",
  cycleStartDay: 10,
  employees: [{ name: "ahmed garroum", role: "عامل بالورشة", phone: "0663002276" }],
  bagCosts: SAC_DEFAULT_COSTS,
  sacCatalog: SAC_CATALOG
};

const INITIAL_STOCK = AUTHENTIC_DATABASE.stock || [];
const INITIAL_COMMANDES = AUTHENTIC_DATABASE.orders || [];
const INITIAL_TRANSACTIONS = AUTHENTIC_DATABASE.caisse || [];
const INITIAL_STOCK_QR_TOKENS = AUTHENTIC_DATABASE.stockQrTokens || [];

let state = {
  currentTab: "dashboard",
  selectedCycle: "CURRENT",
  caissePeriodFilter: "all",
  customCaisseDate: "",
  productRankingFilter: "month",
  drilldownCurrentType: "",
  drilldownCurrentItems: [],
  drilldownCurrentColumns: [],
  stockQrTokens: [],
  syncQueue: [],
  associatesCycleFilter: "ALL",
  orders: [],
  caisse: [],
  stock: [],
  settings: DEFAULT_SETTINGS
};

// ==============================================
// INITIALIZATION
// ==============================================
function initApp() {
  loadData();
  fetchServerDatabase();
  sanitizeOzoneCaisseTransactions();
  setupCycleSelector();
  setupEventListeners();
  populateSacSizes("Non Tissé");
  startCountdownTicker();
  if (window.initOzoneCityDatalist) window.initOzoneCityDatalist();
  renderAll();
  initCloudSync();
  if (typeof checkUrlQrScanParam === "function") checkUrlQrScanParam();
  lucide.createIcons();

  // تفعيل سياق الصوت عند أول تفاعل للمستخدم لتفادي قيود المتصفح
  const unlockAudio = () => {
    try {
      const AudioContext = window.AudioContext || window.webkitAudioContext;
      if (AudioContext) {
        const ctx = new AudioContext();
        if (ctx.state === "suspended") ctx.resume();
      }
    } catch (e) {}
    document.removeEventListener("click", unlockAudio);
    document.removeEventListener("touchstart", unlockAudio);
  };
  document.addEventListener("click", unlockAudio, { once: true });
  document.addEventListener("touchstart", unlockAudio, { once: true });
}

function fetchServerDatabase() {
  return fetch("/api/load-data", { cache: "no-store" })
    .then(r => r.json())
    .then(data => {
      if (data && Array.isArray(data.orders) && data.orders.length > 0) {
        state.orders = data.orders;
        state.caisse = data.caisse || [];
        state.stock = data.stock || [];
        if (data.stockQrTokens) {
          state.stockQrTokens = data.stockQrTokens;
        }
        if (Array.isArray(state.stock)) {
          state.stock.forEach(item => {
            if (!item.category) item.category = "sacs";
            if (!item.unit) item.unit = "حبة";
            if (!item.titleColor) item.titleColor = getItemDefaultColor(item);
            if (!item.supplier && item.name && item.name.toUpperCase().includes("AMK")) item.supplier = "AMK";
            if (item.consumedManual === undefined || item.consumedManual === null) item.consumedManual = 0;
            if (item.consumedQr === undefined || item.consumedQr === null) {
              const qrTokens = state.stockQrTokens || [];
              item.consumedQr = qrTokens
                .filter(t => t.stockId === item.id && t.status === "consumed")
                .reduce((sum, t) => sum + (Number(t.deductQty) || 1), 0);
            }
            if (item.initialQuantity === undefined || item.initialQuantity === null) {
              item.initialQuantity = Number(item.quantity || 0) + (Number(item.consumedQr || 0) + Number(item.consumedManual || 0));
            }
          });
        }
        if (data.settings && Object.keys(data.settings).length > 0) {
          state.settings = Object.assign({}, state.settings || {}, data.settings);
        }
        localStorage.setItem("mp_orders", JSON.stringify(state.orders));
        localStorage.setItem("mp_caisse", JSON.stringify(state.caisse));
        localStorage.setItem("mp_stock", JSON.stringify(state.stock));
        localStorage.setItem("mp_settings", JSON.stringify(state.settings));
        localStorage.setItem("mp_stock_qr_tokens", JSON.stringify(state.stockQrTokens || []));
        renderAll();
      }
      return state;
    })
    .catch(err => {
      console.log("Could not load from server db:", err);
      return null;
    });
}

function loadData() {
  try {
    const savedOrders = localStorage.getItem("mp_orders");
    const savedCaisse = localStorage.getItem("mp_caisse");
    const savedStock = localStorage.getItem("mp_stock");
    const savedSettings = localStorage.getItem("mp_settings");
    const savedQrTokens = localStorage.getItem("mp_stock_qr_tokens");

    let parsedOrders = [];
    try { parsedOrders = savedOrders ? JSON.parse(savedOrders) : []; } catch(e){}
    let parsedCaisse = [];
    try { parsedCaisse = savedCaisse ? JSON.parse(savedCaisse) : []; } catch(e){}
    let parsedStock = [];
    try { parsedStock = savedStock ? JSON.parse(savedStock) : []; } catch(e){}

    // Ø¥Ø°Ø§ ÙƒØ§Ù†Øª Ø§Ù„Ø°Ø§ÙƒØ±Ø© Ø§Ù„Ù…Ø­Ù„ÙŠØ© ÙØ§Ø±ØºØ© Ø£Ùˆ ØªÙ… ØªØµÙÙŠØ±Ù‡Ø§ØŒ Ù†Ù‚ÙˆÙ… ÙÙˆØ±Ø§Ù‹ Ø¨Ø§Ø³ØªØ¹Ø§Ø¯Ø© Ù‚Ø§Ø¹Ø¯Ø© Ø§Ù„Ø¨ÙŠØ§Ù†Ø§Øª Ø§Ù„Ø£ØµÙ„ÙŠØ© Ø§Ù„ÙƒØ§Ù…Ù„Ø©
    if (!Array.isArray(parsedOrders) || parsedOrders.length === 0) {
      parsedOrders = JSON.parse(JSON.stringify(AUTHENTIC_DATABASE.orders || []));
      localStorage.setItem("mp_orders", JSON.stringify(parsedOrders));
    }
    if (!Array.isArray(parsedCaisse) || parsedCaisse.length === 0) {
      parsedCaisse = JSON.parse(JSON.stringify(AUTHENTIC_DATABASE.caisse || []));
      localStorage.setItem("mp_caisse", JSON.stringify(parsedCaisse));
    }
    if (!Array.isArray(parsedStock) || parsedStock.length === 0) {
      parsedStock = JSON.parse(JSON.stringify(AUTHENTIC_DATABASE.stock || []));
      localStorage.setItem("mp_stock", JSON.stringify(parsedStock));
    }

    state.orders = parsedOrders;
    state.caisse = parsedCaisse;
    state.stock = parsedStock;
    let loadedSettings = DEFAULT_SETTINGS;
    try { if (savedSettings) loadedSettings = Object.assign({}, DEFAULT_SETTINGS, JSON.parse(savedSettings)); } catch(e){}
    state.settings = loadedSettings;
    state.stockQrTokens = savedQrTokens ? JSON.parse(savedQrTokens) : (AUTHENTIC_DATABASE.stockQrTokens || []);

    // تطبيع وتعيين صفة الزبون الافتراضية لكل الطلبيات
    state.orders.forEach(o => {
      if (!o.clientGender) o.clientGender = 'male';
    });

    // تطبيع وتعيين فئة السلعة ووحدة القياس ولون RGB الافتراضي والاستهلاك للمخزون
    if (Array.isArray(state.stock)) {
      state.stock.forEach(item => {
        if (!item.category) item.category = "sacs";
        if (!item.unit) item.unit = "حبة";
        if (!item.titleColor) item.titleColor = getItemDefaultColor(item);
        if (!item.supplier && item.name && item.name.toUpperCase().includes("AMK")) item.supplier = "AMK";
        if (item.consumedManual === undefined || item.consumedManual === null) item.consumedManual = 0;
        if (item.consumedQr === undefined || item.consumedQr === null) {
          const qrTokens = state.stockQrTokens || [];
          item.consumedQr = qrTokens
            .filter(t => t.stockId === item.id && t.status === "consumed")
            .reduce((sum, t) => sum + (Number(t.deductQty) || 1), 0);
        }
        if (item.initialQuantity === undefined || item.initialQuantity === null) {
          item.initialQuantity = Number(item.quantity || 0) + (Number(item.consumedQr || 0) + Number(item.consumedManual || 0));
        }
      });
    }

    // تصحيح أي تسجيل قديم ناقص للطلبية 003 في الصندوق من البيانات التجريبية
    if (Array.isArray(state.caisse)) {
      const trx3 = state.caisse.find(t => t.id === "trx_3" && (t.description?.includes("طلب-2026-003") || t.amount === 350));
      if (trx3 && trx3.amount === 350) {
        trx3.amount = 1800;
        trx3.description = "خلاص كامل طلبية أكياس كرافت طلب-2026-003 (مريم بنعلي)";
      }
    }

    // تثبيت دائم لمعلومات MASTER PRINT ورأس مال الانطلاق الافتراضي وترقيم الطلبيات
    if (!state.settings) state.settings = DEFAULT_SETTINGS;
    if (state.settings.initialCapital === undefined || state.settings.initialCapital === null) {
      state.settings.initialCapital = 1500;
    }
    if (!state.settings.startOrderNumber) {
      state.settings.startOrderNumber = 100;
    }
    if (!state.settings.partner1Name) state.settings.partner1Name = "أنا";
    if (!state.settings.partner2Name) state.settings.partner2Name = "الشريك";
    if (!state.settings.cycleStartDay) state.settings.cycleStartDay = 10;
    if (!Array.isArray(state.settings.employees)) state.settings.employees = [];
    state.settings.phone = "0663103599";
    state.settings.city = "Agadir, Maroc";
    state.settings.workshopName = "MASTER PRINT";
    state.settings.cloudEmail = "masterprintmorocco@gmail.com";
    state.settings.googleScriptUrl = localStorage.getItem("mp_google_script_url") || "";
    state.syncQueue = JSON.parse(localStorage.getItem("mp_sync_queue") || "[]");

    // ضمان توفر كتالوج القياسات القابل للتعديل والتخصيص
    if (!state.settings.sacCatalog) {
      state.settings.sacCatalog = JSON.parse(JSON.stringify(SAC_CATALOG));
    } else {
      Object.keys(SAC_CATALOG).forEach(cat => {
        if (!state.settings.sacCatalog[cat] || !Array.isArray(state.settings.sacCatalog[cat])) {
          state.settings.sacCatalog[cat] = [...SAC_CATALOG[cat]];
        }
      });
    }

    // ضمان توفر تسعيرة الشراء الافتراضية لكل الأصناف (بما فيها كرافت، كرتون، بلاستيك، وريبو)
    if (!state.settings.bagCosts) {
      state.settings.bagCosts = JSON.parse(JSON.stringify(SAC_DEFAULT_COSTS));
    } else {
      Object.keys(SAC_DEFAULT_COSTS).forEach(cat => {
        if (!state.settings.bagCosts[cat]) {
          state.settings.bagCosts[cat] = { ...SAC_DEFAULT_COSTS[cat] };
        } else {
          Object.keys(SAC_DEFAULT_COSTS[cat]).forEach(size => {
            if (state.settings.bagCosts[cat][size] === undefined) {
              state.settings.bagCosts[cat][size] = SAC_DEFAULT_COSTS[cat][size];
            }
          });
        }
      });
    }

    sanitizeOzoneCaisseTransactions();
  } catch (e) {
    console.error("Error loading local storage, using initial data", e);
    state.orders = INITIAL_COMMANDES;
    state.caisse = INITIAL_TRANSACTIONS;
    state.stock = INITIAL_STOCK;
    state.settings = DEFAULT_SETTINGS;
  }
}

/**
 * دالة عزل وتطهير مصاريف أوزون من رصيد الصندوق:
 * تضمن بنسبة 100% أن مصاريف التوصيل لشركة أوزون لا تدخل إطلاقاً في رصيد السيولة بالصندوق
 */
function sanitizeOzoneCaisseTransactions() {
  if (!Array.isArray(state.orders) || !Array.isArray(state.caisse)) return;
  let hasModifications = false;

  state.orders.forEach(order => {
    if (order.deliveryType === "ozone") {
      const ozoneFee = Number(order.ozoneFees || 0);
      const workshopMaxAmount = Math.max(0, Number(order.totalAmount || 0) - ozoneFee);

      // البحث عن كل المعاملات المرتبطة بهذه الطلبية في الصندوق
      const trxs = state.caisse.filter(t => 
        (t.orderId === order.id || (t.description && t.description.includes(order.id))) && 
        t.type === "entree"
      );

      const totalEntered = trxs.reduce((sum, t) => sum + Number(t.amount || 0), 0);
      if (totalEntered > workshopMaxAmount && totalEntered > 0) {
        const excess = totalEntered - workshopMaxAmount;
        let remainingExcess = excess;

        for (let t of trxs) {
          if (remainingExcess <= 0) break;
          const deductible = Math.min(Number(t.amount || 0), remainingExcess);
          t.amount = Number(t.amount || 0) - deductible;
          remainingExcess -= deductible;
          hasModifications = true;
        }
      }
    }
  });

  // فحص إضافي للمعاملات غير المربوطة بـ orderId ومطابقة لاسم الزبون ومبلغ أوزون
  state.orders.forEach(order => {
    if (order.deliveryType === "ozone") {
      const ozoneFee = Number(order.ozoneFees || 0);
      const workshopMaxAmount = Math.max(0, Number(order.totalAmount || 0) - ozoneFee);
      state.caisse.forEach(t => {
        if (t.type === "entree" && !t.orderId && t.description && order.clientName && t.description.includes(order.clientName)) {
          if (Number(t.amount || 0) > workshopMaxAmount) {
            t.amount = workshopMaxAmount;
            t.orderId = order.id;
            hasModifications = true;
          }
        }
      });
    }
  });

  if (hasModifications) {
    saveData();
  }

  return hasModifications;
}

function saveData() {
  if (!state.orders || state.orders.length === 0) {
    if (typeof window !== "undefined" && window.INITIAL_COMMANDES && window.INITIAL_COMMANDES.length > 0) {
      state.orders = window.INITIAL_COMMANDES;
    }
  }
  if (!state.caisse || state.caisse.length === 0) {
    if (typeof window !== "undefined" && window.INITIAL_TRANSACTIONS && window.INITIAL_TRANSACTIONS.length > 0) {
      state.caisse = window.INITIAL_TRANSACTIONS;
    }
  }

  localStorage.setItem("mp_orders", JSON.stringify(state.orders));
  localStorage.setItem("mp_caisse", JSON.stringify(state.caisse));
  localStorage.setItem("mp_stock", JSON.stringify(state.stock));
  localStorage.setItem("mp_settings", JSON.stringify(state.settings));
  localStorage.setItem("mp_stock_qr_tokens", JSON.stringify(state.stockQrTokens || []));
  
  if (typeof queueSyncAction === "function") {
    queueSyncAction("data_change", {
      ordersCount: state.orders.length,
      caisseCount: state.caisse.length,
      stockCount: state.stock.length
    });
  }

  // حفظ نسخة متزامنة على القرص الصلب لحماية الحسابات في كل المتصفحات (أمان ضد الحفظ الفارغ)
  if (state.orders && state.orders.length >= 5) {
    try {
      fetch("/api/save-data", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          orders: state.orders,
          caisse: state.caisse,
          stock: state.stock,
          settings: state.settings,
          stockQrTokens: state.stockQrTokens
        })
      }).catch(() => {});
    } catch (e) {}
  }
}

function setupEventListeners() {
  const today = new Date().toISOString().split("T")[0];
  const transDateEl = document.getElementById("trans-date");
  if (transDateEl) transDateEl.value = today;

  // منع إنشاء الطلبية مباشرة عند الضغط على Enter داخل استمارة الطلبية
  // الزر Enter يؤكد الأرقام والنصوص فقط ويحدث الحسابات والمعاينة دون حفظ الطلبية
  const orderForm = document.getElementById("order-form");
  if (orderForm) {
    orderForm.addEventListener("keydown", function(e) {
      if (e.key === "Enter" && e.target.tagName !== "TEXTAREA" && e.target.type !== "submit") {
        e.preventDefault();
        e.target.blur();
        calculateOrderTotals();
        updateStockClientPreview();
      }
    });
  }
}

// ==============================================
// الحسابات المالية الشهرية (دورة تبدأ من 10 في كل شهر)
// ==============================================
function getCycleRange(referenceDate = new Date()) {
  const d = new Date(referenceDate);
  const cycleDay = (state.settings && state.settings.cycleStartDay) ? parseInt(state.settings.cycleStartDay, 10) : 10;

  const currentDay = d.getDate();
  const currentMonth = d.getMonth(); // 0-indexed
  const currentYear = d.getFullYear();

  const monthNamesArabic = [
    "يناير", "فبراير", "مارس", "أبريل", "ماي", "يونيو",
    "يوليوز", "غشت", "شتنبر", "أكتوبر", "نونبر", "دجنبر"
  ];

  if (cycleDay === 1) {
    const lastDay = new Date(currentYear, currentMonth + 1, 0).getDate();
    const startStr = `${currentYear}-${String(currentMonth + 1).padStart(2, '0')}-01`;
    const endStr = `${currentYear}-${String(currentMonth + 1).padStart(2, '0')}-${String(lastDay).padStart(2, '0')}`;
    return {
      start: startStr,
      end: endStr,
      startDay: 1,
      label: `شهر ${monthNamesArabic[currentMonth]} ${currentYear} (01/${String(currentMonth + 1).padStart(2, '0')} إلى ${String(lastDay).padStart(2, '0')}/${String(currentMonth + 1).padStart(2, '0')})`
    };
  }

  let startYear, startMonth, endYear, endMonth;

  if (currentDay >= cycleDay) {
    // التاريخ ينتمي للدورة التي بدأت في الشهر الحالي يوم cycleDay
    startYear = currentYear;
    startMonth = currentMonth;

    const nextMonthDate = new Date(startYear, startMonth + 1, 1);
    endYear = nextMonthDate.getFullYear();
    endMonth = nextMonthDate.getMonth();
  } else {
    // التاريخ ينتمي للدورة التي بدأت في الشهر الماضي يوم cycleDay
    const prevMonthDate = new Date(currentYear, currentMonth - 1, 1);
    startYear = prevMonthDate.getFullYear();
    startMonth = prevMonthDate.getMonth();

    endYear = currentYear;
    endMonth = currentMonth;
  }

  const endDay = cycleDay - 1;
  const startStr = `${startYear}-${String(startMonth + 1).padStart(2, '0')}-${String(cycleDay).padStart(2, '0')}`;
  const endStr = `${endYear}-${String(endMonth + 1).padStart(2, '0')}-${String(endDay).padStart(2, '0')}`;

  return {
    start: startStr,
    end: endStr,
    startDay: cycleDay,
    label: `دورة (${cycleDay} ${monthNamesArabic[startMonth]} إلى ${String(endDay).padStart(2, '0')} ${monthNamesArabic[endMonth]} ${endYear})`
  };
}

function getPreviousCycleRange(referenceDate = new Date()) {
  const cur = getCycleRange(referenceDate);
  const cycleDay = cur.startDay || 10;
  
  const parts = cur.start.split("-");
  const year = parseInt(parts[0], 10);
  const month = parseInt(parts[1], 10) - 1; // 0-indexed
  
  // نرجع شهراً كاملاً للوراء قبل startMonth
  const prevDate = new Date(year, month - 1, cycleDay);
  return getCycleRange(prevDate);
}

function setupCycleSelector() {
  const select = document.getElementById("cycle-select");
  if (!select) return;

  const current = getCycleRange();
  const prev = getPreviousCycleRange();

  select.innerHTML = `
    <option value="CURRENT" selected>📌 ${current.label} (الدورة الحالية)</option>
    <option value="PREVIOUS">⏪ ${prev.label} (الدورة السابقة)</option>
    <option value="ALL">🌐 جميع التواريخ مجمعة (الكل)</option>
  `;

  const label = document.getElementById("current-cycle-dates-label");
  if (label) {
    label.textContent = `${current.start} إلى ${current.end} (بداية الحساب من 10 في كل شهر)`;
  }
}

function onCycleChange(val) {
  state.selectedCycle = val;
  const label = document.getElementById("current-cycle-dates-label");
  const caisseLabel = document.getElementById("caisse-cycle-label");

  if (val === "CURRENT") {
    const cur = getCycleRange();
    if (label) label.textContent = `${cur.start} إلى ${cur.end} (بداية الحساب من 10 في كل شهر)`;
    if (caisseLabel) caisseLabel.textContent = cur.label;
  } else if (val === "PREVIOUS") {
    const prev = getPreviousCycleRange();
    if (label) label.textContent = `${prev.start} إلى ${prev.end}`;
    if (caisseLabel) caisseLabel.textContent = prev.label;
  } else {
    if (label) label.textContent = "جميع التواريخ مجمعة (تراكمي)";
    if (caisseLabel) caisseLabel.textContent = "جميع الفترات (تراكمي)";
  }

  renderAll();
}

function isDateInSelectedCycle(dateStr) {
  if (!dateStr || state.selectedCycle === "ALL") return true;

  let range;
  if (state.selectedCycle === "CURRENT") {
    range = getCycleRange();
  } else if (state.selectedCycle === "PREVIOUS") {
    range = getPreviousCycleRange();
  } else {
    return true;
  }

  return dateStr >= range.start && dateStr <= range.end;
}

// ==============================================
// RENDER ALL
// ==============================================
function renderAll() {
  updateDashboardMetrics();
  renderRelanceList();
  renderOrdersTable();
  renderOzoneTable();
  renderCaisseTable();
  renderSponsoringTab();
  renderAssociatesTab();
  renderStockGrid();
  renderClientsList();
  renderBestSellingProducts();
  if (typeof renderStockQrAuditLog === "function") renderStockQrAuditLog();
  loadSettingsForm();
  if (typeof populateOrderStockQuickPicker === "function") {
    populateOrderStockQuickPicker();
  }
  lucide.createIcons();
}

function switchTab(tabId) {
  state.currentTab = tabId;
  const tabs = ["dashboard", "relance", "orders", "ozone", "caisse", "sponsoring", "associates", "stock", "clients", "settings"];

  tabs.forEach(tab => {
    const el = document.getElementById(`tab-${tab}`);
    const navBtn = document.getElementById(`nav-${tab}`);
    const mobBtn = document.getElementById(`mob-${tab}`);

    if (tab === tabId) {
      if (el) el.classList.remove("hidden");
      if (navBtn) {
        navBtn.classList.add("text-[#C9A227]", "bg-[#FAF6EA]", "border", "border-[#E8DCB5]");
        navBtn.classList.remove("text-[#6B6B6B]", "border-transparent");
      }
      if (mobBtn) {
        mobBtn.classList.add("text-[#C9A227]");
        mobBtn.classList.remove("text-[#6B6B6B]");
      }
    } else {
      if (el) el.classList.add("hidden");
      if (navBtn) {
        navBtn.classList.remove("text-[#C9A227]", "bg-[#FAF6EA]", "border", "border-[#E8DCB5]");
        navBtn.classList.add("text-[#6B6B6B]", "border-transparent");
      }
      if (mobBtn) {
        mobBtn.classList.remove("text-[#C9A227]");
        mobBtn.classList.add("text-[#6B6B6B]");
      }
    }
  });

  if (tabId !== "relance") {
    const navCountdownSub = document.getElementById("nav-countdown-sub");
    if (navCountdownSub) {
      navCountdownSub.classList.remove("text-[#C9A227]", "bg-[#FAF6EA]", "font-black");
      navCountdownSub.classList.add("text-[#6B6B6B]");
    }
  }

  if (tabId === "dashboard") updateDashboardMetrics();
  if (tabId === "relance") renderRelanceList();
  if (tabId === "orders") renderOrdersTable();
  if (tabId === "ozone") renderOzoneTable();
  if (tabId === "caisse") renderCaisseTable();
  if (tabId === "sponsoring") renderSponsoringTab();
  if (tabId === "associates") renderAssociatesTab();
  if (tabId === "stock") {
    renderStockGrid();
    if (typeof renderStockQrAuditLog === "function") renderStockQrAuditLog();
  }
  if (tabId === "clients") renderClientsList();

  window.scrollTo({ top: 0, behavior: 'smooth' });
  lucide.createIcons();
}

// ==============================================
// DASHBOARD METRICS
// ==============================================
function updateDashboardMetrics() {
  const initialCapital = Number(state.settings?.initialCapital || 0);

  const totalAllEntrees = state.caisse
    .filter(t => t.type === "entree")
    .reduce((sum, t) => sum + Number(t.amount || 0), 0);

  const totalAllSorties = state.caisse
    .filter(t => t.type === "sortie")
    .reduce((sum, t) => sum + Number(t.amount || 0), 0);

  // 1. رصيد السيولة الحقيقية بالصندوق (المداخيل - المصاريف + رأس مال الانطلاق)
  // أي مصروف أو شراء مادة (صباغة، ديليون، أكياس...) ينقص فوراً وتلقائياً من السيولة
  const soldeCaisseReel = initialCapital + totalAllEntrees - totalAllSorties;

  // 2. مجموع الديون المتبقية عند الزبناء (باقي ينتظر الاستخلاص للورشة)
  // لا تشمل مصاريف أوزون لأنها تذهب لشركة التوصيل ولا تدخل في مستحقات الورشة
  const totalResteClients = state.orders
    .filter(o => o.status !== "retour" && o.status !== "annulee")
    .reduce((sum, o) => {
      const ozoneFee = (o.deliveryType === "ozone") ? Number(o.ozoneFees || 0) : 0;
      const workshopOrderAmount = Math.max(0, Number(o.totalAmount || 0) - ozoneFee);
      const resteWorkshop = Math.max(0, workshopOrderAmount - Number(o.avanceAmount || 0));
      return sum + resteWorkshop;
    }, 0);

  // 3. رأس المال التراكمي الشامل للمشروع = السيولة النقدية بالصندوق + ديون الزبناء قيد الاستخلاص
  // متناسق 100%: أي شراء أو مصروف يخرج من الصندوق ينقص فوراً من السيولة ورأس المال الشامل معاً
  const capitalGlobalTotal = soldeCaisseReel + totalResteClients;

  // 1. نطاق دورة هذا الشهر الحالية (من 10 إلى 10) وحساباتها النقدية الحقيقية
  const currentCycleRange = getCycleRange();
  const currentCycleTransactions = state.caisse.filter(t => t.date >= currentCycleRange.start && t.date <= currentCycleRange.end);
  const currentCycleEntrees = currentCycleTransactions
    .filter(t => t.type === "entree")
    .reduce((sum, t) => sum + Number(t.amount || 0), 0);
  const currentCycleSorties = currentCycleTransactions
    .filter(t => t.type === "sortie")
    .reduce((sum, t) => sum + Number(t.amount || 0), 0);

  // صافي أرباح دورة هذا الشهر الحالية: تراكمية مع كل مدخول ومصروف (من 10 إلى 10)
  const beneficeCurrentCycle = currentCycleEntrees - currentCycleSorties;

  // 2. المعاملات الخاصة بالدورة المختارة للمعاينة (سواء الحالية، السابقة، أو الكل)
  const cycleTransactions = state.caisse.filter(t => isDateInSelectedCycle(t.date));
  const cycleEntrees = cycleTransactions
    .filter(t => t.type === "entree")
    .reduce((sum, t) => sum + Number(t.amount || 0), 0);

  const cycleSorties = cycleTransactions
    .filter(t => t.type === "sortie")
    .reduce((sum, t) => sum + Number(t.amount || 0), 0);

  // صافي أرباح الدورة المحددة للمعاينة في الصندوق (المداخيل ناقص المصاريف دائماً)
  const beneficeSelectedCycle = cycleEntrees - cycleSorties;

  const ozonePendingOrders = state.orders.filter(o => 
    o.deliveryType === "ozone" && 
    o.status !== "retour" && 
    o.ozoneTransferStatus === "pending_transfer"
  );
  const totalOzonePending = ozonePendingOrders.reduce((sum, o) => {
    const netFromOzone = Math.max(0, Number(o.resteAmount || 0) - Number(o.ozoneFees || 0));
    return sum + netFromOzone;
  }, 0);

  const elNavCumule = document.getElementById("nav-solde-cumule");
  const elNavCapital = document.getElementById("nav-capital-total");
  const elDashBenefice = document.getElementById("dash-benefice-cycle");
  const elDashBeneficeDesc = document.getElementById("dash-benefice-desc");
  const elDashCumule = document.getElementById("dash-solde-cumule");
  const elDashCapital = document.getElementById("dash-capital-global");
  const elDashReste = document.getElementById("dash-reste-clients");
  const elDashOzone = document.getElementById("dash-ozone-pending");
  const elCaisseNet = document.getElementById("caisse-net-balance");
  const elCaisseEntrees = document.getElementById("caisse-total-entrees");
  const elCaisseSorties = document.getElementById("caisse-total-sorties");
  const elCaisseSolde = document.getElementById("caisse-solde-cumule");
  const elSidebarBenefice = document.getElementById("sidebar-benefice-cycle");
  const elSidebarUnpaid = document.getElementById("sidebar-total-unpaid");

  // تحديث أزرار الشريط العلوي
  if (elNavCumule) {
    elNavCumule.textContent = `${soldeCaisseReel.toFixed(2)} درهم`;
    elNavCumule.className = `text-sm font-bold font-mono ${soldeCaisseReel >= 0 ? 'text-[#16B981]' : 'text-[#EF4444]'}`;
  }
  if (elNavCapital) {
    elNavCapital.textContent = `${capitalGlobalTotal.toFixed(2)} درهم`;
    elNavCapital.className = `text-sm font-black font-mono ${capitalGlobalTotal >= 0 ? 'text-[#C9A227]' : 'text-[#EF4444]'}`;
  }

  // تحديث كروت لوحة التحكم
  // صافي أرباح دورة هذا الشهر: تراكمية ومحمية (على دورة هذا الشهر فقط من 10 إلى 10)
  if (elDashBenefice) {
    const displayBenefice = (state.selectedCycle === "PREVIOUS") ? beneficeSelectedCycle : beneficeCurrentCycle;
    elDashBenefice.textContent = `${displayBenefice >= 0 ? '+' : ''}${displayBenefice.toFixed(2)} درهم`;
    elDashBenefice.className = `text-xl sm:text-2xl font-black mt-2 ${displayBenefice >= 0 ? 'text-[#16B981]' : 'text-[#EF4444]'}`;
  }
  if (elDashBeneficeDesc) {
    if (state.selectedCycle === "PREVIOUS") {
      const prev = getPreviousCycleRange();
      elDashBeneficeDesc.textContent = `تراكمية للشهر السابق (${prev.start} إلى ${prev.end})`;
    } else {
      elDashBeneficeDesc.textContent = `تراكمية لحسابات هذا الشهر`;
    }
  }

  if (elDashCumule) {
    elDashCumule.textContent = `${soldeCaisseReel.toFixed(2)} درهم`;
    elDashCumule.className = `text-xl sm:text-2xl font-black mt-2 ${soldeCaisseReel >= 0 ? 'text-[#16B981]' : 'text-[#EF4444]'}`;
  }
  if (elDashCapital) {
    elDashCapital.textContent = `${capitalGlobalTotal.toFixed(2)} درهم`;
    elDashCapital.className = `text-xl sm:text-2xl font-black mt-2 ${capitalGlobalTotal >= 0 ? 'text-[#C9A227]' : 'text-[#EF4444]'}`;
  }
  if (elDashReste) elDashReste.textContent = `${totalResteClients.toFixed(2)} درهم`;
  if (elDashOzone) elDashOzone.textContent = `${totalOzonePending.toFixed(2)} درهم`;

  if (elCaisseNet) {
    elCaisseNet.textContent = `${beneficeSelectedCycle >= 0 ? '+' : ''}${beneficeSelectedCycle.toFixed(2)} درهم`;
    elCaisseNet.className = `text-3xl font-black mt-2 ${beneficeSelectedCycle >= 0 ? 'text-[#16B981]' : 'text-[#EF4444]'}`;
  }
  if (elCaisseEntrees) elCaisseEntrees.textContent = `${cycleEntrees.toFixed(2)} درهم`;
  if (elCaisseSorties) elCaisseSorties.textContent = `${cycleSorties.toFixed(2)} درهم`;

  if (elCaisseSolde) {
    elCaisseSolde.textContent = `${soldeCaisseReel.toFixed(2)} درهم`;
    elCaisseSolde.className = `text-2xl font-black mt-2 ${soldeCaisseReel >= 0 ? 'text-[#C9A227]' : 'text-[#EF4444]'}`;
  }

  // ==============================================
  // حسابات إحصائيات اليوم والشهر وفصل السلعة والمواد الخام
  // ==============================================
  const todayStr = new Date().toISOString().split("T")[0];
  const currentMonthPrefix = todayStr.substring(0, 7);

  // 1. حسابات نهار اليوم
  const todayTransactions = state.caisse.filter(t => t.date === todayStr);
  const todayEntrees = todayTransactions
    .filter(t => t.type === "entree")
    .reduce((sum, t) => sum + Number(t.amount || 0), 0);
  const todaySorties = todayTransactions
    .filter(t => t.type === "sortie")
    .reduce((sum, t) => sum + Number(t.amount || 0), 0);
  const todayCaisseNet = todayEntrees - todaySorties;

  const todayOrders = state.orders.filter(o => 
    o.status !== "annulee" && o.status !== "retour" && 
    ((o.createdAt && o.createdAt.startsWith(todayStr)) || o.date === todayStr)
  );
  const todayOrdersNetProfit = todayOrders.reduce((sum, o) => sum + Number(o.netProfit || 0), 0);

  const todayMatieres = todayTransactions
    .filter(t => t.type === "sortie" && (t.category === "matieres" || t.category === "consommables"))
    .reduce((sum, t) => sum + Number(t.amount || 0), 0);

  // 2. حسابات دورة الشهر الجاري (تبدأ من 10 في كل شهر)
  const monthOrders = state.orders.filter(o => 
    o.status !== "annulee" && o.status !== "retour" && 
    isDateInSelectedCycle(o.createdAt?.split("T")[0] || o.date)
  );
  const monthOrdersNetProfit = monthOrders.reduce((sum, o) => sum + Number(o.netProfit || 0), 0);

  const monthMatieres = cycleTransactions
    .filter(t => t.type === "sortie" && (t.category === "matieres" || t.category === "consommables"))
    .reduce((sum, t) => sum + Number(t.amount || 0), 0);

  const monthCharges = cycleTransactions
    .filter(t => t.type === "sortie" && t.category !== "matieres" && t.category !== "consommables")
    .reduce((sum, t) => sum + Number(t.amount || 0), 0);

  const totalMonthSorties = monthMatieres + monthCharges;
  const pctMatieres = totalMonthSorties > 0 ? Math.round((monthMatieres / totalMonthSorties) * 100) : 0;
  const pctCharges = totalMonthSorties > 0 ? (100 - pctMatieres) : 0;

  // تحديث البطاقات المالية في واجهة الصندوق
  const elTodayEntrees = document.getElementById("caisse-today-entrees");
  const elTodayEntreesCount = document.getElementById("caisse-today-entrees-count");
  const elTodayProfit = document.getElementById("caisse-today-profit");
  const elTodayNetFlow = document.getElementById("caisse-today-net-flow");
  const elMonthProfit = document.getElementById("caisse-month-profit");
  const elMonthOrdersCount = document.getElementById("caisse-month-orders-count");
  const elMonthMatieres = document.getElementById("caisse-month-matieres");
  const elTodayMatieres = document.getElementById("caisse-today-matieres");

  if (elTodayEntrees) elTodayEntrees.textContent = `${todayEntrees.toFixed(2)} درهم`;
  if (elTodayEntreesCount) elTodayEntreesCount.textContent = `${todayTransactions.filter(t => t.type === 'entree').length} عمليات`;

  if (elTodayProfit) {
    elTodayProfit.textContent = `${todayOrdersNetProfit >= 0 ? '+' : ''}${todayOrdersNetProfit.toFixed(2)} درهم`;
    elTodayProfit.className = `text-2xl sm:text-3xl font-black mt-2 font-mono ${todayOrdersNetProfit >= 0 ? 'text-[#C9A227]' : 'text-[#EF4444]'}`;
  }
  if (elTodayNetFlow) {
    elTodayNetFlow.textContent = `صافي الصندوق: ${todayCaisseNet >= 0 ? '+' : ''}${todayCaisseNet.toFixed(2)} د`;
  }

  if (elMonthProfit) {
    elMonthProfit.textContent = `${monthOrdersNetProfit >= 0 ? '+' : ''}${monthOrdersNetProfit.toFixed(2)} درهم`;
    elMonthProfit.className = `text-2xl sm:text-3xl font-black mt-2 font-mono ${monthOrdersNetProfit >= 0 ? 'text-blue-700' : 'text-[#EF4444]'}`;
  }
  if (elMonthOrdersCount) elMonthOrdersCount.textContent = `${monthOrders.length} طلبيات`;

  if (elMonthMatieres) elMonthMatieres.textContent = `${monthMatieres.toFixed(2)} درهم`;
  if (elTodayMatieres) elTodayMatieres.textContent = `${todayMatieres.toFixed(2)} درهم`;

  // تحديث شريط المقارنة والفصل المالي
  const elSplitMatVal = document.getElementById("split-matieres-val");
  const elSplitMatPct = document.getElementById("split-matieres-pct");
  const elSplitChgVal = document.getElementById("split-charges-val");
  const elSplitChgPct = document.getElementById("split-charges-pct");
  const elBarMat = document.getElementById("split-bar-matieres");
  const elBarChg = document.getElementById("split-bar-charges");

  if (elSplitMatVal) elSplitMatVal.textContent = `${monthMatieres.toFixed(2)} د`;
  if (elSplitMatPct) elSplitMatPct.textContent = `${pctMatieres}%`;
  if (elSplitChgVal) elSplitChgVal.textContent = `${monthCharges.toFixed(2)} د`;
  if (elSplitChgPct) elSplitChgPct.textContent = `${pctCharges}%`;
  if (elBarMat) elBarMat.style.width = `${pctMatieres}%`;
  if (elBarChg) elBarChg.style.width = `${pctCharges}%`;

  // في القائمة الجانبية: دائماً أرباح دورة هذا الشهر الحالية التراكمية
  if (elSidebarBenefice) elSidebarBenefice.textContent = `${beneficeCurrentCycle.toFixed(2)} درهم`;
  if (elSidebarUnpaid) elSidebarUnpaid.textContent = `${totalResteClients.toFixed(2)} درهم`;

  const activeOrders = state.orders.filter(o => o.status !== "livree" && o.status !== "retour");
  const badgeOrders = document.getElementById("badge-count-orders");
  if (badgeOrders) badgeOrders.textContent = activeOrders.length;

  const badgeOzone = document.getElementById("badge-count-ozone");
  if (badgeOzone) {
    const ozoneCount = state.orders.filter(o => o.deliveryType === "ozone" && o.status === "livraison").length;
    badgeOzone.textContent = ozoneCount;
  }

  renderPipelineGrid();
  renderRecentOrders();
  renderDashboardStockAlerts();
  updateRelanceQuickWidget();
  renderBestSellingProducts();
}

function startRealWorkshopData() {
  const capInput = document.getElementById("setting-initial-capital");
  const cap = parseFloat(capInput?.value) || Number(state.settings?.initialCapital || 1500);

  if (confirm(`هل أنت متأكد من تصفير البيانات التجريبية القديمة وبدء العمل الفعلي بورشة MASTER PRINT برأس مال قدره ${cap} درهم؟\n\n- سيتم مسح الطلبيات التجريبية الثلاث\n- سيتم مسح معاملات الصندوق التجريبية\n- سيتم تصفير كميات المخزون للبدء من الصفر\n- سيصبح رصيد الصندوق ورأس المال هو ${cap} درهم بالضبط`)) {
    state.settings.initialCapital = cap;
    state.orders = [];
    state.caisse = [];
    if (Array.isArray(state.stock)) {
      state.stock.forEach(item => {
        item.quantity = 0;
      });
    }
    saveData();
    renderAll();
    alert(`✅ تم بنجاح تصفير البيانات التجريبية!\n\n💰 رصيد الصندوق الآن: ${cap.toFixed(2)} درهم بالضبط.\n💼 رأس المال الآن: ${cap.toFixed(2)} درهم بالضبط.\n\nيمكنك الآن تسجيل أول طلبية حقيقية لك.`);
  }
}

function renderPipelineGrid() {
  const container = document.getElementById("dash-pipeline-steps");
  if (!container) return;

  const statuses = [
    { key: "conception", label: "مرحلة التصميم", color: "text-[#C9A227] bg-[#FAF6EA] border-[#E8DCB5]" },
    { key: "impression", label: "قيد الطباعة", color: "text-orange-700 bg-orange-50 border-orange-200" },
    { key: "prete", label: "جاهزة للتسليم", color: "text-blue-700 bg-blue-50 border-blue-200" },
    { key: "livraison", label: "مع التوصيل", color: "text-purple-700 bg-purple-50 border-purple-200" },
    { key: "livree", label: "مسلّمة وخالصة", color: "text-emerald-700 bg-emerald-50 border-emerald-200" },
    { key: "retour", label: "مرتجعة أو ملغاة", color: "text-rose-700 bg-rose-50 border-rose-200" }
  ];

  container.innerHTML = statuses.map(st => {
    const count = state.orders.filter(o => o.status === st.key).length;
    return `
      <div onclick="filterOrdersByStatus('${st.key}')" class="p-2.5 rounded-xl border ${st.color} cursor-pointer hover:opacity-85 transition transform hover:-translate-y-0.5">
        <div class="text-xs font-bold">${st.label}</div>
        <div class="text-xl font-black mt-1">${count}</div>
      </div>
    `;
  }).join("");
}

function renderRecentOrders() {
  const container = document.getElementById("dash-recent-orders");
  if (!container) return;

  const recents = [...state.orders].reverse().slice(0, 5);
  if (recents.length === 0) {
    container.innerHTML = `<div class="text-xs text-[#6B6B6B] py-6 text-center">لا توجد طلبيات مسجلة بعد.</div>`;
    return;
  }

  container.innerHTML = recents.map(order => {
    const statusBadge = getStatusBadge(order.status);
    const reste = Math.max(0, Number(order.totalAmount || 0) - Number(order.avanceAmount || 0));

    return `
      <div class="flex items-center justify-between p-3 rounded-xl bg-white border border-[#EAEAE5] hover:border-[#D4D4CE] shadow-xs transition">
        <div class="flex items-center gap-3">
          <div class="w-8 h-8 rounded-lg bg-[#FAF6EA] flex items-center justify-center border border-[#E8DCB5] text-[#C9A227] font-bold text-xs">
            ${order.type === 'soustraitance' ? '💳' : '🛍️'}
          </div>
          <div>
            <div class="flex items-center gap-2">
              <span class="text-xs font-bold text-[#111111]">${escapeHtml(order.clientName)}</span>
              <span class="text-[10px] text-[#6B6B6B]">(${escapeHtml(order.clientCity)})</span>
            </div>
            <p class="text-[11px] text-[#6B6B6B]">${escapeHtml(order.designation)} - ${order.quantity} حبة</p>
          </div>
        </div>

        <div class="flex items-center gap-3 text-left sm:text-right">
          <div>
            <div class="text-xs font-bold text-[#111111]">${Number(order.totalAmount).toFixed(2)} درهم</div>
            <div class="text-[10px] ${reste > 0 ? 'text-[#EF4444] font-bold' : 'text-[#16B981] font-bold'}">
              ${reste > 0 ? `باقي: ${reste} درهم` : 'مدفوع بالكامل'}
            </div>
          </div>
          ${statusBadge}
        </div>
      </div>
    `;
  }).join("");
}

function renderDashboardStockAlerts() {
  const container = document.getElementById("dash-stock-alerts");
  const badgeAlert = document.getElementById("badge-count-stock-alert");
  if (!container) return;

  const lowStock = state.stock.filter(s => Number(s.quantity) <= Number(s.minAlert));

  if (lowStock.length > 0 && badgeAlert) {
    badgeAlert.classList.remove("hidden");
  } else if (badgeAlert) {
    badgeAlert.classList.add("hidden");
  }

  if (lowStock.length === 0) {
    container.innerHTML = `
      <div class="text-xs text-emerald-700 bg-emerald-50 p-2.5 rounded-lg border border-emerald-200 flex items-center gap-2">
        <i data-lucide="check-circle" class="w-4 h-4 text-emerald-600"></i>
        <span>المخزون كافٍ لجميع المواد.</span>
      </div>
    `;
    return;
  }

  container.innerHTML = lowStock.map(item => `
    <div class="p-2.5 bg-rose-50 border border-rose-200 rounded-xl flex items-center justify-between">
      <div>
        <div class="text-xs font-bold text-rose-800">${escapeHtml(item.name)}</div>
        <span class="text-[10px] text-[#6B6B6B]">الحد الأدنى: ${item.minAlert}</span>
      </div>
      <div class="text-left sm:text-right">
        <span class="text-xs font-black text-[#EF4444]">${item.quantity} حبة</span>
        <button onclick="switchTab('stock')" class="block text-[10px] text-[#C9A227] hover:underline font-bold">تعديل المخزون</button>
      </div>
    </div>
  `).join("");
}

// ==============================================
// تحليل الأكياس والمنتجات الأكثر طلباً ومبيعاً (TOP-SELLING PRODUCTS)
// ==============================================
function classifyOrderProduct(order) {
  let cat = order.sacCategory || "";
  let handle = (order.handleType || order.kraftHandle || order.cartonType || order.plastiqueColor || "").toLowerCase();
  const des = (order.designation || "").toLowerCase();

  if (!cat && order.type === "soustraitance") {
    return { id: "soustraitance", label: "سوترطونس ومطابع شريكة", code: "Soustraitance", icon: "briefcase" };
  }
  if (cat === "Impression Seule" || (!cat && (order.type === "impression_seule" || des.includes("طباعة فقط") || des.includes("impression")))) {
    return { id: "impression_seule", label: "خدمة طباعة فقط (Impression Seule)", code: "Impression Seule", icon: "printer" };
  }

  // Fallback to designation analysis if sacCategory is empty
  if (!cat) {
    if (des.includes("kraft") || des.includes("كرافت")) cat = "Kraft";
    else if (des.includes("non tiss") || des.includes("tissu") || des.includes("قماش") || des.includes("توت")) cat = "Non Tissé";
    else if (des.includes("luxe") || des.includes("فاخر")) cat = "Papier Luxe";
    else if (des.includes("carton") || des.includes("كرتون")) cat = "Carton";
    else if (des.includes("plastique") || des.includes("بلاستيك")) cat = "Plastique";
    else if (des.includes("ruban") || des.includes("شريط") || des.includes("ستان")) cat = "Ruban";
    else cat = "أكياس ومطبوعات أخرى";
  }

  // Refine Kraft
  if (cat === "Kraft") {
    if (handle === "plat" || des.includes("plat") || des.includes("مسطح") || des.includes("بلات")) {
      return { id: "kraft_plat", label: "أكياس كرافت يد مسطحة (Kraft Plat)", code: "Kraft - Plat", icon: "shopping-bag" };
    }
    if (handle === "torsade" || des.includes("torsad") || des.includes("مفتول") || des.includes("ملوي")) {
      return { id: "kraft_torsade", label: "أكياس كرافت يد مفتولة (Kraft Torsadé)", code: "Kraft - Torsadé", icon: "shopping-bag" };
    }
    return { id: "kraft_general", label: "أكياس كرافت (Kraft)", code: "Kraft", icon: "shopping-bag" };
  }

  // Refine Non Tissé
  if (cat.includes("Non Tissé") || cat.includes("Non Tisse")) {
    if (handle === "anses" || des.includes("anse") || des.includes("حبال") || des.includes("خيط")) {
      return { id: "non_tisse_anses", label: "أكياس قماش بحبال (Non Tissé Anses)", code: "Non Tissé - Anses", icon: "shopping-bag" };
    }
    return { id: "non_tisse_poignee", label: "أكياس قماش بيد مقطوعة (Non Tissé Poignée)", code: "Non Tissé - Poignée", icon: "shopping-bag" };
  }

  // Papier Luxe
  if (cat.includes("Papier Luxe")) {
    return { id: "papier_luxe", label: "أكياس ورق فاخر (Papier Luxe)", code: "Papier Luxe", icon: "sparkles" };
  }

  // Carton
  if (cat.includes("Carton")) {
    if (handle === "americaine" || des.includes("americaine") || des.includes("أمريكان")) {
      return { id: "carton_caisse", label: "كرتون كيس أمريكان (Caisse Américaine)", code: "Carton - Caisse", icon: "box" };
    }
    return { id: "carton_valise", label: "علب كرتون فالييز (Carton Boîte)", code: "Carton", icon: "box" };
  }

  // Plastique
  if (cat.includes("Plastique")) {
    return { id: "plastique", label: "أكياس بلاستيك (Plastique)", code: "Plastique", icon: "layers" };
  }

  // Ruban
  if (cat.includes("Ruban")) {
    return { id: "ruban", label: "أشرطة ستان (Ruban Satin)", code: "Ruban", icon: "bookmark" };
  }

  return { id: "autre", label: cat || "أكياس متنوعة", code: cat || "Autre", icon: "package" };
}

function getProductArabicLabel(cat) {
  if (!cat) return "أكياس متنوعة";
  if (cat.includes("Non Tissé - Anses")) return "أكياس قماش بحبال (Non Tissé Anses)";
  if (cat.includes("Non Tissé - Poignée") || cat === "Non Tissé") return "أكياس قماش بيد مقطوعة (Non Tissé)";
  if (cat.includes("Kraft - Torsadé")) return "أكياس كرافت يد مفتولة (Kraft Torsadé)";
  if (cat.includes("Kraft - Plat")) return "أكياس كرافت يد مسطحة (Kraft Plat)";
  if (cat === "Kraft") return "أكياس كرافت (Kraft)";
  if (cat.includes("Papier Luxe")) return "أكياس ورق فاخر (Papier Luxe)";
  if (cat.includes("Boîte valise")) return "علب كرتون فالييز (Boîte Valise)";
  if (cat.includes("Caisse américaine")) return "كرتون كيس أمريكان (Caisse)";
  if (cat.includes("Carton")) return "علب كرتون (Carton)";
  if (cat.includes("Plastique")) return "أكياس بلاستيك (Plastique)";
  if (cat.includes("Ruban")) return "أشرطة ستان (Ruban Satin)";
  if (cat.includes("Impression")) return "خدمة طباعة فقط (Impression Seule)";
  return cat;
}

function setProductRankingFilter(filter) {
  state.productRankingFilter = filter;
  const btnMonth = document.getElementById("prod-rank-btn-month");
  const btnAll = document.getElementById("prod-rank-btn-all");
  const btnToday = document.getElementById("prod-rank-btn-today");

  const activeClasses = ["bg-[#FAF6EA]", "text-[#C9A227]", "border-[#E8DCB5]"];
  const inactiveClasses = ["bg-white", "text-[#6B6B6B]", "border-transparent"];

  const applyBtnState = (btn, isActive) => {
    if (!btn) return;
    if (isActive) {
      btn.classList.remove(...inactiveClasses);
      btn.classList.add(...activeClasses);
    } else {
      btn.classList.remove(...activeClasses);
      btn.classList.add(...inactiveClasses);
    }
  };

  applyBtnState(btnMonth, filter === "month");
  applyBtnState(btnAll, filter === "all");
  applyBtnState(btnToday, filter === "today");

  renderBestSellingProducts();
}

function renderBestSellingProducts() {
  const container = document.getElementById("product-ranking-list");
  const elTotalBags = document.getElementById("rank-total-bags");
  const elTotalRevenue = document.getElementById("rank-total-revenue");
  const elTotalProfit = document.getElementById("rank-total-profit");
  const elTopProduct = document.getElementById("rank-top-product");

  if (!container) return;

  const filter = state.productRankingFilter || "month";
  const todayStr = new Date().toISOString().split("T")[0];
  const currentMonthPrefix = todayStr.substring(0, 7);

  // تصفية الطلبيات الصالحة حسب الفترة الزمنية المحددة
  const validOrders = (state.orders || []).filter(o => {
    if (o.status === "annulee" || o.status === "retour") return false;
    const orderDate = (o.createdAt ? o.createdAt.split("T")[0] : "") || o.date || "";

    if (filter === "today") {
      return orderDate === todayStr;
    } else if (filter === "month") {
      return orderDate.startsWith(currentMonthPrefix) || isDateInSelectedCycle(orderDate);
    }
    // "all"
    return true;
  });

  // تجميع الإحصائيات حسب تصنيف ونوع المنتجات
  const productMap = {};
  let totalBags = 0;
  let totalRev = 0;
  let totalProfit = 0;

  validOrders.forEach(o => {
    const pInfo = classifyOrderProduct(o);
    const qty = parseInt(o.quantity) || 0;
    const rev = parseFloat(o.totalAmount) || 0;
    const profit = parseFloat(o.netProfit) || (rev - (parseFloat(o.totalBagCost || 0) + parseFloat(o.totalCost || 0)));

    if (!productMap[pInfo.id]) {
      productMap[pInfo.id] = {
        id: pInfo.id,
        label: pInfo.label,
        code: pInfo.code,
        icon: pInfo.icon,
        qty: 0,
        rev: 0,
        profit: 0,
        orderCount: 0
      };
    }

    productMap[pInfo.id].qty += qty;
    productMap[pInfo.id].rev += rev;
    productMap[pInfo.id].profit += profit;
    productMap[pInfo.id].orderCount += 1;

    totalBags += qty;
    totalRev += rev;
    totalProfit += profit;
  });

  const sortedProducts = Object.values(productMap).sort((a, b) => {
    if (b.qty !== a.qty) return b.qty - a.qty;
    return b.rev - a.rev;
  });

  // تحديث بطاقات ملخص المبيعات
  if (elTotalBags) elTotalBags.textContent = `${totalBags.toLocaleString()} كيس`;
  if (elTotalRevenue) elTotalRevenue.textContent = `${totalRev.toFixed(2)} د`;
  if (elTotalProfit) {
    elTotalProfit.textContent = `${totalProfit >= 0 ? '+' : ''}${totalProfit.toFixed(2)} د`;
    elTotalProfit.className = `text-lg sm:text-xl font-black font-mono mt-0.5 block ${totalProfit >= 0 ? 'text-[#C9A227]' : 'text-[#EF4444]'}`;
  }
  if (elTopProduct) {
    elTopProduct.textContent = sortedProducts.length > 0 ? sortedProducts[0].label : "-";
  }

  // عرض القائمة
  if (sortedProducts.length === 0) {
    const periodLabel = filter === "today" ? "اليوم" : (filter === "month" ? "هذا الشهر" : "جميع الفترات");
    container.innerHTML = `
      <div class="text-center py-8 text-xs text-[#6B6B6B] bg-[#FAFAF8] rounded-xl border border-dashed border-[#EAEAE5] space-y-1.5">
        <div class="text-2xl">🛍️</div>
        <p class="font-bold text-[#111111]">لا توجد مبيعات مسجلة في (${periodLabel}) بعد</p>
        <p class="text-[11px] text-[#A0A096]">فور تسجيل أي طلبية جديدة ستظهر هنا إحصائيات وترتيب المنتجات الأكثر طلباً تلقائياً.</p>
      </div>
    `;
    return;
  }

  const maxQty = sortedProducts[0].qty || 1;

  container.innerHTML = sortedProducts.map((item, index) => {
    let medal = `<span class="w-8 h-8 rounded-xl bg-[#FAFAF8] text-[#6B6B6B] border border-[#EAEAE5] flex items-center justify-center text-xs font-mono font-bold shrink-0">#${index + 1}</span>`;
    let barColor = "bg-[#C9A227]";
    let cardBorder = "border-[#EAEAE5]";

    if (index === 0) {
      medal = `<span class="w-8 h-8 rounded-xl bg-amber-100 text-amber-800 border border-amber-300 flex items-center justify-center text-base font-black shadow-xs shrink-0" title="🥇 الصنف الأكثر طلباً ومبيعاً">🥇</span>`;
      barColor = "bg-amber-500";
      cardBorder = "border-amber-200 bg-gradient-to-r from-amber-50/20 to-white";
    } else if (index === 1) {
      medal = `<span class="w-8 h-8 rounded-xl bg-slate-100 text-slate-700 border border-slate-300 flex items-center justify-center text-base font-black shadow-xs shrink-0" title="🥈 المرتبة الثانية">🥈</span>`;
      barColor = "bg-slate-500";
    } else if (index === 2) {
      medal = `<span class="w-8 h-8 rounded-xl bg-orange-100 text-orange-800 border border-orange-300 flex items-center justify-center text-base font-black shadow-xs shrink-0" title="🥉 المرتبة الثالثة">🥉</span>`;
      barColor = "bg-orange-500";
    }

    const pctOfTotal = totalBags > 0 ? Math.round((item.qty / totalBags) * 100) : 0;
    const barWidth = Math.max(6, Math.min(100, Math.round((item.qty / maxQty) * 100)));

    return `
      <div class="p-3 sm:p-4 rounded-xl border ${cardBorder} bg-white hover:border-[#D4D4CE] transition shadow-2xs space-y-2.5">
        <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-2.5">
          <div class="flex items-center gap-3">
            ${medal}
            <div>
              <div class="flex items-center gap-2 flex-wrap">
                <span class="text-xs sm:text-sm font-black text-[#111111]">${escapeHtml(item.label)}</span>
                <span class="text-[10px] text-[#8A6D0B] bg-[#FAF6EA] px-2 py-0.5 rounded font-mono font-bold border border-[#E8DCB5]">${item.code}</span>
              </div>
              <div class="flex items-center gap-2 mt-0.5 text-[11px] text-[#6B6B6B]">
                <span>📋 ${item.orderCount} طلبيات</span>
                <span>•</span>
                <span>الحصة من المبيعات: <strong class="text-[#111111]">${pctOfTotal}%</strong></span>
              </div>
            </div>
          </div>

          <div class="flex items-center gap-3 self-end sm:self-center">
            <div class="text-right">
              <div class="text-xs sm:text-sm font-black text-[#111111] font-mono">${item.qty.toLocaleString()} كيس</div>
              <div class="text-[10px] text-[#6B6B6B]">الكمية المباعة</div>
            </div>
            <div class="h-7 w-px bg-[#EAEAE5] hidden sm:block"></div>
            <div class="text-right">
              <div class="text-xs font-bold text-emerald-700 font-mono">${item.rev.toFixed(2)} د</div>
              <div class="text-[10px] text-[#6B6B6B]">المداخيل</div>
            </div>
            <div class="h-7 w-px bg-[#EAEAE5] hidden sm:block"></div>
            <div class="text-right">
              <div class="text-xs font-black font-mono ${item.profit >= 0 ? 'text-[#C9A227]' : 'text-[#EF4444]'}">${item.profit >= 0 ? '+' : ''}${item.profit.toFixed(2)} د</div>
              <div class="text-[10px] text-[#6B6B6B]">صافي الربح</div>
            </div>
          </div>
        </div>

        <!-- شريط التقدم المرئي بالنسبة لأعلى صنف -->
        <div class="w-full bg-[#FAFAF8] rounded-full h-2 overflow-hidden border border-[#EAEAE5]">
          <div class="${barColor} h-2 rounded-full transition-all duration-500" style="width: ${barWidth}%"></div>
        </div>
      </div>
    `;
  }).join("");

  lucide.createIcons();
}

// ==============================================
// المعاينة والتفصيل المالي الفوري (FINANCIAL DRILLDOWN MODAL)
// ==============================================
function openFinancialDrilldown(type) {
  state.drilldownCurrentType = type;
  const searchInput = document.getElementById("drilldown-search-input");
  if (searchInput) searchInput.value = "";

  const titleEl = document.getElementById("drilldown-title");
  const subEl = document.getElementById("drilldown-subtitle");
  const iconBox = document.getElementById("drilldown-icon-box");
  const totalBadge = document.getElementById("drilldown-total-badge");
  const countBadge = document.getElementById("drilldown-count-badge");
  const thead = document.getElementById("drilldown-table-head");
  const modal = document.getElementById("modal-financial-drilldown");

  if (!modal) return;

  const todayStr = new Date().toISOString().split("T")[0];
  const currentMonthPrefix = todayStr.substring(0, 7);

  let items = [];
  let columns = [];
  let title = "تفاصيل العمليات المالية";
  let subtitle = "معاينة تفصيلية لجميع العمليات والبنود المسجلة";
  let iconHtml = '<i data-lucide="eye" class="w-5 h-5"></i>';
  let iconBoxClass = "w-9 h-9 rounded-xl bg-[#FAF6EA] text-[#C9A227] border border-[#E8DCB5] flex items-center justify-center shadow-xs";
  let totalVal = 0;
  let totalBadgeClass = "px-3 py-1 rounded-lg font-black font-mono text-xs bg-emerald-50 text-emerald-700 border border-emerald-200";
  let totalSuffix = "درهم";

  if (type === "today_entrees") {
    title = "تفاصيل دخل اليوم النقدية (المداخيل)";
    subtitle = `كشف جميع الدفعات والعرابين النقدية والبنكية المقبوضة نهار اليوم (${todayStr})`;
    iconHtml = '<i data-lucide="arrow-down-left" class="w-5 h-5 text-emerald-600"></i>';
    iconBoxClass = "w-9 h-9 rounded-xl bg-emerald-50 text-emerald-600 border border-emerald-200 flex items-center justify-center shadow-xs";
    items = state.caisse.filter(t => t.date === todayStr && t.type === "entree");
    totalVal = items.reduce((sum, t) => sum + Number(t.amount || 0), 0);
    totalBadgeClass = "px-3 py-1 rounded-lg font-black font-mono text-xs bg-emerald-50 text-emerald-700 border border-emerald-200";

    columns = [
      { label: "#", align: "text-center w-10" },
      { label: "التاريخ", align: "text-right w-24" },
      { label: "النوع / الصنف", align: "text-right w-36" },
      { label: "البيان والتفاصيل", align: "text-right" },
      { label: "طريقة الأداء", align: "text-right w-28" },
      { label: "المبلغ المقبوض", align: "text-left w-32" }
    ];
  } else if (type === "today_profit") {
    title = "تفاصيل أرباح طلبيات اليوم";
    subtitle = `كشف تفصيلي بالأرباح الصافية المحققة من طلبيات تم تسجيلها اليوم (${todayStr})`;
    iconHtml = '<i data-lucide="trending-up" class="w-5 h-5 text-[#C9A227]"></i>';
    iconBoxClass = "w-9 h-9 rounded-xl bg-[#FAF6EA] text-[#C9A227] border border-[#E8DCB5] flex items-center justify-center shadow-xs";
    items = state.orders.filter(o => 
      o.status !== "annulee" && o.status !== "retour" && 
      ((o.createdAt && o.createdAt.startsWith(todayStr)) || o.date === todayStr)
    );
    totalVal = items.reduce((sum, o) => sum + Number(o.netProfit || 0), 0);
    totalBadgeClass = "px-3 py-1 rounded-lg font-black font-mono text-xs bg-amber-50 text-amber-800 border border-amber-200";

    columns = [
      { label: "#", align: "text-center w-10" },
      { label: "رقم الطلبية", align: "text-right w-24" },
      { label: "الزبون والمدينة", align: "text-right w-44" },
      { label: "السلعة والمواصفات", align: "text-right" },
      { label: "الكمية", align: "text-center w-24" },
      { label: "سعر البيع", align: "text-left w-24" },
      { label: "التكلفة التقديرية", align: "text-left w-24" },
      { label: "صافي الربح", align: "text-left w-28" }
    ];
  } else if (type === "month_profit") {
    const cur = getCycleRange();
    title = "تفاصيل أرباح طلبيات الدورة الحالية";
    subtitle = `كشف تفصيلي بالأرباح الصافية المحققة لطلبيات الدورة الحالية (${cur.start} إلى ${cur.end})`;
    iconHtml = '<i data-lucide="coins" class="w-5 h-5 text-blue-600"></i>';
    iconBoxClass = "w-9 h-9 rounded-xl bg-blue-50 text-blue-600 border border-blue-200 flex items-center justify-center shadow-xs";
    items = state.orders.filter(o => 
      o.status !== "annulee" && o.status !== "retour" && 
      isDateInSelectedCycle(o.createdAt?.split("T")[0] || o.date)
    );
    totalVal = items.reduce((sum, o) => sum + Number(o.netProfit || 0), 0);
    totalBadgeClass = "px-3 py-1 rounded-lg font-black font-mono text-xs bg-blue-50 text-blue-700 border border-blue-200";

    columns = [
      { label: "#", align: "text-center w-10" },
      { label: "رقم الطلبية", align: "text-right w-24" },
      { label: "الزبون والمدينة", align: "text-right w-44" },
      { label: "السلعة والمواصفات", align: "text-right" },
      { label: "الكمية", align: "text-center w-24" },
      { label: "سعر البيع", align: "text-left w-24" },
      { label: "التكلفة التقديرية", align: "text-left w-24" },
      { label: "صافي الربح", align: "text-left w-28" }
    ];
  } else if (type === "month_matieres" || type === "today_matieres") {
    const isToday = type === "today_matieres";
    title = isToday ? "مشتريات السلعة والمواد الخام لليوم" : "مشتريات السلعة والمواد الخام لهذا الشهر";
    subtitle = "مصاريف شراء الأكياس ومواد الطباعة والصباغة ومستلزمات الورشة";
    iconHtml = '<i data-lucide="package-search" class="w-5 h-5 text-orange-600"></i>';
    iconBoxClass = "w-9 h-9 rounded-xl bg-orange-50 text-orange-600 border border-orange-200 flex items-center justify-center shadow-xs";
    
    if (isToday) {
      items = state.caisse.filter(t => t.date === todayStr && t.type === "sortie" && (t.category === "matieres" || t.category === "consommables"));
    } else {
      items = state.caisse.filter(t => isDateInSelectedCycle(t.date) && t.type === "sortie" && (t.category === "matieres" || t.category === "consommables"));
    }
    totalVal = items.reduce((sum, t) => sum + Number(t.amount || 0), 0);
    totalBadgeClass = "px-3 py-1 rounded-lg font-black font-mono text-xs bg-orange-50 text-orange-700 border border-orange-200";

    columns = [
      { label: "#", align: "text-center w-10" },
      { label: "التاريخ", align: "text-right w-24" },
      { label: "النوع / الصنف", align: "text-right w-36" },
      { label: "البيان والمشتريات", align: "text-right" },
      { label: "طريقة الأداء", align: "text-right w-28" },
      { label: "المبلغ المصروف", align: "text-left w-32" }
    ];
  } else if (type === "month_entrees") {
    title = "كشف جميع مداخيل هذا الشهر";
    subtitle = "جميع المداخيل والعرابين والتحويلات المسجلة في الصندوق خلال الشهر";
    iconHtml = '<i data-lucide="wallet" class="w-5 h-5 text-emerald-600"></i>';
    iconBoxClass = "w-9 h-9 rounded-xl bg-emerald-50 text-emerald-600 border border-emerald-200 flex items-center justify-center shadow-xs";
    items = state.caisse.filter(t => isDateInSelectedCycle(t.date) && t.type === "entree");
    totalVal = items.reduce((sum, t) => sum + Number(t.amount || 0), 0);
    totalBadgeClass = "px-3 py-1 rounded-lg font-black font-mono text-xs bg-emerald-50 text-emerald-700 border border-emerald-200";

    columns = [
      { label: "#", align: "text-center w-10" },
      { label: "التاريخ", align: "text-right w-24" },
      { label: "النوع / الصنف", align: "text-right w-36" },
      { label: "البيان والتفاصيل", align: "text-right" },
      { label: "طريقة الأداء", align: "text-right w-28" },
      { label: "المبلغ المقبوض", align: "text-left w-32" }
    ];
  } else if (type === "month_sorties") {
    title = "كشف جميع مصاريف هذا الشهر";
    subtitle = "جميع المصاريف ومشتريات السلع والأجور المسجلة في الصندوق خلال الشهر";
    iconHtml = '<i data-lucide="arrow-up-right" class="w-5 h-5 text-rose-600"></i>';
    iconBoxClass = "w-9 h-9 rounded-xl bg-rose-50 text-rose-600 border border-rose-200 flex items-center justify-center shadow-xs";
    items = state.caisse.filter(t => isDateInSelectedCycle(t.date) && t.type === "sortie");
    totalVal = items.reduce((sum, t) => sum + Number(t.amount || 0), 0);
    totalBadgeClass = "px-3 py-1 rounded-lg font-black font-mono text-xs bg-rose-50 text-rose-700 border border-rose-200";

    columns = [
      { label: "#", align: "text-center w-10" },
      { label: "التاريخ", align: "text-right w-24" },
      { label: "النوع / الصنف", align: "text-right w-36" },
      { label: "البيان والمستفيد", align: "text-right" },
      { label: "طريقة الأداء", align: "text-right w-28" },
      { label: "المبلغ الصادر", align: "text-left w-32" }
    ];
  } else if (type === "reste_clients") {
    title = "كشف ديون وبواقي الزبناء قيد الاستخلاص";
    subtitle = "المبالغ المتبقية في ذمة الزبناء المستحقة لورشة ماستر برينت";
    iconHtml = '<i data-lucide="clock" class="w-5 h-5 text-amber-600"></i>';
    iconBoxClass = "w-9 h-9 rounded-xl bg-amber-50 text-amber-700 border border-amber-200 flex items-center justify-center shadow-xs";
    items = state.orders.filter(o => {
      if (o.status === "retour" || o.status === "annulee") return false;
      const ozoneFee = (o.deliveryType === "ozone") ? Number(o.ozoneFees || 0) : 0;
      const workshopOrderAmount = Math.max(0, Number(o.totalAmount || 0) - ozoneFee);
      const resteWorkshop = Math.max(0, workshopOrderAmount - Number(o.avanceAmount || 0));
      return resteWorkshop > 0.01;
    });
    totalVal = items.reduce((sum, o) => {
      const ozoneFee = (o.deliveryType === "ozone") ? Number(o.ozoneFees || 0) : 0;
      const workshopOrderAmount = Math.max(0, Number(o.totalAmount || 0) - ozoneFee);
      return sum + Math.max(0, workshopOrderAmount - Number(o.avanceAmount || 0));
    }, 0);
    totalBadgeClass = "px-3 py-1 rounded-lg font-black font-mono text-xs bg-amber-50 text-amber-800 border border-amber-200";

    columns = [
      { label: "#", align: "text-center w-10" },
      { label: "رقم الطلبية", align: "text-right w-24" },
      { label: "اسم الزبون والهاتف", align: "text-right w-44" },
      { label: "المدينة ونوع التسليم", align: "text-right w-36" },
      { label: "السلعة المطلوبة", align: "text-right" },
      { label: "إجمالي الطلبية", align: "text-left w-24" },
      { label: "العربون المؤدى", align: "text-left w-24" },
      { label: "الباقي المستحق", align: "text-left w-32" }
    ];
  } else if (type === "ozone_pending") {
    title = "كشف مبالغ التوصيل المعلقة لدى أوزون إكسبريس (Ozone)";
    subtitle = "الطلبيات المسلمة لشركة أوزون والتي ننتظر تحويل أموالها للورشة";
    iconHtml = '<i data-lucide="truck" class="w-5 h-5 text-sky-600"></i>';
    iconBoxClass = "w-9 h-9 rounded-xl bg-sky-50 text-sky-700 border border-sky-200 flex items-center justify-center shadow-xs";
    items = state.orders.filter(o => 
      o.deliveryType === "ozone" && 
      o.status !== "retour" && 
      o.ozoneTransferStatus === "pending_transfer"
    );
    totalVal = items.reduce((sum, o) => {
      const netFromOzone = Math.max(0, Number(o.resteAmount || 0) - Number(o.ozoneFees || 0));
      return sum + netFromOzone;
    }, 0);
    totalBadgeClass = "px-3 py-1 rounded-lg font-black font-mono text-xs bg-sky-50 text-sky-700 border border-sky-200";

    columns = [
      { label: "#", align: "text-center w-10" },
      { label: "رقم الطلبية", align: "text-right w-24" },
      { label: "اسم الزبون والمدينة", align: "text-right w-44" },
      { label: "كود التتبع أوزون", align: "text-right w-36" },
      { label: "السلعة", align: "text-right" },
      { label: "المبلغ عند الزبون", align: "text-left w-24" },
      { label: "رسوم أوزون", align: "text-left w-24" },
      { label: "الصافي للورشة", align: "text-left w-28" }
    ];
  } else {
    items = [];
    columns = [
      { label: "#", align: "text-center w-10" },
      { label: "البيان", align: "text-right" },
      { label: "المبلغ", align: "text-left w-32" }
    ];
  }

  state.drilldownCurrentItems = items;
  state.drilldownCurrentColumns = columns;

  if (titleEl) titleEl.textContent = title;
  if (subEl) subEl.textContent = subtitle;
  if (iconBox) {
    iconBox.className = iconBoxClass;
    iconBox.innerHTML = iconHtml;
  }
  if (totalBadge) {
    totalBadge.className = totalBadgeClass;
    const sign = (type === "month_sorties" || type === "month_matieres" || type === "today_matieres") ? "-" : ((type === "today_entrees" || type === "month_entrees" || type === "today_profit" || type === "month_profit") ? "+" : "");
    totalBadge.textContent = `${sign}${totalVal.toFixed(2)} ${totalSuffix}`;
  }
  if (countBadge) {
    countBadge.textContent = `(${items.length} عمليات)`;
  }

  // بناء رأس الجدول
  if (thead) {
    thead.innerHTML = `
      <tr>
        ${columns.map(col => `<th class="py-2.5 px-3 font-bold ${col.align}">${col.label}</th>`).join("")}
      </tr>
    `;
  }

  renderDrilldownRows(items, columns, type);
  modal.classList.remove("hidden");
  lucide.createIcons();
}

function closeFinancialDrilldownModal() {
  const modal = document.getElementById("modal-financial-drilldown");
  if (modal) modal.classList.add("hidden");
  state.drilldownCurrentType = "";
  state.drilldownCurrentItems = [];
}

function filterDrilldownTable() {
  const q = (document.getElementById("drilldown-search-input")?.value || "").trim().toLowerCase();
  const items = state.drilldownCurrentItems || [];
  const type = state.drilldownCurrentType || "";
  const columns = state.drilldownCurrentColumns || [];

  if (!q) {
    renderDrilldownRows(items, columns, type);
    const countBadge = document.getElementById("drilldown-count-badge");
    if (countBadge) countBadge.textContent = `(${items.length} عمليات)`;
    return;
  }

  const filtered = items.filter(item => {
    return Object.values(item).some(val => {
      if (val === null || val === undefined) return false;
      return String(val).toLowerCase().includes(q);
    });
  });

  renderDrilldownRows(filtered, columns, type);
  const countBadge = document.getElementById("drilldown-count-badge");
  if (countBadge) countBadge.textContent = `(${filtered.length} من أصل ${items.length})`;
}

function renderDrilldownRows(items, columns, type) {
  const tbody = document.getElementById("drilldown-table-body");
  if (!tbody) return;

  if (items.length === 0) {
    tbody.innerHTML = `
      <tr>
        <td colspan="${columns.length || 6}" class="py-10 text-center text-[#6B6B6B] text-xs space-y-1">
          <div class="text-2xl">📋</div>
          <div class="font-bold text-[#111111]">لا توجد عمليات أو بنود مسجلة مطابقة</div>
          <div class="text-[11px] text-[#A0A096]">تأكد من العمليات المسجلة في الصندوق أو محددات التصفية.</div>
        </td>
      </tr>
    `;
    return;
  }

  tbody.innerHTML = items.map((item, index) => {
    if (type === "today_profit" || type === "month_profit") {
      const totalRev = Number(item.totalAmount || 0);
      const netProfit = Number(item.netProfit || 0);
      const totalCost = Math.max(0, totalRev - netProfit);

      return `
        <tr class="hover:bg-[#F8F8F6] transition border-b border-[#EAEAE5]">
          <td class="py-2.5 px-3 text-center text-[#A0A096] font-mono text-[10px]">${index + 1}</td>
          <td class="py-2.5 px-3 whitespace-nowrap">
            <span class="font-mono font-bold text-[#111111] bg-gray-100 px-2 py-0.5 rounded text-[11px]">${escapeHtml(item.id)}</span>
          </td>
          <td class="py-2.5 px-3">
            <div class="font-bold text-[#111111]">${escapeHtml(item.clientName || 'زبون')}</div>
            <div class="text-[10px] text-[#6B6B6B]">${escapeHtml(item.clientCity || '')} ${item.clientPhone ? `• ${escapeHtml(item.clientPhone)}` : ''}</div>
          </td>
          <td class="py-2.5 px-3 font-medium text-[#111111]">
            <div>${escapeHtml(item.designation || 'أكياس مطبوعة')}</div>
            ${item.sacCategory ? `<span class="text-[10px] text-[#C9A227] font-bold">${escapeHtml(item.sacCategory)}</span>` : ''}
          </td>
          <td class="py-2.5 px-3 text-center font-mono font-bold text-[#111111] whitespace-nowrap">
            ${Number(item.quantity || 0).toLocaleString()} حبة
          </td>
          <td class="py-2.5 px-3 text-left font-mono font-bold text-[#111111] whitespace-nowrap">
            ${totalRev.toFixed(2)} د
          </td>
          <td class="py-2.5 px-3 text-left font-mono text-[#6B6B6B] whitespace-nowrap">
            ${totalCost.toFixed(2)} د
          </td>
          <td class="py-2.5 px-3 text-left font-mono font-black whitespace-nowrap text-[#16B981]">
            +${netProfit.toFixed(2)} د
          </td>
        </tr>
      `;
    } else if (type === "reste_clients") {
      const ozoneFee = (item.deliveryType === "ozone") ? Number(item.ozoneFees || 0) : 0;
      const workshopAmount = Math.max(0, Number(item.totalAmount || 0) - ozoneFee);
      const resteWorkshop = Math.max(0, workshopAmount - Number(item.avanceAmount || 0));

      return `
        <tr class="hover:bg-[#F8F8F6] transition border-b border-[#EAEAE5]">
          <td class="py-2.5 px-3 text-center text-[#A0A096] font-mono text-[10px]">${index + 1}</td>
          <td class="py-2.5 px-3 whitespace-nowrap">
            <span class="font-mono font-bold text-[#111111] bg-gray-100 px-2 py-0.5 rounded text-[11px]">${escapeHtml(item.id)}</span>
          </td>
          <td class="py-2.5 px-3">
            <div class="font-bold text-[#111111]">${escapeHtml(item.clientName || 'زبون')}</div>
            <div class="text-[10px] text-[#6B6B6B] font-mono">${escapeHtml(item.clientPhone || '')}</div>
          </td>
          <td class="py-2.5 px-3 text-[#6B6B6B] text-[11px]">
            <div>${escapeHtml(item.clientCity || 'الورشة')}</div>
            <span class="text-[10px] ${item.deliveryType === 'ozone' ? 'text-sky-600 font-bold' : 'text-gray-500'}">
              ${item.deliveryType === 'ozone' ? '🚚 أوزون إكسبريس' : '🤝 تسليم مباشر'}
            </span>
          </td>
          <td class="py-2.5 px-3 font-medium text-[#111111]">
            ${escapeHtml(item.designation || '')} (${Number(item.quantity || 0).toLocaleString()} حبة)
          </td>
          <td class="py-2.5 px-3 text-left font-mono font-bold text-[#111111] whitespace-nowrap">
            ${Number(item.totalAmount || 0).toFixed(2)} د
          </td>
          <td class="py-2.5 px-3 text-left font-mono text-emerald-700 whitespace-nowrap">
            ${Number(item.avanceAmount || 0).toFixed(2)} د
          </td>
          <td class="py-2.5 px-3 text-left font-mono font-black text-[#EF4444] whitespace-nowrap">
            ${resteWorkshop.toFixed(2)} د
          </td>
        </tr>
      `;
    } else if (type === "ozone_pending") {
      const netFromOzone = Math.max(0, Number(item.resteAmount || 0) - Number(item.ozoneFees || 0));

      return `
        <tr class="hover:bg-[#F8F8F6] transition border-b border-[#EAEAE5]">
          <td class="py-2.5 px-3 text-center text-[#A0A096] font-mono text-[10px]">${index + 1}</td>
          <td class="py-2.5 px-3 whitespace-nowrap">
            <span class="font-mono font-bold text-[#111111] bg-gray-100 px-2 py-0.5 rounded text-[11px]">${escapeHtml(item.id)}</span>
          </td>
          <td class="py-2.5 px-3">
            <div class="font-bold text-[#111111]">${escapeHtml(item.clientName || 'زبون')}</div>
            <div class="text-[10px] text-[#6B6B6B]">${escapeHtml(item.clientCity || '')}</div>
          </td>
          <td class="py-2.5 px-3 whitespace-nowrap">
            <span class="font-mono font-bold text-sky-700 bg-sky-50 border border-sky-200 px-2 py-0.5 rounded text-[11px]">
              ${escapeHtml(item.ozoneTracking || 'قيد الانتظار')}
            </span>
          </td>
          <td class="py-2.5 px-3 font-medium text-[#111111]">
            ${escapeHtml(item.designation || '')}
          </td>
          <td class="py-2.5 px-3 text-left font-mono font-bold text-[#111111] whitespace-nowrap">
            ${Number(item.resteAmount || 0).toFixed(2)} د
          </td>
          <td class="py-2.5 px-3 text-left font-mono text-[#EF4444] whitespace-nowrap">
            -${Number(item.ozoneFees || 0).toFixed(2)} د
          </td>
          <td class="py-2.5 px-3 text-left font-mono font-black text-sky-700 whitespace-nowrap">
            +${netFromOzone.toFixed(2)} د
          </td>
        </tr>
      `;
    } else {
      // التعامل مع معاملات الصندوق: دخل اليوم، مداخيل الشهر، مصاريف الشهر، سلعة ومواد خام
      const isEntree = item.type === "entree";
      const isMatiere = item.type === "sortie" && (item.category === "matieres" || item.category === "consommables");
      const paymentLabel = item.paymentMethod === "virement" ? "🏦 تحويل بنكي" : (item.paymentMethod === "cheque" ? "📝 شيك" : "💵 كاش");
      const catLabel = getCategoryLabel(item.category);

      return `
        <tr class="hover:bg-[#F8F8F6] transition border-b border-[#EAEAE5]">
          <td class="py-2.5 px-3 text-center text-[#A0A096] font-mono text-[10px]">${index + 1}</td>
          <td class="py-2.5 px-3 font-mono text-[11px] text-[#6B6B6B] whitespace-nowrap">${item.date || ''}</td>
          <td class="py-2.5 px-3 whitespace-nowrap">
            <span class="inline-flex items-center gap-1 font-bold text-[10px] px-2 py-0.5 rounded ${isEntree ? 'bg-emerald-50 text-emerald-700 border border-emerald-200' : (isMatiere ? 'bg-orange-50 text-orange-700 border border-orange-200' : 'bg-gray-50 text-[#6B6B6B] border border-gray-200')}">
              ${isEntree ? '🟢' : (isMatiere ? '🛍️' : '🏢')} ${escapeHtml(catLabel)}
            </span>
          </td>
          <td class="py-2.5 px-3 font-medium text-[#111111]">
            <div>${escapeHtml(item.description || '-')}</div>
            ${item.notes ? `<div class="text-[10px] text-[#6B6B6B] mt-0.5">${escapeHtml(item.notes)}</div>` : ''}
          </td>
          <td class="py-2.5 px-3 text-[#6B6B6B] text-[11px] whitespace-nowrap">${paymentLabel}</td>
          <td class="py-2.5 px-3 text-left font-black font-mono whitespace-nowrap ${isEntree ? 'text-[#16B981]' : (isMatiere ? 'text-orange-700' : 'text-[#EF4444]')}">
            ${isEntree ? '+' : '-'}${Number(item.amount || 0).toFixed(2)} د
          </td>
        </tr>
      `;
    }
  }).join("");

  lucide.createIcons();
}

// ==============================================
// GENDER / TITLE HELPER & REAL-TIME COUNTDOWN ENGINE
// ==============================================
function getClientTitle(gender) {
  return (gender === 'female') ? "لالة" : "سيدي";
}

function getDaysElapsed(dateStr) {
  if (!dateStr) return 0;
  const orderDate = new Date(dateStr);
  const today = new Date();
  const diffTime = today - orderDate;
  return Math.max(0, Math.floor(diffTime / (1000 * 60 * 60 * 24)));
}

function formatRemainingTime(ms) {
  if (ms <= 0) return "انتهى الوقت! 🔔";
  const days = Math.floor(ms / (1000 * 60 * 60 * 24));
  const hours = Math.floor((ms % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  const mins = Math.floor((ms % (1000 * 60 * 60)) / (1000 * 60));
  const secs = Math.floor((ms % (1000 * 60)) / 1000);

  if (days > 0) {
    return `${days}j ${String(hours).padStart(2, '0')}h ${String(mins).padStart(2, '0')}m ${String(secs).padStart(2, '0')}s`;
  }
  if (hours > 0) {
    return `${String(hours).padStart(2, '0')}h ${String(mins).padStart(2, '0')}m ${String(secs).padStart(2, '0')}s`;
  }
  return `${String(mins).padStart(2, '0')}m ${String(secs).padStart(2, '0')}s`;
}

function getOrderCountdownButtonHtml(order) {
  if (!order) return "";
  if (order.countdown && order.countdown.enabled) {
    const targetTime = new Date(order.countdown.targetDate).getTime();
    const rem = targetTime - Date.now();
    if (order.countdown.status === 'reminded') {
      return `
        <div class="inline-flex items-center gap-1">
          <button type="button" onclick="openCountdownModal('${order.id}')" class="inline-flex items-center gap-1 px-2.5 py-1.5 bg-emerald-50 hover:bg-emerald-100 text-emerald-700 border border-emerald-200 text-xs font-bold rounded-xl transition cursor-pointer" title="تم إرسال رسالة التذكير بنجاح - انقر لتفاصيل العداد">
            <i data-lucide="check-check" class="w-3.5 h-3.5"></i>
            <span>تم التذكير ✅</span>
          </button>
          <button type="button" onclick="openExtendModal('${order.id}')" class="flex items-center gap-1 px-2.5 py-1.5 bg-[#FAF6EA] hover:bg-[#F5EECD] text-[#C9A227] border border-[#E8DCB5] text-xs font-bold rounded-xl transition cursor-pointer" title="تمديد المهلة بالأيام التي يحددها الزبون">
            <i data-lucide="calendar-plus" class="w-3.5 h-3.5"></i>
            <span>تمديد المهلة</span>
          </button>
        </div>
      `;
    } else if (rem <= 0 || order.countdown.status === 'expired') {
      return `
        <div class="inline-flex items-center gap-1">
          <button type="button" onclick="sendRelanceWhatsApp('${order.id}', 'renew')" class="flex items-center gap-1.5 px-2.5 py-1.5 bg-[#16B981] hover:bg-[#059669] text-white text-xs font-bold rounded-xl transition shadow-xs cursor-pointer animate-pulse" title="انتهى العداد! إرسال تذكير إعادة طلب الأكياس بالواتساب">
            <i data-lucide="bell-ring" class="w-3.5 h-3.5"></i>
            <span>تذكير الأكياس 🔔</span>
          </button>
          <button type="button" onclick="openExtendModal('${order.id}')" class="flex items-center gap-1 px-2.5 py-1.5 bg-[#FAF6EA] hover:bg-[#F5EECD] text-[#C9A227] border border-[#E8DCB5] text-xs font-bold rounded-xl transition cursor-pointer" title="تمديد المهلة (تحديد الأيام)">
            <i data-lucide="calendar-plus" class="w-3.5 h-3.5"></i>
            <span>تمديد</span>
          </button>
        </div>
      `;
    } else {
      return `
        <button type="button" onclick="openCountdownModal('${order.id}')" class="flex items-center gap-1.5 px-3 py-1.5 bg-[#FAF6EA] hover:bg-[#F5EECD] text-[#C9A227] border border-[#E8DCB5] text-xs font-bold rounded-xl transition cursor-pointer shadow-xs" title="انقر لتعديل أو تمديد العد التنازلي">
          <i data-lucide="timer" class="w-3.5 h-3.5 text-[#C9A227]"></i>
          <span data-countdown-id="${order.id}" class="countdown-timer-${order.id} font-mono font-bold">${formatRemainingTime(rem)}</span>
        </button>
      `;
    }
  } else {
    return `
      <button type="button" onclick="openCountdownModal('${order.id}')" class="flex items-center gap-1.5 px-2.5 py-1.5 bg-[#F8F8F6] hover:bg-[#FAF6EA] text-[#6B6B6B] hover:text-[#C9A227] border border-[#EAEAE5] hover:border-[#E8DCB5] text-xs font-bold rounded-xl transition cursor-pointer" title="ضبط وتشغيل عدّاد تذكير الزبون بإعادة الطلب">
        <i data-lucide="timer" class="w-3.5 h-3.5 text-[#C9A227]"></i>
        <span>العدّاد</span>
      </button>
    `;
  }
}

function playChimeSound() {
  try {
    const AudioContext = window.AudioContext || window.webkitAudioContext;
    if (!AudioContext) return;
    const ctx = new AudioContext();
    if (ctx.state === "suspended") {
      ctx.resume();
    }
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.type = "sine";
    osc.frequency.setValueAtTime(587.33, ctx.currentTime);
    osc.frequency.setValueAtTime(880, ctx.currentTime + 0.15);
    osc.frequency.setValueAtTime(1174.66, ctx.currentTime + 0.30);
    gain.gain.setValueAtTime(0.3, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.8);
    osc.connect(gain);
    gain.connect(ctx.destination);
    osc.start();
    osc.stop(ctx.currentTime + 0.8);
  } catch (e) {
    // Audio autoplay restrictions
  }
}

function showWebNotification(order) {
  try {
    if ("Notification" in window && Notification.permission === "granted") {
      const title = getClientTitle(order.clientGender);
      new Notification("⏰ تذكير ماستر برينت (Agadir)", {
        body: `انتهى عدّاد تذكير ${title} ${order.clientName} بإعادة طلب الأكياس (${order.designation})!`,
        icon: "logo.jpg"
      });
    }
  } catch (e) {
    // Notifications not supported on file://
  }
}

let countdownInterval = null;

function startCountdownTicker() {
  if (countdownInterval) clearInterval(countdownInterval);
  countdownInterval = setInterval(tickCountdowns, 1000);
}

function tickCountdowns() {
  const now = Date.now();
  let hasExpiredOrders = false;
  let newlyExpiredOrder = null;

  state.orders.forEach(o => {
    if (o.countdown && o.countdown.enabled) {
      const target = new Date(o.countdown.targetDate).getTime();
      const diff = target - now;

      if (diff <= 0 && o.countdown.status === 'running') {
        o.countdown.status = 'expired';
        hasExpiredOrders = true;
        newlyExpiredOrder = o;
        playChimeSound();
        showWebNotification(o);
      }

      // تحديث كل مؤشرات العدادات في الشاشة
      const timerEls = document.querySelectorAll(`[data-countdown-id="${o.id}"]`);
      timerEls.forEach(el => {
        if (o.countdown.status === 'reminded') {
          el.innerHTML = `<span class="text-emerald-400 font-bold">✅ تم التذكير</span>`;
        } else if (diff <= 0 || o.countdown.status === 'expired') {
          el.innerHTML = `<span class="text-rose-400 font-bold animate-pulse">🔔 انتهى العداد! حان وقت التذكير</span>`;
        } else {
          el.textContent = formatRemainingTime(diff);
        }
      });
    }
  });

  if (hasExpiredOrders) {
    saveData();
    renderRelanceList();
    renderOrdersTable();
    updateRelanceQuickWidget();
    if (newlyExpiredOrder) {
      showCountdownAlertModal(newlyExpiredOrder);
    }
  }
}

function showCountdownAlertModal(order) {
  const modal = document.getElementById("modal-countdown-expired-alert");
  if (!modal) return;

  document.getElementById("expired-alert-order-id").value = order.id;
  const title = getClientTitle(order.clientGender);
  document.getElementById("expired-alert-client-name").textContent = `${title} ${order.clientName}`;
  document.getElementById("expired-alert-order-desc").textContent = `${order.designation} (${order.quantity} حبة) - طلبية رقم ${order.id}`;
  document.getElementById("expired-alert-client-phone").textContent = order.clientPhone;

  const genderBadge = document.getElementById("expired-alert-client-gender-badge");
  if (genderBadge) {
    if (order.clientGender === 'female') {
      genderBadge.className = "text-[10px] bg-rose-500/20 text-rose-300 font-bold px-2 py-0.5 rounded border border-rose-500/30";
      genderBadge.textContent = "👩 لالة";
    } else {
      genderBadge.className = "text-[10px] bg-amber-500/20 text-amber-300 font-bold px-2 py-0.5 rounded border border-amber-500/30";
      genderBadge.textContent = "👨 سيدي";
    }
  }

  const days = order.countdown?.durationDays || 20;
  const durationText = days > 0 ? `${days} يوم` : (order.countdown?.durationSeconds ? `${order.countdown.durationSeconds} ثانية` : "20 يوم");

  const message = 
`🤖 *تذكير آلي من MASTER PRINT* 📦

السلام عليكم ${title} ${order.clientName}،
مرّت ${durationText} على آخر طلب ديالكم: *${order.designation} – ${order.quantity} قطعة*.

بغينا نعرفو واش قرب يسالي المخزون باش نوجدو ليكم دفعة جديدة بنفس الجودة. 🛍️

📞 0663103599
📍 Agadir, Maroc

شكراً على ثقتكم بـ *MASTER PRINT* 🤝`;

  const previewEl = document.getElementById("expired-alert-msg-preview");
  if (previewEl) previewEl.textContent = message;

  modal.classList.remove("hidden");
  lucide.createIcons();
}

function closeCountdownAlertModal() {
  const modal = document.getElementById("modal-countdown-expired-alert");
  if (modal) modal.classList.add("hidden");
}

function sendExpiredAlertWhatsApp() {
  const orderId = document.getElementById("expired-alert-order-id").value;
  closeCountdownAlertModal();
  sendRelanceWhatsApp(orderId, 'renew');
}

function openExtendFromAlertModal() {
  const orderId = document.getElementById("expired-alert-order-id").value;
  closeCountdownAlertModal();
  openExtendModal(orderId);
}

function openCountdownModal(orderId) {
  const order = state.orders.find(o => o.id === orderId);
  if (!order) return;

  document.getElementById("countdown-order-id").value = order.id;
  const title = getClientTitle(order.clientGender);
  document.getElementById("countdown-client-title").textContent = title;
  document.getElementById("countdown-client-name").textContent = order.clientName;
  document.getElementById("countdown-order-desc").textContent = `${order.designation} (${order.quantity} حبة) - تاريخ: ${order.date}`;

  const statusBadge = document.getElementById("countdown-current-status-badge");
  const cancelBtn = document.getElementById("btn-cancel-countdown");

  const secInput = document.getElementById("countdown-input-seconds");
  if (secInput) secInput.value = order.countdown?.durationSeconds || 0;

  const customExtendInput = document.getElementById("countdown-extend-custom-days");
  if (customExtendInput) customExtendInput.value = 5;

  if (order.countdown && order.countdown.enabled) {
    document.getElementById("countdown-input-days").value = order.countdown.durationDays || 0;
    document.getElementById("countdown-input-hours").value = order.countdown.durationHours || 0;
    document.getElementById("countdown-input-minutes").value = order.countdown.durationMinutes || 0;
    document.getElementById("countdown-auto-notify").checked = order.countdown.autoNotify !== false;

    if (order.countdown.status === 'reminded') {
      statusBadge.className = "badge-status bg-emerald-500/20 text-emerald-300 border border-emerald-500/30";
      statusBadge.textContent = "✅ تم التذكير";
    } else if (order.countdown.status === 'expired' || (order.countdown.status === 'running' && new Date(order.countdown.targetDate).getTime() <= Date.now())) {
      statusBadge.className = "badge-status bg-rose-500/20 text-rose-300 border border-rose-500/30";
      statusBadge.textContent = "🔔 انتهت المدة";
    } else {
      statusBadge.className = "badge-status bg-amber-500/20 text-amber-300 border border-amber-500/30";
      statusBadge.textContent = "⏳ عدّاد قيد العمل";
    }
    cancelBtn.classList.remove("hidden");
  } else {
    document.getElementById("countdown-input-days").value = 20;
    document.getElementById("countdown-input-hours").value = 0;
    document.getElementById("countdown-input-minutes").value = 0;
    if (secInput) secInput.value = 0;
    document.getElementById("countdown-auto-notify").checked = true;

    statusBadge.className = "badge-status bg-gray-800 text-gray-300";
    statusBadge.textContent = "غير مفعل";
    cancelBtn.classList.add("hidden");
  }

  recalcCountdownTargetPreview();
  updateCountdownMsgPreview(order);

  try {
    if ("Notification" in window && Notification.permission === "default") {
      Notification.requestPermission();
    }
  } catch (e) {}

  document.getElementById("modal-countdown").classList.remove("hidden");
  lucide.createIcons();
}

function closeCountdownModal() {
  document.getElementById("modal-countdown").classList.add("hidden");
}

function setCountdownPreset(days, hours, minutes, seconds = 0) {
  document.getElementById("countdown-input-days").value = days;
  document.getElementById("countdown-input-hours").value = hours;
  document.getElementById("countdown-input-minutes").value = minutes;
  const secEl = document.getElementById("countdown-input-seconds");
  if (secEl) secEl.value = seconds;
  recalcCountdownTargetPreview();

  const orderId = document.getElementById("countdown-order-id").value;
  const order = state.orders.find(o => o.id === orderId);
  if (order) updateCountdownMsgPreview(order);
}

function recalcCountdownTargetPreview() {
  const days = parseInt(document.getElementById("countdown-input-days").value) || 0;
  const hours = parseInt(document.getElementById("countdown-input-hours").value) || 0;
  const mins = parseInt(document.getElementById("countdown-input-minutes").value) || 0;
  const secs = parseInt(document.getElementById("countdown-input-seconds")?.value) || 0;

  const targetMs = Date.now() + (days * 86400000) + (hours * 3600000) + (mins * 60000) + (secs * 1000);
  const targetDate = new Date(targetMs);

  const previewEl = document.getElementById("countdown-target-preview");
  if (previewEl) {
    if (days === 0 && hours === 0 && mins === 0 && secs > 0) {
      previewEl.textContent = `بعد ${secs} ثانية (الساعة ${String(targetDate.getHours()).padStart(2, '0')}:${String(targetDate.getMinutes()).padStart(2, '0')}:${String(targetDate.getSeconds()).padStart(2, '0')})`;
    } else {
      previewEl.textContent = `${targetDate.toLocaleDateString('ar-MA', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })} الساعة ${String(targetDate.getHours()).padStart(2, '0')}:${String(targetDate.getMinutes()).padStart(2, '0')}`;
    }
  }

  const orderId = document.getElementById("countdown-order-id").value;
  const order = state.orders.find(o => o.id === orderId);
  if (order) updateCountdownMsgPreview(order);
}

function updateCountdownMsgPreview(order) {
  const days = parseInt(document.getElementById("countdown-input-days").value) || 20;
  const secs = parseInt(document.getElementById("countdown-input-seconds")?.value) || 0;
  const title = getClientTitle(order.clientGender);
  const durationText = days > 0 ? `${days} يوم` : (secs > 0 ? `${secs} ثانية` : "20 يوم");

  const previewMsg = 
`🤖 *تذكير آلي من MASTER PRINT* 📦

السلام عليكم ${title} ${order.clientName}،
مرّت ${durationText} على آخر طلب ديالكم: *${order.designation} – ${order.quantity} قطعة*.

بغينا نعرفو واش قرب يسالي المخزون باش نوجدو ليكم دفعة جديدة بنفس الجودة. 🛍️

📞 0663103599
📍 Agadir, Maroc

شكراً على ثقتكم بـ *MASTER PRINT* 🤝`;

  const previewContainer = document.getElementById("countdown-msg-preview");
  if (previewContainer) previewContainer.textContent = previewMsg;
}

function saveOrderCountdown() {
  const orderId = document.getElementById("countdown-order-id").value;
  const order = state.orders.find(o => o.id === orderId);
  if (!order) return;

  const days = parseInt(document.getElementById("countdown-input-days").value) || 0;
  const hours = parseInt(document.getElementById("countdown-input-hours").value) || 0;
  const mins = parseInt(document.getElementById("countdown-input-minutes").value) || 0;
  const secs = parseInt(document.getElementById("countdown-input-seconds")?.value) || 0;
  const autoNotify = document.getElementById("countdown-auto-notify").checked;

  if (days === 0 && hours === 0 && mins === 0 && secs === 0) {
    alert("المرجو إدخال مدة صحيحة للعد التنازلي (مثلاً: 20 يوم أو 30 ثانية للتجربة).");
    return;
  }

  const now = new Date();
  const targetDate = new Date(now.getTime() + (days * 86400000) + (hours * 3600000) + (mins * 60000) + (secs * 1000));

  order.countdown = {
    enabled: true,
    durationDays: days,
    durationHours: hours,
    durationMinutes: mins,
    durationSeconds: secs,
    startDate: now.toISOString(),
    targetDate: targetDate.toISOString(),
    status: 'running',
    autoNotify
  };

  saveData();
  closeCountdownModal();
  renderAll();

  const title = getClientTitle(order.clientGender);
  const timeDisplay = days > 0 ? `${days} يوم` : (secs > 0 ? `${secs} ثانية` : `${mins} دقيقة`);
  alert(`⏱️ تم بنجاح تشغيل العد التنازلي (${timeDisplay}) لطلبية ${title} ${order.clientName}!\n\n🔔 سيتكفل النظام بتنبيهك صوتياً وتلقائياً على الشاشة وتجهيز رسالة الواتساب فور انتهاء الوقت.`);
}

function cancelOrderCountdown() {
  const orderId = document.getElementById("countdown-order-id").value;
  const order = state.orders.find(o => o.id === orderId);
  if (!order) return;

  if (confirm("هل تريد إيقاف وإلغاء هذا العد التنازلي؟")) {
    order.countdown = null;
    saveData();
    closeCountdownModal();
    renderAll();
  }
}

// -------------------------------------------------------------
// ميزة تمديد مهلة العداد (الزبون طلب وقتاً إضافياً)
// للمستخدم كامل الحرية في تحديد عدد الأيام التي يريدها
// -------------------------------------------------------------
function extendCurrentModalCustomDays() {
  const orderId = document.getElementById("countdown-order-id").value;
  const days = parseInt(document.getElementById("countdown-extend-custom-days").value);
  if (!days || isNaN(days) || days <= 0) {
    alert("المرجو كتابة عدد أيام صحيح (مثلاً 5 أو 7 أيام).");
    return;
  }
  executeExtendCountdown(orderId, days);
}

function setCountdownModalExtendDays(days) {
  const input = document.getElementById("countdown-extend-custom-days");
  if (input) input.value = days;
}

function openExtendModal(orderId) {
  const order = state.orders.find(o => o.id === orderId);
  if (!order) return;

  document.getElementById("extend-order-id").value = order.id;
  const title = getClientTitle(order.clientGender);
  document.getElementById("extend-client-name").textContent = `${title} ${order.clientName}`;
  document.getElementById("extend-order-desc").textContent = `${order.designation} (${order.quantity} حبة) - طلبية رقم ${order.id}`;

  const genderBadge = document.getElementById("extend-client-gender-badge");
  if (genderBadge) {
    if (order.clientGender === 'female') {
      genderBadge.className = "text-[10px] bg-rose-500/20 text-rose-300 font-bold px-2 py-0.5 rounded border border-rose-500/30";
      genderBadge.textContent = "👩 لالة";
    } else {
      genderBadge.className = "text-[10px] bg-amber-500/20 text-amber-300 font-bold px-2 py-0.5 rounded border border-amber-500/30";
      genderBadge.textContent = "👨 سيدي";
    }
  }

  const input = document.getElementById("extend-input-days");
  if (input) input.value = 5;

  recalcExtendPreview();

  document.getElementById("modal-extend-countdown").classList.remove("hidden");
  lucide.createIcons();
}

function closeExtendModal() {
  const modal = document.getElementById("modal-extend-countdown");
  if (modal) modal.classList.add("hidden");
}

function adjustExtendDays(delta) {
  const input = document.getElementById("extend-input-days");
  if (!input) return;
  let val = (parseInt(input.value) || 0) + delta;
  if (val < 1) val = 1;
  input.value = val;
  recalcExtendPreview();
}

function setExtendDaysDirect(days) {
  const input = document.getElementById("extend-input-days");
  if (input) input.value = days;
  recalcExtendPreview();
}

function recalcExtendPreview() {
  const input = document.getElementById("extend-input-days");
  const days = input ? (parseInt(input.value) || 0) : 0;
  const previewEl = document.getElementById("extend-target-preview");
  if (previewEl) {
    if (days <= 0) {
      previewEl.textContent = "المرجو إدخال يوم واحد على الأقل";
    } else {
      const targetDate = new Date(Date.now() + (days * 86400000));
      previewEl.textContent = `ينتهي في: ${targetDate.toLocaleDateString('ar-MA', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}`;
    }
  }
}

function confirmExtendCountdown() {
  const orderId = document.getElementById("extend-order-id").value;
  const days = parseInt(document.getElementById("extend-input-days").value);
  if (!days || isNaN(days) || days <= 0) {
    alert("المرجو كتابة عدد أيام صحيح لتمديد العداد.");
    return;
  }
  executeExtendCountdown(orderId, days);
}

function executeExtendCountdown(orderId, days) {
  const order = state.orders.find(o => o.id === orderId);
  if (!order) return;

  const now = new Date();
  const targetDate = new Date(now.getTime() + (days * 86400000));

  order.countdown = {
    enabled: true,
    durationDays: days,
    durationHours: 0,
    durationMinutes: 0,
    durationSeconds: 0,
    startDate: now.toISOString(),
    targetDate: targetDate.toISOString(),
    status: 'running',
    autoNotify: true
  };

  saveData();
  closeExtendModal();
  closeCountdownAlertModal();
  closeCountdownModal();
  renderAll();

  const title = getClientTitle(order.clientGender);
  alert(`✅ تم بنجاح تمديد العداد لـ ${title} ${order.clientName} بـ ${days} أيام إضافية!\n\nسيبدأ العد التنازلي الجديد من الآن وسينبهك النظام تلقائياً عند انتهائه.`);
}

function openRelanceWithFilter(filterKey) {
  switchTab('relance');
  setRelanceFilter(filterKey);
}

function setRelanceFilter(filterKey) {
  const hiddenInput = document.getElementById("relance-filter-type");
  if (hiddenInput) hiddenInput.value = filterKey;

  const pillKeys = ['ALL', 'countdown', 'unpaid', 'conception'];
  pillKeys.forEach(k => {
    const pill = document.getElementById(`pill-relance-${k}`);
    if (pill) {
      if (k === filterKey) {
        pill.className = "relance-pill flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold bg-[#FAF6EA] text-[#C9A227] border border-[#E8DCB5] shadow-xs transition cursor-pointer";
      } else {
        pill.className = "relance-pill flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold bg-[#F8F8F6] text-[#6B6B6B] hover:text-[#111111] border border-[#EAEAE5] transition cursor-pointer";
      }
    }
  });

  const navCountdownSub = document.getElementById("nav-countdown-sub");
  if (navCountdownSub) {
    if (filterKey === 'countdown') {
      navCountdownSub.classList.add("text-[#C9A227]", "bg-[#FAF6EA]", "font-black");
      navCountdownSub.classList.remove("text-[#6B6B6B]");
    } else {
      navCountdownSub.classList.remove("text-[#C9A227]", "bg-[#FAF6EA]", "font-black");
      navCountdownSub.classList.add("text-[#6B6B6B]");
    }
  }

  renderRelanceList();
}

function updateRelanceQuickWidget() {
  const container = document.getElementById("dash-relance-quick-list");
  const countBadge = document.getElementById("dash-relance-count");
  const navRelanceBadge = document.getElementById("badge-count-relance");
  const navCountdownBadge = document.getElementById("badge-sidebar-countdown");

  const unpaidOrders = state.orders.filter(o => 
    o.status !== "retour" && 
    o.status !== "annulee" && 
    (Number(o.totalAmount || 0) - Number(o.avanceAmount || 0)) > 0
  );

  const batOrders = state.orders.filter(o => o.status === "conception");

  const countdownOrders = state.orders.filter(o => o.countdown && o.countdown.enabled);

  const countdownExpiredOrders = state.orders.filter(o => 
    o.countdown && o.countdown.enabled && 
    (o.countdown.status === 'expired' || (o.countdown.status === 'running' && new Date(o.countdown.targetDate).getTime() <= Date.now()))
  );

  const totalRelanceCount = unpaidOrders.length + batOrders.length + countdownExpiredOrders.length;
  if (countBadge) countBadge.textContent = totalRelanceCount;
  if (navRelanceBadge) navRelanceBadge.textContent = totalRelanceCount;

  if (navCountdownBadge) {
    navCountdownBadge.textContent = countdownOrders.length;
    if (countdownExpiredOrders.length > 0) {
      navCountdownBadge.className = "text-[10px] bg-rose-50 text-rose-600 px-1.5 py-0.2 rounded-full font-mono font-bold border border-rose-200 animate-pulse";
    } else {
      navCountdownBadge.className = "text-[10px] bg-[#FAF6EA] text-[#C9A227] px-1.5 py-0.2 rounded-full font-mono font-bold border border-[#E8DCB5]";
    }
  }

  // Update pills badges
  const pillAll = document.getElementById("pill-badge-relance-all");
  const pillCountdown = document.getElementById("pill-badge-relance-countdown");
  const pillUnpaid = document.getElementById("pill-badge-relance-unpaid");
  const pillConception = document.getElementById("pill-badge-relance-conception");

  if (pillAll) pillAll.textContent = countdownOrders.length + unpaidOrders.length + batOrders.length;
  if (pillCountdown) pillCountdown.textContent = countdownOrders.length;
  if (pillUnpaid) pillUnpaid.textContent = unpaidOrders.length;
  if (pillConception) pillConception.textContent = batOrders.length;

  if (!container) return;

  const urgent = [
    ...countdownExpiredOrders.map(o => ({ order: o, type: 'countdown' })),
    ...unpaidOrders.map(o => ({ order: o, type: 'unpaid' })),
    ...batOrders.map(o => ({ order: o, type: 'bat' }))
  ].slice(0, 3);

  if (urgent.length === 0) {
    container.innerHTML = `<div class="text-xs text-emerald-700 bg-emerald-50 p-2 rounded-lg border border-emerald-200">لا توجد أي تذكيرات ملحة اليوم!</div>`;
    return;
  }

  container.innerHTML = urgent.map(item => {
    const o = item.order;
    const title = getClientTitle(o.clientGender);
    const reste = Math.max(0, Number(o.totalAmount || 0) - Number(o.avanceAmount || 0));

    let label = '';
    if (item.type === 'countdown') {
      label = '⏰ انتهى العداد! تجديد الأكياس';
    } else if (item.type === 'bat') {
      label = '🎨 موافقة على التصميم';
    } else {
      label = `باقي: ${reste} درهم`;
    }

    return `
      <div class="p-2.5 bg-white rounded-lg border border-[#EAEAE5] flex items-center justify-between text-xs shadow-xs">
        <div>
          <span class="font-bold text-[#111111]">${title} ${escapeHtml(o.clientName)}</span>
          <span class="text-[10px] text-[#6B6B6B] block">${label}</span>
        </div>
        <button onclick="sendRelanceWhatsApp('${o.id}', '${item.type === 'countdown' ? 'renew' : (item.type === 'bat' ? 'bat' : 'unpaid')}')" class="p-1.5 bg-emerald-50 hover:bg-emerald-100 text-emerald-700 border border-emerald-200 rounded-lg transition cursor-pointer" title="واتساب فوري">
          <i data-lucide="message-circle" class="w-3.5 h-3.5"></i>
        </button>
      </div>
    `;
  }).join("");
}

function renderRelanceList() {
  const container = document.getElementById("relance-cards-container");
  if (!container) return;

  const filter = document.getElementById("relance-filter-type")?.value || "ALL";
  const relanceItems = [];
  const now = Date.now();

  state.orders.forEach(o => {
    const reste = Math.max(0, Number(o.totalAmount || 0) - Number(o.avanceAmount || 0));
    const days = getDaysElapsed(o.date);

    // 1. عدادات إعادة الطلب (Countdown)
    if (o.countdown && o.countdown.enabled) {
      const targetTime = new Date(o.countdown.targetDate).getTime();
      const isExpired = o.countdown.status === 'expired' || (o.countdown.status === 'running' && targetTime <= now);
      const isReminded = o.countdown.status === 'reminded';
      relanceItems.push({
        type: "countdown",
        status: o.countdown.status,
        isExpired,
        isReminded,
        orderId: o.id,
        clientName: o.clientName,
        clientGender: o.clientGender || 'male',
        clientPhone: o.clientPhone,
        clientCity: o.clientCity,
        designation: o.designation,
        quantity: o.quantity,
        targetTime,
        durationDays: o.countdown.durationDays,
        durationHours: o.countdown.durationHours,
        durationMinutes: o.countdown.durationMinutes,
        date: o.date,
        order: o
      });
    }

    // 2. الباقي المعلق
    if (reste > 0 && o.status !== "retour" && o.status !== "annulee") {
      relanceItems.push({
        type: "unpaid",
        orderId: o.id,
        clientName: o.clientName,
        clientGender: o.clientGender || 'male',
        clientPhone: o.clientPhone,
        clientCity: o.clientCity,
        designation: o.designation,
        amount: reste,
        daysElapsed: days,
        date: o.date,
        order: o
      });
    }

    // 3. الموافقة على التصميم
    if (o.status === "conception") {
      relanceItems.push({
        type: "conception",
        orderId: o.id,
        clientName: o.clientName,
        clientGender: o.clientGender || 'male',
        clientPhone: o.clientPhone,
        clientCity: o.clientCity,
        designation: o.designation,
        amount: o.totalAmount,
        daysElapsed: days,
        date: o.date,
        order: o
      });
    }
  });

  let filtered = relanceItems;
  if (filter !== "ALL") {
    filtered = filtered.filter(item => item.type === filter);
  }

  // Find orders without active countdown for quick activation section
  const ordersWithoutCountdown = state.orders.filter(o => 
    (!o.countdown || !o.countdown.enabled) && 
    o.status !== "retour" && 
    o.status !== "annulee"
  );

  let html = "";

  if (filtered.length === 0) {
    let emptyMsg = "كل الأمور مضبوطة! لا توجد تذكيرات أو عدادات نشطة بهذا الفلتر.";
    if (filter === "countdown") {
      emptyMsg = "لا توجد عدادات شغالة حالياً. يمكنك تفعيل العداد لأي طلبية من القائمة أسفله بنقرة واحدة!";
    }
    html += `
      <div class="bg-white border border-[#EAEAE5] rounded-2xl p-8 text-center text-[#6B6B6B] shadow-xs">
        <i data-lucide="${filter === 'countdown' ? 'timer' : 'check-circle'}" class="w-10 h-10 mx-auto mb-2 ${filter === 'countdown' ? 'text-[#C9A227]' : 'text-emerald-600'}"></i>
        <p class="text-sm font-bold text-[#111111]">${emptyMsg}</p>
      </div>
    `;
  } else {
    html += filtered.map(item => {
      const o = item.order;
      const title = getClientTitle(item.clientGender);
      const genderBadge = item.clientGender === 'female'
        ? `<span class="text-[11px] px-1.5 py-0.5 rounded bg-rose-50 text-rose-700 font-bold border border-rose-200">👩 لالة</span>`
        : `<span class="text-[11px] px-1.5 py-0.5 rounded bg-[#FAF6EA] text-[#C9A227] font-bold border border-[#E8DCB5]">👨 سيدي</span>`;

      let typeBadge = "";
      let descriptionText = "";
      let actionBtn = "";

      if (item.type === "countdown") {
        if (item.isReminded) {
          typeBadge = `<span class="badge-status bg-emerald-50 text-emerald-700 border border-emerald-200">✅ تم التذكير بالواتساب</span>`;
          descriptionText = `تم إرسال تذكير إعادة طلب الأكياس لـ ${title} ${escapeHtml(item.clientName)}. يمكنك تمديد العداد بالأيام التي يريدها الزبون.`;
        } else if (item.isExpired) {
          typeBadge = `<span class="badge-status bg-rose-50 text-rose-700 border border-rose-200 animate-pulse">🤖 انتهى العداد! حان وقت التذكير</span>`;
          descriptionText = `انتهى وقت العداد المحدد (${item.durationDays || 20} يوم). راسل ${title} ${escapeHtml(item.clientName)} لتجديد طلبيته (${escapeHtml(item.designation)}).`;
        } else {
          typeBadge = `<span class="badge-status bg-[#FAF6EA] text-[#C9A227] border border-[#E8DCB5]">⏱️ عدّاد إعادة الطلب شغال</span>`;
          descriptionText = `العد التنازلي لطلبية ${item.orderId} (${item.durationDays || 0} يوم). انقر على العداد لتعديل المدة أو إيقافه.`;
        }
        actionBtn = `
          <div class="flex flex-wrap items-center gap-2">
            ${getOrderCountdownButtonHtml(o)}
            <button type="button" onclick="sendRelanceWhatsApp('${item.orderId}', 'renew')" class="flex items-center gap-1.5 px-3 py-1.5 bg-emerald-50 hover:bg-emerald-100 text-emerald-700 border border-emerald-200 text-xs font-bold rounded-xl transition cursor-pointer" title="فتح محادثة الواتساب">
              <i data-lucide="message-circle" class="w-3.5 h-3.5"></i>
              <span>واتساب</span>
            </button>
          </div>
        `;
      } else if (item.type === "unpaid") {
        typeBadge = `<span class="badge-status bg-rose-50 text-rose-700 border border-rose-200">💰 باقي ينتظر الأداء: ${item.amount} درهم</span>`;
        descriptionText = `الطلبية رقم ${item.orderId} (${escapeHtml(item.designation)}) - لم يتم استخلاص الباقي بعد (مرّت ${item.daysElapsed} أيام).`;
        actionBtn = `
          <div class="flex flex-wrap items-center gap-2">
            ${getOrderCountdownButtonHtml(o)}
            <button type="button" onclick="sendRelanceWhatsApp('${item.orderId}', 'unpaid')" class="flex items-center gap-1.5 px-3.5 py-1.5 bg-[#16B981] hover:bg-[#059669] text-white text-xs font-bold rounded-xl shadow-xs transition cursor-pointer">
              <i data-lucide="message-circle" class="w-3.5 h-3.5"></i>
              <span>تذكير بالباقي</span>
            </button>
          </div>
        `;
      } else if (item.type === "conception") {
        typeBadge = `<span class="badge-status bg-[#FAF6EA] text-[#C9A227] border border-[#E8DCB5]">🎨 الموافقة على التصميم</span>`;
        descriptionText = `الطلبية رقم ${item.orderId} - في انتظار تأكيد التصميم لبدء الطباعة في الورشة (معلقة منذ ${item.daysElapsed} أيام).`;
        actionBtn = `
          <div class="flex flex-wrap items-center gap-2">
            ${getOrderCountdownButtonHtml(o)}
            <button type="button" onclick="sendRelanceWhatsApp('${item.orderId}', 'conception')" class="flex items-center gap-1.5 px-3.5 py-1.5 bg-[#16B981] hover:bg-[#059669] text-white text-xs font-bold rounded-xl shadow-xs transition cursor-pointer">
              <i data-lucide="message-circle" class="w-3.5 h-3.5"></i>
              <span>تذكير بالتصميم</span>
            </button>
          </div>
        `;
      }

      return `
        <div class="bg-white border border-[#EAEAE5] p-4 rounded-2xl flex flex-col md:flex-row justify-between items-start md:items-center gap-3 hover:border-[#D4D4CE] shadow-xs transition">
          <div class="space-y-1">
            <div class="flex flex-wrap items-center gap-2">
              ${typeBadge}
              ${genderBadge}
              <h3 class="text-sm font-black text-[#111111]">${title} ${escapeHtml(item.clientName)}</h3>
              <span class="text-xs text-[#6B6B6B]">📍 ${escapeHtml(item.clientCity)}</span>
              <span class="text-xs text-[#C9A227] font-bold font-mono">#${item.orderId}</span>
            </div>
            <p class="text-xs text-[#6B6B6B]">${descriptionText}</p>
          </div>

          <div class="w-full md:w-auto flex items-center justify-end pt-2 md:pt-0 border-t md:border-0 border-[#EAEAE5]">
            ${actionBtn}
          </div>
        </div>
      `;
    }).join("");
  }

  // If filtered by countdown, provide direct activation list for remaining orders
  if (filter === "countdown" && ordersWithoutCountdown.length > 0) {
    html += `
      <div class="mt-8 pt-6 border-t border-[#EAEAE5] space-y-3">
        <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <div>
            <h3 class="text-sm font-black text-[#111111] flex items-center gap-2">
              <i data-lucide="timer" class="w-4 h-4 text-[#C9A227]"></i>
              <span>تشغيل العد التنازلي لطلبيات أخرى (بنقرة واحدة كما في جدول الطلبيات)</span>
            </h3>
            <p class="text-xs text-[#6B6B6B]">يمكنك تفعيل عدّاد التذكير بإعادة طلب الأكياس لأي طلبية بنقرة زر واحدة على "العدّاد":</p>
          </div>
          <span class="text-xs bg-[#FAF6EA] text-[#C9A227] px-2.5 py-1 rounded-xl font-bold border border-[#E8DCB5] self-start sm:self-auto">${ordersWithoutCountdown.length} طلبيات بدون عداد</span>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-2 gap-3">
          ${ordersWithoutCountdown.slice(0, 10).map(ord => {
            const clientTitle = getClientTitle(ord.clientGender);
            return `
              <div class="bg-[#FAFAF8] border border-[#EAEAE5] hover:border-[#D4D4CE] p-3 rounded-xl flex items-center justify-between gap-3 shadow-2xs transition">
                <div>
                  <div class="flex items-center gap-2">
                    <span class="text-xs font-black text-[#111111]">${clientTitle} ${escapeHtml(ord.clientName)}</span>
                    <span class="text-[10px] text-[#6B6B6B]">📍 ${escapeHtml(ord.clientCity)}</span>
                  </div>
                  <p class="text-[11px] text-[#6B6B6B] mt-0.5">${escapeHtml(ord.designation)} (${ord.quantity} حبة)</p>
                </div>
                <div>
                  ${getOrderCountdownButtonHtml(ord)}
                </div>
              </div>
            `;
          }).join("")}
        </div>
      </div>
    `;
  }

  container.innerHTML = html;
  lucide.createIcons();
}

function sendRelanceWhatsApp(orderId, relanceType) {
  const order = state.orders.find(o => o.id === orderId);
  if (!order) return;

  // إذا كان التذكير متعلقاً بالعد التنازلي لإعادة طلب الأكياس، نغير الحالة فوراً إلى "تم التذكير" لإطفاء الإنذار الأحمر
  if (relanceType === 'renew' || relanceType === 'reassort' || relanceType === 'countdown') {
    if (order.countdown) {
      order.countdown.status = 'reminded';
      order.countdown.lastRemindedAt = new Date().toISOString();
      order.countdown.remindedCount = (order.countdown.remindedCount || 0) + 1;
      saveData();
      renderAll();
    }
  }

  let phone = (order.clientPhone || "").replace(/\s+/g, '').replace(/-/g, '');
  if (phone.startsWith("0")) phone = "212" + phone.substring(1);
  else if (!phone.startsWith("212")) phone = "212" + phone;
  phone = phone.replace("+", "");

  const reste = Math.max(0, Number(order.totalAmount || 0) - Number(order.avanceAmount || 0));
  const title = getClientTitle(order.clientGender);

  let message = "";
  if (relanceType === "unpaid") {
    let statusText = "";
    if (order.status === "conception") statusText = "قيد التصميم والموافقة";
    else if (order.status === "impression") statusText = "قيد الطباعة في الورشة";
    else if (order.status === "prete") statusText = "جاهزة للتسليم والتوصيل";
    else if (order.status === "livraison") statusText = "مع التوصيل";
    else if (order.status === "livree") statusText = "تم التسليم";
    else if (order.status === "retour") statusText = "ملغاة أو راجعة";

    const workshopName = state.settings.workshopName || "MASTER PRINT";
    const phoneContact = state.settings.phone || "0663103599";

    message = 
`السلام عليكم ${title} ${order.clientName}،

معكم *${workshopName}* 👋

بخصوص طلبيتكم *${order.id}*:
📦 ${order.designation} — *${order.quantity} قطعة*
💰 المجموع: *${order.totalAmount} DH*
✅ العربون: *${order.avanceAmount} DH*
💵 الباقي: *${reste} DH*
📌 الحالة: *${statusText}*

شكراً لثقتكم في *${workshopName}* 🙏
📞 ${phoneContact}`;
  } else if (relanceType === "bat" || relanceType === "conception") {
    message = 
`السلام عليكم ${title} ${order.clientName}،
معكم ورشة *${state.settings.workshopName}* (${state.settings.city}).

بخصوص نموذج التصميم الخاص بطلبيتكم *${order.id}* (${order.designation}):
هل اطلعت عليه ووافقت عليه لننطلق مباشرة في مرحلة الطباعة بالورشة؟ 🎨
📞 هاتف الورشة: ${state.settings.phone}
نحن في انتظار تأكيدكم الكريم للبدء. شكراً لكم!`;
  } else {
    // Automated reorder reminder (تذكير آلي بإعادة طلب الأكياس)
    const days = order.countdown?.durationDays || 20;
    const durationText = days > 0 ? `${days} يوم` : (order.countdown?.durationSeconds ? `${order.countdown.durationSeconds} ثانية` : "20 يوم");
    message = 
`🤖 *تذكير آلي من MASTER PRINT* 📦

السلام عليكم ${title} ${order.clientName}،
مرّت ${durationText} على آخر طلب ديالكم: *${order.designation} – ${order.quantity} قطعة*.

بغينا نعرفو واش قرب يسالي المخزون باش نوجدو ليكم دفعة جديدة بنفس الجودة. 🛍️

📞 0663103599
📍 Agadir, Maroc

شكراً على ثقتكم بـ *MASTER PRINT* 🤝`;
  }

  const encodedUrl = `https://wa.me/${phone}?text=${encodeURIComponent(message)}`;
  window.open(encodedUrl, "_blank");
}

// ==============================================
// CLIENTS & DEBT SETTLEMENT
// ==============================================
function renderClientsList() {
  const container = document.getElementById("clients-list-container");
  const countBadge = document.getElementById("clients-count-badge");
  if (!container) return;

  const clientMap = {};
  state.orders.forEach(o => {
    const key = o.clientPhone || o.clientName;
    if (!clientMap[key]) {
      clientMap[key] = {
        key: key,
        name: o.clientName,
        phone: o.clientPhone,
        city: o.clientCity,
        gender: o.clientGender || 'male',
        ordersCount: 0,
        totalSpent: 0,
        totalUnpaid: 0
      };
    }
    const ozoneFee = (o.deliveryType === "ozone") ? Number(o.ozoneFees || 0) : 0;
    const workshopAmount = Math.max(0, Number(o.totalAmount || 0) - ozoneFee);
    clientMap[key].ordersCount += 1;
    clientMap[key].totalSpent += workshopAmount;
    const resteWorkshop = Math.max(0, workshopAmount - Number(o.avanceAmount || 0));
    clientMap[key].totalUnpaid += resteWorkshop;
  });

  const clients = Object.values(clientMap);
  if (countBadge) countBadge.textContent = `${clients.length} زبون`;

  if (clients.length === 0) {
    container.innerHTML = `<div class="col-span-full py-12 text-center text-[#6B6B6B]">لا يوجد زبناء مسجلون بعد.</div>`;
    return;
  }

  container.innerHTML = clients.map(c => `
    <div class="bg-white border border-[#EAEAE5] p-4 rounded-2xl space-y-3 shadow-xs hover:border-[#D4D4CE] transition">
      <div class="flex justify-between items-start">
        <div>
          <div class="flex items-center gap-1.5">
            ${c.gender === 'female' 
              ? `<span class="text-[10px] bg-rose-50 text-rose-700 px-1.5 py-0.5 rounded border border-rose-200 font-bold">👩 لالة</span>` 
              : `<span class="text-[10px] bg-[#FAF6EA] text-[#C9A227] px-1.5 py-0.5 rounded border border-[#E8DCB5] font-bold">👨 سيدي</span>`}
            <h3 class="text-sm font-bold text-[#111111]">${escapeHtml(c.name)}</h3>
          </div>
          <span class="text-xs text-[#6B6B6B] block mt-0.5">📍 ${escapeHtml(c.city)}</span>
        </div>
        <span class="text-xs font-bold bg-[#FAF6EA] text-[#C9A227] px-2 py-0.5 rounded border border-[#E8DCB5]">
          ${c.ordersCount} طلبيات
        </span>
      </div>

      <div class="bg-[#F8F8F6] p-2.5 rounded-xl border border-[#EAEAE5] text-xs flex justify-between">
        <div>
          <span class="text-[#6B6B6B] text-[10px] block">مجموع المعاملات:</span>
          <span class="font-bold text-[#111111]">${c.totalSpent.toFixed(2)} درهم</span>
        </div>
        <div class="text-left sm:text-right">
          <span class="text-[#6B6B6B] text-[10px] block">الباقي بذمته:</span>
          <span class="font-black ${c.totalUnpaid > 0 ? 'text-[#EF4444]' : 'text-[#16B981]'}">
            ${c.totalUnpaid > 0 ? `${c.totalUnpaid.toFixed(2)} درهم` : 'خالص بالكامل ✅'}
          </span>
        </div>
      </div>

      <div class="flex flex-wrap items-center justify-between gap-2 pt-2 border-t border-[#EAEAE5]">
        <span class="text-xs text-[#6B6B6B]" dir="ltr">${escapeHtml(c.phone)}</span>

        <div class="flex items-center gap-1.5">
          ${c.totalUnpaid > 0 ? `
            <button onclick="openReglerModal('${escapeHtml(c.key)}', '${escapeHtml(c.name)}', ${c.totalUnpaid})" class="px-2.5 py-1 bg-[#16B981] hover:bg-[#059669] text-white text-xs font-bold rounded-lg transition shadow-xs">
              خلاص الباقي
            </button>
          ` : ''}

          <button onclick="openEditClientModal('${escapeHtml(c.phone)}', '${escapeHtml(c.name)}', '${escapeHtml(c.city)}', '${c.gender || 'male'}')" class="p-1.5 bg-[#F8F8F6] hover:bg-[#F4F4F0] text-[#6B6B6B] hover:text-[#111111] border border-[#EAEAE5] rounded-lg transition" title="تعديل">
            <i data-lucide="edit" class="w-3.5 h-3.5"></i>
          </button>

          <button onclick="deleteClientOrders('${escapeHtml(c.key)}')" class="p-1.5 bg-[#F8F8F6] hover:bg-rose-50 text-[#6B6B6B] hover:text-rose-600 border border-[#EAEAE5] rounded-lg transition" title="حذف حساب الزبون">
            <i data-lucide="trash-2" class="w-3.5 h-3.5"></i>
          </button>
        </div>
      </div>
    </div>
  `).join("");

  lucide.createIcons();
}

function openReglerModal(clientKey, clientName, remainingAmount) {
  document.getElementById("regler-client-key").value = clientKey;
  document.getElementById("regler-client-name").textContent = clientName;
  document.getElementById("regler-amount-display").textContent = `${remainingAmount.toFixed(2)} درهم`;
  document.getElementById("regler-paid-amount").value = remainingAmount;
  document.getElementById("modal-regler-client").classList.remove("hidden");
  lucide.createIcons();
}

function closeReglerModal() {
  document.getElementById("modal-regler-client").classList.add("hidden");
}

function confirmReglerClient() {
  const clientKey = document.getElementById("regler-client-key").value;
  const paidAmount = parseFloat(document.getElementById("regler-paid-amount").value) || 0;
  const paymentMethod = document.getElementById("regler-payment-method").value;
  const today = new Date().toISOString().split("T")[0];

  if (paidAmount <= 0) {
    alert("المرجو إدخال مبلغ صحيح.");
    return;
  }

  let remainingToSettle = paidAmount;
  const clientOrders = state.orders.filter(o => 
    (o.clientPhone === clientKey || o.clientName === clientKey) && 
    o.status !== "retour" &&
    (Number(o.totalAmount || 0) - Number(o.avanceAmount || 0)) > 0
  );

  let clientName = clientKey;

  clientOrders.forEach(order => {
    clientName = order.clientName;
    const ozoneFee = (order.deliveryType === "ozone") ? Number(order.ozoneFees || 0) : 0;
    const workshopTotal = Math.max(0, Number(order.totalAmount || 0) - ozoneFee);
    const debtOnThisOrder = Math.max(0, workshopTotal - Number(order.avanceAmount || 0));
    if (debtOnThisOrder > 0 && remainingToSettle > 0) {
      const settleAmount = Math.min(debtOnThisOrder, remainingToSettle);
      order.avanceAmount = Number(order.avanceAmount || 0) + settleAmount;
      order.resteAmount = Math.max(0, Number(order.totalAmount || 0) - Number(order.avanceAmount));
      remainingToSettle -= settleAmount;

      if (order.resteAmount === 0 && order.status === "prete") {
        order.status = "livree";
      }
    }
  });

  state.caisse.push({
    id: `trx_${Date.now()}`,
    type: "entree",
    category: "solde_cmd",
    amount: paidAmount,
    description: `خلاص باقي الحساب للزبون (${clientName})`,
    paymentMethod: paymentMethod,
    date: today
  });

  saveData();
  closeReglerModal();
  renderAll();
  alert(`تم بنجاح تسجيل خلاص ${paidAmount} درهم وإضافتها إلى الصندوق وتصفية حساب الزبون.`);
}

function openEditClientModal(phone, name, city, gender = 'male') {
  document.getElementById("edit-client-old-phone").value = phone;
  document.getElementById("edit-client-name").value = name;
  document.getElementById("edit-client-phone").value = phone;
  document.getElementById("edit-client-city").value = city;
  
  if (gender === 'female') {
    const femRadio = document.getElementById("edit-gender-female");
    if (femRadio) femRadio.checked = true;
  } else {
    const maleRadio = document.getElementById("edit-gender-male");
    if (maleRadio) maleRadio.checked = true;
  }
  
  document.getElementById("modal-edit-client").classList.remove("hidden");
  lucide.createIcons();
}

function closeEditClientModal() {
  document.getElementById("modal-edit-client").classList.add("hidden");
}

function saveEditedClient() {
  const oldPhone = document.getElementById("edit-client-old-phone").value;
  const newName = document.getElementById("edit-client-name").value.trim();
  const newPhone = document.getElementById("edit-client-phone").value.trim();
  const newCity = document.getElementById("edit-client-city").value.trim();
  const newGender = document.querySelector('input[name="edit-client-gender"]:checked')?.value || 'male';

  state.orders.forEach(o => {
    if (o.clientPhone === oldPhone) {
      o.clientName = newName;
      o.clientPhone = newPhone;
      o.clientCity = newCity;
      o.clientGender = newGender;
    }
  });

  saveData();
  closeEditClientModal();
  renderAll();
}

function deleteClientOrders(clientKey) {
  if (confirm(`هل أنت متأكد من حذف حساب الزبون وجميع طلبياته نهائياً؟`)) {
    state.orders = state.orders.filter(o => o.clientPhone !== clientKey && o.clientName !== clientKey);
    saveData();
    renderAll();
  }
}

// ==============================================
// لوحة ألوان RGB ومحرك استهلاك الألوان والتوب 5
// ==============================================

function hexToRgba(hex, alpha = 1) {
  if (!hex || typeof hex !== "string") return `rgba(201, 162, 39, ${alpha})`;
  let c = hex.replace("#", "");
  if (c.length === 3) {
    c = c.split("").map(ch => ch + ch).join("");
  }
  const num = parseInt(c, 16);
  if (isNaN(num)) return `rgba(201, 162, 39, ${alpha})`;
  const r = (num >> 16) & 255;
  const g = (num >> 8) & 255;
  const b = num & 255;
  return `rgba(${r}, ${g}, ${b}, ${alpha})`;
}
window.hexToRgba = hexToRgba;

function getItemDefaultColor(item) {
  if (item && item.titleColor && item.titleColor.startsWith("#")) return item.titleColor;
  const name = ((item && item.name) || "").toUpperCase();
  if (name.includes("BLEU") || name.includes("BLUE") || name.includes("أزرق")) return "#1E40AF";
  if (name.includes("JAUNE") || name.includes("أصفر")) return "#EAB308";
  if (name.includes("ROUGE") || name.includes("أحمر")) return "#DC2626";
  if (name.includes("VERT") || name.includes("أخضر")) return "#16A34A";
  if (name.includes("NOIR") || name.includes("أسود")) return "#111111";
  if (name.includes("ROSE") || name.includes("وردي")) return "#EC4899";
  if (name.includes("KRAFT") || name.includes("كرافت") || name.includes("بني")) return "#92400E";
  if (name.includes("BLANC") || name.includes("أبيض")) return "#475569";
  if (name.includes("VIOLET") || name.includes("بنفسجي")) return "#7C3AED";
  if (name.includes("ORANGE") || name.includes("برتقالي")) return "#EA580C";
  if (name.includes("DÉCAPANT") || name.includes("DECAPANT") || name.includes("ديكابو")) return "#059669";
  if (name.includes("DILUANT") || name.includes("ديليون")) return "#0284C7";
  return "#C9A227";
}
window.getItemDefaultColor = getItemDefaultColor;

function onStockTitleColorChange(color) {
  const hexInput = document.getElementById("stock-title-color-text");
  const displayBadge = document.getElementById("stock-color-code-display");
  const dot = document.getElementById("stock-preview-dot");
  const previewText = document.getElementById("stock-preview-text");

  if (hexInput) hexInput.value = color.toUpperCase();
  if (displayBadge) displayBadge.textContent = color.toUpperCase();
  if (dot) dot.style.backgroundColor = color;
  if (previewText) previewText.style.color = color;
}
window.onStockTitleColorChange = onStockTitleColorChange;

function onStockTitleColorTextChange(val) {
  let hex = (val || "").trim();
  if (!hex.startsWith("#")) hex = "#" + hex;
  const colorPicker = document.getElementById("stock-title-color");
  const displayBadge = document.getElementById("stock-color-code-display");
  const dot = document.getElementById("stock-preview-dot");
  const previewText = document.getElementById("stock-preview-text");

  if (/^#[0-9A-Fa-f]{6}$/.test(hex)) {
    if (colorPicker) colorPicker.value = hex;
    if (displayBadge) displayBadge.textContent = hex.toUpperCase();
    if (dot) dot.style.backgroundColor = hex;
    if (previewText) previewText.style.color = hex;
  }
}
window.onStockTitleColorTextChange = onStockTitleColorTextChange;

function setStockQuickColor(color, label = "") {
  const colorPicker = document.getElementById("stock-title-color");
  const hexInput = document.getElementById("stock-title-color-text");
  const displayBadge = document.getElementById("stock-color-code-display");
  const dot = document.getElementById("stock-preview-dot");
  const previewText = document.getElementById("stock-preview-text");

  if (colorPicker) colorPicker.value = color;
  if (hexInput) hexInput.value = color.toUpperCase();
  if (displayBadge) displayBadge.textContent = color.toUpperCase();
  if (dot) dot.style.backgroundColor = color;
  if (previewText) previewText.style.color = color;
}
window.setStockQuickColor = setStockQuickColor;

function updateStockTitleLivePreview() {
  const nameInput = document.getElementById("stock-name");
  const previewText = document.getElementById("stock-preview-text");
  if (!previewText) return;
  const name = nameInput?.value?.trim() || "معاينة لون العنوان";
  previewText.textContent = name;
}
window.updateStockTitleLivePreview = updateStockTitleLivePreview;

// تعديل لون المادة
function openEditStockColorModal(stockId) {
  const item = (state.stock || []).find(s => s.id === stockId);
  if (!item) return;

  const currentColor = item.titleColor || getItemDefaultColor(item);
  const idInput = document.getElementById("edit-stock-id");
  const nameLabel = document.getElementById("edit-stock-item-name");
  const colorPicker = document.getElementById("edit-stock-title-color");
  const hexInput = document.getElementById("edit-stock-title-color-text");
  const displayBadge = document.getElementById("edit-stock-color-code-display");
  const previewText = document.getElementById("edit-stock-preview-text");
  const previewDot = document.getElementById("edit-stock-preview-dot");

  if (idInput) idInput.value = item.id;
  if (nameLabel) nameLabel.textContent = item.name;
  if (colorPicker) colorPicker.value = currentColor;
  if (hexInput) hexInput.value = currentColor.toUpperCase();
  if (displayBadge) displayBadge.textContent = currentColor.toUpperCase();
  if (previewText) {
    previewText.textContent = item.name;
    previewText.style.color = currentColor;
  }
  if (previewDot) previewDot.style.backgroundColor = currentColor;

  const supplierInput = document.getElementById("edit-stock-supplier");
  if (supplierInput) {
    supplierInput.value = item.supplier || (item.name && item.name.toUpperCase().includes("AMK") ? "AMK" : "");
  }

  document.getElementById("modal-edit-stock-color")?.classList.remove("hidden");
  lucide.createIcons();
}
window.openEditStockColorModal = openEditStockColorModal;

function closeEditStockColorModal() {
  document.getElementById("modal-edit-stock-color")?.classList.add("hidden");
}
window.closeEditStockColorModal = closeEditStockColorModal;

function onEditStockColorChange(color) {
  const hexInput = document.getElementById("edit-stock-title-color-text");
  const displayBadge = document.getElementById("edit-stock-color-code-display");
  const dot = document.getElementById("edit-stock-preview-dot");
  const previewText = document.getElementById("edit-stock-preview-text");

  if (hexInput) hexInput.value = color.toUpperCase();
  if (displayBadge) displayBadge.textContent = color.toUpperCase();
  if (dot) dot.style.backgroundColor = color;
  if (previewText) previewText.style.color = color;
}
window.onEditStockColorChange = onEditStockColorChange;

function onEditStockColorTextChange(val) {
  let hex = (val || "").trim();
  if (!hex.startsWith("#")) hex = "#" + hex;
  const colorPicker = document.getElementById("edit-stock-title-color");
  const displayBadge = document.getElementById("edit-stock-color-code-display");
  const dot = document.getElementById("edit-stock-preview-dot");
  const previewText = document.getElementById("edit-stock-preview-text");

  if (/^#[0-9A-Fa-f]{6}$/.test(hex)) {
    if (colorPicker) colorPicker.value = hex;
    if (displayBadge) displayBadge.textContent = hex.toUpperCase();
    if (dot) dot.style.backgroundColor = hex;
    if (previewText) previewText.style.color = hex;
  }
}
window.onEditStockColorTextChange = onEditStockColorTextChange;

function setEditStockQuickColor(color) {
  onEditStockColorChange(color);
  const colorPicker = document.getElementById("edit-stock-title-color");
  if (colorPicker) colorPicker.value = color;
}
window.setEditStockQuickColor = setEditStockQuickColor;

function handleEditStockColorSubmit(e) {
  e.preventDefault();
  const stockId = document.getElementById("edit-stock-id")?.value;
  const newColor = document.getElementById("edit-stock-title-color")?.value || "#111111";
  const newSupplier = document.getElementById("edit-stock-supplier")?.value?.trim() || "";

  const item = (state.stock || []).find(s => s.id === stockId);
  if (item) {
    item.titleColor = newColor;
    item.supplier = newSupplier;
    saveData();
    renderStockGrid();
    if (!document.getElementById("modal-stock-color-consumption")?.classList.contains("hidden")) {
      renderStockColorConsumptionModal();
    }
    closeEditStockColorModal();
    playChimeSound("success");
  }
}
window.handleEditStockColorSubmit = handleEditStockColorSubmit;

// ==============================================
// محرك حساب نسب استهلاك الألوان والتوب 5
// ==============================================

let currentModalColorFilter = "ALL";

function calculateStockColorConsumption() {
  const stock = state.stock || [];
  const tokens = state.stockQrTokens || [];

  const items = stock.map(item => {
    const color = item.titleColor || getItemDefaultColor(item);

    // المستهلك عبر مسح كود QR بالهاتف
    const qrConsumed = tokens
      .filter(t => t.stockId === item.id && t.status === "consumed")
      .reduce((sum, t) => sum + (Number(t.deductQty) || 1), 0);

    // المستهلك يدوياً وبدون سكان
    const manualConsumed = Number(item.consumedManual) || 0;

    // الإجمالي المستهلك (سواءً تم عمل scan له أم لا)
    const totalConsumed = qrConsumed + manualConsumed;

    // المتبقي حالياً بالمخزون
    const currentQty = Number(item.quantity) || 0;

    // إجمالي الرصيد (متبقي + مستهلك)
    const totalStock = currentQty + totalConsumed;

    // نسبة استهلاك هذه المادة من رصيدها
    const consumptionRate = totalStock > 0 ? (totalConsumed / totalStock) * 100 : 0;

    return {
      id: item.id,
      name: item.name,
      category: item.category || "sacs",
      unit: item.unit || "حبة",
      color,
      supplier: item.supplier || (item.name && item.name.toUpperCase().includes("AMK") ? "AMK" : ""),
      currentQty,
      totalStock,
      qrConsumed,
      manualConsumed,
      totalConsumed,
      consumptionRate,
      costPrice: Number(item.costPrice || 0),
      minAlert: Number(item.minAlert || 0)
    };
  });

  // الإجماليات العامة
  const grandTotalConsumed = items.reduce((sum, r) => sum + r.totalConsumed, 0);
  const grandTotalQr = items.reduce((sum, r) => sum + r.qrConsumed, 0);
  const grandTotalManual = items.reduce((sum, r) => sum + r.manualConsumed, 0);

  // حصة كل لون من إجمالي استهلاك الورشة
  items.forEach(r => {
    r.shareOfTotal = grandTotalConsumed > 0 ? (r.totalConsumed / grandTotalConsumed) * 100 : 0;
  });

  // ترتيب تنازلي: أولاً حسب الكمية المستهلكة، ثانياً حسب نسبة الاستهلاك
  const sorted = [...items].sort((a, b) => {
    if (b.totalConsumed !== a.totalConsumed) {
      return b.totalConsumed - a.totalConsumed;
    }
    return b.consumptionRate - a.consumptionRate;
  });

  const top5 = sorted.slice(0, 5);

  return {
    items,
    sorted,
    top5,
    grandTotalConsumed,
    grandTotalQr,
    grandTotalManual
  };
}
window.calculateStockColorConsumption = calculateStockColorConsumption;

function openStockColorConsumptionModal() {
  renderStockColorConsumptionModal();
  document.getElementById("modal-stock-color-consumption")?.classList.remove("hidden");
  lucide.createIcons();
}
window.openStockColorConsumptionModal = openStockColorConsumptionModal;

function closeStockColorConsumptionModal() {
  document.getElementById("modal-stock-color-consumption")?.classList.add("hidden");
}
window.closeStockColorConsumptionModal = closeStockColorConsumptionModal;

function filterModalColorConsumption(cat) {
  currentModalColorFilter = cat;
  const btnAll = document.getElementById("modal-filter-all");
  const btnCons = document.getElementById("modal-filter-cons");
  const btnSacs = document.getElementById("modal-filter-sacs");

  if (btnAll) btnAll.className = cat === "ALL" ? "px-3 py-1 rounded-lg font-bold bg-[#C9A227] text-white shadow-2xs transition" : "px-3 py-1 rounded-lg font-bold text-[#6B6B6B] hover:text-[#111111] transition";
  if (btnCons) btnCons.className = cat === "consommables" ? "px-3 py-1 rounded-lg font-bold bg-[#C9A227] text-white shadow-2xs transition" : "px-3 py-1 rounded-lg font-bold text-[#6B6B6B] hover:text-[#111111] transition";
  if (btnSacs) btnSacs.className = cat === "sacs" ? "px-3 py-1 rounded-lg font-bold bg-[#C9A227] text-white shadow-2xs transition" : "px-3 py-1 rounded-lg font-bold text-[#6B6B6B] hover:text-[#111111] transition";

  renderStockColorConsumptionModal();
}
window.filterModalColorConsumption = filterModalColorConsumption;

function renderStockColorConsumptionModal() {
  const data = calculateStockColorConsumption();

  // 1. تحديث بطاقات KPIs
  const kpiTotal = document.getElementById("color-kpi-total-consumed");
  const kpiQr = document.getElementById("color-kpi-qr-consumed");
  const kpiQrPercent = document.getElementById("color-kpi-qr-percent");
  const kpiManual = document.getElementById("color-kpi-manual-consumed");
  const kpiManualPercent = document.getElementById("color-kpi-manual-percent");
  const kpiTopName = document.getElementById("color-kpi-top-name");
  const kpiTopDetail = document.getElementById("color-kpi-top-detail");

  if (kpiTotal) kpiTotal.textContent = `${data.grandTotalConsumed.toFixed(1)} وحدة`;
  if (kpiQr) kpiQr.textContent = `${data.grandTotalQr.toFixed(1)} وحدة`;
  if (kpiQrPercent) {
    const p = data.grandTotalConsumed > 0 ? ((data.grandTotalQr / data.grandTotalConsumed) * 100).toFixed(0) : 0;
    kpiQrPercent.textContent = `${p}% من مجموع المستهلك`;
  }
  if (kpiManual) kpiManual.textContent = `${data.grandTotalManual.toFixed(1)} وحدة`;
  if (kpiManualPercent) {
    const p = data.grandTotalConsumed > 0 ? ((data.grandTotalManual / data.grandTotalConsumed) * 100).toFixed(0) : 0;
    kpiManualPercent.textContent = `${p}% استهلاك يدوي مباشر`;
  }

  const top1 = data.top5[0];
  if (kpiTopName) {
    if (top1 && top1.totalConsumed > 0) {
      kpiTopName.innerHTML = `<span style="color: ${top1.color}; font-weight: 900;">${escapeHtml(top1.name)}</span>`;
      if (kpiTopDetail) kpiTopDetail.textContent = `${top1.totalConsumed.toFixed(1)} ${top1.unit} (${top1.shareOfTotal.toFixed(0)}% من مجموع الورشة)`;
    } else {
      kpiTopName.textContent = "لا يوجد استهلاك بعد";
      if (kpiTopDetail) kpiTopDetail.textContent = "ابدأ بمسح الأكواد أو الخصم اليدوي";
    }
  }

  // 2. تحديث قائمة التوب 5 (Top 1 to 5)
  const top5Container = document.getElementById("top5-colors-list");
  if (top5Container) {
    if (data.top5.length === 0) {
      top5Container.innerHTML = `<div class="py-6 text-center text-xs text-[#6B6B6B]">لا توجد مواد مسجلة في المخزون بعد.</div>`;
    } else {
      const rankBadges = [
        { medal: "🥇", label: "المركز الأول", bg: "bg-amber-50 border-amber-300 text-amber-900", border: "border-amber-300" },
        { medal: "🥈", label: "المركز الثاني", bg: "bg-slate-50 border-slate-300 text-slate-800", border: "border-slate-300" },
        { medal: "🥉", label: "المركز الثالث", bg: "bg-amber-100/60 border-amber-400 text-amber-950", border: "border-amber-400" },
        { medal: "4️⃣", label: "المركز الرابع", bg: "bg-gray-50 border-gray-200 text-gray-700", border: "border-gray-200" },
        { medal: "5️⃣", label: "المركز الخامس", bg: "bg-gray-50 border-gray-200 text-gray-700", border: "border-gray-200" }
      ];

      top5Container.innerHTML = data.top5.map((item, idx) => {
        const badge = rankBadges[idx] || rankBadges[4];
        const isFirst = idx === 0;
        const sharePercent = item.shareOfTotal || 0;
        const ratePercent = item.consumptionRate || 0;

        return `
          <div class="p-3 sm:p-4 rounded-xl border ${badge.border} ${isFirst ? 'bg-gradient-to-r from-amber-50/50 via-white to-amber-50/30 shadow-xs' : 'bg-white shadow-2xs'} space-y-2.5">
            <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
              <div class="flex items-center gap-3">
                <div class="text-xl sm:text-2xl shrink-0">${badge.medal}</div>
                <div>
                  <div class="flex items-center gap-2 flex-wrap">
                    <span class="w-3.5 h-3.5 rounded-full shrink-0 shadow-2xs border border-black/15" style="background-color: ${item.color};"></span>
                    <h5 class="text-sm font-black" style="color: ${item.color};">${escapeHtml(item.name)}</h5>
                    <span class="text-[10px] font-mono font-bold px-1.5 py-0.2 rounded border text-[#6B6B6B] bg-gray-50 border-gray-200">${item.color}</span>
                    ${item.supplier ? `
                      <span class="inline-flex items-center gap-1 px-1.5 py-0.2 rounded-md text-[10px] font-bold border" style="background-color: ${hexToRgba(item.color, 0.08)}; color: ${item.color}; border-color: ${hexToRgba(item.color, 0.25)};" title="الشركة / المورد">
                        <i data-lucide="building-2" class="w-2.5 h-2.5"></i>
                        <span>${escapeHtml(item.supplier)}</span>
                      </span>
                    ` : ''}
                    <span class="text-[10px] px-2 py-0.2 rounded-full font-bold ${item.category === 'consommables' ? 'bg-amber-50 text-amber-800 border border-amber-200' : 'bg-blue-50 text-blue-800 border border-blue-200'}">
                      ${item.category === 'consommables' ? '🎨 صباغة' : '🛍️ أكياس'}
                    </span>
                  </div>
                  <div class="text-[11px] text-[#6B6B6B] mt-0.5 flex items-center gap-2 flex-wrap">
                    <span>المتبقي بالورشة: <b class="text-[#111111] font-mono">${item.currentQty} ${item.unit}</b></span>
                    <span>•</span>
                    <span class="text-emerald-700 font-bold">📷 سكان: ${item.qrConsumed}</span>
                    <span>•</span>
                    <span class="text-amber-700 font-bold">✍️ يدوي: ${item.manualConsumed}</span>
                  </div>
                </div>
              </div>

              <div class="flex sm:flex-col items-center sm:items-end justify-between sm:justify-center border-t sm:border-t-0 pt-2 sm:pt-0 border-gray-100">
                <div class="text-xs font-black text-[#111111]">
                  إجمالي المستهلك: <span class="text-purple-700 font-mono text-sm">${item.totalConsumed.toFixed(1)}</span> ${item.unit}
                </div>
                <div class="flex items-center gap-1.5 mt-0.5">
                  <span class="text-[10px] font-black px-2 py-0.5 rounded-md text-purple-900 bg-purple-50 border border-purple-200">
                    ${sharePercent.toFixed(1)}% من مجموع الورشة
                  </span>
                  <span class="text-[10px] font-bold px-1.5 py-0.5 rounded-md text-gray-700 bg-gray-100 border border-gray-200">
                    ${ratePercent.toFixed(0)}% من رصيده
                  </span>
                </div>
              </div>
            </div>

            <!-- شريط التقدم للون -->
            <div class="space-y-1">
              <div class="w-full bg-gray-100 rounded-full h-2.5 overflow-hidden border border-gray-200">
                <div class="h-full rounded-full transition-all duration-500" style="width: ${Math.min(100, Math.max(3, sharePercent))}%; background-color: ${item.color};"></div>
              </div>
            </div>
          </div>
        `;
      }).join("");
    }
  }

  // 3. تحديث قائمة خيارات الاستهلاك اليدوي
  const selectManual = document.getElementById("manual-consume-stock-id");
  if (selectManual) {
    selectManual.innerHTML = (state.stock || []).map(item => {
      return `<option value="${item.id}">${item.category === 'consommables' ? '🎨' : '🛍️'} ${item.name} (المتبقي: ${item.quantity} ${item.unit || 'حبة'})</option>`;
    }).join("");
  }

  // 4. تحديث شبكة بطاقات الألوان التفصيلية (حسب الفلتر الحالي)
  const gridContainer = document.getElementById("color-consumption-cards-grid");
  if (gridContainer) {
    let filteredItems = data.items;
    if (currentModalColorFilter !== "ALL") {
      filteredItems = filteredItems.filter(item => item.category === currentModalColorFilter);
    }

    if (filteredItems.length === 0) {
      gridContainer.innerHTML = `<div class="col-span-full py-8 text-center text-xs text-[#6B6B6B]">لا توجد مواد في هذا القسم.</div>`;
    } else {
      gridContainer.innerHTML = filteredItems.map(item => {
        const ratePercent = item.consumptionRate || 0;
        const sharePercent = item.shareOfTotal || 0;
        const isLow = item.currentQty <= item.minAlert;

        return `
          <div class="bg-white p-3.5 sm:p-4 rounded-xl border border-[#EAEAE5] shadow-2xs space-y-3 hover:border-[#D4D4CE] transition">
            <div class="flex items-start justify-between gap-2">
              <div class="flex items-center gap-2.5">
                <span class="w-4 h-4 rounded-full shrink-0 shadow-2xs border border-black/15" style="background-color: ${item.color};"></span>
                <div>
                  <h5 class="text-sm font-black" style="color: ${item.color};">${escapeHtml(item.name)}</h5>
                  <div class="flex items-center gap-1.5 mt-0.5 flex-wrap">
                    <span class="text-[10px] font-mono font-bold text-[#6B6B6B]">${item.color}</span>
                    ${item.supplier ? `
                      <span class="inline-flex items-center gap-1 px-1.5 py-0.2 rounded-md text-[10px] font-bold border" style="background-color: ${hexToRgba(item.color, 0.08)}; color: ${item.color}; border-color: ${hexToRgba(item.color, 0.25)};" title="الشركة / المورد">
                        <i data-lucide="building-2" class="w-2.5 h-2.5"></i>
                        <span>${escapeHtml(item.supplier)}</span>
                      </span>
                    ` : ''}
                    <span class="text-[10px] px-1.5 py-0.2 rounded font-bold ${item.category === 'consommables' ? 'bg-amber-50 text-amber-800' : 'bg-blue-50 text-blue-800'}">
                      ${item.category === 'consommables' ? '🎨 صباغة' : '🛍️ أكياس'}
                    </span>
                  </div>
                </div>
              </div>
              <div class="flex items-center gap-1">
                <button type="button" onclick="openEditStockColorModal('${item.id}')" class="p-1 text-[#6B6B6B] hover:text-[#C9A227] transition cursor-pointer" title="تعديل اللون">
                  <i data-lucide="palette" class="w-3.5 h-3.5"></i>
                </button>
                <button type="button" onclick="quickDeductStockConsumption('${item.id}', 1)" class="px-2 py-0.5 bg-amber-50 hover:bg-amber-100 text-amber-900 border border-amber-200 rounded text-[10px] font-bold transition cursor-pointer" title="خصم 1 وحدة استهلاك يدوي سريع">
                  -1 ${item.unit}
                </button>
              </div>
            </div>

            <div class="grid grid-cols-2 gap-2 text-xs bg-[#F9F9F7] p-2.5 rounded-lg border border-[#EAEAE5]">
              <div>
                <span class="text-[10px] text-[#6B6B6B] block">المتبقي حالياً:</span>
                <span class="font-black ${isLow ? 'text-rose-600' : 'text-emerald-700'} font-mono">${item.currentQty} ${item.unit}</span>
              </div>
              <div>
                <span class="text-[10px] text-[#6B6B6B] block">إجمالي المستهلك:</span>
                <span class="font-black text-purple-700 font-mono">${item.totalConsumed.toFixed(1)} ${item.unit}</span>
              </div>
            </div>

            <!-- تفاصيل السكان واليدوي -->
            <div class="flex items-center justify-between text-[11px] text-[#6B6B6B]">
              <span class="flex items-center gap-1 text-emerald-700 font-bold">
                <i data-lucide="scan-barcode" class="w-3 h-3"></i>
                <span>مسح كود: ${item.qrConsumed}</span>
              </span>
              <span class="flex items-center gap-1 text-amber-700 font-bold">
                <i data-lucide="edit-3" class="w-3 h-3"></i>
                <span>يدوي/بدون سكان: ${item.manualConsumed}</span>
              </span>
            </div>

            <!-- شريط نسبة الاستهلاك للمادة -->
            <div class="space-y-1 pt-1 border-t border-gray-100">
              <div class="flex items-center justify-between text-[11px]">
                <span class="font-bold text-[#111111]">نسبة استهلاك هذا اللون:</span>
                <span class="font-black font-mono" style="color: ${item.color};">${ratePercent.toFixed(1)}%</span>
              </div>
              <div class="w-full bg-gray-100 rounded-full h-2 overflow-hidden border border-gray-200">
                <div class="h-full rounded-full transition-all duration-300" style="width: ${Math.min(100, ratePercent)}%; background-color: ${item.color};"></div>
              </div>
              <div class="flex items-center justify-between text-[10px] text-[#6B6B6B]">
                <span>رصيده الكلي: ${(item.totalStock).toFixed(1)} ${item.unit}</span>
                <span>حصته بالورشة: <b>${sharePercent.toFixed(1)}%</b></span>
              </div>
            </div>
          </div>
        `;
      }).join("");
    }
  }

  lucide.createIcons();
}
window.renderStockColorConsumptionModal = renderStockColorConsumptionModal;

function handleManualStockConsumptionSubmit(e) {
  e.preventDefault();
  const stockId = document.getElementById("manual-consume-stock-id")?.value;
  const qtyInput = document.getElementById("manual-consume-qty");
  const qty = parseFloat(qtyInput?.value) || 1;

  if (qty <= 0) {
    alert("المرجو إدخال كمية استهلاك صحيحة أكبر من 0.");
    return;
  }

  const item = (state.stock || []).find(s => s.id === stockId);
  if (!item) {
    alert("المادة غير موجودة بالمخزون.");
    return;
  }

  const currentQty = Number(item.quantity || 0);
  if (currentQty < qty) {
    if (!confirm(`الكمية المتوفرة حالياً بالمخزون هي (${currentQty} ${item.unit})، وهي أقل من الكمية المراد خصمها (${qty} ${item.unit}).\n\nهل تريد المتابعة وتصفير المخزون وتسجيل الاستهلاك؟`)) {
      return;
    }
  }

  const newQty = Math.max(0, currentQty - qty);
  item.quantity = newQty;
  item.consumedManual = (Number(item.consumedManual) || 0) + qty;

  saveData();
  renderStockGrid();
  renderStockColorConsumptionModal();
  updateDashboardMetrics();

  playChimeSound("success");
  if (qtyInput) qtyInput.value = "1";
  alert(`تم تسجيل استهلاك (${qty} ${item.unit || 'حبة'}) من (${item.name}) بدون سكان بنجاح!\n\nالمتبقي بالمخزون: ${newQty} ${item.unit || 'حبة'}.`);
}
window.handleManualStockConsumptionSubmit = handleManualStockConsumptionSubmit;

function quickDeductStockConsumption(stockId, qty = 1) {
  const item = (state.stock || []).find(s => s.id === stockId);
  if (!item) return;

  const currentQty = Number(item.quantity || 0);
  if (currentQty <= 0) {
    alert(`رصيد (${item.name}) بالمخزون منعدم بالفعل (0 ${item.unit || 'حبة'}).`);
    return;
  }

  if (confirm(`هل تريد خصم استهلاك سريع (${qty} ${item.unit || 'حبة'}) من مادة (${item.name}) بدون سكان؟`)) {
    item.quantity = Math.max(0, currentQty - qty);
    item.consumedManual = (Number(item.consumedManual) || 0) + qty;

    saveData();
    renderStockGrid();
    renderStockColorConsumptionModal();
    updateDashboardMetrics();
    playChimeSound("success");
  }
}
window.quickDeductStockConsumption = quickDeductStockConsumption;

// ==============================================
// STOCK WITH MANUAL DIRECT INPUT
// ==============================================
function renderStockGrid() {
  const container = document.getElementById("stock-items-grid");
  if (!container) return;

  const currentFilter = state.stockFilter || "ALL";
  let items = state.stock || [];
  if (currentFilter !== "ALL") {
    items = items.filter(item => (item.category || "sacs") === currentFilter);
  }

  // تحديث عدادات أزرار الفلترة
  const totalCount = (state.stock || []).length;
  const sacsCount = (state.stock || []).filter(s => (s.category || "sacs") === "sacs").length;
  const consommablesCount = (state.stock || []).filter(s => s.category === "consommables").length;

  const btnAll = document.getElementById("stock-filter-all");
  const btnSacs = document.getElementById("stock-filter-sacs");
  const btnCons = document.getElementById("stock-filter-consommables");
  if (btnAll) btnAll.innerHTML = `🔘 الكل <span class="text-[10px] opacity-80">(${totalCount})</span>`;
  if (btnSacs) btnSacs.innerHTML = `🛍️ أكياس وسلع خام <span class="text-[10px] opacity-80">(${sacsCount})</span>`;
  if (btnCons) btnCons.innerHTML = `🎨 مواد استهلاك وطباعة <span class="text-[10px] opacity-80">(${consommablesCount})</span>`;

  // تحديث بطاقة ملخص استهلاك الألوان والتوب 1 في رأس الصفحة
  try {
    const consumptionData = calculateStockColorConsumption();
    const summaryBadge = document.getElementById("stock-summary-top-badge");
    const summaryText = document.getElementById("stock-summary-text");
    if (summaryBadge && consumptionData.top5.length > 0) {
      const top1 = consumptionData.top5[0];
      if (top1 && top1.totalConsumed > 0) {
        summaryBadge.innerHTML = `🥇 الأكثر استهلاكاً: <span style="color:${top1.color}; font-weight:900;">${escapeHtml(top1.name)}</span> (${top1.totalConsumed.toFixed(1)} ${top1.unit} - ${top1.shareOfTotal.toFixed(0)}%)`;
        if (summaryText) {
          summaryText.innerHTML = `إجمالي المستهلك من كل الألوان: <b>${consumptionData.grandTotalConsumed.toFixed(1)} وحدة</b> (سكان QR: ${consumptionData.grandTotalQr.toFixed(1)} | يدوي: ${consumptionData.grandTotalManual.toFixed(1)})`;
        }
      } else {
        summaryBadge.textContent = "🥇 لم يُسجل استهلاك بعد";
        if (summaryText) {
          summaryText.textContent = "تتبع فوري لنسبة استهلاك كل لون من ألوان الأكياس والصباغة (سكان QR واستعمال يدوي)";
        }
      }
    }
  } catch(e) {}

  if (items.length === 0) {
    container.innerHTML = `<div class="col-span-full py-12 text-center text-[#6B6B6B]">لا توجد مواد مسجلة في هذا القسم بعد.</div>`;
    return;
  }

  container.innerHTML = items.map(item => {
    const isLow = Number(item.quantity) <= Number(item.minAlert);
    const isConsommable = item.category === "consommables";
    const unitLabel = item.unit || "حبة";
    const itemColor = item.titleColor || getItemDefaultColor(item);
    const itemSupplier = item.supplier || (item.name && item.name.toUpperCase().includes("AMK") ? "AMK" : "");

    return `
      <div class="bg-white border ${isLow ? 'border-rose-300' : 'border-[#EAEAE5]'} p-4 rounded-2xl space-y-3 shadow-xs hover:border-[#D4D4CE] transition">
        <div class="flex justify-between items-start gap-2">
          <div>
            <div class="flex items-center gap-1.5 flex-wrap mb-1">
              <span class="text-[10px] font-bold px-2 py-0.5 rounded-full ${isConsommable ? 'bg-amber-50 text-amber-800 border border-amber-200' : 'bg-blue-50 text-blue-800 border border-blue-200'}">
                ${isConsommable ? '🎨 مادة استهلاك وطباعة' : '🛍️ أكياس وسلع'}
              </span>
              <span class="inline-flex items-center gap-1 px-1.5 py-0.5 rounded-md text-[10px] font-mono font-bold border" style="background-color: ${hexToRgba(itemColor, 0.08)}; color: ${itemColor}; border-color: ${hexToRgba(itemColor, 0.25)};">
                <span class="w-2 h-2 rounded-full inline-block" style="background-color: ${itemColor};"></span>
                ${itemColor}
              </span>
              ${itemSupplier ? `
                <span class="inline-flex items-center gap-1 px-1.5 py-0.5 rounded-md text-[10px] font-bold border" style="background-color: ${hexToRgba(itemColor, 0.08)}; color: ${itemColor}; border-color: ${hexToRgba(itemColor, 0.25)};" title="الشركة / المورد">
                  <i data-lucide="building-2" class="w-2.5 h-2.5"></i>
                  <span>${escapeHtml(itemSupplier)}</span>
                </span>
              ` : ''}
            </div>
            <h3 class="text-sm font-black" style="color: ${itemColor};">${escapeHtml(item.name)}</h3>
            <span class="text-[10px] text-[#6B6B6B]">تنبيه عند: ${item.minAlert} ${unitLabel}</span>
          </div>
          ${isLow ? `
            <span class="text-[10px] bg-rose-50 text-rose-700 font-bold px-2 py-0.5 rounded border border-rose-200 flex-shrink-0">
              ⚠️ أوشك على النفاد
            </span>
          ` : `
            <span class="text-[10px] bg-emerald-50 text-emerald-700 font-bold px-2 py-0.5 rounded border border-emerald-200 flex-shrink-0">
              متوفر بالورشة
            </span>
          `}
        </div>

        <div class="bg-[#F8F8F6] p-3 rounded-xl border border-[#EAEAE5]">
          <label class="text-[10px] text-[#6B6B6B] block mb-1">الكمية الحقيقية المتوفرة بالورشة (${unitLabel}):</label>
          <div class="flex items-center gap-2">
            <input type="number" step="any" id="stock-input-${item.id}" value="${item.quantity}" min="0" class="w-full bg-white border border-[#D4D4CE] rounded-lg px-2.5 py-1.5 text-base font-black text-[#111111] focus:border-[#C9A227] outline-none">
            <span class="text-xs font-bold text-[#6B6B6B] whitespace-nowrap">${unitLabel}</span>
            <button onclick="saveStockDirect('${item.id}')" class="px-3 py-1.5 bg-[#C9A227] hover:bg-[#B8921F] text-white font-bold text-xs rounded-lg transition shadow-xs">
              حفظ
            </button>
          </div>
        </div>

        <div class="flex items-center justify-between text-xs text-[#6B6B6B] pt-1">
          <span class="text-[11px]">
            شراء: <b class="text-[#111111]">${Number(item.costPrice || 0).toFixed(2)}</b> د/${unitLabel}
            ${!isConsommable && item.sellPrice ? ` | بيع: <b class="text-[#16B981]">${Number(item.sellPrice).toFixed(2)}</b> د` : (isConsommable ? ` | <span class="text-amber-700 font-bold">تشغيل داخلي</span>` : '')}
          </span>
          <div class="flex items-center gap-1.5">
            <button onclick="openEditStockColorModal('${item.id}')" class="p-1.5 text-[#6B6B6B] hover:text-[#C9A227] hover:bg-gray-100 rounded-lg transition cursor-pointer" title="تعديل لون المادة (RGB)">
              <i data-lucide="palette" class="w-3.5 h-3.5 text-[#C9A227]"></i>
            </button>
            ${isConsommable ? `
            <button onclick="openGenerateStockQrModal('${item.id}')" class="px-2.5 py-1 bg-[#FAF6EA] hover:bg-[#F3ECCE] text-[#8A6D0B] border border-[#E8DCB5] rounded-lg text-[11px] font-bold transition flex items-center gap-1 shadow-2xs cursor-pointer" title="توليد وطباعة ملصقات QR للوحدات">
              <i data-lucide="qr-code" class="w-3.5 h-3.5 text-[#C9A227]"></i>
              <span>ملصقات QR</span>
            </button>
            ` : ''}
            <button onclick="deleteStockItem('${item.id}')" class="p-1 text-[#6B6B6B] hover:text-rose-600 transition cursor-pointer" title="حذف المادة">
              <i data-lucide="trash" class="w-3.5 h-3.5"></i>
            </button>
          </div>
        </div>
      </div>
    `;
  }).join("");

  lucide.createIcons();
}

function filterStockGrid(category) {
  state.stockFilter = category;
  const buttons = document.querySelectorAll(".stock-filter-btn");
  buttons.forEach(btn => {
    if (btn.dataset.filter === category) {
      btn.className = "stock-filter-btn px-3.5 py-1.5 rounded-xl text-xs font-black bg-[#C9A227] text-white shadow-2xs transition";
    } else {
      btn.className = "stock-filter-btn px-3.5 py-1.5 rounded-xl text-xs font-bold bg-[#F4F4F0] hover:bg-[#EAEAE5] text-[#6B6B6B] border border-[#D4D4CE] transition";
    }
  });
  renderStockGrid();
}
window.filterStockGrid = filterStockGrid;

function updateStockCostPreview() {
  const qty = parseFloat(document.getElementById("stock-quantity")?.value) || 0;
  const cost = parseFloat(document.getElementById("stock-cost-price")?.value) || 0;
  const isChecked = document.getElementById("stock-auto-caisse")?.checked !== false;
  const unit = document.getElementById("stock-unit")?.value || "حبة";
  const badge = document.getElementById("stock-cost-preview-badge");
  const text = document.getElementById("stock-cost-preview-text");

  const total = qty * cost;
  if (badge) {
    if (!isChecked || total <= 0) {
      badge.textContent = `${total.toFixed(2)} درهم (بدون خصم)`;
      badge.className = "text-xs font-bold text-[#6B6B6B] bg-gray-100 px-2.5 py-1 rounded-lg border border-gray-200 font-mono";
    } else {
      badge.textContent = `-${total.toFixed(2)} درهم`;
      badge.className = "text-xs font-black text-[#EF4444] bg-rose-50 px-2.5 py-1 rounded-lg border border-rose-200 font-mono";
    }
  }
  if (text) {
    if (total > 0 && isChecked) {
      text.innerHTML = `💡 سيتم خصم <b>${total.toFixed(2)} درهم</b> (${qty} ${unit} × ${cost.toFixed(2)} د) فوراً من سيولة الصندوق كمعاملة شراء.`;
    } else {
      text.textContent = "لن يتم خصم أي مبلغ من الصندوق (تسجيل بالمخزون فقط).";
    }
  }
}
window.updateStockCostPreview = updateStockCostPreview;

function saveStockDirect(itemId) {
  const input = document.getElementById(`stock-input-${itemId}`);
  if (!input) return;

  const newQty = parseFloat(input.value);
  if (isNaN(newQty) || newQty < 0) {
    alert("المرجو إدخال كمية صحيحة.");
    return;
  }

  const item = state.stock.find(s => s.id === itemId);
  if (item) {
    const oldQty = Number(item.quantity || 0);
    const diff = newQty - oldQty;
    const costPrice = Number(item.costPrice || 0);

    item.quantity = newQty;

    // إذا كانت هناك زيادة في الكمية، نسأل المستخدم إن كان يريد خصم ثمن الشراء من الصندوق
    if (diff > 0) {
      item.initialQuantity = (Number(item.initialQuantity) || oldQty) + diff;
      if (costPrice > 0) {
        const addedCost = diff * costPrice;
        if (confirm(`تمت إضافة ${diff} ${item.unit || 'حبة'} إلى مخزون (${item.name}).\n\nهل تريد خصم تكلفة شراء هذه الكمية الإضافية (${addedCost.toFixed(2)} درهم) تلقائياً من سيولة الصندوق ورأس المال؟`)) {
          const trxCat = item.category === "consommables" ? "consommables" : "matieres";
          const catLabel = item.category === "consommables" ? "شراء مواد استهلاك" : "شراء سلعة أكياس";
          state.caisse.push({
            id: `trx_stock_${Date.now()}`,
            type: "sortie",
            category: trxCat,
            amount: addedCost,
            description: `${catLabel}: ${item.name} (+${diff} ${item.unit || 'حبة'} × ${costPrice.toFixed(2)} د)`,
            paymentMethod: "especes",
            date: new Date().toISOString().split("T")[0]
          });
        }
      }
    } else if (diff < 0) {
      // إنقاص يدوي للكمية -> تسجيل استهلاك يدوي مباشر بدون سكان
      const consumedDiff = Math.abs(diff);
      item.consumedManual = (Number(item.consumedManual) || 0) + consumedDiff;
    }

    saveData();
    renderStockGrid();
    updateDashboardMetrics();
    if (!document.getElementById("modal-stock-color-consumption")?.classList.contains("hidden")) {
      renderStockColorConsumptionModal();
    }
    alert(`تم تحديث مخزون (${item.name}) إلى ${newQty} ${item.unit || 'حبة'} بنجاح!`);
  }
}

function openNewStockModal() {
  document.getElementById("stock-form").reset();
  const catSelect = document.getElementById("stock-category");
  if (catSelect) catSelect.value = "sacs";
  const autoCaisseCheck = document.getElementById("stock-auto-caisse");
  if (autoCaisseCheck) autoCaisseCheck.checked = true;
  setStockQuickColor("#111111", "Noir");
  const supplierInput = document.getElementById("stock-supplier");
  if (supplierInput) supplierInput.value = "";
  updateStockTitleLivePreview();
  onStockCategoryChange();
  updateStockCostPreview();
  document.getElementById("modal-stock").classList.remove("hidden");
  lucide.createIcons();
}

function closeStockModal() {
  document.getElementById("modal-stock").classList.add("hidden");
}

function onStockCategoryChange() {
  const cat = document.getElementById("stock-category")?.value || "sacs";
  const quickConsBox = document.getElementById("stock-quick-consommables");
  const quickSacsBox = document.getElementById("stock-quick-sacs");
  const sellBox = document.getElementById("stock-sell-price-container");
  const unitSelect = document.getElementById("stock-unit");
  const costLabel = document.getElementById("stock-cost-label");
  const qrGenBox = document.getElementById("stock-qr-gen-box");
  const autoQrInput = document.getElementById("stock-auto-gen-qr");

  if (cat === "consommables") {
    if (quickConsBox) quickConsBox.classList.remove("hidden");
    if (quickSacsBox) quickSacsBox.classList.add("hidden");
    if (sellBox) sellBox.classList.add("hidden");
    if (costLabel) costLabel.textContent = "ثمن الشراء للوحدة (درهم)";
    if (unitSelect && unitSelect.value === "حبة") unitSelect.value = "بيدو";
    if (qrGenBox) qrGenBox.classList.remove("hidden");
    if (autoQrInput) autoQrInput.checked = true;
  } else {
    if (quickConsBox) quickConsBox.classList.add("hidden");
    if (quickSacsBox) quickSacsBox.classList.remove("hidden");
    if (sellBox) sellBox.classList.remove("hidden");
    if (costLabel) costLabel.textContent = "ثمن الشراء للحبة (درهم)";
    if (unitSelect && unitSelect.value !== "حبة") unitSelect.value = "حبة";
    if (qrGenBox) qrGenBox.classList.add("hidden");
    if (autoQrInput) autoQrInput.checked = false;
  }
  updateStockCostPreview();
  lucide.createIcons();
}
window.onStockCategoryChange = onStockCategoryChange;

function quickFillStockItem(name, unit, costPrice, sellPrice = 0) {
  const nameInput = document.getElementById("stock-name");
  const catSelect = document.getElementById("stock-category");
  const unitSelect = document.getElementById("stock-unit");
  const costInput = document.getElementById("stock-cost-price");
  const sellInput = document.getElementById("stock-sell-price");
  const minInput = document.getElementById("stock-min-alert");

  if (catSelect) {
    catSelect.value = "consommables";
    onStockCategoryChange();
  }
  if (nameInput) nameInput.value = name;
  if (unitSelect) unitSelect.value = unit;
  if (costInput) costInput.value = costPrice;
  if (sellInput) sellInput.value = sellPrice;
  if (minInput) minInput.value = (unit === "حبة" ? 50 : 2);
  const supplierInput = document.getElementById("stock-supplier");
  if (supplierInput && name && name.toUpperCase().includes("AMK")) {
    supplierInput.value = "AMK";
  }
  updateStockCostPreview();
  const qtyInput = document.getElementById("stock-quantity");
  if (qtyInput) qtyInput.focus();
}
window.quickFillStockItem = quickFillStockItem;

function quickFillBagStockItem(name, costPrice, sellPrice = 0) {
  const nameInput = document.getElementById("stock-name");
  const catSelect = document.getElementById("stock-category");
  const unitSelect = document.getElementById("stock-unit");
  const costInput = document.getElementById("stock-cost-price");
  const sellInput = document.getElementById("stock-sell-price");
  const minInput = document.getElementById("stock-min-alert");

  if (catSelect) {
    catSelect.value = "sacs";
    onStockCategoryChange();
  }
  if (nameInput) nameInput.value = name;
  if (unitSelect) unitSelect.value = "حبة";
  if (costInput) costInput.value = costPrice;
  if (sellInput) sellInput.value = sellPrice;
  if (minInput) minInput.value = 100;
  updateStockCostPreview();
  const qtyInput = document.getElementById("stock-quantity");
  if (qtyInput) qtyInput.focus();
}
window.quickFillBagStockItem = quickFillBagStockItem;

function openNewStockModalFromOrder() {
  openNewStockModal();
  const cat = document.getElementById("order-sac-category")?.value || "Non Tissé";
  const sizeVal = document.getElementById("order-sac-size")?.value || "";
  const customSize = document.getElementById("order-sac-custom-size")?.value?.trim();
  const finalSize = (sizeVal === "custom" && customSize) ? customSize : sizeVal;
  
  let name = "";
  if (cat === "Kraft") {
    const handle = document.querySelector('input[name="order-kraft-handle"]:checked')?.value || "torsade";
    name = `كيس كرافت ${finalSize} (${handle === "plat" ? "يد مسطحة Plat" : "يد مبرومة Torsadé"})`;
  } else if (cat === "Non Tissé") {
    const handle = document.querySelector('input[name="order-non-tisse-handle"]:checked')?.value || "poignee";
    name = `كيس قماش غير منسوج ${finalSize} (${handle === "anses" ? "Ance" : "Poignée"})`;
  } else if (cat === "Carton") {
    const type = document.querySelector('input[name="order-carton-type"]:checked')?.value || "valise";
    name = `علبة كرتون ${finalSize} (${type === "americaine" ? "Caisse américaine" : "Boîte valise"})`;
  } else if (cat === "Plastique") {
    const color = document.querySelector('input[name="order-plastique-color"]:checked')?.value || "rose";
    name = `كيس بلاستيك ${finalSize} (${color.toUpperCase()})`;
  } else {
    name = `${cat} ${finalSize}`;
  }

  const stockNameInput = document.getElementById("stock-name");
  if (stockNameInput) stockNameInput.value = name;
  const buyPrice = parseFloat(document.getElementById("order-buy-price")?.value) || 0;
  const stockCostInput = document.getElementById("stock-cost-price");
  if (stockCostInput && buyPrice > 0) stockCostInput.value = buyPrice;
}
window.openNewStockModalFromOrder = openNewStockModalFromOrder;

function handleStockSubmit(e) {
  e.preventDefault();

  const name = document.getElementById("stock-name").value.trim();
  const category = document.getElementById("stock-category")?.value || "sacs";
  const unit = document.getElementById("stock-unit")?.value || "حبة";
  const quantity = parseFloat(document.getElementById("stock-quantity").value) || 0;
  const minAlert = parseFloat(document.getElementById("stock-min-alert").value) || 10;
  const costPrice = parseFloat(document.getElementById("stock-cost-price").value) || 0;
  const sellPrice = parseFloat(document.getElementById("stock-sell-price")?.value) || 0;
  const autoCaisse = document.getElementById("stock-auto-caisse")?.checked !== false;
  const autoGenQr = document.getElementById("stock-auto-gen-qr")?.checked;
  const titleColor = document.getElementById("stock-title-color")?.value || "#111111";
  const supplier = document.getElementById("stock-supplier")?.value?.trim() || "";

  const totalCost = quantity * costPrice;
  const stockId = `stk_${Date.now()}`;

  state.stock.push({
    id: stockId,
    name,
    category,
    unit,
    quantity,
    minAlert,
    costPrice,
    sellPrice,
    titleColor,
    supplier,
    initialQuantity: quantity,
    consumedManual: 0,
    consumedQr: 0
  });

  // خصم تكلفة الشراء تلقائياً من سيولة الصندوق ورأس المال
  if (autoCaisse && totalCost > 0) {
    const trxCat = category === "consommables" ? "consommables" : "matieres";
    const catLabel = category === "consommables" ? "شراء مواد استهلاك وطباعة" : "شراء سلعة أكياس";
    state.caisse.push({
      id: `trx_stock_${Date.now()}`,
      type: "sortie",
      category: trxCat,
      amount: totalCost,
      description: `${catLabel}: ${name} (${quantity} ${unit} × ${costPrice.toFixed(2)} د)`,
      paymentMethod: "especes",
      date: new Date().toISOString().split("T")[0]
    });
  }

  saveData();
  closeStockModal();
  renderAll();

  // توليد ملصقات QR خاص فقط بمواد الاستهلاك والطباعة (وليس الأكياس)
  if (category === "consommables" && autoGenQr && quantity > 0) {
    const tokenCount = Math.min(100, Math.max(1, Math.floor(quantity)));
    generateStockQrTokens(stockId, tokenCount, 1);
  }
}

function deleteStockItem(itemId) {
  if (confirm("هل تريد حذف هذه المادة من المخزون؟")) {
    state.stock = state.stock.filter(s => s.id !== itemId);
    saveData();
    renderAll();
  }
}

// ==============================================
// نظام تتبع ومسح مواد الطباعة عبر رموز QR أحادية الاستخدام (SINGLE-USE QR STOCK ENGINE)
// ==============================================

function playChimeSound(type = "success") {
  try {
    const AudioCtx = window.AudioContext || window.webkitAudioContext;
    if (!AudioCtx) return;
    const ctx = new AudioCtx();
    const now = ctx.currentTime;

    if (type === "success") {
      // نغمة نجاح مزدوجة صاعدة D5 -> A5
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = "sine";
      osc.frequency.setValueAtTime(587.33, now);
      osc.frequency.exponentialRampToValueAtTime(880, now + 0.15);
      gain.gain.setValueAtTime(0.3, now);
      gain.gain.exponentialRampToValueAtTime(0.01, now + 0.45);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start(now);
      osc.stop(now + 0.45);
    } else if (type === "warning" || type === "error") {
      // نغمة تنبيه منخفضة مزدوجة
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = "sawtooth";
      osc.frequency.setValueAtTime(220, now);
      osc.frequency.setValueAtTime(160, now + 0.15);
      gain.gain.setValueAtTime(0.25, now);
      gain.gain.exponentialRampToValueAtTime(0.01, now + 0.4);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start(now);
      osc.stop(now + 0.4);
    }
  } catch (err) {
    console.log("Audio feedback error:", err);
  }
}

// توليد رموز QR فريدة لمادة معينة وحفظها
function generateStockQrTokens(stockId, count = 1, deductQty = 1) {
  const item = (state.stock || []).find(s => s.id === stockId);
  if (!item) {
    alert("المادة غير موجودة بالمخزون.");
    return [];
  }

  const numTokens = Math.max(1, parseInt(count) || 1);
  if (!Array.isArray(state.stockQrTokens)) {
    state.stockQrTokens = [];
  }

  const newTokens = [];
  const now = Date.now();

  for (let i = 0; i < numTokens; i++) {
    const randomHex = Math.random().toString(36).substring(2, 6).toUpperCase();
    const token = `MP-STK-${now.toString(36).toUpperCase()}-${randomHex}-${i + 1}`;

    const tokenObj = {
      token,
      stockId: item.id,
      stockName: item.name,
      category: item.category || "consommables",
      unit: item.unit || "حبة",
      deductQty: deductQty || 1,
      status: "active", // active = صالح للاستعمال، consumed = تم مسحه واستهلاكه
      createdAt: new Date().toISOString(),
      consumedAt: null,
      consumedBy: ""
    };

    state.stockQrTokens.push(tokenObj);
    newTokens.push(tokenObj);
  }

  saveData();
  renderStockQrAuditLog();
  openPrintStockQrModal(stockId, newTokens);
  return newTokens;
}

// فتح نافذة طلب توليد ملصقات QR لمادة موجودة
function openGenerateStockQrModal(stockId) {
  const item = (state.stock || []).find(s => s.id === stockId);
  if (!item) return;

  if (item.category !== "consommables") {
    alert("خاصية ملصقات QR مخصصة فقط لمواد الاستهلاك والطباعة (صباغة، ديليون، ديكابو...) لأن الأكياس تباع وتعد بالجملة وليس حبة بحبة.");
    return;
  }

  const existingActive = (state.stockQrTokens || []).filter(t => t.stockId === stockId && t.status === "active");
  if (existingActive.length > 0) {
    const choice = confirm(`توجد لديك حالياً ${existingActive.length} ملصقات QR نشطة وجاهزة لـ (${item.name}).\n\n- اضغط [موافق / OK] لفتح ومعاينة وطباعة هذه الملصقات فوراً.\n- اضغط [إلغاء / Annuler] إذا كنت تريد إنشاء ملصقات إضافية جديدة.`);
    if (choice) {
      openPrintStockQrModal(stockId, existingActive);
      return;
    }
  }

  const currentQty = Math.max(1, Math.floor(Number(item.quantity || 1)));
  const countStr = prompt(`كم عدد ملصقات QR التي تريد توليدها وطباعتها لـ (${item.name})؟\n\n(كل ملصق خاص بعلبة/وحدة واحدة وينقص المخزون لمرة واحدة عند الفتح)`, String(currentQty));
  if (!countStr) return;

  const count = parseInt(countStr);
  if (isNaN(count) || count <= 0) {
    alert("يرجى إدخال عدد صحيح أكبر من 0.");
    return;
  }

  generateStockQrTokens(stockId, count, 1);
}

// فتح نافذة معاينة وطباعة الملصقات
let currentQrPrintStockId = null;
let currentQrPrintTokens = null;
let cachedServerNetworkUrl = null;

function detectServerNetworkUrlSync() {
  if (cachedServerNetworkUrl) return cachedServerNetworkUrl;
  if (state.settings && state.settings.serverNetworkUrl) {
    cachedServerNetworkUrl = state.settings.serverNetworkUrl;
    return cachedServerNetworkUrl;
  }
  if (window.location.hostname && window.location.hostname !== "localhost" && window.location.hostname !== "127.0.0.1") {
    cachedServerNetworkUrl = window.location.origin;
    return cachedServerNetworkUrl;
  }
  return "http://10.237.240.108:8080";
}

function fetchServerNetworkUrlBackground() {
  fetch("/api/server-info", { cache: "no-store" })
    .then(r => r.json())
    .then(data => {
      if (data && data.url) {
        cachedServerNetworkUrl = data.url;
        const hostInput = document.getElementById("qr-server-host-input");
        if (hostInput && (!hostInput.value || hostInput.value.includes("localhost"))) {
          hostInput.value = data.url;
        }
      }
    })
    .catch(() => {});
}

function openPrintStockQrModal(stockId, tokenList = null) {
  const modal = document.getElementById("modal-stock-qr-print");
  const container = document.getElementById("qr-stickers-container");
  const badgeCount = document.getElementById("qr-print-count-badge");
  const titleEl = document.getElementById("qr-print-modal-title");
  const hostInput = document.getElementById("qr-server-host-input");
  if (!modal || !container) return;

  currentQrPrintStockId = stockId;
  const item = (state.stock || []).find(s => s.id === stockId);
  let tokensToShow = tokenList;

  if (!tokensToShow || tokensToShow.length === 0) {
    // إظهار الرموز النشطة غير المستهلكة لهذه المادة
    tokensToShow = (state.stockQrTokens || []).filter(t => t.stockId === stockId && t.status === "active");
  }

  if (!tokensToShow || tokensToShow.length === 0) {
    alert("لا توجد ملصقات QR نشطة جاهزة للطباعة لهذه المادة. يمكنك توليد ملصقات جديدة.");
    return;
  }
  currentQrPrintTokens = tokensToShow;

  if (titleEl && item) {
    titleEl.textContent = `ملصقات كود QR لـ (${item.name})`;
  }
  if (badgeCount) {
    badgeCount.textContent = `${tokensToShow.length} ملصق جاهز`;
  }

  // عنوان السيرفر في شبكة الواي فاي للهاتف
  let networkHost = hostInput ? hostInput.value.trim() : "";
  if (!networkHost || networkHost.includes("localhost") || networkHost.includes("127.0.0.1")) {
    networkHost = detectServerNetworkUrlSync();
    if (hostInput) hostInput.value = networkHost;
  }
  fetchServerNetworkUrlBackground();

  container.innerHTML = "";

  const currentPath = window.location.pathname || "/";
  const cleanHost = (networkHost || "http://10.237.240.108:8080").replace(/\/+$/, "");
  const baseUrl = cleanHost + currentPath;

  tokensToShow.forEach((t, idx) => {
    const card = document.createElement("div");
    card.className = "qr-sticker-card p-3 rounded-xl border-2 border-dashed border-[#D4D4CE] bg-white flex flex-col items-center text-center space-y-2 relative shadow-2xs";

    // رابط المسح المباشر الذي يمكن لكاميرا أي هاتف قراءته
    const qrScanUrl = `${baseUrl}?scan_qr=${encodeURIComponent(t.token)}`;

    card.innerHTML = `
      <div class="flex items-center justify-between w-full border-b border-gray-100 pb-1 text-[10px] text-[#8A6D0B] font-black">
        <span>MASTER PRINT</span>
        <span class="font-mono text-[9px] text-[#A0A096]">#${idx + 1}</span>
      </div>
      
      <div class="w-full">
        <div class="text-xs font-black text-[#111111] leading-tight line-clamp-2">${escapeHtml(t.stockName)}</div>
        <span class="inline-block mt-0.5 px-2 py-0.2 bg-[#FAF6EA] text-[#8A6D0B] border border-[#E8DCB5] rounded text-[9px] font-bold font-mono">
          1 ${escapeHtml(t.unit || 'وحدة')}
        </span>
      </div>

      <!-- حاوية رمز QR -->
      <div id="qr-box-${t.token.replace(/[^a-zA-Z0-9]/g, '_')}" class="p-1 bg-white border border-[#EAEAE5] rounded-lg shadow-2xs flex items-center justify-center min-w-[128px] min-h-[128px]"></div>

      <div class="text-[9px] text-[#6B6B6B] font-mono leading-none break-all select-all">
        ${escapeHtml(t.token)}
      </div>

      <div class="text-[8px] font-bold text-rose-600 bg-rose-50 px-2 py-0.5 rounded-full border border-rose-200">
        🔒 استعمال لمرة واحدة عند الفتح
      </div>
    `;

    container.appendChild(card);

    // توليد رمز الـ QR باستخدام qrcode.js
    setTimeout(() => {
      const box = document.getElementById(`qr-box-${t.token.replace(/[^a-zA-Z0-9]/g, '_')}`);
      if (box && typeof QRCode !== "undefined") {
        box.innerHTML = "";
        try {
          new QRCode(box, {
            text: qrScanUrl,
            width: 140,
            height: 140,
            colorDark: "#111111",
            colorLight: "#ffffff",
            correctLevel: QRCode.CorrectLevel.M
          });

          // تحويل فوري للـ canvas إلى <img> لضمان ظهوره في المعاينة والطباعة 100%
          setTimeout(() => {
            const cvs = box.querySelector("canvas");
            const existingImg = box.querySelector("img");
            if (cvs) {
              try {
                const dataUrl = cvs.toDataURL("image/png");
                if (existingImg) {
                  existingImg.src = dataUrl;
                  existingImg.style.display = "block";
                  existingImg.style.width = "120px";
                  existingImg.style.height = "120px";
                  existingImg.style.margin = "2px auto";
                } else {
                  box.innerHTML = `<img src="${dataUrl}" style="display:block;width:120px;height:120px;margin:2px auto;" alt="QR" />`;
                }
                cvs.style.display = "none";
              } catch (e) {
                console.log("Canvas toDataURL err:", e);
              }
            } else if (existingImg) {
              existingImg.style.display = "block";
              existingImg.style.width = "120px";
              existingImg.style.height = "120px";
              existingImg.style.margin = "2px auto";
            }
          }, 60);

        } catch (e) {
          console.log("QRCode render error:", e);
        }
      }
    }, 20);
  });

  modal.classList.remove("hidden");
  lucide.createIcons();
}

function refreshQrStickersHost() {
  const hostInput = document.getElementById("qr-server-host-input");
  if (hostInput && hostInput.value.trim()) {
    cachedServerNetworkUrl = hostInput.value.trim().replace(/\/+$/, "");
    if (!state.settings) state.settings = {};
    state.settings.serverNetworkUrl = cachedServerNetworkUrl;
    saveData();
  }
  if (currentQrPrintStockId && currentQrPrintTokens) {
    openPrintStockQrModal(currentQrPrintStockId, currentQrPrintTokens);
  }
}

function closeStockQrPrintModal() {
  const modal = document.getElementById("modal-stock-qr-print");
  if (modal) modal.classList.add("hidden");
}

function printStockQrStickers() {
  const container = document.getElementById("qr-stickers-container");
  if (!container || !container.children.length) {
    alert("لا توجد ملصقات للطباعة حالياً.");
    return;
  }

  // التأكد من أن كل بطاقة تحتوي على صورة base64 PNG عالية الجودة
  const cards = container.querySelectorAll(".qr-sticker-card");
  cards.forEach(card => {
    const cvs = card.querySelector("canvas");
    const box = card.querySelector("[id^='qr-box-']");
    if (cvs && box) {
      try {
        const dataUrl = cvs.toDataURL("image/png");
        box.innerHTML = `<img src="${dataUrl}" style="display:block;width:120px;height:120px;margin:2px auto;" alt="QR" />`;
      } catch (e) {}
    }
  });

  // إضافة كلاس الطباعة لعزل الملصقات بدقة تامة عن باقي الصفحة
  document.body.classList.add("is-printing-qr");

  // استدعاء نافذة الطباعة الرسمية للمتصفح
  setTimeout(() => {
    try {
      window.print();
    } catch (e) {
      console.warn("Direct window.print error, attempting standalone popup fallback:", e);
      openStockQrStandaloneWindow();
    } finally {
      setTimeout(() => {
        document.body.classList.remove("is-printing-qr");
      }, 1200);
    }
  }, 150);
}

function openStockQrStandaloneWindow() {
  const container = document.getElementById("qr-stickers-container");
  if (!container || !container.children.length) {
    alert("لا توجد ملصقات جاهزة للفتح.");
    return;
  }

  // التأكد من تحويل الـ canvas إلى صور
  const cards = container.querySelectorAll(".qr-sticker-card");
  let stickersHtml = "";

  cards.forEach(card => {
    const clone = card.cloneNode(true);
    const cvs = card.querySelector("canvas");
    const cloneBox = clone.querySelector("[id^='qr-box-']");
    if (cvs && cloneBox) {
      try {
        const dataUrl = cvs.toDataURL("image/png");
        cloneBox.innerHTML = `<img src="${dataUrl}" style="display:block;width:120px;height:120px;margin:2px auto;" alt="QR" />`;
      } catch (e) {}
    } else {
      const origImg = card.querySelector("img");
      if (origImg && cloneBox) {
        cloneBox.innerHTML = `<img src="${origImg.src}" style="display:block;width:120px;height:120px;margin:2px auto;" alt="QR" />`;
      }
    }
    stickersHtml += clone.outerHTML;
  });

  const printWindow = window.open("", "_blank");
  if (!printWindow) {
    alert("يرجى السماح بالنوافذ المنبثقة (Popups) أو استخدام زر الطباعة المباشر.");
    window.print();
    return;
  }

  printWindow.document.open();
  printWindow.document.write(`
    <!DOCTYPE html>
    <html lang="ar" dir="rtl">
    <head>
      <meta charset="utf-8">
      <title>طباعة ملصقات QR - MASTER PRINT</title>
      <link href="https://fonts.googleapis.com/css2?family=Cairo:wght@600;700;800;900&display=swap" rel="stylesheet">
      <style>
        @page {
          size: A4 portrait;
          margin: 8mm;
        }
        * {
          box-sizing: border-box;
          -webkit-print-color-adjust: exact !important;
          print-color-adjust: exact !important;
        }
        body {
          font-family: 'Cairo', system-ui, -apple-system, sans-serif;
          margin: 0;
          padding: 10px;
          background: #ffffff;
          color: #111111;
          direction: rtl;
        }
        .header-bar {
          display: flex;
          align-items: center;
          justify-content: space-between;
          background: #FAF6EA;
          border: 1px solid #E8DCB5;
          padding: 10px 16px;
          border-radius: 12px;
          margin-bottom: 14px;
        }
        .print-btn {
          background: #C9A227;
          color: #ffffff;
          border: none;
          padding: 8px 20px;
          font-family: 'Cairo', sans-serif;
          font-size: 13px;
          font-weight: 800;
          border-radius: 8px;
          cursor: pointer;
          transition: background 0.2s;
        }
        .print-btn:hover {
          background: #B8921F;
        }
        .stickers-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 10px;
          width: 100%;
        }
        .qr-sticker-card {
          border: 1.5px dashed #444444 !important;
          border-radius: 10px !important;
          padding: 10px 8px !important;
          background: #ffffff !important;
          display: flex !important;
          flex-direction: column !important;
          align-items: center !important;
          text-align: center !important;
          page-break-inside: avoid !important;
          break-inside: avoid !important;
        }
        .qr-sticker-card .flex { display: flex !important; }
        .qr-sticker-card .justify-between { justify-content: space-between !important; }
        .qr-sticker-card .items-center { align-items: center !important; }
        .qr-sticker-card .w-full { width: 100% !important; }
        .qr-sticker-card img {
          max-width: 120px !important;
          height: 120px !important;
          display: block !important;
          margin: 3px auto !important;
        }
        @media print {
          .no-print {
            display: none !important;
          }
          body {
            padding: 0 !important;
          }
          .header-bar {
            display: none !important;
          }
        }
      </style>
    </head>
    <body>
      <div class="header-bar no-print">
        <div style="font-weight:800;font-size:14px;color:#8A6D0B;">
          🏷️ صفحة ملصقات رموز QR مخصصة للطباعة على ورق A4 أو ملصقات Autocollant
        </div>
        <div style="display:flex;gap:8px;">
          <button class="print-btn" onclick="window.print()">🖨️ طباعة الآن (Imprimer)</button>
        </div>
      </div>
      <div class="stickers-grid">
        ${stickersHtml}
      </div>
    </body>
    </html>
  `);
  printWindow.document.close();
}

// مسح ومعالجة كود الـ QR
let html5QrScannerInstance = null;

function openQrScannerModal() {
  const modal = document.getElementById("modal-qr-scanner");
  if (!modal) return;
  modal.classList.remove("hidden");

  const input = document.getElementById("manual-qr-input");
  if (input) {
    input.value = "";
    input.focus();
  }

  startCameraScanner();
  lucide.createIcons();
}

function closeQrScannerModal() {
  stopCameraScanner();
  const modal = document.getElementById("modal-qr-scanner");
  if (modal) modal.classList.add("hidden");
}

function startCameraScanner() {
  const readerEl = document.getElementById("qr-reader");
  if (!readerEl) return;
  readerEl.innerHTML = "";

  if (typeof Html5Qrcode !== "undefined") {
    try {
      html5QrScannerInstance = new Html5Qrcode("qr-reader");
      const config = { fps: 10, qrbox: { width: 220, height: 220 } };

      html5QrScannerInstance.start(
        { facingMode: "environment" },
        config,
        (decodedText) => {
          handleQrScanDetected(decodedText);
        },
        () => {
          // جاري المسح في الإطارات
        }
      ).catch(err => {
        console.log("Camera live stream start error:", err);
        readerEl.innerHTML = `
          <div class="p-4 text-center text-xs text-[#6B6B6B] space-y-2">
            <div class="text-3xl">📸</div>
            <p class="font-bold text-[#111111] text-xs">الكاميرا الحية المباشرة تتطلب HTTPS في كروم</p>
            <p class="text-[11px] text-[#8A6D0B] font-bold">اضغط على زر "التقاط صورة للكود" بالأسفل فهو يعمل فورياً بدون قيود الأمان!</p>
          </div>
        `;
      });
    } catch (e) {
      console.log("Html5Qrcode init error:", e);
    }
  } else {
    readerEl.innerHTML = `
      <div class="p-4 text-center text-xs text-[#6B6B6B] space-y-2">
        <div class="text-3xl">📱</div>
        <p class="font-bold text-[#111111]">كاميرا هاتفك العادية تدعم مسح الرمز مباشرة</p>
        <p class="text-[11px]">وجّه الكاميرا العادية نحو ملصق QR وسيفتح التطبيق فورياً لخصم المادة.</p>
      </div>
    `;
  }
}

// معالجة قراءة كود الـ QR من الصورة الملتقطة بالكاميرا العادية (يعمل بدون قيود HTTPS)
function handleQrCameraPhotoSelected(event) {
  const file = event.target.files && event.target.files[0];
  if (!file) return;

  const statusEl = document.getElementById("qr-photo-status");
  if (statusEl) {
    statusEl.classList.remove("hidden");
    statusEl.textContent = "⏳ جاري فحص وتحليل كود الـ QR من الصورة...";
  }

  let scanner = null;
  try {
    scanner = new Html5Qrcode("qr-reader-temp");
  } catch (e) {
    scanner = html5QrScannerInstance || new Html5Qrcode("qr-reader");
  }

  scanner.scanFile(file, true)
    .then(decodedText => {
      if (statusEl) statusEl.classList.add("hidden");
      event.target.value = "";
      handleQrScanDetected(decodedText);
    })
    .catch(err => {
      console.log("Photo QR scan error:", err);
      if (statusEl) statusEl.classList.add("hidden");
      event.target.value = "";
      alert("⚠️ لم يتم العثور على رمز QR واضح في الصورة.\n\nيرجى إعادة المحاولة والتقاط صورة واضحة تكون قريبة من الملصق ومضاءة جيداً.");
    });
}

function stopCameraScanner() {
  if (html5QrScannerInstance) {
    try {
      html5QrScannerInstance.stop().then(() => {
        html5QrScannerInstance.clear();
        html5QrScannerInstance = null;
      }).catch(() => {
        html5QrScannerInstance = null;
      });
    } catch (e) {
      html5QrScannerInstance = null;
    }
  }
}

function handleQrScanDetected(rawText) {
  stopCameraScanner();
  closeQrScannerModal();

  let token = (rawText || "").trim();
  if (token.includes("scan_qr=")) {
    const match = token.match(/scan_qr=([^&/#]+)/i);
    if (match && match[1]) {
      token = decodeURIComponent(match[1]);
    }
  } else if (token.includes("token=")) {
    const match = token.match(/token=([^&/#]+)/i);
    if (match && match[1]) {
      token = decodeURIComponent(match[1]);
    }
  }

  const result = processStockQrToken(token);
  showQrScanFeedback(result);
}

function handleManualQrSubmit() {
  const input = document.getElementById("manual-qr-input");
  const rawText = input ? input.value.trim() : "";
  if (!rawText) {
    alert("يرجى إدخال رمز الكود أولاً.");
    return;
  }
  handleQrScanDetected(rawText);
}

// معالجة الرمز والتحقق من أحادية الاستخدام والخصم من المخزون
function processStockQrToken(tokenStr) {
  if (!tokenStr) {
    playChimeSound("error");
    return {
      status: "error",
      title: "رمز غير صالح",
      message: "لم يتم العثور على رمز QR صالح في البيانات المقروءة."
    };
  }

  const cleanToken = tokenStr.trim().toUpperCase();
  const tokens = state.stockQrTokens || [];
  const record = tokens.find(t => t.token.toUpperCase() === cleanToken || cleanToken.includes(t.token.toUpperCase()));

  if (!record) {
    playChimeSound("error");
    return {
      status: "error",
      title: "رمز غير معروف",
      token: tokenStr,
      message: `الرمز (${tokenStr}) غير مسجل في ورشة Master Print أو تم حذفه.`
    };
  }

  // فحص ما إذا كان الرمز مستهلكاً مسبقاً (Single-Use Protection)
  if (record.status === "consumed") {
    playChimeSound("warning");
    const dateFormatted = record.consumedAt ? new Date(record.consumedAt).toLocaleString("ar-MA", { dateStyle: "medium", timeStyle: "short" }) : "سابقاً";
    return {
      status: "already_consumed",
      title: "⚠️ هذا الرمز مستهلك ومحروق مسبقاً!",
      record,
      message: `تم استخدام هذا الرمز وخصم المادة (${record.stockName}) بتاريخ: ${dateFormatted}.\n\n🔒 لا يمكن استعماله مرة ثانية منعاً لتكرار الخصم بالخطأ.`
    };
  }

  // الرمز جديد وصالح (active) -> خصم 1 وحدة من المخزون فورياً
  const item = (state.stock || []).find(s => s.id === record.stockId);
  const deductQty = Number(record.deductQty || 1);
  const oldQty = item ? Number(item.quantity || 0) : 0;
  const newQty = Math.max(0, oldQty - deductQty);

  if (item) {
    item.quantity = newQty;
    item.consumedQr = (Number(item.consumedQr) || 0) + deductQty;
  }

  // تحويل حالة الرمز إلى مستهلك وحرقه
  record.status = "consumed";
  record.consumedAt = new Date().toISOString();

  saveData();
  renderStockGrid();
  updateDashboardMetrics();
  renderStockQrAuditLog();
  if (!document.getElementById("modal-stock-color-consumption")?.classList.contains("hidden")) {
    renderStockColorConsumptionModal();
  }

  playChimeSound("success");

  return {
    status: "success",
    title: "✅ تم خصم المادة من المخزون بنجاح!",
    record,
    item,
    deductQty,
    oldQty,
    newQty,
    message: `تم خصم ${deductQty} ${record.unit || 'وحدة'} من مخزون (${record.stockName}).\n\nالمتبقي في الورشة الآن: ${newQty} ${record.unit || 'وحدة'}.\n(تم حرق الرمز بنجاح 🔒).`
  };
}

// عرض رسالة النتيجة للمستخدم
function showQrScanFeedback(res) {
  const modal = document.getElementById("modal-qr-feedback");
  if (!modal) {
    alert(res.message);
    return;
  }

  const iconEl = document.getElementById("qr-feedback-icon");
  const titleEl = document.getElementById("qr-feedback-title");
  const bodyEl = document.getElementById("qr-feedback-body");
  const boxEl = document.getElementById("qr-feedback-box");

  if (res.status === "success") {
    iconEl.innerHTML = "✅";
    titleEl.textContent = res.title;
    titleEl.className = "text-base font-black text-emerald-700";
    boxEl.className = "p-4 rounded-2xl bg-emerald-50 border-2 border-emerald-200 text-center space-y-2";
    bodyEl.innerHTML = `
      <div class="text-sm font-bold text-[#111111]">${escapeHtml(res.record.stockName)}</div>
      <div class="text-3xl font-black text-emerald-600 font-mono">-${res.deductQty} ${escapeHtml(res.record.unit || 'وحدة')}</div>
      <div class="text-xs text-[#6B6B6B] border-t border-emerald-200 pt-2 mt-2">
        المتبقي بالورشة الآن: <strong class="text-[#111111] font-mono text-sm">${res.newQty} ${escapeHtml(res.record.unit || 'وحدة')}</strong>
      </div>
      <span class="inline-block px-2.5 py-1 bg-emerald-100 text-emerald-800 rounded-full text-[10px] font-bold mt-1">
        🔒 تم حرق الرمز بنجاح (Single-Use Consumed)
      </span>
    `;
  } else if (res.status === "already_consumed") {
    iconEl.innerHTML = "⚠️";
    titleEl.textContent = res.title;
    titleEl.className = "text-base font-black text-amber-700";
    boxEl.className = "p-4 rounded-2xl bg-amber-50 border-2 border-amber-200 text-center space-y-2";
    bodyEl.innerHTML = `
      <div class="text-sm font-bold text-[#111111]">${escapeHtml(res.record.stockName)}</div>
      <p class="text-xs text-[#6B6B6B] whitespace-pre-line leading-relaxed">${escapeHtml(res.message)}</p>
      <div class="text-[10px] text-amber-800 font-mono font-bold bg-amber-100/70 p-1.5 rounded-lg break-all">
        الرمز: ${escapeHtml(res.record.token)}
      </div>
    `;
  } else {
    iconEl.innerHTML = "❌";
    titleEl.textContent = res.title;
    titleEl.className = "text-base font-black text-rose-700";
    boxEl.className = "p-4 rounded-2xl bg-rose-50 border-2 border-rose-200 text-center space-y-2";
    bodyEl.innerHTML = `
      <p class="text-xs text-rose-800 whitespace-pre-line leading-relaxed">${escapeHtml(res.message)}</p>
    `;
  }

  modal.classList.remove("hidden");
  lucide.createIcons();
}

function closeQrFeedbackModal() {
  const modal = document.getElementById("modal-qr-feedback");
  if (modal) modal.classList.add("hidden");
}

// قراءة باراميتر ?scan_qr= عند فتح التطبيق من كاميرا الهاتف
function checkUrlQrScanParam() {
  try {
    const urlParams = new URLSearchParams(window.location.search);
    const scanToken = urlParams.get("scan_qr") || urlParams.get("token");
    if (scanToken) {
      setTimeout(() => {
        handleQrScanDetected(scanToken);
        const cleanUrl = window.location.pathname;
        window.history.replaceState({}, document.title, cleanUrl);
      }, 500);
    }
  } catch (err) {
    console.log("Error checking URL scan param:", err);
  }
}

// عرض سجل استهلاك المواد عبر رموز QR
function renderStockQrAuditLog() {
  const tbody = document.getElementById("stock-qr-audit-body");
  const countBadge = document.getElementById("stock-qr-consumed-count");
  if (!tbody) return;

  const tokens = state.stockQrTokens || [];
  const consumedTokens = tokens
    .filter(t => t.status === "consumed")
    .sort((a, b) => new Date(b.consumedAt || 0) - new Date(a.consumedAt || 0));

  if (countBadge) {
    countBadge.textContent = `${consumedTokens.length} مستهلك`;
  }

  if (consumedTokens.length === 0) {
    tbody.innerHTML = `
      <tr>
        <td colspan="6" class="py-8 text-center text-[#6B6B6B] text-xs">
          لا توجد عمليات استهلاك مسجلة عبر رموز QR بعد.
        </td>
      </tr>
    `;
    return;
  }

  tbody.innerHTML = consumedTokens.map((t, index) => {
    const dateFormatted = t.consumedAt 
      ? new Date(t.consumedAt).toLocaleString("ar-MA", { dateStyle: "short", timeStyle: "short" }) 
      : "-";

    return `
      <tr class="hover:bg-[#F8F8F6] transition border-b border-[#EAEAE5]">
        <td class="py-2.5 px-3 text-[#A0A096] font-mono text-[10px]">${index + 1}</td>
        <td class="py-2.5 px-3 font-mono text-[11px] text-[#6B6B6B] whitespace-nowrap">${dateFormatted}</td>
        <td class="py-2.5 px-3 font-bold text-[#111111]">${escapeHtml(t.stockName)}</td>
        <td class="py-2.5 px-3 text-center font-mono font-bold text-rose-600 whitespace-nowrap">
          -${t.deductQty} ${escapeHtml(t.unit || 'وحدة')}
        </td>
        <td class="py-2.5 px-3 font-mono text-[10px] text-[#6B6B6B] whitespace-nowrap">${escapeHtml(t.token)}</td>
        <td class="py-2.5 px-3 text-center whitespace-nowrap">
          <span class="inline-flex items-center gap-1 font-bold text-[10px] px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200">
            🔒 مستهلك ومحروق
          </span>
        </td>
      </tr>
    `;
  }).join("");

  lucide.createIcons();
}

// ==============================================
// ORDERS MANAGEMENT
// ==============================================
function renderOrdersTable() {
  const container = document.getElementById("orders-list-container");
  if (!container) return;

  const searchQuery = (document.getElementById("order-search-input")?.value || "").toLowerCase().trim();
  const statusFilter = document.getElementById("order-status-filter")?.value || "ALL";
  const typeFilter = document.getElementById("order-type-filter")?.value || "ALL";

  let filtered = [...state.orders].reverse();

  if (searchQuery) {
    filtered = filtered.filter(o => 
      (o.clientName || "").toLowerCase().includes(searchQuery) ||
      (o.clientPhone || "").includes(searchQuery) ||
      (o.clientCity || "").toLowerCase().includes(searchQuery) ||
      (o.id || "").toLowerCase().includes(searchQuery) ||
      (o.ozoneTracking || "").toLowerCase().includes(searchQuery)
    );
  }

  if (statusFilter !== "ALL") {
    filtered = filtered.filter(o => o.status === statusFilter);
  }

  if (typeFilter === "serigraphie") {
    filtered = filtered.filter(o => o.type === "serigraphie");
  } else if (typeFilter === "soustraitance") {
    filtered = filtered.filter(o => o.type === "soustraitance");
  } else if (typeFilter === "local") {
    filtered = filtered.filter(o => o.deliveryType === "local");
  } else if (typeFilter === "ozone") {
    filtered = filtered.filter(o => o.deliveryType === "ozone");
  }

  if (filtered.length === 0) {
    container.innerHTML = `
      <div class="bg-white border border-[#EAEAE5] rounded-2xl p-12 text-center text-[#6B6B6B] shadow-xs">
        <i data-lucide="package-search" class="w-10 h-10 mx-auto mb-2 opacity-50"></i>
        <p class="text-sm font-semibold">لم يتم العثور على أي طلبيات مطابقة للبحث.</p>
      </div>
    `;
    lucide.createIcons();
    return;
  }

  container.innerHTML = filtered.map(order => {
    const reste = Math.max(0, Number(order.totalAmount || 0) - Number(order.avanceAmount || 0));
    const statusBadge = getStatusBadge(order.status);
    
    const genderBadge = order.clientGender === 'female' 
      ? `<span class="text-[10px] bg-rose-50 text-rose-700 px-1.5 py-0.5 rounded border border-rose-200 font-bold">👩 لالة</span>` 
      : `<span class="text-[10px] bg-[#FAF6EA] text-[#C9A227] px-1.5 py-0.5 rounded border border-[#E8DCB5] font-bold">👨 سيدي</span>`;

    let deliveryBadge = "";
    if (order.deliveryType === "ozone") {
      deliveryBadge = `<span class="inline-flex items-center gap-1 text-[10px] font-bold px-2 py-0.5 rounded bg-[#FAF6EA] text-[#C9A227] border border-[#E8DCB5]">
        <i data-lucide="truck" class="w-3 h-3"></i> أوزون: ${escapeHtml(order.ozoneTracking || 'قيد الإرسال')}
      </span>`;
    } else if (order.deliveryType === "local") {
      deliveryBadge = `<span class="inline-flex items-center gap-1 text-[10px] font-bold px-2 py-0.5 rounded bg-[#F8F8F6] text-[#111111] border border-[#EAEAE5]">
        <i data-lucide="bike" class="w-3 h-3"></i> توصيل محلي ${order.localLivreur ? `(${escapeHtml(order.localLivreur)})` : 'خاص'}
      </span>`;
    } else {
      deliveryBadge = `<span class="inline-flex items-center gap-1 text-[10px] font-bold px-2 py-0.5 rounded bg-[#F8F8F6] text-[#6B6B6B] border border-[#EAEAE5]">
        <i data-lucide="store" class="w-3 h-3"></i> تسليم بالورشة
      </span>`;
    }

    const unitPriceDisplay = order.unitPrice ? `${Number(order.unitPrice).toFixed(2)} درهم/حبة` : '';
    const extraColorDisplay = order.extraColorPrice > 0 ? ` + لون إضافي (${order.extraColorPrice} درهم)` : '';

    const countdownActionBtn = getOrderCountdownButtonHtml(order);

    return `
      <div class="bg-white border border-[#EAEAE5] rounded-2xl p-4 hover:border-[#D4D4CE] shadow-xs transition space-y-3">
        <div class="flex flex-wrap items-start justify-between gap-2">
          <div class="flex items-center gap-2">
            <span class="text-xs font-bold text-[#C9A227] bg-[#FAF6EA] px-2 py-0.5 rounded border border-[#E8DCB5]">${order.id}</span>
            ${genderBadge}
            <h3 class="text-sm font-black text-[#111111]">${escapeHtml(order.clientName)}</h3>
            <span class="text-xs text-[#6B6B6B]">📍 ${escapeHtml(order.clientCity)}</span>
            ${deliveryBadge}
            ${order.sacCategory === 'Impression Seule' ? `<span class="inline-flex items-center gap-1 text-[10px] font-bold px-2 py-0.5 rounded bg-purple-50 text-purple-700 border border-purple-200">🖨️ طباعة فقط</span>` : ''}
          </div>
          <div class="flex items-center gap-2">
            ${statusBadge}
          </div>
        </div>

        <div class="grid grid-cols-1 sm:grid-cols-4 gap-2 bg-[#F8F8F6] p-3 rounded-xl border border-[#EAEAE5] text-xs">
          <div>
            <span class="text-[#6B6B6B] block text-[10px]">السلعة والطباعة:</span>
            <span class="font-bold text-[#111111]">${order.type === 'soustraitance' ? '💳 ' : (order.sacCategory === 'Impression Seule' ? '🖨️ ' : '🛍️ ')}${escapeHtml(order.designation)}</span>
            <span class="text-[10px] text-[#6B6B6B] block">${order.quantity} حبة (${order.type === 'soustraitance' ? 'مطبعة خارجية' : `${order.colorsCount} ألوان`}) ${extraColorDisplay}</span>
          </div>

          <div>
            <span class="text-[#6B6B6B] block text-[10px]">المبلغ الإجمالي:</span>
            <span class="font-black text-[#111111] text-sm">${Number(order.totalAmount).toFixed(2)} درهم</span>
            ${unitPriceDisplay ? `<span class="text-[10px] text-[#C9A227] block font-bold">(${unitPriceDisplay})</span>` : ''}
            ${order.subCost ? `<span class="text-[10px] text-[#16B981] block font-bold">الربح الصافي: +${((order.netProfit !== undefined && order.netProfit !== null) ? Number(order.netProfit) : (order.totalAmount - (order.deliveryType === 'ozone' ? Number(order.ozoneFees || 0) : (order.deliveryType === 'local' ? Number(order.localDeliveryFee || 0) : 0)) - order.subCost)).toFixed(2)} درهم</span>` : ''}
            ${(order.sacCategory === 'Impression Seule') ? `<span class="text-[10px] text-[#16B981] block font-bold">الربح الصافي: +${((order.netProfit !== undefined && order.netProfit !== null) ? order.netProfit : (order.unitPrice * order.quantity)).toFixed(2)} درهم <span class="text-purple-700 font-bold bg-purple-50 px-1 py-0.5 rounded border border-purple-200 text-[9px]">خدمة طباعة فقط</span></span>` : ''}
            ${(order.type !== 'soustraitance' && order.sacCategory !== 'Impression Seule' && order.buyPrice > 0) ? `<span class="text-[10px] text-[#16B981] block font-bold">الربح الصافي: +${((order.netProfit !== undefined && order.netProfit !== null) ? order.netProfit : (order.totalAmount - (order.deliveryType === 'ozone' ? Number(order.ozoneFees || 0) : 0) - (order.buyPrice * order.quantity))).toFixed(2)} درهم <span class="text-[#6B6B6B] font-normal">(${Number(order.buyPrice).toFixed(2)} د/حبة شراء)</span></span>` : ''}
          </div>

          <div>
            <span class="text-[#6B6B6B] block text-[10px]">العربون والباقي:</span>
            <span class="text-[#16B981] font-bold block">العربون: ${Number(order.avanceAmount).toFixed(2)} درهم</span>
            <span class="${reste > 0 ? 'text-[#EF4444] font-black' : 'text-[#16B981] font-bold'} block">
              ${reste > 0 ? `الباقي: ${reste.toFixed(2)} درهم` : 'خالص بالكامل ✅'}
            </span>
          </div>

          <div>
            <span class="text-[#6B6B6B] block text-[10px]">الهاتف / التاريخ:</span>
            <span class="text-[#111111] font-medium block" dir="ltr" style="text-align: right;">${escapeHtml(order.clientPhone)}</span>
            <span class="text-[10px] text-[#6B6B6B]">${order.date}</span>
          </div>
        </div>

        ${order.isStockClient ? `
          <div class="bg-sky-50/80 border border-sky-200 p-2.5 rounded-xl flex flex-wrap items-center justify-between gap-2 text-xs">
            <div class="flex items-center gap-2">
              <span class="p-1 bg-sky-100 text-sky-700 rounded-lg">
                <i data-lucide="boxes" class="w-4 h-4"></i>
              </span>
              <div>
                <span class="text-sky-950 font-black">مخزون بالورشة للزبون:</span>
                <span class="text-sky-800 font-bold"> تم تسليم <strong>${order.deliveredQuantity !== undefined ? order.deliveredQuantity : order.quantity}</strong> من <strong>${order.quantity}</strong> حبة</span>
              </div>
            </div>
            <div class="flex items-center gap-2">
              <span class="text-xs font-black text-sky-800 bg-white px-2.5 py-1 rounded-lg border border-sky-200 shadow-2xs">
                المتبقي بالورشة: ${(order.remainingQuantity !== undefined) ? order.remainingQuantity : Math.max(0, order.quantity - (order.deliveredQuantity || 0))} حبة
              </span>
            </div>
          </div>
        ` : ''}

        ${order.notes ? `
          <div class="text-[11px] text-[#6B6B6B] bg-white px-3 py-1.5 rounded-lg border border-[#EAEAE5]">
            ملاحظة: ${escapeHtml(order.notes)}
          </div>
        ` : ''}

        <div class="flex flex-wrap items-center justify-between gap-2 pt-2 border-t border-[#EAEAE5]">
          <div class="flex items-center gap-1 text-xs">
            <span class="text-[#6B6B6B] text-[11px]">المرحلة:</span>
            <select onchange="updateOrderStatus('${order.id}', this.value)" class="bg-white border border-[#D4D4CE] text-xs text-[#111111] px-2 py-1 rounded-lg focus:border-[#C9A227] outline-none">
              <option value="conception" ${order.status === 'conception' ? 'selected' : ''}>🟡 التصميم</option>
              <option value="impression" ${order.status === 'impression' ? 'selected' : ''}>🟠 قيد الطباعة</option>
              <option value="prete" ${order.status === 'prete' ? 'selected' : ''}>🔵 جاهزة للتسليم</option>
              <option value="livraison" ${order.status === 'livraison' ? 'selected' : ''}>🟣 مع التوصيل</option>
              <option value="partielle" ${order.status === 'partielle' ? 'selected' : ''}>📦 مخزون بالورشة</option>
              <option value="livree" ${order.status === 'livree' ? 'selected' : ''}>🟢 تم التسليم والخلاص</option>
              <option value="retour" ${order.status === 'retour' ? 'selected' : ''}>🔴 راجعة أو ملغاة</option>
            </select>
          </div>

          <div class="flex items-center gap-1.5">
            ${(order.isStockClient || order.status === 'partielle') ? `
              <button onclick="openPartialDeliveryModal('${order.id}')" class="flex items-center gap-1 px-3 py-1.5 bg-sky-50 hover:bg-sky-100 text-sky-800 border border-sky-300 text-xs font-bold rounded-lg transition cursor-pointer" title="تسليم دفعة جديدة من مخزون الورشة">
                <i data-lucide="boxes" class="w-3.5 h-3.5 text-sky-600"></i>
                <span>تسليم دفعة</span>
              </button>
            ` : ''}

            ${countdownActionBtn}

            <button onclick="sendOrderWhatsApp('${order.id}')" class="flex items-center gap-1 px-3 py-1.5 bg-emerald-50 hover:bg-emerald-100 text-emerald-700 border border-emerald-200 text-xs font-bold rounded-lg transition">
              <i data-lucide="message-circle" class="w-3.5 h-3.5"></i>
              <span>واتساب</span>
            </button>

            <button onclick="openBonDeCommande('${order.id}')" class="flex items-center gap-1 px-3 py-1.5 bg-[#F8F8F6] hover:bg-[#F4F4F0] text-[#111111] border border-[#EAEAE5] text-xs font-bold rounded-lg transition">
              <i data-lucide="printer" class="w-3.5 h-3.5 text-[#C9A227]"></i>
              <span>فاتورة / وصل</span>
            </button>

            <button onclick="editOrder('${order.id}')" class="p-1.5 bg-[#F8F8F6] hover:bg-[#F4F4F0] text-[#6B6B6B] hover:text-[#111111] border border-[#EAEAE5] rounded-lg transition" title="تعديل">
              <i data-lucide="edit-3" class="w-3.5 h-3.5"></i>
            </button>

            <button onclick="deleteOrder('${order.id}')" class="p-1.5 bg-[#F8F8F6] hover:bg-rose-50 text-[#6B6B6B] hover:text-rose-600 border border-[#EAEAE5] rounded-lg transition" title="حذف">
              <i data-lucide="trash-2" class="w-3.5 h-3.5"></i>
            </button>
          </div>
        </div>

      </div>
    `;
  }).join("");

  lucide.createIcons();
}

function filterOrdersByStatus(statusKey) {
  switchTab("orders");
  const filterEl = document.getElementById("order-status-filter");
  if (filterEl) {
    filterEl.value = statusKey;
    renderOrdersTable();
  }
}

function getStatusBadge(status) {
  switch (status) {
    case "conception":
      return `<span class="badge-status bg-[#FAF6EA] text-[#C9A227] border border-[#E8DCB5]">🟡 التصميم</span>`;
    case "impression":
      return `<span class="badge-status bg-orange-50 text-orange-700 border border-orange-200">🟠 قيد الطباعة</span>`;
    case "prete":
      return `<span class="badge-status bg-blue-50 text-blue-700 border border-blue-200">🔵 جاهزة للتسليم</span>`;
    case "livraison":
      return `<span class="badge-status bg-purple-50 text-purple-700 border border-purple-200">🟣 مع التوصيل</span>`;
    case "partielle":
      return `<span class="badge-status bg-sky-50 text-sky-800 border border-sky-300 font-bold">📦 تسليم جزئي (مخزون بالورشة)</span>`;
    case "livree":
      return `<span class="badge-status bg-emerald-50 text-emerald-700 border border-emerald-200">🟢 مسلّمة وخالصة</span>`;
    case "retour":
      return `<span class="badge-status bg-rose-50 text-rose-700 border border-rose-200">🔴 راجعة أو ملغاة</span>`;
    default:
      return `<span class="badge-status bg-gray-100 text-[#6B6B6B] border border-gray-200">${status}</span>`;
  }
}



function getBagDefaultCost(catalogKey, size) {
  if (state && state.settings && state.settings.bagCosts && state.settings.bagCosts[catalogKey] && state.settings.bagCosts[catalogKey][size] !== undefined) {
    const val = parseFloat(state.settings.bagCosts[catalogKey][size]);
    if (!isNaN(val)) return val;
  }
  if (SAC_DEFAULT_COSTS[catalogKey] && SAC_DEFAULT_COSTS[catalogKey][size] !== undefined) {
    return SAC_DEFAULT_COSTS[catalogKey][size];
  }
  if (catalogKey.startsWith("Kraft")) {
    const kCost = state?.settings?.bagCosts?.["Kraft"]?.[size] ?? SAC_DEFAULT_COSTS?.["Kraft"]?.[size];
    if (kCost !== undefined && kCost !== null) return parseFloat(kCost);
  }
  if (catalogKey.startsWith("Carton")) {
    const cCost = state?.settings?.bagCosts?.["Carton"]?.[size] ?? SAC_DEFAULT_COSTS?.["Carton"]?.[size];
    if (cCost !== undefined && cCost !== null) return parseFloat(cCost);
  }
  return null;
}

function updateDefaultBagBuyPrice() {
  const cat = document.getElementById("order-sac-category")?.value || "Non Tissé";
  let key = cat;
  if (cat === "Non Tissé") {
    const handleType = document.querySelector('input[name="order-non-tisse-handle"]:checked')?.value || "poignee";
    key = handleType === "anses" ? "Non Tissé - Anses" : "Non Tissé - Poignée";
  } else if (cat === "Kraft") {
    const handleType = document.querySelector('input[name="order-kraft-handle"]:checked')?.value || "torsade";
    key = handleType === "plat" ? "Kraft - Plat" : "Kraft - Torsadé";
  } else if (cat === "Carton") {
    const cartonType = document.querySelector('input[name="order-carton-type"]:checked')?.value || "valise";
    key = cartonType === "americaine" ? "Carton - Caisse américaine" : "Carton - Boîte valise";
  }
  const sizeVal = document.getElementById("order-sac-size")?.value;
  const buyPriceEl = document.getElementById("order-buy-price");
  if (!buyPriceEl) return;

  if (sizeVal && sizeVal !== "custom") {
    const cost = getBagDefaultCost(key, sizeVal);
    if (cost !== null && cost !== undefined) {
      buyPriceEl.value = cost;
    }
  }
  calculateOrderTotals();
}

function getCategorySizes(categoryKey) {
  if (state && state.settings && state.settings.sacCatalog && Array.isArray(state.settings.sacCatalog[categoryKey]) && state.settings.sacCatalog[categoryKey].length > 0) {
    return state.settings.sacCatalog[categoryKey];
  }
  if (SAC_CATALOG[categoryKey]) {
    return SAC_CATALOG[categoryKey];
  }
  if (categoryKey.startsWith("Kraft")) return state?.settings?.sacCatalog?.["Kraft"] || SAC_CATALOG["Kraft"] || [];
  if (categoryKey.startsWith("Carton")) return state?.settings?.sacCatalog?.["Carton"] || SAC_CATALOG["Carton"] || [];
  return SAC_CATALOG["Non Tissé - Poignée"] || [];
}
window.getCategorySizes = getCategorySizes;

// ==============================================
// STOCK TO ORDER LINKING & AVAILABILITY ENGINE
// ==============================================

function findMatchingStockItem(sacCategory, handleType, sacSize) {
  if (!state || !Array.isArray(state.stock) || state.stock.length === 0) return null;
  if (!sacSize || sacSize === "custom") return null;

  const sacsStock = state.stock.filter(s => (s.category || "sacs") === "sacs");
  if (sacsStock.length === 0) return null;

  // 1. Normalize size string (e.g. "25x35 cm" -> "25x35")
  const normSize = String(sacSize).toLowerCase().replace(/\s+/g, "");
  const sizeMatch = normSize.match(/(\d+)\s*[xX*×]\s*(\d+)/);
  const dimA = sizeMatch ? sizeMatch[1] : null;
  const dimB = sizeMatch ? sizeMatch[2] : null;

  // 2. Keyword dictionary for categories
  const catKeywords = {
    "Kraft": ["kraft", "كرافت"],
    "Non Tissé": ["non tissé", "non-tissé", "nontisse", "تيسي", "قماش", "نسيج"],
    "Papier Luxe": ["papier", "luxe", "فاخر", "ورق"],
    "Carton": ["carton", "كرتون", "boite", "علبة", "caisse"],
    "Plastique": ["plastique", "بلاستيك", "ميكا", "ساشي"],
    "Ruban": ["ruban", "شريط", "ساتان"]
  };

  const keywords = catKeywords[sacCategory] || [sacCategory.toLowerCase()];

  // 3. Score each stock item to find best match
  let bestItem = null;
  let bestScore = -1;

  sacsStock.forEach(item => {
    const nameNorm = (item.name || "").toLowerCase();
    const nameNoSpaces = nameNorm.replace(/\s+/g, "");
    let score = 0;

    // Check size match
    let hasSize = false;
    if (dimA && dimB) {
      const itemSizeMatch = nameNoSpaces.match(/(\d+)\s*[xX*×]\s*(\d+)/);
      if (itemSizeMatch) {
        if (
          (itemSizeMatch[1] === dimA && itemSizeMatch[2] === dimB) ||
          (itemSizeMatch[1] === dimB && itemSizeMatch[2] === dimA)
        ) {
          hasSize = true;
          score += 10;
        }
      } else if (nameNoSpaces.includes(`${dimA}x${dimB}`) || nameNoSpaces.includes(`${dimB}x${dimA}`)) {
        hasSize = true;
        score += 10;
      }
    }

    if (!hasSize) {
      if (nameNorm.includes(sacSize.toLowerCase())) {
        hasSize = true;
        score += 8;
      }
    }

    if (!hasSize) return;

    // Check category keywords
    const hasCategory = keywords.some(kw => nameNorm.includes(kw));
    if (hasCategory) {
      score += 5;
    }

    // Check handle / subType keywords
    if (handleType) {
      const ht = handleType.toLowerCase();
      if (ht === "poignee" && (nameNorm.includes("poignee") || nameNorm.includes("poignée") || nameNorm.includes("بواني"))) score += 3;
      if (ht === "anses" && (nameNorm.includes("anse") || nameNorm.includes("يد") || nameNorm.includes("علاقة"))) score += 3;
      if (ht === "torsade" && (nameNorm.includes("torsad") || nameNorm.includes("مبروم"))) score += 3;
      if (ht === "plat" && (nameNorm.includes("plat") || nameNorm.includes("مسطح"))) score += 3;
      if (ht === "valise" && (nameNorm.includes("valise") || nameNorm.includes("فاليز"))) score += 3;
      if (ht === "americaine" && (nameNorm.includes("americain") || nameNorm.includes("أمريكان"))) score += 3;
      if (ht === "rose" && (nameNorm.includes("rose") || nameNorm.includes("وردي"))) score += 3;
      if (ht === "noir" && (nameNorm.includes("noir") || nameNorm.includes("أسود") || nameNorm.includes("كحل"))) score += 3;
      if (ht === "transparent" && (nameNorm.includes("transp") || nameNorm.includes("شفاف"))) score += 3;
    }

    if (score > bestScore) {
      bestScore = score;
      bestItem = item;
    }
  });

  return bestScore >= 8 ? bestItem : null;
}
window.findMatchingStockItem = findMatchingStockItem;

function populateOrderStockQuickPicker() {
  const select = document.getElementById("order-quick-stock-select");
  if (!select) return;

  const sacs = (state.stock || []).filter(s => (s.category || "sacs") === "sacs");
  if (sacs.length === 0) {
    select.innerHTML = `<option value="">-- لا توجد أكياس مسجلة بالمخزن حالياً --</option>`;
    return;
  }

  let html = `<option value="">-- أو اختر سلعة من المخزن (${sacs.length} مادة) --</option>`;
  sacs.forEach(item => {
    const q = Number(item.quantity || 0);
    const u = item.unit || "حبة";
    const cp = Number(item.costPrice || 0).toFixed(2);
    html += `<option value="${item.id}">${escapeHtml(item.name)} (متوفر: ${q} ${u} | شراء: ${cp} د)</option>`;
  });
  select.innerHTML = html;
}
window.populateOrderStockQuickPicker = populateOrderStockQuickPicker;

function onQuickStockSelectChange() {
  const select = document.getElementById("order-quick-stock-select");
  if (!select || !select.value) {
    updateOrderStockAvailabilityIndicator();
    return;
  }

  const itemId = select.value;
  const item = (state.stock || []).find(s => s.id === itemId);
  if (!item) return;

  // 1. Guess category from name
  const name = (item.name || "").toLowerCase();
  let cat = "Non Tissé";
  if (name.includes("kraft") || name.includes("كرافت")) cat = "Kraft";
  else if (name.includes("carton") || name.includes("كرتون")) cat = "Carton";
  else if (name.includes("plastique") || name.includes("بلاستيك")) cat = "Plastique";
  else if (name.includes("ruban") || name.includes("شريط")) cat = "Ruban";
  else if (name.includes("papier") || name.includes("فاخر")) cat = "Papier Luxe";

  const catSelect = document.getElementById("order-sac-category");
  if (catSelect) {
    catSelect.value = cat;
    onSacCategoryChange();
  }

  // 2. Guess handle / subtype
  if (cat === "Kraft") {
    const isPlat = name.includes("plat") || name.includes("مسطح");
    const r = document.querySelector(`input[name="order-kraft-handle"][value="${isPlat ? 'plat' : 'torsade'}"]`);
    if (r) { r.checked = true; onKraftHandleChange(); }
  } else if (cat === "Non Tissé") {
    const isAnses = name.includes("anse") || name.includes("يد");
    const r = document.querySelector(`input[name="order-non-tisse-handle"][value="${isAnses ? 'anses' : 'poignee'}"]`);
    if (r) { r.checked = true; onNonTisseHandleChange(); }
  } else if (cat === "Carton") {
    const isAm = name.includes("americain") || name.includes("امريكان");
    const r = document.querySelector(`input[name="order-carton-type"][value="${isAm ? 'americaine' : 'valise'}"]`);
    if (r) { r.checked = true; onCartonTypeChange(); }
  } else if (cat === "Plastique") {
    let col = "rose";
    if (name.includes("noir") || name.includes("كحل") || name.includes("أسود")) col = "noir";
    if (name.includes("transp") || name.includes("شفاف")) col = "transparent";
    const r = document.querySelector(`input[name="order-plastique-color"][value="${col}"]`);
    if (r) { r.checked = true; onPlastiqueColorChange(); }
  }

  // 3. Extract dimensions and match or select size
  const sizeSelect = document.getElementById("order-sac-size");
  const sizeMatch = name.replace(/\s+/g, "").match(/(\d+)\s*[xX*×]\s*(\d+)/);
  if (sizeMatch && sizeSelect) {
    const dim1 = `${sizeMatch[1]}x${sizeMatch[2]}`;
    const dim2 = `${sizeMatch[2]}x${sizeMatch[1]}`;
    let found = false;
    for (let opt of sizeSelect.options) {
      const optNorm = opt.value.replace(/\s+/g, "").toLowerCase();
      if (optNorm.includes(dim1) || optNorm.includes(dim2)) {
        sizeSelect.value = opt.value;
        found = true;
        break;
      }
    }
    if (!found) {
      sizeSelect.value = "custom";
      const customBox = document.getElementById("box-custom-size");
      const customInput = document.getElementById("order-sac-custom-size");
      if (customBox) customBox.classList.remove("hidden");
      if (customInput) customInput.value = `${sizeMatch[1]}x${sizeMatch[2]} cm`;
    }
  }

  // 4. Fill buy price from item costPrice
  const buyInput = document.getElementById("order-buy-price");
  if (buyInput && Number(item.costPrice) > 0) {
    buyInput.value = Number(item.costPrice).toFixed(2);
  }

  // 5. Select "متوفرة بمخزون الورشة"
  applyStockAsBagSource(item.id);
  calculateOrderTotals();
  updateOrderStockAvailabilityIndicator(item);
}
window.onQuickStockSelectChange = onQuickStockSelectChange;

function applyStockAsBagSource(stockItemId) {
  const stockRadio = document.querySelector('input[name="order-bag-source"][value="stock"]');
  if (stockRadio) {
    stockRadio.checked = true;
    updateBagCostPreview();
  }
  const box = document.getElementById("box-order-stock-indicator");
  if (box && stockItemId) {
    box.dataset.matchedStockId = stockItemId;
  }
  calculateOrderTotals();
}
window.applyStockAsBagSource = applyStockAsBagSource;

function updateOrderStockAvailabilityIndicator(explicitStockItem = null) {
  const box = document.getElementById("box-order-stock-indicator");
  if (!box) return;

  const type = document.querySelector('input[name="order-type-choice"]:checked')?.value || "serigraphie";
  const cat = document.getElementById("order-sac-category")?.value || "Non Tissé";

  if (type === "soustraitance" || cat === "Impression Seule") {
    box.classList.add("hidden");
    box.dataset.matchedStockId = "";
    return;
  }

  box.classList.remove("hidden");

  let handleType = "";
  if (cat === "Non Tissé") {
    handleType = document.querySelector('input[name="order-non-tisse-handle"]:checked')?.value || "poignee";
  } else if (cat === "Kraft") {
    handleType = document.querySelector('input[name="order-kraft-handle"]:checked')?.value || "torsade";
  } else if (cat === "Carton") {
    handleType = document.querySelector('input[name="order-carton-type"]:checked')?.value || "valise";
  } else if (cat === "Plastique") {
    handleType = document.querySelector('input[name="order-plastique-color"]:checked')?.value || "rose";
  }

  const sizeVal = document.getElementById("order-sac-size")?.value || "";
  const customSize = document.getElementById("order-sac-custom-size")?.value?.trim();
  const finalSize = (sizeVal === "custom" && customSize) ? customSize : sizeVal;

  const orderQty = parseInt(document.getElementById("order-qty")?.value) || 0;

  // Find item
  const matched = explicitStockItem || findMatchingStockItem(cat, handleType, finalSize);

  if (!matched) {
    box.dataset.matchedStockId = "";
    box.className = "rounded-2xl p-3.5 border border-[#EAEAE5] bg-[#F8F8F6] text-[#6B6B6B] transition-all duration-200 shadow-2xs";
    box.innerHTML = `
      <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs">
        <div class="flex items-center gap-2">
          <i data-lucide="info" class="w-4 h-4 text-[#8A6D0B] shrink-0"></i>
          <span>هذا القياس (<b>${escapeHtml(finalSize || 'المحدد')}</b>) غير مسجل حالياً بمخزن الأكياس. (المصدر: طلب مباشر من المورد).</span>
        </div>
        <button type="button" onclick="openNewStockModalFromOrder()" class="text-[11px] font-bold text-[#C9A227] hover:text-[#8A6D0B] hover:underline flex items-center gap-1 self-start sm:self-auto shrink-0">
          <i data-lucide="plus-circle" class="w-3.5 h-3.5"></i>
          <span>+ تسجيل هذا الكيس في المخزن</span>
        </button>
      </div>
    `;
    lucide.createIcons();
    return;
  }

  box.dataset.matchedStockId = matched.id;
  const stockQty = Number(matched.quantity || 0);
  const unitLabel = matched.unit || "حبة";

  if (stockQty >= orderQty && orderQty > 0) {
    // Green - Stock is sufficient
    const remainingAfter = stockQty - orderQty;
    box.className = "rounded-2xl p-3.5 border border-emerald-300 bg-emerald-50/90 text-emerald-950 transition-all duration-200 shadow-2xs";
    box.innerHTML = `
      <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div class="space-y-1">
          <div class="flex items-center gap-2 flex-wrap">
            <span class="inline-block w-2.5 h-2.5 rounded-full bg-emerald-500 shadow-sm animate-pulse"></span>
            <span class="text-xs font-black text-emerald-950">📦 متوفر بمخزون الورشة: <b class="underline">${escapeHtml(matched.name)}</b></span>
            <span class="text-xs font-black bg-emerald-100 text-emerald-800 px-2.5 py-0.5 rounded-lg border border-emerald-300 font-mono">${stockQty} ${unitLabel} متوفرة</span>
          </div>
          <p class="text-[11px] text-emerald-800 font-bold">
            ✅ الكمية المطلوبة بالطلبية (<b>${orderQty}</b> ${unitLabel}) متوفرة بالكامل بالمخزن. (سيبقى بالمخزن: <b>${remainingAfter}</b> ${unitLabel}).
          </p>
        </div>
        <button type="button" onclick="applyStockAsBagSource('${matched.id}')" class="px-3.5 py-2 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-black rounded-xl transition shadow-xs flex items-center gap-1.5 self-start sm:self-auto shrink-0 cursor-pointer">
          <i data-lucide="check" class="w-3.5 h-3.5"></i>
          <span>استخدام مخزون الورشة 📦</span>
        </button>
      </div>
    `;
  } else if (stockQty > 0 && stockQty < orderQty) {
    // Amber - Stock is insufficient
    const deficit = orderQty - stockQty;
    box.className = "rounded-2xl p-3.5 border border-amber-300 bg-amber-50/90 text-amber-950 transition-all duration-200 shadow-2xs";
    box.innerHTML = `
      <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div class="space-y-1">
          <div class="flex items-center gap-2 flex-wrap">
            <span class="inline-block w-2.5 h-2.5 rounded-full bg-amber-500"></span>
            <span class="text-xs font-black text-amber-950">📦 مسجل بالمخزن: <b>${escapeHtml(matched.name)}</b></span>
            <span class="text-xs font-black bg-amber-100 text-amber-900 px-2 py-0.5 rounded-lg border border-amber-300 font-mono">${stockQty} ${unitLabel} فقط</span>
          </div>
          <p class="text-[11px] text-amber-800 font-bold">
            ⚠️ الكمية بالمخزن (${stockQty} ${unitLabel}) غير كافية للطلبية (${orderQty} ${unitLabel}). <span class="bg-rose-100 text-rose-800 px-1.5 py-0.5 rounded font-black">العجز: -${deficit} ${unitLabel}</span>
          </p>
        </div>
        <div class="text-[11px] font-bold text-amber-900 bg-white/90 px-3 py-1.5 rounded-xl border border-amber-200 self-start sm:self-auto shrink-0 shadow-2xs">
          🏭 يفضل اختيار "شراء من المورد"
        </div>
      </div>
    `;
  } else {
    // Red - Out of stock (0)
    box.className = "rounded-2xl p-3.5 border border-rose-200 bg-rose-50/90 text-rose-950 transition-all duration-200 shadow-2xs";
    box.innerHTML = `
      <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs">
        <div class="flex items-center gap-2">
          <span class="inline-block w-2.5 h-2.5 rounded-full bg-rose-500"></span>
          <span class="font-black text-rose-950">🔴 نفد من المخزون: <b>${escapeHtml(matched.name)}</b> (الرصيد: 0 ${unitLabel})</span>
        </div>
        <span class="text-[11px] font-bold text-rose-700 bg-white/90 px-2.5 py-1 rounded-lg border border-rose-200 self-start sm:self-auto shrink-0">
          يلزم الشراء من المورد لهذه الطلبية 🏭
        </span>
      </div>
    `;
  }

  lucide.createIcons();
}
window.updateOrderStockAvailabilityIndicator = updateOrderStockAvailabilityIndicator;

function populateSacSizes(category, selectedSize = null, skipBuyPriceUpdate = false) {
  const sizeSelect = document.getElementById("order-sac-size");
  const customBox = document.getElementById("box-custom-size");
  const customInput = document.getElementById("order-sac-custom-size");
  if (!sizeSelect) return;

  let key = category;
  if (category === "Non Tissé") {
    const handleType = document.querySelector('input[name="order-non-tisse-handle"]:checked')?.value || "poignee";
    key = handleType === "anses" ? "Non Tissé - Anses" : "Non Tissé - Poignée";
  } else if (category === "Kraft") {
    const handleType = document.querySelector('input[name="order-kraft-handle"]:checked')?.value || "torsade";
    key = handleType === "plat" ? "Kraft - Plat" : "Kraft - Torsadé";
  } else if (category === "Carton") {
    const cartonType = document.querySelector('input[name="order-carton-type"]:checked')?.value || "valise";
    key = cartonType === "americaine" ? "Carton - Caisse américaine" : "Carton - Boîte valise";
  }

  const sizes = getCategorySizes(key);
  let html = sizes.map(s => `<option value="${escapeHtml(s)}">${escapeHtml(s)}</option>`).join("");
  html += `<option value="custom">✍️ قياس مخصص آخر (كتابة يدوية)...</option>`;
  sizeSelect.innerHTML = html;

  if (selectedSize) {
    let matched = false;
    for (let opt of sizeSelect.options) {
      if (opt.value === selectedSize || selectedSize.includes(opt.value)) {
        sizeSelect.value = opt.value;
        matched = true;
        break;
      }
    }
    if (matched) {
      if (customBox) customBox.classList.add("hidden");
    } else {
      sizeSelect.value = "custom";
      if (customBox) customBox.classList.remove("hidden");
      if (customInput) customInput.value = selectedSize;
    }
  } else {
    sizeSelect.value = sizes[0] || "custom";
    if (customBox) customBox.classList.add("hidden");
    if (customInput) customInput.value = "";
  }

  if (!skipBuyPriceUpdate) {
    updateDefaultBagBuyPrice();
  }
  if (typeof updateOrderStockAvailabilityIndicator === "function") {
    updateOrderStockAvailabilityIndicator();
  }
}

function onSacCategoryChange() {
  const cat = document.getElementById("order-sac-category")?.value || "Non Tissé";
  const nonTisseBox = document.getElementById("box-non-tisse-handle");
  const kraftBox = document.getElementById("box-kraft-handle");
  const cartonBox = document.getElementById("box-carton-type");
  const plastiqueBox = document.getElementById("box-plastique-color");
  const colCat = document.getElementById("col-sac-category");
  const colSize = document.getElementById("col-sac-size");
  const customBox = document.getElementById("box-custom-size");
  const impressionBox = document.getElementById("box-impression-seule-details");
  const wrapperBuyPrice = document.getElementById("wrapper-order-buy-price");
  const badgeFreeGoods = document.getElementById("badge-impression-free-goods");
  const caisseBuyBox = document.getElementById("box-order-caisse-buy");
  const autoCaisseBuyCheckbox = document.getElementById("order-auto-caisse-buy");
  const buyPriceInput = document.getElementById("order-buy-price");

  if (nonTisseBox) nonTisseBox.classList.add("hidden");
  if (kraftBox) kraftBox.classList.add("hidden");
  if (cartonBox) cartonBox.classList.add("hidden");
  if (plastiqueBox) plastiqueBox.classList.add("hidden");
  if (customBox) customBox.classList.add("hidden");

  if (cat === "Impression Seule") {
    if (colCat) colCat.className = "md:col-span-12";
    if (colSize) colSize.classList.add("hidden");
    if (impressionBox) impressionBox.classList.remove("hidden");
    if (wrapperBuyPrice) wrapperBuyPrice.classList.add("hidden");
    if (badgeFreeGoods) badgeFreeGoods.classList.remove("hidden");
    if (caisseBuyBox) caisseBuyBox.classList.add("hidden");
    if (autoCaisseBuyCheckbox) autoCaisseBuyCheckbox.checked = false;
    if (buyPriceInput) buyPriceInput.value = "0";
    calculateOrderTotals();
    return;
  }

  // إذا لم يكن Impression Seule:
  if (colSize) colSize.classList.remove("hidden");
  if (impressionBox) impressionBox.classList.add("hidden");
  if (wrapperBuyPrice) wrapperBuyPrice.classList.remove("hidden");
  if (badgeFreeGoods) badgeFreeGoods.classList.add("hidden");
  if (caisseBuyBox) caisseBuyBox.classList.remove("hidden");
  if (autoCaisseBuyCheckbox) autoCaisseBuyCheckbox.checked = true;

  let hasSubOptions = false;
  if (cat === "Non Tissé") {
    if (nonTisseBox) nonTisseBox.classList.remove("hidden");
    hasSubOptions = true;
  } else if (cat === "Kraft") {
    if (kraftBox) kraftBox.classList.remove("hidden");
    hasSubOptions = true;
  } else if (cat === "Carton") {
    if (cartonBox) cartonBox.classList.remove("hidden");
    hasSubOptions = true;
  } else if (cat === "Plastique") {
    if (plastiqueBox) plastiqueBox.classList.remove("hidden");
    hasSubOptions = true;
  }

  if (hasSubOptions) {
    if (colCat) colCat.className = "md:col-span-4";
    if (colSize) colSize.className = "md:col-span-4";
  } else {
    if (colCat) colCat.className = "md:col-span-6";
    if (colSize) colSize.className = "md:col-span-6";
  }

  populateSacSizes(cat);
}

function onNonTisseHandleChange() {
  populateSacSizes("Non Tissé");
}

function onKraftHandleChange() {
  populateSacSizes("Kraft");
}

function onCartonTypeChange() {
  populateSacSizes("Carton");
}

function onPlastiqueColorChange() {
  updateDefaultBagBuyPrice();
  if (typeof updateOrderStockAvailabilityIndicator === "function") {
    updateOrderStockAvailabilityIndicator();
  }
}

window.onKraftHandleChange = onKraftHandleChange;
window.onCartonTypeChange = onCartonTypeChange;
window.onPlastiqueColorChange = onPlastiqueColorChange;

function onSacSizeChange() {
  const sizeVal = document.getElementById("order-sac-size")?.value;
  const customBox = document.getElementById("box-custom-size");
  const customInput = document.getElementById("order-sac-custom-size");

  if (sizeVal === "custom") {
    if (customBox) customBox.classList.remove("hidden");
    if (customInput) customInput.focus();
  } else {
    if (customBox) customBox.classList.add("hidden");
    updateDefaultBagBuyPrice();
  }
  if (typeof updateOrderStockAvailabilityIndicator === "function") {
    updateOrderStockAvailabilityIndicator();
  }
}

// Order Number Helpers
function getNextOrderNumber() {
  const startNum = (state.settings && state.settings.startOrderNumber) ? parseInt(state.settings.startOrderNumber, 10) : 100;
  let maxNum = (isNaN(startNum) || startNum < 1 ? 100 : startNum) - 1;
  if (Array.isArray(state.orders)) {
    state.orders.forEach(o => {
      if (o && o.id) {
        const m = String(o.id).match(/(\d+)$/);
        if (m) {
          const val = parseInt(m[1], 10);
          if (!isNaN(val) && val > maxNum) {
            maxNum = val;
          }
        }
      }
    });
  }
  return maxNum + 1;
}

function getNextOrderId() {
  const nextNum = getNextOrderNumber();
  return `طلب-2026-${String(nextNum).padStart(3, '0')}`;
}

// Order Form Modal Handlers
function openNewOrderModal() {
  const nextId = getNextOrderId();
  const titleEl = document.getElementById("modal-order-title");
  if (titleEl) {
    titleEl.innerHTML = `تسجيل طلبية جديدة <span class="text-xs font-mono font-bold text-[#C9A227] bg-[#C9A227]/10 px-2 py-0.5 rounded-full mr-1">#${nextId}</span>`;
  }
  document.getElementById("order-form").reset();
  document.getElementById("order-edit-id").value = "";
  document.getElementById("order-reste-display").textContent = "0.00 درهم";
  document.getElementById("order-qty").value = "500";
  document.getElementById("order-unit-price").value = "";
  const buyPriceEl = document.getElementById("order-buy-price");
  if (buyPriceEl) buyPriceEl.value = "";
  const profitBox = document.getElementById("order-profit-preview-box");
  if (profitBox) profitBox.classList.add("hidden");
  document.getElementById("order-extra-color-price").value = "0.30";
  document.getElementById("order-colors-count").value = "1";
  document.getElementById("order-avance-amount").value = "0";
  const totalAmountInput = document.getElementById("order-total-amount");
  if (totalAmountInput) {
    totalAmountInput.value = "";
    totalAmountInput.dataset.baseAmount = "";
    totalAmountInput.dataset.lastFee = "0";
    totalAmountInput.dataset.lastDelivery = "direct";
  }
  const subPriceEl = document.getElementById("order-sub-price");
  if (subPriceEl) subPriceEl.value = "";
  const subQtyEl = document.getElementById("order-sub-qty");
  if (subQtyEl) subQtyEl.value = "1000";
  const subCostEl = document.getElementById("order-sub-cost");
  if (subCostEl) subCostEl.value = "0";
  const subDesigEl = document.getElementById("order-sub-designation");
  if (subDesigEl) subDesigEl.value = "";
  const subSuppEl = document.getElementById("order-sub-supplier");
  if (subSuppEl) subSuppEl.value = "";
  const subProfitEl = document.getElementById("order-sub-profit-preview");
  if (subProfitEl) {
    subProfitEl.textContent = "0.00 درهم";
    subProfitEl.className = "py-2.5 px-3 bg-emerald-50 rounded-xl border border-emerald-200 text-xs font-bold text-[#16B981]";
  }
  
  const maleRadio = document.querySelector('input[name="order-client-gender"][value="male"]');
  if (maleRadio) maleRadio.checked = true;

  const catSelect = document.getElementById("order-sac-category");
  if (catSelect) {
    catSelect.value = "Non Tissé";
  }
  const poigneeRadio = document.querySelector('input[name="order-non-tisse-handle"][value="poignee"]');
  if (poigneeRadio) poigneeRadio.checked = true;
  const torsadeRadio = document.querySelector('input[name="order-kraft-handle"][value="torsade"]');
  if (torsadeRadio) torsadeRadio.checked = true;
  const valiseRadio = document.querySelector('input[name="order-carton-type"][value="valise"]');
  if (valiseRadio) valiseRadio.checked = true;
  const roseRadio = document.querySelector('input[name="order-plastique-color"][value="rose"]');
  if (roseRadio) roseRadio.checked = true;

  const impNameInput = document.getElementById("order-impression-name");
  const impSizeInput = document.getElementById("order-impression-size");
  if (impNameInput) impNameInput.value = "";
  if (impSizeInput) impSizeInput.value = "";

  onSacCategoryChange();
  onColorsCountChange();
  toggleOrderTypeFields();
  toggleDeliveryFields();

  if (window.initOzoneCityDatalist) window.initOzoneCityDatalist();
  if (typeof syncOzoneFeeFromCity === "function") syncOzoneFeeFromCity();

  const autoBuyCheckbox = document.getElementById("order-auto-caisse-buy");
  if (autoBuyCheckbox) autoBuyCheckbox.checked = true;
  const supplierRadio = document.querySelector('input[name="order-bag-source"][value="supplier"]');
  if (supplierRadio) supplierRadio.checked = true;
  toggleBagSourceOptions();

  if (typeof populateOrderStockQuickPicker === "function") populateOrderStockQuickPicker();
  if (typeof updateOrderStockAvailabilityIndicator === "function") updateOrderStockAvailabilityIndicator();

  const stockClientCheckbox = document.getElementById("order-stock-client-enabled");
  if (stockClientCheckbox) stockClientCheckbox.checked = false;
  const stockDetails = document.getElementById("box-stock-client-details");
  if (stockDetails) stockDetails.classList.add("hidden");
  const stockPill = document.getElementById("order-stock-status-pill");
  if (stockPill) stockPill.classList.add("hidden");
  const firstQtyInput = document.getElementById("order-stock-first-qty");
  if (firstQtyInput) firstQtyInput.value = "0";
  const stockPreview = document.getElementById("order-stock-remaining-preview");
  if (stockPreview) stockPreview.textContent = "0 حبة";
  
  document.getElementById("modal-order").classList.remove("hidden");
  lucide.createIcons();
}

function closeOrderModal() {
  document.getElementById("modal-order").classList.add("hidden");
}

function toggleStockClientFields() {
  const isChecked = document.getElementById("order-stock-client-enabled")?.checked;
  const detailsBox = document.getElementById("box-stock-client-details");
  const pill = document.getElementById("order-stock-status-pill");
  const firstQtyInput = document.getElementById("order-stock-first-qty");

  if (isChecked) {
    if (detailsBox) detailsBox.classList.remove("hidden");
    if (pill) pill.classList.remove("hidden");
    if (firstQtyInput) {
      if (firstQtyInput.value === "" || isNaN(parseInt(firstQtyInput.value))) {
        firstQtyInput.value = "0";
      }
    }
  } else {
    if (detailsBox) detailsBox.classList.add("hidden");
    if (pill) pill.classList.add("hidden");
  }
  updateStockClientPreview();
}

function updateStockClientPreview() {
  const isChecked = document.getElementById("order-stock-client-enabled")?.checked;
  if (!isChecked) return;

  const totalQty = parseInt(document.getElementById("order-qty")?.value) || 0;
  const firstQtyInput = document.getElementById("order-stock-first-qty");
  const rawVal = firstQtyInput?.value;
  let firstQty = (rawVal === "" || rawVal === undefined || isNaN(parseInt(rawVal))) ? 0 : parseInt(rawVal);

  if (firstQty > totalQty) {
    firstQty = totalQty;
    if (firstQtyInput) firstQtyInput.value = totalQty;
  }
  if (firstQty < 0) {
    firstQty = 0;
    if (firstQtyInput) firstQtyInput.value = 0;
  }

  const remaining = Math.max(0, totalQty - firstQty);
  const preview = document.getElementById("order-stock-remaining-preview");
  if (preview) {
    preview.innerHTML = `<span class="text-sky-900 font-bold">${remaining} حبة بالورشة</span> <span class="text-[#6B6B6B] text-[10px]">(مسلّم ${firstQty})</span>`;
  }
}

function toggleOrderTypeFields() {
  const type = document.querySelector('input[name="order-type-choice"]:checked')?.value;
  const serigraphieBox = document.getElementById("fields-serigraphie");
  const soustraitanceBox = document.getElementById("fields-soustraitance");
  const labelAutoCaisseBuy = document.getElementById("label-order-auto-caisse-buy");
  const bagSourceContainer = document.getElementById("order-bag-source-container");

  if (type === "soustraitance") {
    serigraphieBox.classList.add("hidden");
    soustraitanceBox.classList.remove("hidden");
    if (labelAutoCaisseBuy) labelAutoCaisseBuy.textContent = "خصم تكلفة المطبعة الشريكة من الصندوق 🏭";
    if (bagSourceContainer) bagSourceContainer.classList.add("hidden");
  } else {
    serigraphieBox.classList.remove("hidden");
    soustraitanceBox.classList.add("hidden");
    if (labelAutoCaisseBuy) labelAutoCaisseBuy.textContent = "خصم ثمن شراء الأكياس من الصندوق للمورد 🏭";
    const isChecked = document.getElementById("order-auto-caisse-buy")?.checked;
    if (bagSourceContainer && isChecked) bagSourceContainer.classList.remove("hidden");
  }
  calculateOrderTotals();
}

function onColorsCountChange() {
  const colorsCount = parseInt(document.getElementById("order-colors-count")?.value) || 1;
  const boxExtraColor = document.getElementById("box-extra-color-price");
  
  if (boxExtraColor) {
    if (colorsCount >= 2) {
      boxExtraColor.classList.remove("hidden");
    } else {
      boxExtraColor.classList.add("hidden");
    }
  }
  calculateOrderTotals();
}

function toggleDeliveryFields() {
  const delivery = document.querySelector('input[name="order-delivery-choice"]:checked')?.value;
  const localBox = document.getElementById("fields-local-delivery");
  const ozoneBox = document.getElementById("fields-ozone");

  if (delivery === "local") {
    if (localBox) localBox.classList.remove("hidden");
    if (ozoneBox) ozoneBox.classList.add("hidden");
  } else if (delivery === "ozone") {
    if (localBox) localBox.classList.add("hidden");
    if (ozoneBox) ozoneBox.classList.remove("hidden");
    syncOzoneFeeFromCity();
  } else {
    if (localBox) localBox.classList.add("hidden");
    if (ozoneBox) ozoneBox.classList.add("hidden");
  }
  calculateOrderTotals();
}

function syncOzoneFeeFromCity() {
  const cityInput = document.getElementById("order-client-city");
  const ozoneFeesInput = document.getElementById("order-ozone-fees");
  const cityVal = cityInput ? cityInput.value.trim() : "";
  const delivery = document.querySelector('input[name="order-delivery-choice"]:checked')?.value;

  if (window.getOzoneDeliveryFee) {
    const result = window.getOzoneDeliveryFee(cityVal);
    const citySpan = document.getElementById("ozone-detected-city");
    const rateSpan = document.getElementById("ozone-detected-rate");
    const zoneSpan = document.getElementById("ozone-detected-zone");

    if (citySpan) citySpan.textContent = result.detectedCity || (cityVal || "أكادير (الافتراضية)");
    if (rateSpan) rateSpan.textContent = result.fee.toFixed(2) + " درهم";
    if (zoneSpan) zoneSpan.textContent = result.zone || "";

    if (delivery === "ozone" && ozoneFeesInput) {
      ozoneFeesInput.value = result.fee;
      calculateOrderTotals();
    }
  }
}

function setQuickOzoneCity(cityName, fee) {
  const cityInput = document.getElementById("order-client-city");
  const ozoneRadio = document.querySelector('input[name="order-delivery-choice"][value="ozone"]');
  if (cityInput) cityInput.value = cityName;
  if (ozoneRadio) {
    ozoneRadio.checked = true;
    toggleDeliveryFields();
  }
  const ozoneFeesInput = document.getElementById("order-ozone-fees");
  if (ozoneFeesInput && fee !== undefined) {
    ozoneFeesInput.value = fee;
  }
  syncOzoneFeeFromCity();
  calculateOrderTotals();
}

function toggleBagSourceOptions() {
  const isChecked = document.getElementById("order-auto-caisse-buy")?.checked;
  const container = document.getElementById("order-bag-source-container");
  if (container) {
    if (isChecked) {
      container.classList.remove("hidden");
    } else {
      container.classList.add("hidden");
    }
  }
  updateBagCostPreview();
}

function updateBagCostPreview() {
  const type = document.querySelector('input[name="order-type-choice"]:checked')?.value;
  const isChecked = document.getElementById("order-auto-caisse-buy")?.checked;
  const bagSource = document.querySelector('input[name="order-bag-source"]:checked')?.value || "supplier";
  const previewEl = document.getElementById("order-bag-cost-preview");
  const box = document.getElementById("box-order-caisse-buy");

  let cost = 0;
  if (type === "soustraitance") {
    cost = parseFloat(document.getElementById("order-sub-cost")?.value) || 0;
  } else {
    const qty = parseFloat(document.getElementById("order-qty")?.value) || 0;
    const buyPrice = parseFloat(document.getElementById("order-buy-price")?.value) || 0;
    cost = qty * buyPrice;
  }

  if (box) {
    if (cost > 0) {
      box.classList.remove("hidden");
    } else {
      box.classList.add("hidden");
    }
  }

  if (previewEl) {
    if (!isChecked) {
      previewEl.textContent = "غير مفعّل (0.00 د)";
      previewEl.className = "text-xs font-bold text-[#6B6B6B] bg-gray-100 px-2.5 py-1 rounded-lg border border-gray-200 font-mono";
    } else if (type !== "soustraitance" && bagSource === "stock") {
      previewEl.textContent = "0.00 درهم (من المخزون)";
      previewEl.className = "text-xs font-bold text-[#C9A227] bg-[#FAF6EA] px-2.5 py-1 rounded-lg border border-[#E8DCB5] font-mono";
    } else {
      previewEl.textContent = `-${cost.toFixed(2)} درهم`;
      previewEl.className = "text-xs font-black text-[#EF4444] bg-rose-50 px-2.5 py-1 rounded-lg border border-rose-200 font-mono";
    }
  }
}

function calculateOrderTotals() {
  const type = document.querySelector('input[name="order-type-choice"]:checked')?.value;
  const totalInput = document.getElementById("order-total-amount");
  const avanceInput = document.getElementById("order-avance-amount");
  const resteDisplay = document.getElementById("order-reste-display");

  // 1. حساب مصاريف التوصيل المحددة حالياً
  let deliveryFee = 0;
  const delivery = document.querySelector('input[name="order-delivery-choice"]:checked')?.value;
  if (delivery === "local") {
    deliveryFee = parseFloat(document.getElementById("order-local-delivery-fee")?.value) || 0;
  } else if (delivery === "ozone") {
    deliveryFee = parseFloat(document.getElementById("order-ozone-fees")?.value) || 0;
  }

  let total = 0;

  if (type === "serigraphie") {
    const qty = parseFloat(document.getElementById("order-qty")?.value) || 0;
    const unitPrice = parseFloat(document.getElementById("order-unit-price")?.value) || 0;
    const buyPrice = parseFloat(document.getElementById("order-buy-price")?.value) || 0;
    const colorsCount = parseInt(document.getElementById("order-colors-count")?.value) || 1;
    const extraColorPrice = parseFloat(document.getElementById("order-extra-color-price")?.value) || 0;
    const extraColorsCount = Math.max(0, colorsCount - 1);

    const baseAmount = qty * unitPrice;
    const extraColorAmount = qty * extraColorPrice * extraColorsCount;

    // إذا تم إدخال ثمن الحبة
    if (unitPrice > 0) {
      total = baseAmount + extraColorAmount + deliveryFee;
      if (totalInput) {
        totalInput.value = total.toFixed(2);
        totalInput.dataset.baseAmount = (baseAmount + extraColorAmount).toFixed(2);
      }
    } else {
      // إذا أدخل المستخدم المبلغ الإجمالي يدوياً بدون ثمن الحبة
      let base = parseFloat(totalInput?.dataset?.baseAmount);
      if (isNaN(base) || base <= 0) {
        const currentVal = parseFloat(totalInput?.value) || 0;
        const lastFee = parseFloat(totalInput?.dataset?.lastFee) || 0;
        base = Math.max(0, currentVal - lastFee);
        if (base > 0 && totalInput) totalInput.dataset.baseAmount = base.toFixed(2);
      }
      if (base > 0) {
        total = base + deliveryFee;
        if (totalInput) totalInput.value = total.toFixed(2);
      }
    }

    if (totalInput) {
      totalInput.dataset.lastDelivery = delivery;
      totalInput.dataset.lastFee = deliveryFee;
    }

    const noteEl = document.getElementById("extra-color-calc-note");
    let calcNotes = [];
    if (extraColorsCount > 0) {
      calcNotes.push(`اللون الإضافي: ${extraColorPrice} درهم × ${extraColorsCount} لون × ${qty} حبة = +${extraColorAmount.toFixed(2)} درهم`);
    }
    if (deliveryFee > 0) {
      calcNotes.push(`مصاريف ${delivery === 'ozone' ? 'أوزون' : 'التوصيل'}: +${deliveryFee.toFixed(2)} درهم`);
    }
    if (noteEl) {
      if (calcNotes.length > 0) {
        noteEl.textContent = `حساب إضافي: ${calcNotes.join(' | ')}`;
        noteEl.classList.remove("hidden");
      } else {
        noteEl.textContent = "";
        noteEl.classList.add("hidden");
      }
    }

    // بطاقة المعاينة الفورية للربح الصافي في الطلبية
    const profitBox = document.getElementById("order-profit-preview-box");
    const unitProfitEl = document.getElementById("order-profit-unit");
    const totalProfitEl = document.getElementById("order-profit-total");

    if (profitBox && unitProfitEl && totalProfitEl) {
      const isImpressionSeule = (document.getElementById("order-sac-category")?.value === "Impression Seule");
      if ((buyPrice > 0 || isImpressionSeule) && unitPrice > 0) {
        const extraPerBag = extraColorsCount * extraColorPrice;
        const sellingPricePerUnit = unitPrice + extraPerBag;
        const effectiveBuyPrice = isImpressionSeule ? 0 : buyPrice;
        const unitProfit = sellingPricePerUnit - effectiveBuyPrice;
        const totalProfit = unitProfit * qty;

        unitProfitEl.textContent = `الربح/حبة: ${unitProfit >= 0 ? '+' : ''}${unitProfit.toFixed(2)} درهم`;
        unitProfitEl.className = unitProfit >= 0 ? "text-xs text-emerald-400 font-bold" : "text-xs text-red-400 font-bold";

        totalProfitEl.textContent = `الربح الإجمالي: ${totalProfit >= 0 ? '+' : ''}${totalProfit.toFixed(2)} درهم`;
        totalProfitEl.className = totalProfit >= 0 
          ? "text-xs text-emerald-300 font-black bg-emerald-500/20 px-2.5 py-1 rounded-lg border border-emerald-500/30" 
          : "text-xs text-red-300 font-black bg-red-500/20 px-2.5 py-1 rounded-lg border border-red-500/30";

        profitBox.classList.remove("hidden");
      } else {
        profitBox.classList.add("hidden");
      }
    }
  } else if (type === "soustraitance") {
    const profitBox = document.getElementById("order-profit-preview-box");
    if (profitBox) profitBox.classList.add("hidden");

    const cost = parseFloat(document.getElementById("order-sub-cost")?.value) || 0;
    const subPriceInput = document.getElementById("order-sub-price");
    let basePrice = parseFloat(subPriceInput?.value) || 0;

    // إذا لم يملأ المستخدم خانة سعر البيع للخدمة ولكن كان قد أدخل المجموع مسبقاً
    if (basePrice === 0) {
      let storedBase = parseFloat(totalInput?.dataset?.baseAmount);
      if (isNaN(storedBase) || storedBase <= 0) {
        const currentVal = parseFloat(totalInput?.value) || 0;
        const lastFee = parseFloat(totalInput?.dataset?.lastFee) || 0;
        storedBase = Math.max(0, currentVal - lastFee);
      }
      if (storedBase > 0) {
        basePrice = storedBase;
        if (subPriceInput) subPriceInput.value = basePrice;
      }
    }

    if (basePrice > 0) {
      total = basePrice + deliveryFee;
      if (totalInput) {
        totalInput.value = total.toFixed(2);
        totalInput.dataset.baseAmount = basePrice.toFixed(2);
      }
    } else {
      total = parseFloat(totalInput?.value) || 0;
    }

    if (totalInput) {
      totalInput.dataset.lastDelivery = delivery;
      totalInput.dataset.lastFee = deliveryFee;
    }

    const profitPreview = document.getElementById("order-sub-profit-preview");
    const netProfit = (basePrice > 0 ? basePrice : Math.max(0, total - deliveryFee)) - cost;
    if (profitPreview) {
      profitPreview.textContent = `${netProfit >= 0 ? '+' : ''}${netProfit.toFixed(2)} درهم`;
      profitPreview.className = netProfit >= 0 ? "py-2.5 px-3 bg-emerald-50 rounded-xl border border-emerald-200 text-xs font-black text-[#16B981]" : "py-2.5 px-3 bg-rose-50 rounded-xl border border-rose-200 text-xs font-black text-[#EF4444]";
    }
  } else {
    total = parseFloat(totalInput?.value) || 0;
  }

  const avance = parseFloat(avanceInput?.value) || 0;
  const currentTotal = parseFloat(totalInput?.value) || total;
  const reste = Math.max(0, currentTotal - avance);

  if (resteDisplay) {
    resteDisplay.textContent = `${reste.toFixed(2)} درهم`;
  }

  const deliveryChoice = document.querySelector('input[name="order-delivery-choice"]:checked')?.value;
  const ozoneCaisseNoteEl = document.getElementById("order-caisse-advance-note");
  if (ozoneCaisseNoteEl) {
    if (deliveryChoice === "ozone") {
      const ozoneFee = parseFloat(document.getElementById("order-ozone-fees")?.value) || 0;
      const workshopShare = Math.max(0, currentTotal - ozoneFee);
      ozoneCaisseNoteEl.innerHTML = `💡 <span class="font-bold text-[#C9A227]">عزل مصاريف التوصيل:</span> يُسجل في الصندوق حصة الورشة فقط (أقصى مبلغ: ${workshopShare.toFixed(2)} د). مصاريف أوزون (${ozoneFee.toFixed(2)} د) معزولة تماماً ولا تدخل الصندوق.`;
      ozoneCaisseNoteEl.classList.remove("hidden");
    } else {
      ozoneCaisseNoteEl.classList.add("hidden");
    }
  }

  updateBagCostPreview();
  if (typeof updateOrderStockAvailabilityIndicator === "function") {
    updateOrderStockAvailabilityIndicator();
  }
}

function calculateResteOnly() {
  const totalInput = document.getElementById("order-total-amount");
  const avanceInput = document.getElementById("order-avance-amount");
  const resteDisplay = document.getElementById("order-reste-display");

  const total = parseFloat(totalInput.value) || 0;
  const avance = parseFloat(avanceInput.value) || 0;
  const reste = Math.max(0, total - avance);

  if (resteDisplay) {
    resteDisplay.textContent = `${reste.toFixed(2)} درهم`;
  }

  const type = document.querySelector('input[name="order-type-choice"]:checked')?.value;
  const delivery = document.querySelector('input[name="order-delivery-choice"]:checked')?.value;
  let deliveryFee = 0;
  if (delivery === "local") {
    deliveryFee = parseFloat(document.getElementById("order-local-delivery-fee")?.value) || 0;
  } else if (delivery === "ozone") {
    deliveryFee = parseFloat(document.getElementById("order-ozone-fees")?.value) || 0;
  }

  // عند تعديل المجموع يدوياً، حفظ السعر الأساسي للخدمة بدون مصاريف التوصيل
  const base = Math.max(0, total - deliveryFee);
  if (totalInput) totalInput.dataset.baseAmount = base.toFixed(2);

  if (type === "soustraitance") {
    const subPriceInput = document.getElementById("order-sub-price");
    if (subPriceInput && base > 0) {
      subPriceInput.value = base;
    }
    const cost = parseFloat(document.getElementById("order-sub-cost")?.value) || 0;
    const profitPreview = document.getElementById("order-sub-profit-preview");
    const netProfit = base - cost;
    if (profitPreview) {
      profitPreview.textContent = `${netProfit >= 0 ? '+' : ''}${netProfit.toFixed(2)} درهم`;
      profitPreview.className = netProfit >= 0 ? "py-2.5 px-3 bg-emerald-50 rounded-xl border border-emerald-200 text-xs font-black text-[#16B981]" : "py-2.5 px-3 bg-rose-50 rounded-xl border border-rose-200 text-xs font-black text-[#EF4444]";
    }
  }

  const ozoneCaisseNoteEl = document.getElementById("order-caisse-advance-note");
  if (ozoneCaisseNoteEl) {
    if (delivery === "ozone") {
      const workshopShare = Math.max(0, total - deliveryFee);
      ozoneCaisseNoteEl.innerHTML = `💡 <span class="font-bold text-[#C9A227]">عزل مصاريف التوصيل:</span> يُسجل في الصندوق حصة الورشة فقط (أقصى مبلغ: ${workshopShare.toFixed(2)} د). مصاريف أوزون (${deliveryFee.toFixed(2)} د) معزولة تماماً ولا تدخل الصندوق.`;
      ozoneCaisseNoteEl.classList.remove("hidden");
    } else {
      ozoneCaisseNoteEl.classList.add("hidden");
    }
  }
}

function handleOrderSubmit(e) {
  if (e && typeof e.preventDefault === "function") e.preventDefault();
  try {
    const editId = document.getElementById("order-edit-id")?.value || "";
    const type = document.querySelector('input[name="order-type-choice"]:checked')?.value || "serigraphie";
    const deliveryType = document.querySelector('input[name="order-delivery-choice"]:checked')?.value || "direct";

    const clientName = document.getElementById("order-client-name")?.value.trim() || "";
    const clientPhone = document.getElementById("order-client-phone")?.value.trim() || "";
    const clientCity = document.getElementById("order-client-city")?.value.trim() || "";
    const clientGender = document.querySelector('input[name="order-client-gender"]:checked')?.value || 'male';

    let designation = "";
    let sacCategory = "";
    let sacSize = "";
    let impressionName = "";
    let impressionSize = "";
    let subSupplier = "";
    let subCost = 0;
    let colorsCount = "1";
    let unitPrice = 0;
    let buyPrice = 0;
    let extraColorPrice = 0;
    let quantity = 0;
    let netProfit = 0;

    let handleType = "";
    let kraftHandle = "";
    let cartonType = "";
    let plastiqueColor = "";
    let subPrice = 0;

    if (type === "soustraitance") {
      designation = document.getElementById("order-sub-designation").value.trim() || "كروت فيزيت";
      subSupplier = document.getElementById("order-sub-supplier").value.trim();
      subCost = parseFloat(document.getElementById("order-sub-cost").value) || 0;
      subPrice = parseFloat(document.getElementById("order-sub-price")?.value) || 0;
      quantity = parseInt(document.getElementById("order-sub-qty")?.value) || (parseInt(document.getElementById("order-qty").value) || 1000);
      unitPrice = (quantity > 0 && subPrice > 0) ? (subPrice / quantity) : subPrice;
      buyPrice = (quantity > 0 && subCost > 0) ? (subCost / quantity) : subCost;
      colorsCount = "مطبعة خارجية";
    } else {
      sacCategory = document.getElementById("order-sac-category")?.value || "Non Tissé";
      let subTypeLabel = "";

      if (sacCategory === "Impression Seule") {
        impressionName = document.getElementById("order-impression-name")?.value.trim() || "طباعة سيريغرافي";
        impressionSize = document.getElementById("order-impression-size")?.value.trim() || "قياس مخصص";
        sacSize = impressionSize;
        subTypeLabel = impressionName;
        designation = `طباعة فقط: ${impressionName} (${impressionSize})`;
      } else {
        if (sacCategory === "Non Tissé") {
          handleType = document.querySelector('input[name="order-non-tisse-handle"]:checked')?.value || "poignee";
          subTypeLabel = handleType === "anses" ? "Ance" : "Poignée";
        } else if (sacCategory === "Kraft") {
          kraftHandle = document.querySelector('input[name="order-kraft-handle"]:checked')?.value || "torsade";
          subTypeLabel = kraftHandle === "plat" ? "Plat" : "Torsadé";
          handleType = kraftHandle;
        } else if (sacCategory === "Carton") {
          cartonType = document.querySelector('input[name="order-carton-type"]:checked')?.value || "valise";
          subTypeLabel = cartonType === "americaine" ? "Caisse américaine" : "Boîte valise";
          handleType = cartonType;
        } else if (sacCategory === "Plastique") {
          plastiqueColor = document.querySelector('input[name="order-plastique-color"]:checked')?.value || "rose";
          subTypeLabel = plastiqueColor.toUpperCase();
          handleType = plastiqueColor;
        }

        const sizeVal = document.getElementById("order-sac-size")?.value || "";
        if (sizeVal === "custom") {
          sacSize = document.getElementById("order-sac-custom-size")?.value.trim() || "قياس مخصص";
        } else {
          sacSize = sizeVal;
        }
        designation = subTypeLabel ? `${sacCategory} (${subTypeLabel} - ${sacSize})` : `${sacCategory} (${sacSize})`;
      }

      quantity = parseInt(document.getElementById("order-qty").value) || 500;
      unitPrice = parseFloat(document.getElementById("order-unit-price").value) || 0;
      buyPrice = (sacCategory === "Impression Seule") ? 0 : (parseFloat(document.getElementById("order-buy-price")?.value) || 0);
      colorsCount = document.getElementById("order-colors-count").value;
      extraColorPrice = (parseInt(colorsCount) >= 2) ? (parseFloat(document.getElementById("order-extra-color-price").value) || 0) : 0;
    }

    const totalAmount = parseFloat(document.getElementById("order-total-amount").value) || 0;
    const avanceAmount = parseFloat(document.getElementById("order-avance-amount").value) || 0;
    const resteAmount = Math.max(0, totalAmount - avanceAmount);
    const status = document.getElementById("order-status").value;
    const notes = document.getElementById("order-notes").value.trim();

    if (type === "soustraitance") {
      const ozoneFee = deliveryType === "ozone" ? (parseFloat(document.getElementById("order-ozone-fees")?.value) || 35) : 0;
      const localFee = deliveryType === "local" ? (parseFloat(document.getElementById("order-local-delivery-fee")?.value) || 0) : 0;
      const totalDeliveryFee = ozoneFee + localFee;
      netProfit = Math.max(0, (totalAmount - totalDeliveryFee) - subCost);
    } else if (sacCategory === "Impression Seule") {
      const extraColorsCount = Math.max(0, (parseInt(colorsCount) || 1) - 1);
      const sellingPricePerUnit = unitPrice + (extraColorsCount * extraColorPrice);
      netProfit = sellingPricePerUnit * quantity;
    } else if (buyPrice > 0) {
      const extraColorsCount = Math.max(0, (parseInt(colorsCount) || 1) - 1);
      const sellingPricePerUnit = unitPrice + (extraColorsCount * extraColorPrice);
      netProfit = (sellingPricePerUnit - buyPrice) * quantity;
    }

  let ozoneTracking = "";
  let ozoneFees = 0;
  let ozoneTransferStatus = "";
  let localLivreur = "";
  let localDeliveryFee = 0;

  if (deliveryType === "ozone") {
    ozoneTracking = document.getElementById("order-ozone-tracking").value.trim();
    ozoneFees = parseFloat(document.getElementById("order-ozone-fees").value) || 35;
    ozoneTransferStatus = "pending_transfer";
  } else if (deliveryType === "local") {
    localLivreur = document.getElementById("order-local-livreur")?.value.trim() || "توصيل محلي خاص";
    localDeliveryFee = parseFloat(document.getElementById("order-local-delivery-fee")?.value) || 0;
  }

  const autoCaisse = document.getElementById("order-auto-caisse").checked;
  let autoCaisseBuy = document.getElementById("order-auto-caisse-buy")?.checked;
  if (sacCategory === "Impression Seule") {
    autoCaisseBuy = false;
  }
  const bagSource = (sacCategory === "Impression Seule") ? "external" : (document.querySelector('input[name="order-bag-source"]:checked')?.value || "supplier");
  const totalBagCost = (type === "soustraitance") ? subCost : ((sacCategory === "Impression Seule") ? 0 : (quantity * buyPrice));

  const isStockClient = document.getElementById("order-stock-client-enabled")?.checked || false;
  let firstStockQty = isStockClient ? (parseInt(document.getElementById("order-stock-first-qty")?.value) || 0) : quantity;
  if (firstStockQty > quantity) firstStockQty = quantity;
  if (firstStockQty < 0) firstStockQty = 0;

  if (editId) {
    const index = state.orders.findIndex(o => o.id === editId);
    if (index !== -1) {
      const existingOrder = state.orders[index];
      const oldAvance = Number(existingOrder.avanceAmount || 0);
      const updatedDeliveredQty = isStockClient 
        ? (existingOrder.deliveredQuantity !== undefined ? existingOrder.deliveredQuantity : firstStockQty) 
        : quantity;
      const updatedRemainingQty = isStockClient ? Math.max(0, quantity - updatedDeliveredQty) : 0;
      const existingDeliveries = existingOrder.deliveries || [];

      // إذا كانت الطلبية السابقة قد خصمت من المخزون، نرجع الكمية السابقة أولاً
      if (existingOrder.bagSource === "stock" && existingOrder.stockItemId) {
        const prevStock = state.stock.find(s => s.id === existingOrder.stockItemId);
        if (prevStock) {
          prevStock.quantity = Number(prevStock.quantity || 0) + Number(existingOrder.quantity || 0);
        }
      }

      let currentStockItemId = "";
      if (type === "serigraphie" && bagSource === "stock") {
        const matchedStockId = document.getElementById("box-order-stock-indicator")?.dataset.matchedStockId || "";
        const matchedStock = (matchedStockId ? state.stock.find(s => s.id === matchedStockId) : null) || findMatchingStockItem(sacCategory, handleType, sacSize);
        if (matchedStock) {
          matchedStock.quantity = Math.max(0, Number(matchedStock.quantity || 0) - quantity);
          currentStockItemId = matchedStock.id;
        }
      }

      state.orders[index] = {
        ...state.orders[index],
        clientName,
        clientPhone,
        clientCity,
        clientGender,
        type,
        sacCategory,
        handleType,
        kraftHandle,
        cartonType,
        plastiqueColor,
        sacSize,
        designation,
        impressionName: (sacCategory === "Impression Seule") ? impressionName : "",
        impressionSize: (sacCategory === "Impression Seule") ? impressionSize : "",
        subSupplier,
        subCost,
        subPrice,
        quantity,
        unitPrice,
        buyPrice,
        netProfit,
        colorsCount,
        extraColorPrice,
        totalAmount,
        avanceAmount,
        resteAmount,
        deliveryType,
        localLivreur,
        localDeliveryFee,
        ozoneTracking,
        ozoneFees,
        status,
        notes,
        bagSource,
        bagCost: totalBagCost,
        autoCaisseBuyLogged: autoCaisseBuy,
        stockItemId: currentStockItemId,
        isStockClient,
        deliveredQuantity: updatedDeliveredQty,
        remainingQuantity: updatedRemainingQty,
        deliveries: existingDeliveries
      };

      // 1. مزامنة معاملة العربون (حصّة الورشة فقط، مع عزل مصاريف أوزون)
      if (autoCaisse && oldAvance !== avanceAmount) {
        const ozoneFeeVal = (deliveryType === "ozone") ? (parseFloat(document.getElementById("order-ozone-fees")?.value) || 35) : 0;
        const workshopMaxAmount = Math.max(0, totalAmount - ozoneFeeVal);
        const caisseAvanceAmount = Math.min(avanceAmount, workshopMaxAmount);

        const caisseTrx = state.caisse.find(t => (t.orderId === editId || t.description?.includes(editId)) && t.category === "avance_cmd");
        if (caisseTrx) {
          caisseTrx.amount = caisseAvanceAmount;
          caisseTrx.description = `عربون طلبية ${editId} (${clientName})`;
        } else if (caisseAvanceAmount > 0) {
          state.caisse.push({
            id: `trx_${Date.now()}`,
            type: "entree",
            category: "avance_cmd",
            amount: caisseAvanceAmount,
            description: `عربون طلبية ${editId} (${clientName})`,
            paymentMethod: "especes",
            date: new Date().toISOString().split("T")[0],
            orderId: editId
          });
        }
      }

      // 2. مزامنة معاملة شراء الأكياس من المورد
      const buyCategory = type === "soustraitance" ? "soustraitance" : "matieres";
      const caisseBuyTrx = state.caisse.find(t => (t.orderId === editId || t.description?.includes(editId)) && (t.category === "matieres" || t.category === "soustraitance") && t.type === "sortie");

      if (autoCaisseBuy && (bagSource === "supplier" || type === "soustraitance") && totalBagCost > 0) {
        const desc = type === "soustraitance"
          ? `تكلفة مطبعة شريكة طلبية ${editId} (${designation}) - ${subSupplier || 'مطبعة'}`
          : `شراء أكياس خام طلبية ${editId} (${quantity} حبة × ${buyPrice} د) - ${clientName}`;

        if (caisseBuyTrx) {
          caisseBuyTrx.amount = totalBagCost;
          caisseBuyTrx.description = desc;
          caisseBuyTrx.category = buyCategory;
        } else {
          state.caisse.push({
            id: `trx_buy_${Date.now()}`,
            type: "sortie",
            category: buyCategory,
            amount: totalBagCost,
            description: desc,
            paymentMethod: "especes",
            date: new Date().toISOString().split("T")[0],
            orderId: editId,
            isBagPurchase: true
          });
        }
      } else if (caisseBuyTrx) {
        state.caisse = state.caisse.filter(t => t.id !== caisseBuyTrx.id);
      }
    }
  } else {
    const newId = getNextOrderId();
    const today = new Date().toISOString().split("T")[0];

    const initialRemaining = isStockClient ? Math.max(0, quantity - firstStockQty) : 0;
    const initialDeliveries = (isStockClient && firstStockQty > 0) ? [{
      id: `deliv_init_${Date.now()}`,
      date: today,
      quantity: firstStockQty,
      paidAmount: avanceAmount,
      deliveryType: deliveryType,
      notes: "الدفعة الأولى عند تسجيل الطلبية"
    }] : [];

    let initialStatus = status;
    if (isStockClient && initialRemaining > 0 && status !== "retour") {
      initialStatus = "partielle";
    }

    const newOrder = {
      id: newId,
      clientName,
      clientPhone,
      clientCity,
      clientGender,
      type,
      sacCategory,
      handleType,
      kraftHandle,
      cartonType,
      plastiqueColor,
      sacSize,
      designation,
      impressionName: (sacCategory === "Impression Seule") ? impressionName : "",
      impressionSize: (sacCategory === "Impression Seule") ? impressionSize : "",
      subSupplier,
      subCost,
      subPrice,
      quantity,
      unitPrice,
      buyPrice,
      netProfit,
      colorsCount,
      extraColorPrice,
      totalAmount,
      avanceAmount,
      resteAmount,
      deliveryType,
      localLivreur,
      localDeliveryFee,
      ozoneTracking,
      ozoneFees,
      ozoneTransferStatus,
      status: initialStatus,
      notes,
      date: today,
      autoCaisseLogged: autoCaisse,
      bagSource,
      bagCost: totalBagCost,
      autoCaisseBuyLogged: autoCaisseBuy,
      stockItemId: "",
      isStockClient,
      deliveredQuantity: isStockClient ? firstStockQty : quantity,
      remainingQuantity: initialRemaining,
      deliveries: initialDeliveries
    };

    state.orders.push(newOrder);

    // 1. تسجيل العربون كمدخول بالصندوق (حصّة الورشة فقط، بدون مصاريف أوزون)
    const ozoneFeeVal = (deliveryType === "ozone") ? ozoneFees : 0;
    const workshopOrderMax = Math.max(0, totalAmount - ozoneFeeVal);
    const caisseAvanceAmount = Math.min(avanceAmount, workshopOrderMax);

    if (autoCaisse && caisseAvanceAmount > 0) {
      state.caisse.push({
        id: `trx_${Date.now()}`,
        type: "entree",
        category: "avance_cmd",
        amount: caisseAvanceAmount,
        description: `عربون طلبية ${newId} (${clientName})`,
        paymentMethod: "especes",
        date: today,
        orderId: newId
      });
    }

    // 2. تسجيل مصاريف شراء الأكياس من المورد كخروج من الصندوق
    if (autoCaisseBuy && (bagSource === "supplier" || type === "soustraitance") && totalBagCost > 0) {
      const buyCategory = type === "soustraitance" ? "soustraitance" : "matieres";
      const desc = type === "soustraitance"
        ? `تكلفة مطبعة شريكة طلبية ${newId} (${designation}) - ${subSupplier || 'مطبعة'}`
        : `شراء أكياس خام طلبية ${newId} (${quantity} حبة × ${buyPrice} د) - ${clientName}`;

      state.caisse.push({
        id: `trx_buy_${Date.now()}`,
        type: "sortie",
        category: buyCategory,
        amount: totalBagCost,
        description: desc,
        paymentMethod: "especes",
        date: today,
        orderId: newId,
        isBagPurchase: true
      });
    }

    // 3. خصم الكمية من المخزون في حال كان المصدر هو المخزون
    if (type === "serigraphie" && bagSource === "stock") {
      const matchedStockId = document.getElementById("box-order-stock-indicator")?.dataset.matchedStockId || "";
      const matchedStock = (matchedStockId ? state.stock.find(s => s.id === matchedStockId) : null) || findMatchingStockItem(sacCategory, handleType, sacSize);
      if (matchedStock) {
        matchedStock.quantity = Math.max(0, Number(matchedStock.quantity || 0) - quantity);
        newOrder.stockItemId = matchedStock.id;
      }
    }
  }

    saveData();
    closeOrderModal();
    renderAll();
  } catch (err) {
    console.error("Error in handleOrderSubmit:", err);
    alert("حدث خطأ أثناء حفظ الطلبية: " + err.message);
  }
}

function updateOrderStatus(orderId, newStatus) {
  const order = state.orders.find(o => o.id === orderId);
  if (!order) return;

  const oldStatus = order.status;
  order.status = newStatus;

  if (newStatus === "livree" && oldStatus !== "livree") {
    const reste = Math.max(0, Number(order.totalAmount || 0) - Number(order.avanceAmount || 0));
    
    if ((order.deliveryType === "direct" || order.deliveryType === "local") && reste > 0) {
      const delivTypeLabel = order.deliveryType === "local" ? "التوصيل المحلي" : "التسليم بالورشة";
      if (confirm(`تم تسليم الطلبية عبر ${delivTypeLabel}. هل تريد تسجيل استلام باقي المبلغ (${reste} درهم) كمدخول في الصندوق؟`)) {
        order.avanceAmount = order.totalAmount;
        order.resteAmount = 0;
        state.caisse.push({
          id: `trx_${Date.now()}`,
          type: "entree",
          category: "solde_cmd",
          amount: reste,
          description: `استخلاص باقي طلبية ${order.id} عبر ${delivTypeLabel} (${order.clientName})`,
          paymentMethod: "especes",
          date: new Date().toISOString().split("T")[0]
        });
      }
    } else if (order.deliveryType === "ozone") {
      order.ozoneTransferStatus = "pending_transfer";
    }

    // اقتراح ضبط عدّاد تذكير الزبون بإعادة طلب الأكياس تلقائياً فور التسليم
    if (!order.countdown || !order.countdown.targetDate) {
      setTimeout(() => {
        if (confirm(`📦 تم تسليم الطلبية بنجاح! هل تريد ضبط عدّاد تذكير ${getClientTitle(order.clientGender)} ${order.clientName} بإعادة طلب الأكياس تلقائياً؟`)) {
          openCountdownModal(orderId);
        }
      }, 300);
    }
  }

  saveData();
  renderAll();
}

function editOrder(orderId) {
  const order = state.orders.find(o => o.id === orderId);
  if (!order) return;

  openNewOrderModal();
  document.getElementById("modal-order-title").textContent = `تعديل الطلبية (${order.id})`;
  document.getElementById("order-edit-id").value = order.id;

  const gender = order.clientGender || "male";
  const genderRadio = document.querySelector(`input[name="order-client-gender"][value="${gender}"]`);
  if (genderRadio) genderRadio.checked = true;

  document.getElementById("order-client-name").value = order.clientName;
  document.getElementById("order-client-phone").value = order.clientPhone;
  document.getElementById("order-client-city").value = order.clientCity;

  const typeRadios = document.getElementsByName("order-type-choice");
  for (let r of typeRadios) {
    if (r.value === (order.type || "serigraphie")) r.checked = true;
  }
  toggleOrderTypeFields();

  if (order.type === "soustraitance") {
    document.getElementById("order-sub-designation").value = order.designation || "";
    document.getElementById("order-sub-supplier").value = order.subSupplier || "";
    document.getElementById("order-sub-cost").value = order.subCost || 0;
    const subQtyInput = document.getElementById("order-sub-qty");
    if (subQtyInput) subQtyInput.value = order.quantity || 1000;
    const ozoneFeeVal = (order.deliveryType === "ozone") ? Number(order.ozoneFees || 0) : 0;
    const localFeeVal = (order.deliveryType === "local") ? Number(order.localDeliveryFee || 0) : 0;
    const baseServicePrice = Math.max(0, Number(order.totalAmount || 0) - ozoneFeeVal - localFeeVal);
    const subPriceInput = document.getElementById("order-sub-price");
    if (subPriceInput) subPriceInput.value = order.subPrice || (baseServicePrice > 0 ? baseServicePrice : "");
  } else {
    let cat = order.sacCategory;
    let size = order.sacSize;

    if (!cat && order.designation) {
      if (order.designation.includes("Non Tissé")) cat = "Non Tissé";
      else if (order.designation.includes("Kraft") || order.designation.includes("كرافت")) cat = "Kraft";
      else if (order.designation.includes("Papier Luxe") || order.designation.includes("ورق فاخر") || order.designation.includes("Luxe")) cat = "Papier Luxe";
      else if (order.designation.includes("Carton") || order.designation.includes("كرتون")) cat = "Carton";
      else if (order.designation.includes("Plastique") || order.designation.includes("بلاستيك")) cat = "Plastique";
      else if (order.designation.includes("Ruban") || order.designation.includes("ريبان") || order.designation.includes("ريبو")) cat = "Ruban";
      else if (order.designation.includes("Impression Seule") || order.designation.includes("طباعة فقط")) cat = "Impression Seule";
      else cat = "Non Tissé";
    }
    cat = cat || "Non Tissé";

    const catSelect = document.getElementById("order-sac-category");
    if (catSelect) {
      catSelect.value = cat;
    }

    if (cat === "Non Tissé") {
      const isAnses = order.handleType === "anses" || (order.designation && (order.designation.includes("معلقة") || order.designation.includes("Anses") || order.designation.includes("Ance")));
      const handleRadio = document.querySelector(`input[name="order-non-tisse-handle"][value="${isAnses ? 'anses' : 'poignee'}"]`);
      if (handleRadio) handleRadio.checked = true;
    } else if (cat === "Kraft") {
      const isPlat = order.kraftHandle === "plat" || (order.designation && (order.designation.toLowerCase().includes("plat") || order.designation.includes("مسطحة")));
      const handleRadio = document.querySelector(`input[name="order-kraft-handle"][value="${isPlat ? 'plat' : 'torsade'}"]`);
      if (handleRadio) handleRadio.checked = true;
    } else if (cat === "Carton") {
      const isAmericaine = order.cartonType === "americaine" || (order.designation && (order.designation.toLowerCase().includes("américaine") || order.designation.toLowerCase().includes("americaine") || order.designation.includes("caisse")));
      const typeRadio = document.querySelector(`input[name="order-carton-type"][value="${isAmericaine ? 'americaine' : 'valise'}"]`);
      if (typeRadio) typeRadio.checked = true;
    } else if (cat === "Plastique") {
      let pColor = order.plastiqueColor || "rose";
      if (order.designation) {
        if (order.designation.toUpperCase().includes("NOIR") || order.designation.includes("أسود")) pColor = "noir";
        else if (order.designation.toUpperCase().includes("TRANSP") || order.designation.includes("شفاف")) pColor = "transparent";
        else if (order.designation.toUpperCase().includes("ROSE") || order.designation.includes("وردي")) pColor = "rose";
      }
      const colorRadio = document.querySelector(`input[name="order-plastique-color"][value="${pColor}"]`);
      if (colorRadio) colorRadio.checked = true;
    }

    onSacCategoryChange();

    if (cat === "Impression Seule") {
      const impNameInput = document.getElementById("order-impression-name");
      const impSizeInput = document.getElementById("order-impression-size");
      let extractedName = order.impressionName || "";
      let extractedSize = order.impressionSize || order.sacSize || "";
      if (!extractedName && order.designation) {
        const match = order.designation.match(/طباعة فقط:\s*(.*?)\s*\((.*?)\)/);
        if (match) {
          extractedName = match[1];
          extractedSize = match[2];
        } else {
          extractedName = order.designation.replace("طباعة فقط:", "").trim();
        }
      }
      if (impNameInput) impNameInput.value = extractedName;
      if (impSizeInput) impSizeInput.value = extractedSize;
    } else {
      populateSacSizes(cat, size || order.designation, true);
    }

    document.getElementById("order-unit-price").value = order.unitPrice || "";
    document.getElementById("order-buy-price").value = (order.buyPrice !== undefined && order.buyPrice !== null) ? order.buyPrice : "";
    document.getElementById("order-colors-count").value = order.colorsCount || "1";
    document.getElementById("order-extra-color-price").value = order.extraColorPrice || "0.30";
    onColorsCountChange();
  }

  document.getElementById("order-qty").value = order.quantity || 500;
  document.getElementById("order-total-amount").value = order.totalAmount || 0;
  document.getElementById("order-avance-amount").value = order.avanceAmount || 0;
  document.getElementById("order-notes").value = order.notes || "";
  document.getElementById("order-status").value = order.status || "conception";

  const deliveryRadios = document.getElementsByName("order-delivery-choice");
  for (let r of deliveryRadios) {
    if (r.value === (order.deliveryType || "direct")) r.checked = true;
  }
  toggleDeliveryFields();

  if (order.deliveryType === "ozone") {
    document.getElementById("order-ozone-tracking").value = order.ozoneTracking || "";
    const feeVal = (order.ozoneFees !== undefined && order.ozoneFees !== null) ? order.ozoneFees : 35;
    document.getElementById("order-ozone-fees").value = feeVal;
    if (window.getOzoneDeliveryFee) {
      const result = window.getOzoneDeliveryFee(order.clientCity);
      const citySpan = document.getElementById("ozone-detected-city");
      const rateSpan = document.getElementById("ozone-detected-rate");
      const zoneSpan = document.getElementById("ozone-detected-zone");
      if (citySpan) citySpan.textContent = result.detectedCity || (order.clientCity || "أكادير");
      if (rateSpan) rateSpan.textContent = parseFloat(feeVal).toFixed(2) + " درهم";
      if (zoneSpan) zoneSpan.textContent = result.zone || "";
    }
  } else if (order.deliveryType === "local") {
    document.getElementById("order-local-livreur").value = order.localLivreur || "";
    document.getElementById("order-local-delivery-fee").value = order.localDeliveryFee || 0;
  }

  const autoBuyCheckbox = document.getElementById("order-auto-caisse-buy");
  if (autoBuyCheckbox) {
    autoBuyCheckbox.checked = order.autoCaisseBuyLogged !== false;
  }
  const bagSourceRadios = document.getElementsByName("order-bag-source");
  for (let r of bagSourceRadios) {
    if (r.value === (order.bagSource || "supplier")) r.checked = true;
  }
  toggleBagSourceOptions();

  const stockClientCheckbox = document.getElementById("order-stock-client-enabled");
  const stockDetails = document.getElementById("box-stock-client-details");
  const stockPill = document.getElementById("order-stock-status-pill");
  const firstQtyInput = document.getElementById("order-stock-first-qty");

  if (order.isStockClient) {
    if (stockClientCheckbox) stockClientCheckbox.checked = true;
    if (stockDetails) stockDetails.classList.remove("hidden");
    if (stockPill) stockPill.classList.remove("hidden");
    if (firstQtyInput) firstQtyInput.value = order.deliveredQuantity !== undefined ? order.deliveredQuantity : order.quantity;
    updateStockClientPreview();
  } else {
    if (stockClientCheckbox) stockClientCheckbox.checked = false;
    if (stockDetails) stockDetails.classList.add("hidden");
    if (stockPill) stockPill.classList.add("hidden");
    if (firstQtyInput) firstQtyInput.value = "";
  }

  calculateOrderTotals();
  calculateResteOnly();
}

function deleteOrder(orderId) {
  if (confirm(`هل أنت متأكد من حذف الطلبية ${orderId} نهائياً؟`)) {
    const orderToDelete = state.orders.find(o => o.id === orderId);
    if (orderToDelete && orderToDelete.bagSource === "stock" && orderToDelete.stockItemId) {
      const stockItem = state.stock.find(s => s.id === orderToDelete.stockItemId);
      if (stockItem) {
        stockItem.quantity = Number(stockItem.quantity || 0) + Number(orderToDelete.quantity || 0);
      }
    }
    state.orders = state.orders.filter(o => o.id !== orderId);
    state.caisse = state.caisse.filter(t => !t.description?.includes(orderId) && t.orderId !== orderId);
    saveData();
    renderAll();
  }
}

// ==============================================
// CLIENT STOCK & PARTIAL DELIVERIES (تسليم الدفعات ومخزون الزبون)
// ==============================================
let activePartialOrder = null;

function openPartialDeliveryModal(orderId) {
  const order = state.orders.find(o => o.id === orderId);
  if (!order) return;

  activePartialOrder = order;

  // إذا لم تكن الخاصية مفعلة مسبقاً، تفعيلها تلقائياً
  if (!order.isStockClient) {
    order.isStockClient = true;
    if (order.deliveredQuantity === undefined) order.deliveredQuantity = 0;
    if (order.remainingQuantity === undefined) order.remainingQuantity = order.quantity;
    if (!order.deliveries) order.deliveries = [];
  }

  const totalQty = Number(order.quantity || 0);
  const deliveredQty = Number(order.deliveredQuantity !== undefined ? order.deliveredQuantity : totalQty);
  const remainingQty = (order.remainingQuantity !== undefined) ? Number(order.remainingQuantity) : Math.max(0, totalQty - deliveredQty);
  const totalAmount = Number(order.totalAmount || 0);
  const avanceAmount = Number(order.avanceAmount || 0);
  const resteAmount = Math.max(0, totalAmount - avanceAmount);

  // تحديث النصوص والبيانات في المودال
  const idEl = document.getElementById("part-form-order-id");
  if (idEl) idEl.value = order.id;
  const orderIdEl = document.getElementById("part-order-id");
  if (orderIdEl) orderIdEl.textContent = order.id;
  const clientNameEl = document.getElementById("part-client-name");
  if (clientNameEl) clientNameEl.textContent = order.clientName;
  const desigEl = document.getElementById("part-designation");
  if (desigEl) desigEl.textContent = order.designation || "أكياس";
  const clientInfoEl = document.getElementById("part-client-info");
  if (clientInfoEl) clientInfoEl.textContent = `${order.clientCity || ''} — ${order.clientPhone || ''}`;

  const totalQtyEl = document.getElementById("part-total-qty");
  if (totalQtyEl) totalQtyEl.textContent = totalQty;
  const deliveredQtyEl = document.getElementById("part-delivered-qty");
  if (deliveredQtyEl) deliveredQtyEl.textContent = deliveredQty;
  const remainingQtyEl = document.getElementById("part-remaining-qty");
  if (remainingQtyEl) remainingQtyEl.textContent = remainingQty;
  const resteAmountEl = document.getElementById("part-reste-amount");
  if (resteAmountEl) resteAmountEl.textContent = resteAmount.toFixed(2);

  // شريط التقدم
  const percent = totalQty > 0 ? Math.min(100, Math.round((deliveredQty / totalQty) * 100)) : 100;
  const remPercent = Math.max(0, 100 - percent);
  const progressText = document.getElementById("part-progress-percent");
  if (progressText) progressText.textContent = `${percent}% مسلّم (باقي ${remPercent}% بالورشة)`;
  const progressBar = document.getElementById("part-progress-bar");
  if (progressBar) progressBar.style.width = `${percent}%`;
  const progressBarRem = document.getElementById("part-progress-bar-rem");
  if (progressBarRem) progressBarRem.style.width = `${remPercent}%`;

  // إعداد حقول الإدخال
  const qtyInput = document.getElementById("part-input-qty");
  const paidInput = document.getElementById("part-input-paid");
  const notesInput = document.getElementById("part-input-notes");
  const deliverySelect = document.getElementById("part-input-delivery-type");
  const hintEl = document.getElementById("part-max-qty-hint");

  if (hintEl) hintEl.textContent = `الحد الأقصى المتاح للتسليم: ${remainingQty} حبة`;

  // اقتراح كمية الدفعة القادمة
  const defaultBatchQty = remainingQty > 0 ? remainingQty : 0;
  if (qtyInput) {
    qtyInput.max = remainingQty;
    qtyInput.value = defaultBatchQty;
  }

  // اقتراح مبلغ الدفعة: النسبة والتناسب من باقي الدين
  let suggestedPaid = 0;
  if (remainingQty > 0 && resteAmount > 0) {
    suggestedPaid = Math.min(resteAmount, Math.round((resteAmount / remainingQty) * defaultBatchQty));
  }
  if (paidInput) paidInput.value = suggestedPaid;

  if (notesInput) notesInput.value = "";
  if (deliverySelect) deliverySelect.value = order.deliveryType || "direct";

  calculatePartialDeliveryPreview();
  renderPartialDeliveryHistory(order);

  const modalEl = document.getElementById("modal-partial-delivery");
  if (modalEl) modalEl.classList.remove("hidden");
  lucide.createIcons();
}

function closePartialDeliveryModal() {
  const modalEl = document.getElementById("modal-partial-delivery");
  if (modalEl) modalEl.classList.add("hidden");
  activePartialOrder = null;
}

function calculatePartialDeliveryPreview() {
  if (!activePartialOrder) return;

  const totalQty = Number(activePartialOrder.quantity || 0);
  const currentDelivered = Number(activePartialOrder.deliveredQuantity !== undefined ? activePartialOrder.deliveredQuantity : totalQty);
  const currentRemaining = (activePartialOrder.remainingQuantity !== undefined) ? Number(activePartialOrder.remainingQuantity) : Math.max(0, totalQty - currentDelivered);
  const totalAmount = Number(activePartialOrder.totalAmount || 0);
  const currentAvance = Number(activePartialOrder.avanceAmount || 0);
  const currentReste = Math.max(0, totalAmount - currentAvance);

  const inputQty = parseInt(document.getElementById("part-input-qty")?.value) || 0;
  const inputPaid = parseFloat(document.getElementById("part-input-paid")?.value) || 0;

  const newDelivered = currentDelivered + inputQty;
  const newRemaining = Math.max(0, totalQty - newDelivered);
  const newAvance = currentAvance + inputPaid;
  const newReste = Math.max(0, totalAmount - newAvance);

  const prevStockEl = document.getElementById("part-preview-rem-stock");
  const prevDebtEl = document.getElementById("part-preview-rem-debt");
  const prevCaisseEl = document.getElementById("part-preview-caisse-in");

  if (prevStockEl) prevStockEl.textContent = `المتبقي بالورشة: ${newRemaining} حبة`;
  if (prevDebtEl) prevDebtEl.textContent = `باقي الحساب: ${newReste.toFixed(2)} د`;
  if (prevCaisseEl) prevCaisseEl.textContent = `مدخول الصندوق: +${inputPaid.toFixed(2)} د`;
}

function renderPartialDeliveryHistory(order) {
  const tbody = document.getElementById("part-deliveries-history-tbody");
  if (!tbody) return;

  const deliveries = order.deliveries || [];
  if (deliveries.length === 0) {
    tbody.innerHTML = `<tr><td colspan="5" class="py-4 text-center text-[#6B6B6B]">لم يتم تسجيل أي تسليمات سابقة لهذه الطلبية بعد.</td></tr>`;
    return;
  }

  tbody.innerHTML = deliveries.map(d => {
    let methodBadge = "🏪 بالورشة";
    if (d.deliveryType === "local") methodBadge = "🛵 توصيل محلي";
    else if (d.deliveryType === "ozone") methodBadge = "🚚 أوزون";

    return `
      <tr class="border-b border-[#EAEAE5] hover:bg-[#F8F8F6] transition">
        <td class="py-2.5 px-3 font-mono text-[#6B6B6B]">${d.date}</td>
        <td class="py-2.5 px-3 font-bold text-[#111111]">${d.quantity} حبة</td>
        <td class="py-2.5 px-3 font-black text-emerald-600 font-mono">+${Number(d.paidAmount || 0).toFixed(2)} درهم</td>
        <td class="py-2.5 px-3 text-[#6B6B6B]">${methodBadge}</td>
        <td class="py-2.5 px-3 text-[#6B6B6B] text-[11px]">${escapeHtml(d.notes || '—')}</td>
      </tr>
    `;
  }).join("");
}

function handlePartialDeliverySubmit(e) {
  e.preventDefault();
  const orderId = document.getElementById("part-form-order-id")?.value;
  const order = state.orders.find(o => o.id === orderId);
  if (!order) return;

  const totalQty = Number(order.quantity || 0);
  const currentDelivered = Number(order.deliveredQuantity !== undefined ? order.deliveredQuantity : 0);
  const remainingInStock = (order.remainingQuantity !== undefined) ? Number(order.remainingQuantity) : Math.max(0, totalQty - currentDelivered);

  const batchQty = parseInt(document.getElementById("part-input-qty").value) || 0;
  const batchPaid = parseFloat(document.getElementById("part-input-paid").value) || 0;
  const deliveryType = document.getElementById("part-input-delivery-type").value || "direct";
  const notes = document.getElementById("part-input-notes").value.trim();

  if (batchQty <= 0) {
    alert("المرجو إدخال كمية صحيحة أكبر من 0.");
    return;
  }

  if (batchQty > remainingInStock) {
    alert(`عذراً، الكمية المطلوبة (${batchQty} حبة) أكبر من الكمية المتبقية بمخزون الورشة (${remainingInStock} حبة).`);
    return;
  }

  const today = new Date().toISOString().split("T")[0];
  let trxId = null;

  // 1. تسجيل المبلغ المستخلص كمدخول بالصندوق
  if (batchPaid > 0) {
    trxId = `trx_${Date.now()}`;
    const desc = `استخلاص دفعة (${batchQty} حبة) طلبية ${order.id} (${order.clientName})`;
    state.caisse.push({
      id: trxId,
      type: "entree",
      category: "solde_cmd",
      amount: batchPaid,
      description: desc,
      paymentMethod: "especes",
      date: today,
      orderId: order.id
    });
  }

  // 2. تحديث بيانات الطلبية والستوك
  if (!order.deliveries) order.deliveries = [];
  order.deliveries.push({
    id: `deliv_${Date.now()}`,
    date: today,
    quantity: batchQty,
    paidAmount: batchPaid,
    deliveryType: deliveryType,
    notes: notes || `دفعة تسليم ${batchQty} حبة`,
    caisseTrxId: trxId
  });

  order.isStockClient = true;
  order.deliveredQuantity = currentDelivered + batchQty;
  order.remainingQuantity = Math.max(0, totalQty - order.deliveredQuantity);
  order.avanceAmount = Number(order.avanceAmount || 0) + batchPaid;
  order.resteAmount = Math.max(0, Number(order.totalAmount || 0) - order.avanceAmount);

  // تحديث حالة الطلبية
  if (order.remainingQuantity === 0 && order.resteAmount === 0) {
    order.status = "livree";
  } else {
    order.status = "partielle";
  }

  saveData();
  renderAll();

  // إشعار نجاح
  alert(`✅ تم بنجاح تسجيل تسليم الدفعة (${batchQty} حبة) لـ ${order.clientName}!\n\n` +
        `📦 المتبقي بمخزون الورشة: ${order.remainingQuantity} حبة\n` +
        `💰 المبلغ المستخلص والمضاف للصندوق: +${batchPaid.toFixed(2)} درهم\n` +
        `💵 باقي الحساب الإجمالي: ${order.resteAmount.toFixed(2)} درهم`);

  // فتح نافذة إرسال وصل الواتساب
  if (confirm("📲 هل تريد إرسال وصل استلام هذه الدفعة للزبون عبر واتساب الآن؟")) {
    sendPartialDeliveryWhatsApp(order.id, batchQty, batchPaid);
  }

  closePartialDeliveryModal();
}

function sendPartialDeliveryWhatsApp(orderId = null, lastBatchQty = null, lastBatchPaid = null) {
  const targetId = orderId || document.getElementById("part-form-order-id")?.value;
  const order = state.orders.find(o => o.id === targetId);
  if (!order) return;

  let phone = (order.clientPhone || "").replace(/\s+/g, '').replace(/-/g, '');
  if (!phone) {
    alert("رقم هاتف الزبون غير مسجل في هذه الطلبية.");
    return;
  }
  if (phone.startsWith('0')) {
    phone = '212' + phone.substring(1);
  } else if (!phone.startsWith('212')) {
    phone = '212' + phone;
  }

  const title = getClientTitle(order.clientGender);
  const remainingInStock = (order.remainingQuantity !== undefined) ? order.remainingQuantity : Math.max(0, order.quantity - (order.deliveredQuantity || 0));
  const totalReste = Math.max(0, Number(order.totalAmount || 0) - Number(order.avanceAmount || 0));

  let batchLine = "";
  if (lastBatchQty !== null) {
    batchLine = `🚚 *الدفعة المسلّمة اليوم:* ${lastBatchQty} قطعة\n`;
  }
  let paidLine = "";
  if (lastBatchPaid !== null) {
    paidLine = `💰 *المبلغ المؤدى اليوم:* ${lastBatchPaid} DH\n`;
  }

  const statusDesc = (remainingInStock === 0 && totalReste === 0) 
    ? 'مسلّمة بالكامل وخالصة الحساب ✅' 
    : 'مخزون قيد التسليم على دفعات 📦';

  const message = `السلام عليكم ${title} ${order.clientName}،

معكم *MASTER PRINT* 👋

بخصوص طلبيتكم *${order.id}*:
📦 *المواصفات:* ${order.designation}
${batchLine}🏬 *المتبقي في مخزونكم بالورشة:* ${remainingInStock} قطعة
${paidLine}💵 *باقي الحساب الإجمالي:* ${totalReste.toFixed(2)} DH
📌 *حالة الطلبية:* ${statusDesc}

شكراً لثقتكم في *MASTER PRINT* 🙏
📞 0663103599`;

  const url = `https://wa.me/${phone}?text=${encodeURIComponent(message)}`;
  window.open(url, '_blank');
}

// ==============================================
// WHATSAPP & BON DE COMMANDE
// ==============================================
function sendOrderWhatsApp(orderId) {
  const order = state.orders.find(o => o.id === orderId);
  if (!order) return;

  let phone = (order.clientPhone || "").replace(/\s+/g, '').replace(/-/g, '');
  if (phone.startsWith("0")) phone = "212" + phone.substring(1);
  else if (!phone.startsWith("212")) phone = "212" + phone;
  phone = phone.replace("+", "");

  const reste = Math.max(0, Number(order.totalAmount || 0) - Number(order.avanceAmount || 0));
  const title = getClientTitle(order.clientGender);
  
  let statusText = "";
  if (order.status === "conception") statusText = "قيد التصميم والموافقة";
  else if (order.status === "impression") statusText = "قيد الطباعة في الورشة";
  else if (order.status === "prete") statusText = "جاهزة للتسليم والتوصيل";
  else if (order.status === "livraison") statusText = "مع التوصيل";
  else if (order.status === "livree") statusText = "تم التسليم بنجاح";
  else if (order.status === "retour") statusText = "ملغاة أو راجعة";

  let trackingText = "";
  if (order.deliveryType === "ozone" && order.ozoneTracking) {
    trackingText = `\n🚚 تتبع أوزون: *${order.ozoneTracking}*`;
  } else if (order.deliveryType === "local") {
    trackingText = `\n🛵 التوصيل: *محلي خاص*`;
  }

  const workshopName = state.settings.workshopName || "MASTER PRINT";
  const phoneContact = state.settings.phone || "0663103599";

  const message = 
`السلام عليكم ${title} ${order.clientName}،

معكم *${workshopName}* 👋

بخصوص طلبيتكم *${order.id}*:
📦 ${order.designation} — *${order.quantity} قطعة*
💰 المجموع: *${order.totalAmount} DH*
✅ العربون: *${order.avanceAmount} DH*
💵 الباقي: *${reste} DH*
📌 الحالة: *${statusText}*${trackingText}

شكراً لثقتكم في *${workshopName}* 🙏
📞 ${phoneContact}`;

  const encodedUrl = `https://wa.me/${phone}?text=${encodeURIComponent(message)}`;
  window.open(encodedUrl, "_blank");
}

let currentBonOrderId = null;
let currentBonDocType = 'facture';

function switchBonType(type) {
  currentBonDocType = type;
  
  const types = ['facture', 'livraison', 'commande', 'devis', 'both'];
  types.forEach(t => {
    const btn = document.getElementById(`btn-bon-${t}`);
    if (btn) {
      btn.className = (type === t)
        ? "px-2.5 py-1 rounded font-bold transition bg-[#C9A227] text-white shadow-xs"
        : "px-2.5 py-1 rounded font-bold transition text-[#6B6B6B] hover:text-[#111111]";
    }
  });

  if (currentBonOrderId) {
    renderBonContent(currentBonOrderId, currentBonDocType);
  }
}

function openBonDeCommande(orderId, type = null) {
  currentBonOrderId = orderId;
  if (type) currentBonDocType = type;
  switchBonType(currentBonDocType);
  document.getElementById("modal-bon-commande").classList.remove("hidden");
  lucide.createIcons();
}

function renderBonContent(orderId, docType) {
  const order = state.orders.find(o => o.id === orderId);
  if (!order) return;

  const printArea = document.getElementById("print-area");
  const reste = Math.max(0, Number(order.totalAmount || 0) - Number(order.avanceAmount || 0));

  let docTitle = "فاتورة أداء (Facture)";
  let docBadgeColor = "#1e1b4b";
  let docNumberLabel = "رقم الفاتورة (N° Facture)";
  let signLeftTitle = "توقيع وقبول الزبون";
  let signRightTitle = (reste === 0) ? "ختم الورشة (خالص ومستلم)" : "ختم وتوقيع الورشة";

  if (docType === "livraison") {
    docTitle = "وصل تسليم بضاعة (Bon de Livraison)";
    docBadgeColor = "#059669";
    docNumberLabel = "رقم وصل التسليم";
    signLeftTitle = "توقيع واستلام الزبون";
    signRightTitle = "ختم وتوقيع الورشة (المسلّم)";
  } else if (docType === "commande") {
    docTitle = "وصل طلبية (Bon de Commande)";
    docBadgeColor = "#d97706";
    docNumberLabel = "رقم وصل الطلبية";
    signLeftTitle = "توقيع وموافقة الزبون";
    signRightTitle = "ختم وتوقيع الورشة";
  } else if (docType === "devis") {
    docTitle = "بيان تقديري / عرض أسعار (Devis Proforma)";
    docBadgeColor = "#0284c7";
    docNumberLabel = "رقم البيان التقديري (N° Devis)";
    signLeftTitle = "موافقة الزبون (Bon pour accord)";
    signRightTitle = "إدارة الورشة Master Print";
  } else if (docType === "both") {
    docTitle = "وصل تسليم وتأكيد طلبية (Bon de Livraison & Commande)";
    docBadgeColor = "#2563eb";
    docNumberLabel = "رقم الوصل";
    signLeftTitle = "توقيع واستلام الزبون";
    signRightTitle = "ختم وتوقيع الورشة";
  }

  let deliveryInfo = "تسليم مباشر بالورشة";
  if (order.deliveryType === "ozone") {
    deliveryInfo = `توصيل أوزون إكسبريس (${order.ozoneTracking || 'قيد الإرسال'})`;
  } else if (order.deliveryType === "local") {
    deliveryInfo = `توصيل محلي خاص ${order.localLivreur ? `(${order.localLivreur})` : ''}`;
  }

  // استخراج عدد الألوان وحساب سعر البيع الصافي والشامل للألوان الإضافية
  let colorsNum = 1;
  if (typeof order.colorsCount === "number") {
    colorsNum = order.colorsCount;
  } else if (typeof order.colorsCount === "string") {
    const match = order.colorsCount.match(/\d+/);
    if (match) {
      colorsNum = parseInt(match[0], 10);
    } else if (order.colorsCount.includes("لونين")) {
      colorsNum = 2;
    }
  }

  const deliveryFee = (order.deliveryType === "local") 
    ? Number(order.localDeliveryFee || 0) 
    : (order.deliveryType === "ozone" ? Number(order.ozoneFees || 0) : 0);

  const extraColorsCount = (order.type === "soustraitance") ? 0 : Math.max(0, colorsNum - 1);
  const extraColorRate = Number(order.extraColorPrice || 0);
  const extraPerBag = (extraColorsCount > 0 && extraColorRate > 0) ? (extraColorsCount * extraColorRate) : 0;
  const quantity = Number(order.quantity || 0);

  let itemsTotal = 0;
  let finalUnitPrice = 0;
  let baseUnitPrice = Number(order.unitPrice || 0);

  if (order.type === "soustraitance") {
    itemsTotal = order.subPrice ? Number(order.subPrice) : Math.max(0, Number(order.totalAmount || 0) - deliveryFee);
    finalUnitPrice = (quantity > 0) ? (itemsTotal / quantity) : itemsTotal;
    baseUnitPrice = finalUnitPrice;
  } else {
    finalUnitPrice = baseUnitPrice + extraPerBag;
    itemsTotal = quantity * finalUnitPrice;
  }
  const deliveryTitle = (order.deliveryType === "ozone") ? "خدمة إرسالية أوزون (Ozone Express)" : "خدمة التوصيل المحلي";
  const deliverySub = (order.deliveryType === "ozone") 
    ? `رقم التتبع: ${order.ozoneTracking || 'بدون تتبع'}`
    : (order.localLivreur || 'توصيل خاص');

  printArea.innerHTML = `
    <div style="font-family: 'Cairo', sans-serif; color: #111; direction: rtl; text-align: right;">
      <div style="display: flex; justify-content: space-between; align-items: center; border-bottom: 2px solid #000; padding-bottom: 12px; margin-bottom: 20px;">
        <div style="text-align: right;">
          <h1 style="font-size: 24px; font-weight: 900; margin: 0; color: #000; letter-spacing: 0.5px;">
            MASTER PRINT
          </h1>
          <p style="font-size: 13px; color: #444; margin: 3px 0 0 0; font-weight: 600;">
            طباعة وسيريغرافي | أكياس ومطبوعات إشهارية
          </p>
          <p style="font-size: 14px; color: #000; margin: 4px 0 0 0; font-weight: 800;">
            📍 Agadir, Maroc &nbsp;|&nbsp; 📞 <bdi dir="ltr" style="font-family: Arial, Helvetica, sans-serif; font-size: 15px; font-weight: 900; color: #000; letter-spacing: 0.5px;">0663103599</bdi>
          </p>
        </div>
        <div style="text-align: left;">
          <img src="logo.jpg" alt="Logo" style="height: 68px; width: 68px; border-radius: 8px; object-fit: cover; border: 1px solid #ddd;">
        </div>
      </div>

      <div style="display: flex; justify-content: space-between; gap: 15px; margin-bottom: 20px;">
        <div style="flex: 1; background: #f8fafc; border: 1px solid #cbd5e1; padding: 12px; border-radius: 8px;">
          <h3 style="margin: 0 0 6px 0; font-size: 14px; font-weight: 900; color: ${docBadgeColor};">
            ${docTitle}
          </h3>
          <p style="margin: 3px 0; font-size: 12px;"><strong>${docNumberLabel}:</strong> <span style="font-family: monospace; font-weight: 900; font-size: 13px; color: #000;">${order.id}</span>
          ${docType === 'facture' ? (reste === 0 
            ? `<span style="display: inline-block; margin-right: 8px; font-size: 10px; background: #dcfce7; color: #15803d; border: 1px solid #86efac; padding: 1px 6px; border-radius: 4px; font-weight: bold;">✓ خالصة بالكامل (Payée)</span>` 
            : `<span style="display: inline-block; margin-right: 8px; font-size: 10px; background: #fef3c7; color: #b45309; border: 1px solid #fde68a; padding: 1px 6px; border-radius: 4px; font-weight: bold;">قيد الأداء (الباقي: ${reste.toFixed(2)} درهم)</span>`) : ''}
          </p>
          <p style="margin: 3px 0; font-size: 12px;"><strong>التاريخ:</strong> ${order.date}</p>
          <p style="margin: 3px 0; font-size: 12px;"><strong>طريقة الاستلام والتوصيل:</strong> ${deliveryInfo}</p>
        </div>

        <div style="flex: 1; background: #f8fafc; border: 1px solid #cbd5e1; padding: 12px; border-radius: 8px;">
          <h3 style="margin: 0 0 6px 0; font-size: 14px; font-weight: 900; color: #000;">
            معلومات الزبون
          </h3>
          <p style="margin: 3px 0; font-size: 12px;"><strong>الزبون:</strong> ${escapeHtml(order.clientName)}</p>
          <p style="margin: 3px 0; font-size: 12px;"><strong>الهاتف:</strong> <span dir="ltr">${escapeHtml(order.clientPhone)}</span></p>
          <p style="margin: 3px 0; font-size: 12px;"><strong>المدينة / العنوان:</strong> ${escapeHtml(order.clientCity)}</p>
        </div>
      </div>

      <table style="width: 100%; border-collapse: collapse; margin-bottom: 20px; font-size: 12px;">
        <thead>
          <tr style="background: #111827; color: white;">
            <th style="padding: 8px 10px; border: 1px solid #111827; text-align: right;">البيان والمواصفات</th>
            <th style="padding: 8px 10px; border: 1px solid #111827; text-align: center; width: 80px;">الكمية</th>
            <th style="padding: 8px 10px; border: 1px solid #111827; text-align: center; width: 120px;">ثمن الحبة</th>
            <th style="padding: 8px 10px; border: 1px solid #111827; text-align: center; width: 95px;">الألوان</th>
            <th style="padding: 8px 10px; border: 1px solid #111827; text-align: left; width: 130px;">المجموع</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td style="padding: 10px; border: 1px solid #cbd5e1;">
              <strong style="font-size: 13px; color: #000;">${escapeHtml(order.designation)}</strong>
              ${order.isStockClient ? `
                <div style="margin-top: 4px;">
                  <span style="font-size: 11px; color: #1e40af; background: #dbeafe; border: 1px solid #bfdbfe; padding: 2px 7px; border-radius: 4px; font-weight: bold; display: inline-block;">
                    📦 مخزون بالورشة: تم تسليم ${order.deliveredQuantity || order.quantity} من ${order.quantity} حبة (المتبقي بالورشة: ${Math.max(0, (order.quantity || 0) - (order.deliveredQuantity || 0))} حبة)
                  </span>
                </div>
              ` : ''}
              ${extraColorsCount > 0 && extraPerBag > 0 ? `
                <div style="margin-top: 5px;">
                  <span style="font-size: 11px; color: #92400e; background: #fef3c7; border: 1px solid #fde68a; padding: 2px 7px; border-radius: 4px; font-weight: bold; display: inline-block;">
                    + ${extraColorsCount === 1 ? 'لون إضافي' : (extraColorsCount === 2 ? 'لونين إضافيين' : `${extraColorsCount} ألوان إضافية`)} (+${extraPerBag.toFixed(2)} درهم/حبة)
                  </span>
                </div>
              ` : ''}
              ${order.notes ? `<div style="font-size: 11px; color: #555; margin-top: 4px;">ملاحظات: ${escapeHtml(order.notes)}</div>` : ''}
            </td>
            <td style="padding: 10px; border: 1px solid #cbd5e1; text-align: center; font-weight: bold; font-size: 13px;">
              ${quantity}
            </td>
            <td style="padding: 10px; border: 1px solid #cbd5e1; text-align: center;">
              <div style="font-weight: 900; font-size: 13px; color: #000;">
                ${finalUnitPrice.toFixed(2)} درهم
              </div>
              ${extraColorsCount > 0 && extraPerBag > 0 ? `
                <div style="font-size: 10px; color: #64748b; margin-top: 2px;" title="السعر الأساسي + تكلفة الألوان الإضافية">
                  (${baseUnitPrice.toFixed(2)} + ${extraPerBag.toFixed(2)})
                </div>
              ` : ''}
            </td>
            <td style="padding: 10px; border: 1px solid #cbd5e1; text-align: center; font-weight: 600;">
              ${order.type === "soustraitance" ? 'مطبعة خارجية' : (colorsNum === 1 ? 'لون واحد' : (colorsNum === 2 ? 'لونين (2)' : `${colorsNum} ألوان`))}
            </td>
            <td style="padding: 10px; border: 1px solid #cbd5e1; text-align: left; font-weight: 900; font-size: 13px; color: #000;">
              ${itemsTotal.toFixed(2)} درهم
            </td>
          </tr>
          ${deliveryFee > 0 ? `
          <tr>
            <td style="padding: 8px 10px; border: 1px solid #cbd5e1;">
              <strong>${deliveryTitle}</strong>
              <div style="font-size: 11px; color: #64748b;">${escapeHtml(deliverySub)}</div>
            </td>
            <td style="padding: 8px 10px; border: 1px solid #cbd5e1; text-align: center; font-weight: bold;">
              1
            </td>
            <td style="padding: 8px 10px; border: 1px solid #cbd5e1; text-align: center; font-weight: bold;">
              ${deliveryFee.toFixed(2)} درهم
            </td>
            <td style="padding: 8px 10px; border: 1px solid #cbd5e1; text-align: center; color: #94a3b8;">
              -
            </td>
            <td style="padding: 8px 10px; border: 1px solid #cbd5e1; text-align: left; font-weight: 900; font-size: 13px;">
              ${deliveryFee.toFixed(2)} درهم
            </td>
          </tr>
          ` : ''}
        </tbody>
      </table>

      <div style="display: flex; justify-content: flex-end; margin-bottom: 25px;">
        <div style="width: 300px; background: #fff; border: 1px solid #000; border-radius: 6px; overflow: hidden;">
          ${deliveryFee > 0 ? `
          <div style="display: flex; justify-content: space-between; padding: 6px 12px; border-bottom: 1px solid #eee; font-size: 12px;">
            <span>مجموع السلعة والطباعة:</span>
            <span style="font-weight: bold;">${itemsTotal.toFixed(2)} درهم</span>
          </div>
          <div style="display: flex; justify-content: space-between; padding: 6px 12px; border-bottom: 1px solid #eee; font-size: 12px;">
            <span>مصاريف الشحن / التوصيل:</span>
            <span style="font-weight: bold;">+ ${deliveryFee.toFixed(2)} درهم</span>
          </div>
          ` : ''}
          <div style="display: flex; justify-content: space-between; padding: 6px 12px; border-bottom: 1px solid #eee; font-size: 12px; font-weight: 800;">
            <span>المجموع الإجمالي:</span>
            <span style="font-weight: 900; font-size: 13px;">${Number(order.totalAmount).toFixed(2)} درهم</span>
          </div>
          <div style="display: flex; justify-content: space-between; padding: 6px 12px; border-bottom: 1px solid #eee; font-size: 12px; color: #059669;">
            <span>العربون المستلم:</span>
            <span style="font-weight: bold;">- ${Number(order.avanceAmount || 0).toFixed(2)} درهم</span>
          </div>
          <div style="display: flex; justify-content: space-between; padding: 8px 12px; background: #fef3c7; font-size: 14px; font-weight: 900; color: #92400e;">
            <span>الباقي عند الاستلام:</span>
            <span>${reste.toFixed(2)} درهم</span>
          </div>
        </div>
      </div>

      <div style="border-top: 1px dashed #cbd5e1; padding-top: 12px; font-size: 11px; color: #666; line-height: 1.6; margin-bottom: 30px;">
        <p style="margin: 0 0 4px 0;"><strong>شروط عامة:</strong> ${state.settings.receiptNote}</p>
        <p style="margin: 0;">شكراً لتعاملكم معنا ونسعد بخدمتكم دائماً في ورشة ماستر برينت (${state.settings.city || 'Agadir, Maroc'}).</p>
      </div>

      <div style="display: flex; justify-content: space-between; padding: 0 20px;">
        <div style="text-align: center; width: 180px;">
          <span style="font-size: 11px; font-weight: bold; border-bottom: 1px solid #999; display: block; padding-bottom: 4px;">${signLeftTitle}</span>
          <div style="height: 50px;"></div>
        </div>
        <div style="text-align: center; width: 180px;">
          <span style="font-size: 11px; font-weight: bold; border-bottom: 1px solid #999; display: block; padding-bottom: 4px;">${signRightTitle}</span>
          <div style="height: 50px;"></div>
        </div>
      </div>
    </div>
  `;
}

function closeBonModal() {
  document.getElementById("modal-bon-commande").classList.add("hidden");
}

function printCurrentBon() {
  const printArea = document.getElementById("print-area");
  if (!printArea || !printArea.innerHTML.trim()) {
    alert("لا توجد بيانات في وصل التسليم للطباعة.");
    return;
  }

  // إنشاء أو استدعاء iframe مخفي ومخصص للطباعة لعزل المحتوى وضمان ظهوره كاملاً
  let iframe = document.getElementById("bon-print-frame");
  if (!iframe) {
    iframe = document.createElement("iframe");
    iframe.id = "bon-print-frame";
    iframe.style.position = "fixed";
    iframe.style.right = "-9999px";
    iframe.style.bottom = "-9999px";
    iframe.style.width = "0";
    iframe.style.height = "0";
    iframe.style.border = "0";
    document.body.appendChild(iframe);
  }

  const doc = iframe.contentWindow.document;
  doc.open();
  doc.write(`
    <!DOCTYPE html>
    <html lang="ar" dir="rtl">
    <head>
      <meta charset="UTF-8">
      <title>وصل - MASTER PRINT</title>
      <link href="https://fonts.googleapis.com/css2?family=Cairo:wght@400;600;700;800;900&display=swap" rel="stylesheet">
      <style>
        @page {
          size: A4 portrait;
          margin: 8mm 10mm;
        }
        * {
          box-sizing: border-box;
          -webkit-print-color-adjust: exact !important;
          print-color-adjust: exact !important;
        }
        html, body {
          margin: 0;
          padding: 0;
          background: #ffffff !important;
          color: #111111 !important;
          font-family: 'Cairo', -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
          direction: rtl;
          text-align: right;
        }
        body {
          padding: 10px;
        }
        table {
          width: 100%;
          border-collapse: collapse;
        }
        img {
          max-width: 100%;
          height: auto;
        }
      </style>
    </head>
    <body>
      ${printArea.innerHTML}
    </body>
    </html>
  `);
  doc.close();

  // إعطاء مهلة لتحميل الخط والصور ثم فتح نافذة الطباعة
  setTimeout(() => {
    try {
      iframe.contentWindow.focus();
      iframe.contentWindow.print();
    } catch (err) {
      console.warn("Iframe print error, falling back to window.print()", err);
      window.print();
    }
  }, 250);
}

// ==============================================
// OZONE EXPRESS
// ==============================================
function renderOzoneTable() {
  const container = document.getElementById("ozone-packages-list");
  if (!container) return;

  const ozoneOrders = state.orders.filter(o => o.deliveryType === "ozone");
  const filter = document.getElementById("ozone-filter-status")?.value || "ALL";

  const inTransit = ozoneOrders.filter(o => o.status === "livraison").length;
  const pendingTransfer = ozoneOrders.filter(o => o.ozoneTransferStatus === "pending_transfer" && o.status !== "retour").length;
  const transferred = ozoneOrders.filter(o => o.ozoneTransferStatus === "transferred").length;
  const retours = ozoneOrders.filter(o => o.status === "retour").length;

  const totalPendingAmount = ozoneOrders
    .filter(o => o.ozoneTransferStatus === "pending_transfer" && o.status !== "retour")
    .reduce((sum, o) => sum + Math.max(0, Number(o.resteAmount || 0) - Number(o.ozoneFees || 0)), 0);

  document.getElementById("oz-stat-transit").textContent = inTransit;
  document.getElementById("oz-stat-delivered-pending").textContent = pendingTransfer;
  document.getElementById("oz-stat-paid").textContent = transferred;
  document.getElementById("oz-stat-retours").textContent = retours;
  document.getElementById("ozone-header-pending-amount").textContent = `${totalPendingAmount.toFixed(2)} درهم`;

  let filtered = [...ozoneOrders].reverse();
  if (filter === "pending_transfer") {
    filtered = filtered.filter(o => o.ozoneTransferStatus === "pending_transfer" && o.status !== "retour");
  } else if (filter === "in_transit") {
    filtered = filtered.filter(o => o.status === "livraison");
  } else if (filter === "transferred") {
    filtered = filtered.filter(o => o.ozoneTransferStatus === "transferred");
  }

  if (filtered.length === 0) {
    container.innerHTML = `<div class="p-8 text-center text-[#6B6B6B] text-xs">لا توجد إرساليات مطابقة للفلتر المحدد.</div>`;
    return;
  }

  container.innerHTML = filtered.map(o => {
    const netToReceive = Math.max(0, Number(o.resteAmount || 0) - Number(o.ozoneFees || 0));
    const isTransferred = o.ozoneTransferStatus === "transferred";

    return `
      <div class="bg-white p-4 rounded-xl flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 border border-[#EAEAE5] shadow-xs">
        <div>
          <div class="flex items-center gap-2 mb-1">
            <span class="text-xs font-bold text-[#C9A227] bg-[#FAF6EA] px-2 py-0.5 rounded border border-[#E8DCB5]" dir="ltr">
              ${escapeHtml(o.ozoneTracking || 'بدون تتبع')}
            </span>
            <span class="text-xs font-bold text-[#111111]">${escapeHtml(o.clientName)}</span>
            <span class="text-xs text-[#6B6B6B]">(${escapeHtml(o.clientCity)})</span>
          </div>
          <div class="text-xs text-[#6B6B6B]">
            الطلبية: ${o.id} | ${escapeHtml(o.designation)} (${o.quantity} حبة)
          </div>
        </div>

        <div class="flex items-center gap-4 text-left sm:text-right">
          <div>
            <div class="text-[10px] text-[#6B6B6B]">مبلغ التحصيل عند الاستلام:</div>
            <div class="text-xs font-bold text-[#111111]">${Number(o.resteAmount).toFixed(2)} درهم</div>
          </div>
          <div>
            <div class="text-[10px] text-[#6B6B6B]">مصاريف أوزون:</div>
            <div class="text-xs text-[#EF4444] font-bold">-${Number(o.ozoneFees).toFixed(2)} درهم</div>
          </div>
          <div>
            <div class="text-[10px] text-[#C9A227] font-bold">الصافي المستحق:</div>
            <div class="text-sm font-black text-[#16B981]">${netToReceive.toFixed(2)} درهم</div>
          </div>
        </div>

        <div>
          ${isTransferred ? `
            <span class="inline-flex items-center gap-1 text-xs font-bold text-emerald-700 bg-emerald-50 px-3 py-1.5 rounded-lg border border-emerald-200">
              <i data-lucide="check" class="w-3.5 h-3.5"></i> تم استلام التحويل
            </span>
          ` : `
            <button onclick="confirmOzoneTransfer('${o.id}')" class="flex items-center gap-1.5 px-3 py-1.5 bg-[#16B981] hover:bg-[#059669] text-white text-xs font-bold rounded-lg shadow-xs transition">
              <i data-lucide="check-circle-2" class="w-4 h-4"></i>
              <span>تأكيد استلام التحويل (+الصندوق)</span>
            </button>
          `}
        </div>
      </div>
    `;
  }).join("");

  lucide.createIcons();
}

function confirmOzoneTransfer(orderId) {
  const order = state.orders.find(o => o.id === orderId);
  if (!order) return;

  const ozoneFee = Number(order.ozoneFees || 0);
  const workshopTotal = Math.max(0, Number(order.totalAmount || 0) - ozoneFee);
  const netToReceive = Math.max(0, workshopTotal - Number(order.avanceAmount || 0));

  if (confirm(`هل توصلت بتحويل أوزون بمبلغ ${netToReceive.toFixed(2)} درهم وتريد إضافته مباشرة إلى الصندوق؟`)) {
    order.ozoneTransferStatus = "transferred";
    order.status = "livree";
    order.avanceAmount = order.totalAmount;
    order.resteAmount = 0;

    if (netToReceive > 0) {
      state.caisse.push({
        id: `trx_${Date.now()}`,
        type: "entree",
        category: "ozone_virement",
        amount: netToReceive,
        description: `تحويل أوزون لطلبية ${order.id} (${order.clientName})`,
        paymentMethod: "virement",
        date: new Date().toISOString().split("T")[0],
        orderId: order.id
      });
    }

    saveData();
    renderAll();
  }
}

// ==============================================
// CAISSE & TRANSACTIONS
// ==============================================
function setCaissePeriodFilter(period) {
  state.caissePeriodFilter = period;
  if (period === 'custom') {
    const customDateEl = document.getElementById("caisse-custom-date");
    state.customCaisseDate = customDateEl ? customDateEl.value : "";
  }
  
  const btnIds = {
    today: "caisse-btn-today",
    yesterday: "caisse-btn-yesterday",
    month: "caisse-btn-month",
    all: "caisse-btn-all"
  };
  
  Object.keys(btnIds).forEach(key => {
    const btn = document.getElementById(btnIds[key]);
    if (!btn) return;
    if (key === period) {
      btn.className = "px-3 py-1.5 text-xs font-bold rounded-lg border transition bg-[#FAF6EA] text-[#C9A227] border-[#E8DCB5] cursor-pointer";
    } else {
      btn.className = "px-3 py-1.5 text-xs font-bold rounded-lg border transition bg-white text-[#6B6B6B] border-[#D4D4CE] hover:bg-[#F8F8F6] cursor-pointer";
    }
  });

  renderCaisseTable();
}

function renderCaisseTable() {
  const tbody = document.getElementById("caisse-table-body");
  if (!tbody) return;

  const todayStr = new Date().toISOString().split("T")[0];
  const dYesterday = new Date(Date.now() - 86400000);
  const yesterdayStr = dYesterday.toISOString().split("T")[0];
  const currentMonthPrefix = todayStr.substring(0, 7);

  let rawTransactions = [...state.caisse];
  let periodTitle = "ملخص نهار اليوم:";
  let periodDate = todayStr;

  const period = state.caissePeriodFilter || "all";

  if (period === "today") {
    rawTransactions = rawTransactions.filter(t => t.date === todayStr);
    periodTitle = "ملخص نهار اليوم:";
    periodDate = todayStr;
  } else if (period === "yesterday") {
    rawTransactions = rawTransactions.filter(t => t.date === yesterdayStr);
    periodTitle = "ملخص نهار البارحة:";
    periodDate = yesterdayStr;
  } else if (period === "month") {
    const cur = getCycleRange();
    rawTransactions = rawTransactions.filter(t => isDateInSelectedCycle(t.date));
    periodTitle = `ملخص الدورة الشهرية (${cur.start} إلى ${cur.end}):`;
    periodDate = `${cur.start} إلى ${cur.end}`;
  } else if (period === "custom") {
    const targetDate = state.customCaisseDate || todayStr;
    rawTransactions = rawTransactions.filter(t => t.date === targetDate);
    periodTitle = `ملخص يوم (${targetDate}):`;
    periodDate = targetDate;
  } else if (period === "all") {
    periodTitle = "الملخص الشامل لجميع العمليات:";
    periodDate = "جميع الفترات";
  }

  // تحديث شريط ملخص الفترة (اليومي / الشهري)
  const sumInflow = rawTransactions.filter(t => t.type === 'entree').reduce((sum, t) => sum + Number(t.amount || 0), 0);
  const sumMatieres = rawTransactions.filter(t => t.type === 'sortie' && (t.category === 'matieres' || t.category === 'consommables')).reduce((sum, t) => sum + Number(t.amount || 0), 0);
  const sumCharges = rawTransactions.filter(t => t.type === 'sortie' && t.category !== 'matieres' && t.category !== 'consommables').reduce((sum, t) => sum + Number(t.amount || 0), 0);
  const sumNet = sumInflow - (sumMatieres + sumCharges);

  const elSumTitle = document.getElementById("caisse-summary-title");
  const elSumDate = document.getElementById("caisse-summary-date");
  const elSumInflow = document.getElementById("summary-inflow");
  const elSumMatieres = document.getElementById("summary-matieres");
  const elSumCharges = document.getElementById("summary-charges");
  const elSumNet = document.getElementById("summary-net");

  if (elSumTitle) elSumTitle.textContent = periodTitle;
  if (elSumDate) elSumDate.textContent = periodDate;
  if (elSumInflow) elSumInflow.textContent = `+${sumInflow.toFixed(2)} د`;
  if (elSumMatieres) elSumMatieres.textContent = `-${sumMatieres.toFixed(2)} د`;
  if (elSumCharges) elSumCharges.textContent = `-${sumCharges.toFixed(2)} د`;
  if (elSumNet) {
    elSumNet.textContent = `${sumNet >= 0 ? '+' : ''}${sumNet.toFixed(2)} د`;
    elSumNet.className = `font-mono ${sumNet >= 0 ? 'text-[#16B981]' : 'text-[#EF4444]'}`;
  }

  // فلترة حسب النوع المختار
  let transactions = [...rawTransactions];
  const typeFilter = document.getElementById("caisse-filter-type")?.value || "ALL";
  if (typeFilter === "entree") {
    transactions = transactions.filter(t => t.type === "entree");
  } else if (typeFilter === "sortie") {
    transactions = transactions.filter(t => t.type === "sortie");
  } else if (typeFilter === "matieres_only") {
    transactions = transactions.filter(t => t.type === "sortie" && (t.category === "matieres" || t.category === "consommables"));
  } else if (typeFilter === "charges_only") {
    transactions = transactions.filter(t => t.type === "sortie" && t.category !== "matieres" && t.category !== "consommables");
  }

  transactions.reverse();
  renderCaisseCategoriesBreakdown();

  if (transactions.length === 0) {
    tbody.innerHTML = `<tr><td colspan="7" class="py-8 text-center text-[#6B6B6B]">لا توجد عمليات مسجلة في الصندوق لهذه الفترة المحددة.</td></tr>`;
    return;
  }

  tbody.innerHTML = transactions.map(t => {
    const isEntree = t.type === "entree";
    const isMatiere = t.type === "sortie" && (t.category === "matieres" || t.category === "consommables");
    const paymentLabel = t.paymentMethod === "virement" ? "🏦 تحويل بنكي" : (t.paymentMethod === "cheque" ? "📝 شيك" : "💵 كاش");

    let categoryBadge = "";
    if (isEntree) {
      categoryBadge = `<span class="inline-flex items-center gap-1 font-bold text-[10px] px-2 py-0.5 rounded bg-emerald-50 text-emerald-700 border border-emerald-200">🟢 ${escapeHtml(getCategoryLabel(t.category))}</span>`;
    } else if (isMatiere) {
      categoryBadge = `<span class="inline-flex items-center gap-1 font-bold text-[10px] px-2 py-0.5 rounded bg-orange-50 text-orange-700 border border-orange-200">🛍️ ${escapeHtml(getCategoryLabel(t.category))}</span>`;
    } else {
      categoryBadge = `<span class="inline-flex items-center gap-1 font-bold text-[10px] px-2 py-0.5 rounded bg-gray-50 text-[#6B6B6B] border border-gray-200">🏢 ${escapeHtml(getCategoryLabel(t.category))}</span>`;
    }

    return `
      <tr class="hover:bg-[#F8F8F6] border-b border-[#EAEAE5] transition">
        <td class="py-3 px-3 text-[#6B6B6B] font-mono text-[11px]">${t.date}</td>
        <td class="py-3 px-3">
          <span class="inline-flex items-center gap-1 font-bold text-[10px] px-2 py-0.5 rounded ${isEntree ? 'bg-emerald-50 text-emerald-700 border border-emerald-200' : 'bg-rose-50 text-rose-700 border border-rose-200'}">
            ${isEntree ? '↓ مدخول' : '↑ مخروج'}
          </span>
        </td>
        <td class="py-3 px-3">${categoryBadge}</td>
        <td class="py-3 px-3 font-medium text-[#111111]">${escapeHtml(t.description)}</td>
        <td class="py-3 px-3 text-[#6B6B6B] text-[11px]">${paymentLabel}</td>
        <td class="py-3 px-3 text-left font-bold font-mono ${isEntree ? 'text-[#16B981]' : (isMatiere ? 'text-orange-700' : 'text-[#EF4444]')}">
          ${isEntree ? '+' : '-'}${Number(t.amount).toFixed(2)} درهم
        </td>
        <td class="py-3 px-3 text-center">
          <button onclick="deleteTransaction('${t.id}')" class="p-1 text-[#6B6B6B] hover:text-rose-600 transition cursor-pointer" title="حذف">
            <i data-lucide="trash" class="w-3.5 h-3.5"></i>
          </button>
        </td>
      </tr>
    `;
  }).join("");

  lucide.createIcons();
}

function renderCaisseCategoriesBreakdown() {
  const container = document.getElementById("caisse-categories-breakdown");
  if (!container) return;

  const p1 = (state.settings && state.settings.partner1Name) ? state.settings.partner1Name : "أنا";
  const p2 = (state.settings && state.settings.partner2Name) ? state.settings.partner2Name : "الشريك";

  const categories = [
    { key: "consommables", label: "مواد استهلاك وطباعة", icon: "🎨" },
    { key: "matieres", label: "أكياس وسلع خام", icon: "🛍️" },
    { key: "soustraitance", label: "مطابع خارجية", icon: "🏢" },
    { key: "sponsoring", label: "سبونسورينغ وإعلانات", icon: "📣" },
    { key: "salaire_employe", label: "رواتب العمال", icon: "👷" },
    { key: "retrait_p1", label: `راتب: ${p1}`, icon: "👤" },
    { key: "retrait_p2", label: `راتب: ${p2}`, icon: "👥" },
    { key: "atelier", label: "كراء ومصاريف الورشة", icon: "🏭" },
    { key: "transport", label: "شحن وتنقل", icon: "🚚" }
  ];

  container.innerHTML = categories.map(cat => {
    const total = state.caisse
      .filter(t => isDateInSelectedCycle(t.date) && t.type === "sortie" && (t.category === cat.key || (cat.key === "retrait_p1" && t.category === "retrait_perso")))
      .reduce((sum, t) => sum + Number(t.amount || 0), 0);

    return `
      <div class="bg-white p-2.5 rounded-xl border border-[#EAEAE5] text-center shadow-xs">
        <span class="text-[11px] text-[#6B6B6B] block flex items-center justify-center gap-1">${cat.icon} ${cat.label}</span>
        <span class="text-xs font-black text-[#EF4444] mt-1 block">${total.toFixed(2)} درهم</span>
      </div>
    `;
  }).join("");
}

function getCategoryLabel(catKey) {
  const p1 = (state.settings && state.settings.partner1Name) ? state.settings.partner1Name : "أنا";
  const p2 = (state.settings && state.settings.partner2Name) ? state.settings.partner2Name : "الشريك";

  const map = {
    "avance_cmd": "عربون طلبية",
    "solde_cmd": "باقي طلبية",
    "ozone_virement": "تحويل أوزون إكسبريس",
    "autre_entree": "مدخول آخر",
    "consommables": "مواد استهلاك وطباعة (صباغة، ديليون...)",
    "matieres": "شراء أكياس ومواد خام",
    "soustraitance": "مطبعة خارجية (كروت فيزيت)",
    "sponsoring": "إعلانات سبونسورينغ و Ads",
    "salaire_employe": "أجر / راتب مستخدم (ورشة)",
    "atelier": "كراء ومصاريف الورشة",
    "transport": "شحن وتوصيل",
    "retrait_p1": `سحب راتب: ${p1}`,
    "retrait_p2": `سحب راتب: ${p2}`,
    "retrait_perso": `سحب أرباح شخصية (${p1})`,
    "divers": "مصاريف أخرى"
  };
  return map[catKey] || catKey;
}

function openNewTransactionModal(type = "sortie") {
  document.getElementById("trans-type").value = type;
  document.getElementById("modal-trans-title").textContent = type === "entree" ? "تسجيل مدخول جديد للصندوق" : "تسجيل مصروف جديد";
  
  const quickBar = document.getElementById("quick-consommables-bar");
  if (quickBar) {
    if (type === "sortie") {
      quickBar.classList.remove("hidden");
    } else {
      quickBar.classList.add("hidden");
    }
  }

  const catSelect = document.getElementById("trans-category");
  if (type === "entree") {
    catSelect.innerHTML = `
      <option value="avance_cmd">عربون طلبية</option>
      <option value="solde_cmd">استخلاص باقي طلبية</option>
      <option value="ozone_virement">تحويل شركة التوصيل (أوزون)</option>
      <option value="autre_entree">ضخ سيولة / مدخول آخر</option>
    `;
    document.getElementById("btn-save-trans").className = "px-5 py-2 bg-[#16B981] hover:bg-[#059669] text-white text-xs font-black rounded-lg transition shadow-xs";
    document.getElementById("btn-save-trans").textContent = "إضافة مدخول";
  } else {
    const p1 = (state.settings && state.settings.partner1Name) ? state.settings.partner1Name : "أنا";
    const p2 = (state.settings && state.settings.partner2Name) ? state.settings.partner2Name : "الشريك";
    catSelect.innerHTML = `
      <option value="consommables">🎨 مواد الاستهلاك والطباعة (صباغة، ديليون، ديكابو...)</option>
      <option value="matieres">🛍️ أكياس ومواد خام (سلعة)</option>
      <option value="soustraitance">🏢 مطبعة خارجية (كروت فيزيت...)</option>
      <option value="sponsoring">📣 إعلانات وسبونسورينغ (Facebook, Insta, TikTok...)</option>
      <option value="salaire_employe">👷 أجر / راتب مستخدم بالورشة (Salaires Employés)</option>
      <option value="retrait_p1">👤 سحب راتب / شخصي: ${p1}</option>
      <option value="retrait_p2">👥 سحب راتب / شخصي: ${p2}</option>
      <option value="atelier">🏭 كراء وضو ومصاريف الورشة</option>
      <option value="transport">🚚 شحن وتنقل</option>
      <option value="divers">📦 مصاريف متنوعة</option>
    `;
    document.getElementById("btn-save-trans").className = "px-5 py-2 bg-[#111111] hover:bg-black text-white text-xs font-black rounded-lg transition shadow-xs";
    document.getElementById("btn-save-trans").textContent = "تسجيل المصروف";
  }

  document.getElementById("trans-amount").value = "";
  document.getElementById("trans-description").value = "";
  document.getElementById("modal-transaction").classList.remove("hidden");
  lucide.createIcons();
}

function quickFillConsommable(label) {
  const catSelect = document.getElementById("trans-category");
  if (catSelect) catSelect.value = "consommables";
  const descInput = document.getElementById("trans-description");
  if (descInput) descInput.value = label;
  const amountInput = document.getElementById("trans-amount");
  if (amountInput) amountInput.focus();
}
window.quickFillConsommable = quickFillConsommable;

function closeTransactionModal() {
  document.getElementById("modal-transaction").classList.add("hidden");
}

// ==============================================
// CLOUD, OFFLINE & EMAIL SYNC (masterprintmorocco@gmail.com)
// ==============================================
function initCloudSync() {
  updateNetworkSyncStatus();
  window.addEventListener("online", () => {
    updateNetworkSyncStatus();
    showToast("🟢 تم استرجاع الاتصال بالإنترنت! جاري مزامنة التعديلات تلقائياً...");
    syncPendingData();
  });
  window.addEventListener("offline", () => {
    updateNetworkSyncStatus();
    showToast("🔴 أنت الآن في وضع عدم الاتصال (Offline). التطبيق يعمل بالكامل ويحفظ محلياً.");
  });

  const savedUrl = localStorage.getItem("mp_google_script_url");
  const inputEl = document.getElementById("setting-google-script-url");
  if (inputEl && savedUrl) inputEl.value = savedUrl;
}

function updateNetworkSyncStatus() {
  const isOnline = navigator.onLine;
  const dot = document.getElementById("sync-status-dot");
  const icon = document.getElementById("sync-status-icon");
  const text = document.getElementById("sync-status-text");
  const badge = document.getElementById("sync-queue-badge");
  const netLabel = document.getElementById("sync-network-label");
  const modeStatus = document.getElementById("sync-mode-status");
  const queueCount = document.getElementById("sync-queue-count");

  const queueLen = state.syncQueue ? state.syncQueue.length : 0;

  if (isOnline) {
    if (dot) dot.className = "w-2 h-2 rounded-full bg-emerald-500 animate-pulse";
    if (icon) icon.className = "w-3.5 h-3.5 text-emerald-600";
    if (text) text.textContent = queueLen > 0 ? `أونلاين (${queueLen} معلقة)` : "أونلاين (متزامن)";
    if (netLabel) netLabel.textContent = "🟢 متصل بالإنترنت";
    if (modeStatus) modeStatus.textContent = "🟢 أونلاين (Online)";
  } else {
    if (dot) dot.className = "w-2 h-2 rounded-full bg-rose-500";
    if (icon) icon.className = "w-3.5 h-3.5 text-rose-600";
    if (text) text.textContent = `أوفلاين (${queueLen})`;
    if (netLabel) netLabel.textContent = "🔴 وضع عدم الاتصال (Offline)";
    if (modeStatus) modeStatus.textContent = "🔴 أوفلاين (العمل محلياً)";
  }

  if (badge) {
    if (queueLen > 0) {
      badge.textContent = queueLen;
      badge.classList.remove("hidden");
    } else {
      badge.classList.add("hidden");
    }
  }

  if (queueCount) {
    queueCount.textContent = `${queueLen} عملية معلقة`;
  }
}

function queueSyncAction(actionType, data) {
  if (!state.syncQueue) state.syncQueue = [];
  state.syncQueue.push({
    action: actionType,
    data: data,
    timestamp: new Date().toISOString()
  });
  localStorage.setItem("mp_sync_queue", JSON.stringify(state.syncQueue));
  updateNetworkSyncStatus();

  if (navigator.onLine) {
    syncPendingData();
  }
}

function syncPendingData() {
  const scriptUrl = localStorage.getItem("mp_google_script_url") || state.settings?.googleScriptUrl;
  if (!scriptUrl || !navigator.onLine) {
    updateNetworkSyncStatus();
    return;
  }

  const payload = {
    action: "batch_sync",
    email: "masterprintmorocco@gmail.com",
    ordersCount: state.orders.length,
    caisseCount: state.caisse.length,
    stockCount: state.stock.length,
    queue: state.syncQueue,
    orders: state.orders,
    caisse: state.caisse,
    stock: state.stock,
    timestamp: new Date().toISOString()
  };

  fetch(scriptUrl, {
    method: "POST",
    mode: "no-cors",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload)
  }).then(() => {
    state.syncQueue = [];
    localStorage.setItem("mp_sync_queue", JSON.stringify([]));
    updateNetworkSyncStatus();
    showToast("✅ تمت مزامنة جميع البيانات مع Google Sheets بنجاح!");
  }).catch(err => {
    console.warn("Sync error:", err);
  });
}

function validateGoogleScriptUrlDisplay(url) {
  const feedback = document.getElementById("google-script-url-feedback");
  if (!feedback) return;

  const val = (url || "").trim();
  if (!val) {
    feedback.className = "hidden";
    feedback.innerHTML = "";
    return;
  }

  if (val.includes("/edit") || val.includes("/home/projects/")) {
    feedback.className = "p-2.5 rounded-xl border border-rose-300 bg-rose-50 text-rose-800 text-[11px] leading-relaxed block space-y-1";
    feedback.innerHTML = `
      <div class="flex items-center gap-1.5 font-black text-rose-900">
        <i data-lucide="alert-triangle" class="w-4 h-4 text-rose-600 shrink-0"></i>
        <span>⚠️ تنبيه: هذا رابط صفحة تعديل الكود (/edit) وليس رابط الويب-هوك الفعلي!</span>
      </div>
      <p class="text-[10px] text-rose-700">
        الرابط ينتهي بـ <code class="bg-rose-100 px-1 py-0.5 rounded font-mono font-bold">/edit</code>، لذلك Google ترفض استقبال البيانات عبره ولا يتغير أي شيء في الشيت.
      </p>
      <p class="text-[10px] text-rose-950 font-bold">
        👉 الرابط الصحيح يجب أن ينتهي بـ <code class="bg-emerald-100 text-emerald-800 px-1 py-0.5 rounded font-mono font-bold">/exec</code>.
      </p>
      <div class="text-[10px] text-rose-900 pt-1 border-t border-rose-200">
        <b>طريقة الحصول عليه:</b> في صفحة الكود، اضغط الزر الأزرق <b>Deploy</b> (نشر) ➔ <b>New deployment</b> ➔ نوع <b>Web app</b> ➔ في خانة (Who has access) اختر <b>Anyone</b> (أي شخص) ➔ ثم انسخ الرابط الذي ينتهي بـ <b>/exec</b> والصقه هنا.
      </div>
    `;
    lucide.createIcons();
  } else if (val.includes("/exec")) {
    feedback.className = "p-2.5 rounded-xl border border-emerald-300 bg-emerald-50 text-emerald-800 text-[11px] leading-relaxed block";
    feedback.innerHTML = `
      <div class="flex items-center gap-1.5 font-black text-emerald-900">
        <i data-lucide="check-circle-2" class="w-4 h-4 text-emerald-600 shrink-0"></i>
        <span>✅ رابط الويب-هوك سليم ومكتمل (/exec)!</span>
      </div>
      <p class="text-[10px] text-emerald-700 mt-0.5">
        جاهز لإرسال واستقبال البيانات مع Google Sheets والبريد الإلكتروني تلقائياً.
      </p>
    `;
    lucide.createIcons();
  } else {
    feedback.className = "p-2 rounded-xl border border-amber-300 bg-amber-50 text-amber-800 text-[11px] block";
    feedback.innerHTML = `
      <div class="flex items-center gap-1.5 font-bold text-amber-900">
        <i data-lucide="info" class="w-3.5 h-3.5 text-amber-600 shrink-0"></i>
        <span>يرجى التأكد أن الرابط يبدأ بـ https://script.google.com وينتهي بـ <code class="bg-amber-100 px-1 rounded font-mono">/exec</code></span>
      </div>
    `;
    lucide.createIcons();
  }
}
window.validateGoogleScriptUrlDisplay = validateGoogleScriptUrlDisplay;

function triggerManualSync() {
  if (!navigator.onLine) {
    alert("⚠️ أنت حالياً في وضع عدم الاتصال (Offline).\nجميع البيانات محفوظة في جهازك، وستتم المزامنة تلقائياً بمجرد عودة الاتصال بالإنترنت.");
    return;
  }

  const scriptUrl = localStorage.getItem("mp_google_script_url") || state.settings?.googleScriptUrl;
  if (!scriptUrl) {
    alert("💡 البيانات محفوظة في متصفحك بشكل دائم.\nإذا أردت المزامنة الحية مع Google Sheets، يرجى وضع رابط Google Apps Script الخاص بك، أو اضغط زر 'تنزيل نسخة احتياطية كاملة لجهازك'.");
    return;
  }

  if (scriptUrl.includes("/edit") || !scriptUrl.includes("/exec")) {
    alert("⚠️ تنبيه هام:\nالرابط الحالي هو رابط صفحة تعديل الكود (ينتهي بـ /edit) وليس رابط الويب-هوك الفعلي!\n\nلذلك لن تتغير أي بيانات داخل Google Sheet حتى تقوم بنشر السكربت.\n\n📌 خطوات الحصول على الرابط الفعلي:\n1. افتح صفحة Apps Script\n2. اضغط الزر الأزرق بالأعلى [Deploy / Déployer / نشر]\n3. اختر [New deployment / Nouveau déploiement / نشر جديد]\n4. اختر [Web app / تطبيق ويب]\n5. في خانة (Who has access / من لديه حق الوصول): اختر [Anyone / أي شخص]\n6. اضغط Deploy وانسخ الرابط الذي ينتهي بـ /exec والصقه هنا.");
    return;
  }

  syncPendingData();
}

function sendEmailBackup() {
  const scriptUrl = localStorage.getItem("mp_google_script_url") || state.settings?.googleScriptUrl;
  const backupData = {
    action: "send_email_backup",
    sendEmail: true,
    email: "masterprintmorocco@gmail.com",
    ordersCount: state.orders.length,
    caisseCount: state.caisse.length,
    stockCount: state.stock.length,
    orders: state.orders,
    caisse: state.caisse,
    stock: state.stock,
    settings: state.settings,
    timestamp: new Date().toISOString()
  };

  if (scriptUrl && scriptUrl.includes("/exec") && !scriptUrl.includes("/edit") && navigator.onLine) {
    fetch(scriptUrl, {
      method: "POST",
      mode: "no-cors",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(backupData)
    }).then(() => {
      showToast("📧 تم إرسال طلب النسخة الاحتياطية إلى masterprintmorocco@gmail.com!");
      // تنزيل ملف كإجراء احتياطي إضافي
      exportDataBackupJSON();
    }).catch(err => {
      exportDataBackupJSON();
    });
  } else {
    // إذا كان الرابط غير صالح أو /edit، ننبه المستخدم وننزل الملف فوراً لجهازه
    exportDataBackupJSON();
    if (scriptUrl && scriptUrl.includes("/edit")) {
      alert("⚠️ الرابط المدخل هو رابط تعديل الكود (/edit) ولا يمكنه إرسال الإيميل تلقائياً حتى تنشره كـ Web App ينتهي بـ /exec.\n\n✅ تم تنزيل ملف النسخة الاحتياطية الكاملة (JSON) مباشرة في مجلد التنزيلات (Downloads) بجهازك لحمايته!");
    } else {
      const subject = encodeURIComponent("نسخة احتياطية Master Print - " + new Date().toISOString().split("T")[0]);
      const body = encodeURIComponent(`السلام عليكم،\n\nمرفق ملخص بيانات Master Print لبريدكم masterprintmorocco@gmail.com:\n- عدد الطلبيات: ${state.orders.length}\n- عدد حركات الصندوق: ${state.caisse.length}\n- عدد عناصر المخزن: ${state.stock.length}\n\nتم تنزيل ملف النسخة الاحتياطية (JSON) في جهازكم لحفظه أو إرفاقه.\nتاريخ الحفظ: ${new Date().toLocaleString()}`);
      window.open(`mailto:masterprintmorocco@gmail.com?subject=${subject}&body=${body}`, "_blank");
    }
  }
}

function exportDataBackupJSON() {
  const fullBackup = {
    exportDate: new Date().toISOString(),
    email: "masterprintmorocco@gmail.com",
    appName: "Master Print",
    ordersCount: state.orders.length,
    caisseCount: state.caisse.length,
    stockCount: state.stock.length,
    orders: state.orders,
    caisse: state.caisse,
    stock: state.stock,
    settings: state.settings,
    stockQrTokens: state.stockQrTokens || []
  };

  const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(fullBackup, null, 2));
  const downloadAnchor = document.createElement("a");
  downloadAnchor.setAttribute("href", dataStr);
  const dateStr = new Date().toISOString().split("T")[0];
  downloadAnchor.setAttribute("download", `MasterPrint_Backup_${dateStr}.json`);
  document.body.appendChild(downloadAnchor);
  downloadAnchor.click();
  downloadAnchor.remove();
  showToast("📥 تم تنزيل ملف النسخة الاحتياطية الكاملة (JSON) في جهازك بنجاح!");
}

function saveGoogleScriptUrl(url) {
  const cleanUrl = (url || "").trim();
  localStorage.setItem("mp_google_script_url", cleanUrl);
  if (state.settings) state.settings.googleScriptUrl = cleanUrl;
  saveData();
  
  validateGoogleScriptUrlDisplay(cleanUrl);
  
  if (cleanUrl.includes("/edit")) {
    showToast("⚠️ انتبه: الرابط ينتهي بـ /edit وليس /exec");
  } else if (cleanUrl.includes("/exec")) {
    showToast("✅ تم حفظ رابط الويب-هوك المنشور بنجاح!");
  } else if (cleanUrl) {
    showToast("💾 تم حفظ الرابط");
  }
}

function getGoogleAppsScriptTemplate() {
  return [
    '// ==============================================================',
    '// كود المزامنة السحابية لـ Master Print مع Google Sheets والبريد',
    '// الصق هذا الكود كاملاً في Google Sheet -> Extensions -> Apps Script',
    '// ==============================================================',
    '',
    'function doPost(e) {',
    '  try {',
    '    if (!e || !e.postData || !e.postData.contents) {',
    '      return ContentService.createTextOutput(JSON.stringify({',
    '        status: "error",',
    '        message: "No data received"',
    '      })).setMimeType(ContentService.MimeType.JSON);',
    '    }',
    '',
    '    var data = JSON.parse(e.postData.contents);',
    '    var ss = null;',
    '    try {',
    '      ss = SpreadsheetApp.getActiveSpreadsheet();',
    '    } catch(err) {}',
    '',
    '    if (!ss) {',
    '      var files = DriveApp.getFilesByName("Master Print - قاعدة البيانات");',
    '      if (files.hasNext()) {',
    '        ss = SpreadsheetApp.open(files.next());',
    '      } else {',
    '        ss = SpreadsheetApp.create("Master Print - قاعدة البيانات");',
    '      }',
    '    }',
    '',
    '    // 1. مزامنة جدول الطلبيات (Orders)',
    '    if (Array.isArray(data.orders) && data.orders.length > 0) {',
    '      var ordersSheet = ss.getSheetByName("الطلبيات") || ss.insertSheet("الطلبيات");',
    '      ordersSheet.clear();',
    '      var ordersHeaders = ["رقم الطلب", "التاريخ", "اسم الزبون", "الهاتف", "المدينة", "نوع الطباعة", "الصنف", "القياس", "الكمية", "ثمن البيع", "المجموع (د)", "التسبيق (د)", "الباقي (د)", "الحالة", "ملاحظات"];',
    '      ordersSheet.appendRow(ordersHeaders);',
    '      ordersSheet.getRange(1, 1, 1, ordersHeaders.length).setBackground("#C9A227").setFontColor("#FFFFFF").setFontWeight("bold");',
    '',
    '      var ordersRows = data.orders.map(function(o) {',
    '        return [',
    '          o.id || "",',
    '          o.date || "",',
    '          o.clientName || "",',
    '          o.clientPhone || "",',
    '          o.clientCity || "",',
    '          o.type || "",',
    '          o.sacCategory || "",',
    '          o.sacSize || "",',
    '          o.quantity || 0,',
    '          o.unitPrice || 0,',
    '          o.totalAmount || 0,',
    '          o.avanceAmount || 0,',
    '          o.resteAmount || 0,',
    '          o.status || "",',
    '          o.notes || ""',
    '        ];',
    '      });',
    '      if (ordersRows.length > 0) {',
    '        ordersSheet.getRange(2, 1, ordersRows.length, ordersHeaders.length).setValues(ordersRows);',
    '      }',
    '    }',
    '',
    '    // 2. مزامنة جدول الصندوق (Caisse)',
    '    if (Array.isArray(data.caisse) && data.caisse.length > 0) {',
    '      var caisseSheet = ss.getSheetByName("الصندوق") || ss.insertSheet("الصندوق");',
    '      caisseSheet.clear();',
    '      var caisseHeaders = ["التاريخ", "النوع", "الصنف", "المبلغ (درهم)", "البيان والوصف", "طريقة الأداء"];',
    '      caisseSheet.appendRow(caisseHeaders);',
    '      caisseSheet.getRange(1, 1, 1, caisseHeaders.length).setBackground("#16A34A").setFontColor("#FFFFFF").setFontWeight("bold");',
    '',
    '      var caisseRows = data.caisse.map(function(c) {',
    '        return [',
    '          c.date || "",',
    '          c.type === "entree" ? "مدخول (+)" : "مصروف (-)",',
    '          c.category || "",',
    '          c.amount || 0,',
    '          c.description || "",',
    '          c.paymentMethod || "especes"',
    '        ];',
    '      });',
    '      if (caisseRows.length > 0) {',
    '        caisseSheet.getRange(2, 1, caisseRows.length, caisseHeaders.length).setValues(caisseRows);',
    '      }',
    '    }',
    '',
    '    // 3. مزامنة جدول المخزون (Stock)',
    '    if (Array.isArray(data.stock) && data.stock.length > 0) {',
    '      var stockSheet = ss.getSheetByName("المخزون") || ss.insertSheet("المخزون");',
    '      stockSheet.clear();',
    '      var stockHeaders = ["المادة", "القسم", "الوحدة", "الكمية الحالية", "ثمن الشراء", "تنبيه النفاد", "اللون", "الشركة / المورد"];',
    '      stockSheet.appendRow(stockHeaders);',
    '      stockSheet.getRange(1, 1, 1, stockHeaders.length).setBackground("#2563EB").setFontColor("#FFFFFF").setFontWeight("bold");',
    '',
    '      var stockRows = data.stock.map(function(s) {',
    '        return [',
    '          s.name || "",',
    '          s.category === "consommables" ? "مواد استهلاك" : "أكياس وسلع",',
    '          s.unit || "حبة",',
    '          s.quantity || 0,',
    '          s.costPrice || 0,',
    '          s.minAlert || 0,',
    '          s.titleColor || "",',
    '          s.supplier || ""',
    '        ];',
    '      });',
    '      if (stockRows.length > 0) {',
    '        stockSheet.getRange(2, 1, stockRows.length, stockHeaders.length).setValues(stockRows);',
    '      }',
    '    }',
    '',
    '    // 4. ورقة سجل المزامنة (Log)',
    '    var logSheet = ss.getSheetByName("سجل_المزامنة") || ss.insertSheet("سجل_المزامنة");',
    '    if (logSheet.getLastRow() === 0) {',
    '      logSheet.appendRow(["التاريخ والوقت", "نوع الإجراء", "عدد الطلبيات", "عدد حركات الصندوق", "المخزون"]);',
    '      logSheet.getRange(1, 1, 1, 5).setFontWeight("bold");',
    '    }',
    '    logSheet.appendRow([',
    '      new Date(),',
    '      data.action || "sync",',
    '      data.ordersCount || (data.orders ? data.orders.length : 0),',
    '      data.caisseCount || (data.caisse ? data.caisse.length : 0),',
    '      data.stockCount || (data.stock ? data.stock.length : 0)',
    '    ]);',
    '',
    '    // 5. إذا طلب إرسال نسخة احتياطية كاملة عبر البريد الإلكتروني',
    '    if (data.action === "send_email_backup" || data.sendEmail === true) {',
    '      var targetEmail = data.email || "masterprintmorocco@gmail.com";',
    '      var backupJsonString = JSON.stringify(data, null, 2);',
    '      var dateFormatted = Utilities.formatDate(new Date(), "GMT+1", "yyyy-MM-dd_HH-mm");',
    '      var attachmentBlob = Utilities.newBlob(backupJsonString, "application/json", "MasterPrint_Backup_" + dateFormatted + ".json");',
    '',
    '      var emailSubject = "Master Print Backup (" + dateFormatted + ")";',
    '      var emailBody = "نسخة احتياطية كاملة لنظام Master Print\\n\\n" +',
    '                      "- تاريخ الحفظ: " + dateFormatted + "\\n" +',
    '                      "- عدد الطلبيات: " + (data.ordersCount || 0) + "\\n" +',
    '                      "- عدد عمليات الصندوق: " + (data.caisseCount || 0) + "\\n\\n" +',
    '                      "ملف النسخة الاحتياطية JSON مرفق مع هذه الرسالة.";',
    '',
    '      MailApp.sendEmail({',
    '        to: targetEmail,',
    '        subject: emailSubject,',
    '        body: emailBody,',
    '        attachments: [attachmentBlob]',
    '      });',
    '    }',
    '',
    '    return ContentService.createTextOutput(JSON.stringify({',
    '      status: "success",',
    '      timestamp: new Date().toISOString()',
    '    })).setMimeType(ContentService.MimeType.JSON);',
    '  } catch (err) {',
    '    return ContentService.createTextOutput(JSON.stringify({',
    '      status: "error",',
    '      message: err.toString()',
    '    })).setMimeType(ContentService.MimeType.JSON);',
    '  }',
    '}',
    '',
    'function doGet(e) {',
    '  return ContentService.createTextOutput(JSON.stringify({',
    '    status: "online",',
    '    message: "Master Print Google Sheets Webhook is active and running!"',
    '  })).setMimeType(ContentService.MimeType.JSON);',
    '}'
  ].join('\n');
}

function copyGoogleScriptCode() {
  const code = getGoogleAppsScriptTemplate();
  if (navigator.clipboard && navigator.clipboard.writeText) {
    navigator.clipboard.writeText(code).then(() => {
      showToast("📋 تم نسخ كود Apps Script بنجاح! الصقه في Code.gs");
    }).catch(() => {
      fallbackCopyScriptCode(code);
    });
  } else {
    fallbackCopyScriptCode(code);
  }
}

function fallbackCopyScriptCode(text) {
  const ta = document.createElement("textarea");
  ta.value = text;
  ta.style.position = "fixed";
  ta.style.left = "-9999px";
  document.body.appendChild(ta);
  ta.focus();
  ta.select();
  try {
    document.execCommand("copy");
    showToast("📋 تم نسخ كود Apps Script بنجاح! الصقه في Code.gs");
  } catch (e) {
    showToast("❌ تعذر النسخ تلقائياً، يمكنك الضغط على 'تحميل ملف Code.gs'");
  }
  document.body.removeChild(ta);
}

function downloadGoogleScriptFile() {
  const code = getGoogleAppsScriptTemplate();
  const blob = new Blob([code], { type: "text/javascript;charset=utf-8" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = "Code.gs";
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  setTimeout(() => URL.revokeObjectURL(url), 1000);
  showToast("💾 تم تحميل ملف Code.gs بنجاح!");
}

function toggleScriptCodeBox() {
  const box = document.getElementById("box-google-script-code");
  if (box) box.classList.toggle("hidden");
}

function openCloudSyncModal() {
  updateNetworkSyncStatus();
  
  const savedUrl = localStorage.getItem("mp_google_script_url") || state.settings?.googleScriptUrl || "";
  const inputEl = document.getElementById("setting-google-script-url");
  if (inputEl) {
    inputEl.value = savedUrl;
    validateGoogleScriptUrlDisplay(savedUrl);
  }

  const pre = document.getElementById("pre-google-script-code");
  if (pre) {
    pre.textContent = getGoogleAppsScriptTemplate();
  }
  
  const modal = document.getElementById("modal-cloud-sync");
  if (modal) modal.classList.remove("hidden");
  lucide.createIcons();
}

function closeCloudSyncModal() {
  const modal = document.getElementById("modal-cloud-sync");
  if (modal) modal.classList.add("hidden");
}

window.setCaissePeriodFilter = setCaissePeriodFilter;
window.initCloudSync = initCloudSync;
window.updateNetworkSyncStatus = updateNetworkSyncStatus;
window.queueSyncAction = queueSyncAction;
window.syncPendingData = syncPendingData;
window.triggerManualSync = triggerManualSync;
window.sendEmailBackup = sendEmailBackup;
window.exportDataBackupJSON = exportDataBackupJSON;
window.saveGoogleScriptUrl = saveGoogleScriptUrl;
window.toggleScriptCodeBox = toggleScriptCodeBox;
window.getGoogleAppsScriptTemplate = getGoogleAppsScriptTemplate;
window.copyGoogleScriptCode = copyGoogleScriptCode;
window.downloadGoogleScriptFile = downloadGoogleScriptFile;
window.openCloudSyncModal = openCloudSyncModal;
window.closeCloudSyncModal = closeCloudSyncModal;

function handleTransactionSubmit(e) {
  e.preventDefault();

  const type = document.getElementById("trans-type").value;
  const amount = parseFloat(document.getElementById("trans-amount").value) || 0;
  const category = document.getElementById("trans-category").value;
  const description = document.getElementById("trans-description").value.trim();
  const paymentMethod = document.getElementById("trans-payment-method").value;
  const date = document.getElementById("trans-date").value || new Date().toISOString().split("T")[0];

  if (amount <= 0) {
    alert("المرجو إدخال مبلغ صحيح.");
    return;
  }

  state.caisse.push({
    id: `trx_${Date.now()}`,
    type,
    amount,
    category,
    description,
    paymentMethod,
    date
  });

  saveData();
  closeTransactionModal();
  renderAll();
}

function deleteTransaction(id) {
  if (confirm("هل تريد حذف هذه العملية من الصندوق؟")) {
    state.caisse = state.caisse.filter(t => t.id !== id);
    saveData();
    renderAll();
  }
}

// ==============================================
// SETTINGS & BACKUP/RESTORE
// ==============================================
function loadSettingsForm() {
  const nameInput = document.getElementById("setting-workshop-name");
  const phoneInput = document.getElementById("setting-phone");
  const cityInput = document.getElementById("setting-city");
  const noteInput = document.getElementById("setting-receipt-note");
  const capitalInput = document.getElementById("setting-initial-capital");
  const startOrderNumInput = document.getElementById("setting-start-order-number");

  if (nameInput) nameInput.value = state.settings.workshopName || "MASTER PRINT";
  if (phoneInput) phoneInput.value = state.settings.phone || "0663103599";
  if (cityInput) cityInput.value = state.settings.city || "Agadir, Maroc";
  if (noteInput) noteInput.value = state.settings.receiptNote || "";
  if (capitalInput) capitalInput.value = (state.settings.initialCapital !== undefined) ? state.settings.initialCapital : 10000;
  if (startOrderNumInput) startOrderNumInput.value = state.settings.startOrderNumber || 100;

  const p1NameInput = document.getElementById("setting-partner1-name");
  const p2NameInput = document.getElementById("setting-partner2-name");
  if (p1NameInput) p1NameInput.value = state.settings.partner1Name || "أنا";
  if (p2NameInput) p2NameInput.value = state.settings.partner2Name || "الشريك";

  const cycleDayInput = document.getElementById("setting-cycle-start-day");
  if (cycleDayInput) cycleDayInput.value = state.settings.cycleStartDay || 10;

  renderBagCostsSettings();
}

const BAG_CATEGORIES_CONFIG = [
  { id: "non_tisse_poignee", key: "Non Tissé - Poignée", label: "Non Tissé - Poignée", group: "Non Tissé", icon: "🛍️", desc: "أكياس تيشو مقبض مقطوع" },
  { id: "non_tisse_anses", key: "Non Tissé - Anses", label: "Non Tissé - Anses", group: "Non Tissé", icon: "👜", desc: "أكياس تيشو بمقابض معلقة" },
  { id: "kraft_torsade", key: "Kraft - Torsadé", label: "كرافت - يد مبرومة (Torsadé)", group: "Kraft", icon: "🥨", desc: "أكياس ورقية كرافت بمقبض مبروم" },
  { id: "kraft_plat", key: "Kraft - Plat", label: "كرافت - يد مسطحة (Plat)", group: "Kraft", icon: "📄", desc: "أكياس ورقية كرافت بمقبض مسطح" },
  { id: "papier_luxe", key: "Papier Luxe", label: "أكياس ورق فاخر (Papier Luxe)", group: "Papier Luxe", icon: "✨", desc: "أكياس ورقية فاخرة ومقواة للمحلات الراقية" },
  { id: "carton_valise", key: "Carton - Boîte valise", label: "كرتون - علبة حقيبة (Boîte valise)", group: "Carton", icon: "🧰", desc: "علب كرتون بمقبض يد حقيبة" },
  { id: "carton_americaine", key: "Carton - Caisse américaine", label: "كرتون - صندوق شحن (Caisse américaine)", group: "Carton", icon: "📦", desc: "صناديق كرتون شحن قياسية 4 أجنحة" },
  { id: "plastique", key: "Plastique", label: "أكياس بلاستيك (Plastique)", group: "Plastique", icon: "🛍️", desc: "بلاستيك مقوى بولي إيثيلين (Rose, Noir, Transparent)" },
  { id: "ruban", key: "Ruban", label: "ريبو / أشرطة ساتان (Ruban)", group: "Ruban", icon: "🎀", desc: "شريط ساتان وتغليف بالبكرة/المتر" }
];

function renderBagCostsSettings() {
  const container = document.getElementById("settings-bag-costs-container");
  if (!container) return;

  let filterHtml = `
    <div class="flex flex-wrap items-center gap-1.5 mb-4 pb-3 border-b border-[#EAEAE5]">
      <button type="button" onclick="filterBagCostSettings('all')" class="bag-cost-filter-btn px-3 py-1.5 rounded-xl text-xs font-black bg-[#C9A227] text-white shadow-2xs transition" data-filter="all">🔘 الكل (9 أصناف)</button>
      <button type="button" onclick="filterBagCostSettings('Non Tissé')" class="bag-cost-filter-btn px-3 py-1.5 rounded-xl text-xs font-bold bg-[#F4F4F0] hover:bg-[#EAEAE5] text-[#6B6B6B] border border-[#D4D4CE] transition" data-filter="Non Tissé">🛍️ Non Tissé</button>
      <button type="button" onclick="filterBagCostSettings('Kraft')" class="bag-cost-filter-btn px-3 py-1.5 rounded-xl text-xs font-bold bg-[#F4F4F0] hover:bg-[#EAEAE5] text-[#6B6B6B] border border-[#D4D4CE] transition" data-filter="Kraft">📜 كرافت (Kraft)</button>
      <button type="button" onclick="filterBagCostSettings('Papier Luxe')" class="bag-cost-filter-btn px-3 py-1.5 rounded-xl text-xs font-bold bg-[#F4F4F0] hover:bg-[#EAEAE5] text-[#6B6B6B] border border-[#D4D4CE] transition" data-filter="Papier Luxe">✨ ورق فاخر (Papier Luxe)</button>
      <button type="button" onclick="filterBagCostSettings('Carton')" class="bag-cost-filter-btn px-3 py-1.5 rounded-xl text-xs font-bold bg-[#F4F4F0] hover:bg-[#EAEAE5] text-[#6B6B6B] border border-[#D4D4CE] transition" data-filter="Carton">📦 كرتون (Carton)</button>
      <button type="button" onclick="filterBagCostSettings('Plastique')" class="bag-cost-filter-btn px-3 py-1.5 rounded-xl text-xs font-bold bg-[#F4F4F0] hover:bg-[#EAEAE5] text-[#6B6B6B] border border-[#D4D4CE] transition" data-filter="Plastique">🛍️ بلاستيك (Plastique)</button>
      <button type="button" onclick="filterBagCostSettings('Ruban')" class="bag-cost-filter-btn px-3 py-1.5 rounded-xl text-xs font-bold bg-[#F4F4F0] hover:bg-[#EAEAE5] text-[#6B6B6B] border border-[#D4D4CE] transition" data-filter="Ruban">🎀 ريبو (Ruban)</button>
    </div>
  `;

  let cardsHtml = `<div class="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">`;

  BAG_CATEGORIES_CONFIG.forEach(c => {
    const sizes = getCategorySizes(c.key);
    cardsHtml += `
      <div class="bag-cost-cat-card bg-[#FAFAF8] p-4 rounded-2xl border border-[#EAEAE5] space-y-2.5 transition hover:border-[#D4D4CE] shadow-2xs" data-category="${c.key}" data-group="${c.group}">
        <div class="flex items-center justify-between pb-2.5 border-b border-[#EAEAE5]">
          <div class="flex items-center gap-2">
            <span class="text-lg">${c.icon}</span>
            <div>
              <h4 class="text-xs font-black text-[#111111]">${c.label}</h4>
              <span class="text-[10px] text-[#6B6B6B]">${c.desc}</span>
            </div>
          </div>
          <span id="badge-cat-count-${c.id}" class="text-[10px] text-[#C9A227] font-bold bg-[#FAF6EA] px-2 py-0.5 rounded-full border border-[#E8DCB5]">${sizes.length} قياسات</span>
        </div>

        <div id="bag-size-rows-${c.id}" class="space-y-2 mt-2">
    `;

    sizes.forEach(s => {
      const cost = getBagDefaultCost(c.key, s);
      const valStr = (cost !== null && cost !== undefined && !isNaN(cost)) ? Number(cost).toFixed(2) : "0.00";
      cardsHtml += `
        <div class="bag-size-row flex items-center gap-1.5 text-xs py-1.5 border-b border-[#EAEAE5]/60 last:border-0 hover:bg-white/60 px-1 rounded-lg transition">
          <input type="text" value="${escapeHtml(s)}" placeholder="القياس (مثال: 30x40 cm)" class="bag-size-name-input flex-1 min-w-0 bg-white border border-[#D4D4CE] rounded-lg px-2.5 py-1 text-xs font-bold text-[#111111] focus:border-[#C9A227] focus:ring-1 focus:ring-[#C9A227]/20 outline-none transition shadow-2xs" required>
          <div class="flex items-center gap-1 flex-shrink-0">
            <input type="number" step="any" min="0" value="${valStr}" placeholder="0.00" class="bag-cost-price-input w-20 bg-white border border-[#D4D4CE] rounded-lg px-2 py-1 text-xs font-black text-[#16B981] text-left focus:border-[#C9A227] focus:ring-1 focus:ring-[#C9A227]/20 outline-none transition shadow-2xs">
            <span class="text-[10px] text-[#6B6B6B] font-bold">درهم</span>
          </div>
          <button type="button" onclick="removeBagSizeRow(this, '${c.id}')" class="p-1.5 text-[#6B6B6B] hover:text-[#EF4444] hover:bg-rose-50 rounded-lg transition flex-shrink-0" title="حذف هذا القياس">
            <i data-lucide="trash-2" class="w-3.5 h-3.5"></i>
          </button>
        </div>
      `;
    });

    cardsHtml += `
        </div>

        <button type="button" onclick="addBagSizeRow('${c.id}')" class="w-full py-2 mt-2 bg-white hover:bg-[#FAF6EA] border border-dashed border-[#D4D4CE] hover:border-[#C9A227] text-[#C9A227] text-xs font-bold rounded-xl transition flex items-center justify-center gap-1.5 shadow-2xs">
          <i data-lucide="plus" class="w-4 h-4"></i>
          <span>إضافة قياس جديد لـ ${c.label}</span>
        </button>
      </div>
    `;
  });

  cardsHtml += `</div>`;

  let footerHtml = `
    <div class="mt-5 flex flex-col sm:flex-row items-center justify-between gap-3 pt-4 border-t border-[#EAEAE5]">
      <div class="flex items-center gap-2">
        <button type="button" onclick="saveBagCostsSettings()" class="px-5 py-2.5 bg-[#C9A227] hover:bg-[#B8921F] text-white text-xs font-black rounded-xl transition shadow-sm flex items-center justify-center gap-2">
          <i data-lucide="check" class="w-4 h-4"></i>
          <span>حفظ القياسات والتسعيرة الافتراضية</span>
        </button>
        <button type="button" onclick="resetBagCostsToDefault()" class="px-4 py-2.5 bg-[#F4F4F0] hover:bg-[#EAEAE5] text-[#6B6B6B] text-xs font-bold rounded-xl border border-[#D4D4CE] transition flex items-center justify-center gap-1.5">
          <i data-lucide="rotate-ccw" class="w-3.5 h-3.5"></i>
          <span>استرجاع القياسات والأثمنة الأصلية</span>
        </button>
      </div>
      <p class="text-[11px] text-[#6B6B6B] text-center sm:text-left">
        💡 يمكنك تعديل أو حذف أي قياس أو إضافة قياسات جديدة، وسيتم تحديثها فوراً في نافذة تسجيل الطلبيات.
      </p>
    </div>
  `;

  container.innerHTML = filterHtml + cardsHtml + footerHtml;
  lucide.createIcons();
}

function addBagSizeRow(catId, initialName = "", initialPrice = "") {
  const container = document.getElementById(`bag-size-rows-${catId}`);
  if (!container) return;

  const row = document.createElement("div");
  row.className = "bag-size-row flex items-center gap-1.5 text-xs py-1.5 border-b border-[#EAEAE5]/60 last:border-0 hover:bg-white/60 px-1 rounded-lg transition";
  row.innerHTML = `
    <input type="text" value="${escapeHtml(initialName)}" placeholder="القياس (مثال: 30x40 cm)" class="bag-size-name-input flex-1 min-w-0 bg-white border border-[#D4D4CE] rounded-lg px-2.5 py-1 text-xs font-bold text-[#111111] focus:border-[#C9A227] focus:ring-1 focus:ring-[#C9A227]/20 outline-none transition shadow-2xs" required>
    <div class="flex items-center gap-1 flex-shrink-0">
      <input type="number" step="any" min="0" value="${initialPrice}" placeholder="0.00" class="bag-cost-price-input w-20 bg-white border border-[#D4D4CE] rounded-lg px-2 py-1 text-xs font-black text-[#16B981] text-left focus:border-[#C9A227] focus:ring-1 focus:ring-[#C9A227]/20 outline-none transition shadow-2xs">
      <span class="text-[10px] text-[#6B6B6B] font-bold">درهم</span>
    </div>
    <button type="button" onclick="removeBagSizeRow(this, '${catId}')" class="p-1.5 text-[#6B6B6B] hover:text-[#EF4444] hover:bg-rose-50 rounded-lg transition flex-shrink-0" title="حذف هذا القياس">
      <i data-lucide="trash-2" class="w-3.5 h-3.5"></i>
    </button>
  `;
  container.appendChild(row);
  lucide.createIcons();
  updateCategorySizeCount(catId);
  const newNameInput = row.querySelector(".bag-size-name-input");
  if (newNameInput && !initialName) newNameInput.focus();
}

function removeBagSizeRow(btn, catId) {
  const row = btn.closest(".bag-size-row");
  if (!row) return;
  row.remove();
  updateCategorySizeCount(catId);
}

function updateCategorySizeCount(catId) {
  const container = document.getElementById(`bag-size-rows-${catId}`);
  const badge = document.getElementById(`badge-cat-count-${catId}`);
  if (container && badge) {
    const count = container.querySelectorAll(".bag-size-row").length;
    badge.textContent = `${count} قياسات`;
  }
}

window.addBagSizeRow = addBagSizeRow;
window.removeBagSizeRow = removeBagSizeRow;
window.updateCategorySizeCount = updateCategorySizeCount;

function filterBagCostSettings(filterKey) {
  const cards = document.querySelectorAll(".bag-cost-cat-card");
  cards.forEach(card => {
    const cat = card.dataset.category;
    const group = card.dataset.group;
    if (filterKey === "all" || group === filterKey || cat === filterKey) {
      card.classList.remove("hidden");
    } else {
      card.classList.add("hidden");
    }
  });

  const buttons = document.querySelectorAll(".bag-cost-filter-btn");
  buttons.forEach(btn => {
    if (btn.dataset.filter === filterKey) {
      btn.className = "bag-cost-filter-btn px-3 py-1.5 rounded-xl text-xs font-black bg-[#C9A227] text-white shadow-2xs transition";
    } else {
      btn.className = "bag-cost-filter-btn px-3 py-1.5 rounded-xl text-xs font-bold bg-[#F4F4F0] hover:bg-[#EAEAE5] text-[#6B6B6B] border border-[#D4D4CE] transition";
    }
  });
}
window.filterBagCostSettings = filterBagCostSettings;

function saveBagCostsSettings() {
  if (!state.settings) state.settings = DEFAULT_SETTINGS;
  if (!state.settings.bagCosts) state.settings.bagCosts = {};
  if (!state.settings.sacCatalog) state.settings.sacCatalog = {};

  const newCatalog = {};
  const newCosts = {};

  BAG_CATEGORIES_CONFIG.forEach(c => {
    newCatalog[c.key] = [];
    newCosts[c.key] = {};

    const container = document.getElementById(`bag-size-rows-${c.id}`);
    if (!container) {
      newCatalog[c.key] = getCategorySizes(c.key);
      newCosts[c.key] = (state.settings.bagCosts && state.settings.bagCosts[c.key]) ? { ...state.settings.bagCosts[c.key] } : { ...SAC_DEFAULT_COSTS[c.key] };
      return;
    }

    const rows = container.querySelectorAll(".bag-size-row");
    rows.forEach(row => {
      const nameInp = row.querySelector(".bag-size-name-input");
      const priceInp = row.querySelector(".bag-cost-price-input");
      const sizeName = nameInp ? nameInp.value.trim() : "";
      const priceVal = priceInp ? parseFloat(priceInp.value) : 0;

      if (sizeName) {
        newCatalog[c.key].push(sizeName);
        newCosts[c.key][sizeName] = isNaN(priceVal) ? 0 : priceVal;
      }
    });
  });

  state.settings.sacCatalog = newCatalog;
  state.settings.bagCosts = newCosts;
  saveData();

  // تحديث فوري للقوائم المنسدلة في نافذة تسجيل وتعديل الطلبيات
  const currentCat = document.getElementById("order-sac-category")?.value || "Non Tissé";
  populateSacSizes(currentCat);

  renderBagCostsSettings();
  alert("✅ تم بنجاح حفظ القياسات والأثمنة!\n\nتم تحديث القوائم المنسدلة تلقائياً في نافذة تسجيل وتعديل الطلبيات.");
}

function resetBagCostsToDefault() {
  if (!confirm("هل تريد استرجاع جميع القياسات والأثمنة الافتراضية الأصلية؟\n\nسيتم استرجاع كتالوج القياسات المبدئي والأسعار لجميع الأصناف السبعة.")) return;
  if (!state.settings) state.settings = DEFAULT_SETTINGS;
  state.settings.sacCatalog = JSON.parse(JSON.stringify(SAC_CATALOG));
  state.settings.bagCosts = JSON.parse(JSON.stringify(SAC_DEFAULT_COSTS));
  saveData();

  const currentCat = document.getElementById("order-sac-category")?.value || "Non Tissé";
  populateSacSizes(currentCat);

  renderBagCostsSettings();
  alert("✅ تم استرجاع القياسات والأثمنة الأصلية بنجاح!");
}

function saveSettings() {
  state.settings.workshopName = document.getElementById("setting-workshop-name").value.trim();
  state.settings.phone = document.getElementById("setting-phone").value.trim();
  state.settings.city = document.getElementById("setting-city").value.trim();
  state.settings.receiptNote = document.getElementById("setting-receipt-note").value.trim();

  const capVal = parseFloat(document.getElementById("setting-initial-capital")?.value);
  state.settings.initialCapital = isNaN(capVal) ? 10000 : capVal;

  const startNumVal = parseInt(document.getElementById("setting-start-order-number")?.value, 10);
  state.settings.startOrderNumber = isNaN(startNumVal) || startNumVal < 1 ? 100 : startNumVal;

  const p1Val = document.getElementById("setting-partner1-name")?.value.trim();
  const p2Val = document.getElementById("setting-partner2-name")?.value.trim();
  state.settings.partner1Name = p1Val || "أنا";
  state.settings.partner2Name = p2Val || "الشريك";

  const cycleDayVal = parseInt(document.getElementById("setting-cycle-start-day")?.value, 10);
  state.settings.cycleStartDay = (isNaN(cycleDayVal) || cycleDayVal < 1 || cycleDayVal > 28) ? 10 : cycleDayVal;

  saveData();
  renderAll();
  alert("تم حفظ الإعدادات ورأس مال الانطلاق وأسماء الشركاء بنجاح!");
}

function exportBackupJSON() {
  const fullBackup = {
    version: "2.2",
    date: new Date().toISOString(),
    settings: state.settings,
    orders: state.orders,
    caisse: state.caisse,
    stock: state.stock
  };

  const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(fullBackup, null, 2));
  const downloadAnchor = document.createElement("a");
  downloadAnchor.setAttribute("href", dataStr);
  downloadAnchor.setAttribute("download", `MasterPrint_نسخة_احتياطية_${new Date().toISOString().split("T")[0]}.json`);
  document.body.appendChild(downloadAnchor);
  downloadAnchor.click();
  downloadAnchor.remove();
}

function importBackupJSON(event) {
  const file = event.target.files[0];
  if (!file) return;

  const reader = new FileReader();
  reader.onload = function(e) {
    try {
      const parsed = JSON.parse(e.target.result);
      if (parsed.orders && parsed.caisse) {
        state.orders = parsed.orders || [];
        state.caisse = parsed.caisse || [];
        state.stock = parsed.stock || [];
        state.settings = parsed.settings || DEFAULT_SETTINGS;
        saveData();
        renderAll();
        alert("تم استرجاع جميع البيانات بنجاح!");
      } else {
        alert("الملف غير صالح.");
      }
    } catch (err) {
      alert("خطأ في قراءة الملف: " + err.message);
    }
  };
  reader.readAsText(file);
}

function resetAllData() {
  if (confirm("⚠️ تحذير: هل أنت متأكد من مسح جميع البيانات؟ لا يمكن التراجع عن هذا الإجراء.")) {
    localStorage.clear();
    state.orders = [];
    state.caisse = [];
    state.stock = [];
    state.settings = DEFAULT_SETTINGS;
    saveData();
    renderAll();
    alert("تمت إعادة ضبط البيانات بنجاح.");
  }
}

// ==============================================
// EXCEL EXPORTS
// ==============================================
function exportOrdersToExcel() {
  if (typeof XLSX === "undefined") return;

  const exportData = state.orders.map(o => ({
    "رقم الطلبية": o.id,
    "التاريخ": o.date,
    "الزبون": o.clientName,
    "الهاتف": o.clientPhone,
    "المدينة": o.clientCity,
    "النوع": o.type === 'serigraphie' ? 'أكياس سيريغرافي' : 'مطبعة خارجية',
    "البيان": o.designation,
    "الكمية": o.quantity,
    "ثمن البيع للحبة (درهم)": o.unitPrice || 0,
    "ثمن الشراء للحبة / التكلفة (درهم)": o.buyPrice || (o.subCost || 0),
    "الألوان": o.colorsCount,
    "سعر اللون الإضافي (درهم)": o.extraColorPrice || 0,
    "المبلغ الإجمالي (درهم)": o.totalAmount,
    "الربح الصافي المقدر (درهم)": o.netProfit !== undefined ? o.netProfit : (o.subCost ? ((o.totalAmount - (o.deliveryType === 'ozone' ? Number(o.ozoneFees || 0) : 0)) - o.subCost) : (o.buyPrice ? ((o.totalAmount - (o.deliveryType === 'ozone' ? Number(o.ozoneFees || 0) : 0)) - (o.buyPrice * o.quantity)) : 0)),
    "العربون المدفوع (درهم)": o.avanceAmount,
    "الباقي للتحصيل (درهم)": Math.max(0, o.totalAmount - o.avanceAmount),
    "طريقة الاستلام": o.deliveryType === 'local' ? 'توصيل محلي' : (o.deliveryType === 'ozone' ? 'أوزون إكسبريس' : 'تسليم بالورشة'),
    "الموزع أو التتبع": o.deliveryType === 'local' ? o.localLivreur : (o.ozoneTracking || ""),
    "الحالة": o.status,
    "ملاحظات": o.notes || ""
  }));

  const worksheet = XLSX.utils.json_to_sheet(exportData);
  const workbook = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(workbook, worksheet, "الطلبيات");
  XLSX.writeFile(workbook, `طلبيات_ماستر_برينت_${new Date().toISOString().split("T")[0]}.xlsx`);
}

function exportCaisseToExcel() {
  if (typeof XLSX === "undefined") return;

  const exportData = state.caisse.map(t => ({
    "التاريخ": t.date,
    "النوع": t.type === "entree" ? "مدخول" : "مصروف",
    "الفئة": getCategoryLabel(t.category),
    "البيان": t.description,
    "طريقة الدفع": t.paymentMethod,
    "المبلغ (درهم)": t.amount
  }));

  const worksheet = XLSX.utils.json_to_sheet(exportData);
  const workbook = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(workbook, worksheet, "سجل_الصندوق");
  XLSX.writeFile(workbook, `سجل_صندوق_ماستر_برينت_${new Date().toISOString().split("T")[0]}.xlsx`);
}

function exportFullDatabaseToExcel() {
  if (typeof XLSX === "undefined") {
    alert("مكتبة Excel غير متوفرة.");
    return;
  }

  const workbook = XLSX.utils.book_new();

  // 1. ورقة الطلبيات
  const ordersData = (state.orders || []).map(o => ({
    "رقم الطلب": o.id,
    "التاريخ": o.date,
    "اسم الزبون": o.clientName,
    "الهاتف": o.clientPhone,
    "المدينة": o.clientCity,
    "نوع الطباعة": o.type,
    "الصنف": o.sacCategory,
    "القياس": o.sacSize,
    "الكمية": o.quantity,
    "ثمن البيع للحبة (درهم)": o.unitPrice,
    "المبلغ الإجمالي (درهم)": o.totalAmount,
    "التسبيق (درهم)": o.avanceAmount,
    "الباقي (درهم)": Math.max(0, o.totalAmount - o.avanceAmount),
    "الحالة": o.status,
    "ملاحظات": o.notes || ""
  }));
  const ordersSheet = XLSX.utils.json_to_sheet(ordersData);
  XLSX.utils.book_append_sheet(workbook, ordersSheet, "الطلبيات");

  // 2. ورقة الصندوق
  const caisseData = (state.caisse || []).map(t => ({
    "التاريخ": t.date,
    "النوع": t.type === "entree" ? "مدخول (+)" : "مصروف (-)",
    "الفئة": typeof getCategoryLabel === "function" ? getCategoryLabel(t.category) : t.category,
    "المبلغ (درهم)": t.amount,
    "البيان والوصف": t.description,
    "طريقة الدفع": t.paymentMethod
  }));
  const caisseSheet = XLSX.utils.json_to_sheet(caisseData);
  XLSX.utils.book_append_sheet(workbook, caisseSheet, "الصندوق");

  // 3. ورقة المخزون
  const stockData = (state.stock || []).map(s => ({
    "المادة": s.name,
    "القسم": s.category === "consommables" ? "مواد استهلاك" : "أكياس وسلع",
    "الوحدة": s.unit || "حبة",
    "الكمية الحالية": s.quantity || 0,
    "ثمن الشراء (درهم)": s.costPrice || 0,
    "تنبيه النفاد": s.minAlert || 0,
    "اللون": s.titleColor || "",
    "المورد / الشركة": s.supplier || ""
  }));
  const stockSheet = XLSX.utils.json_to_sheet(stockData);
  XLSX.utils.book_append_sheet(workbook, stockSheet, "المخزون");

  const dateStr = new Date().toISOString().split("T")[0];
  XLSX.writeFile(workbook, `MasterPrint_قاعدة_البيانات_${dateStr}.xlsx`);
  showToast("📗 تم تنزيل ملف Excel الشامل (الطلبيات، الصندوق، المخزون) بنجاح!");
}

window.exportFullDatabaseToExcel = exportFullDatabaseToExcel;

function escapeHtml(str) {
  if (!str) return "";
  return String(str).replace(/[&<>"']/g, function(m) {
    return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[m];
  });
}

// ==============================================
// SPONSORING & ADS MANAGEMENT
// ==============================================
function renderSponsoringTab() {
  const container = document.getElementById("sponsoring-table-body");
  if (!container) return;

  const allSponsoring = state.caisse
    .filter(t => t.type === "sortie" && t.category === "sponsoring")
    .sort((a, b) => new Date(b.date) - new Date(a.date));

  const cycleSponsoring = allSponsoring.filter(t => isDateInSelectedCycle(t.date));
  const totalSpent = cycleSponsoring.reduce((sum, t) => sum + Number(t.amount || 0), 0);

  const cycleEntrees = state.caisse
    .filter(t => isDateInSelectedCycle(t.date) && t.type === "entree")
    .reduce((sum, t) => sum + Number(t.amount || 0), 0);

  const ratioCA = (cycleEntrees > 0) ? ((totalSpent / cycleEntrees) * 100).toFixed(1) : "0.0";

  const cycleOrders = state.orders.filter(o => isDateInSelectedCycle(o.date));
  const orderCount = cycleOrders.length;
  const costPerOrder = (orderCount > 0) ? (totalSpent / orderCount).toFixed(2) : "0.00";

  const elTotal = document.getElementById("sponsoring-total-spent");
  const elRatio = document.getElementById("sponsoring-ratio-ca");
  const elCAC = document.getElementById("sponsoring-cost-per-order");
  const elDesc = document.getElementById("sponsoring-orders-count-desc");
  const elCount = document.getElementById("sponsoring-count-badge");
  const navBadge = document.getElementById("nav-sponsoring-badge");

  if (elTotal) elTotal.textContent = `${totalSpent.toFixed(2)} درهم`;
  if (elRatio) elRatio.textContent = `${ratioCA}%`;
  if (elCAC) elCAC.textContent = `${costPerOrder} درهم`;
  if (elDesc) elDesc.textContent = `بناءً على ${orderCount} طلبية مسجلة في هذا الشهر`;
  if (elCount) elCount.textContent = `${cycleSponsoring.length} عمليات إعلان`;
  if (navBadge) navBadge.textContent = `${totalSpent.toFixed(0)} DH`;

  if (cycleSponsoring.length === 0) {
    container.innerHTML = `
      <tr>
        <td colspan="6" class="py-8 text-center text-[#6B6B6B]">
          <div class="flex flex-col items-center justify-center gap-1.5">
            <span class="text-2xl">📣</span>
            <span class="font-bold text-xs">لا توجد مصاريف إعلانات مسجلة في هذا الشهر.</span>
            <button onclick="openNewAdModal()" class="mt-2 text-xs text-[#C9A227] font-bold hover:underline">+ تسجيل أول دفعة إعلانية</button>
          </div>
        </td>
      </tr>
    `;
    return;
  }

  container.innerHTML = cycleSponsoring.map(t => {
    let platform = "إعلانات سبونسورينغ";
    let desc = t.description || "";
    if (desc.includes("[") && desc.includes("]")) {
      const match = desc.match(/\[(.*?)\]/);
      if (match) {
        platform = match[1];
        desc = desc.replace(/\[.*?\]/, "").trim();
      }
    }

    const payLabel = t.paymentMethod === "virement" ? "🏦 بطاقة / تحويل" : (t.paymentMethod === "cheque" ? "📝 شيك" : "💵 كاش نقداً");

    return `
      <tr class="hover:bg-[#FAFAF8] transition">
        <td class="py-3 px-4 font-mono font-bold text-[#111111]">${t.date}</td>
        <td class="py-3 px-4">
          <span class="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg text-xs font-bold bg-[#FAF6EA] text-[#8A6D0B] border border-[#E8DCB5]">
            📣 ${escapeHtml(platform)}
          </span>
        </td>
        <td class="py-3 px-4 font-medium text-[#111111]">${escapeHtml(desc || t.description)}</td>
        <td class="py-3 px-4 text-[#6B6B6B]">${payLabel}</td>
        <td class="py-3 px-4 text-left font-mono font-black text-[#EF4444] text-sm">
          ${Number(t.amount || 0).toFixed(2)} درهم
        </td>
        <td class="py-3 px-4 text-center">
          <button onclick="deleteTransaction('${t.id}')" class="p-1 text-[#6B6B6B] hover:text-rose-600 transition" title="حذف">
            <i data-lucide="trash" class="w-3.5 h-3.5"></i>
          </button>
        </td>
      </tr>
    `;
  }).join("");

  lucide.createIcons();
}

function openNewAdModal() {
  const form = document.getElementById("ad-expense-form");
  if (form) form.reset();
  const dateEl = document.getElementById("ad-date");
  if (dateEl) dateEl.value = new Date().toISOString().split("T")[0];
  const modal = document.getElementById("modal-ad-expense");
  if (modal) modal.classList.remove("hidden");
  lucide.createIcons();
}

function closeNewAdModal() {
  const modal = document.getElementById("modal-ad-expense");
  if (modal) modal.classList.add("hidden");
}

function handleAdSubmit(event) {
  event.preventDefault();
  const platform = document.getElementById("ad-platform")?.value || "Facebook & Instagram Ads";
  const amount = parseFloat(document.getElementById("ad-amount")?.value);
  const notes = document.getElementById("ad-notes")?.value.trim() || "حملة إعلانية ممولة";
  const paymentMethod = document.getElementById("ad-payment-method")?.value || "virement";
  const date = document.getElementById("ad-date")?.value || new Date().toISOString().split("T")[0];

  if (isNaN(amount) || amount <= 0) {
    alert("يرجى إدخال مبلغ إعلاني صحيح.");
    return;
  }

  state.caisse.push({
    id: `trx_ad_${Date.now()}`,
    type: "sortie",
    category: "sponsoring",
    amount: amount,
    description: `[${platform}] ${notes}`,
    paymentMethod: paymentMethod,
    date: date
  });

  saveData();
  closeNewAdModal();
  renderAll();
  alert(`✅ تم بنجاح تسجيل مصروف الإعلان بقيمة ${amount.toFixed(2)} درهم وخصمه من الصندوق!`);
}

// ==============================================
// TEAM & PARTNERS SALARIES MANAGEMENT
// ==============================================
let currentAssociatesSubTab = "employees";

function switchAssociatesSubTab(subTab) {
  currentAssociatesSubTab = subTab;
  const btnEmp = document.getElementById("subtab-btn-employees");
  const btnPart = document.getElementById("subtab-btn-partners");
  const panelEmp = document.getElementById("subtab-panel-employees");
  const panelPart = document.getElementById("subtab-panel-partners");

  if (subTab === "employees") {
    if (panelEmp) panelEmp.classList.remove("hidden");
    if (panelPart) panelPart.classList.add("hidden");
    if (btnEmp) {
      btnEmp.className = "flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-black bg-[#C9A227] text-white shadow-2xs transition";
    }
    if (btnPart) {
      btnPart.className = "flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold bg-[#F4F4F0] hover:bg-[#EAEAE5] text-[#6B6B6B] border border-[#D4D4CE] transition";
    }
  } else {
    if (panelEmp) panelEmp.classList.add("hidden");
    if (panelPart) panelPart.classList.remove("hidden");
    if (btnPart) {
      btnPart.className = "flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-black bg-[#C9A227] text-white shadow-2xs transition";
    }
    if (btnEmp) {
      btnEmp.className = "flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold bg-[#F4F4F0] hover:bg-[#EAEAE5] text-[#6B6B6B] border border-[#D4D4CE] transition";
    }
  }
  lucide.createIcons();
}

function renderAssociatesTab() {
  const p1Name = (state.settings && state.settings.partner1Name) ? state.settings.partner1Name : "أنا";
  const p2Name = (state.settings && state.settings.partner2Name) ? state.settings.partner2Name : "الشريك";

  // ----------------------------------------------------
  // A. رواتب ومستحقات العمال والمستخدمين (Salaires Employés)
  // ----------------------------------------------------
  const allEmpSalaries = state.caisse
    .filter(t => t.type === "sortie" && t.category === "salaire_employe")
    .sort((a, b) => new Date(b.date) - new Date(a.date));

  const cycleEmpSalaries = allEmpSalaries.filter(t => isDateInSelectedCycle(t.date));
  const totalEmpSalaries = cycleEmpSalaries.reduce((sum, t) => sum + Number(t.amount || 0), 0);

  const distinctWorkers = new Set();
  cycleEmpSalaries.forEach(t => {
    if (t.employeeName) distinctWorkers.add(t.employeeName.trim());
  });

  const cycleEntrees = state.caisse
    .filter(t => isDateInSelectedCycle(t.date) && t.type === "entree")
    .reduce((sum, t) => sum + Number(t.amount || 0), 0);

  const empRatio = (cycleEntrees > 0) ? ((totalEmpSalaries / cycleEntrees) * 100).toFixed(1) : "0.0";

  // Updating Employee KPIs
  const elEmpTotal = document.getElementById("emp-total-salaries-cycle");
  const elEmpCount = document.getElementById("emp-active-count-cycle");
  const elEmpDistinct = document.getElementById("emp-distinct-workers-text");
  const elEmpRatio = document.getElementById("emp-ratio-income");
  const elBadgeEmpCount = document.getElementById("badge-employees-count");
  const elEmpCountBadge = document.getElementById("employees-count-badge");

  if (elEmpTotal) elEmpTotal.textContent = `${totalEmpSalaries.toFixed(2)} درهم`;
  if (elEmpCount) elEmpCount.textContent = `${cycleEmpSalaries.length} عمليات`;
  if (elEmpDistinct) elEmpDistinct.textContent = `${distinctWorkers.size} عمال مسجلين`;
  if (elEmpRatio) elEmpRatio.textContent = `${empRatio}%`;
  if (elBadgeEmpCount) elBadgeEmpCount.textContent = `${cycleEmpSalaries.length}`;
  if (elEmpCountBadge) elEmpCountBadge.textContent = `${cycleEmpSalaries.length} عمليات`;

  // Render Employee Table
  const empTableBody = document.getElementById("employees-salary-table-body");
  if (empTableBody) {
    if (cycleEmpSalaries.length === 0) {
      empTableBody.innerHTML = `
        <tr>
          <td colspan="8" class="py-8 text-center text-[#6B6B6B]">
            <div class="flex flex-col items-center justify-center gap-1.5">
              <span class="text-2xl">👷</span>
              <span class="font-bold text-xs">لا توجد أداءات رواتب أو تسبيقات مسجلة للعمال في هذه الدورة.</span>
              <button onclick="openEmployeeSalaryModal()" class="mt-2 text-xs text-[#C9A227] font-bold hover:underline">+ تسجيل أول دفعة أجر أو تسبيق</button>
            </div>
          </td>
        </tr>
      `;
    } else {
      empTableBody.innerHTML = cycleEmpSalaries.map(t => {
        const empName = t.employeeName || "عامل بالورشة";
        const empRole = t.employeeRole || "مستخدم";
        const salaryType = t.salaryType || "salaire";

        let typeBadge = "";
        if (salaryType === "salaire") {
          typeBadge = `<span class="px-2 py-0.5 rounded-full text-[10px] font-bold bg-blue-50 text-blue-700 border border-blue-200">راتب شهري</span>`;
        } else if (salaryType === "semaine") {
          typeBadge = `<span class="px-2 py-0.5 rounded-full text-[10px] font-bold bg-amber-50 text-amber-800 border border-amber-300">سيمانة</span>`;
        } else if (salaryType === "avance") {
          typeBadge = `<span class="px-2 py-0.5 rounded-full text-[10px] font-bold bg-purple-50 text-purple-700 border border-purple-200">تسبيق (Avance)</span>`;
        } else {
          typeBadge = `<span class="px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-50 text-emerald-700 border border-emerald-200">مكافأة (Prime)</span>`;
        }

        const payLabel = (t.paymentMethod === "virement") ? "🏦 تحويل بنكي" : (t.paymentMethod === "cheque" ? "📝 شيك" : "💵 كاش من الصندوق");
        const notesText = t.notes || t.description || "أداء مستحقات";

        return `
          <tr class="hover:bg-[#FAFAF8] transition">
            <td class="py-3 px-4 font-mono font-bold text-[#111111]">${t.date}</td>
            <td class="py-3 px-4">
              <div class="flex items-center gap-1.5">
                <span class="w-6 h-6 rounded-full bg-[#FAF6EA] border border-[#E8DCB5] flex items-center justify-center text-[11px] font-bold text-[#C9A227]">
                  ${escapeHtml(empName.charAt(0))}
                </span>
                <span class="font-bold text-[#111111] text-xs">${escapeHtml(empName)}</span>
              </div>
            </td>
            <td class="py-3 px-4 text-[#6B6B6B] text-[11px]">${escapeHtml(empRole)}</td>
            <td class="py-3 px-4">${typeBadge}</td>
            <td class="py-3 px-4 font-medium text-[#111111] text-[11px] max-w-xs truncate">${escapeHtml(notesText)}</td>
            <td class="py-3 px-4 text-[#6B6B6B] text-[11px]">${payLabel}</td>
            <td class="py-3 px-4 text-left font-mono font-black text-[#EF4444] text-sm">
              - ${Number(t.amount || 0).toFixed(2)} درهم
            </td>
            <td class="py-3 px-4 text-center">
              <div class="flex items-center justify-center gap-1">
                <button onclick="openEmployeeReceiptModal('${t.id}')" class="p-1 text-[#C9A227] hover:text-[#B8921F] hover:bg-[#FAF6EA] rounded-lg transition" title="معاينة وطباعة وصل الأداء / واتساب">
                  <i data-lucide="receipt" class="w-4 h-4"></i>
                </button>
                <button onclick="deleteTransaction('${t.id}')" class="p-1 text-[#6B6B6B] hover:text-rose-600 hover:bg-rose-50 rounded-lg transition" title="حذف">
                  <i data-lucide="trash" class="w-4 h-4"></i>
                </button>
              </div>
            </td>
          </tr>
        `;
      }).join("");
    }
  }

  // ----------------------------------------------------
  // B. مسحوبات وحسابات الشركاء (Associés)
  // ----------------------------------------------------
  const partnerTableBody = document.getElementById("associates-table-body");

  const allWithdrawals = state.caisse
    .filter(t => t.type === "sortie" && (t.category === "retrait_p1" || t.category === "retrait_p2" || t.category === "retrait_perso"))
    .sort((a, b) => new Date(b.date) - new Date(a.date));

  const curCycleRange = getCycleRange();
  const prevCycleRange = getPreviousCycleRange();

  // تحديد فلتر الفترة للسحوبات (الافتراضي هو السجل الكامل لضمان عدم إخفاء أي سحوبات مسجلة)
  if (!state.associatesCycleFilter) {
    state.associatesCycleFilter = "ALL";
  }

  let displayedWithdrawals = [];
  let filterLabel = "";
  let cycleEntreesForPartners = 0;
  let cycleOperatingSorties = 0;

  if (state.associatesCycleFilter === "CURRENT") {
    displayedWithdrawals = allWithdrawals.filter(t => t.date >= curCycleRange.start && t.date <= curCycleRange.end);
    filterLabel = `الدورة الحالية (${curCycleRange.start} إلى ${curCycleRange.end})`;
    cycleEntreesForPartners = state.caisse
      .filter(t => t.date >= curCycleRange.start && t.date <= curCycleRange.end && t.type === "entree")
      .reduce((sum, t) => sum + Number(t.amount || 0), 0);
    cycleOperatingSorties = state.caisse
      .filter(t => t.date >= curCycleRange.start && t.date <= curCycleRange.end && t.type === "sortie" && t.category !== "retrait_p1" && t.category !== "retrait_p2" && t.category !== "retrait_perso")
      .reduce((sum, t) => sum + Number(t.amount || 0), 0);
  } else if (state.associatesCycleFilter === "PREVIOUS") {
    displayedWithdrawals = allWithdrawals.filter(t => t.date >= prevCycleRange.start && t.date <= prevCycleRange.end);
    filterLabel = `الدورة السابقة (${prevCycleRange.start} إلى ${prevCycleRange.end})`;
    cycleEntreesForPartners = state.caisse
      .filter(t => t.date >= prevCycleRange.start && t.date <= prevCycleRange.end && t.type === "entree")
      .reduce((sum, t) => sum + Number(t.amount || 0), 0);
    cycleOperatingSorties = state.caisse
      .filter(t => t.date >= prevCycleRange.start && t.date <= prevCycleRange.end && t.type === "sortie" && t.category !== "retrait_p1" && t.category !== "retrait_p2" && t.category !== "retrait_perso")
      .reduce((sum, t) => sum + Number(t.amount || 0), 0);
  } else {
    displayedWithdrawals = allWithdrawals;
    filterLabel = "السجل الكامل (جميع التواريخ والفترات)";
    cycleEntreesForPartners = state.caisse
      .filter(t => t.type === "entree")
      .reduce((sum, t) => sum + Number(t.amount || 0), 0);
    cycleOperatingSorties = state.caisse
      .filter(t => t.type === "sortie" && t.category !== "retrait_p1" && t.category !== "retrait_p2" && t.category !== "retrait_perso")
      .reduce((sum, t) => sum + Number(t.amount || 0), 0);
  }

  // تحديث شارة ومسمى الفترة المعروضة
  const elPartnerCycleLabel = document.getElementById("partner-cycle-active-label");
  if (elPartnerCycleLabel) elPartnerCycleLabel.textContent = filterLabel;

  // تحديث ستايل أزرار الفلترة
  const btnAll = document.getElementById("assoc-filter-btn-ALL");
  const btnCur = document.getElementById("assoc-filter-btn-CURRENT");
  const btnPrev = document.getElementById("assoc-filter-btn-PREVIOUS");
  const activeBtnClass = "px-3 py-1.5 rounded-lg font-black text-xs bg-[#C9A227] text-white shadow-2xs transition cursor-pointer";
  const inactiveBtnClass = "px-3 py-1.5 rounded-lg font-bold text-xs text-[#6B6B6B] hover:text-[#111111] hover:bg-white transition cursor-pointer";
  if (btnAll) btnAll.className = (state.associatesCycleFilter === "ALL") ? activeBtnClass : inactiveBtnClass;
  if (btnCur) btnCur.className = (state.associatesCycleFilter === "CURRENT") ? activeBtnClass : inactiveBtnClass;
  if (btnPrev) btnPrev.className = (state.associatesCycleFilter === "PREVIOUS") ? activeBtnClass : inactiveBtnClass;

  let totalP1 = 0;
  let countP1 = 0;
  let totalP2 = 0;
  let countP2 = 0;

  displayedWithdrawals.forEach(t => {
    const amt = Number(t.amount || 0);
    if (t.category === "retrait_p2") {
      totalP2 += amt;
      countP2++;
    } else {
      totalP1 += amt;
      countP1++;
    }
  });

  const totalSalariesWithdrawn = totalP1 + totalP2;
  const profitBeforeSalaries = cycleEntreesForPartners - cycleOperatingSorties;
  const reinvestedSurplus = profitBeforeSalaries - totalSalariesWithdrawn;

  const elCardP1Title = document.getElementById("card-p1-title-name");
  const elCardP2Title = document.getElementById("card-p2-title-name");
  if (elCardP1Title) elCardP1Title.textContent = `${p1Name} (الشريك 1)`;
  if (elCardP2Title) elCardP2Title.textContent = `${p2Name} (الشريك 2)`;

  const elP1Total = document.getElementById("p1-total-withdrawn");
  const elP1Count = document.getElementById("p1-withdrawals-count");
  const elP2Total = document.getElementById("p2-total-withdrawn");
  const elP2Count = document.getElementById("p2-withdrawals-count");

  if (elP1Total) elP1Total.textContent = `${totalP1.toFixed(2)} درهم`;
  if (elP1Count) elP1Count.textContent = `${countP1} عمليات سحب مسجلة`;
  if (elP2Total) elP2Total.textContent = `${totalP2.toFixed(2)} درهم`;
  if (elP2Count) elP2Count.textContent = `${countP2} عمليات سحب مسجلة`;

  const diff = totalP1 - totalP2;
  const elBadgeStatus = document.getElementById("badge-equity-status");
  const elDiffText = document.getElementById("equity-difference-text");
  const elSubText = document.getElementById("equity-sub-text");

  if (Math.abs(diff) < 0.01) {
    if (elBadgeStatus) {
      elBadgeStatus.textContent = "متوازنان تماماً ✓";
      elBadgeStatus.className = "text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 border border-emerald-200";
    }
    if (elDiffText) elDiffText.textContent = "السحوبات متعادلة ومتساوية بين الشريكين";
    if (elSubText) elSubText.textContent = "لا يوجد أي فارق مالي. الحسابات نظيفة ومضبوطة 100%.";
  } else if (diff > 0) {
    if (elBadgeStatus) {
      elBadgeStatus.textContent = `${p1Name} متقدم بـ +${diff.toFixed(2)} DH`;
      elBadgeStatus.className = "text-[10px] font-bold px-2 py-0.5 rounded-full bg-amber-100 text-amber-900 border border-amber-300";
    }
    if (elDiffText) elDiffText.textContent = `سحب ${p1Name} أكثر من ${p2Name} بمبلغ ${diff.toFixed(2)} درهم`;
    if (elSubText) elSubText.textContent = `لتسوية الحساب: يستحق ${p2Name} سحب مبلغ ${diff.toFixed(2)} درهم للتعادل، أو تُعوّض في الدورة القادمة.`;
  } else {
    const absDiff = Math.abs(diff);
    if (elBadgeStatus) {
      elBadgeStatus.textContent = `${p2Name} متقدم بـ +${absDiff.toFixed(2)} DH`;
      elBadgeStatus.className = "text-[10px] font-bold px-2 py-0.5 rounded-full bg-amber-100 text-amber-900 border border-amber-300";
    }
    if (elDiffText) elDiffText.textContent = `سحب ${p2Name} أكثر من ${p1Name} بمبلغ ${absDiff.toFixed(2)} درهم`;
    if (elSubText) elSubText.textContent = `لتسوية الحساب: يستحق ${p1Name} سحب مبلغ ${absDiff.toFixed(2)} درهم للتعادل، أو تُعوّض في الدورة القادمة.`;
  }

  const elProfitBefore = document.getElementById("associates-profit-before-salaries");
  const elSalariesWithdrawn = document.getElementById("associates-total-salaries-withdrawn");
  const elReinvested = document.getElementById("associates-reinvested-surplus");
  const elCountBadge = document.getElementById("associates-count-badge");
  const badgePartnersCount = document.getElementById("badge-partners-count");
  const navBadge = document.getElementById("nav-associates-badge");

  if (elProfitBefore) elProfitBefore.textContent = `${profitBeforeSalaries.toFixed(2)} درهم`;
  if (elSalariesWithdrawn) elSalariesWithdrawn.textContent = `- ${totalSalariesWithdrawn.toFixed(2)} درهم`;
  if (elReinvested) {
    elReinvested.textContent = `${reinvestedSurplus.toFixed(2)} درهم`;
    elReinvested.className = `text-base font-black ${reinvestedSurplus >= 0 ? 'text-emerald-700' : 'text-rose-600'} mt-0.5 block font-mono`;
  }
  if (elCountBadge) elCountBadge.textContent = `${displayedWithdrawals.length} عمليات سحب`;
  if (badgePartnersCount) badgePartnersCount.textContent = `${allWithdrawals.length}`;
  if (navBadge) navBadge.textContent = `${(cycleEmpSalaries.length + displayedWithdrawals.length)}`;

  if (partnerTableBody) {
    if (displayedWithdrawals.length === 0) {
      partnerTableBody.innerHTML = `
        <tr>
          <td colspan="7" class="py-8 text-center text-[#6B6B6B]">
            <div class="flex flex-col items-center justify-center gap-2">
              <span class="text-2xl">👥</span>
              <span class="font-bold text-xs">لا توجد سحوبات رواتب مسجلة في ${filterLabel}.</span>
              ${allWithdrawals.length > 0 ? `
                <div class="flex items-center gap-2 mt-1">
                  <span class="text-[11px] text-[#8A6D0B]">💡 توجد ${allWithdrawals.length} سحوبات مسجلة في فترات أخرى:</span>
                  <button type="button" onclick="setAssociatesCycleFilter('ALL')" class="text-xs text-[#C9A227] font-black hover:underline bg-[#FAF6EA] px-2.5 py-1 rounded-lg border border-[#E8DCB5] cursor-pointer">عرض السجل الكامل (${allWithdrawals.length})</button>
                </div>
              ` : `
                <button onclick="openPartnerWithdrawalModal()" class="mt-2 text-xs text-[#C9A227] font-bold hover:underline cursor-pointer">+ تسجيل أول سحب راتب يدوي</button>
              `}
            </div>
          </td>
        </tr>
      `;
    } else {
      partnerTableBody.innerHTML = displayedWithdrawals.map(t => {
        const isP2 = (t.category === "retrait_p2");
        const partnerName = isP2 ? p2Name : p1Name;
        const partnerBadge = isP2 
          ? `<span class="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-bold bg-emerald-50 text-emerald-700 border border-emerald-200">👥 ${escapeHtml(partnerName)}</span>`
          : `<span class="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-bold bg-blue-50 text-blue-700 border border-blue-200">👤 ${escapeHtml(partnerName)}</span>`;

        let typeLabel = "راتب شهري";
        let desc = t.description || "";
        if (desc.includes("[") && desc.includes("]")) {
          const match = desc.match(/\[(.*?)\]/);
          if (match) {
            typeLabel = match[1];
            desc = desc.replace(/\[.*?\]/, "").trim();
          }
        }

        const payLabel = (t.paymentMethod === "virement") ? "🏦 تحويل بنكي" : "💵 كاش من الصندوق";

        return `
          <tr class="hover:bg-[#FAFAF8] transition">
            <td class="py-3 px-4 font-mono font-bold text-[#111111]">${t.date}</td>
            <td class="py-3 px-4">${partnerBadge}</td>
            <td class="py-3 px-4">
              <span class="px-2 py-0.5 rounded text-[11px] font-bold bg-[#F4F4F0] text-[#6B6B6B] border border-[#EAEAE5]">${escapeHtml(typeLabel)}</span>
            </td>
            <td class="py-3 px-4 font-medium text-[#111111]">${escapeHtml(desc || "سحب مستحقات شخصية")}</td>
            <td class="py-3 px-4 text-[#6B6B6B]">${payLabel}</td>
            <td class="py-3 px-4 text-left font-mono font-black text-[#EF4444] text-sm">
              ${Number(t.amount || 0).toFixed(2)} درهم
            </td>
            <td class="py-3 px-4 text-center">
              <div class="flex items-center justify-center gap-1">
                <button onclick="editPartnerWithdrawal('${t.id}')" class="p-1.5 text-[#C9A227] hover:text-[#B8921F] hover:bg-[#FAF6EA] rounded-lg transition cursor-pointer" title="تعديل تاريخ أو مبلغ السحب">
                  <i data-lucide="pencil" class="w-3.5 h-3.5"></i>
                </button>
                <button onclick="deleteTransaction('${t.id}')" class="p-1.5 text-[#6B6B6B] hover:text-rose-600 hover:bg-rose-50 rounded-lg transition cursor-pointer" title="حذف السحب">
                  <i data-lucide="trash" class="w-3.5 h-3.5"></i>
                </button>
              </div>
            </td>
          </tr>
        `;
      }).join("");
    }
  }

  lucide.createIcons();
}

function setAssociatesCycleFilter(val) {
  state.associatesCycleFilter = val;
  renderAssociatesTab();
}
window.setAssociatesCycleFilter = setAssociatesCycleFilter;

function editPartnerWithdrawal(trxId) {
  const trx = (state.caisse || []).find(t => t.id === trxId);
  if (!trx) return;

  const currentPartner = trx.category === "retrait_p2" ? "p2" : "p1";
  const p1Name = (state.settings && state.settings.partner1Name) ? state.settings.partner1Name : "أنا";
  const p2Name = (state.settings && state.settings.partner2Name) ? state.settings.partner2Name : "الشريك";
  const partnerName = currentPartner === "p1" ? p1Name : p2Name;

  const todayStr = new Date().toISOString().split("T")[0];
  const newDate = prompt(`تعديل تاريخ السحب لـ (${partnerName}) بصيغة YYYY-MM-DD:\n(ملاحظة: تاريخ اليوم هو ${todayStr})`, trx.date);
  if (newDate === null) return;
  const cleanDate = newDate.trim();
  if (!/^\d{4}-\d{2}-\d{2}$/.test(cleanDate)) {
    alert("يرجى إدخال تاريخ صحيح بصيغة YYYY-MM-DD (مثال: 2026-10-12)");
    return;
  }

  const newAmountStr = prompt(`تعديل المبلغ لـ (${partnerName}) بالدرهم:`, String(trx.amount));
  if (newAmountStr === null) return;
  const newAmount = parseFloat(newAmountStr);
  if (isNaN(newAmount) || newAmount <= 0) {
    alert("يرجى إدخال مبلغ صحيح أكبر من 0.");
    return;
  }

  trx.date = cleanDate;
  trx.amount = newAmount;
  saveData();
  renderAll();
  alert(`✅ تم تعديل سحب ${partnerName} بنجاح إلى: ${newAmount.toFixed(2)} درهم بتاريخ ${cleanDate}`);
}
window.editPartnerWithdrawal = editPartnerWithdrawal;

function openPartnerWithdrawalModal(defaultPartner = "p1") {
  switchAssociatesSubTab("partners");
  const form = document.getElementById("partner-withdrawal-form");
  if (form) form.reset();
  
  const p1Name = (state.settings && state.settings.partner1Name) ? state.settings.partner1Name : "أنا";
  const p2Name = (state.settings && state.settings.partner2Name) ? state.settings.partner2Name : "الشريك";

  const select = document.getElementById("withdrawal-partner-select");
  if (select) {
    select.innerHTML = `
      <option value="p1">👤 ${p1Name} (الشريك 1)</option>
      <option value="p2">👥 ${p2Name} (الشريك 2)</option>
    `;
    select.value = defaultPartner;
  }

  const dateEl = document.getElementById("withdrawal-date");
  if (dateEl) dateEl.value = new Date().toISOString().split("T")[0];

  const modal = document.getElementById("modal-partner-withdrawal");
  if (modal) modal.classList.remove("hidden");
  lucide.createIcons();
}

function closePartnerWithdrawalModal() {
  const modal = document.getElementById("modal-partner-withdrawal");
  if (modal) modal.classList.add("hidden");
}

function handlePartnerWithdrawalSubmit(event) {
  event.preventDefault();
  const partnerKey = document.getElementById("withdrawal-partner-select")?.value || "p1";
  const amount = parseFloat(document.getElementById("withdrawal-amount")?.value);
  const withdrawalType = document.getElementById("withdrawal-type")?.value || "salaire";
  const notes = document.getElementById("withdrawal-notes")?.value.trim() || "";
  const paymentMethod = document.getElementById("withdrawal-payment-method")?.value || "especes";
  const date = document.getElementById("withdrawal-date")?.value || new Date().toISOString().split("T")[0];

  if (isNaN(amount) || amount <= 0) {
    alert("يرجى إدخال مبلغ سحب صحيح.");
    return;
  }

  const p1Name = (state.settings && state.settings.partner1Name) ? state.settings.partner1Name : "أنا";
  const p2Name = (state.settings && state.settings.partner2Name) ? state.settings.partner2Name : "الشريك";
  const selectedName = partnerKey === "p1" ? p1Name : p2Name;

  const typeLabels = {
    "salaire": "راتب شهري",
    "avance": "تسبيق شخصي",
    "partiel": "سحب جزئي من الأرباح"
  };
  const typeText = typeLabels[withdrawalType] || "سحب شخصي";

  const desc = `[${typeText}] سحب مستحقات ${selectedName}${notes ? ' - ' + notes : ''}`;

  state.caisse.push({
    id: `trx_draw_${Date.now()}`,
    type: "sortie",
    category: partnerKey === "p1" ? "retrait_p1" : "retrait_p2",
    amount: amount,
    description: desc,
    paymentMethod: paymentMethod,
    date: date
  });

  saveData();
  closePartnerWithdrawalModal();
  switchAssociatesSubTab("partners");
  renderAll();
  alert(`✅ تم بنجاح تسجيل سحب ${amount.toFixed(2)} درهم لـ ${selectedName} وخصمها من الصندوق!`);
}

// ----------------------------------------------------
// EMPLOYEE SALARIES MODAL & RECEIPT LOGIC
// ----------------------------------------------------
function openEmployeeSalaryModal(defaultEmpName = "") {
  const form = document.getElementById("employee-salary-form");
  if (form) form.reset();

  const dateEl = document.getElementById("emp-salary-date");
  if (dateEl) dateEl.value = new Date().toISOString().split("T")[0];

  const knownEmployees = [];
  const nameSet = new Set();

  if (Array.isArray(state.settings && state.settings.employees)) {
    state.settings.employees.forEach(e => {
      if (e && e.name && !nameSet.has(e.name.trim())) {
        nameSet.add(e.name.trim());
        knownEmployees.push({ name: e.name.trim(), role: e.role || "معلم سيريغرافي", phone: e.phone || "" });
      }
    });
  }

  state.caisse.forEach(t => {
    if (t.category === "salaire_employe" && t.employeeName && !nameSet.has(t.employeeName.trim())) {
      nameSet.add(t.employeeName.trim());
      knownEmployees.push({ name: t.employeeName.trim(), role: t.employeeRole || "معلم سيريغرافي", phone: t.employeePhone || "" });
    }
  });

  const select = document.getElementById("emp-salary-name-select");
  const customBox = document.getElementById("box-employee-custom-wrapper");
  const selectBox = document.getElementById("box-employee-select-wrapper");
  const toggleBtn = document.getElementById("btn-toggle-new-emp");

  if (select) {
    if (knownEmployees.length === 0) {
      if (selectBox) selectBox.classList.add("hidden");
      if (customBox) customBox.classList.remove("hidden");
      if (toggleBtn) toggleBtn.textContent = "القائمة فارغة، اكتب اسم العامل";
    } else {
      if (selectBox) selectBox.classList.remove("hidden");
      if (customBox) customBox.classList.add("hidden");
      if (toggleBtn) toggleBtn.textContent = "+ كتابة اسم عامل جديد";

      select.innerHTML = `
        <option value="">-- اختر العامل من القائمة --</option>
        ${knownEmployees.map(e => `<option value="${escapeHtml(e.name)}" data-role="${escapeHtml(e.role)}" data-phone="${escapeHtml(e.phone)}">👷 ${escapeHtml(e.name)} (${escapeHtml(e.role)})</option>`).join("")}
        <option value="__NEW__">➕ إضافة اسم عامل جديد...</option>
      `;

      if (defaultEmpName && nameSet.has(defaultEmpName)) {
        select.value = defaultEmpName;
        onEmployeeSelectChange(defaultEmpName);
      }
    }
  }

  const modal = document.getElementById("modal-employee-salary");
  if (modal) modal.classList.remove("hidden");
  lucide.createIcons();
}

function closeEmployeeSalaryModal() {
  const modal = document.getElementById("modal-employee-salary");
  if (modal) modal.classList.add("hidden");
}

function toggleNewEmployeeInput() {
  const customBox = document.getElementById("box-employee-custom-wrapper");
  const selectBox = document.getElementById("box-employee-select-wrapper");
  const toggleBtn = document.getElementById("btn-toggle-new-emp");
  const select = document.getElementById("emp-salary-name-select");

  if (!customBox || !selectBox) return;

  if (customBox.classList.contains("hidden")) {
    customBox.classList.remove("hidden");
    selectBox.classList.add("hidden");
    if (toggleBtn) toggleBtn.textContent = "↩️ العودة لاختيار من القائمة";
    const customInput = document.getElementById("emp-salary-name-custom");
    if (customInput) customInput.focus();
  } else {
    customBox.classList.add("hidden");
    selectBox.classList.remove("hidden");
    if (toggleBtn) toggleBtn.textContent = "+ كتابة اسم عامل جديد";
    if (select) select.value = "";
  }
}

function onEmployeeSelectChange(val) {
  if (val === "__NEW__") {
    toggleNewEmployeeInput();
    return;
  }
  const select = document.getElementById("emp-salary-name-select");
  if (!select) return;

  const selectedOpt = select.options[select.selectedIndex];
  if (!selectedOpt) return;

  const role = selectedOpt.getAttribute("data-role");
  const phone = selectedOpt.getAttribute("data-phone");

  if (role) {
    const roleSelect = document.getElementById("emp-salary-role");
    if (roleSelect) roleSelect.value = role;
  }
  if (phone) {
    const phoneInput = document.getElementById("emp-salary-phone");
    if (phoneInput) phoneInput.value = phone;
  }
}

function handleEmployeeSalarySubmit(event) {
  event.preventDefault();

  const customBox = document.getElementById("box-employee-custom-wrapper");
  const isCustom = customBox && !customBox.classList.contains("hidden");

  let employeeName = "";
  const customVal = document.getElementById("emp-salary-name-custom")?.value.trim() || "";
  const selectVal = document.getElementById("emp-salary-name-select")?.value.trim() || "";

  if (isCustom) {
    employeeName = customVal || selectVal;
  } else {
    employeeName = (selectVal && selectVal !== "__NEW__") ? selectVal : customVal;
  }

  if (!employeeName || employeeName === "__NEW__") {
    alert("يرجى تحديد أو كتابة اسم العامل.");
    return;
  }

  const role = document.getElementById("emp-salary-role")?.value || "معلم سيريغرافي";
  const salaryType = document.getElementById("emp-salary-type")?.value || "salaire";
  const amount = parseFloat(document.getElementById("emp-salary-amount")?.value);
  const paymentMethod = document.getElementById("emp-salary-payment-method")?.value || "especes";
  const date = document.getElementById("emp-salary-date")?.value || new Date().toISOString().split("T")[0];
  const phone = document.getElementById("emp-salary-phone")?.value.trim() || "";
  const notes = document.getElementById("emp-salary-notes")?.value.trim() || "";
  const saveWorker = document.getElementById("emp-salary-save-worker")?.checked;

  if (isNaN(amount) || amount <= 0) {
    alert("يرجى إدخال مبلغ صحيح للراتب أو التسبيق.");
    return;
  }

  if (saveWorker) {
    if (!state.settings.employees) state.settings.employees = [];
    const exists = state.settings.employees.find(e => e.name && e.name.trim().toLowerCase() === employeeName.toLowerCase());
    if (!exists) {
      state.settings.employees.push({
        name: employeeName,
        role: role,
        phone: phone
      });
    } else {
      if (phone && !exists.phone) exists.phone = phone;
      if (role) exists.role = role;
    }
  }

  const typeMap = {
    "salaire": "راتب شهري",
    "semaine": "دفعة أسبوعية (سيمانة)",
    "avance": "تسبيق على الراتب",
    "prime": "مكافأة / بريم"
  };
  const typeText = typeMap[salaryType] || "أجر مستخدم";
  const desc = `[${typeText}] مستحقات: ${employeeName} (${role})${notes ? ' - ' + notes : ''}`;

  const newTrxId = `trx_emp_${Date.now()}`;
  state.caisse.push({
    id: newTrxId,
    type: "sortie",
    category: "salaire_employe",
    amount: amount,
    description: desc,
    paymentMethod: paymentMethod,
    date: date,
    employeeName: employeeName,
    employeeRole: role,
    salaryType: salaryType,
    employeePhone: phone,
    notes: notes
  });

  saveData();
  closeEmployeeSalaryModal();
  switchAssociatesSubTab("employees");
  renderAll();

  if (confirm(`✅ تم بنجاح تسجيل أداء ${amount.toFixed(2)} درهم لـ ${employeeName} وخصمها من الصندوق!\n\nهل تريد فتح وصل الأداء (Reçu) لطباعته أو إرساله عبر الواتساب؟`)) {
    openEmployeeReceiptModal(newTrxId);
  }
}

// ----------------------------------------------------
// RECEIPT MODAL FUNCTIONS
// ----------------------------------------------------
let currentReceiptTrxId = null;

function openEmployeeReceiptModal(trxId) {
  const trx = state.caisse.find(t => t.id === trxId);
  if (!trx) {
    alert("لم يتم العثور على العملية.");
    return;
  }
  currentReceiptTrxId = trxId;

  const container = document.getElementById("employee-receipt-print-area");
  if (!container) return;

  const wsName = (state.settings && state.settings.workshopName) ? state.settings.workshopName : "MASTER PRINT";
  const wsPhone = (state.settings && state.settings.phone) ? state.settings.phone : "0663103599";
  const wsCity = (state.settings && state.settings.city) ? state.settings.city : "Agadir, Maroc";

  const typeMap = {
    "salaire": "راتب شهري (Salaire Mensuel)",
    "semaine": "دفعة أسبوعية (Semaine)",
    "avance": "تسبيق على الراتب (Avance sur salaire)",
    "prime": "مكافأة وتشجيع (Prime)"
  };
  const typeLabel = typeMap[trx.salaryType] || "أجر ومستحقات عمل";
  const payMethodLabel = (trx.paymentMethod === "virement") ? "تحويل بنكي (Virement)" : (trx.paymentMethod === "cheque" ? "شيك (Chèque)" : "كاش نقداً (Espèces)");

  const recNum = trx.id.replace("trx_emp_", "").slice(-6);

  container.innerHTML = `
    <div class="border-2 border-[#111111] rounded-2xl p-6 space-y-5 bg-white text-[#111111]">
      <!-- Header -->
      <div class="flex items-start justify-between border-b-2 border-[#EAEAE5] pb-4">
        <div>
          <h2 class="text-xl font-black text-[#111111] tracking-tight">${escapeHtml(wsName)}</h2>
          <p class="text-xs text-[#6B6B6B] mt-0.5 font-bold">ورشة الطباعة والسيريغرافي والتغليف</p>
          <div class="text-[11px] text-[#6B6B6B] mt-1 space-y-0.5">
            <div>📍 ${escapeHtml(wsCity)}</div>
            <div>📞 ${escapeHtml(wsPhone)}</div>
          </div>
        </div>
        <div class="text-left">
          <div class="inline-block bg-[#FAF6EA] border border-[#E8DCB5] rounded-xl px-3 py-1.5 text-center">
            <span class="block text-[10px] font-black text-[#8A6D0B]">وصل أداء الأجرة</span>
            <span class="text-xs font-mono font-black text-[#111111]">REC-${recNum}</span>
          </div>
          <div class="text-xs font-mono font-bold text-[#6B6B6B] mt-1 text-left">التاريخ: ${trx.date}</div>
        </div>
      </div>

      <!-- Employee Details Box -->
      <div class="bg-[#F8F8F6] border border-[#EAEAE5] rounded-xl p-4 space-y-2">
        <div class="flex justify-between items-center text-xs">
          <span class="text-[#6B6B6B]">اسم العامل / المستخدم:</span>
          <span class="font-black text-sm text-[#111111]">${escapeHtml(trx.employeeName || 'عامل بالورشة')}</span>
        </div>
        <div class="flex justify-between items-center text-xs">
          <span class="text-[#6B6B6B]">الوظيفة / المهمة:</span>
          <span class="font-bold text-[#111111]">${escapeHtml(trx.employeeRole || 'مستخدم')}</span>
        </div>
        <div class="flex justify-between items-center text-xs">
          <span class="text-[#6B6B6B]">طبيعة الدفعة:</span>
          <span class="font-bold text-[#C9A227]">${escapeHtml(typeLabel)}</span>
        </div>
        <div class="flex justify-between items-center text-xs">
          <span class="text-[#6B6B6B]">طريقة الأداء:</span>
          <span class="font-bold text-[#111111]">${escapeHtml(payMethodLabel)}</span>
        </div>
        ${trx.notes ? `
        <div class="flex justify-between items-center text-xs border-t border-[#EAEAE5] pt-2">
          <span class="text-[#6B6B6B]">البيان / ملاحظات:</span>
          <span class="font-medium text-[#111111]">${escapeHtml(trx.notes)}</span>
        </div>` : ''}
      </div>

      <!-- Amount Highlight -->
      <div class="bg-gradient-to-r from-[#FAF6EA] to-white border-2 border-[#E8DCB5] rounded-2xl p-4 text-center">
        <span class="text-xs font-bold text-[#8A6D0B] block mb-1">المبلغ المؤدى والمقبوض صافياً:</span>
        <span class="text-3xl font-black text-[#111111] font-mono tracking-tight">${Number(trx.amount).toFixed(2)} DH</span>
        <span class="text-xs text-[#6B6B6B] block mt-1 font-bold">درهم مغربي لا غير</span>
      </div>

      <!-- Signatures -->
      <div class="grid grid-cols-2 gap-6 pt-4 border-t-2 border-dashed border-[#EAEAE5]">
        <div class="text-center space-y-12">
          <span class="text-xs font-bold text-[#6B6B6B] block">توقيع وإدارة الورشة</span>
          <div class="text-[10px] text-[#A0A096]">ختم وتوقيع الإدارة</div>
        </div>
        <div class="text-center space-y-12">
          <span class="text-xs font-bold text-[#6B6B6B] block">توقيع المستلم (العامل)</span>
          <div class="text-[10px] text-[#A0A096]">تأكيد استلام الأجر / التسبيق</div>
        </div>
      </div>

      <div class="text-center text-[10px] text-[#A0A096] pt-2">
        وثيقة إثبات أداء مستحقات العمل والورشة — تم إنشاؤها عبر نظام Master Print
      </div>
    </div>
  `;

  const modal = document.getElementById("modal-employee-receipt");
  if (modal) modal.classList.remove("hidden");
  lucide.createIcons();
}

function closeEmployeeReceiptModal() {
  const modal = document.getElementById("modal-employee-receipt");
  if (modal) modal.classList.add("hidden");
  currentReceiptTrxId = null;
}

function printEmployeeReceipt() {
  window.print();
}

function shareEmployeeReceiptWhatsApp() {
  if (!currentReceiptTrxId) return;
  const trx = state.caisse.find(t => t.id === currentReceiptTrxId);
  if (!trx) return;

  const wsName = (state.settings && state.settings.workshopName) ? state.settings.workshopName : "MASTER PRINT";
  const empName = trx.employeeName || "أخي";
  const amount = Number(trx.amount || 0).toFixed(2);
  const date = trx.date || "";

  const typeMap = {
    "salaire": "راتب شهري",
    "semaine": "دفعة أسبوعية (سيمانة)",
    "avance": "تسبيق على الراتب",
    "prime": "مكافأة وتشجيع"
  };
  const typeText = typeMap[trx.salaryType] || "مستحقات عمل";
  const payLabel = (trx.paymentMethod === "virement") ? "تحويل بنكي" : (trx.paymentMethod === "cheque" ? "شيك" : "كاش نقداً من الصندوق");

  const message = `السلام عليكم أخي *${empName}* 🤝،\nنؤكد لك تسجيل واستلام أداء مستحقاتك لدى ورشة *${wsName}*:\n\n` +
    `📌 *نوع الدفعة*: ${typeText}\n` +
    `💰 *المبلغ*: *${amount} درهم*\n` +
    `💳 *طريقة الأداء*: ${payLabel}\n` +
    `📅 *التاريخ*: ${date}\n` +
    (trx.notes ? `📝 *ملاحظات*: ${trx.notes}\n` : '') +
    `\nشكراً لك على عملك وتفانيك، وبالتوفيق والبركة دائماً إن شاء الله! 🌟`;

  let phone = trx.employeePhone || "";
  if (!phone) {
    phone = prompt("يرجى إدخال رقم هاتف العامل لإرسال الواتساب (مثال: 0612345678):", "");
  }

  if (phone) {
    const cleanPhone = phone.replace(/\D/g, "");
    let finalPhone = cleanPhone;
    if (finalPhone.startsWith("0")) {
      finalPhone = "212" + finalPhone.substring(1);
    }
    const url = `https://api.whatsapp.com/send?phone=${finalPhone}&text=${encodeURIComponent(message)}`;
    window.open(url, "_blank");
  } else {
    const url = `https://api.whatsapp.com/send?text=${encodeURIComponent(message)}`;
    window.open(url, "_blank");
  }
}

// Global window bindings for partial delivery & stock client
window.openPartialDeliveryModal = openPartialDeliveryModal;
window.closePartialDeliveryModal = closePartialDeliveryModal;
window.calculatePartialDeliveryPreview = calculatePartialDeliveryPreview;
window.handlePartialDeliverySubmit = handlePartialDeliverySubmit;
window.sendPartialDeliveryWhatsApp = sendPartialDeliveryWhatsApp;
window.toggleStockClientFields = toggleStockClientFields;
window.updateStockClientPreview = updateStockClientPreview;
window.getNextOrderNumber = getNextOrderNumber;
window.getNextOrderId = getNextOrderId;

// Window bindings for Sponsoring & Partners & Employees
window.renderSponsoringTab = renderSponsoringTab;
window.openNewAdModal = openNewAdModal;
window.closeNewAdModal = closeNewAdModal;
window.handleAdSubmit = handleAdSubmit;
window.renderAssociatesTab = renderAssociatesTab;
window.switchAssociatesSubTab = switchAssociatesSubTab;
window.openPartnerWithdrawalModal = openPartnerWithdrawalModal;
window.closePartnerWithdrawalModal = closePartnerWithdrawalModal;
window.handlePartnerWithdrawalSubmit = handlePartnerWithdrawalSubmit;
window.openEmployeeSalaryModal = openEmployeeSalaryModal;
window.closeEmployeeSalaryModal = closeEmployeeSalaryModal;
window.toggleNewEmployeeInput = toggleNewEmployeeInput;
window.onEmployeeSelectChange = onEmployeeSelectChange;
window.handleEmployeeSalarySubmit = handleEmployeeSalarySubmit;
window.openEmployeeReceiptModal = openEmployeeReceiptModal;
window.closeEmployeeReceiptModal = closeEmployeeReceiptModal;
window.printEmployeeReceipt = printEmployeeReceipt;
window.shareEmployeeReceiptWhatsApp = shareEmployeeReceiptWhatsApp;

// Window bindings for Product Ranking & Financial Drilldown
window.classifyOrderProduct = classifyOrderProduct;
window.getProductArabicLabel = getProductArabicLabel;
window.setProductRankingFilter = setProductRankingFilter;
window.renderBestSellingProducts = renderBestSellingProducts;
window.openFinancialDrilldown = openFinancialDrilldown;
window.closeFinancialDrilldownModal = closeFinancialDrilldownModal;
window.filterDrilldownTable = filterDrilldownTable;
window.renderDrilldownRows = renderDrilldownRows;

// Window bindings for Stock QR Single-Use Management
window.playChimeSound = playChimeSound;
window.generateStockQrTokens = generateStockQrTokens;
window.openGenerateStockQrModal = openGenerateStockQrModal;
window.openPrintStockQrModal = openPrintStockQrModal;
window.closeStockQrPrintModal = closeStockQrPrintModal;
window.printStockQrStickers = printStockQrStickers;
window.openStockQrStandaloneWindow = openStockQrStandaloneWindow;
window.openQrScannerModal = openQrScannerModal;
window.closeQrScannerModal = closeQrScannerModal;
window.startCameraScanner = startCameraScanner;
window.stopCameraScanner = stopCameraScanner;
window.handleQrScanDetected = handleQrScanDetected;
window.handleManualQrSubmit = handleManualQrSubmit;
window.processStockQrToken = processStockQrToken;
window.showQrScanFeedback = showQrScanFeedback;
window.closeQrFeedbackModal = closeQrFeedbackModal;
window.renderStockQrAuditLog = renderStockQrAuditLog;
window.refreshQrStickersHost = refreshQrStickersHost;
window.detectServerNetworkUrl = (typeof detectServerNetworkUrlSync !== "undefined") ? detectServerNetworkUrlSync : null;
window.handleQrCameraPhotoSelected = (typeof handleQrCameraPhotoSelected !== "undefined") ? handleQrCameraPhotoSelected : null;
window.fetchServerDatabase = (typeof fetchServerDatabase !== "undefined") ? fetchServerDatabase : null;

window.state = state;

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", initApp);
} else {
  initApp();
}
