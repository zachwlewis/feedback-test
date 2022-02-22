import { FormEvent, useState } from "react";
import styles from "../styles/Feedback.module.css";

type Props = {
    error?: String;
    onSuccess?: Function;
};

type FeedbackResponseProps = {
    message: String;
    inputs?: { userName: String; secretCode: String; valid: String };
};

const FeedbackForm = (props: Props) => {
    const [userName, setUserName] = useState("");
    const [secretCode, setSecretCode] = useState("");
    const [valid, setValid] = useState("");
    const [error, setError] = useState(props.error);
    const [status, setStatus] = useState("");

    async function submitForm(e: FormEvent) {
        e.preventDefault();
        console.log("Form submit started.");
        console.log({ userName, secretCode, valid });
        setError("");
        setStatus("Submitting...");

        const response = await fetch("/api/feedback", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                un: userName,
                sc: secretCode,
                valid: valid,
            }),
        });

        const data: FeedbackResponseProps = await response.json();
        setStatus("");
        if (response.ok) {
            setError("");
            setStatus("Successful Submission!");
            console.log("success", data);
            await new Promise((resolve) => setTimeout(resolve, 2500));
            // Instead of setting my status here, I'd like to navigate to another page.
            if (props.onSuccess) props.onSuccess();
        } else {
            setError(data.message);
            console.log("failure", data);
        }
    }

    const errorElement = error ? (
        <div className={styles.formError}>{error}</div>
    ) : (
        <></>
    );

    const statusElement = status ? (
        <div className={styles.formStatus}>{status}</div>
    ) : (
        <></>
    );

    const readOnly = status !== "";

    return (
        <div className={styles.feedbackArea}>
            {errorElement}
            {statusElement}
            <form className={styles.feedback} onSubmit={submitForm}>
                <fieldset className={styles.inputGroup}>
                    <legend>User Info</legend>
                    <label className={styles.textItem}>
                        User Name
                        <input
                            name="un"
                            type="text"
                            value={userName}
                            onChange={(e) => setUserName(e.target.value)}
                            disabled={readOnly}
                        />
                    </label>
                    <label className={styles.textItem}>
                        Secret Code
                        <input
                            name="sc"
                            type="text"
                            value={secretCode}
                            onChange={(e) => setSecretCode(e.target.value)}
                            disabled={readOnly}
                        />
                    </label>
                </fieldset>
                <fieldset className={styles.inputGroup}>
                    <legend>Mode</legend>
                    <label>
                        <input
                            type="radio"
                            name="valid"
                            value="normal"
                            onChange={(e) => setValid(e.target.value)}
                            disabled={readOnly}
                            checked={valid === "normal"}
                        />
                        Normal
                    </label>
                    <label>
                        <input
                            type="radio"
                            name="valid"
                            value="turbo"
                            onChange={(e) => setValid(e.target.value)}
                            disabled={readOnly}
                            checked={valid === "turbo"}
                        />
                        Turbo
                    </label>
                    <label>
                        <input
                            type="radio"
                            name="valid"
                            value="hyper"
                            onChange={(e) => setValid(e.target.value)}
                            disabled={readOnly}
                            checked={valid === "hyper"}
                        />
                        Hyper
                    </label>
                </fieldset>
                <button
                    className={styles.submit}
                    type="submit"
                    disabled={readOnly}
                >
                    Submit
                </button>
            </form>
        </div>
    );
};

export default FeedbackForm;
