import React from "react";
import { useNavigate } from "react-router-dom";

export default function PageNotFound() {
    const navigate = useNavigate();
    return (
        <div className='not-found-msg'>
            <div>
                <p>Page Not Found</p>
                <div className='back-to-home-btn link' onClick={() => navigate('/')}>
                    Back to home
                </div>
            </div>
        </div>
    )
};