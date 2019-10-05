import { NavigationScreenProp } from "react-navigation"

export const navigation: NavigationScreenProp<{}> = {
  state: {},
  dispatch: jest.fn(),
  dismiss: jest.fn(),
  goBack: jest.fn(),
  navigate: jest.fn(),
  openDrawer: jest.fn(),
  closeDrawer: jest.fn(),
  toggleDrawer: jest.fn(),
  getParam: jest.fn(),
  setParams: jest.fn(),
  emit: jest.fn(),
  addListener: jest.fn(),
  isFocused: jest.fn(),
  isFirstRouteInParent: jest.fn(),
  dangerouslyGetParent: jest.fn(),
}
