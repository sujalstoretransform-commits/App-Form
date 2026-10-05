import { useState } from "react"
import { useAppBridge } from "@shopify/app-bridge-react"
import axios from "axios"

export default function ApplicationForm() {
    const shopify = useAppBridge();
    const [formData, setFormData] = useState({ firstName: '', lastName: '', email: '', phone: '', dateOfBirth: '' })
    const [message, setMessage] = useState('')
    const [submitted, setSubmitted] = useState(false)
    const [loading, setLoading] = useState(false)


    const handleChange = (e) => {
        const { name, value } = e.target;

        if (name === 'phone') {
            const onlyNumbers = value.replace(/[^0-9]/g, '');

            setFormData({
                ...formData,
                [name]: onlyNumbers
            });
        }
        else {
            setFormData({
                ...formData,
                [name]: value
            });
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault()
        setMessage('')
        setLoading(true)

        try {
            const token = await shopify.idToken();
            const response = await fetch('/api/form/create', {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ formData })
            })
            const resData = await response.json();

            if (response.status === 201) {
                console.log(resData.message);
                setMessage(resData.message);
                setSubmitted(true);
            }
            else {
                setMessage(resData.error);
            }
        } catch (error) {
            console.log("Submission Error: ", error)
            setMessage(error.response?.data?.error)
        } finally {
            setLoading(false)
            setFormData({ firstName: '', lastName: '', email: '', phone: '', dateOfBirth: '' })
        }
    }

    return (
        <div className="items-center rounded-2xl h-auto w-auto gap-4 font-serif text-xl bg-white border-b border-gray-200 px-3 shadow-sm">
            <div className='text-center text-2xl pt-4'><h1>Application Form</h1></div>
            {!submitted &&
                <form onSubmit={handleSubmit}>
                    <div className='font-sans text-sm'>
                        <div className='flex pt-5 justify-start gap-4 py-2 w-full'>
                            <div className='flex flex-col gap-2 w-1/2 max-w-xs'>
                                <label htmlFor="first-name">First Name</label>
                                <input
                                    type="text"
                                    id="first-name"
                                    name="firstName"
                                    className='border border-gray-300 rounded px-2 py-1 w-full' placeholder="Enter your first name"
                                    onChange={handleChange}
                                    value={formData.firstName}
                                    required
                                />
                            </div>
                            <div className='flex flex-col gap-2 w-1/2 max-w-xs'>
                                <label htmlFor="last-name">Last Name</label>
                                <input
                                    type="text"
                                    id="last-name"
                                    name="lastName"
                                    className='border border-gray-300 rounded px-2 py-1 w-full'
                                    placeholder="Enter your last name"
                                    onChange={handleChange}
                                    value={formData.lastName}
                                    required
                                />
                            </div>
                        </div>
                        <div className='flex flex-col gap-2 py-2'>
                            <label htmlFor="email">Email*</label>
                            <input
                                type="email"
                                id="email"
                                name="email"
                                className='border border-gray-300 rounded px-2 py-1 w-full'
                                placeholder="Enter your email"
                                onChange={handleChange}
                                value={formData.email}
                                required
                            />
                        </div>
                        <div className='flex flex-col gap-2 py-2'>
                            <label htmlFor="phone">Phone Number*</label>
                            <input
                                type="tel"
                                id="phone"
                                name="phone"
                                className='border border-gray-300 rounded px-2 py-1 w-full'
                                placeholder="Enter your phone number"
                                onChange={handleChange}
                                value={formData.phone}
                                minlength={10}
                                maxlength={10}
                                required
                            />
                        </div>
                        <div className='flex flex-col gap-2 py-2'>
                            <label htmlFor="dateOfBirth">Date of Birth</label>
                            <input
                                type='date'
                                id='dateOfBirth'
                                name='dateOfBirth'
                                className='border border-gray-300 rounded px-2 py-1 w-full text-gray-400'
                                placeholder='Enter your date of birth'
                                onChange={handleChange}
                                value={formData.dateOfBirth}
                                required
                            />
                        </div>
                        <div className='flex flex-col gap-2 py-2'>
                            <button
                                type="submit"
                                className='bg-blue-500 text-white font-medium rounded h-auto w-auto p-2 hover:bg-blue-600'
                            >
                                SUBMIT</button>
                        </div>
                    </div>
                </form >
            }
            {message && <div className='text-center text-green-500 font-bold py-4'>{message}</div>}
        </div>
    )
}