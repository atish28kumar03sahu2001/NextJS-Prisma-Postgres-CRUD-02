import Link from "next/link";
import styles from "./page.module.css";
export default function Home () {
    return (
        <>
            <section className={styles.SEC_HEADER}>
                <h1 className={styles.SEC_H1}>User Management System</h1>
                <Link className={styles.SEC_LNK} href={'/user-management'} title="Go To User Management">Click Here</Link>
            </section>
        </>
    );
}