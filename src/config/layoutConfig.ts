import headerLogo from "../assets/256x256.png";
import siderLogo from "../assets/logo.svg";

export interface ILayoutConfig {
  siderMenu: {
    show: boolean;
    logo: string;
    showLogo: boolean;
  };
  header: {
    show: boolean;
    fixed: boolean;
    logo: string;
    showLogo: boolean;
  };
  footer: {
    show: boolean;
    fixed: boolean;
  };
}

export const layoutConfig: ILayoutConfig = {
  siderMenu: {
    show: true,
    logo: siderLogo,
    showLogo: true
  },
  header: {
    show: true,
    fixed: false,
    logo: headerLogo,
    showLogo: true
  },
  footer: {
    show: false,
    fixed: false
  }
};
