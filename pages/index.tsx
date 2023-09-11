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
                <div className="grid w-full gap-4 pb-16 pt-52">
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
                      <div className="flex w-full items-center space-x-4 pb-4 pt-4 justify-center">
                        <a target="_blank" rel="noreferrer" className="inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 border border-input bg-transparent shadow-sm hover:bg-accent hover:text-accent-foreground h-9 px-4 py-2" href="https://github.com/malthart/nextjswithloops">
                          <svg viewBox="0 0 438.549 438.549" className="mr-2 h-4 w-4">
                            <path fill="currentColor" d="M409.132 114.573c-19.608-33.596-46.205-60.194-79.798-79.8-33.598-19.607-70.277-29.408-110.063-29.408-39.781 0-76.472 9.804-110.063 29.408-33.596 19.605-60.192 46.204-79.8 79.8C9.803 148.168 0 184.854 0 224.63c0 47.78 13.94 90.745 41.827 128.906 27.884 38.164 63.906 64.572 108.063 79.227 5.14.954 8.945.283 11.419-1.996 2.475-2.282 3.711-5.14 3.711-8.562 0-.571-.049-5.708-.144-15.417a2549.81 2549.81 0 01-.144-25.406l-6.567 1.136c-4.187.767-9.469 1.092-15.846 1-6.374-.089-12.991-.757-19.842-1.999-6.854-1.231-13.229-4.086-19.13-8.559-5.898-4.473-10.085-10.328-12.56-17.556l-2.855-6.57c-1.903-4.374-4.899-9.233-8.992-14.559-4.093-5.331-8.232-8.945-12.419-10.848l-1.999-1.431c-1.332-.951-2.568-2.098-3.711-3.429-1.142-1.331-1.997-2.663-2.568-3.997-.572-1.335-.098-2.43 1.427-3.289 1.525-.859 4.281-1.276 8.28-1.276l5.708.853c3.807.763 8.516 3.042 14.133 6.851 5.614 3.806 10.229 8.754 13.846 14.842 4.38 7.806 9.657 13.754 15.846 17.847 6.184 4.093 12.419 6.136 18.699 6.136 6.28 0 11.704-.476 16.274-1.423 4.565-.952 8.848-2.383 12.847-4.285 1.713-12.758 6.377-22.559 13.988-29.41-10.848-1.14-20.601-2.857-29.264-5.14-8.658-2.286-17.605-5.996-26.835-11.14-9.235-5.137-16.896-11.516-22.985-19.126-6.09-7.614-11.088-17.61-14.987-29.979-3.901-12.374-5.852-26.648-5.852-42.826 0-23.035 7.52-42.637 22.557-58.817-7.044-17.318-6.379-36.732 1.997-58.24 5.52-1.715 13.706-.428 24.554 3.853 10.85 4.283 18.794 7.952 23.84 10.994 5.046 3.041 9.089 5.618 12.135 7.708 17.705-4.947 35.976-7.421 54.818-7.421s37.117 2.474 54.823 7.421l10.849-6.849c7.419-4.57 16.18-8.758 26.262-12.565 10.088-3.805 17.802-4.853 23.134-3.138 8.562 21.509 9.325 40.922 2.279 58.24 15.036 16.18 22.559 35.787 22.559 58.817 0 16.178-1.958 30.497-5.853 42.966-3.9 12.471-8.941 22.457-15.125 29.979-6.191 7.521-13.901 13.85-23.131 18.986-9.232 5.14-18.182 8.85-26.84 11.136-8.662 2.286-18.415 4.004-29.263 5.146 9.894 8.562 14.842 22.077 14.842 40.539v60.237c0 3.422 1.19 6.279 3.572 8.562 2.379 2.279 6.136 2.95 11.276 1.995 44.163-14.653 80.185-41.062 108.068-79.226 27.88-38.161 41.825-81.126 41.825-128.906-.01-39.771-9.818-76.454-29.414-110.049z"></path>
                          </svg>GitHub</a>
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
                  <div className="grid w-full gap-4 pb-16 pt-52">
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
                        <div className="flex w-full items-center space-x-4 pb-4 pt-4 justify-center">
                          <a target="_blank" rel="noreferrer" className="inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 border border-input bg-transparent shadow-sm hover:bg-accent hover:text-accent-foreground h-9 px-4 py-2" href="https://github.com/malthart/nextjswithloops">
                            <svg viewBox="0 0 438.549 438.549" className="mr-2 h-4 w-4">
                              <path fill="currentColor" d="M409.132 114.573c-19.608-33.596-46.205-60.194-79.798-79.8-33.598-19.607-70.277-29.408-110.063-29.408-39.781 0-76.472 9.804-110.063 29.408-33.596 19.605-60.192 46.204-79.8 79.8C9.803 148.168 0 184.854 0 224.63c0 47.78 13.94 90.745 41.827 128.906 27.884 38.164 63.906 64.572 108.063 79.227 5.14.954 8.945.283 11.419-1.996 2.475-2.282 3.711-5.14 3.711-8.562 0-.571-.049-5.708-.144-15.417a2549.81 2549.81 0 01-.144-25.406l-6.567 1.136c-4.187.767-9.469 1.092-15.846 1-6.374-.089-12.991-.757-19.842-1.999-6.854-1.231-13.229-4.086-19.13-8.559-5.898-4.473-10.085-10.328-12.56-17.556l-2.855-6.57c-1.903-4.374-4.899-9.233-8.992-14.559-4.093-5.331-8.232-8.945-12.419-10.848l-1.999-1.431c-1.332-.951-2.568-2.098-3.711-3.429-1.142-1.331-1.997-2.663-2.568-3.997-.572-1.335-.098-2.43 1.427-3.289 1.525-.859 4.281-1.276 8.28-1.276l5.708.853c3.807.763 8.516 3.042 14.133 6.851 5.614 3.806 10.229 8.754 13.846 14.842 4.38 7.806 9.657 13.754 15.846 17.847 6.184 4.093 12.419 6.136 18.699 6.136 6.28 0 11.704-.476 16.274-1.423 4.565-.952 8.848-2.383 12.847-4.285 1.713-12.758 6.377-22.559 13.988-29.41-10.848-1.14-20.601-2.857-29.264-5.14-8.658-2.286-17.605-5.996-26.835-11.14-9.235-5.137-16.896-11.516-22.985-19.126-6.09-7.614-11.088-17.61-14.987-29.979-3.901-12.374-5.852-26.648-5.852-42.826 0-23.035 7.52-42.637 22.557-58.817-7.044-17.318-6.379-36.732 1.997-58.24 5.52-1.715 13.706-.428 24.554 3.853 10.85 4.283 18.794 7.952 23.84 10.994 5.046 3.041 9.089 5.618 12.135 7.708 17.705-4.947 35.976-7.421 54.818-7.421s37.117 2.474 54.823 7.421l10.849-6.849c7.419-4.57 16.18-8.758 26.262-12.565 10.088-3.805 17.802-4.853 23.134-3.138 8.562 21.509 9.325 40.922 2.279 58.24 15.036 16.18 22.559 35.787 22.559 58.817 0 16.178-1.958 30.497-5.853 42.966-3.9 12.471-8.941 22.457-15.125 29.979-6.191 7.521-13.901 13.85-23.131 18.986-9.232 5.14-18.182 8.85-26.84 11.136-8.662 2.286-18.415 4.004-29.263 5.146 9.894 8.562 14.842 22.077 14.842 40.539v60.237c0 3.422 1.19 6.279 3.572 8.562 2.379 2.279 6.136 2.95 11.276 1.995 44.163-14.653 80.185-41.062 108.068-79.226 27.88-38.161 41.825-81.126 41.825-128.906-.01-39.771-9.818-76.454-29.414-110.049z"></path>
                            </svg>GitHub</a>
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
                  <div className="grid w-full gap-4 pb-16 pt-52">
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
                        <div className="flex w-full items-center space-x-4 pb-4 pt-4 justify-center">
                          <a target="_blank" rel="noreferrer" className="inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 border border-input bg-transparent shadow-sm hover:bg-accent hover:text-accent-foreground h-9 px-4 py-2" href="https://github.com/malthart/nextjswithloops">
                            <svg viewBox="0 0 438.549 438.549" className="mr-2 h-4 w-4">
                              <path fill="currentColor" d="M409.132 114.573c-19.608-33.596-46.205-60.194-79.798-79.8-33.598-19.607-70.277-29.408-110.063-29.408-39.781 0-76.472 9.804-110.063 29.408-33.596 19.605-60.192 46.204-79.8 79.8C9.803 148.168 0 184.854 0 224.63c0 47.78 13.94 90.745 41.827 128.906 27.884 38.164 63.906 64.572 108.063 79.227 5.14.954 8.945.283 11.419-1.996 2.475-2.282 3.711-5.14 3.711-8.562 0-.571-.049-5.708-.144-15.417a2549.81 2549.81 0 01-.144-25.406l-6.567 1.136c-4.187.767-9.469 1.092-15.846 1-6.374-.089-12.991-.757-19.842-1.999-6.854-1.231-13.229-4.086-19.13-8.559-5.898-4.473-10.085-10.328-12.56-17.556l-2.855-6.57c-1.903-4.374-4.899-9.233-8.992-14.559-4.093-5.331-8.232-8.945-12.419-10.848l-1.999-1.431c-1.332-.951-2.568-2.098-3.711-3.429-1.142-1.331-1.997-2.663-2.568-3.997-.572-1.335-.098-2.43 1.427-3.289 1.525-.859 4.281-1.276 8.28-1.276l5.708.853c3.807.763 8.516 3.042 14.133 6.851 5.614 3.806 10.229 8.754 13.846 14.842 4.38 7.806 9.657 13.754 15.846 17.847 6.184 4.093 12.419 6.136 18.699 6.136 6.28 0 11.704-.476 16.274-1.423 4.565-.952 8.848-2.383 12.847-4.285 1.713-12.758 6.377-22.559 13.988-29.41-10.848-1.14-20.601-2.857-29.264-5.14-8.658-2.286-17.605-5.996-26.835-11.14-9.235-5.137-16.896-11.516-22.985-19.126-6.09-7.614-11.088-17.61-14.987-29.979-3.901-12.374-5.852-26.648-5.852-42.826 0-23.035 7.52-42.637 22.557-58.817-7.044-17.318-6.379-36.732 1.997-58.24 5.52-1.715 13.706-.428 24.554 3.853 10.85 4.283 18.794 7.952 23.84 10.994 5.046 3.041 9.089 5.618 12.135 7.708 17.705-4.947 35.976-7.421 54.818-7.421s37.117 2.474 54.823 7.421l10.849-6.849c7.419-4.57 16.18-8.758 26.262-12.565 10.088-3.805 17.802-4.853 23.134-3.138 8.562 21.509 9.325 40.922 2.279 58.24 15.036 16.18 22.559 35.787 22.559 58.817 0 16.178-1.958 30.497-5.853 42.966-3.9 12.471-8.941 22.457-15.125 29.979-6.191 7.521-13.901 13.85-23.131 18.986-9.232 5.14-18.182 8.85-26.84 11.136-8.662 2.286-18.415 4.004-29.263 5.146 9.894 8.562 14.842 22.077 14.842 40.539v60.237c0 3.422 1.19 6.279 3.572 8.562 2.379 2.279 6.136 2.95 11.276 1.995 44.163-14.653 80.185-41.062 108.068-79.226 27.88-38.161 41.825-81.126 41.825-128.906-.01-39.771-9.818-76.454-29.414-110.049z"></path>
                            </svg>GitHub</a>
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