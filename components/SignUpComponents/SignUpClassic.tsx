import { useState } from "react";

const INIT = "INIT";
const SUBMITTING = "SUBMITTING";
const ERROR = "ERROR";
const SUCCESS = "SUCCESS";
const formStates = [INIT, SUBMITTING, ERROR, SUCCESS] as const;
const formStyles = {

    // Add your own Loops ID

    "id": "clmeoyhq1000dl70q4yvcmb06",

    "name": "Default",
    "formStyle": "inline",
    "placeholderText": "Enter your email",
    "formFont": "Inter",
    "formFontColor": "#000000",
    "formFontSizePx": 14,

    // Customize the CTA

    "buttonText": "Subscribe",
    "buttonFont": "Inter",
    "buttonFontColor": "#",
    "buttonColor": "#",
    "buttonFontSizePx": 14,

    // Customize the success message

    "successMessage": "Success! 🏊‍♂️🚴‍♂️🏃‍♂️",
    "successFont": "Inter",
    "successFontColor": "#FFFFFF",
    "successFontSizePx": 14,
    "userGroup": "SignUpClassic"
}
const domain = "app.loops.so"

export default function SignUpBento() {
    const [email, setEmail] = useState("");
    const [formState, setFormState] = useState<typeof formStates[number]>(INIT);
    const [errorMessage, setErrorMessage] = useState("");

    const resetForm = () => {
        setEmail("");
        setFormState(INIT);
        setErrorMessage("");
    };

    /**
     * Rate limit the number of submissions allowed
     * @returns {boolean} true if the form has been successfully submitted in the past minute
     */
    const hasRecentSubmission = () => {
        const time = new Date();
        const timestamp = time.valueOf();
        const previousTimestamp = localStorage.getItem("loops-form-timestamp");

        // Indicate if the last sign up was less than a minute ago
        if (
            previousTimestamp &&
            Number(previousTimestamp) + 60 * 1000 > timestamp
        ) {
            setFormState(ERROR);
            setErrorMessage("CMD/CRTL + R");
            return true;
        }

        localStorage.setItem("loops-form-timestamp", timestamp.toString());
        return false;
    };

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        // Prevent the default form submission
        event.preventDefault();

        // boundary conditions for submission
        if (formState !== INIT) return;
        if (!isValidEmail(email)) {
            setFormState(ERROR);
            setErrorMessage("Please enter a valid email");
            return;
        }
        if (hasRecentSubmission()) return;
        setFormState(SUBMITTING);

        // build body
        const formBody = `userGroup=${encodeURIComponent(
            formStyles.userGroup
        )}&email=${encodeURIComponent(email)}`;

        // API request to add user to newsletter
        fetch(`https://${domain}/api/newsletter-form/${formStyles.id}`, {
            method: "POST",
            body: formBody,
            headers: {
                "Content-Type": "application/x-www-form-urlencoded",
            },
        })
            .then((res: any) => [res.ok, res.json(), res])
            .then(([ok, dataPromise, res]) => {
                if (ok) {
                    resetForm();
                    setFormState(SUCCESS);
                } else {
                    dataPromise.then((data: any) => {
                        setFormState(ERROR);
                        setErrorMessage(data.message || res.statusText);
                        localStorage.setItem("loops-form-timestamp", "");
                    });
                }
            })
            .catch((error) => {
                setFormState(ERROR);
                // check for cloudflare error
                if (error.message === "Failed to fetch") {
                    setErrorMessage("CMD/CRTL + R");
                } else if (error.message) {
                    setErrorMessage(error.message);
                }
                localStorage.setItem("loops-form-timestamp", "");
            });
    };

    const isInline = formStyles.formStyle === "inline";

    switch (formState) {

        // This is the SUCCESS state of the site.

        case SUCCESS:
            return (
                <>
                    <div className="flex h-[108px] justify-center relative mx-auto my-auto cursor-default">
                        <h1 className="flex relative my-auto text-base font-medium tracking-normal text-center text-[#6F7071]">You&apos;ve been added to my mailing list 😜</h1>
                    </div>
                </>
            );

        // This is the ERROR state of the site.

        case ERROR:
            return (
                <>
                    <div className="flex h-[108px] justify-center relative mx-auto my-auto cursor-default">
                        <h1 className="flex relative my-auto text-base font-medium tracking-normal text-center text-[#6F7071]">Something went wrong. Please try again.</h1>
                    </div>
                </>
            );

        // This is the DEFAULT state of the site.

        default:
            return (
                <>
                    <div className="relative mx-auto my-auto cursor-default">
                        <form autoComplete="off" onSubmit={handleSubmit} className="flex flex-col items-left justify-center">
                            <div className="flex gap-2 mb-3 w-full">
                                <input autoComplete="off" name="email" type="text" placeholder={formStyles.placeholderText} value={email} onChange={(e) => setEmail(e.target.value)} required={true} aria-label="Email address" className="rounded-lg w-full h-12 bg-[#F1F1F1] focus:bg-white px-3 border border-[#C7C7C7]/80 py-[calc(theme(spacing.2)-1px)] shadow-md shadow-zinc-800/5 placeholder:text-zinc-400 focus:outline-none text-black m:text-sm" />
                            </div>
                            <SignUpFormButton />
                        </form>
                    </div>
                </>
            );
    }

    function SignUpFormButton({ props }: any) {
        return (
            <button className="flex bg-black shadow-[0px_1px_0px_0px_rgba(255,_255,_255,_0.04)_inset] p-4 h-12 mx-auto w-full border-0 justify-center rounded-lg backdrop-blur-sm text-white items-center font-medium text-sm border-gray-200"
                type="submit">
                {formState === SUBMITTING ? "Please wait..." : formStyles.buttonText}
            </button>
        );
    }
}

function isValidEmail(email: any) {
    return /.+@.+/.test(email);
}