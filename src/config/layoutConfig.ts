import headerLogo from "../assets/256x256.png";
import siderLogo from "../assets/logo.svg";

export interface ILayoutConfig {
  siderMenu: {
    title: string;
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
    title: "AOKO",
    show: true,
    logo: siderLogo,
    showLogo: true
  },
  header: {
    show: true,
    fixed: false,
    logo: headerLogo,
    showLogo: false
  },
  footer: {
    show: false,
    fixed: false
  }
};
