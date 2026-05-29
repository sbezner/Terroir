export const atlantic = [
  {
    id: "maine-coast",
    name: "Maine Coast",
    megaregionId: "atlantic",
    boundsDescription: "Tidal coastline from Kittery north to Eastport, encompassing rocky coves, barrier islands, and cold-water estuaries fed by the Gulf of Maine.",
    culture: "Fishing-village practicality shaped by Wabanaki foraging traditions and 19th-century cannery economics. Cooking is functional first: preservation, salt, and smoke were survival tools before they became flavor tools. Lobster is eaten simply because complexity would insult the catch.",
    terroir: "Granite bedrock and glacial till produce acidic, thin soils suited to low-bush blueberries, fiddleheads, and ramps. Cold, nutrient-rich Gulf of Maine upwelling feeds some of the densest shellfish beds on the Atlantic seaboard. Seaweed—dulse, kelp, bladderwrack—grows in brackish inlets and is historically used as field fertilizer and table seasoning.",
    deviation: "The canonical Maine lobster roll uses butter or mayo, never both—fat choice defines regional identity, not personal preference. Cold-dressed mayo rolls (Connecticut style) are seen as an outsider imposition; warm butter rolls lock fat as an emulsified coating rather than a dressing. When moving inland or into colder seasons, cooks pivot to rendered pork fat from salt pork, which contributes a savory, slightly smoky baseline absent from dairy fat. The heat register stays low: chowders are simmered, never boiled, preserving the collagen structure of chowder clams so they stay tender rather than tightening into rubber.",
    heirloomIngredients: [
      {
        name: "Peekytoe crab",
        role: "Sweet, fine-flaked Atlantic rock crab historically considered bycatch and used in household cooking before becoming a restaurant commodity; contributes delicate brine without the iodine edge of Dungeness."
      },
      {
        name: "Wild low-bush blueberries",
        role: "Smaller, more intensely flavored than commercial cultivars; used in grunt, buckle, and as a tart counterpoint to fatty chowders or smoked fish preparations."
      },
      {
        name: "Dulse",
        role: "Dried red seaweed from the Bay of Fundy tradition; adds umami depth and mineral salinity to chowder bases and bean dishes as a salt-pork supplement."
      }
    ],
    iconicDish: {
      name: "Maine Lobster Stew",
      prep: "Live lobsters are steamed, meat removed and reserved with the roe and tomalley. The empty shells are cracked and sweated in butter with onion, then covered with cold milk and heavy cream in a 2:1 ratio. The dairy is brought just below a simmer for 45 minutes—no boil—then strained. Lobster meat and coral are added to the enriched cream base, seasoned with celery salt and white pepper, and rested refrigerated overnight before reheating to allow the fat to fully absorb the tomalley flavor. No starch thickener is used; body comes from the tomalley emulsifying into the cream.",
      authenticityMarker: "The overnight rest is non-negotiable in Maine households; a same-day stew is considered unfinished. The tomalley must go in—discarding it is a waste that marks the cook as a tourist."
    },
    substitutionRule: "When tomalley is unavailable or refused on safety grounds (paralytic shellfish toxin accumulates there), replace with 2 tsp white miso dissolved in the cream before straining—miso's glutamates and salt content replicate the umami load and the emulsifying proteins mirror the tomalley's fat-binding function at roughly a 1:1 flavor equivalence."
  },
  {
    id: "cape-cod-islands",
    name: "Cape Cod and the Islands",
    megaregionId: "atlantic",
    boundsDescription: "The flexed arm of Cape Cod from Sandwich to Provincetown, plus Martha's Vineyard and Nantucket, bounded by Cape Cod Bay to the north and Nantucket Sound to the south.",
    culture: "Wampanoag agricultural and fishing practices undergird a cuisine later layered with Yankee Puritan frugality and, by the 19th century, Portuguese whaling-community influence from the Azores. The result is a cooking culture that pairs restraint with unexpected spice tolerance—linguiça and pickled hot peppers appear alongside cranberries and salt cod in the same household pantry.",
    terroir: "Sandy outwash plain soils hold cranberry bogs and support asparagus, summer squash, and native corn. The surrounding cold salt water produces bay scallops with unusually high sugar content due to slow winter growth. Freshwater kettle ponds throughout the Cape concentrate perch and pickerel.",
    deviation: "Cape Cod bay scallops are pan-seared in clarified butter at very high heat for no more than 90 seconds total, exploiting their high glycogen content for rapid Maillard crust formation before the protein matrix over-sets. Adding linguiça to a scallop preparation is a Portuguese-Azorean deviation that shifts fat from neutral dairy to paprika-stained pork, dramatically changing the flavor register from sweet-marine to smoky-sweet. The heat pivot in autumn transitions from quick-sear bay scallop dishes to long-braise quahog and pork preparations that draw on Wampanoag bean-and-squash cooking logic. Cranberry acid acts as a functional tenderizer in braised meat preparations, its malic and citric acids denaturing collagen at lower temperatures than neutral-pH braises require.",
    heirloomIngredients: [
      {
        name: "Cape Cod bay scallops",
        role: "Harvested from Nantucket Sound in fall and winter; smaller than sea scallops with a sweeter, nuttier flavor profile; the glycogen content makes them especially responsive to high-heat caramelization."
      },
      {
        name: "Native cranberries",
        role: "Grown in the outwash-plain bogs since Wampanoag cultivation; used fresh as a brine acid, dried as a sweetener, and as a sauce component that bridges game and seafood preparations through its tannin and pectin content."
      },
      {
        name: "Linguiça",
        role: "Portuguese smoked pork sausage introduced by Azorean whalers; its paprika, garlic, and pork fat profile integrates into chowders, stuffings, and kale soups as the dominant fat and aromatic carrier."
      }
    ],
    iconicDish: {
      name: "Provincetown Portuguese Kale Soup",
      prep: "Linguiça is sliced and rendered in a heavy pot until the paprika fat runs orange. Onion, garlic, and carrot are sweated in the rendered fat. Coarsely torn kale (Azorean Galega variety preferred, curly green acceptable), peeled and cubed potatoes, and canned whole tomatoes are added with chicken stock and a ham hock. The soup simmers 90 minutes until potatoes begin to break and thicken the broth. Canned kidney beans are added in the final 20 minutes only—earlier addition causes the bean skins to split and muddy the broth. Finished with sherry vinegar and smoked paprika.",
      authenticityMarker: "The orange paprika fat floating on the surface is a visual quality marker—it should be visible, not skimmed. Serving without crusty Portuguese bread is considered incomplete."
    },
    substitutionRule: "When Galega kale is unavailable, substitute Lacinato (Tuscan) kale by weight at 1:1, but reduce the simmer time by 20 minutes—Lacinato's lower sulfur compound concentration means it softens faster and will turn grey and bitter if cooked to the same endpoint as the tougher Galega leaf."
  },
  {
    id: "rhode-island-narragansett-bay",
    name: "Rhode Island and Narragansett Bay",
    megaregionId: "atlantic",
    boundsDescription: "The tidal basin of Narragansett Bay from Providence south to Point Judith, including the salt ponds along the southern coast and Block Island, bounded inland by the Blackstone River valley.",
    culture: "Rhode Island's cooking identity is paradoxically defined by what it rejects: thick chowder. The state's clear-broth chowder tradition marks a deliberate differentiation from Massachusetts, rooted in early Narragansett Bay fishing communities where milk was scarce and the clam liquor itself was considered the point. Italian-American immigration into Providence's Federal Hill neighborhood in the early 20th century introduced garlic, olive oil, and tomato as legitimate chowder components, though purists resist.",
    terroir: "Narragansett Bay's relatively warm, shallow water produces quahogs (hard-shell clams) of exceptional size and briny depth. Johnny-cake cornmeal from Narragansett white flint corn has a distinct coarse texture and mineral flavor unlike commodity yellow cornmeal. The bay's brackish inlets support blue crabs in summer.",
    deviation: "Rhode Island clear chowder uses clam liquor, salt pork fat, and water as the only liquid—cream and tomato are both foreign intrusions. The fat mechanism is rendered salt pork providing a baseline savory richness that cream would overwhelm and tomato would acidify. Quahogs are added raw to the clear simmering broth and pulled from heat immediately, relying on residual heat to bring them to doneness so the adductor muscle retains its characteristic chew rather than tightening to a squeeze-toy texture. The Johnny-cake pivot demonstrates altitude shift: corn cooked on a flat iron griddle with only salt and boiling water is the purest expression, but inland versions incorporate rendered bacon fat into the batter to compensate for the absence of the salt pork already present in a coastal meal.",
    heirloomIngredients: [
      {
        name: "Narragansett white flint corn (Johnny-cake corn)",
        role: "An heirloom variety grown since Narragansett cultivation; the flint endosperm grinds coarser than dent corn, producing a cakes with a firm, slightly grainy crumb and a mineral sweetness absent from commodity meal."
      },
      {
        name: "Quahogs",
        role: "Large hard-shell clams specific to the bay; too tough for raw consumption but ideal for chowder, stuffies (baked stuffed clams), and clam cakes, where their pronounced brine and large adductor muscle define the textural experience."
      }
    ],
    iconicDish: {
      name: "Rhode Island Clear Clam Chowder with Clam Cakes",
      prep: "Salt pork is diced and rendered in a dutch oven until the crackling is golden. Minced onion sweats in the rendered fat. Peeled cubed Yukon Gold potatoes and raw minced quahog meat are added with the strained quahog liquor and enough water to cover. The chowder simmers until potatoes are just tender. Clam cakes: quahog liquor replaces milk in a batter of Johnny-cake meal, flour, egg, and baking powder, with minced quahog folded in. Batter is dropped by spoonful into 350°F oil and fried to deep amber. Chowder and clam cakes are served simultaneously—cakes are torn and submerged in the broth.",
      authenticityMarker: "The broth must run clear and amber, not white, not red. The clam cake should have a craggy, uneven surface—smooth-formed balls indicate the batter was overworked and the texture will be dense."
    },
    substitutionRule: "When quahog liquor is insufficient (canned clams release less liquid than fresh), build the equivalent salinity by dissolving 1 tsp fine sea salt and 1 tsp fish sauce per cup of clam juice—the glutamates in fish sauce replicate the nucleotide-driven umami of raw quahog liquor without adding fishy aroma, which would be lost during the simmer anyway."
  },
  {
    id: "connecticut-river-valley",
    name: "Connecticut River Valley",
    megaregionId: "atlantic",
    boundsDescription: "The alluvial corridor of the Connecticut River from the Massachusetts border south through Hartford to the tidal estuary at Saybrook, including the broad floodplain farms and tobacco-growing lowlands.",
    culture: "The valley's cooking is an interior Atlantic cuisine—maritime influence present through the shad run and oyster trade, but fundamentally shaped by deep agricultural soil and a growing season long enough for onions, asparagus, and shade-grown tobacco crops. Polish and Italian farm-worker communities arriving in the late 19th century for tobacco and broadleaf onion cultivation introduced sausage traditions and fermented-vegetable logic that hybridized with earlier English settler cooking.",
    terroir: "Deep alluvial loam deposited by annual Connecticut River flooding creates some of the most fertile soil in New England, supporting broadleaf tobacco, Wethersfield onions (a large, pungent red onion variety), white asparagus by tradition, and sweet corn with exceptional sugar retention. The river itself carries the spring shad run—the first large forage fish available after winter.",
    deviation: "Connecticut shad and its roe are cooked using a low-fat, slow-heat method that is mechanically opposite to the coast's high-heat sear approach: shad is planked on a hardwood board and slow-roasted at 250°F for up to 5 hours because the fish's complex pin-bone structure (over 300 bones) dissolves under prolonged heat as the collagen softens, making the fish edible without deboning. Any fat added would create steam that slows the collagen dissolution, so the fish is cooked dry until the natural fish fat bastes it from within. The Wethersfield onion pivot introduces a pungent, sulfur-heavy allium into a braise context, where the long cook converts its fructans to caramelized sugars, creating a sweet-savory fond that serves as the fat-distribution medium for pork-based dishes.",
    heirloomIngredients: [
      {
        name: "Wethersfield red onion",
        role: "A large, intensely pungent heirloom cultivar historically grown in the Connecticut River floodplain; higher fructan content than commercial yellow onions means it produces more caramelized sweetness during low-heat cooking and more aggressive sharpness when used raw."
      },
      {
        name: "Connecticut River shad roe",
        role: "The egg sac of the American shad, available for a six-week spring window; pan-seared in bacon fat and served with the shad itself, its creamy, rich interior and crisp membrane surface provide textural contrast absent in the fish's flesh."
      },
      {
        name: "Broadleaf tobacco (culinary smoke)",
        role: "While not eaten, cured broadleaf tobacco from valley farms is used as a smoking medium for pork, duck, and aged cheeses in farmhouse traditions, imparting a sweet, slightly resinous smoke character distinct from hickory or applewood."
      }
    ],
    iconicDish: {
      name: "Planked Shad with Shad Roe and Bacon",
      prep: "A hardwood plank (hickory or oak) is soaked in water for two hours and preheated in a 250°F oven. A whole cleaned shad is nailed or tied skin-side down to the plank, seasoned with only salt and white pepper. The planked fish goes back in the oven for 4 to 5 hours until the pin bones have fully softened into the flesh. Shad roe sacs are dusted in seasoned flour and fried in rendered bacon fat on medium-high heat, 3 minutes per side, until the membrane is browned and the interior is just set—roe that is cooked through loses its custardy center. Bacon strips are served alongside. The plank is brought to the table; fish is eaten directly off the wood.",
      authenticityMarker: "The shad must be eaten off the plank at the table—transferring to a plate is a restaurant affectation. Lemon is acceptable; tartar sauce is not."
    },
    substitutionRule: "When shad is out of season, American shad can be substituted with allis shad or, more practically, a bone-in bluefish fillet—but because bluefish pin bones do not dissolve at low heat (they lack the same collagen-rich bone matrix), reduce plank time to 90 minutes at 300°F and accept that bones must be eaten around, or switch to a butterflied presentation to expose and remove the bones before cooking."
  },
  {
    id: "new-hampshire-vermont-uplands",
    name: "New Hampshire and Vermont Uplands",
    megaregionId: "atlantic",
    boundsDescription: "The elevated interior plateau from the White Mountains of New Hampshire west across the Green Mountains of Vermont, including the river valleys of the Merrimack, Connecticut headwaters, and Winooski, tapering south to the hill towns above 1,000 feet elevation.",
    culture: "This is the purest expression of Yankee subsistence cooking—a cuisine developed under short growing seasons, brutal winters, and relative geographic isolation that forced radical preservation and fat efficiency. Maple syrup is not a condiment here but a primary cooking medium and sugar source. French-Canadian migration into Vermont's mill towns in the 19th century introduced tourtière logic, lard cookery, and a comfort-first philosophy that merged with existing British settler pottage traditions.",
    terroir: "Thin, rocky glacial soils over granite support sugar maple, wild ramps, fiddleheads, black walnuts, and elderberries rather than row crops. Vermont's dairy heritage produces high-fat milk from grass-fed Jerseys and Brown Swiss cattle. The short cool summers concentrate sugars in late-harvest vegetables—parsnips are left in the ground through frost, turnips sweeten after a freeze.",
    deviation: "Vermont cooking pivots fat source dramatically by season: summer uses cultured butter and fresh cream from dairy farms, while winter shifts to rendered lard and salt pork as the primary cooking fat because dairy fat is saved for butter production during the all-important fall churning period. This fat-source shift is also a flavor shift—lard produces a more neutral, shelf-stable fat environment that lets root vegetables express their own sugars without the dairy note that butter adds. Maple syrup's invert-sugar composition (primarily sucrose hydrolyzed to fructose and glucose) means it browns faster than white sugar under the same heat, so maple-glazed preparations require lower oven temperatures to avoid carbonization before the interior cooks—a 25°F reduction from standard caramel-glaze temperatures is a reliable rule.",
    heirloomIngredients: [
      {
        name: "Vermont maple syrup (Grade A Dark, Robust)",
        role: "Produced from late-season sap runs; darker grades have higher mineral content and stronger caramel-toffee flavor compounds that hold up to braising and baking heat in a way that lighter grades do not."
      },
      {
        name: "Frost-sweetened parsnips",
        role: "Left in the ground after first hard frost to convert starches to sugars through enzymatic action; produce a honeyed, almost vanilla-scented sweetness when roasted that un-frosted parsnips cannot replicate."
      },
      {
        name: "Cob-smoked cheddar (Vermont clothbound)",
        role: "Aged raw-milk cheddar smoked over dried corncobs in farmhouse traditions; the cob smoke adds a popcorn-like sweetness that complements the cheese's lactic sharpness and integrates into gratins and potato dishes as a finishing element."
      }
    ],
    iconicDish: {
      name: "Vermont Maple-Glazed Pork Loin with Braised Root Vegetables",
      prep: "A bone-in pork loin is brined in cold water with maple syrup, bay, allspice, and juniper berries for 12 hours. The loin is pat-dried and seared in lard until all surfaces are golden. The glaze is made by reducing Grade A Dark maple syrup with apple cider vinegar and whole-grain mustard to a loose syrup consistency. The loin is transferred to a 325°F oven—lower than a standard roast specifically to prevent the maple sugars from carbonizing—and brushed with glaze every 20 minutes. Frost-sweetened parsnips, turnips, and celeriac are added to the roasting pan with a splash of hard cider and covered in foil for the final 40 minutes. The resting jus is deglazed with additional cider and finished with cold cultured butter.",
      authenticityMarker: "The glaze should be amber and tacky, not black and lacquered. A black glaze means heat was too high and the fructose scorched. Serving with white bread to sop the jus is standard; serving with rice or pasta marks the dish as outside its tradition."
    },
    substitutionRule: "When Vermont clothbound cheddar is unavailable for a gratin or finishing application, substitute aged (minimum 18 months) Cabot seriously sharp cheddar combined with a small proportion (20% by weight) of Gruyère—the Gruyère's tyramine and free amino acid profile compensates for the microbial complexity lost when moving from raw-milk to pasteurized cheddar, and its higher moisture aids melt without breaking the fat."
  },
  {
    id: "nova-scotia-maritime",
    name: "Nova Scotia-Influenced Maritime",
    megaregionId: "atlantic",
    boundsDescription: "The northeastern reaches of the Atlantic micro-region including Downeast Maine's Washington County, the Bay of Fundy approaches, and coastal communities with deep cultural and trade ties to Nova Scotia and New Brunswick, bounded roughly by Passamaquoddy Bay and the Canadian border.",
    culture: "This zone is the most distinctly non-English of the Atlantic micro-regions: Acadian French deportation and resettlement history, Mi'kmaq food sovereignty, and Scottish Gaelic fishing-community influence produce a cuisine that draws on dulse-and-oatmeal logic, salt-fish preservation at industrial scale, and a comfort architecture built around chowder variants, rappie pie, and hodgepodge vegetable stews. The Bay of Fundy's extreme tidal range—up to 53 feet—exposes vast mudflats twice daily, shaping what shellfish and seaweed are available and how communities have structured their harvesting time.",
    terroir: "Bay of Fundy waters are among the most turbid in the world; the constant tidal mixing suspends nutrients and creates exceptional mussel and dulse growing conditions. Blueberry barrens across Washington County produce the same low-bush variety as interior Maine but in higher volumes. Fiddleheads—ostrich fern crosiers—are harvested from the river floodplains in a precise 10-day window each spring and are more central to the local diet here than anywhere else in the Atlantic region.",
    deviation: "Acadian rappie pie is the defining fat-logic deviation of this sub-region: potatoes are grated, all starch and water are wrung out of them, and the resulting dry potato mass is reconstituted with hot meat broth instead of the starch water that was removed—the broth fat now binds the potato proteins in a manner that creates an entirely different texture than conventional potato preparation, simultaneously dense and custard-like. The heat approach is always long and low: dishes are cooked in wood-stove residual heat overnight or in covered iron pots buried in coals, a technique driven by fuel scarcity and the cold that means ovens are not reheated just for cooking. Dulse functions here as a salt-fat replacement—its high glutamate content and mineral salinity allow it to substitute for both salt and a portion of the fat in slow-cooked preparations, reducing the required salt-pork volume in a way that table salt alone cannot replicate because it lacks the umami reinforcement.",
    heirloomIngredients: [
      {
        name: "Bay of Fundy dulse",
        role: "Dried red seaweed harvested from the high-tidal rocky shores; the highest umami concentration of any Atlantic seaweed variety due to the nutrient-rich tidal mixing; used dry as a snack, flaked into chowder, and fried in butter as a bacon substitute in traditional Acadian and Mi'kmaq kitchens."
      },
      {
        name: "Fiddleheads (ostrich fern)",
        role: "Harvested in a narrow spring window; must be boiled or steamed before eating to deactivate a thermolabile toxin; once cooked, contribute a grassy, slightly mineral flavor between asparagus and spinach that marks the end of winter in regional cooking."
      },
      {
        name: "Salt cod (bacalao-style dry cure)",
        role: "Preserved Atlantic cod dried on wooden flakes in the Newfoundland-Nova Scotia tradition; requires 48-hour cold-water rehydration with multiple water changes; once reconstituted, provides a firmer, more flavorful protein than fresh cod that holds its shape through long braises and fish cakes."
      }
    ],
    iconicDish: {
      name: "Acadian Rappie Pie (Pâté à la Râpure)",
      prep: "A whole chicken is simmered in water with onion, bay, and salt until the meat falls from the bone; the broth is reserved and kept near boiling. Russet potatoes are grated on the fine side of a box grater in batches; each batch is wrapped in cheesecloth and wrung aggressively until completely dry—the extracted starch water is discarded entirely. The dry grated potato is placed in a large bowl and hot chicken broth is poured in by ladleful, stirring constantly, until the potato mixture reaches the consistency of wet sand that just holds shape—this reconstitution step binds broth proteins and fat into the potato matrix. Half the potato mixture is spread in a greased deep baking dish, pulled chicken is layered in the center, and the remaining potato covers the top. A grid of salt pork strips or rendered pork fat is pressed into the top surface. The dish bakes uncovered at 375°F for 1.5 hours until the top is deeply browned and the interior is set.",
      authenticityMarker: "The surface must be crackling-dark brown, not golden—undercooking leaves the potato mixture gluey. Ketchup on the side is traditional and non-negotiable in Acadian households; objecting to it marks an outsider."
    },
    substitutionRule: "When salt cod requires shortened preparation time, a functional substitute can be built from fresh cod: salt the fillets heavily (1 Tbsp kosher salt per pound), refrigerate uncovered on a rack for 8 hours to draw surface moisture, then soak in cold water for 2 hours—this accelerated cure achieves approximately 60% of the flavor transformation of a full dry cure, sufficient for fish cakes and chowders but not adequate for long braises where the structural firmness of fully dried salt cod is mechanically necessary for the dish to hold its shape."
  }
];
