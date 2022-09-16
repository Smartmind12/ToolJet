import React from 'react';

export const PasswordResetinfoScreen = function PasswordResetinfoScreen({ props }) {
  return (
    <div className="info-screen-wrapper">
      <div className="password-reset-card">
        <img
          className="info-screen-email-img"
          src={'assets/images/onboarding assets /02 Illustrations /Reset password successfull.svg'}
          alt="password lock"
        />
        <h1 className="common-auth-section-header">Passwrod has been reset</h1>
        <p className="info-screen-description">
          Your password has been reset sucecessfully, log into ToolJet to to continue your session
        </p>

        <button
          className="verify-page-continue-btn"
          style={{ marginTop: '32px' }}
          onClick={() => props.history.push('/login')}
        >
          <p className="mb-0">Back to log in</p>
        </button>
      </div>
    </div>
  );
};