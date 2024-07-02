import { useState, useEffect, useRef } from 'react';
import { MdOutlineCheckBoxOutlineBlank } from 'react-icons/md';
import { RiCheckboxFill } from 'react-icons/ri';
import SuccessMsg from './SuccessMessage.jsx';

import RadioButton from '../assets/images/icon-radio-selected.svg';

const EMAIL_REGEX = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

const Contact = () => {
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [validEmail, setValidEmail] = useState(false);
    const [enquiry, setEnquiry] = useState(false);
    const [request, setRequest] = useState(false);
    const [isChecked, setIsChecked] = useState(false);
    const [message, setMessage] = useState('');

    const [error, setError] = useState(false);
    const [success, setSuccess] = useState(false);

    // Effect to verify the email
    useEffect(() => {
        const result = EMAIL_REGEX.test(email);
        console.log(result);
        setValidEmail(result);
    }, [email]);

    // Enquiry Function
    const handleEnquiryClick = () => {
        setEnquiry(true);
        setRequest(false);
    };

    // Request Function
    const handleRequestClick = () => {
        setEnquiry(false);
        setRequest(true);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
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
                                id="firstname"
                                value={firstName}
                                onChange={(e) => setFirstName(e.target.value)}
                                required
                                className="px-2 py-4 focus:outline-none border border-green-light hover:border-green-medium hover:cursor-pointer focus:border-green-medium rounded-md"
                            />
                            <p className="text-red text-xs hidden ">
                                This field is required
                            </p>
                        </div>
                        {/*LAST NAME */}
                        <div className="flex flex-col w-full md:w-1/2 space-y-2">
                            <label
                                htmlFor="firstname"
                                className="text-base text-grey-dark"
                            >
                                Last Name
                                <span className="ml-2 text-green-medium">
                                    *
                                </span>
                            </label>
                            <input
                                type="text"
                                id="firstname"
                                value={lastName}
                                onChange={(e) => setLastName(e.target.value)}
                                required
                                className="px-3 py-4 focus:outline-none border border-green-light hover:border-green-medium focus:border-green-medium hover:cursor-pointer  rounded-md"
                            />
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
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                            className="px-3 py-4 focus:outline-none border border-green-light hover:border-green-medium focus:border-green-medium hover:cursor-pointer rounded-md"
                        />
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
                                onClick={handleEnquiryClick}
                                type="button"
                                className={
                                    enquiry
                                        ? 'bg-green-light text-white w-full md:w-1/2 space-x-2 pl-6 py-4 flex flex-row items-center border border-green-light hover:border-green-medium focus:border-green-medium hover:cursor-pointer rounded-md'
                                        : 'w-full md:w-1/2 space-x-2 pl-6 py-4 flex flex-row items-center border border-green-light hover:border-green-medium focus:border-green-medium hover:cursor-pointer rounded-md'
                                }
                            >
                                {!enquiry ? (
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
                                onClick={handleRequestClick}
                                type="button"
                                className={
                                    request
                                        ? 'bg-green-light text-white w-full md:w-1/2 space-x-2 pl-6 py-4 flex flex-row items-center border border-green-light hover:border-green-medium focus:border-green-medium hover:cursor-pointer rounded-md'
                                        : 'w-full md:w-1/2 space-x-2 pl-6 py-4 flex flex-row items-center border border-green-light hover:border-green-medium focus:border-green-medium hover:cursor-pointer rounded-md'
                                }
                            >
                                {!request ? (
                                    <div className="w-4 h-4 rounded-full border border-green-default"></div>
                                ) : (
                                    <RadioButton />
                                )}
                                <p className="text-grey-dark">
                                    Support Request
                                </p>
                            </button>
                        </div>
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
                            value={message}
                            onChange={(e) => setMessage(e.target.value)}
                            required
                            rows="4"
                            className="px-3 py-4 focus:outline-none border border-green-light hover:border-green-medium hover:cursor-pointer focus:border-green-medium rounded-md resize-none"
                        />
                    </div>
                    {/*CONSENT SECTION*/}
                    <div className="flex items-center py-4 w-full space-x-4">
                        <button
                            id="consent"
                            onClick={() => setIsChecked(!isChecked)}
                        >
                            {!isChecked ? (
                                <MdOutlineCheckBoxOutlineBlank className="text-green-default text-xl" />
                            ) : (
                                <RiCheckboxFill className="text-green-medium text-xl" />
                            )}
                        </button>

                        <label
                            htmlFor="consent"
                            className="text-base text-grey-dark"
                        >
                            I consent to being contacted by the team
                            <span className="ml-2 text-green-medium">*</span>
                        </label>
                    </div>
                    {/*SUBMIT BUTTON SECTION*/}
                    <button className="w-full p-4 bg-green-medium hover:bg-green-dark transition duration-300 text-white rounded-md font-bold text-base">
                        Submit
                    </button>
                </form>
            </section>
        </>
    );
};

export default Contact;
