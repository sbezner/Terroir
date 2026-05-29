export const atlantic = [
  {
    id: "atlantic_maine_coast",
    name: "Maine Coast",
    megaregionId: "atlantic",
    boundsDescription: "Tidal coastline from Kittery north to Eastport, rocky coves, barrier islands, and cold-water estuaries fed by the Gulf of Maine upwelling.",
    culture: ["Wabanaki foraging traditions", "Fishing-village practicality", "19th-century cannery economics", "Yankee preservation culture"],
    terroir: ["Peekytoe crab", "Steamer clams", "Wild low-bush blueberries", "Dulse seaweed", "Fiddleheads", "Salt cod"],
    deviation: "Maine lobster cooking is defined by a rigid fat binary—butter or mayo, never both—a choice that functions as regional identity rather than preference. Cold-dressed mayo rolls reflect Connecticut influence and are resisted by purists; hot butter rolls coat the meat as an emulsified film that carries the sweet brininess of the shell. When inland cooks substitute rendered salt-pork fat for butter, they introduce a smoky-savory register absent from dairy preparations. Chowders must be simmered at a temperature below 180°F to preserve the gel-protein structure of chowder clams; boiling causes myosin contraction that turns clams rubbery within minutes.",
    heirloomIngredients: [
      { name: "Peekytoe crab", role: "Sweet, delicate Atlantic rock crab prized for its hand-picked lump meat in chowders and salads" },
      { name: "Wild low-bush blueberries", role: "Intensely flavored acidic berries from glacial till barrens, used in buckle, grunt, and jamming" },
      { name: "Dulse", role: "Atlantic red seaweed dried and eaten as a mineral-salty snack or crumbled into chowders" }
    ],
    iconicDish: {
      name: "Maine Lobster Stew",
      prep: "Whole lobsters steamed, picked, and simmered in a combination of lobster tomalley, roe, and full-fat cream over very low heat for 30 minutes; served with a pool of melted butter floating on top and pilot crackers on the side.",
      authenticityMarker: "Authentic stew uses the entire lobster including tomalley and coral stirred into the cream base, which turns the liquid pale orange; versions omitting the innards are chowder, not stew."
    },
    substitutionRule: "When whole live lobster is unavailable, use a 1:1 ratio of fresh Dungeness crab and a tablespoon of fish roe paste to approximate the tomalley richness; substitute half-and-half for heavy cream and reduce simmer time to 20 minutes to prevent curdling of the lower-fat dairy."
  },
  {
    id: "atlantic_cape_cod",
    name: "Cape Cod and the Islands",
    megaregionId: "atlantic",
    boundsDescription: "The hooked peninsula of Cape Cod including Martha's Vineyard and Nantucket, defined by glacial outwash plains, kettle ponds, salt marshes, and the Nantucket Sound tidal estuary system.",
    culture: ["Wampanoag harvest traditions", "Quaker Nantucket whale-oil wealth", "Portuguese fishing immigrant heritage", "Summer cottage food culture"],
    terroir: ["Wellfleet oysters", "Bay scallops", "Cranberries", "Striped bass", "Salt hay", "Beach plums"],
    deviation: "Cape Cod cooking pivots around the cranberry as a savory acid agent, not merely a holiday condiment—it functions as the region's vinegar, used to deglaze fish pans, balance oyster mignonette, and cut richness in pork braises in proportions unfamiliar to mainland palates. Wellfleet oysters have an unusually high glycogen content from slow growth in cold kettle-fed estuary water, making them taste sweeter when raw but requiring a shorter cooking window than Gulf or Pacific oysters before they tighten. Portuguese influence from New Bedford and Provincetown fishing families introduces linguiça and chouriço as seasoning meats in chowder bases, adding a paprika-smoke note absent from Yankee versions. Bay scallop season is strictly November–March; out-of-season substitution with sea scallops requires slicing them in half horizontally to approximate the small sweet profile.",
    heirloomIngredients: [
      { name: "Wellfleet oyster", role: "Sweet, minerally half-shell oyster from kettle-pond estuaries, eaten raw with minimal dressing" },
      { name: "Wild beach plum", role: "Tart blue-purple coastal shrub plum made into jam, jelly, and liqueur; the Cape's signature wild fruit" },
      { name: "Fresh cranberry", role: "Tart acidic native fruit used as both sweet and savory acid agent in sauces, braises, and drinks" }
    ],
    iconicDish: {
      name: "Cape Scallop Chowder",
      prep: "Fresh bay scallops briefly sautéed in salt-pork drippings, removed, then chowder base built from rendered salt pork, onion, clam broth, diced potato, and whole milk; scallops returned at the finish to avoid overcooking.",
      authenticityMarker: "The authentic version uses only whole milk—never cream—producing a thinner, more delicate broth that showcases the scallop sweetness rather than burying it in dairy fat."
    },
    substitutionRule: "Replace fresh bay scallops with sea scallops quartered into approximately ¾-inch cubes; pat completely dry and sear at high heat for only 45 seconds per side before adding to the chowder at the end, or the larger muscle fibers will seize and become rubbery."
  },
  {
    id: "atlantic_narragansett_bay",
    name: "Rhode Island and Narragansett Bay",
    megaregionId: "atlantic",
    boundsDescription: "The Narragansett Bay watershed from Providence south through Newport and the bay's eastern arm, including Block Island, Prudence Island, and the Sakonnet River estuary.",
    culture: ["Narragansett and Wampanoag clambake tradition", "Portuguese fishing families from Azores and Cape Verde", "Gilded Age Newport resort cuisine", "Italian immigrant home cooking"],
    terroir: ["Quahog clams", "Stuffies", "Rhode Island greening apples", "Johnnycakes (native flint corn)", "Calamari", "Jonnycake cornmeal"],
    deviation: "Rhode Island clam chowder is definitionally clear—made from quahog liquor, salt pork, potatoes, and onion with no dairy added, the anti-Manhattan, anti-Boston third way that expresses the pure mineral terroir of Narragansett Bay without any fat-based emulsification. Johnnycake made from the state's narrow-kernel whitecap flint corn (grown since the 1600s) is denser and more resistant to tenderness than commercial cornmeal johnnycakes; the batter must rest for 10 minutes after mixing to hydrate the particularly coarse grinds. Portuguese influence produces a tradition of caldeirada—fisherman's stew—that appears at waterfront restaurants as a direct import from Azorean home cooking, using local quahogs and linguiça in place of Atlantic bacalhau. Calamari from Rhode Island is the state's official appetizer; it's fried in a light dusting of flour (not a thick batter) and finished with banana pepper rings and a lemon squeeze.",
    heirloomIngredients: [
      { name: "Quahog clam", role: "Hard-shell clam central to clear chowder, stuffies, and raw bar; the foundational bivalve of Narragansett Bay" },
      { name: "Whitecap flint corn", role: "Narrow-kernel heirloom corn ground into the johnnycake meal that defines Rhode Island's historic flatbread" }
    ],
    iconicDish: {
      name: "Rhode Island Clear Chowder",
      prep: "Salt pork rendered until crisp, onion and potato sweated in the fat, quahog liquor added as the sole liquid base, diced quahog meat stirred in at the end to barely cook through; served in a cup with oyster crackers.",
      authenticityMarker: "No dairy of any kind is used—the chowder is clear, and the quahog liquor provides all the body and salinity; adding cream immediately disqualifies it as Rhode Island–style."
    },
    substitutionRule: "When quahogs are unavailable, use large hardshell clams (cherrystones) and supplement the clam juice with a half-teaspoon of white miso dissolved in the liquid to restore the deep umami mineral note that quahogs contribute from their thick Narragansett Bay water."
  },
  {
    id: "atlantic_connecticut_river",
    name: "Connecticut River Valley",
    megaregionId: "atlantic",
    boundsDescription: "The Connecticut River corridor from the Massachusetts border south through Hartford, Middletown, and Old Saybrook to Long Island Sound, including the surrounding tobacco and onion farming lowlands.",
    culture: ["Puritan preservation and smoking traditions", "Polish and Italian tobacco-farm immigrant labor", "River-shad fishing culture", "Onion-growing Wethersfield market-garden heritage"],
    terroir: ["Connecticut River shad", "Wethersfield red onion", "Hartford broadleaf tobacco", "White flint corn", "Apple orchards", "Early-season asparagus"],
    deviation: "The Connecticut River Valley's iconic cooking pivot centers on the American shad—a bony, intensely flavored anadromous fish that requires specialized filleting to remove the Y-bones, a technique passed down within river families that most butchers cannot replicate. Shad roe, the female's egg sac, is wrapped in caul fat or bacon and pan-fried in butter, a preparation that reverses the usual New England default of avoiding rich preparations. The region's historic tobacco-drying culture created large barns that doubled as cold-smoking chambers; this infrastructure influenced curing traditions for hams and sausages beyond any other agricultural product. Hartford election cake—a yeast-raised, dried-fruit cake served at colonial polling places—represents a unique intersection of beer-culture fermentation and sweetened baking that has no equivalent elsewhere in New England.",
    heirloomIngredients: [
      { name: "Connecticut River shad", role: "Spring-run anadromous fish with rich, oily flesh; the roe sac is the most prized component, pan-fried in bacon fat" },
      { name: "Wethersfield red onion", role: "Pungent, deep-red heirloom storage onion grown in the fertile river floodplain since the 1600s" }
    ],
    iconicDish: {
      name: "Planked Shad with Roe",
      prep: "Boned shad fillet nailed to a seasoned hardwood plank and leaned toward an open fire to cook by radiant heat for 45 minutes; the roe sac wrapped in salt pork and pan-fried separately until golden, then served alongside the plank.",
      authenticityMarker: "Authentic planked shad uses a hardwood plank (traditionally oak or hickory) that has been oiled and seasoned, and the fish is never turned—the radiant heat cooks it entirely from the front while the plank prevents burning."
    },
    substitutionRule: "Replace shad with a thick, skin-on mackerel or bluefish fillet; these oily fish tolerate the same plank-roasting method and their fat content is similar, but reduce cooking time to 25 minutes as they are thinner than a full boned shad."
  },
  {
    id: "atlantic_nh_vt_uplands",
    name: "New Hampshire and Vermont Uplands",
    megaregionId: "atlantic",
    boundsDescription: "The upland interior from the White Mountains of New Hampshire through Vermont's Green Mountains and Northeast Kingdom, above 1,000 ft elevation, with a short frost-free growing season of 90–120 days.",
    culture: ["French-Canadian farmstead culture from Quebec migration", "Scots-Irish sugarbush tradition", "German immigrant farm-cheese making", "Back-to-the-land 1970s food revival culture"],
    terroir: ["Maple syrup (Grade A and B)", "Raw milk cheddar", "Fiddleheads", "Jerusalem artichokes", "Venison", "Apple cider vinegar"],
    deviation: "Vermont and New Hampshire upland cooking is governed by the maple syrup grade system in ways that Southern cooks find counterintuitive—Grade B (now called Grade A Dark or Very Dark) is preferred for cooking because its mineral-bitter depth balances the sweetness better than the milder light grades. Cider vinegar from local orchards is used as the primary cooking acid in braises, pickles, and dressings in concentrations much higher than standard recipes specify, because the cold-climate apples used here produce a more complex, tart vinegar than commercial cider vinegar. French-Canadian influence from Quebec immigration introduces pork-fat-and-potato tourtière, sugar pie, and the tradition of gorton (seasoned pork spread) that has no analogue in Anglo-American New England. Cheese aging at upland elevations runs 10–15% faster due to lower humidity and ambient bacterial populations; reduce listed aging times when reproducing these recipes at sea level.",
    heirloomIngredients: [
      { name: "Vermont Grade A Dark maple syrup", role: "Mineral-rich, amber-brown syrup with robust caramel-bitter notes, used as both sweetener and cooking medium in braises and glazes" },
      { name: "Cabot clothbound cheddar", role: "Aged raw-milk cheddar with crystalline texture and grass-fed milk flavor; the reference point for regional hard cheese" }
    ],
    iconicDish: {
      name: "Maple-Brined Pork Roast",
      prep: "Bone-in pork loin brined 24 hours in a solution of Grade A Dark maple syrup, cider vinegar, salt, and juniper berries; roasted at 325°F to an internal temperature of 145°F and rested 20 minutes before slicing; pan drippings deglazed with hard cider for the sauce.",
      authenticityMarker: "The brine must use real maple syrup, not imitation—the Grade B or Dark variety's caramelized lactones survive the heat and caramelize on the meat's surface in a way that corn-syrup imitations cannot replicate."
    },
    substitutionRule: "Replace Grade A Dark maple syrup in brines and glazes with sorghum molasses plus a teaspoon of apple cider vinegar per tablespoon; the mineral grassiness of sorghum approximates maple's complexity better than brown sugar, which lacks the phenolic compounds responsible for maple's distinctive finish."
  },
  {
    id: "atlantic_nova_scotia_maritime",
    name: "Acadian Maritime",
    megaregionId: "atlantic",
    boundsDescription: "The maritime corridor of northern Maine and the New Brunswick border zone, encompassing the Aroostook Valley, St. John River basin, and communities with direct Acadian cultural continuity.",
    culture: ["Acadian French exile and resettlement culture", "Aroostook Valley potato farming heritage", "Mi'kmaq foraging and fishing traditions", "Lumber camp cooking from the timber era"],
    terroir: ["Aroostook County potato", "Fiddleheads", "Fiddlehead ferns", "Atlantic salmon", "Spruce beer", "Poutine râpée"],
    deviation: "Acadian cooking in northern Maine preserves the distinctive pork-and-potato-fat architecture of pre-exile French Acadia in ways that Quebec has largely abandoned under modern French-Canadian influence. Poutine râpée—grated raw potato surrounding a ball of salt-pork filling, boiled to translucency—requires a very high-starch potato variety; using modern low-starch Yukons produces a gluey result rather than the correct glass-like outer shell. Fiddleheads are treated as a blanch-and-dress vegetable here, with brown butter and a lemon squeeze applied cold, unlike Vermont fiddleheads which are sautéed in bacon fat. The Acadian tradition of rappie pie (râpure)—a casserole of shredded potato that has had all its starch liquid squeezed out and replaced with hot chicken broth—has no equivalent in Anglo-American cooking and requires understanding the starch-replacement mechanics to reproduce successfully.",
    heirloomIngredients: [
      { name: "Aroostook russet potato", role: "High-dry-matter baking potato grown in the glacial till of northern Maine, used for poutine râpée and rappie pie" },
      { name: "Salt pork jowl", role: "Cured pork cheek that serves as the filling in poutine râpée and the fat base for Acadian bean soups" }
    ],
    iconicDish: {
      name: "Poutine Râpée",
      prep: "Aroostook russet potatoes grated raw and squeezed completely dry; half the grated potato cooked and mashed, then combined with the dry raw potato to form a dough; the dough wrapped around a ball of salted pork and boiled in well-salted water for 1.5 to 2 hours until the outer shell becomes translucent.",
      authenticityMarker: "The finished ball must be fully translucent, not opaque or white; opacity indicates either too much residual moisture in the potato dough or insufficient starch conversion during boiling."
    },
    substitutionRule: "For rappie pie, if Aroostook russet potatoes are unavailable use any high-starch baking potato and squeeze the grated mass in a cheesecloth with maximum force—you must remove at least 40% of the original weight in starch liquid before proceeding; the replacement liquid must be hot stock at the same temperature as the removed liquid, or the starch will seize unevenly."
  },
]
