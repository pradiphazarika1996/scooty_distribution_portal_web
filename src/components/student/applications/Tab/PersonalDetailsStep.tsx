// import { GENDER_OPTIONS } from "@/types/students/application";
// import { DISTRICT_OPTIONS } from "@/utils/students/student";
// import { Form, FormInstance, Input, Select } from "antd";
// import FormSection from "../FormSection/FormSection";

// interface PersonalDetailsStepProps {
//   form: FormInstance;
//   disabled?: boolean;
// }

// const PersonalDetailsStep = ({}: PersonalDetailsStepProps) => {
//   return (
//     <FormSection title="Applicant Information">
//       <Form.Item
//         name="phone"
//         label="Phone No"
//         rules={[
//           { required: true, message: "Please enter phone number" },
//           {
//             pattern: /^\d{10}$/,
//             message: "Phone number must be 10 digits",
//           },
//         ]}
//       >
//         <Input placeholder="10-digit mobile number" maxLength={10} disabled />
//       </Form.Item>

//       <Form.Item
//         name="name"
//         label="Name of the Applicant"
//         rules={[{ required: true, message: "Please enter your name" }]}
//       >
//         <Input placeholder="Full name as per HS marksheet" />
//       </Form.Item>
//       <Form.Item
//         name="gender_id"
//         label="Gender"
//         rules={[{ required: true, message: "Please select your gender" }]}
//       >
//         <Select placeholder="Select Gender" options={GENDER_OPTIONS} />
//       </Form.Item>
//       <Form.Item
//         name="father_name"
//         label="Father's Name"
//         rules={[{ required: true, message: "Please enter father's name" }]}
//       >
//         <Input />
//       </Form.Item>
//       <Form.Item
//         name="mother_name"
//         label="Mother's Name"
//         rules={[{ required: true, message: "Please enter Mothers's name" }]}
//       >
//         <Input />
//       </Form.Item>

//       <Form.Item
//         name="email"
//         label="E-mail ID"
//         rules={[{ type: "email", message: "Please enter your e-mail" }]}
//       >
//         <Input />
//       </Form.Item>

//       <Form.Item
//         name="district_id"
//         label="District of Residence"
//         rules={[{ required: true, message: "Please select your district" }]}
//       >
//         <Select
//           placeholder="Select district"
//           options={DISTRICT_OPTIONS}
//           showSearch
//           optionFilterProp="label"
//         />
//       </Form.Item>
//     </FormSection>
//   );
// };

// export default PersonalDetailsStep;

import { GENDER_OPTIONS } from "@/types/students/application";
import { DISTRICT_OPTIONS } from "@/utils/students/student";
import { Form, FormInstance, Input, Select } from "antd";
import FormSection from "../FormSection/FormSection";

interface PersonalDetailsStepProps {
  form: FormInstance;
  disabled?: boolean;
}

// FIXED: was `({}: PersonalDetailsStepProps)`, which discarded every prop
// including `disabled` — that's why nothing was locking regardless of what
// was passed in from the parent. Now actually destructured and used below.
const PersonalDetailsStep = ({ disabled }: PersonalDetailsStepProps) => {
  return (
    <FormSection title="Applicant Information">
      <Form.Item
        name="phone"
        label="Phone No"
        rules={[
          { required: true, message: "Please enter phone number" },
          {
            pattern: /^\d{10}$/,
            message: "Phone number must be 10 digits",
          },
        ]}
      >
        <Input placeholder="10-digit mobile number" maxLength={10} disabled />
      </Form.Item>

      {/* LOCKED — from StudentLookup.candidate_name */}
      <Form.Item
        name="name"
        label="Name of the Applicant"
        rules={[{ required: true, message: "Please enter your name" }]}
      >
        <Input
          placeholder="Full name as per HS marksheet"
          disabled={disabled}
        />
      </Form.Item>

      {/* LOCKED — from StudentLookup.gender */}
      <Form.Item
        name="gender_id"
        label="Gender"
        rules={[{ required: true, message: "Please select your gender" }]}
      >
        <Select
          placeholder="Select Gender"
          options={GENDER_OPTIONS}
          disabled={disabled}
        />
      </Form.Item>

      {/* LOCKED — from StudentLookup.father_name */}
      <Form.Item
        name="father_name"
        label="Father's Name"
        rules={[{ required: true, message: "Please enter father's name" }]}
      >
        <Input disabled={disabled} />
      </Form.Item>

      {/* EDITABLE — StudentLookup has no mother_name field */}
      <Form.Item
        name="mother_name"
        label="Mother's Name"
        rules={[{ required: true, message: "Please enter Mothers's name" }]}
      >
        <Input />
      </Form.Item>

      {/* EDITABLE — not present in StudentLookup */}
      <Form.Item
        name="email"
        label="E-mail ID"
        rules={[{ type: "email", message: "Please enter your e-mail" }]}
      >
        <Input />
      </Form.Item>

      {/* EDITABLE — student's residence district, distinct from the
          institution's district (which IS locked, in ExamDetailsStep) */}
      <Form.Item
        name="district_id"
        label="District of Residence"
        rules={[{ required: true, message: "Please select your district" }]}
      >
        <Select
          placeholder="Select district"
          options={DISTRICT_OPTIONS}
          showSearch
          optionFilterProp="label"
        />
      </Form.Item>
    </FormSection>
  );
};

export default PersonalDetailsStep;
