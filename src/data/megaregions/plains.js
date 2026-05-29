export const plains = [
  {
    id: "plains_great_plains_cattle",
    name: "Great Plains Cattle Country",
    megaregionId: "plains",
    boundsDescription: "The short-grass prairie corridor spanning western Nebraska and central Kansas, from the Platte River south to the Oklahoma border, defined by feedlot operations, wheat farms, and Sandhills cattle ranches.",
    culture: ["Anglo-American cattle drive heritage", "Czech and German immigrant farmstead cooking", "Mennonite community food preservation", "Native Pawnee and Lakota bison-hunting traditions"],
    terroir: ["Grain-finished beef", "Hard red winter wheat", "Sunflower seeds", "Prairie hen", "Buffalo grass", "Platte River sandbar willow"],
    deviation: "Great Plains beef cooking is shaped by the reality of grain-finished cattle, whose increased intramuscular fat content means that cooking temperatures need to be lower and rest times longer than comparable grass-fed beef from other regions. Steaks here are almost universally cooked to medium rather than rare, a preference rooted in the fact that grain-finished marbling renders fully at 135–145°F and produces a juicier result than it would if undercooked. Czech immigrant kolache culture has fused entirely into the local grocery and bakery economy, and the sweet fruit-filled versions are sold at gas stations in a way that makes them more daily-bread than special-occasion. The region's extreme temperature swings—summers above 100°F and winters below 0°F—created a deep canning and root-cellar preservation culture that prioritizes high-acid pickles, vinegar brines, and fermented vegetables over fresh preparations.",
    heirloomIngredients: [
      { name: "Grain-finished Nebraska beef", role: "Highly marbled short-rib and ribeye from corn-fed feedlot cattle; the reference standard for American steakhouse cuts" },
      { name: "Hard red winter wheat", role: "High-protein wheat with 13–14% gluten content, ground for bread flour used in German rye-wheat blends and Czech kolache dough" }
    ],
    iconicDish: {
      name: "Kansas City–Style Beef Brisket",
      prep: "Whole packer brisket rubbed with a dry mixture of paprika, black pepper, garlic powder, and celery salt; smoked over hickory and fruit wood at 225–250°F for 12–14 hours until bark forms and internal temperature reaches 203°F; wrapped in butcher paper at the stall (165°F) to prevent moisture loss.",
      authenticityMarker: "The Kansas City bark must be dry and deeply mahogany—not wet with sauce—and the fat cap is left on during smoking to baste the flat; sauce arrives on the side, never during the cook."
    },
    substitutionRule: "When grain-finished brisket is unavailable, use grass-fed and inject the flat muscle with a mixture of beef tallow, Worcestershire, and beef stock at 1-inch intervals using a marinade injector; this replaces the intercalated fat that grain-finishing provides and prevents the flat from drying out during the long smoke."
  },
  {
    id: "plains_dakotas_northern",
    name: "Dakotas and Northern Plains",
    megaregionId: "plains",
    boundsDescription: "North and South Dakota from the Missouri River west to the Badlands escarpment and north to the Canadian border, including the Standing Rock and Cheyenne River Sioux reservations and the sunflower-growing Red River Valley.",
    culture: ["Lakota Sioux traditional food sovereignty revival", "Norwegian and Swedish Lutheran farm community cooking", "Ukrainian-German Hutterite colony communal meals", "Scandinavian immigrant lutefisk and lefse traditions"],
    terroir: ["Sunflower seeds and oil", "Wild prairie turnip", "Chokecherries", "Walleye", "Bison", "Durum wheat"],
    deviation: "Northern Plains cooking is shaped by the severe winter economy of preserving protein at sub-zero temperatures, creating a tradition of whole-animal utilization—head cheese, blood sausage, and marrow—that has no parallel in the milder Plains states to the south. Scandinavian-derived lefse (potato flatbread) is made here from russet potatoes dried by the region's low humidity, requiring more water in the dough than coastal recipes specify to achieve the soft, pliable texture needed for rolling thin. Bison, increasingly prominent through tribal food sovereignty initiatives, is significantly leaner than beef—its fat content is typically 2–3% versus 15–30% in beef—requiring a cook-to-temperature approach that stops at 135°F for steaks; any higher and the myoglobin-rich fibers contract dramatically. Chokecherries, gathered wild from stream-side shrubs, contain amygdalin in the pit that must not be cracked during pressing; the resulting juice is intensely astringent and requires significant sweetening before use in syrup or wojapi.",
    heirloomIngredients: [
      { name: "Great Plains bison", role: "Lean, iron-rich free-range ruminant; historically central to Lakota foodways, now farmed on tribal and private ranches" },
      { name: "Wild chokecherry", role: "Intensely astringent wild plum relative; cooked with sugar into wojapi (traditional Lakota pudding) and syrup" }
    ],
    iconicDish: {
      name: "Wojapi",
      prep: "Wild chokecherries simmered with water until the fruit bursts; strained to remove pits; sweetened with honey or sugar to taste; thickened with cornstarch or arrowroot to a pudding consistency; served warm over frybread or bison steak.",
      authenticityMarker: "Traditional wojapi uses no thickener—the natural pectin in chokecherries provides body—and is made from whole berries that are cooked and strained rather than from commercial cherry concentrate."
    },
    substitutionRule: "Substitute chokecherries with a 3:1 blend of Montmorency sour cherries and black currants, both of which match the astringent-acidic profile; reduce the sweetener by 25% from any given recipe since commercial sour cherries are less astringent than wild chokecherries."
  },
  {
    id: "plains_kansas_wheat_belt",
    name: "Kansas Wheat Belt",
    megaregionId: "plains",
    boundsDescription: "The heart of the winter wheat triangle spanning central and western Kansas from Salina west to Dodge City and south to the Oklahoma Panhandle, the global epicenter of hard red winter wheat production.",
    culture: ["Mennonite Turkey Red wheat farmers from Ukraine", "German-Russian immigrant baking traditions", "Anglo-Protestant revivalist church potluck culture", "Mexican migrant harvest worker food traditions"],
    terroir: ["Turkey Red hard winter wheat", "Sunflower oil", "Sorghum grain", "Czech prune", "Prairie honey", "Cottonwood wood smoke"],
    deviation: "The Mennonite introduction of Turkey Red wheat to Kansas in 1874 created the foundation of American bread flour and permanently shaped the fat-to-flour ratios in local baking—the high protein (13–14%) absorbs more water and fat than soft wheat, producing denser, chewier breads that require longer mixing and proofing cycles than standard American sandwich loaf recipes. Vereniki (cottage-cheese dumplings) represent the most direct surviving example of Russian-Mennonite culinary heritage in the American food system; the dough must rest in the refrigerator for 30 minutes before rolling or the high-gluten Turkey Red flour makes it too elastic to stretch thin. Beef brisket here is often served with sunflower oil–based barbecue sauces rather than tomato-based varieties, reflecting local crop availability and the heritage of sunflower cultivation as a cash crop. Sorghum grain, not just the molasses, appears in whole-grain breads and porridge at a frequency unknown outside this specific corridor.",
    heirloomIngredients: [
      { name: "Turkey Red hard winter wheat", role: "High-gluten heritage wheat variety introduced by Mennonites from Ukraine; the ancestor of modern American bread flour" },
      { name: "Vereniki (cottage cheese dumplings)", role: "Mennonite boiled dumplings filled with dry-curd cottage cheese, served with cream gravy or fried onions" }
    ],
    iconicDish: {
      name: "Vereniki with Cream Gravy",
      prep: "Stiff dough of Turkey Red flour, egg, and cold water rolled to 2mm; circles cut with a biscuit cutter; filled with a mixture of dry-curd cottage cheese, egg, and salt; pinched closed; boiled in salted water 8 minutes; pan-fried in butter until golden on both sides; served with a cream and caramelized onion gravy.",
      authenticityMarker: "The authentic filling uses only dry-curd cottage cheese—never ricotta or cream cheese—and the dumplings are always pan-fried after boiling, a two-stage cooking method that creates the characteristic crisp exterior unique to this Mennonite preparation."
    },
    substitutionRule: "Replace dry-curd cottage cheese with farmer's cheese drained overnight in cheesecloth to remove maximum moisture; never substitute ricotta, which contains too much water and collapses the filling during boiling; add a small pinch of nutmeg to the ricotta alternative to compensate for the flavor depth lost by using a milder cheese."
  },
  {
    id: "plains_nebraska_sandhills",
    name: "Nebraska Sandhills",
    megaregionId: "plains",
    boundsDescription: "The grass-stabilized dune system of north-central Nebraska stretching from Thedford west to Alliance, one of the most sparsely populated regions in the contiguous United States at fewer than one person per square mile.",
    culture: ["Isolated ranch family self-sufficiency culture", "Whole-animal butchery tradition from working cattle ranches", "Lakota and Omaha foraging overlay", "Hunting camp sourdough and Dutch oven traditions"],
    terroir: ["Sandhills grass-finished beef", "Pheasant", "Wild turkey", "Sand cherry", "Prairie turnip", "Windmill-pumped well water"],
    deviation: "Sandhills cooking is defined by extreme isolation and the resulting whole-animal frugality—nothing is wasted, and secondary cuts like beef heart, tongue, and oxtail appear in ranch cooking not as nose-to-tail trend food but as practical necessity. Grass-finished beef from Sandhills ranches has a more intense beefy flavor and a higher proportion of omega-3 fatty acids than grain-finished beef, but it is also less forgiving in high-heat applications—the lower intramuscular fat means a ribeye must be pulled at 125°F internal temperature and rested for 10 minutes or it will dry out rapidly. The region's sourdough tradition, maintained by isolation from commercial yeast supply chains, produces starters with unusual microbial profiles from the pure, minerally well water pumped from below the Ogallala Aquifer. Dutch oven cooking over open hardwood fire is the primary outdoor cooking technology; the enclosed cast-iron environment creates an even, dry heat that produces excellent biscuits but requires reducing liquid in quick-bread recipes by 10–15% versus oven-baked versions.",
    heirloomIngredients: [
      { name: "Sandhills grass-finished beef", role: "Lean, deeply flavored cattle finished on bluestem and switchgrass; higher omega-3 content than feedlot beef" },
      { name: "Wild ring-necked pheasant", role: "Introduced game bird now naturalized to Sandhills grassland; hunted in October and November, brined before cooking to compensate for lean muscle" }
    ],
    iconicDish: {
      name: "Dutch Oven Beef and Biscuits",
      prep: "Beef chuck cut into 2-inch cubes, browned in beef tallow in a 12-inch Dutch oven over open coals; deglazed with well water and beef stock; root vegetables and onion added; biscuit dough dropped by large spoonfuls on top; lid replaced and cooking continued 30 minutes with coals above and below the oven lid until biscuits rise and brown.",
      authenticityMarker: "Authentic Dutch oven biscuits use rendered beef tallow as the fat in the biscuit dough, not butter or lard—the rendered fat from the browned beef bottom gives the biscuits a savory, meaty undertone not present in dairy-fat versions."
    },
    substitutionRule: "When grass-finished beef chuck is unavailable, use conventional beef but add a teaspoon of anchovy paste to the braising liquid to approximate the depth of flavor that the higher myoglobin content of grass-finished beef contributes; the umami from the anchovy fills the flavor gap without adding any discernible fish taste to the finished dish."
  },
  {
    id: "plains_oklahoma_cross_timbers",
    name: "Oklahoma Cross Timbers",
    megaregionId: "plains",
    boundsDescription: "The Cross Timbers ecoregion of central Oklahoma from Tulsa west through Oklahoma City to the Wichita Mountains, where post oak and blackjack oak savanna meets short-grass prairie.",
    culture: ["Five Civilized Tribes relocated food sovereignty—Cherokee, Chickasaw, Choctaw, Creek, Muscogee", "Southern Appalachian cooking transplanted during the Trail of Tears", "Oklahoma Dust Bowl survivor self-sufficiency culture", "Czech-German oil-town immigrant baking"],
    terroir: ["Muscadine grape", "Pawpaw", "Sumac", "Hickory nuts", "Chickasaw plum", "Post oak wood smoke"],
    deviation: "Oklahoma Cross Timbers cooking represents one of the most complex cultural palimpsests in American regional cuisine—Five Tribes foodways transplanted from the Southeast, Southern Appalachian homestead cooking brought by white settlers, and Czech and German immigrant baking from the oil-field workforce all exist in direct conversation within a single county. Cherokee grape dumplings (slow-simmered in sweetened grape juice made from native muscadines) represent a direct continuity with pre-removal Eastern Cherokee cooking that survived relocation. Native sumac is used as a souring agent in ways that parallel Middle Eastern za'atar applications, ground onto grilled meats and stirred into bean soups to provide tartness without vinegar. Post oak—the dominant tree of the Cross Timbers woodland—imparts a mild, sweet smoke with lower tannin than hickory, and Oklahoma barbecue cooks specifically source it for a cleaner smoke profile on pork ribs and bologna.",
    heirloomIngredients: [
      { name: "Wild muscadine grape", role: "Bronze and black native grape with thick skin and musky sweetness; used for juice, jelly, and Cherokee grape dumplings" },
      { name: "Native sumac berry", role: "Tart, acidic dried drupe used as a souring agent on grilled meats and in bean soups in Five Tribes cooking" }
    ],
    iconicDish: {
      name: "Cherokee Grape Dumplings",
      prep: "Wild muscadine grapes cooked with water and sweetened; strained to remove skins and seeds; the deep purple juice brought to a simmer; flour-and-water dumplings dropped by spoonfuls into the simmering grape broth and cooked until the dumplings are firm and have absorbed the grape color; served warm as both dessert and sustenance.",
      authenticityMarker: "The grape juice must be made from wild muscadine or Concord-type grapes—not Vitis vinifera wine grapes—because the 'foxy' wild-grape aromatic compounds are the defining flavor; European wine grapes produce a flatter, less aromatic result."
    },
    substitutionRule: "When wild muscadines are unavailable, use Concord grape juice concentrate diluted to 100% juice concentration, adding a teaspoon of red wine vinegar per cup to approximate the muscadine's higher natural acidity; reduce any added sugar by half since concentrate is sweeter than fresh-pressed wild juice."
  },
  {
    id: "plains_colorado_eastern",
    name: "Colorado Eastern Plains",
    megaregionId: "plains",
    boundsDescription: "The eastern Colorado shortgrass steppe from the Kansas and Nebraska state lines west to the Front Range foothills escarpment, encompassing Rocky Ford, Lamar, and the Arkansas River irrigated melon and cantaloupe corridor.",
    culture: ["Japanese-American farming community (post-internment resettlement)", "Hispanic beet and melon farm labor heritage", "Anglo homesteader dryland wheat culture", "Pueblo green chile from southern Colorado transitional zone"],
    terroir: ["Rocky Ford cantaloupe", "Pueblo green chile", "Colorado lamb", "Arkansas River irrigated produce", "Sunflower"],
    deviation: "Colorado's eastern plains occupy a transitional zone between Great Plains wheat culture and Southwest chile culture, creating a hybrid kitchen where cantaloupe from Rocky Ford's hard alkaline soil is used in savory preparations—cantaloupe gazpacho, melon-chile salsa—rather than exclusively as a dessert fruit. Rocky Ford cantaloupes grown in Rocky Ford's calcium-carbonate-rich soil develop unusually high sugar content (18–22 Brix) and a distinctive musky, peachy aroma absent from California-grown varieties; their thick, netted rinds also survive longer storage, making them suitable for pickling in brine. Japanese-American farm families who resettled here after internment introduced daikon and napa cabbage to the agricultural system, and their influence appears in local pickles and fermented vegetables at a frequency unusual for the Plains. Pueblo green chiles are a distinct variety from New Mexican Hatch chiles—thicker-walled, less fruity, with a earthier heat—and should not be substituted in southern Colorado cooking where they function as a primary vegetable rather than a condiment.",
    heirloomIngredients: [
      { name: "Rocky Ford cantaloupe", role: "High-Brix, netted-skin muskmelon from alkaline Arkansas River Valley soil; used both sweet and savory in local cooking" },
      { name: "Pueblo green chile", role: "Thick-walled, earthy Colorado chile variety; distinct from New Mexican Hatch; used as a primary cooking vegetable in green chile stew and rellenos" }
    ],
    iconicDish: {
      name: "Green Chile Stew",
      prep: "Cubed pork shoulder browned in lard; roasted and peeled Pueblo green chiles added with diced onion, garlic, and potato; covered with water or stock and simmered 1.5 hours until pork is fork-tender and broth has thickened from chile pectin and starch; served with flour tortillas.",
      authenticityMarker: "Authentic southern Colorado green chile stew uses Pueblo chiles, not Hatch or Anaheim—the thicker walls and earthier, less fruity heat profile produce a different stew base; the broth should be opaque green from dissolved chile solids, not broth-colored with chile floating in it."
    },
    substitutionRule: "Substitute Poblano chiles for Pueblo green chiles at a 1.5:1 ratio by weight; Poblanos have slightly thinner walls and a fruitier flavor, so compensate by adding a tablespoon of white miso to the stew base for the earthy minerality that Pueblos provide and Poblanos lack."
  },
]
