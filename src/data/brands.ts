export type Product = {
  id: string;
  name: string;
  price: number;
  price2?: number;
  description?: string;
  image?: string;
};

export type Brand = {
  id: string;
  name: string;
  logo?: string;
  products: Product[];
};

//marcas de productos
/* 
Mabe
LG
Samsung
Haceb
Challenger
Midea
Whirlpool
HP
Lenovo
Hyundai
Epson
Electrolux
Oppo */

export const brands: Brand[] = [
  {
    id: "challenger",
    name: "Challenger",
    products: [
      { id: "challenger-congelador-ch100", name: "CONGELADOR CH100 BLANCO 100LT", price: 726900 },
      { id: "challenger-congelador-ch199", name: "CONGELADOR CH199 BLANCO 199LT", price: 999900 },
      { id: "challenger-congelador-ch226", name: "CONGELADOR CH226 165LT BLANCO", price: 862900 },
      { id: "challenger-congelador-ch332", name: "CONGELADOR CH332 230LTS DUR.AB", price: 1032900 },
      { id: "challenger-congelador-ch396", name: "CONGELADOR CH396 BLANCO", price: 2043900 },
      { id: "challenger-congelador-cv430", name: "CONGELADOR VERTICAL CV 430 TITANIUM", price: 1587900 },
      { id: "challenger-congelador-ch363", name: "CH363 DUR AB 387LTS", price: 1416900 },
      { id: "challenger-nevera-290", name: "NEVERA 290 TITANIUM", price: 1613900 },
      { id: "challenger-nevera-cr121", name: "NEVERA CR121", price: 667900 },
      { id: "challenger-nevera-cr239", name: "NEVERA CR239 TITANUIM", price: 1159900 },
      { id: "challenger-nevera-cr249", name: "NEVERA CR249 TITANIUM", price: 1465900 },
      { id: "challenger-nevera-cr256", name: "NEVERA CR256 250 LT", price: 1205900 },
      { id: "challenger-nevera-cr266", name: "NEVERA CR266 TITATIUM", price: 1557900 },
      { id: "challenger-nevera-cr317", name: "NEVERA CR317 TITANIUM", price: 1652900 },
      { id: "challenger-tv-32k88", name: "TV 32K88 HD 32\" T2", price: 510900 },
      { id: "challenger-tv-32tg81", name: "TV 32TG81 GOOGLE", price: 626900 },
      { id: "challenger-tv-40tg81", name: "TV 40TG81 BT GOOGLETV 40\"", price: 804900 },
      { id: "challenger-tv-40tg81-b", name: "TV 40TG81 BT GOOGLETV 40\"", price: 780900 },
      { id: "challenger-tv-43tg81", name: "TV 43TG81 GOOGLE", price: 919900 },
      { id: "challenger-tv-50kg85", name: "TV 50KG85 BT 4K 50\"", price: 1284900 },
      { id: "challenger-tv-55bo67", name: "TV 55BO67 BT ANDROID T2", price: 1393900 },
      { id: "challenger-tv-55kg85", name: "TV 55KG85 4KUHD LED 55\"", price: 1532900 },
      { id: "challenger-tv-58kg85", name: "TV 58KG85 4KUHD LED 58\"", price: 1644900 },
      { id: "challenger-tv-65kg85", name: "TV 65KG85 4KUHD LED 65\"", price: 2034900 }
    ]
  },
  {
    id: "electrolux",
    name: "Electrolux",
    products: [
      { id: "electrolux-congelador-efcc10c3hqwhztal", name: "CONGELADOR EFCC10C3HQW HZTAL 95LTOS", price: 709900 },
      { id: "electrolux-congelador-efcc15c3hqw", name: "CONGELADOR EFCC15C3HQW 150LT", price: 877900 },
      { id: "electrolux-congelador-efcc20c3hqw", name: "CONGELADOR EFCC20C3HQW 200LT", price: 1021900 },
      { id: "electrolux-congelador-efcc38c3hqw", name: "CONGELADOR ELECTROLUX EFCC38C3HQW 380LTS", price: 1703900 },
      { id: "electrolux-congelador-efc50w3htw", name: "CONGELADOR HTZAL EFC50W3HTW 508 LT BLANCO", price: 2149900 },
      { id: "electrolux-congelador-efc70w3htw", name: "CONGELADOR HZTAL EFC70W3HTW 708LT", price: 3570900 },
      { id: "electrolux-congelador-efcc32c3hqw", name: "CONGELADOR HZTAL EFCC32C3HQW 318LT", price: 1370900 },
      { id: "electrolux-congelador-efup22p3hrg", name: "CONGELADOR VRCAL EFUP22P3HRG 212 LT", price: 1892900 },
      { id: "electrolux-lavadora-wwtb07m6muww", name: "LAVADORA SEMI AUT WWTB07M6MUWW 7KG BL", price: 513900 },
      { id: "electrolux-lavadora-wwtb07m6muwwb", name: "LAVADORA SEMI AUT WWTB07M6MUWW 7KG BL", price: 500900 },
      { id: "electrolux-lavadora-wwtb14m6muww", name: "LAVADORA WWTB14M6MUWW 14KG DOBLE TINA", price: 827900 },
      { id: "electrolux-lavadora-wwtb14m6muwwb", name: "LAVADORA WWTB14M6MUWW 14KG DOBLE TINA", price: 851900 },
      { id: "electrolux-nevecon-ersa53k3hvb", name: "NEVECON ERSA53K3HVB NEGRO 529LT", price: 2849900 },
      { id: "electrolux-nevecon-ersa53v3hvg", name: "NEVECON ERSA53V3HVG GRIS 531 LT", price: 2893900 },
      { id: "electrolux-nevera-ert28f3c4bb", name: "NEVERA ERT28F3C4BB 245LT SILVER", price: 1324900 },
      { id: "electrolux-nevera-ert28f3c4bs", name: "NEVERA ERT28F3C4BS 245LT BLACK", price: 1371900 }
    ]
  },
  {
    id: "haceb",
    name: "Haceb",
    products: [
      { id: "haceb-estufa-em-gn", name: "ESTUFA MESA EM AVELLANA T GN NE", price: 269900 },
      { id: "haceb-estufa-em-gp", name: "ESTUFA MESA EM AVELLANA T GP NE", price: 269900 },
      { id: "haceb-estufa-emv-gn", name: "ESTUFA MESA EM AVELLANA V GN NE", price: 344900 },
      { id: "haceb-estufa-emv-gp", name: "ESTUFA MESA EM AVELLANA V GP NE", price: 344900 },
      { id: "haceb-estufa-romero-ultr-gn", name: "ESTUFA ROMERO ULTR 50-T GN INOX", price: 1053900 },
      { id: "haceb-estufa-romero-ultr-gp", name: "ESTUFA ROMERO ULTR 50-T GP INOX", price: 1053900 },
      { id: "haceb-estufa-romero-50t-gn", name: "ESTUFA ROMERO 50-T GN NE", price: 638900, price2: 625900 },
      { id: "haceb-estufa-romero-50t-gp", name: "ESTUFA ROMERO 50-T GP NE", price: 638900, price2: 625900 },
      { id: "haceb-estufa-romero-reflex-gn", name: "ESTUFA ROMERO REFLEX 50-V GN NE", price: 806900 },
      { id: "haceb-estufa-romero-reflex-gp", name: "ESTUFA ROMERO REFLEX 50-V GP NE", price: 806900 },
      { id: "haceb-lavadora-ivy-19kg", name: "LAV IVY 19 KG D NE", price: 1655900 },
      { id: "haceb-lavadora-zou-16kg", name: "LAV ZOU 16 KG D NE", price: 1590900 },
      { id: "haceb-lavadora-13kg", name: "LAVADORA 13 KG SA BL", price: 857900 },
      { id: "haceb-lavadora-7kg", name: "LAVADORA 7KG SA BL", price: 597900, price2: 582900 },
      { id: "haceb-nevera-220", name: "NEVERA 220 CE TI R2", price: 1081900, price2: 1065900 },
      { id: "haceb-nevera-243-ne", name: "NEVERA 243 SE MI NE R2", price: 1495900 },
      { id: "haceb-nevera-243-ti", name: "NEVERA 243 SE MI TI R2", price: 1440900, price2: 1417900 },
      { id: "haceb-nevera-271-ne", name: "NEVERA 271 SE ME NE R2", price: 1620900 },
      { id: "haceb-nevera-271-inox", name: "NEVERA 271 SE MI INOX R2", price: 1561900, price2: 1561900 },
      { id: "haceb-nevera-311-ti", name: "NEVERA 311 SE MI TI R2", price: 1646900, price2: 1620900 },
      { id: "haceb-nevera-alc404", name: "NEVERA ALC 404 SE DA MI PLOMO R2", price: 1870900, price2: 1844900 },
      { id: "haceb-nevera-alc448", name: "NEVERA ALC 448 SE DA MI TI R2", price: 2057900, price2: 2041900 }
    ]
  },
  {
    id: "hyundai",
    name: "Hyundai",
    products: [
      { id: "hyundai-aire-hy12k140ivgf", name: "AA HY12K140IVGF 12 BTU 110V INVERTER", price: 1247900 },
      { id: "hyundai-tv-32", name: "TV HYLED3257 SMART ROKU 32\"", price: 608900 },
      { id: "hyundai-tv-43", name: "TV HYLED4325RIM 43\"", price: 870900 },
      { id: "hyundai-tv-50", name: "TV HYLED5024G", price: 1335900 },
      { id: "hyundai-tv-55", name: "TV HYLED5527R4KM 55\" SMART", price: 1479900 },
      { id: "hyundai-tv-58", name: "TV HYLED5812G4", price: 1599900 },
      { id: "hyundai-tv-60", name: "HYUNDAI HYLED6004G", price: 1729900 }
    ]
  },
  {
    id: "lg",
    name: "LG",
    products: [
      { id: "lg-lavadora-wp8wmr", name: "LAVADORA DOBLE TINA WP8WMR.ABWPCOL", price: 597900 },
      { id: "lg-lavadora-wp8wmr-b", name: "LAVADORA DOBLE TINA WP8WMR.ABWPCOL", price: 627900 },
      { id: "lg-lavadora-wp15bar", name: "LAVADORA WP15BAR.DBMECOL", price: 1188900 },
      { id: "lg-lavadora-wp15bar-b", name: "LAVADORA WP15BAR.DBMECOL", price: 1209900 },
      { id: "lg-lavadora-wt13bpb", name: "LAVADORA WT13BPB.ABMECOL", price: 1395900 },
      { id: "lg-lavadora-wt13bpb-b", name: "LAVADORA WT13BPB.ABMECOL", price: 1419900 },
      { id: "lg-lavadora-wt13dpbk", name: "LAVADORA WT13DPBK.ASFECOL", price: 1333900 },
      { id: "lg-lavadora-wt13dpbk-b", name: "LAVADORA WT13DPBK.ASFECOL", price: 1369900 },
      { id: "lg-lavadora-wt18dvtb", name: "LAVADORA WT18DVTB.ASFECOL", price: 1402900 },
      { id: "lg-lavadora-wt18mvtb", name: "LAVADORA WT18MVTB NEGRA", price: 1548900 },
      { id: "lg-lavadora-wt19mvtb", name: "LAVADORA WT19MVTB.ABMECOL NG", price: 1589900 },
      { id: "lg-lavadora-wt19mvtb-b", name: "LAVADORA WT19MVTB.ABMECOL NG", price: 1635900 },
      { id: "lg-nevera-vt34wgpx", name: "NEVERA VT34WGPX", price: 1907900 },
      { id: "lg-nevera-vt38kpm", name: "NEVERA VT38KPM.AEPCCMM NEGRO", price: 2246900 },
      { id: "lg-nevera-vt40apy", name: "NEVERA VT40APY GRIS", price: 2225900 },
      { id: "lg-sonido-xboom-rnc5", name: "TORRE DE SONIDO XBOOM RNC5 500 Watts", price: 798900 },
      { id: "lg-sonido-xboom-rnc7", name: "TORRE DE SONIDO XBOOM RNC7.DCOLLLK", price: 972900 },
      { id: "lg-sonido-xboom-rnc9", name: "TORRE DE SONIDO XBOOM RNC9.DCOLLLK", price: 1171900 },
      { id: "lg-tv-32lr600b", name: "TV 32LR600BPSC.AWCQ 32\"", price: 639900 },
      { id: "lg-tv-32lr600b-b", name: "TV 32LR600BPSC.AWCQ 32\"", price: 677900 },
      { id: "lg-tv-43lm6370", name: "TV 43LM6370PDB.AWC 43\"", price: 1019900 },
      { id: "lg-tv-43lm6370-b", name: "TV 43LM6370PDB.AWC 43\"", price: 1064900 },
      { id: "lg-tv-50ua7300", name: "TV 50UA7300PSA 50\" 4K-UHD SMART IA", price: 1428900 },
      { id: "lg-tv-50ua7300-b", name: "TV 50UA7300PSA 50\" 4K-UHD SMART IA", price: 1451900 },
      { id: "lg-tv-60au7500", name: "TV 60AU7500PSA.AWC", price: 1899900 },
      { id: "lg-tv-60au7500-b", name: "TV 60AU7500PSA.AWC", price: 1935900 },
      { id: "lg-tv-65nano80", name: "TV 65NANO80TSA.AWC", price: 2612900 }
    ]
  },
  {
    id: "mabe",
    name: "Mabe",
    products: [
      { id: "mabe-aire-mmi18cdbwccaxc9", name: "AIRE MMI18CDBWCCAXC9", price: 1924900 },
      { id: "mabe-aire-mmt12cabwccbc1", name: "AIRE MMT12CABWCCBC1", price: 1037900 },
      { id: "mabe-aire-mmt12cdbwccbc1", name: "AIRE MMT12CDBWCCBC1", price: 1037900 },
      { id: "mabe-congelador-alaska195bh1", name: "CONGELADOR ALASKA195BH1", price: 882900 },
      { id: "mabe-estufa-ccc20anxn", name: "COCINA CENTRALES CCC20ANXN-5 52CM NEGRO", price: 609900 },
      { id: "mabe-estufa-emc5150snx1", name: "ESTUFA EMC5150SNX1 52CM INOX NEGRO", price: 850900 },
      { id: "mabe-estufa-emc6050nfx1", name: "ESTUFA EMC6050NFX1", price: 1238900 },
      { id: "mabe-estufa-tx1g-7con", name: "ESTUFA PISO TX1G-7CON GRIS 4PT GN", price: 969900 },
      { id: "mabe-lavadora-lma0220", name: "LAVADORA LMA0220WDGABO 20K", price: 1703900 },
      { id: "mabe-lavadora-lma4120", name: "LAVADORA LMA4120WDGABO 14 K", price: 1353900 },
      { id: "mabe-lavadora-lma6120", name: "LAVADORA LMA6120WDGABO 16K", price: 1431900 },
      { id: "mabe-lavadora-lma8120", name: "LAVADORA LMA8120WDGABO 18K", price: 1551900 },
      { id: "mabe-lavadora-lma9020", name: "LAVADORA LMA9020WDGAB0 9K GRIS", price: 1026900 },
      { id: "mabe-lavadora-lmc7020", name: "LAVADORA LMC70203WDAB0 20KG GRIS", price: 1708900 },
      { id: "mabe-lavadora-lmd1123", name: "LAVADORA LMD1123HBAB0 2 TINAS 11KG", price: 609900 },
      { id: "mabe-lavadora-lmd3123", name: "LAVADORA LMD3123HBAB0 13KG 2 TINAS", price: 793900 },
      { id: "mabe-nevecon-msl480", name: "NEVECON MSL480LPLPS0 BLACK STEEL 439 LT", price: 2466900 },
      { id: "mabe-nevera-rma247fjcg", name: "NEVERA RMA247FJCG GRAFITO", price: 1403900 },
      { id: "mabe-nevera-rma247pjcg", name: "NEVERA RMA247PJCG 247L", price: 1380900 },
      { id: "mabe-nevera-rma267fbcg", name: "NEVERA RMA267FBCG GRAFITO", price: 1518900 },
      { id: "mabe-nevera-rma267pycu", name: "NEVERA RMA267PYCU", price: 1611900 },
      { id: "mabe-nevera-rma313fbcg", name: "NEVERA RMA313FBCG GRAFITO", price: 1580900 },
      { id: "mabe-nevera-rma313fxcc", name: "NEVERA RMA313FXCC", price: 1684900 },
      { id: "mabe-nevera-rma313fxct", name: "NEVERA RMA313FXCT 297 LTROS", price: 1567900 },
      { id: "mabe-nevera-rmc320facg1", name: "NEVERA RMC320FACG1 GRAFITO", price: 1586900 },
      { id: "mabe-nevera-rmp415gcg", name: "NEVERA RMP415GCG GRAFITO", price: 1763900 },
      { id: "mabe-nevera-rmp470bcg", name: "NEVERA RMP470BCG NEGRO GRAFITO", price: 2030900 },
      { id: "mabe-nevera-rmu235nacg1", name: "NEVERA RMU235NACG1", price: 1034900 }
    ]
  },
  {
    id: "midea",
    name: "Midea",
    products: [
      { id: "midea-aire-msafb-11crn1-bc1", name: "AIRE MINISPLIT MSAFB-11CRN1-BC1 ON/OFF 12000 BTU 110V", price: 1138900 },
      { id: "midea-aire-msafb-11crn1-nc1", name: "AIRE MINISPLIT MSAFB-11CRN1-NC1 ON/OFF 12000 BTU 220V", price: 1138900 },
      { id: "midea-aire-msafb-12crdn1-bq0w", name: "AIRE MINISPLIT MSAFB-12CRDN1-BQ0W INVERTER SILK 12000 BTU 110V", price: 1262900 },
      { id: "midea-aire-msafb-12crdn1-nq0w", name: "AIRE MINISPLIT MSAFB-12CRDN1-NQ0W INVERTER SILK 12000 BTU 220V", price: 1262900 },
      { id: "midea-congelador-mdrc142fgm01", name: "CONGELADOR MDRC142FGM01-CO142 LITROS TRIPLE COOLING", price: 797900 },
      { id: "midea-congelador-mdrc199fgm01", name: "CONGELADOR MDRC199FGM01-CO198 LITROS TRIPLE COOLING", price: 955900 },
      { id: "midea-congelador-mdrc411fzm01co", name: "CONGELADOR MDRC411FZM01CO 293 LTOS TRIPLE COOLING", price: 1213900 },
      { id: "midea-congelador-mfcd09p2nabw-co", name: "CONGELADOR MFCD09P2NABW-CO 249 LITROS TRIPLE COOLING", price: 1083900 },
      { id: "midea-estufa-mgs20fs1bfawb", name: "ESTUFA MGS20FS1BFAWB-CO 20\" NEGRO PRO COOCKING", price: 569900 },
      { id: "midea-estufa-mgs20fs1bfawm", name: "ESTUFA MGS20FS1BFAWMG-CO 20\" CON GRILL NEGRO PRO COOCKING", price: 677900 },
      { id: "midea-freidora-maf4a2db", name: "FREIDORA MAF4A2DB-CA LT DIGITAL", price: 229900 },
      { id: "midea-lavadora-ma200w130", name: "LAV MA200W130/G-CO 13KG GRIS", price: 1135900 },
      { id: "midea-lavadora-ma500w170", name: "LAV MA500W170/G-CO 17KG GRIS", price: 1325900 },
      { id: "midea-lavadora-mtd01w70", name: "LAV SEMIAUTOMÁTICA MTD01W70/W-CO 7KG TWIN FORCE", price: 526900 },
      { id: "midea-lavadora-ma500w200", name: "LAVADORA MA500W200/G-CO 20KG GRIS", price: 1543900 },
      { id: "midea-lavadora-mt100w101", name: "LAVADORA SEMIAUTOMÁTICA MT100W101/W-CO 10.1KG TWIN FORCE", price: 637900 },
      { id: "midea-lavadora-mt100w140", name: "LAVADORA SEMIAUTOMÁTICA MT100W140/W-CO 14KG TWIN FORCE", price: 834900 },
      { id: "midea-nevecon-mdrs710fgm46co", name: "NEVECON MDRS710FGM46CO 555LT", price: 2594900 },
      { id: "midea-nevera-mdrd268fgm50cow", name: "NEVERA MDRD268FGM50COW 187 LT", price: 855900 },
      { id: "midea-nevera-mdrt346mtm28cod", name: "NEVERA MDRT346MTM28COD 239 LTS", price: 1355900 },
      { id: "midea-nevera-mdrt385mtm28cod", name: "NEVERA MDRT385MTM28COD 280 LITROS SMART SENSOR", price: 1407900 },
      { id: "midea-nevera-mdrt489mtm28cod", name: "NEVERA MDRT489MTM28COD 360 LT NG", price: 1544900 },
      { id: "midea-olla-mpc6n2sdss", name: "OLLA DE PRESIÓN MPC6N2SDSS-CA PLATEADA 6 LITROS INNER", price: 246900 },
      { id: "midea-ventilador-mfs180m3apk", name: "VENT DE PEDESTAL MFS180M3APK 45660 18 PULGADAS POWER", price: 176900 },
      { id: "midea-ventilador-msf18b", name: "VENT DE PEDESTAL MSF18B-CA 18 PULGADAS POWER COOL", price: 149900 }
    ]
  },
  {
    id: "oppo",
    name: "Oppo",
    products: [
      { id: "oppo-poco-x7", name: "POCO X7/12GB/512GB/ GREEN", price: 1068900 },
      { id: "oppo-a60-negro", name: "CELULAR A60 8+8GB 256GB NEGRO", price: 714900 },
      { id: "oppo-a20-azul", name: "CELULAR A20 4+4GB 128GB AZUL", price: 406900 },
      { id: "oppo-a20-cafe", name: "CELULAR A20 4+4GB 128GB CAFE", price: 408900 },
      { id: "oppo-a40-cafe", name: "CELULAR A40 4+4GB 256GB CAFE", price: 553900 },
      { id: "oppo-a40-morado", name: "CELULAR A40 4+4GB 256GB MORADO", price: 555900 },
      { id: "oppo-a5-4g-blanco", name: "CELULAR A5 4G 256GB+4GB BLANCO", price: 568900 },
      { id: "oppo-a5-5g-blanco", name: "CELULAR A5 5G/256GB/8GB/BLANCO", price: 869900 },
      { id: "oppo-a5m-256gb", name: "CELULAR A5M 256GB/8GB", price: 761900 },
      { id: "oppo-a60-blanco", name: "CELULAR A60 8+8GB 256GB BLANCO", price: 719900 },
      { id: "oppo-a80-lila", name: "CELULAR A80 8+8GB 256GB LILA", price: 859900 },
      { id: "oppo-a80-negro", name: "CELULAR A80 8+8GB 256GB NEGRO", price: 858900 },
      { id: "oppo-a20-azul-b", name: "CELULAR CELULAR A20 4+4GB 128GB AZUL", price: 408900 }
    ]
  },
  {
    id: "samsung",
    name: "Samsung",
    products: [
      { id: "samsung-aire-ar12cvfcmwk", name: "AIRE AR12CVFCMWK/CB 12BTU 220V INVERTER", price: 1627900, price2: 1459900 },
      { id: "samsung-estufa-nx24bg45411vco", name: "ESTUFA NX24BG45411VCO", price: 1125900, price2: 1125900 },
      { id: "samsung-estufa-nx24bg57413sco", name: "ESTUFA NX24BG57413SCO", price: 1356900, price2: 1356900 },
      { id: "samsung-lavadora-wt75r2500hb", name: "LAVADORA DOBLE TINA WT75R2500HB 7.5KG", price: 717900, price2: 659900 },
      { id: "samsung-lavadora-dvg24dg8000vco", name: "LAVADORA DVG24DG8000VCO C/FRONTAL 24KL NG", price: 3045900, price2: 2838900 },
      { id: "samsung-lavadora-wd20t6300gp", name: "LAVADORA SECADORA WD20T6300GP/CO Gris", price: 3995900, price2: 3995900 },
      { id: "samsung-lavadora-wa13cg5441bdco", name: "LAVADORA WA13CG5441BDCO", price: 1357900, price2: 1344900 },
      { id: "samsung-lavadora-wa17cg6441bdco", name: "LAVADORA WA17CG6441BDCO 17KL GRIS", price: 1575900, price2: 1509900 },
      { id: "samsung-lavadora-wa19cg6441bd", name: "LAVADORA WA19CG6441BD GRIS", price: 1579900, price2: 1532900 },
      { id: "samsung-lavadora-wa80f15s5bco", name: "LAVADORA WA80F15S5BCO 15KG NG", price: 1622900, price2: 1614900 },
      { id: "samsung-lavadora-wa90cg4240byco", name: "LAVADORA WA90CG4240BYCO 9KL", price: 1053900, price2: 1053900 },
      { id: "samsung-lavadora-wd22t6500gp", name: "LAVADORA WD22T6500GP/CO 22KL INOX", price: 4171900, price2: 4171900 },
      { id: "samsung-lavadora-wf26dg8250avco", name: "LAVADORA WF26DG8250AVCO C/FRONTAL 26KLO NG", price: 4325900, price2: 4325900 },
      { id: "samsung-microondas-mg40dg5524atco", name: "HORNO MG40DG5524ATCO 1.4 40LTS NG", price: 523900, price2: 523900 },
      { id: "samsung-microondas-ms23k3513ak", name: "MICROONDAS MS23K3513AK/CO 23LTS NEGRO", price: 357900, price2: 357900 },
      { id: "samsung-nevecon-rs23t5b00s9", name: "NEVECON RS23T5B00S9 SILVER", price: 3654900, price2: 3510900 },
      { id: "samsung-nevecon-rs57dg4000b4co", name: "NEVECON RS57DG4000B4CO 583LT", price: 3361900, price2: 3199900 },
      { id: "samsung-nevecon-rs57dg4100b4co", name: "NEVECON RS57DG4100B4CO", price: 3529900, price2: 3399900 },
      { id: "samsung-nevera-rb45dg6300b1co", name: "NEVERA RB45DG6300B1CO 455 LTOS NG", price: 3470900, price2: 3431900 },
      { id: "samsung-nevera-rt22farads8", name: "NEVERA RT22FARADS8/CO", price: 1436900, price2: 1390900 },
      { id: "samsung-nevera-rt25farads8", name: "NEVERA RT25FARADS8/CO GRIS", price: 1531900, price2: 1490900 },
      { id: "samsung-nevera-rt38dg6220b1co", name: "NEVERA RT38DG6220B1CO 389 LT NEGRO", price: 2202900, price2: 2100900 },
      { id: "samsung-nevera-rt38dg6770b1co", name: "NEVERA RT38DG6770B1CO", price: 2489900, price2: 2300900 },
      { id: "samsung-nevera-rt53dg6790b1co", name: "NEVERA RT53DG6790B1CO", price: 2738900, price2: 2738900 },
      { id: "samsung-sonido-hw-ls60d", name: "PARLANTE PORTARRETRATO HW-LS60D SMART MUSIC FR", price: 676900 },
      { id: "samsung-tv-un55du7000", name: "TV UN55DU7000KXZL", price: 1499900 },
      { id: "samsung-tv-un65du7000", name: "TV UN65DU7000KXZL", price: 1997900 },
      { id: "samsung-tv-un75u8000", name: "TV UN75U8000FKXZL 75\"", price: 3193900 },
      { id: "samsung-tv-un85du8000", name: "TV UN85DU8000KXZL", price: 5152900 }
    ]
  },
  {
    id: "whirlpool",
    name: "Whirlpool",
    products: [
      { id: "whirlpool-aire-lwa7059q", name: "AIRE LWA7059Q 11.000BTU/110V", price: 1149900 },
      { id: "whirlpool-lavadora-ald1035je", name: "LAVADORA SEMIAUTOMATICA ALD1035JE", price: 569900 },
      { id: "whirlpool-lavadora-ald1545je", name: "LAVADORA SEMIAUTOMATICA ALD1545JE", price: 799900 },
      { id: "whirlpool-lavadora-ww17ntahla", name: "LAVADORA WW17NTAHLA 17 KL NEGRA", price: 1429900 },
      { id: "whirlpool-lavadora-ww19ntbhla", name: "LAVADORA WW19NTBHLA 19K", price: 1569900 },
      { id: "whirlpool-lavadora-ww20ltahla", name: "LAVADORA WW20LTAHLA", price: 1599900 },
      { id: "whirlpool-lavadora-wwi10ashls", name: "LAVADORA WWI10ASHLS 10KG IMPELLER GRIS", price: 899000 },
      { id: "whirlpool-lavadora-wwi12ashls", name: "LAVADORA WWI12ASHLS 12KG SL", price: 1049900 },
      { id: "whirlpool-microondas-acros-am1807d", name: "HORNO MICROONDAS ACROS 0.7 AM1807D ESPEJO", price: 229900 },
      { id: "whirlpool-nevera-wrj43aktww", name: "NEVERA WRJ43AKTWW", price: 1799900 },
      { id: "whirlpool-nevera-wrj45aktww", name: "NEVERA WRJ45AKTWW", price: 2061900 },
      { id: "whirlpool-nevera-wrm22cktww", name: "NEVERA WRM22CKTWW", price: 1434900 },
      { id: "whirlpool-nevera-wrw25cktww", name: "NEVERA WRW25CKTWW 262LT", price: 1550900 },
      { id: "whirlpool-nevera-wrw32cktmb", name: "NEVERA WRW32CKTMB ONYX", price: 1599900 },
      { id: "whirlpool-nevera-wrw45aktww", name: "NEVERA WRW45AKTWW ME", price: 2116900 },
      { id: "whirlpool-nevera-wt32409d", name: "NEVERA WT32409D 247LT", price: 1399900 }
    ]
  },
  {
    id: "lenovo",
    name: "Lenovo",
    products: [
      { id: "lenovo-r3-7320u", name: "LENOVO R3-7320U 16GB 256GB SSD 14", price: 1332900 },
      { id: "lenovo-i3-1315u", name: "LENOVO I3-1315U 8GB 256GB SSD 14", price: 1385900 },
      { id: "lenovo-r5-7520u", name: "LENOVO R5-7520U 16GB 512GB SSD 14", price: 1504900 }
    ]
  },
  {
    id: "hp",
    name: "HP",
    products: [
      { id: "hp-14-dq5038la", name: "HP 14-DQ5038LA I3-1215U 8GB 512GB SSD 14", price: 1385900 },
      { id: "hp-14-em0014la", name: "HP 14-EM0014LA R5-7520U 8GB 512GB SSD 14", price: 1408900 }
    ]
  },
  {
    id: "epson",
    name: "Epson",
    products: [
      { id: "epson-l3210", name: "EPSON ECOTANK L3210", price: 747900 },
      { id: "epson-l3251", name: "EPSON ECOTANK L3251", price: 912900 }
    ]
  }
];