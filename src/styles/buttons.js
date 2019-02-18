import * as Color from './color'
import * as Typography from './typography'

const base = {
  alignItems: 'center',
  justifyContent: 'center',
}

const large = {
  maxHeight: 60,
  padding: 10,
}

const rounded = {
  borderRadius: 20,
}

export const largeRounded = {
  ...base,
  ...large,
  ...rounded,
}

export const startGame = {
  ...largeRounded,
  backgroundColor: Color.white,
  borderWidth: 4,
  borderColor: Color.white,
}
