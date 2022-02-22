import { NextPage } from "next";
import styles from "../styles/Home.module.css";

const Feedback: NextPage = () => {
    return (
        <div className={styles.container}>
            <h1 className={styles.main}>Valid submission!</h1>
        </div>
    );
};

export default Feedback;
