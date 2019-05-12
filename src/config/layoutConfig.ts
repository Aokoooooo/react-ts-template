export interface ILayoutConfig {
  siderMenu: boolean;
  header: {
    show: boolean;
    fixed: boolean;
  };
  footer: boolean;
}

export const layoutConfig: ILayoutConfig = {
  siderMenu: true,
  header: {
    show: true,
    fixed: false
  },
  footer: true
};
