import { atlantic } from './megaregions/atlantic.js'
import { midAtlantic } from './megaregions/mid_atlantic.js'
import { appalachian } from './megaregions/appalachian.js'
import { lowcountry } from './megaregions/lowcountry.js'
import { gulf } from './megaregions/gulf.js'
import { heartland } from './megaregions/heartland.js'
import { plains } from './megaregions/plains.js'
import { texMex } from './megaregions/tex_mex.js'
import { southwest } from './megaregions/southwest.js'
import { cascadia } from './megaregions/cascadia.js'
import { california } from './megaregions/california.js'

export const allMicroRegions = [
  ...atlantic,
  ...midAtlantic,
  ...appalachian,
  ...lowcountry,
  ...gulf,
  ...heartland,
  ...plains,
  ...texMex,
  ...southwest,
  ...cascadia,
  ...california,
]
