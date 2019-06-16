export interface ILayoutConfig {
  siderMenu: boolean;
  header: {
    show: boolean;
    fixed: boolean;
  };
  footer: {
    show: boolean;
    fixed: boolean;
  };
}

export const layoutConfig: ILayoutConfig = {
  siderMenu: true,
  header: {
    show: true,
    fixed: false
  },
  footer: {
    show: false,
    fixed: false
  }
};
