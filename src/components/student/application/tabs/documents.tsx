import styles from "@/styles/ScholarshipForm.module.css";
import {
  ACCEPTED_FILE_TYPES,
  DOCUMENT_TYPES,
  MAX_FILE_SIZE_MB,
} from "@/utils/students/scholarship";
import { InboxOutlined } from "@ant-design/icons";
import type { UploadFile } from "antd";
import { Form, Upload, message } from "antd";
import type { UploadChangeParam } from "antd/es/upload";
import React from "react";
import FormNavigation from "../form-navigation";

const { Dragger } = Upload;

interface DocumentsFormProps {
  onNext: () => void;
  onPrevious: () => void;
  isSaving?: boolean;
}

const beforeUpload = (file: File): boolean | string => {
  const isValidType = /\.(pdf|jpg|jpeg|png)$/i.test(file.name);
  if (!isValidType) {
    message.error("Only PDF, JPG, and PNG files are allowed.");
    return Upload.LIST_IGNORE;
  }
  const isWithinSize = file.size / 1024 / 1024 < MAX_FILE_SIZE_MB;
  if (!isWithinSize) {
    message.error(`File must be smaller than ${MAX_FILE_SIZE_MB}MB.`);
    return Upload.LIST_IGNORE;
  }
  return false;
};

const normFile = (e: UploadChangeParam | UploadFile[]) => {
  if (Array.isArray(e)) return e;
  return e?.fileList;
};

const DocumentsForm: React.FC<DocumentsFormProps> = ({
  onNext,
  onPrevious,
  isSaving = false,
}) => {
  const form = Form.useFormInstance();

  const handleNext = async () => {
    try {
      const requiredFields = DOCUMENT_TYPES.filter((d) => d.required).map(
        (d) => ["documents", d.key],
      );
      await form.validateFields(requiredFields);
      onNext();
    } catch {
      // validation errors shown by antd
    }
  };

  return (
    <>
      <div className={styles.sectionCard}>
        <h3 className={styles.sectionTitle}>Upload Documents</h3>
        <p
          style={{
            fontFamily: "var(--font-family)",
            fontSize: "var(--font-size-sm)",
            color: "var(--on-surface-variant)",
            marginBottom: "var(--space-lg)",
          }}
        >
          Accepted formats: PDF, JPG, PNG — Max {MAX_FILE_SIZE_MB}MB per file.
          Fields marked with * are mandatory.
        </p>

        <div className={styles.formGrid}>
          {DOCUMENT_TYPES.map((docType) => (
            <div key={docType.key} className={styles.uploadCard}>
              <div className={styles.uploadCardHeader}>
                <span className={styles.uploadCardLabel}>{docType.label}</span>
                {docType.required && (
                  <span className={styles.requiredBadge}>Required</span>
                )}
              </div>
              <span className={styles.uploadCardDesc}>
                {docType.description}
              </span>
              <Form.Item
                name={["documents", docType.key]}
                valuePropName="fileList"
                getValueFromEvent={normFile}
                rules={
                  docType.required
                    ? [
                        {
                          required: true,
                          message: `Please upload ${docType.label}`,
                        },
                      ]
                    : undefined
                }
                style={{ marginBottom: 0, marginTop: 8 }}
              >
                <Dragger
                  accept={ACCEPTED_FILE_TYPES}
                  beforeUpload={beforeUpload}
                  maxCount={1}
                  listType="text"
                >
                  <p className="ant-upload-drag-icon">
                    <InboxOutlined
                      style={{ color: "var(--primary)", fontSize: 28 }}
                    />
                  </p>
                  <p
                    style={{
                      fontFamily: "var(--font-family)",
                      fontSize: "var(--font-size-xs)",
                      color: "var(--on-surface-variant)",
                    }}
                  >
                    Drag file here or click to browse
                  </p>
                </Dragger>
              </Form.Item>
            </div>
          ))}
        </div>
      </div>

      <FormNavigation
        onPrevious={onPrevious}
        onNext={handleNext}
        loading={isSaving}
      />
    </>
  );
};

export default DocumentsForm;
