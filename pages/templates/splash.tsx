import { useState } from "react";
import Tilt from 'react-parallax-tilt';
import { Inter } from 'next/font/google'
import Link from "next/link";
import Image from "next/image";
import Confetti from 'react-confetti'

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
    "placeholderText": "your@email.com",
    "formFont": "Inter",
    "formFontColor": "#000000",
    "formFontSizePx": 14,

    // Customize the CTA

    "buttonText": "Claim your link",
    "buttonFont": "Inter",
    "buttonFontColor": "#000000",
    "buttonColor": "#D8BADE",
    "buttonFontSizePx": 14,

    // Customize the success message

    "successMessage": "✅ You're on the waitlist to receive our eBook!",
    "successFont": "Inter",
    "successFontColor": "#FFFFFF",
    "successFontSizePx": 14,
    "userGroup": ""
}
const domain = "app.loops.so"

export default function SignUpFormReact() {
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
            setErrorMessage("Whoops. Something unexpected happen. Please refresh the page and try again.");
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
                    setErrorMessage("Whoops. Something unexpected happen. Please refresh the page and try again.");
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
                    <Confetti numberOfPieces={35} recycle={true} />
                    <main className="flex min-h-screen overflow-hidden bg-[#2D4B20] border-[12px] border-white rounded-3xl">
                        <div className="mx-auto my-auto">
                            <div className="mx-auto w-full">
                                <div className="relative">
                                    <div className="relative lg:max-w-4xl lg:flex lg:flex-row gap-12">
                                        <div className="my-auto mx-auto px-6">
                                            <h1 className="text-4xl font-black tracking-normal text-left sm:text-center text-[#D0E053] sm:text-7xl">Thank you for joining us on this journey! Check out inbox.</h1>
                                            {/* <div className="w-full mt-4">
                                                <div
                                                    style={{
                                                        display: "flex",
                                                        alignItems: "left",
                                                        justifyContent: "left",
                                                        width: "100%",
                                                        textAlign: "left",
                                                    }}
                                                >
                                                    <p
                                                        style={{
                                                            fontFamily: `'${formStyles.successFont}', sans-serif`,
                                                            color: formStyles.successFontColor,
                                                            fontSize: `${formStyles.successFontSizePx}px`,
                                                        }}
                                                    >
                                                        {formStyles.successMessage}
                                                    </p>
                                                </div>
                                            </div> */}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </main>

                    <Link href="/">
                        <footer className="p-2 px-3 mb-6 bg-zinc-100 border-t border-zinc-200 mt-auto mx-auto fixed inset-x-0 bottom-0 w-fit rounded-xl justify-center scale-75 sm:scale-100 hover:scale-105 transition-all duration-700">
                            <div className="flex w-full mx-auto gap-1">
                                <Image
                                    src="/nextjsloops.webp"
                                    alt="logo"
                                    width={50}
                                    height={50}
                                    className="rounded-full scale-75 items-center"
                                />
                                <p className="text-xs text-zinc-600 flex gap-3 my-auto">
                                    Made with NextJS with Loops
                                </p>
                            </div>
                        </footer>
                    </Link>


                </>
            );

        // This is the ERROR state of the site.

        case ERROR:
            return (
                <>
                    <main className="flex min-h-screen overflow-hidden bg-[#2D4B20] border-[12px] border-white rounded-3xl">
                        <div className="mx-auto my-auto">
                            <div className="mx-auto w-full">
                                <div className="relative">
                                    <div className="relative lg:max-w-4xl lg:flex lg:flex-row gap-12">
                                        <div className="my-auto mx-auto px-6">
                                            <h1 className="text-4xl font-black tracking-normal text-left sm:text-center text-[#D0E053] sm:text-7xl">Everything you are. In one simple link.</h1>
                                            <p className="mt-3 text-lg font-normal text-[#D0E053] text-left sm:text-center">Join +250 people and share everything you create, curate and sell online. All from one link in your bio.</p>
                                            <div className="w-full mt-4 h-[3rem]">
                                                <SignUpFormError />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </main>

                    <Link href="/">
                        <footer className="p-2 px-3 mb-6 bg-zinc-100 border-t border-zinc-200 mt-auto mx-auto fixed inset-x-0 bottom-0 w-fit rounded-xl justify-center scale-75 sm:scale-100 hover:scale-105 transition-all duration-700">
                            <div className="flex w-full mx-auto gap-1">
                                <Image
                                    src="/nextjsloops.webp"
                                    alt="logo"
                                    width={50}
                                    height={50}
                                    className="rounded-full scale-75 items-center"
                                />
                                <p className="text-xs text-zinc-600 flex gap-3 my-auto">
                                    Made with NextJS with Loops
                                </p>
                            </div>
                        </footer>
                    </Link>

                </>
            );

        // This is the DEFAULT state of the site.

        default:
            return (
                <>
                    <main className="flex min-h-screen overflow-hidden bg-[#2D4B20] border-[12px] border-white rounded-3xl">
                        <div className="mx-auto my-auto">
                            <div className="mx-auto w-full">
                                <div className="relative">
                                    <div className="relative lg:max-w-4xl lg:flex lg:flex-row gap-12">
                                        <div className="my-auto mx-auto px-6">
                                            <h1 className="text-4xl font-black tracking-normal text-left sm:text-center text-[#D0E053] sm:text-7xl">Everything you are. In one simple link.</h1>
                                            <p className="mt-3 text-lg font-normal text-[#D0E053] text-left sm:text-center">Join +250 people and share everything you create, curate and sell online. All from one link in your bio.</p>
                                            <div className="w-full mt-4">
                                                <form onSubmit={handleSubmit} className="sm:flex sm:flex-row items-center justify-center">
                                                    <div className="flex gap-2 mb-3 sm:mb-0 mr-3">
                                                        <input name="email" type="email" placeholder={formStyles.placeholderText} value={email} onChange={(e) => setEmail(e.target.value)} required={true} aria-label="Email address" className="rounded-md w-[300px] h-12 border border-zinc-900/10 bg-white px-3 py-[calc(theme(spacing.2)-1px)] shadow-md placeholder:text-black focus:border-[#D8BADE] focus:outline-none focus:ring-2 focus:ring-[#D8BADE] sm:text-sm" />
                                                    </div>
                                                    <div className="transition-all duration-700 hover:opacity-90"><SignUpFormButton /></div>
                                                </form>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </main>

                    <Link href="/">
                        <footer className="p-2 px-3 mb-6 bg-zinc-100 border-t border-zinc-200 mt-auto mx-auto fixed inset-x-0 bottom-0 w-fit rounded-xl justify-center scale-75 sm:scale-100 hover:scale-105 transition-all duration-700">
                            <div className="flex w-full mx-auto gap-1">
                                <Image
                                    src="/nextjsloops.webp"
                                    alt="logo"
                                    width={50}
                                    height={50}
                                    className="rounded-full scale-75 items-center"
                                />
                                <p className="text-xs text-zinc-600 flex gap-3 my-auto">
                                    Made with NextJS with Loops
                                </p>
                            </div>
                        </footer>
                    </Link>

                </>
            );
    }

    function SignUpFormError() {
        return (
            <div
                style={{
                    alignItems: "center",
                    justifyContent: "center",
                    width: "100%",
                }}
            >
                <p
                    style={{
                        fontFamily: "Inter, sans-serif",
                        color: "#fbd9d3",
                        fontSize: "16px",
                        textAlign: "center",
                        fontWeight: "semibold"
                    }}
                >
                    {errorMessage || "Hmm. This wasn't supposed to happen. Could you please try and refresh the page and try again."}
                </p>
            </div>
        );
    }

    function BackButton() {
        const [isHovered, setIsHovered] = useState(false);

        return (
            <button
                style={{
                    color: "#6b7280",
                    font: "14px, Inter, sans-serif",
                    margin: "10px auto",
                    textAlign: "left",
                    background: "transparent",
                    border: "none",
                    cursor: "pointer",
                    textDecoration: isHovered ? "underline" : "none",
                }}
                onMouseOut={() => setIsHovered(false)}
                onMouseOver={() => setIsHovered(true)}
                onClick={resetForm}
            >
                &larr; Try again
            </button>
        );
    }

    function SignUpFormButton({ props }: any) {
        return (
            <button
                type="submit"
                style={{
                    background: formStyles.buttonColor,
                    fontSize: `${formStyles.buttonFontSizePx}px`,
                    color: formStyles.buttonFontColor,
                    fontFamily: `'${formStyles.buttonFont}', sans-serif`,
                    width: isInline ? "min-content" : "100%",
                    maxWidth: "1000px",
                    whiteSpace: isInline ? "nowrap" : "normal",
                    height: "48px",
                    alignItems: "center",
                    justifyContent: "center",
                    flexDirection: "row",
                    padding: "8px 24px",
                    boxShadow: "0px 1px 2px rgba(0, 0, 0, 0.05)",
                    borderRadius: "200px",
                    textAlign: "center",
                    fontStyle: "normal",
                    fontWeight: 800,
                    lineHeight: "20px",
                    border: "none",
                    cursor: "pointer",
                }}
            >
                {formState === SUBMITTING ? "Please wait..." : formStyles.buttonText}
            </button>
        );
    }
}

function isValidEmail(email: any) {
    return /.+@.+/.test(email);
}