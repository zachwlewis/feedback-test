import type { NextPage } from "next";
import { useRouter } from "next/router";
import FeedbackForm from "../components/FeedbackForm";
import styles from "../styles/Home.module.css";

const Home: NextPage = () => {
    const router = useRouter();
    return (
        <div className={styles.container}>
            <FeedbackForm
                onSuccess={() => {
                    router.push("/feedback");
                }}
            />
        </div>
    );
};

export default Home;
