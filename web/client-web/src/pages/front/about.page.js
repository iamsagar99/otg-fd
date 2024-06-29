import React from 'react';

const AboutPage = () => {

    return (
        <div>
            <section id="aboutUs" style={{ backgroundColor: 'black', color: 'white', padding: '14px', justifyContent: 'space-around' }}>
                <h3>About Us</h3>
                <div className="info-container">
                    <div className="info-box" style={{ border: '2px solid #007fff', padding: '30px', borderRadius: '103px', width: '275px', margin: '10px', boxShadow: '0px 2px 5px rgba(0, 0, 0, 0.1)', transform: 'rotate(10deg)', transition: 'transform 0.5s' }} onMouseOver={(e) => e.currentTarget.style.transform = 'rotate(-10deg)'} onMouseOut={(e) => e.currentTarget.style.transform = 'rotate(10deg)'}>
                        <u><h2>Welcome</h2></u>
                        <p>Welcome to Epoll - Online Voting System! We are dedicated to providing a secure and convenient platform for users to participate in the democratic process from anywhere and at any time.</p>
                    </div>
                    <div className="info-box" style={{ border: '2px solid #007fff', padding: '30px', borderRadius: '103px', width: '275px', margin: '10px', boxShadow: '0px 2px 5px rgba(0, 0, 0, 0.1)', transform: 'rotate(10deg)', transition: 'transform 0.5s' }} onMouseOver={(e) => e.currentTarget.style.transform = 'rotate(-10deg)'} onMouseOut={(e) => e.currentTarget.style.transform = 'rotate(10deg)'}>
                        <u><h2>Mission</h2></u>
                        <p>Our mission is to promote accessibility and transparency in elections by leveraging technology. Epoll allows voters to cast their votes remotely, ensuring that the democratic voice is heard without constraints.</p>
                    </div>
                    <div className="info-box" style={{ border: '2px solid #007fff', padding: '30px', borderRadius: '103px', width: '275px', margin: '10px', boxShadow: '0px 2px 5px rgba(0, 0, 0, 0.1)', transform: 'rotate(10deg)', transition: 'transform 0.5s' }} onMouseOver={(e) => e.currentTarget.style.transform = 'rotate(-10deg)'} onMouseOut={(e) => e.currentTarget.style.transform = 'rotate(10deg)'}>
                        <u><h2>Key Features</h2></u>
                        <ul>
                            <li>Convenient and user-friendly online voting platform.</li>
                            <li>Secure and encrypted voting process to protect user privacy.</li>
                            <li>Accessible from various devices, making voting easy for everyone.</li>
                            <li>Efficient administration tools for election organizers and administrators.</li>
                        </ul>
                    </div>
                </div>
                <div className="info-container">
                    <div className="info-box" style={{ border: '2px solid #007fff', padding: '30px', borderRadius: '103px', width: '275px', margin: '10px', boxShadow: '0px 2px 5px rgba(0, 0, 0, 0.1)', transform: 'rotate(10deg)', transition: 'transform 0.5s' }} onMouseOver={(e) => e.currentTarget.style.transform = 'rotate(-10deg)'} onMouseOut={(e) => e.currentTarget.style.transform = 'rotate(10deg)'}>
                        <u><h2>Commitment</h2></u>
                        <p>Epoll is committed to upholding the principles of democracy and fostering trust in the electoral process. We believe in the power of technology to facilitate fair and inclusive elections, ensuring that every voice counts.</p>
                    </div>
                    <div className="info-box" style={{ border: '2px solid #007fff', padding: '30px', borderRadius: '103px', width: '275px', margin: '10px', boxShadow: '0px 2px 5px rgba(0, 0, 0, 0.1)', transform: 'rotate(10deg)', transition: 'transform 0.5s' }} onMouseOver={(e) => e.currentTarget.style.transform = 'rotate(-10deg)'} onMouseOut={(e) => e.currentTarget.style.transform = 'rotate(10deg)'}>
                        <u><h2>Thank You</h2></u>
                        <p>Thank you for choosing Epoll for your online voting needs. Together, let's build a more accessible and participatory democracy!</p>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default AboutPage;
