import { useState } from "react";
import { Inter } from 'next/font/google'

const INIT = "INIT";
const SUBMITTING = "SUBMITTING";
const ERROR = "ERROR";
const SUCCESS = "SUCCESS";
const formStates = [INIT, SUBMITTING, ERROR, SUCCESS] as const;
const formStyles = {

  // Change ID to your own Loops ID

  "id": "",

  "name": "Default",
  "formStyle": "inline",
  "placeholderText": "your@email.com",
  "formFont": "Inter",
  "formFontColor": "#000000",
  "formFontSizePx": 14,

  // Customize the CTA

  "buttonText": "Send e-mail to Loops",
  "buttonFont": "Inter",
  "buttonFontColor": "#ffffff",
  "buttonColor": "#fc5200",
  "buttonFontSizePx": 14,

  // Customize the success message

  "successMessage": "E-mail was succesfully sent to Loops! Find it the Audience tab.",
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
      setErrorMessage("Too many signups, please try again in a little while");
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
          setErrorMessage("Too many signups, please try again in a little while");
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
        <div className="flex flex-1 flex-col">
          <div className="overflow-hidden">
            <div className="px-4 md:px-8">
              <div className="mx-auto w-full max-w-6xl">
                <div className="grid w-full gap-4 pb-16 pt-60">
                  <h1 className="grid text-5xl font-bold tracking-tight md:text-[4.75rem] lg:text-[4.75rem] text-center">
                    <span><a className="text-[#000000]">NextJS</a> with <a className="text-[#fc5200]">Loops</a></span>
                  </h1>
                  <h2 className="grid font-medium tracking-tight text-center">
                    <span>Lead generation & e-mail automation-ready boilerplate built with NextJS, Tailwind & Loops.</span>
                  </h2>
                  <div className="inline-flex w-full">
                    <div className="flex w-full flex-col gap-6">
                      <div>

                        <div
                          style={{
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            width: "100%",
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
                      <p className="font-normal text-sm text-inherit -mt-1 text-neutral-400 text-center">Built by <a href="https://twitter.com/malthart" className="font-medium underline underline-offset-4">malthart</a>. The source code is available on <a href="https://github.com/malthart/nextjswithloops" className="font-medium underline underline-offset-4">Github</a>.</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      );

    // This is the ERROR state of the site.

    case ERROR:
      return (
        <>
          <div className="flex flex-1 flex-col">
            <div className="overflow-hidden">
              <div className="px-4 md:px-8">
                <div className="mx-auto w-full max-w-6xl">
                  <div className="grid w-full gap-4 pb-16 pt-60">
                    <h1 className="grid text-5xl font-bold tracking-tight md:text-[4.75rem] lg:text-[4.75rem] text-center">
                      <span><a className="text-[#000000]">NextJS</a> with <a className="text-[#fc5200]">Loops</a></span>
                    </h1>
                    <h2 className="grid font-medium tracking-tight text-center">
                      <span>Lead generation & e-mail automation-ready boilerplate built with NextJS, Tailwind & Loops.</span>
                    </h2>
                    <div className="inline-flex w-full">
                      <div className="flex w-full flex-col gap-6">
                        <div className="text-center">
                          <SignUpFormError />
                          <BackButton />
                        </div>
                        <p className="font-normal text-sm text-inherit -mt-1 text-neutral-400 text-center">Built by <a href="https://twitter.com/malthart" className="font-medium underline underline-offset-4">malthart</a>. The source code is available on <a href="https://github.com/malthart/nextjswithloops" className="font-medium underline underline-offset-4">Github</a>.</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </>
      );

    // This is the DEFAULT state of the site.

    default:
      return (
        <>
          <div className="flex flex-1 flex-col">
            <div className="overflow-hidden">
              <div className="px-4 md:px-8">
                <div className="mx-auto w-full max-w-6xl">
                  <div className="grid w-full gap-4 pb-16 pt-60">
                    <h1 className="grid text-5xl font-bold tracking-tight md:text-[4.75rem] lg:text-[4.75rem] text-center">
                      <span><a className="text-[#000000]">NextJS</a> with <a className="text-[#fc5200]">Loops</a></span>
                    </h1>
                    <h2 className="grid font-medium tracking-tight text-center">
                      <span>Lead generation & e-mail automation-ready boilerplate built with NextJS, Tailwind & Loops.</span>
                    </h2>
                    <div className="inline-flex w-full">
                      <div className="flex w-full flex-col gap-6">
                        <div>
                          <form
                            onSubmit={handleSubmit}
                            style={{
                              display: "flex",
                              flexDirection: isInline ? "row" : "column",
                              alignItems: "center",
                              justifyContent: "center",
                              width: "100%",
                            }}
                          >
                            <input
                              type="text"
                              name="email"
                              placeholder={formStyles.placeholderText}
                              value={email}
                              onChange={(e) => setEmail(e.target.value)}
                              required={true}
                              style={{
                                color: formStyles.formFontColor,
                                fontFamily: `'${formStyles.formFont}', sans-serif`,
                                fontSize: `${formStyles.formFontSizePx}px`,
                                margin: isInline ? "0px 10px 0px 0px" : "0px 0px 10px",
                                width: "100%",
                                maxWidth: "300px",
                                minWidth: "100px",
                                background: "#FFFFFF",
                                border: "1px solid #D1D5DB",
                                boxSizing: "border-box",
                                boxShadow: "rgba(0, 0, 0, 0.05) 0px 1px 2px",
                                borderRadius: "6px",
                                padding: "8px 12px",
                              }}
                            />
                            <SignUpFormButton />
                          </form>
                        </div>
                        <p className="font-normal text-sm text-inherit -mt-1 text-neutral-400 text-center">Built by <a href="https://twitter.com/malthart" className="font-medium underline underline-offset-4">malthart</a>. The source code is available on <a href="https://github.com/malthart/nextjswithloops" className="font-medium underline underline-offset-4">Github</a>.</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
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
          }}
        >
          {errorMessage || "Oops! Something is not right here, please try again"}
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
        &larr; Go back
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
          maxWidth: "300px",
          whiteSpace: isInline ? "nowrap" : "normal",
          height: "38px",
          alignItems: "center",
          justifyContent: "center",
          flexDirection: "row",
          padding: "9px 17px",
          boxShadow: "0px 1px 2px rgba(0, 0, 0, 0.05)",
          borderRadius: "6px",
          textAlign: "center",
          fontStyle: "normal",
          fontWeight: 500,
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