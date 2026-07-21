// "use client";
// import StudentForm from "@/components/student/applications/StudentForm";

// const StudentPage = () => {
//   return <StudentForm />;
// };

// export default StudentPage;

"use client";
import { useGetApplicationQuery } from "@/redux/apis/applicationApi";
import { APPLICATION_STATUS } from "@/types/students/application";
import { Alert, Spin } from "antd";
import ApplicationStatus from "@/components/student/meritAward/ApplicationStatus";
import StudentForm from "@/components/student/applications/StudentForm";
import styles from "@/components/student/applications/student.module.scss";

const StudentPage = () => {
  const { data, isLoading, isError } = useGetApplicationQuery();
  const application = data?.application;

  if (isLoading) {
    return (
      <div className={styles.centered}>
        <Spin size="large" />
      </div>
    );
  }

  if (isError) {
    return (
      <Alert
        type="error"
        message="Failed to load your application"
        description="Please refresh the page or try again later."
        showIcon
      />
    );
  }

  const isSubmitted =
    !!application?.application_number ||
    application?.application_status === APPLICATION_STATUS.SUBMITTED;

  // Once submitted, the form is never shown again — only the status view.
  if (isSubmitted && application) {
    return <ApplicationStatus application={application} />;
  }

  return <StudentForm application={application} />;
};

export default StudentPage;