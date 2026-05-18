"use client";

import {
  useLoginOtpSendMutation,
  useLoginOtpVerifyMutation,
} from "@/redux/apis/studentAuthApi";
import styles from "@/styles/AuthForm.module.scss";
import { ChannelType } from "@/utils/status";
import {
  CheckCircleFilled,
  MessageOutlined,
  WhatsAppOutlined,
} from "@ant-design/icons";
import { App, Button, Form, Input, Segmented } from "antd";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";

const LoginPage: React.FC = () => {
  const { message } = App.useApp();

  const [mounted, setMounted] = useState(false);
  const [isLoading, setLoading] = useState(false);
  const [initialValues, setInitialValues] = useState({});
  const [step, setStep] = useState<"LOGIN" | "OTP">("LOGIN");
  const [user, setUser] = useState<{
    name: string;
    phone: string;
    token: string;
  }>({ name: "", phone: "", token: "" });
  const [loginOtpSend] = useLoginOtpSendMutation();
  const [loginOtpVerify] = useLoginOtpVerifyMutation();
  const [form] = Form.useForm();
  const router = useRouter();
  const otpChannel = Form.useWatch("otpChannelId", form);

  useEffect(() => {
    setMounted(true);
  }, []);

  const sendOtp = async (payload: any) => {
    try {
      setLoading(true);
      console.log("result", payload);
      const result = await loginOtpSend(payload).unwrap();

      if (result.status) {
        message.success("Otp sent successfully");
        setUser({ ...payload, token: result.data.token });
        setStep("OTP");
      } else {
        message.error(result.message);
        // console.log("error 1", result.message);
      }
    } catch (err: any) {
      message.error(err?.data?.message);
      // console.log("error 2", err.data.message);
    } finally {
      setLoading(false);
    }
  };

  const verifyOtp = async (payload: any) => {
    try {
      setLoading(true);
      const result = await loginOtpVerify({
        ...payload,
        token: user.token,
      }).unwrap();
      if (result.status) {
        message.success("Login Successful");
        form.resetFields();
        router.push("/student/application");
      } else {
        message.error(result.message);
      }
    } catch (err: any) {
      message.error(err?.data?.message);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (payload: any) => {
    if (step === "LOGIN") {
      await sendOtp(payload);
    }

    if (step === "OTP") {
      await verifyOtp(payload);
    }
  };

  if (!mounted) {
    return null;
  }

  return (
    <div className={styles.authContainer}>
      <div className={styles.backgroundOverlay} />
      <div className={styles.heroContent}>
        <div className={styles.logo}>
          <h1 className={styles.logoText}>
            Provincialisation Management System (PMS)
          </h1>
        </div>

        <div>
          <h1 className={styles.heroTitle}>
            Digitising <br />
            <span className={styles.highlight}>
              Institutional and Teacher
            </span>{" "}
            <br />
            Provincialisation
          </h1>

          <div className={styles.features}>
            <div className={styles.featureItem}>
              <CheckCircleFilled className={styles.featureIcon} />
              <span className={styles.featureText}>Record Management</span>
            </div>
            <div className={styles.featureItem}>
              <CheckCircleFilled className={styles.featureIcon} />
              <span className={styles.featureText}>
                Eligibility Verification
              </span>
            </div>
            <div className={styles.featureItem}>
              <CheckCircleFilled className={styles.featureIcon} />
              <span className={styles.featureText}>Approval Workflow</span>
            </div>
          </div>
        </div>
      </div>

      <div className={styles.authCardWrapperLogin}>
        <div className={styles.authCard}>
          {step === "LOGIN" && (
            <>
              <div className={styles.headingSection}>
                <p className={styles.welcomeText}>Welcome back to PMS</p>
                <h2 className={styles.authTitle}>Access your Profile</h2>
                <p className={styles.suggestionText}>
                  Enter your registered email or phone number to continue
                </p>
              </div>
            </>
          )}
          {step === "OTP" && (
            <>
              <h5 className={styles.authTitle}>
                Enter the OTP sent to your phone number
              </h5>
              <div className={styles.phoneSection}>
                <span className={styles.phoneNumber}>
                  Verification code sent via{" "}
                  {otpChannel === ChannelType.WHATSAPP ? "WhatsApp" : "SMS"} to
                </span>
                <button className={styles.changeLink}>
                  {user?.phone ?? ""}
                </button>
              </div>
            </>
          )}

          <Form
            form={form}
            layout="vertical"
            className={styles.formSection}
            initialValues={initialValues}
            onFinish={handleSubmit}
            onFinishFailed={(error) => {}}
            autoComplete="off"
          >
            {step === "LOGIN" && (
              <>
                <Form.Item
                  label="Phone Number"
                  name="phone"
                  className={styles.formItem}
                  rules={[
                    {
                      required: true,
                      message: "Mobile number is required",
                    },
                    {
                      pattern: /^[6-9]\d{9}$/,
                      message: "Enter valid 10-digit mobile number",
                    },
                  ]}
                >
                  <Input
                    size="large"
                    type="tel"
                    inputMode="numeric"
                    pattern="[0-9]*"
                    maxLength={10}
                    placeholder="Enter your phone number"
                    className={styles.authInput}
                  />
                </Form.Item>

                <Form.Item
                  name="otpChannelId"
                  label="Send OTP via"
                  initialValue={ChannelType.SMS}
                >
                  <Segmented
                    block
                    size="large"
                    options={[
                      {
                        value: ChannelType.SMS,
                        label: (
                          <span>
                            <MessageOutlined
                              style={{
                                color: "#1677ff",
                                marginRight: 6,
                                padding: "12px 0",
                              }}
                            />
                            SMS
                          </span>
                        ),
                      },
                      {
                        value: ChannelType.WHATSAPP,
                        label: (
                          <span>
                            <WhatsAppOutlined
                              style={{
                                color: "#25D366",
                                marginRight: 6,
                                padding: "12px 0",
                              }}
                            />
                            WhatsApp
                          </span>
                        ),
                      },
                    ]}
                  />
                </Form.Item>

                <Form.Item>
                  <Button
                    type="primary"
                    size="large"
                    block
                    htmlType="submit"
                    loading={isLoading}
                    disabled={isLoading}
                  >
                    Continue
                  </Button>
                </Form.Item>
              </>
            )}

            {step === "OTP" && (
              <>
                <Form.Item
                  name="otp"
                  label="OTP"
                  rules={[
                    { required: true },
                    { len: 6, message: "OTP must be 6 digits" },
                  ]}
                  className={styles.formItem}
                >
                  <Input.OTP inputMode="numeric" size="large" />
                </Form.Item>
                <Form.Item>
                  <Button
                    type="primary"
                    size="large"
                    block
                    htmlType="submit"
                    loading={isLoading}
                    disabled={isLoading}
                  >
                    Verify
                  </Button>
                </Form.Item>
              </>
            )}
          </Form>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
