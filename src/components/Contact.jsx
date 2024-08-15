import { useState, useEffect, useRef } from 'react';
import SuccessMsg from './SuccessMessage.jsx';

import RadioButton from '../assets/images/icon-radio-selected.svg';
import Checkbox from '../assets/images/icon-checkbox-check.svg';

const EMAIL_REGEX = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

const Contact = () => {
    const errRef = useRef();

    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        message: '',
        queryType: '', // Possible values: 'enquiry', 'request'
        consent: false,
    });

    const [success, setSuccess] = useState(false);

    // Error state for tracking individual field errors
    const [error, setError] = useState({
        firstName: false,
        lastName: false,
        email: false,
        queryType: false,
        message: false,
        consent: false,
    });

    // Effect to verify the email
    useEffect(() => {
        const isValidEmail = EMAIL_REGEX.test(formData.email);

        setError((prevError) => ({
            ...prevError,
            email: formData.email !== '' && !isValidEmail,
        }));
    }, [formData.email]);

    // Handle changes in the Input fields
    const handleInputChange = (e) => {
        const { id, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [id]: value,
        }));

        // Reset the error state for the specific field
        setError((prevError) => ({
            ...prevError,
            [id]: false,
        }));
    };

    // Handle query type selection
    const handleQueryType = (type) => {
        setFormData((prevData) => ({
            ...prevData,
            queryType: type,
        }));

        // Reset query type error
        setError((prevData) => ({
            ...prevData,
            queryType: false,
        }));
    };

    // Handle Consent Checkbox
    const handleConsentCheck = () => {
        setFormData((prevData) => ({
            ...prevData,
            consent: !prevData.consent,
        }));

        // Reset consent error
        setError((prevData) => ({
            ...prevData,
            consent: false,
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        // Validation
        const newErrorState = {
            firstName: formData.firstName.trim() === '',
            lastName: formData.lastName.trim() === '',
            email: !formData.email.trim() || !EMAIL_REGEX.test(formData.email),
            queryType: formData.queryType.trim() === '',
            message: formData.message.trim() === '',
            consent: !formData.consent,
        };

        // update the error state
        setError(newErrorState);

        // If Form is valid
        const formIsValid = !Object.values(newErrorState).includes(true);

        if (formIsValid) {
            setSuccess(true);
            setFormData({
                firstName: '',
                lastName: '',
                email: '',
                message: '',
                queryType: '',
                consent: false,
            });
        } else {
            setSuccess(false);
            errRef.current?.focus();
        }
    };

    return (
        <>
            {success ? (
                <SuccessMsg
                    title="message sent!"
                    subTitle="Thanks for completing the form we'll be in touch soon"
                />
            ) : null}
            <section className="container px-4 md:px-8 w-full h-screen lg:w-1/2 max-w-[375px] xl:max-w-[1440px] flex flex-col p-8 bg-white rounded-xl">
                <h1 className="font-karla text-2xl text-grey-dark font-bold">
                    Contact Us
                </h1>
                <form
                    onSubmit={handleSubmit}
                    className="flex flex-col w-full space-y-6 mt-4 font-karla"
                >
                    {/*Name Section*/}
                    <div className="flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-3">
                        {/*FIRST NAME*/}
                        <div className="flex flex-col w-full md:w-1/2 space-y-2">
                            <label
                                htmlFor="firstname"
                                className="text-base text-grey-dark"
                            >
                                First Name
                                <span className="ml-2 text-green-medium">
                                    *
                                </span>
                            </label>
                            <input
                                type="text"
                                id="firstName"
                                value={formData.firstName}
                                onChange={handleInputChange}
                                aria-describedby={'firstNameError'} // Associate with error message
                                aria-invalid={error.firstName} // Indicate Invalid state
                                className={`px-2 py-4 focus:outline-none border ${error.firstName ? 'border-red' : 'border-green-light'} hover:border-green-medium hover:cursor-pointer focus:border-green-medium rounded-md`}
                            />
                            <p
                                id={'firstNameError'} // Adds ID for association
                                role="alert" // Indicate it's an error message
                                aria-live={'assertive'} // Announces the changes Immediately by screen readers
                                className={`text-red text-xs ${error.firstName ? 'block' : 'hidden'}`}
                            >
                                This field is required
                            </p>
                        </div>
                        {/*LAST NAME */}
                        <div className="flex flex-col w-full md:w-1/2 space-y-2">
                            <label
                                htmlFor="lastName"
                                className="text-base text-grey-dark"
                            >
                                Last Name
                                <span className="ml-2 text-green-medium">
                                    *
                                </span>
                            </label>
                            <input
                                type="text"
                                id="lastName"
                                value={formData.lastName}
                                onChange={handleInputChange}
                                aria-describedby={'lastNameError'}
                                aria-invalid={error.lastName}
                                className={`px-3 py-4 focus:outline-none border ${error.lastName ? 'border-red' : 'border-green-light'} hover:border-green-medium focus:border-green-medium hover:cursor-pointer  rounded-md`}
                            />
                            <p
                                id={'lastNameError'}
                                role="alert"
                                aria-live={'assertive'}
                                className={`text-red text-xs ${error.lastName ? 'block' : 'hidden'}`}
                            >
                                This field is required
                            </p>
                        </div>
                    </div>
                    {/*EMAIL SECTION*/}
                    <div className="flex flex-col w-full space-y-2">
                        <label
                            htmlFor="email"
                            className="text-base text-grey-dark"
                        >
                            Email Address
                            <span className="ml-2 text-green-medium">*</span>
                        </label>
                        <input
                            type="text"
                            id="email"
                            value={formData.email}
                            onChange={handleInputChange}
                            aria-describedby={'emailError'}
                            aria-invalid={error.email}
                            className={`px-3 py-4 focus:outline-none border ${error.email ? 'border-red' : 'border-green-light'} hover:border-green-medium focus:border-green-medium hover:cursor-pointer rounded-md`}
                        />
                        <p
                            id={'emailError'}
                            role="alert"
                            aria-live={'assertive'}
                            className={`text-red text-xs ${error.email ? 'block' : 'hidden'}`}
                        >
                            Please enter a valid email address
                        </p>
                    </div>

                    {/*RADIO BUTTON SECTION*/}
                    <div className="flex flex-col w-full space-y-2">
                        <label
                            htmlFor="query"
                            className="text-base text-grey-dark"
                        >
                            Query Type
                            <span className="ml-2 text-green-medium">*</span>
                        </label>
                        <fieldset
                            role={'radiogroup'}
                            aria-labelledby={'queryLabel'}
                            aria-invalid={error.queryType}
                            className="flex flex-col w-full md:flex-row space-y-4 md:space-y-0 md:space-x-3"
                        >
                            <legend id={'queryLabel'} className={'sr-only'}>
                                {/* Hidden label for screen readers */}
                                Query Type
                            </legend>
                            {/*GENERAL ENQUIRY*/}
                            <button
                                onClick={() => handleQueryType('enquiry')}
                                type="button"
                                role={'radio'}
                                aria-checked={formData.queryType === 'enquiry'}
                                aria-describedby={'queryTypeError'}
                                className={`w-full md:w-1/2 space-x-2 pl-6 py-4 flex flex-row items-center border border-green-light hover:border-green-medium focus:border-green-medium hover:cursor-pointer rounded-md ${
                                    formData.queryType === 'enquiry'
                                        ? 'bg-green-light text-white'
                                        : ''
                                }`}
                            >
                                {formData.queryType !== 'enquiry' ? (
                                    <div className="w-4 h-4 rounded-full border border-green-default"></div>
                                ) : (
                                    <RadioButton />
                                )}
                                <p className="text-grey-dark">
                                    General Enquiry
                                </p>
                            </button>
                            {/*SUPPORT REQUEST */}
                            <button
                                onClick={() => handleQueryType('request')}
                                type="button"
                                role={'radio'}
                                aria-checked={formData.queryType === 'request'}
                                aria-describedby={'queryTypeError'}
                                className={`w-full md:w-1/2 space-x-2 pl-6 py-4 flex flex-row items-center border border-green-light hover:border-green-medium focus:border-green-medium hover:cursor-pointer rounded-md ${
                                    formData.queryType === 'request'
                                        ? 'bg-green-light text-white'
                                        : ''
                                }`}
                            >
                                {formData.queryType !== 'request' ? (
                                    <div className="w-4 h-4 rounded-full border border-green-default"></div>
                                ) : (
                                    <RadioButton />
                                )}
                                <p className="text-grey-dark">
                                    Support Request
                                </p>
                            </button>
                        </fieldset>
                        {error.queryType && (
                            <p
                                ref={errRef}
                                role={'alert'}
                                aria-live={'assertive'}
                                id={'queryTypeError'}
                                className={`text-red text-xs`}
                            >
                                Please select a query type
                            </p>
                        )}
                    </div>
                    {/*MESSAGE SECTION*/}
                    <div className="flex flex-col w-full space-y-2">
                        <label
                            htmlFor="message"
                            className="text-base text-grey-dark"
                        >
                            message
                            <span className="ml-2 text-green-medium">*</span>
                        </label>
                        <textarea
                            id="message"
                            value={formData.message}
                            onChange={handleInputChange}
                            rows="4"
                            aria-describedby={'messageError'}
                            aria-invalid={error.message}
                            className={`px-3 py-4 focus:outline-none border ${error.message ? 'border-red' : 'border-green-light'} hover:border-green-medium hover:cursor-pointer focus:border-green-medium rounded-md resize-none`}
                        />
                        <p
                            id={'messageError'}
                            role={'alert'}
                            aria-live={'assertive'}
                            className={`text-red text-xs ${error.message ? 'block' : 'hidden'}`}
                        >
                            This field is required
                        </p>
                    </div>
                    {/*CONSENT SECTION*/}
                    <div>
                        <div className="flex items-center py-4 w-full space-x-4">
                            <div
                                role={'checkbox'}
                                aria-checked={formData.consent}
                                aria-labelledby={'consentLabel'}
                                aria-describedby={'consentError'}
                                tabIndex="0" // To make it focusable
                                onKeyDown={(e) => {
                                    if (e.key === ' ' || e.key === 'Enter') {
                                        e.preventDefault();
                                        handleConsentCheck();
                                    }
                                }}
                                onClick={handleConsentCheck}
                            >
                                {!formData.consent ? (
                                    <div className="w-4 h-4 border border-green-default"></div>
                                ) : (
                                    <Checkbox className="w-4" />
                                )}
                            </div>

                            <label className="text-base text-grey-dark">
                                I consent to being contacted by the team
                                <span className="ml-2 text-green-medium">
                                    *
                                </span>
                            </label>
                        </div>
                        {error.consent && (
                            <p
                                ref={errRef}
                                role={'alert'}
                                aria-live={'assertive'}
                                id={'consentError'}
                                className="text-red text-xs"
                            >
                                To submit this form, please consent to being
                                contacted
                            </p>
                        )}
                    </div>
                    {/*SUBMIT BUTTON SECTION*/}
                    <button
                        type="submit"
                        className="w-full p-4 bg-green-medium hover:bg-green-dark transition duration-300 text-white rounded-md font-bold text-base"
                    >
                        Submit
                    </button>
                </form>
            </section>
        </>
    );
};

export default Contact;
