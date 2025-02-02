// import React, { useState } from 'react';
// import Step1_Intro from '../steps/Step1_Intro';
// import Step2_Categories from '../steps/Step2_Categories';
// import Step3_Type from '../steps/Step3_Type';
// import Step4_Amenities from '../steps/Step4_Amenities';
// import Step5_Location from '../steps/Step5_Location';
// import Step6_Details from '../steps/Step6_Details';
// import Step7_Imgs from '../cmps/steps/Step7_Imgs';
// import ProgressFooter from '../cmps/ProgressFooter';





// export default function AddNewStay() {
//     const [step, setStep] = useState(1);
//     const [formData, setFormData] = useState({
//       location: '',
//       title: '',
//       description: '',
//       amenities: [],
//       price: '',
//     });

//     const nextStep = () => {
//         if (step < 7) setStep(step + 1);
//       };

//       const prevStep = () => {
//         if (step > 1) setStep(step - 1);
//       };

//       const updateFormData = (newData) => {
//         setFormData((prevData) => ({ ...prevData, ...newData }));
//       };

//       const renderStep = () => {
//         switch (step) {
//           case 1:
//             return <Step1_Intro formData={formData} updateFormData={updateFormData} />;
//           case 2:
//             return <Step2_Categories formData={formData} updateFormData={updateFormData} />;
//           case 3:
//             return <Step3_Type formData={formData} updateFormData={updateFormData} />;
//           case 4:
//             return <Step4_Amenities formData={formData} updateFormData={updateFormData} />;
//           case 5:
//             return <Step5_Location formData={formData} />;
//             case 6:
//             return <Step6_Details formData={formData} />;
//             case 7:
//             return <Step7_Imgs formData={formData} />;
//           default:
//             return <Step1_Intro formData={formData} updateFormData={updateFormData} />;
//         }
//       };


//       return (
//         <div className="add-stay-container">
//           <h1>Add a New Stay</h1>
//           <div className="form-step-container">{renderStep()}</div>
//           <ProgressFooter step={step} nextStep={nextStep} prevStep={prevStep} />
//         </div>
//       );
//     }



