import logo from "@/assets/images/logo.png";
import styles from "@/styles/Header.module.scss";
import {
  isPortalClosed,
  PORTAL_CLOSED_MESSAGE,
} from "@/utils/students/portalDeadline";
import { Button, Layout, Tooltip } from "antd";
import Image from "next/image";
import Link from "next/link";
const { Header: AntHeader } = Layout;

const Header = () => {
  const closed = isPortalClosed();

  return (
    <AntHeader className={styles.header}>
      <div className={styles.inner}>
        <div className={styles.brand}>
          <div className={styles.logoWrapper}>
            <Image
              src={logo}
              alt="Government of Assam Logo"
              width={56}
              height={56}
              className={styles.logo}
              priority
            />
          </div>

          <div className={styles.brandText}>
            <span className={styles.govLine}>Government of Assam</span>
            <span className={styles.portalName}>
              Directorate of Higher Education
            </span>
          </div>
        </div>
        <div className={styles.buttonGroup}>
          <Link href="/auth/student/login">
            <Button type="primary" className={styles.applyButton}>
              Login
            </Button>
          </Link>

          {closed ? (
            <Tooltip title={PORTAL_CLOSED_MESSAGE}>
              <Button type="primary" className={styles.applyButton} disabled>
                Register Now
              </Button>
            </Tooltip>
          ) : (
            <Link href="/auth/student/register">
              <Button type="primary" className={styles.applyButton}>
                Register Now
              </Button>
            </Link>
          )}
        </div>
      </div>
    </AntHeader>
  );
};

export default Header;
