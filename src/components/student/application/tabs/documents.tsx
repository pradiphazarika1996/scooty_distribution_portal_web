import {
  useDeleteDocumentMutation,
  useGetDocumentsQuery,
  useUploadDocumentMutation,
} from "@/redux/apis/applicationApi";
import styles from "@/styles/ScholarshipForm.module.css";
import {
  ACCEPTED_FILE_TYPES,
  DOCUMENT_TYPES_ARRAY,
  MAX_FILE_SIZE_MB,
} from "@/utils/students/application";
import { DeleteOutlined, FileOutlined, InboxOutlined } from "@ant-design/icons";
import { message, Spin, Tag, Upload } from "antd";
import React, { useState } from "react";
import FormNavigation from "../form-navigation";

const { Dragger } = Upload;

interface DocumentsFormProps {
  onNext: () => void;
  onPrevious: () => void;
  isSaving?: boolean;
}

const DocumentsForm: React.FC<DocumentsFormProps> = ({
  onNext,
  onPrevious,
  isSaving = false,
}) => {
  const { data: docsData, isLoading: isDocsLoading } = useGetDocumentsQuery();
  const [uploadDocument, { isLoading: isUploading }] =
    useUploadDocumentMutation();
  const [deleteDocument] = useDeleteDocumentMutation();
  const [errorKeys, setErrorKeys] = useState<Set<number>>(new Set());

  const uploadedDocs: any[] = docsData?.documents ?? [];

  const getUploadedDoc = (docTypeKey: number) =>
    uploadedDocs.find((doc: any) => doc.doc_type === docTypeKey);

  const handleUpload = async (file: File, docType: number) => {
    const isValidType = /\.(pdf|jpg|jpeg|png)$/i.test(file.name);
    if (!isValidType) {
      message.error("Only PDF, JPG, and PNG files are allowed.");
      return false;
    }
    const isWithinSize = file.size / 1024 / 1024 < MAX_FILE_SIZE_MB;
    if (!isWithinSize) {
      message.error(`File must be smaller than ${MAX_FILE_SIZE_MB}MB.`);
      return false;
    }

    const formData = new FormData();
    formData.append("file", file);
    formData.append("docType", String(docType));

    try {
      await uploadDocument(formData).unwrap();
      setErrorKeys((prev) => {
        const next = new Set(prev);
        next.delete(docType);
        return next;
      });
      message.success("Document uploaded");
    } catch {
      message.error("Upload failed. Please try again.");
    }

    return false;
  };

  const handleDelete = async (docType: number) => {
    try {
      await deleteDocument({ docType }).unwrap();
      message.success("Document removed");
    } catch {
      message.error("Failed to remove document.");
    }
  };

  const handleNext = () => {
    const requiredTypes = DOCUMENT_TYPES_ARRAY.filter((d) => d.required);
    const missingKeys = requiredTypes
      .filter((d) => !getUploadedDoc(d.key))
      .map((d) => d.key);

    if (missingKeys.length > 0) {
      setErrorKeys(new Set(missingKeys));
      return;
    }

    setErrorKeys(new Set());
    onNext();
  };

  if (isDocsLoading) {
    return (
      <div style={{ display: "flex", justifyContent: "center", padding: 60 }}>
        <Spin size="large" />
      </div>
    );
  }

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
          {DOCUMENT_TYPES_ARRAY.map((docType) => {
            const uploaded = getUploadedDoc(docType.key);
            const hasError = errorKeys.has(docType.key);

            return (
              <div
                key={docType.key}
                className={`${styles.uploadCard} ${hasError ? styles.uploadCardError : ""}`}
              >
                <div className={styles.uploadCardHeader}>
                  <span className={styles.uploadCardLabel}>
                    {docType.label}
                  </span>
                  <span
                    style={{ display: "flex", alignItems: "center", gap: 8 }}
                  >
                    {uploaded && (
                      <Tag color="success" style={{ margin: 0 }}>
                        Uploaded
                      </Tag>
                    )}
                    {docType.required && !uploaded && (
                      <span className={styles.requiredBadge}>Required</span>
                    )}
                  </span>
                </div>
                <span className={styles.uploadCardDesc}>
                  {docType.description}
                </span>

                {uploaded ? (
                  <div className={styles.uploadedFile}>
                    <div className={styles.uploadedFileInfo}>
                      <FileOutlined style={{ color: "var(--primary)" }} />
                      <span className={styles.uploadedFileName}>
                        {uploaded.file_name}
                      </span>
                    </div>
                    <button
                      className={styles.uploadedFileDelete}
                      onClick={() => handleDelete(docType.key)}
                      type="button"
                      title="Remove file"
                    >
                      <DeleteOutlined />
                    </button>
                  </div>
                ) : (
                  <Dragger
                    accept={ACCEPTED_FILE_TYPES}
                    beforeUpload={(file) =>
                      handleUpload(file as File, docType.key)
                    }
                    showUploadList={false}
                    disabled={isUploading}
                    style={{ marginTop: 8 }}
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
                      {isUploading
                        ? "Uploading..."
                        : "Drag file here or click to browse"}
                    </p>
                  </Dragger>
                )}

                {hasError && (
                  <span className={styles.uploadCardErrorText}>
                    Please upload {docType.label}
                  </span>
                )}
              </div>
            );
          })}
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
