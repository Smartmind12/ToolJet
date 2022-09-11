import React, { useState, useEffect } from 'react';

function OnBoardingForm() {
  const [buttonState, setButtonState] = useState(false);

  const [page, setPage] = useState(0);
  const [formData, setFormData] = useState({
    companyName: '',
    role: '',
    companySize: '',
    employeeNo: '',
  });

  useEffect(() => {
    console.log('formdata', formData, buttonState, page);
  }, [formData, buttonState, page]);

  const FORM_TITLES = [
    'Where do you work John?',
    'What best describes your role',
    'What is the size of your company',
    'Where do you work John?',
  ];
  const FormSubTitles = ['ToolJet will not share your information with anyone'];

  const PageShift = () => {
    if (page === 0) {
      return <Page0 formData={formData} setFormData={setFormData} setButtonState={setButtonState} />;
    } else if (page === 1) {
      return <Page1 formData={formData} setFormData={setFormData} setButtonState={setButtonState} />;
    } else if (page === 2) {
      return <Page2 formData={formData} setFormData={setFormData} setButtonState={setButtonState} />;
    } else {
      return <Page3 formData={formData} setFormData={setFormData} setButtonState={setButtonState} />;
    }
  };

  return (
    <div className="form">
      <div className="onboarding-progress">
        {page !== 0 && (
          <div
            className="onboarding-back-button"
            disabled={page == 0}
            onClick={() => {
              setPage((currPage) => currPage - 1);
              setButtonState(false);
            }}
            style={{ cursor: 'pointer' }}
          >
            <img src="/assets/images/onboarding/back.svg" />
            <p>Back</p>
          </div>
        )}
        <div className="onboarding-bubbles-container">{onBoardingBubbles({ formData, page })}</div>
      </div>
      <div className="form-container">
        <div className="onboarding-header-wrapper">
          <h1 className="onboarding-page-header">{FORM_TITLES[page]}</h1>
          <p className="onboarding-page-sub-header">{FormSubTitles[0]}</p>
        </div>
        {PageShift()}
        <div className="">{continueButton({ buttonState, setButtonState, setPage, page, formData })}</div>
      </div>
    </div>
  );
}

// __COMPONENTS__

export function onBoardingBubbles({ formData, page }) {
  return (
    <div className="onboarding-bubbles-wrapper">
      <div
        className={`onboarding-bubbles ${formData.companyName !== '' && 'onboarding-bubbles-selected'} ${
          page === 0 && 'onboarding-bubbles-active'
        }`}
      ></div>
      <div
        className={`onboarding-bubbles ${formData.role !== '' && 'onboarding-bubbles-selected'} ${
          page === 1 && 'onboarding-bubbles-active'
        }`}
      ></div>
      <div
        className={`onboarding-bubbles ${formData.companySize !== '' && 'onboarding-bubbles-selected'} ${
          page === 2 && 'onboarding-bubbles-active'
        } `}
      ></div>
      <div
        className={`onboarding-bubbles ${formData.employeeNo !== '' && 'onboarding-bubbles-selected'} ${
          page === 3 && 'onboarding-bubbles-active'
        }`}
      ></div>
    </div>
  );
}

export function continueButton({ buttonState, setPage, setButtonState, formData, page }) {
  return (
    <button
      className="onboarding-page-continue-button"
      disabled={buttonState && Object.values(formData)[page] == ''}
      onClick={() => {
        setPage((currPage) => currPage + 1);
        setButtonState(true);
        console.log('hecker', Object.values(formData)[page]);
      }}
    >
      <p className="mb-0">Continue</p>
      <img src="/assets/images/onboarding/tick.svg" />
    </button>
  );
}

export function onBoardingInput({ formData, setFormData, setButtonState }) {
  return (
    <input
      value={formData.companyName}
      placeholder="Enter your company name"
      className="onboarding-input"
      onChange={(e) => {
        setFormData({ ...formData, companyName: e.target.value });
        setButtonState(false);
      }}
    />
  );
}

export function onBoardingRadioInput(props) {
  const { formData, setFormData, setButtonState, field, key } = props;
  return (
    <div className={`onboarding-input ${formData[key] === field && 'onboarding-radio-checked'}`}>
      <input
        type="radio"
        name={field}
        value={field}
        checked={formData[key] === field}
        onChange={(e) => {
          console.log('target', e.target.value);
          setFormData({ ...formData, [key]: e.target.value });
          setButtonState(false);
        }}
      />
      <p>{field}</p>
    </div>
  );
}

// __PAGES__

export function Page0({ formData, setFormData, setButtonState }) {
  return <div className="onboarding-pages-wrapper">{onBoardingInput({ formData, setFormData, setButtonState })}</div>;
}
export function Page1({ formData, setFormData, setButtonState }) {
  const ON_BOARDING_ROLES = [
    'Engineering manager',
    'Developer ',
    'Product manager',
    'Designer',
    'Mobile Developer',
    'Other',
  ];
  const key = 'role';
  return (
    <div className="onboarding-pages-wrapper">
      {ON_BOARDING_ROLES.map((field) => (
        <div key={field}> {onBoardingRadioInput({ formData, setFormData, setButtonState, field, key })}</div>
      ))}
    </div>
  );
}
export function Page2({ formData, setFormData, setButtonState }) {
  const ON_BOARDING_SIZE = ['1-5', '5-20', '20-50', '50-100', '100-200', '200+'];
  const key = 'companySize';

  return (
    <div className="onboarding-pages-wrapper">
      {ON_BOARDING_SIZE.map((field) => (
        <div key={field}> {onBoardingRadioInput({ formData, setFormData, setButtonState, field, key })}</div>
      ))}
    </div>
  );
}
export function Page3({ formData, setFormData, setButtonState }) {
  const ON_BOARDING_SIZE = ['1-5', '5-20', '20-50', '50-100', '100-200', '200+'];
  const key = 'employeeNo';

  return (
    <div className="onboarding-pages-wrapper">
      {ON_BOARDING_SIZE.map((field) => (
        <div key={field}> {onBoardingRadioInput({ formData, setFormData, setButtonState, field, key })}</div>
      ))}
    </div>
  );
}

export default OnBoardingForm;