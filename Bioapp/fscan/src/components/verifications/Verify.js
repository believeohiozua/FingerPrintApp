import React, { Component } from 'react'
import Verification from "./Verification"
export class Verify extends Component {
    render() {
        return (
            <div>
                <h3 className="text-center h1">Verification</h3>
                <p className="text-center h3">Biometric Verification</p>
                <Verification />
            </div>
        )
    }
}

export default Verify;
