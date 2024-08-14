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
                                className={`px-2 py-4 focus:outline-none border ${error.firstName ? 'border-red' : 'border-green-light'} hover:border-green-medium hover:cursor-pointer focus:border-green-medium rounded-md`}
                            />
                            <p
                                ref={errRef}
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
                                className={`px-3 py-4 focus:outline-none border ${error.lastName ? 'border-red' : 'border-green-light'} hover:border-green-medium focus:border-green-medium hover:cursor-pointer  rounded-md`}
                            />
                            <p
                                ref={errRef}
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
                            className={`px-3 py-4 focus:outline-none border ${error.email ? 'border-red' : 'border-green-light'} hover:border-green-medium focus:border-green-medium hover:cursor-pointer rounded-md`}
                        />
                        <p
                            ref={errRef}
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
                        <div className="flex flex-col w-full md:flex-row space-y-4 md:space-y-0 md:space-x-3">
                            {/*GENERAL ENQUIRY*/}
                            <button
                                onClick={() => handleQueryType('enquiry')}
                                type="button"
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
                        </div>
                        {error.queryType && (
                            <p ref={errRef} className={`text-red text-xs`}>
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
                            className={`px-3 py-4 focus:outline-none border ${error.message ? 'border-red' : 'border-green-light'} hover:border-green-medium hover:cursor-pointer focus:border-green-medium rounded-md resize-none`}
                        />
                        <p
                            ref={errRef}
                            className={`text-red text-xs ${error.message ? 'block' : 'hidden'}`}
                        >
                            This field is required
                        </p>
                    </div>
                    {/*CONSENT SECTION*/}
                    <div>
                        <div className="flex items-center py-4 w-full space-x-4">
                            <button
                                type="button"
                                id="consent"
                                onClick={handleConsentCheck}
                            >
                                {!formData.consent ? (
                                    <div className="w-4 h-4 border border-green-default"></div>
                                ) : (
                                    <Checkbox className="w-4" />
                                )}
                            </button>

                            <label
                                htmlFor="consent"
                                className="text-base text-grey-dark"
                            >
                                I consent to being contacted by the team
                                <span className="ml-2 text-green-medium">
                                    *
                                </span>
                            </label>
                        </div>
                        {error.consent && (
                            <p ref={errRef} className="text-red text-xs">
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
