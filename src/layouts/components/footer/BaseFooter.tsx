import React, { ReactNode } from "react";
import { ILinkConfig } from "./index";
import styles from "./index.module.less";

export interface IBaseFooter {
  links?: ILinkConfig[];
  copyright?: ReactNode;
}

const BaseFooter: React.FC<IBaseFooter> = (props: IBaseFooter) => {
  const { links, copyright } = props;
  return (
    <footer className={styles.baseFooter}>
      {links && (
        <div className={styles.links}>
          {links.map(link => (
            <a
              key={link.key}
              title={link.key}
              target={link.blankTarget ? "_blank" : "_self"}
              href={link.href}
            >
              {link.title}
            </a>
          ))}
        </div>
      )}
      {copyright && <div className={styles.copyright}>{copyright}</div>}
    </footer>
  );
};

export default BaseFooter;
