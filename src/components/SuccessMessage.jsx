import { useRef, useEffect } from 'react';
import SuccessCheck from '../assets/images/icon-success-check.svg';

// eslint-disable-next-line react/prop-types
const SuccessMsg = ({ title, subTitle }) => {
    const successRef = useRef(null);

    useEffect(() => {
        successRef.current?.focus();
    }, []);

    return (
        <section
            ref={successRef}
            role="alert"
            aria-live={'assertive'} // Announces changes immediately
            tabIndex={-1} // Make it focusable even though it's not an interactive element
            className="bg-grey-dark w-full lg:w-[27rem] mx-auto rounded-xl flex flex-col justify-center px-4 py-6 font-karla"
        >
            <div className="flex items-center space-x-2">
                <SuccessCheck />
                <p className="text-white font-bold capitalize">{title}</p>
            </div>
            <p className="mt-4 text-sm text-white-dull">{subTitle}</p>
        </section>
    );
};

export default SuccessMsg;
