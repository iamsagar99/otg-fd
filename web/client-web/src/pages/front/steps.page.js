import React from 'react';

const StepsPage = () => {
    return (
        <div style={{backgroundColor:'black',padding:'150px 200px 220px 200px'}}>

            <div style={styles.stepsContainer}>
                <u><h1 style={styles.heading} >Voting Steps</h1></u>

                <div style={styles.step}>
                    <span style={styles.stepIcon}>1</span>
                    <p>Fill in the required information to complete your registration.</p>
                </div>

                <div style={styles.step}>
                    <span style={styles.stepIcon}>2</span>
                    <p>Log in using your credentials as a registered user.</p>
                </div>

                <div style={styles.step}>
                    <span style={styles.stepIcon}>3</span>
                    <p>Navigate to the "Vote" option on your user dashboard.</p>
                </div>

                <div style={styles.step}>
                    <span style={styles.stepIcon}>4</span>
                    <p>Enter the security key associated with your account to proceed.</p>
                </div>

                <div style={styles.step}>
                    <span style={styles.stepIcon}>5</span>
                    <p>Select your candidate and submit your vote.</p>
                </div>
            </div>
        </div>
    );
};

const styles = {
    buttonsSection: {
        display: 'flex',
        justifyContent: 'space-between',
        marginTop: '20px',
    },
    btnHome: {
        padding: '10px 20px',
        fontSize: '16px',
        cursor: 'pointer',
        backgroundColor: '#136fcb',
        color: '#fff',
        borderRadius: '43px',
        border: '1px solid #136fcb',
    },
    stepsContainer: {
        maxWidth: '800px',
        // margin: '-17px auto',
        padding: '41px',
        backgroundColor: 'black',
        color:'white',
        border: '5px solid #136fcb',
        borderRadius: '46px',
        textAlign: 'justify',
        margin: '15px 327px',
    },
    step: {
        marginBottom: '20px',
        display: 'flex',
        alignItems: 'center',
        fontSize:'1.1rem'
    },
    heading: {
        color: 'white',
        marginLeft: '180px',
        marginTop: '-19px',
    },
    stepIcon: {
        fontSize: '35px',
        marginRight: '44px',
        color: '#136fcb',
    },
};

export default StepsPage;
