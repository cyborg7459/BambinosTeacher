import React from 'react';

import InputGroup from '../input/input.component';
import {OTPButton, OtpForm, Timer} from './otp-form.styles';
import { Link } from 'react-router-dom';

class OTPForm extends React.Component {

    state = {
        timeLeft: 30
    }

    componentDidMount() {
        this.displayTimer();
    }

    displayTimer = () => {
        const {step} = this.props;
        if(step!==2)
            return;
        else
        {
            const timer = document.getElementById('timer');
            if(timer)
            {
                timer.innerHTML = `Form expires in ${this.state.timeLeft} seconds`;
                this.setState(
                    {timeLeft: this.state.timeLeft-1}
                );
                if(this.state.timeLeft === -1)
                {
                    this.formExpire();
                }
                else 
                {
                    setTimeout(this.displayTimer, 1000);
                } 
            }           
        }           
    }

    validationError = (target, errorMessage) => {
        target.classList.add('error');
        target.nextElementSibling.innerHTML = `${errorMessage}`;
        this.disableBtn();
    }

    removeErrors = (target) => {
        target.classList.remove('error');
        target.nextElementSibling.innerHTML = "";
        this.enableBtn();
    }

    disableBtn = () => {
        let SubmitBtn = document.getElementById('otp-submit-btn');
        SubmitBtn.disabled = true;
        SubmitBtn.classList.add('disabled');
    }

    enableBtn = () => {
        let SubmitBtn = document.getElementById('otp-submit-btn');
        SubmitBtn.disabled = false;
        SubmitBtn.classList.remove('disabled');
    }

    otpInputValidate = () => {
        const OtpInput = document.getElementById('otp-inp');
        if(OtpInput.value.length !== 4)
        {
            this.validationError(OtpInput, "OTP must be of length 4 digits");
            return false;
        }
        else
        {
            this.removeErrors(OtpInput);
            return true;
        }
    }

    OTPSuccess = this.props.OTPSuccess;

    otpValidate = () => {
        const {otp} = this.props;
        const OtpInput = document.getElementById('otp-inp');
        if(this.otpInputValidate())
        {
            if(parseInt(OtpInput.value) !== otp)
                this.validationError(OtpInput, "Incorrect OTP !!! Try again")
            else 
                this.OTPSuccess();
        } 
    }

    formExpire = () => {
        document.getElementById('errorMessage').classList.remove('d-none');
        document.getElementById('timer').remove();
        document.getElementById('otp-submit-btn').classList.add('disabled');
        document.getElementById('otp-submit-btn').disabled = true;
        document.getElementById('otp-inp').disabled = true;
    }

    render() {
        return (
            <div className="form-container">
                <h1>OTP Verification</h1>
                <OtpForm>
                    <div id="errorMessage" className="d-none">
                        <h3 className="text-center text-danger">Sorry, time limit exceeded. Please retry</h3>
                    </div>
                    <Timer id="timer">
                    </Timer>
                    <InputGroup
                        required
                        id='otp-inp'
                        type = 'text'
                        placeholder= 'Enter the OTP received on your phone'
                        label= 'Enter OTP'
                        handleChange= {this.otpInputValidate}
                    />
                    <OTPButton onClick={this.otpValidate} id="otp-submit-btn" className="btn btn-block btn-success">Verify</OTPButton>
                    <p className="text-center mt-3 mb-0">
                        <Link to="#">Didn't receive OTP? Click here to resend</Link>
                    </p>
                </OtpForm>
            </div>
        )
    }
}

export default OTPForm;