import React, { useState } from 'react';
import Button from './button';

const TermsAndConditions = () => {
  const [accepted, setAccepted] = useState(false);

  const [disaccepted,setDisAccepted] = useState(false);

  const handleAcceptance = () => {
    setAccepted(true);
 
  };

  const handleDisAcceptance = () => {

    setDisAccepted(true);
  };

 
  const boxStyle = {
    width: '800px',
    height: '1300px',
    margin: '80px 0 150px 430px',
    border: '1px solid #000', 
    borderRadius: '10px', 
    backgroundColor: 'hsl(0, 0%, 97%)', 
  };

  const word = {
    margin:'20px',
    
  }
  const word1 = {
    FontSize: '16px'
  }


  return (
    <div className='term-main' style={boxStyle}>
      <h1>Terms and Conditions</h1>
      <p className="term-word" style={word1}>
        Welcome to the Nutritional Health Monitoring System (NHMS)!</p>
        <p style={word}> Before you start using our application, please read and agree to the following
        terms and conditions.
      </p>

      <div>
        <h2>1. Data Collection and Privacy Protection</h2>
        <p style={word}>
          1.1 In order to provide better personalized health management
          services, NHMS needs to collect some user-related information,
          including physical conditions and personal preferences.
        </p>
        <p style={word}>
        1.2 We promise to keep user data confidential and will not disclose
         personal information to any third party without user consent, except
          as required by law or necessary to provide services.
        </p>
        <p style={word}>
        1.3 User physical condition and personal preference information will 
        be used for analysis and generating personalized health recommendations, 
        but we will not share specific personal identity information.
        </p>
        
      </div>

      <div>
        <h2>2. User Responsibilities</h2>
        <p style={word}>
          2.1 Users must provide truthful, accurate, and up-to-date information
          for effective use of NHMS services.
        </p>
        <p style={word}>
        2.2 Users are responsible for maintaining the confidentiality of their account 
        credentials and are liable for any activities that occur under their account.
        </p>
      </div>

      <div>
        <h2>3. Consent to Use Health Data</h2>
        <p style={word}>
          3.1 By using NHMS, users explicitly consent to the collection,
          storage, and use of their health-related data for the purpose of
          personalized health management.
        </p>
        <p style={word}>
        3.2 NHMS will use health data responsibly and only for the purpose of improving 
        user experience and health outcomes.
        </p>
      </div>

      <div>
        <h2> 4. Updates and Modifications</h2>
        <p style={word}>
        4.1 NHMS reserves the right to update or modify this User Agreement at any time.
        </p>
        <p style={word}>
       4.2 Users will be notified of significant changes, and continued use of NHMS 
       after such changes constitutes acceptance of the updated terms.
        </p>
      </div>

      <div>
        <h2>5. Termination of Agreement</h2>
        <p style={word}>
            5.1 Users may terminate this agreement by discontinuing the use of NHMS.
        </p>
        <p style={word}>
            5.2 NHMS reserves the right to terminate or suspend user accounts in case of a 
            breach of this agreement.
        </p>
      </div>
      
        <p style={word}>
            By using NHMS, you agree to abide by the terms and conditions outlined in this User 
            Agreement. If you do not agree with any part of these terms, please refrain from using NHMS.
        </p>
        <p style={word}>
            If you have any questions or concerns, please contact us at [contact@nhms.com].
        </p>

      <div>
        {/* agree*/}
        {!accepted && !disaccepted && (
          <Button onClick={handleAcceptance}>Agree</Button>
        )}
      </div>

      <div>
        {accepted && (
            <Button onClick={handleAcceptance}>Exit</Button>
        )}
      </div>

      {/* content after agreement */}
      {accepted && <p>Thank you for agreeing to our terms!</p>}

      <div>
        {!disaccepted && !accepted &&(
          <Button onClick={handleDisAcceptance}>Disagree</Button>
        )}
      </div>
      
      <div>
        {disaccepted && (
            <Button onClick={handleDisAcceptance}>Exit</Button>
        )}
      </div>
      {disaccepted && <p>Thanks, Looking forward to our next meeting.</p>}
     
    </div>
  );
};

export default TermsAndConditions;