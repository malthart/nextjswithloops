import { useState } from "react";
import Tilt from 'react-parallax-tilt';
import { Inter } from 'next/font/google'
import Link from "next/link";

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

    "buttonText": "Join the waitlist",
    "buttonFont": "Inter",
    "buttonFontColor": "#000000",
    "buttonColor": "#FFFFFF",
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
                    <main className="flex h-screen overflow-hidden bg-gradient-to-tl from-slate-800 via-slate-900 to-slate-800">

                        <div className="px-8 m-auto">
                            <div className="mx-auto w-full">
                                <div className="relative">
                                    <div className="relative lg:max-w-4xl lg:flex lg:flex-row gap-12">
                                        <div className="relative hidden lg:block md:hidden sm:hidden w-[90%]">
                                            <img alt="avatar" decoding="async" data-nimg="1" src="/zinc/zinc.webp" className="rounded-2xl" />
                                        </div>

                                        <div className="my-auto">
                                            <span className="bg-gray-100 text-xs font-medium inline-flex items-center px-2.5 py-0.5 rounded-full mr-2 border border-gray-500 bg-opacity-80">
                                                <svg className="w-2.5 h-2.5 mr-1.5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                                                    <path d="M10 0a10 10 0 1 0 10 10A10.011 10.011 0 0 0 10 0Zm3.982 13.982a1 1 0 0 1-1.414 0l-3.274-3.274A1.012 1.012 0 0 1 9 10V6a1 1 0 0 1 2 0v3.586l2.982 2.982a1 1 0 0 1 0 1.414Z" />
                                                </svg>
                                                E-Book coming in 3 days
                                            </span>
                                            <h1 className="mt-6 text-4xl font-bold tracking-normal text-left text-white sm:text-5xl"><span className="italic bg-gradient-to-r bg-clip-text text-transparent from-indigo-500 via-green-500 to-indigo-50 animate-text">ZINC:</span> The eBook Landing Page</h1>
                                            <p className="mt-3 text-lg font-normal text-slate-400 text-left">Unlock access to a quick, easy, and production ready approach to launchinga beautiful and usable eBook Landing Page (without relying on complicated UX methods). Join the waitlist to get notified when the eBook goes live.</p>
                                            <div className="w-full mt-5">
                                                <div className="w-full">
                                                    <div className="relative">
                                                        <div className="max-w-l mb-3 h-[3.7rem]">
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
                                                        </div>
                                                        <div className="flex justify-left gap-3 mb-3">
                                                            <div className="flex -space-x-3">
                                                                <img className="z-0 transition-all duration-500 hover:-translate-y-1 w-6 h-6 border-1 border-black rounded-full" src="/profile-picture-5.jpg" alt="" />
                                                                <img className="z-10 transition-all duration-500 hover:-translate-y-1 w-6 h-6 border-1 border-black rounded-full" src="/profile-picture-2.jpg" alt="" />
                                                                <img className="z-20 transition-all duration-500 hover:-translate-y-1 w-6 h-6 border-1 border-black rounded-full" src="/profile-picture-3.jpg" alt="" />
                                                                <img className="z-30 transition-all duration-500 hover:-translate-y-1 w-6 h-6 border-1 border-black rounded-full" src="/profile-picture-3.jpg" alt="" />
                                                            </div>
                                                            <p className="flex items-center justify-center text-sm text-slate-400">62+ people already joined</p>
                                                        </div>
                                                        <div>
                                                            <Link href="https://x.com/">
                                                                <span className="bg-black text-xs font-medium inline-flex items-center px-2.5 py-0.5 rounded-full mr-2 border-gray-500 bg-opacity-30 gap-1 text-slate-500 hover:text-slate-300 transition-all duration-500">
                                                                    <svg width="10" height="10" viewBox="0 0 1200 1227" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                                        <path d="M714.163 519.284L1160.89 0H1055.03L667.137 450.887L357.328 0H0L468.492 681.821L0 1226.37H105.866L515.491 750.218L842.672 1226.37H1200L714.137 519.284H714.163ZM569.165 687.828L521.697 619.934L144.011 79.6944H306.615L611.412 515.685L658.88 583.579L1055.08 1150.3H892.476L569.165 687.854V687.828Z" fill="grey" />
                                                                    </svg>
                                                                    <p>Malthe Hartmann</p>
                                                                </span>
                                                            </Link>
                                                        </div>
                                                    </div>
                                                </div>
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
                                    strokeLinecap="round"
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
                    <main className="flex h-screen overflow-hidden bg-gradient-to-tl from-slate-800 via-slate-900 to-slate-800">

                        <div className="px-8 m-auto">
                            <div className="mx-auto w-full">
                                <div className="relative">
                                    <div className="relative lg:max-w-4xl lg:flex lg:flex-row gap-12">
                                        <div className="relative hidden lg:block md:hidden sm:hidden w-[90%]">
                                            <img alt="avatar" decoding="async" data-nimg="1" src="/zinc/zinc.webp" className="rounded-2xl" />
                                        </div>

                                        <div className="my-auto">
                                            <span className="bg-gray-100 text-xs font-medium inline-flex items-center px-2.5 py-0.5 rounded-full mr-2 border border-gray-500 bg-opacity-80">
                                                <svg className="w-2.5 h-2.5 mr-1.5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                                                    <path d="M10 0a10 10 0 1 0 10 10A10.011 10.011 0 0 0 10 0Zm3.982 13.982a1 1 0 0 1-1.414 0l-3.274-3.274A1.012 1.012 0 0 1 9 10V6a1 1 0 0 1 2 0v3.586l2.982 2.982a1 1 0 0 1 0 1.414Z" />
                                                </svg>
                                                E-Book coming in 3 days
                                            </span>
                                            <h1 className="mt-6 text-4xl font-bold tracking-normal text-left text-white sm:text-5xl"><span className="italic bg-gradient-to-r bg-clip-text text-transparent from-indigo-500 via-green-500 to-indigo-50 animate-text">ZINC:</span> The eBook Landing Page</h1>
                                            <p className="mt-3 text-lg font-normal text-slate-400 text-left">Unlock access to a quick, easy, and production ready approach to launchinga beautiful and usable eBook Landing Page (without relying on complicated UX methods). Join the waitlist to get notified when the eBook goes live.</p>
                                            <div className="w-full mt-5">
                                                <div className="w-full">
                                                    <div className="relative">
                                                        <div className="max-w-l mb-3 h-[3.7rem]">
                                                            <SignUpFormError />
                                                        </div>
                                                        <div className="flex justify-left gap-3 mb-3">
                                                            <div className="flex -space-x-3">
                                                                <img className="z-0 transition-all duration-500 hover:-translate-y-1 w-6 h-6 border-1 border-black rounded-full" src="/profile-picture-5.jpg" alt="" />
                                                                <img className="z-10 transition-all duration-500 hover:-translate-y-1 w-6 h-6 border-1 border-black rounded-full" src="/profile-picture-2.jpg" alt="" />
                                                                <img className="z-20 transition-all duration-500 hover:-translate-y-1 w-6 h-6 border-1 border-black rounded-full" src="/profile-picture-3.jpg" alt="" />
                                                                <img className="z-30 transition-all duration-500 hover:-translate-y-1 w-6 h-6 border-1 border-black rounded-full" src="/profile-picture-3.jpg" alt="" />
                                                            </div>
                                                            <p className="flex items-center justify-center text-sm text-slate-400">62+ people already joined</p>
                                                        </div>
                                                        <div>
                                                            <Link href="https://x.com/">
                                                                <span className="bg-black text-xs font-medium inline-flex items-center px-2.5 py-0.5 rounded-full mr-2 border-gray-500 bg-opacity-30 gap-1 text-slate-500 hover:text-slate-300 transition-all duration-500">
                                                                    <svg width="10" height="10" viewBox="0 0 1200 1227" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                                        <path d="M714.163 519.284L1160.89 0H1055.03L667.137 450.887L357.328 0H0L468.492 681.821L0 1226.37H105.866L515.491 750.218L842.672 1226.37H1200L714.137 519.284H714.163ZM569.165 687.828L521.697 619.934L144.011 79.6944H306.615L611.412 515.685L658.88 583.579L1055.08 1150.3H892.476L569.165 687.854V687.828Z" fill="grey" />
                                                                    </svg>
                                                                    <p>Malthe Hartmann</p>
                                                                </span>
                                                            </Link>
                                                        </div>
                                                    </div>
                                                </div>
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
                                    strokeLinecap="round"
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
                    <main className="flex h-screen overflow-hidden bg-gradient-to-tl from-slate-800 via-slate-900 to-slate-800">

                        <div className="px-8 m-auto">
                            <div className="mx-auto w-full">
                                <div className="relative">
                                    <div className="relative lg:max-w-4xl lg:flex lg:flex-row gap-12">
                                        <div className="relative hidden lg:block md:hidden sm:hidden w-[90%]">
                                            <img alt="avatar" decoding="async" data-nimg="1" src="/zinc/zinc.webp" className="rounded-2xl" />
                                        </div>

                                        <div className="my-auto">
                                            <span className="bg-gray-100 text-xs font-medium inline-flex items-center px-2.5 py-0.5 rounded-full mr-2 border border-gray-500 bg-opacity-80">
                                                <svg className="w-2.5 h-2.5 mr-1.5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                                                    <path d="M10 0a10 10 0 1 0 10 10A10.011 10.011 0 0 0 10 0Zm3.982 13.982a1 1 0 0 1-1.414 0l-3.274-3.274A1.012 1.012 0 0 1 9 10V6a1 1 0 0 1 2 0v3.586l2.982 2.982a1 1 0 0 1 0 1.414Z" />
                                                </svg>
                                                E-Book coming in 3 days
                                            </span>
                                            <h1 className="mt-6 text-4xl font-bold tracking-normal text-left text-white sm:text-5xl"><span className="italic bg-gradient-to-r bg-clip-text text-transparent from-indigo-500 via-green-500 to-indigo-50 animate-text">ZINC:</span> The eBook Landing Page</h1>
                                            <p className="mt-3 text-lg font-normal text-slate-400 text-left">Unlock access to a quick, easy, and production ready approach to launchinga beautiful and usable eBook Landing Page (without relying on complicated UX methods). Join the waitlist to get notified when the eBook goes live.</p>
                                            <div className="w-full mt-5">
                                                <div className="w-full">
                                                    <div className="relative">
                                                        <div className="max-w-l mb-3">
                                                            <form onSubmit={handleSubmit} className="lg:flex lg:flex-row md:flex md:flex-row sm:flex sm:flex-row">
                                                                <div className="flex gap-2 mr-3 mb-3">
                                                                    <input name="email" type="email" placeholder={formStyles.placeholderText} value={email} onChange={(e) => setEmail(e.target.value)} required={true} aria-label="Email address" className="rounded w-full h-12 border border-zinc-900/10 bg-black px-3 py-[calc(theme(spacing.2)-1px)] shadow-md shadow-zinc-800/5 placeholder:text-zinc-400 focus:border-teal-500 focus:outline-none focus:ring-4 focus:ring-teal-500/10 dark:border-zinc-700 dark:bg-zinc-700/[0.15] dark:text-zinc-200 dark:placeholder:text-zinc-500 dark:focus:border-teal-400 dark:focus:ring-teal-400/10 sm:text-sm" />
                                                                </div>
                                                                <div className="transition-all duration-700 hover:opacity-90"><SignUpFormButton /></div>
                                                            </form>
                                                        </div>
                                                        <div className="flex justify-left gap-3 mb-3">
                                                            <div className="flex -space-x-3">
                                                                <img className="z-0 transition-all duration-500 hover:-translate-y-1 w-6 h-6 border-1 border-black rounded-full" src="/profile-picture-5.jpg" alt="" />
                                                                <img className="z-10 transition-all duration-500 hover:-translate-y-1 w-6 h-6 border-1 border-black rounded-full" src="/profile-picture-2.jpg" alt="" />
                                                                <img className="z-20 transition-all duration-500 hover:-translate-y-1 w-6 h-6 border-1 border-black rounded-full" src="/profile-picture-3.jpg" alt="" />
                                                                <img className="z-30 transition-all duration-500 hover:-translate-y-1 w-6 h-6 border-1 border-black rounded-full" src="/profile-picture-3.jpg" alt="" />
                                                            </div>
                                                            <p className="flex items-center justify-center text-sm text-slate-400">62+ people already joined</p>
                                                        </div>
                                                        <div>
                                                            <Link href="https://x.com/">
                                                                <span className="bg-black text-xs font-medium inline-flex items-center px-2.5 py-0.5 rounded-full mr-2 border-gray-500 bg-opacity-30 gap-1 text-slate-500 hover:text-slate-300 transition-all duration-500">
                                                                    <svg width="10" height="10" viewBox="0 0 1200 1227" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                                        <path d="M714.163 519.284L1160.89 0H1055.03L667.137 450.887L357.328 0H0L468.492 681.821L0 1226.37H105.866L515.491 750.218L842.672 1226.37H1200L714.137 519.284H714.163ZM569.165 687.828L521.697 619.934L144.011 79.6944H306.615L611.412 515.685L658.88 583.579L1055.08 1150.3H892.476L569.165 687.854V687.828Z" fill="grey" />
                                                                    </svg>
                                                                    <p>Malthe Hartmann</p>
                                                                </span>
                                                            </Link>
                                                        </div>
                                                    </div>
                                                </div>
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
                                    strokeLinecap="round"
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
                        color: "#fbd9d3",
                        fontSize: "14px",
                        textAlign: "left",
                    }}
                >
                    {errorMessage || "Whoops. This wasn't supposed to happen. Please refresh the page and try again."}
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
                    maxWidth: "500px",
                    whiteSpace: isInline ? "nowrap" : "normal",
                    height: "48px",
                    alignItems: "center",
                    justifyContent: "center",
                    flexDirection: "row",
                    padding: "8px 24px",
                    boxShadow: "0px 1px 2px rgba(0, 0, 0, 0.05)",
                    borderRadius: "4px",
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