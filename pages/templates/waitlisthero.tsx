import { useState } from "react";
import { Inter } from 'next/font/google'

const INIT = "INIT";
const SUBMITTING = "SUBMITTING";
const ERROR = "ERROR";
const SUCCESS = "SUCCESS";
const formStates = [INIT, SUBMITTING, ERROR, SUCCESS] as const;
const formStyles = {

    // Add your own Loops ID

    "id": "clmeoyhq1000dl70q4yvcmb06",

    "name": "Default",
    "formStyle": "buttonBelow",
    "placeholderText": "your@email.com",
    "formFont": "Inter",
    "formFontColor": "#000000",
    "formFontSizePx": 14,

    // Customize the CTA

    "buttonText": "Join the waitlist",
    "buttonFont": "Inter",
    "buttonFontColor": "#FFFFFFF",
    "buttonColor": "#eac8ff",
    "buttonFontSizePx": 14,

    // Customize the success message

    "successMessage": "✅ You're on the waitlist!",
    "successFont": "Inter",
    "successFontColor": "#000000",
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

                    <main className="flex-auto h-screen overflow-hidden">

                        <div className="px-8 mt-9">
                            <div className="mx-auto w-full lg:px-8">
                                <div className="relative lg:px-12">
                                    <div className="mx-auto relative lg:px-12 max-w-md content-center">
                                        <div className="mx-auto w-full">
                                            <div className="top-[var(--avatar-top,theme(spacing.3))] w-full">
                                                <div className="relative w-full">
                                                    <a>
                                                        <img alt="avatar" decoding="async" data-nimg="1" className="mx-auto rounded-full bg-zinc-100 object-cover dark:bg-zinc-800 w-[50%] md:w-[50%] lg:w-[70%]" src="/TEuabszqVAwLcAPGE0yeHgRjBjQ.webp" />
                                                    </a>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="max-w-2xl">
                                            <h1 className="mt-6 text-4xl font-extrabold tracking-normal text-center text-zinc-800 dark:text-zinc-100 sm:text-5xl">Welcome to <br />Product Name</h1>
                                            <p className="mt-3 text-lg font-normal text-zinc-600 dark:text-zinc-400 text-center">The ultimate landing page that will 10x your waitlist is launching soon.</p>
                                        </div>

                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="px-8 mt-6">
                            <div className="mx-auto w-full lg:px-8">
                                <div className="relative lg:px-12">
                                    <div className="relative lg:px-12">
                                        <div className="mx-auto max-w-xs">
                                            <div
                                                style={{
                                                    display: "flex",
                                                    alignItems: "center",
                                                    justifyContent: "center",
                                                    width: "100%",
                                                    textAlign: "center",
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
                                        </div>
                                        <div className="flex justify-center gap-3 mt-6">
                                            <p className="flex items-center justify-center text-sm">62 already joined</p>
                                            <div className="flex -space-x-4">
                                                <img className="z-0 transition-all duration-500 hover:-translate-y-1 w-10 h-10 border-2 border-white rounded-full dark:border-gray-800" src="/profile-picture-5.jpg" alt="" />
                                                <img className="z-10 transition-all duration-500 hover:-translate-y-1 w-10 h-10 border-2 border-white rounded-full dark:border-gray-800" src="/profile-picture-2.jpg" alt="" />
                                                <img className="z-20 transition-all duration-500 hover:-translate-y-1 w-10 h-10 border-2 border-white rounded-full dark:border-gray-800" src="/profile-picture-3.jpg" alt="" />
                                                <p className="z-30 transition-all duration-500 hover:-translate-y-1 flex items-center justify-center w-10 h-10 text-xs font-medium text-white bg-gray-700 border-2 border-white rounded-full cursor-default">+59</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </main>

                    <footer className="p-4 bg-zinc-100 border-t border-zinc-200 mt-auto fixed bottom-0 w-full">
                        <div className="flex gap-6 w-full mx-auto">
                            <a
                                className="text-xs text-zinc-600 flex gap-0.25"
                                href="https://nextjswithloops.com/"
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                Made with NextJS with Loops
                                <svg
                                    fill="none"
                                    height="16"
                                    stroke="currentColor"
                                    stroke-linecap="round"
                                    stroke-linejoin="round"
                                    stroke-width="2"
                                    viewBox="0 0 24 24"
                                    width="16"
                                    aria-hidden="true"
                                    className="w-3 h-3 ml-1"
                                >
                                    <path d="M18 13v6a2 2 0 01-2 2H5a2 2 0 01-2-2V8a2 2 0 012-2h6"></path>
                                    <path d="M15 3h6v6"></path>
                                    <path d="M10 14L21 3"></path>
                                </svg>
                            </a>
                        </div>
                    </footer>

                </>
            );

        // This is the ERROR state of the site.

        case ERROR:
            return (
                <>
                    <main className="flex-auto h-screen overflow-hidden">

                        <div className="px-8 mt-9">
                            <div className="mx-auto w-full lg:px-8">
                                <div className="relative lg:px-12">
                                    <div className="mx-auto relative lg:px-12 max-w-md content-center">
                                        <div className="mx-auto w-full">
                                            <div className="top-[var(--avatar-top,theme(spacing.3))] w-full">
                                                <div className="relative w-full">
                                                    <a>
                                                        <img alt="avatar" decoding="async" data-nimg="1" className="mx-auto rounded-full bg-zinc-100 object-cover dark:bg-zinc-800 w-[50%] md:w-[50%] lg:w-[70%]" src="/TEuabszqVAwLcAPGE0yeHgRjBjQ.webp" />
                                                    </a>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="max-w-2xl">
                                            <h1 className="mt-6 text-4xl font-extrabold tracking-normal text-center text-zinc-800 dark:text-zinc-100 sm:text-5xl">Welcome to <br />Product Name</h1>
                                            <p className="mt-3 text-lg font-normal text-zinc-600 dark:text-zinc-400 text-center">The ultimate landing page that will 10x your waitlist is launching soon.</p>
                                        </div>

                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="px-8 mt-6">
                            <div className="mx-auto w-full lg:px-8">
                                <div className="relative lg:px-12">
                                    <div className="relative lg:px-12">
                                        <div className="mx-auto max-w-xs">
                                            <SignUpFormError />
                                            {/* <BackButton /> */}
                                        </div>
                                        <div className="flex justify-center gap-3 mt-6">
                                            <p className="flex items-center justify-center text-sm">62 already joined</p>
                                            <div className="flex -space-x-4">
                                                <img className="z-0 transition-all duration-500 hover:-translate-y-1 w-10 h-10 border-2 border-white rounded-full dark:border-gray-800" src="/profile-picture-5.jpg" alt="" />
                                                <img className="z-10 transition-all duration-500 hover:-translate-y-1 w-10 h-10 border-2 border-white rounded-full dark:border-gray-800" src="/profile-picture-2.jpg" alt="" />
                                                <img className="z-20 transition-all duration-500 hover:-translate-y-1 w-10 h-10 border-2 border-white rounded-full dark:border-gray-800" src="/profile-picture-3.jpg" alt="" />
                                                <p className="z-30 transition-all duration-500 hover:-translate-y-1 flex items-center justify-center w-10 h-10 text-xs font-medium text-white bg-gray-700 border-2 border-white rounded-full cursor-default">+59</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </main>

                    <footer className="p-4 bg-zinc-100 border-t border-zinc-200 mt-auto fixed bottom-0 w-full">
                        <div className="flex gap-6 w-full mx-auto">
                            <a
                                className="text-xs text-zinc-600 flex gap-0.25"
                                href="https://nextjswithloops.com/"
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                Made with NextJS with Loops
                                <svg
                                    fill="none"
                                    height="16"
                                    stroke="currentColor"
                                    stroke-linecap="round"
                                    stroke-linejoin="round"
                                    stroke-width="2"
                                    viewBox="0 0 24 24"
                                    width="16"
                                    aria-hidden="true"
                                    className="w-3 h-3 ml-1"
                                >
                                    <path d="M18 13v6a2 2 0 01-2 2H5a2 2 0 01-2-2V8a2 2 0 012-2h6"></path>
                                    <path d="M15 3h6v6"></path>
                                    <path d="M10 14L21 3"></path>
                                </svg>
                            </a>
                        </div>
                    </footer>
                </>
            );

        // This is the DEFAULT state of the site.

        default:
            return (
                <>
                    <main className="flex-auto h-screen overflow-hidden">

                        <div className="px-8 mt-9">
                            <div className="mx-auto w-full lg:px-8">
                                <div className="relative lg:px-12">
                                    <div className="mx-auto relative lg:px-12 max-w-md content-center">
                                        <div className="mx-auto w-full">
                                            <div className="top-[var(--avatar-top,theme(spacing.3))] w-full">
                                                <div className="relative w-full">
                                                    <a>
                                                        <img alt="avatar" decoding="async" data-nimg="1" className="mx-auto rounded-full bg-zinc-100 object-cover dark:bg-zinc-800 w-[50%] md:w-[50%] lg:w-[70%]" src="/TEuabszqVAwLcAPGE0yeHgRjBjQ.webp" />
                                                    </a>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="max-w-2xl">
                                            <h1 className="mt-6 text-4xl font-extrabold tracking-normal text-center text-zinc-800 dark:text-zinc-100 sm:text-5xl">Welcome to <br />Product Name</h1>
                                            <p className="mt-3 text-lg font-normal text-zinc-600 dark:text-zinc-400 text-center">The ultimate landing page that will 10x your waitlist is launching soon.</p>
                                        </div>

                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="px-8 mt-6">
                            <div className="mx-auto w-full lg:px-8">
                                <div className="relative lg:px-12">
                                    <div className="relative lg:px-12">
                                        <div className="mx-auto max-w-xs">
                                            <form onSubmit={handleSubmit} className="max-w-lg rounded-2xl">
                                                <div className="mt-6 mb-3 flex gap-2">
                                                    <input name="email" type="email" placeholder={formStyles.placeholderText} value={email} onChange={(e) => setEmail(e.target.value)} required={true} aria-label="Email address" className="flex-auto appearance-none rounded-md border border-zinc-900/10 bg-white px-3 py-[calc(theme(spacing.2)-1px)] shadow-md shadow-zinc-800/5 placeholder:text-zinc-400 focus:border-teal-500 focus:outline-none focus:ring-4 focus:ring-teal-500/10 dark:border-zinc-700 dark:bg-zinc-700/[0.15] dark:text-zinc-200 dark:placeholder:text-zinc-500 dark:focus:border-teal-400 dark:focus:ring-teal-400/10 sm:text-sm" />
                                                </div>
                                                <div className="transition-all duration-500 hover:scale-95"><SignUpFormButton /></div>
                                            </form>
                                        </div>
                                        <div className="flex justify-center gap-3 mt-6">
                                            <p className="flex items-center justify-center text-sm">62 already joined</p>
                                            <div className="flex -space-x-4">
                                                <img className="z-0 transition-all duration-500 hover:-translate-y-1 w-10 h-10 border-2 border-white rounded-full dark:border-gray-800" src="/profile-picture-5.jpg" alt="" />
                                                <img className="z-10 transition-all duration-500 hover:-translate-y-1 w-10 h-10 border-2 border-white rounded-full dark:border-gray-800" src="/profile-picture-2.jpg" alt="" />
                                                <img className="z-20 transition-all duration-500 hover:-translate-y-1 w-10 h-10 border-2 border-white rounded-full dark:border-gray-800" src="/profile-picture-3.jpg" alt="" />
                                                <p className="z-30 transition-all duration-500 hover:-translate-y-1 flex items-center justify-center w-10 h-10 text-xs font-medium text-white bg-gray-700 border-2 border-white rounded-full cursor-default">+59</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </main>

                    <footer className="p-4 bg-zinc-100 border-t border-zinc-200 mt-auto fixed bottom-0 w-full">
                        <div className="flex gap-6 w-full mx-auto">
                            <a
                                className="text-xs text-zinc-600 flex gap-0.25"
                                href="https://nextjswithloops.com/"
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                Made with NextJS with Loops
                                <svg
                                    fill="none"
                                    height="16"
                                    stroke="currentColor"
                                    stroke-linecap="round"
                                    stroke-linejoin="round"
                                    stroke-width="2"
                                    viewBox="0 0 24 24"
                                    width="16"
                                    aria-hidden="true"
                                    className="w-3 h-3 ml-1"
                                >
                                    <path d="M18 13v6a2 2 0 01-2 2H5a2 2 0 01-2-2V8a2 2 0 012-2h6"></path>
                                    <path d="M15 3h6v6"></path>
                                    <path d="M10 14L21 3"></path>
                                </svg>
                            </a>
                        </div>
                    </footer>
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
                        color: "rgb(185, 28, 28)",
                        fontSize: "14px",
                        textAlign: "center",
                    }}
                >
                    {errorMessage || "Whoops. Something unexpected happen. Please refresh the page and try again."}
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
                    textAlign: "center",
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
                    maxWidth: "384px",
                    whiteSpace: isInline ? "nowrap" : "normal",
                    height: "46px",
                    alignItems: "center",
                    justifyContent: "center",
                    flexDirection: "row",
                    padding: "8px 12px",
                    boxShadow: "0px 1px 2px rgba(0, 0, 0, 0.05)",
                    borderRadius: "20px",
                    textAlign: "center",
                    fontStyle: "normal",
                    fontWeight: 600,
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