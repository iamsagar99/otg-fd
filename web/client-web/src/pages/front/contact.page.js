import React, { useState } from 'react';
import emailjs from '@emailjs/browser'
import { toast } from 'react-toastify';
const ContactPage = () => {

    const [isHovered, setIsHovered] = useState(false);
    const [name, SetName] = useState('');
    const [email, SetEmail] = useState('');
    const [message, SetMessage] = useState('');
    const serviceId = process.env.REACT_APP_CONTACT_SERVICE_ID;
    const templateId = process.env.REACT_APP_CONTACT_TEMPLATE_ID;
    const publickey = process.env.REACT_APP_CONTACT_PUBLIC_KEY;

    const styles = {
        button: {
            backgroundColor: '#007fff',
            color: 'white',
            padding: '10px 20px',
            borderRadius: '5px',
            border: 'none',
            cursor: 'pointer',
            transition: 'background-color 0.3s',
        },
        hoverButton: {
            backgroundColor: ' #0044cc',
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const templateParams = {
            from_name: name,
            from_email: email,
            to_name: 'eVoting',
            message: message,
        };

        emailjs.send(serviceId, templateId, templateParams, publickey)
            .then((result) => {
                toast.success("Message Sent Successfully")
                console.log(result)
                SetName('')
                SetEmail('')
                SetMessage('')
            }, (error) => {

                toast.error("Message Not Sent")
                console.log(error);
            }
            );


    }



    return (
        <>
            <div style={{ height: '2px', backgroundColor: '#007fff', width: '100%' }}></div>
            <section id="Contact" style={{ padding: '30px 45px 250px 45px', backgroundColor: 'black', color: 'white' }}>
                <section id="contactUsSection" style={{ maxWidth: '403px', padding: '27px', borderRadius: '63px', display: 'flex', flexDirection: 'column' }}>
                    <u><h2>Contact Us</h2></u>
                    <p>If you have any questions, feel free to <a href="mailto:info@epoll.com">contact us via email</a>.</p>
                </section>

                <div className="vertical-line" />

                <div className="contact-form" style={{ marginTop: '52px', marginLeft: '750px', borderRadius: '52px', padding: '62px 0px', maxWidth: '358px', position: 'relative' }}>
                    <u><h4>Contact Form</h4></u>
                    <form onSubmit={handleSubmit}>
                        <label htmlFor="name">Name:</label>
                        <input type="text" id="name" name="name" value={name} onChange={(e) => SetName(e.target.value)} required />

                        <label htmlFor="email">Email:</label>
                        <input type="email" id="email" name="email" value={email} onChange={e => SetEmail(e.target.value)} required />

                        <label htmlFor="message">Message:</label>
                        <textarea id="message" name="message" rows="4" value={message} onChange={e => SetMessage(e.target.value)} required></textarea>

                        <button
                            type="submit"
                            className="btn mt-5"
                            style={isHovered ? { ...styles.button, ...styles.hoverButton } : styles.button}
                            onMouseEnter={() => setIsHovered(true)}
                            onMouseLeave={() => setIsHovered(false)}
                        >
                            Send Message
                        </button>

                    </form>
                </div>
            </section>
        </>
    );
};

export default ContactPage;
