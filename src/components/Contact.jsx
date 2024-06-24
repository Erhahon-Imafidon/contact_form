import React, {useState, useEffect, useRef} from 'react'

const EMAIL_REGEX = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+.[a-zA-Z]{2,}$/


const Contact = () => {
    const firstRef = useRef()

    const [firstName, setFirstName] = useState('')
    const [lastName, setLastName] = useState('')
    const [email, setEmail] = useState('')
    const [validEmail, setValidEmail] = useState(false)
    const [message, setMessage] = useState('')

    const [error, setError] = useState(false)

    // UseEffect to focus on the FirstName input field on page load
    useEffect(() => {
        firstRef.current.focus()
    }, [])

    const handleSubmit = (e) => {
        e.preventDefault();
    }
  return (
      <>
        <section className="container px-4 md:px-8 w-1/2 max-w-[375px] xl:max-w-[1440px] flex flex-col p-8 bg-white rounded-xl">
            <h1 className="font-karla text-2xl text-grey-dark font-bold">Contact Us</h1>
            <form onSubmit={handleSubmit} className="flex flex-col w-full space-y-6 mt-4">
                {/*Name Section*/}
                <div className="flex flex-col md:flex-row space-y-4 md:space-x-2">
                    <div className='flex flex-col w-full md:w-1/2 space-y-2'>
                        <label htmlFor="firstname" className="">First Name</label>
                        <input
                            ref={firstRef}
                            type="text"
                            id="firstname"
                            value={firstName}
                            onChange={(e) => setFirstName(e.target.value)}
                            required
                            className='p-2 focus:outline-none'
                        />
                    </div>
                </div>
            </form>
        </section>
      </>
  )
}

export default Contact