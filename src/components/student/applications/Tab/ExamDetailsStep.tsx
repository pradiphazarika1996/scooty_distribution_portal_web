// // import {
// //   DISTRICT_OPTIONS,
// //   REGISTRATION_SESSION_OPTIONS,
// // } from "@/utils/students/student";
// // import { Form, FormInstance, Input, InputNumber, Radio, Select } from "antd";
// // import FormSection from "../FormSection/FormSection";

// // interface ExamDetailsStepProps {
// //   form: FormInstance;
// // }

// // const ExamDetailsStep = ({ form }: ExamDetailsStepProps) => {
// //   return (
// //     <>
// //       <FormSection title="Higher Secondary Examination Details">
// //         <Form.Item
// //           name="institution_name"
// //           label="Name of the Institution from which the applicant passed the Higher Secondary Final Examination"
// //           rules={[
// //             { required: true, message: "Please enter the institution name" },
// //           ]}
// //         >
// //           <Input />
// //         </Form.Item>

// //         <Form.Item
// //           name="institution_district"
// //           label="District of the Institution"
// //           rules={[{ required: true, message: "Please select the district" }]}
// //         >
// //           <Select
// //             placeholder="Select district"
// //             options={DISTRICT_OPTIONS}
// //             showSearch
// //             optionFilterProp="label"
// //           />
// //         </Form.Item>

// //         <Form.Item
// //           name="roll"
// //           label="Roll"
// //           rules={[{ required: true, message: "Please enter your roll number" }]}
// //         >
// //           <Input />
// //         </Form.Item>
// //         <Form.Item
// //           name="number"
// //           label="No."
// //           rules={[{ required: true, message: "Please enter your No." }]}
// //         >
// //           <Input />
// //         </Form.Item>

// //         <Form.Item
// //           name="registration_no"
// //           label="Registration Number"
// //           rules={[
// //             {
// //               required: true,
// //               message: "Please enter your registration number",
// //             },
// //           ]}
// //         >
// //           <Input />
// //         </Form.Item>

// //         <Form.Item
// //           name="registration_session"
// //           label="Registration Session"
// //           rules={[
// //             {
// //               required: true,
// //               message: "Please select registration session",
// //             },
// //           ]}
// //         >
// //           <Select
// //             placeholder="Select Registration Session"
// //             options={REGISTRATION_SESSION_OPTIONS}
// //           />
// //         </Form.Item>

// //         <Form.Item
// //           name="total_marks_obtained"
// //           label="Total Marks obtained"
// //           rules={[{ required: true, message: "Please enter your total marks" }]}
// //         >
// //           <InputNumber min={0} style={{ width: "100%" }} />
// //         </Form.Item>

// //         <Form.Item
// //           name="percentage_of_marks"
// //           label="Percentage of Marks Secured"
// //           rules={[
// //             {
// //               required: true,
// //               message: "Please enter your percentage of marks",
// //             },
// //           ]}
// //         >
// //           <InputNumber
// //             min={0}
// //             max={100}
// //             addonAfter="%"
// //             style={{ width: "100%" }}
// //           />
// //         </Form.Item>
// //       </FormSection>

// //       <FormSection title="Educational Details (if the student is enrolled in College/University)">
// //         <Form.Item
// //           name="is_enrolled_in_college"
// //           label="Enrolled in College/University?"
// //           rules={[{ required: true, message: "Please select an option" }]}
// //         >
// //           <Radio.Group>
// //             <Radio value={true}>Yes</Radio>
// //             <Radio value={false}>No</Radio>
// //           </Radio.Group>
// //         </Form.Item>

// //         <Form.Item
// //           shouldUpdate={(prev, cur) =>
// //             prev.is_enrolled_in_college !== cur.is_enrolled_in_college
// //           }
// //         >
// //           {() =>
// //             form.getFieldValue("is_enrolled_in_college") ? (
// //               <>
// //                 <Form.Item
// //                   name="present_institution_name"
// //                   label="Name of the Institution where the applicant is presently studying"
// //                   rules={[
// //                     {
// //                       required: true,
// //                       message: "Please enter the present institution name",
// //                     },
// //                   ]}
// //                 >
// //                   <Input />
// //                 </Form.Item>
// //                 <Form.Item
// //                   name="present_institution_district"
// //                   label="District of the Present Institution"
// //                   rules={[
// //                     { required: true, message: "Please select the district" },
// //                   ]}
// //                 >
// //                   {/* Same fix — present_institution_district is INTEGER too */}
// //                   <Select
// //                     placeholder="Select district"
// //                     options={DISTRICT_OPTIONS}
// //                     showSearch
// //                     optionFilterProp="label"
// //                   />
// //                 </Form.Item>
// //               </>
// //             ) : null
// //           }
// //         </Form.Item>

// //         <Form.Item
// //           name="admission_via_samarth"
// //           label="Whether admission has been taken through Assam SAMARTH"
// //           rules={[{ required: true, message: "Please select an option" }]}
// //         >
// //           <Radio.Group>
// //             <Radio value={true}>Yes</Radio>
// //             <Radio value={false}>No</Radio>
// //           </Radio.Group>
// //         </Form.Item>

// //         <Form.Item
// //           shouldUpdate={(prev, cur) =>
// //             prev.admission_via_samarth !== cur.admission_via_samarth
// //           }
// //         >
// //           {() =>
// //             form.getFieldValue("admission_via_samarth") ? (
// //               <Form.Item
// //                 name="samarth_registration_no"
// //                 label="SAMARTH Registration Number"
// //                 rules={[
// //                   {
// //                     required: true,
// //                     message: "Please enter the SAMARTH registration number",
// //                   },
// //                 ]}
// //               >
// //                 <Input />
// //               </Form.Item>
// //             ) : null
// //           }
// //         </Form.Item>

// //         <Form.Item
// //           name="is_betterment_reappearance"
// //           label="Whether Betterment and Reappearance category"
// //           rules={[{ required: true, message: "Please select an option" }]}
// //         >
// //           <Radio.Group>
// //             <Radio value={true}>Yes</Radio>
// //             <Radio value={false}>No</Radio>
// //           </Radio.Group>
// //         </Form.Item>

// //         <Form.Item
// //           shouldUpdate={(prev, cur) =>
// //             prev.is_betterment_reappearance !== cur.is_betterment_reappearance
// //           }
// //         >
// //           {() =>
// //             form.getFieldValue("is_betterment_reappearance") ? (
// //               <>
// //                 <Form.Item
// //                   name="betterment_years"
// //                   label="Number of Year(s)"
// //                   rules={[
// //                     { required: true, message: "Please specify the year(s)" },
// //                   ]}
// //                 >
// //                   <Input />
// //                 </Form.Item>
// //                 <Form.Item
// //                   name="betterment_reason"
// //                   label="Reason"
// //                   rules={[
// //                     { required: true, message: "Please specify the reason" },
// //                   ]}
// //                 >
// //                   <Input.TextArea rows={3} />
// //                 </Form.Item>
// //               </>
// //             ) : null
// //           }
// //         </Form.Item>
// //       </FormSection>
// //     </>
// //   );
// // };

// // export default ExamDetailsStep;

// // import {
// //   DISTRICT_OPTIONS,
// //   REGISTRATION_SESSION_OPTIONS,
// // } from "@/utils/students/student";
// // import { Form, FormInstance, Input, InputNumber, Radio, Select } from "antd";
// // import FormSection from "../FormSection/FormSection";

// // interface ExamDetailsStepProps {
// //   form: FormInstance;
// // }

// // // ── NEW: total marks are always out of this fixed maximum ──
// // const MAX_TOTAL_MARKS = 500;

// // // ── NEW: pure helper — computes percentage from total marks, with all the
// // // guard conditions the requirement calls for (empty/null/invalid/out of
// // // range all resolve to `null`, which clears the percentage field). Kept
// // // outside the component so it's not recreated on every render.
// // const calculatePercentage = (
// //   total: number | null | undefined,
// // ): number | null => {
// //   if (total === null || total === undefined) return null;
// //   if (typeof total !== "number" || Number.isNaN(total)) return null;
// //   if (total < 0 || total > MAX_TOTAL_MARKS) return null;

// //   const percentage = (total / MAX_TOTAL_MARKS) * 100;
// //   // Round to 2 decimal places without floating-point string round-tripping.
// //   return Math.round(percentage * 100) / 100;
// // };

// // const ExamDetailsStep = ({ form }: ExamDetailsStepProps) => {
// //   // ── NEW: fires on every change to total_marks_obtained (InputNumber's
// //   // onChange fires immediately on valid input, satisfying "instantly on
// //   // user input" without needing form submission or a separate effect).
// //   const handleTotalMarksChange = (value: number | null) => {
// //     const percentage = calculatePercentage(value);
// //     // setFieldValue only touches this one field — everything else in the
// //     // form (other steps, other values) is untouched.
// //     form.setFieldValue("percentage_of_marks", percentage);
// //   };

// //   return (
// //     <>
// //       <FormSection title="Higher Secondary Examination Details">
// //         <Form.Item
// //           name="institution_name"
// //           label="Name of the Institution from which the applicant passed the Higher Secondary Final Examination"
// //           rules={[
// //             { required: true, message: "Please enter the institution name" },
// //           ]}
// //         >
// //           <Input />
// //         </Form.Item>

// //         <Form.Item
// //           name="institution_district"
// //           label="District of the Institution"
// //           rules={[{ required: true, message: "Please select the district" }]}
// //         >
// //           <Select
// //             placeholder="Select district"
// //             options={DISTRICT_OPTIONS}
// //             showSearch
// //             optionFilterProp="label"
// //           />
// //         </Form.Item>

// //         <Form.Item
// //           name="roll"
// //           label="Roll"
// //           rules={[{ required: true, message: "Please enter your roll number" }]}
// //         >
// //           <Input />
// //         </Form.Item>
// //         <Form.Item
// //           name="number"
// //           label="No."
// //           rules={[{ required: true, message: "Please enter your No." }]}
// //         >
// //           <Input />
// //         </Form.Item>

// //         <Form.Item
// //           name="registration_no"
// //           label="Registration Number"
// //           rules={[
// //             {
// //               required: true,
// //               message: "Please enter your registration number",
// //             },
// //           ]}
// //         >
// //           <Input />
// //         </Form.Item>

// //         <Form.Item
// //           name="registration_session"
// //           label="Registration Session"
// //           rules={[
// //             {
// //               required: true,
// //               message: "Please select registration session",
// //             },
// //           ]}
// //         >
// //           <Select
// //             placeholder="Select Registration Session"
// //             options={REGISTRATION_SESSION_OPTIONS}
// //           />
// //         </Form.Item>

// //         <Form.Item
// //           name="total_marks_obtained"
// //           label="Total Marks obtained"
// //           rules={[{ required: true, message: "Please enter your total marks" }]}
// //         >
// //           {/* CHANGED: added max={500} (requirement 4 — prevent values
// //               outside 0-500) and onChange to drive the auto-calculation. */}
// //           <InputNumber
// //             min={0}
// //             max={MAX_TOTAL_MARKS}
// //             style={{ width: "100%" }}
// //             onChange={handleTotalMarksChange}
// //           />
// //         </Form.Item>

// //         <Form.Item
// //           name="percentage_of_marks"
// //           label="Percentage of Marks Secured"
// //           rules={[
// //             {
// //               required: true,
// //               message: "Please enter your percentage of marks",
// //             },
// //           ]}
// //         >
// //           {/* CHANGED: disabled — this field is now purely derived from
// //               total_marks_obtained and must not be hand-edited (requirement
// //               6). The `required` rule is kept since the field still needs a
// //               value at submit time; it's satisfied automatically by the
// //               calculation above rather than by user input. */}
// //           <InputNumber
// //             min={0}
// //             max={100}
// //             addonAfter="%"
// //             style={{ width: "100%" }}
// //             disabled
// //           />
// //         </Form.Item>
// //       </FormSection>

// //       <FormSection title="Educational Details (if the student is enrolled in College/University)">
// //         <Form.Item
// //           name="is_enrolled_in_college"
// //           label="Enrolled in College/University?"
// //           rules={[{ required: true, message: "Please select an option" }]}
// //         >
// //           <Radio.Group>
// //             <Radio value={true}>Yes</Radio>
// //             <Radio value={false}>No</Radio>
// //           </Radio.Group>
// //         </Form.Item>

// //         <Form.Item
// //           shouldUpdate={(prev, cur) =>
// //             prev.is_enrolled_in_college !== cur.is_enrolled_in_college
// //           }
// //         >
// //           {() =>
// //             form.getFieldValue("is_enrolled_in_college") ? (
// //               <>
// //                 <Form.Item
// //                   name="present_institution_name"
// //                   label="Name of the Institution where the applicant is presently studying"
// //                   rules={[
// //                     {
// //                       required: true,
// //                       message: "Please enter the present institution name",
// //                     },
// //                   ]}
// //                 >
// //                   <Input />
// //                 </Form.Item>
// //                 <Form.Item
// //                   name="present_institution_district"
// //                   label="District of the Present Institution"
// //                   rules={[
// //                     { required: true, message: "Please select the district" },
// //                   ]}
// //                 >
// //                   <Select
// //                     placeholder="Select district"
// //                     options={DISTRICT_OPTIONS}
// //                     showSearch
// //                     optionFilterProp="label"
// //                   />
// //                 </Form.Item>
// //               </>
// //             ) : null
// //           }
// //         </Form.Item>

// //         <Form.Item
// //           name="admission_via_samarth"
// //           label="Whether admission has been taken through Assam SAMARTH"
// //           rules={[{ required: true, message: "Please select an option" }]}
// //         >
// //           <Radio.Group>
// //             <Radio value={true}>Yes</Radio>
// //             <Radio value={false}>No</Radio>
// //           </Radio.Group>
// //         </Form.Item>

// //         <Form.Item
// //           shouldUpdate={(prev, cur) =>
// //             prev.admission_via_samarth !== cur.admission_via_samarth
// //           }
// //         >
// //           {() =>
// //             form.getFieldValue("admission_via_samarth") ? (
// //               <Form.Item
// //                 name="samarth_registration_no"
// //                 label="SAMARTH Registration Number"
// //                 rules={[
// //                   {
// //                     required: true,
// //                     message: "Please enter the SAMARTH registration number",
// //                   },
// //                 ]}
// //               >
// //                 <Input />
// //               </Form.Item>
// //             ) : null
// //           }
// //         </Form.Item>

// //         <Form.Item
// //           name="is_betterment_reappearance"
// //           label="Whether Betterment and Reappearance category"
// //           rules={[{ required: true, message: "Please select an option" }]}
// //         >
// //           <Radio.Group>
// //             <Radio value={true}>Yes</Radio>
// //             <Radio value={false}>No</Radio>
// //           </Radio.Group>
// //         </Form.Item>

// //         <Form.Item
// //           shouldUpdate={(prev, cur) =>
// //             prev.is_betterment_reappearance !== cur.is_betterment_reappearance
// //           }
// //         >
// //           {() =>
// //             form.getFieldValue("is_betterment_reappearance") ? (
// //               <>
// //                 <Form.Item
// //                   name="betterment_years"
// //                   label="Number of Year(s)"
// //                   rules={[
// //                     { required: true, message: "Please specify the year(s)" },
// //                   ]}
// //                 >
// //                   <Input />
// //                 </Form.Item>
// //                 <Form.Item
// //                   name="betterment_reason"
// //                   label="Reason"
// //                   rules={[
// //                     { required: true, message: "Please specify the reason" },
// //                   ]}
// //                 >
// //                   <Input.TextArea rows={3} />
// //                 </Form.Item>
// //               </>
// //             ) : null
// //           }
// //         </Form.Item>
// //       </FormSection>
// //     </>
// //   );
// // };

// // export default ExamDetailsStep;
// import {
//   DISTRICT_OPTIONS,
//   REGISTRATION_SESSION_OPTIONS,
// } from "@/utils/students/student";
// import {
//   Form,
//   FormInstance,
//   Input,
//   InputNumber,
//   Radio,
//   Select,
//   Tag,
// } from "antd";
// import FormSection from "../FormSection/FormSection";
// import styles from "../student.module.scss";

// interface ExamDetailsStepProps {
//   form: FormInstance;
// }

// const MAX_TOTAL_MARKS = 500;

// const ELIGIBILITY_THRESHOLD = 80;

// const calculatePercentage = (
//   total: number | null | undefined,
// ): number | null => {
//   if (total === null || total === undefined) return null;
//   if (typeof total !== "number" || Number.isNaN(total)) return null;
//   if (total < 0 || total > MAX_TOTAL_MARKS) return null;

//   const percentage = (total / MAX_TOTAL_MARKS) * 100;
//   return Math.round(percentage * 100) / 100;
// };

// const ExamDetailsStep = ({ form }: ExamDetailsStepProps) => {
//   const handleTotalMarksChange = (value: number | null) => {
//     const percentage = calculatePercentage(value);
//     form.setFieldValue("percentage_of_marks", percentage);
//   };

//   return (
//     <>
//       <FormSection title="Higher Secondary Examination Details">
//         <Form.Item
//           name="institution_name"
//           label="Name of the Institution from which the applicant passed the Higher Secondary Final Examination"
//           rules={[
//             { required: true, message: "Please enter the institution name" },
//           ]}
//         >
//           <Input />
//         </Form.Item>

//         <Form.Item
//           name="institution_district"
//           label="District of the Institution"
//           rules={[{ required: true, message: "Please select the district" }]}
//         >
//           <Select
//             placeholder="Select district"
//             options={DISTRICT_OPTIONS}
//             showSearch
//             optionFilterProp="label"
//           />
//         </Form.Item>

//         <Form.Item
//           name="roll"
//           label="Roll"
//           rules={[{ required: true, message: "Please enter your roll number" }]}
//         >
//           <Input />
//         </Form.Item>
//         <Form.Item
//           name="number"
//           label="No."
//           rules={[{ required: true, message: "Please enter your No." }]}
//         >
//           <Input />
//         </Form.Item>

//         <Form.Item
//           name="registration_no"
//           label="Registration Number"
//           rules={[
//             {
//               required: true,
//               message: "Please enter your registration number",
//             },
//           ]}
//         >
//           <Input />
//         </Form.Item>

//         <Form.Item
//           name="registration_session"
//           label="Registration Session"
//           rules={[
//             {
//               required: true,
//               message: "Please select registration session",
//             },
//           ]}
//         >
//           <Select
//             placeholder="Select Registration Session"
//             options={REGISTRATION_SESSION_OPTIONS}
//           />
//         </Form.Item>

//         <Form.Item
//           name="total_marks_obtained"
//           label="Total Marks obtained"
//           rules={[{ required: true, message: "Please enter your total marks" }]}
//         >
//           {/* CHANGED: addonAfter shows "Out of 500" next to the field —
//               display only, doesn't affect the stored/submitted value.
//               className={styles.totalMarksInput} is the vertical-alignment
//               fix — scoped to only this field. */}
//           <InputNumber<number>
//             min={0}
//             max={MAX_TOTAL_MARKS}
//             addonAfter="Out of 500"
//             style={{ width: "100%" }}
//             className={styles.totalMarksInput}
//             onChange={handleTotalMarksChange}
//           />
//         </Form.Item>

//         <Form.Item
//           name="percentage_of_marks"
//           label="Percentage of Marks Secured"
//           rules={[
//             {
//               required: true,
//               message: "Please enter your percentage of marks",
//             },
//             // NEW: blocks the user from proceeding past this step unless
//             // they meet the eligibility threshold. Since percentage_of_marks
//             // is already validated by handleNext in StudentForm.tsx
//             // (STEP_FIELDS[1] includes it), this rule alone is enough to
//             // stop "Next" — no separate check needed elsewhere.
//             {
//               validator: (_, value) => {
//                 if (value === undefined || value === null || value === "") {
//                   // Empty case is already caught by the `required` rule
//                   // above; don't double-report here.
//                   return Promise.resolve();
//                 }
//                 const numericValue = Number(value);
//                 return numericValue >= ELIGIBILITY_THRESHOLD
//                   ? Promise.resolve()
//                   : Promise.reject(
//                       new Error(
//                         `You must score at least ${ELIGIBILITY_THRESHOLD}% to be eligible for this scheme. Your current percentage is ${numericValue.toFixed(2)}%.`,
//                       ),
//                     );
//               },
//             },
//           ]}
//         >
//           {/* CHANGED: formatter/parser render the value as "87.60%" in one
//               piece (2 decimals, % appended) instead of a plain number with
//               a separate "%" addon box. The underlying form value stays a
//               plain number (e.g. 87.6) — formatter only controls what's
//               displayed, parser only matters if the field becomes editable
//               later; it's disabled here so it's a no-op in practice today,
//               but kept correct/consistent with the formatter regardless. */}
//           <InputNumber<number>
//             min={0}
//             max={100}
//             style={{ width: "100%" }}
//             disabled
//             formatter={(value) => {
//               if (value === undefined || value === null) return "";
//               const numericValue =
//                 typeof value === "string" ? parseFloat(value) : value;
//               if (Number.isNaN(numericValue)) return "";
//               return `${numericValue.toFixed(2)}%`;
//             }}
//             parser={(displayValue) => {
//               if (!displayValue) return 0;
//               const numeric = parseFloat(displayValue.replace("%", "").trim());
//               return Number.isNaN(numeric) ? 0 : numeric;
//             }}
//           />
//         </Form.Item>

//         {/* NEW: Eligibility status — derived directly from the live
//             percentage_of_marks form value via shouldUpdate, so it reacts
//             correctly whether the percentage changed because the user
//             edited total_marks_obtained, or because an existing
//             application's data was prefilled into the form on load. No
//             separate state to keep in sync, no mount-timing race. */}
//         <Form.Item
//           shouldUpdate={(prev, cur) =>
//             prev.percentage_of_marks !== cur.percentage_of_marks
//           }
//           noStyle
//         >
//           {() => {
//             const percentage = form.getFieldValue("percentage_of_marks");
//             if (
//               percentage === undefined ||
//               percentage === null ||
//               percentage === ""
//             ) {
//               return null;
//             }
//             const isEligible = Number(percentage) >= ELIGIBILITY_THRESHOLD;
//             return (
//               <Form.Item label="Eligibility Status">
//                 <Tag
//                   color={isEligible ? "success" : "error"}
//                   style={{ fontSize: 14, padding: "4px 12px" }}
//                 >
//                   {isEligible ? "Eligible" : "Not Eligible"}
//                 </Tag>
//               </Form.Item>
//             );
//           }}
//         </Form.Item>
//       </FormSection>

//       <FormSection title="Educational Details (if the student is enrolled in College/University)">
//         <Form.Item
//           name="is_enrolled_in_college"
//           label="Enrolled in College/University?"
//           rules={[{ required: true, message: "Please select an option" }]}
//         >
//           <Radio.Group>
//             <Radio value={true}>Yes</Radio>
//             <Radio value={false}>No</Radio>
//           </Radio.Group>
//         </Form.Item>

//         <Form.Item
//           shouldUpdate={(prev, cur) =>
//             prev.is_enrolled_in_college !== cur.is_enrolled_in_college
//           }
//         >
//           {() =>
//             form.getFieldValue("is_enrolled_in_college") ? (
//               <>
//                 <Form.Item
//                   name="present_institution_name"
//                   label="Name of the Institution where the applicant is presently studying"
//                   rules={[
//                     {
//                       required: true,
//                       message: "Please enter the present institution name",
//                     },
//                   ]}
//                 >
//                   <Input />
//                 </Form.Item>
//                 <Form.Item
//                   name="present_institution_district"
//                   label="District of the Present Institution"
//                   rules={[
//                     { required: true, message: "Please select the district" },
//                   ]}
//                 >
//                   <Select
//                     placeholder="Select district"
//                     options={DISTRICT_OPTIONS}
//                     showSearch
//                     optionFilterProp="label"
//                   />
//                 </Form.Item>
//               </>
//             ) : null
//           }
//         </Form.Item>

//         <Form.Item
//           name="admission_via_samarth"
//           label="Whether admission has been taken through Assam SAMARTH"
//           rules={[{ required: true, message: "Please select an option" }]}
//         >
//           <Radio.Group>
//             <Radio value={true}>Yes</Radio>
//             <Radio value={false}>No</Radio>
//           </Radio.Group>
//         </Form.Item>

//         <Form.Item
//           shouldUpdate={(prev, cur) =>
//             prev.admission_via_samarth !== cur.admission_via_samarth
//           }
//         >
//           {() =>
//             form.getFieldValue("admission_via_samarth") ? (
//               <Form.Item
//                 name="samarth_registration_no"
//                 label="SAMARTH Registration Number"
//                 rules={[
//                   {
//                     required: true,
//                     message: "Please enter the SAMARTH registration number",
//                   },
//                 ]}
//               >
//                 <Input />
//               </Form.Item>
//             ) : null
//           }
//         </Form.Item>

//         <Form.Item
//           name="is_betterment_reappearance"
//           label="Whether Betterment and Reappearance category"
//           rules={[{ required: true, message: "Please select an option" }]}
//         >
//           <Radio.Group>
//             <Radio value={true}>Yes</Radio>
//             <Radio value={false}>No</Radio>
//           </Radio.Group>
//         </Form.Item>

//         <Form.Item
//           shouldUpdate={(prev, cur) =>
//             prev.is_betterment_reappearance !== cur.is_betterment_reappearance
//           }
//         >
//           {() =>
//             form.getFieldValue("is_betterment_reappearance") ? (
//               <>
//                 <Form.Item
//                   name="betterment_years"
//                   label="Number of Year(s)"
//                   rules={[
//                     { required: true, message: "Please specify the year(s)" },
//                   ]}
//                 >
//                   <Input />
//                 </Form.Item>
//                 <Form.Item
//                   name="betterment_reason"
//                   label="Reason"
//                   rules={[
//                     { required: true, message: "Please specify the reason" },
//                   ]}
//                 >
//                   <Input.TextArea rows={3} />
//                 </Form.Item>
//               </>
//             ) : null
//           }
//         </Form.Item>
//       </FormSection>
//     </>
//   );
// };

// export default ExamDetailsStep;

import {
  DISTRICT_OPTIONS,
  REGISTRATION_SESSION_OPTIONS,
} from "@/utils/students/student";
import {
  Form,
  FormInstance,
  Input,
  InputNumber,
  Radio,
  Select,
  Tag,
} from "antd";
import FormSection from "../FormSection/FormSection";
import styles from "../student.module.scss";

interface ExamDetailsStepProps {
  form: FormInstance;
  // NEW — wasn't in this interface before. Locks the fields sourced from
  // StudentLookup once the student's registration is verified.
  disabled?: boolean;
}

const MAX_TOTAL_MARKS = 500;

const ELIGIBILITY_THRESHOLD = 80;

const calculatePercentage = (
  total: number | null | undefined,
): number | null => {
  if (total === null || total === undefined) return null;
  if (typeof total !== "number" || Number.isNaN(total)) return null;
  if (total < 0 || total > MAX_TOTAL_MARKS) return null;

  const percentage = (total / MAX_TOTAL_MARKS) * 100;
  return Math.round(percentage * 100) / 100;
};

const ExamDetailsStep = ({ form, disabled }: ExamDetailsStepProps) => {
  const handleTotalMarksChange = (value: number | null) => {
    const percentage = calculatePercentage(value);
    form.setFieldValue("percentage_of_marks", percentage);
  };

  return (
    <>
      <FormSection title="Higher Secondary Examination Details">
        {/* LOCKED — from StudentLookup.institution_name */}
        <Form.Item
          name="institution_name"
          label="Name of the Institution from which the applicant passed the Higher Secondary Final Examination"
          rules={[
            { required: true, message: "Please enter the institution name" },
          ]}
        >
          <Input disabled={disabled} />
        </Form.Item>

        {/* LOCKED — from StudentLookup.district_name (resolved to an id) */}
        <Form.Item
          name="institution_district"
          label="District of the Institution"
          rules={[{ required: true, message: "Please select the district" }]}
        >
          <Select
            placeholder="Select district"
            options={DISTRICT_OPTIONS}
            showSearch
            optionFilterProp="label"
            disabled={disabled}
          />
        </Form.Item>

        {/* LOCKED — from StudentLookup.roll */}
        <Form.Item
          name="roll"
          label="Roll"
          rules={[{ required: true, message: "Please enter your roll number" }]}
        >
          <Input disabled={disabled} />
        </Form.Item>

        {/* LOCKED — from StudentLookup.number */}
        <Form.Item
          name="number"
          label="No."
          rules={[{ required: true, message: "Please enter your No." }]}
        >
          <Input disabled={disabled} />
        </Form.Item>

        {/* LOCKED — from StudentLookup.registration_no */}
        <Form.Item
          name="registration_no"
          label="Registration Number"
          rules={[
            {
              required: true,
              message: "Please enter your registration number",
            },
          ]}
        >
          <Input disabled={disabled} />
        </Form.Item>

        {/* LOCKED — from StudentLookup.registration_session */}
        <Form.Item
          name="registration_session"
          label="Registration Session"
          rules={[
            {
              required: true,
              message: "Please select registration session",
            },
          ]}
        >
          <Select
            placeholder="Select Registration Session"
            options={REGISTRATION_SESSION_OPTIONS}
            disabled={disabled}
          />
        </Form.Item>

        {/* LOCKED — from StudentLookup.total_marks */}
        <Form.Item
          name="total_marks_obtained"
          label="Total Marks obtained"
          rules={[{ required: true, message: "Please enter your total marks" }]}
        >
          <InputNumber<number>
            min={0}
            max={MAX_TOTAL_MARKS}
            addonAfter="Out of 500"
            style={{ width: "100%" }}
            className={styles.totalMarksInput}
            onChange={handleTotalMarksChange}
            disabled={disabled}
          />
        </Form.Item>

        <Form.Item
          name="percentage_of_marks"
          label="Percentage of Marks Secured"
          rules={[
            {
              required: true,
              message: "Please enter your percentage of marks",
            },
            // NEW: blocks the user from proceeding past this step unless
            // they meet the eligibility threshold. Since percentage_of_marks
            // is already validated by handleNext in StudentForm.tsx
            // (STEP_FIELDS[1] includes it), this rule alone is enough to
            // stop "Next" — no separate check needed elsewhere.
            {
              validator: (_, value) => {
                if (value === undefined || value === null || value === "") {
                  // Empty case is already caught by the `required` rule
                  // above; don't double-report here.
                  return Promise.resolve();
                }
                const numericValue = Number(value);
                return numericValue >= ELIGIBILITY_THRESHOLD
                  ? Promise.resolve()
                  : Promise.reject(
                      new Error(
                        `You must score at least ${ELIGIBILITY_THRESHOLD}% to be eligible for this scheme. Your current percentage is ${numericValue.toFixed(2)}%.`,
                      ),
                    );
              },
            },
          ]}
        >
          {/* CHANGED: formatter/parser render the value as "87.60%" in one
              piece (2 decimals, % appended) instead of a plain number with
              a separate "%" addon box. The underlying form value stays a
              plain number (e.g. 87.6) — formatter only controls what's
              displayed, parser only matters if the field becomes editable
              later; it's disabled here so it's a no-op in practice today,
              but kept correct/consistent with the formatter regardless. */}
          <InputNumber<number>
            min={0}
            max={100}
            style={{ width: "100%" }}
            disabled
            formatter={(value) => {
              if (value === undefined || value === null) return "";
              const numericValue =
                typeof value === "string" ? parseFloat(value) : value;
              if (Number.isNaN(numericValue)) return "";
              return `${numericValue.toFixed(2)}%`;
            }}
            parser={(displayValue) => {
              if (!displayValue) return 0;
              const numeric = parseFloat(displayValue.replace("%", "").trim());
              return Number.isNaN(numeric) ? 0 : numeric;
            }}
          />
        </Form.Item>

        {/* NEW: Eligibility status — derived directly from the live
            percentage_of_marks form value via shouldUpdate, so it reacts
            correctly whether the percentage changed because the user
            edited total_marks_obtained, or because an existing
            application's data was prefilled into the form on load. No
            separate state to keep in sync, no mount-timing race. */}
        <Form.Item
          shouldUpdate={(prev, cur) =>
            prev.percentage_of_marks !== cur.percentage_of_marks
          }
          noStyle
        >
          {() => {
            const percentage = form.getFieldValue("percentage_of_marks");
            if (
              percentage === undefined ||
              percentage === null ||
              percentage === ""
            ) {
              return null;
            }
            const isEligible = Number(percentage) >= ELIGIBILITY_THRESHOLD;
            return (
              <Form.Item label="Eligibility Status">
                <Tag
                  color={isEligible ? "success" : "error"}
                  style={{ fontSize: 14, padding: "4px 12px" }}
                >
                  {isEligible ? "Eligible" : "Not Eligible"}
                </Tag>
              </Form.Item>
            );
          }}
        </Form.Item>
      </FormSection>

      <FormSection title="Educational Details (if the student is enrolled in College/University)">
        <Form.Item
          name="is_enrolled_in_college"
          label="Enrolled in College/University?"
          rules={[{ required: true, message: "Please select an option" }]}
        >
          <Radio.Group>
            <Radio value={true}>Yes</Radio>
            <Radio value={false}>No</Radio>
          </Radio.Group>
        </Form.Item>

        <Form.Item
          shouldUpdate={(prev, cur) =>
            prev.is_enrolled_in_college !== cur.is_enrolled_in_college
          }
        >
          {() =>
            form.getFieldValue("is_enrolled_in_college") ? (
              <>
                <Form.Item
                  name="present_institution_name"
                  label="Name of the Institution where the applicant is presently studying"
                  rules={[
                    {
                      required: true,
                      message: "Please enter the present institution name",
                    },
                  ]}
                >
                  <Input />
                </Form.Item>
                <Form.Item
                  name="present_institution_district"
                  label="District of the Present Institution"
                  rules={[
                    { required: true, message: "Please select the district" },
                  ]}
                >
                  <Select
                    placeholder="Select district"
                    options={DISTRICT_OPTIONS}
                    showSearch
                    optionFilterProp="label"
                  />
                </Form.Item>
              </>
            ) : null
          }
        </Form.Item>

        <Form.Item
          name="admission_via_samarth"
          label="Whether admission has been taken through Assam SAMARTH"
          rules={[{ required: true, message: "Please select an option" }]}
        >
          <Radio.Group>
            <Radio value={true}>Yes</Radio>
            <Radio value={false}>No</Radio>
          </Radio.Group>
        </Form.Item>

        <Form.Item
          shouldUpdate={(prev, cur) =>
            prev.admission_via_samarth !== cur.admission_via_samarth
          }
        >
          {() =>
            form.getFieldValue("admission_via_samarth") ? (
              <Form.Item
                name="samarth_registration_no"
                label="SAMARTH Registration Number"
                rules={[
                  {
                    required: true,
                    message: "Please enter the SAMARTH registration number",
                  },
                ]}
              >
                <Input />
              </Form.Item>
            ) : null
          }
        </Form.Item>

        <Form.Item
          name="is_betterment_reappearance"
          label="Whether Betterment and Reappearance category"
          rules={[{ required: true, message: "Please select an option" }]}
        >
          <Radio.Group>
            <Radio value={true}>Yes</Radio>
            <Radio value={false}>No</Radio>
          </Radio.Group>
        </Form.Item>

        <Form.Item
          shouldUpdate={(prev, cur) =>
            prev.is_betterment_reappearance !== cur.is_betterment_reappearance
          }
        >
          {() =>
            form.getFieldValue("is_betterment_reappearance") ? (
              <>
                <Form.Item
                  name="betterment_years"
                  label="Number of Year(s)"
                  rules={[
                    { required: true, message: "Please specify the year(s)" },
                  ]}
                >
                  <Input />
                </Form.Item>
                <Form.Item
                  name="betterment_reason"
                  label="Reason"
                  rules={[
                    { required: true, message: "Please specify the reason" },
                  ]}
                >
                  <Input.TextArea rows={3} />
                </Form.Item>
              </>
            ) : null
          }
        </Form.Item>
      </FormSection>
    </>
  );
};

export default ExamDetailsStep;
