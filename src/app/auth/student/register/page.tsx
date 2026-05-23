"use client";

// import Banner from "@/assets/images/screen.png";
import {
  useRegisterOtpSendMutation,
  useRegisterOtpVerifyMutation,
} from "@/redux/apis/studentAuthApi";
import styles from "@/styles/AuthForm.module.scss";
import { ChannelType } from "@/utils/status";
import {
  CheckCircleFilled,
  LeftOutlined,
  MessageOutlined,
} from "@ant-design/icons";
import Link from "next/link";

import { App, Button, Form, Input, Spin } from "antd";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { getImageUrl } from "@/utils/imageUrls";
type Step = "PHONE" | "OTP";

const RegisterPage: React.FC = () => {
  const { message } = App.useApp();

  const [mounted, setMounted] = useState(false);
  const [isLoading, setLoading] = useState(false);
  const [step, setStep] = useState<Step>("PHONE");
  const [phone, setPhone] = useState("");
  const [otpToken, setOtpToken] = useState("");
  const [redirecting, setRedirecting] = useState(false);

  const [registerOtpSend] = useRegisterOtpSendMutation();
  const [registerOtpVerify] = useRegisterOtpVerifyMutation();
  const [form] = Form.useForm();
  const router = useRouter();
  const otpChannel = Form.useWatch("otpChannelId", form);

  useEffect(() => {
    setMounted(true);
  }, []);

  const sendOtp = async (values: { phone: string; otpChannelId: string }) => {
    try {
      setLoading(true);

      let valuesToSend = {
        phone: values.phone,
        otpChannelId: ChannelType.SMS,
      };

      const result = await registerOtpSend(valuesToSend).unwrap();
      if (result.status) {
        message.success("OTP sent successfully");
        setPhone(values.phone);
        setOtpToken(result.data.token);
        setStep("OTP");
      } else {
        message.error(result.message);
      }
    } catch (err: any) {
      message.error(err?.data?.message ?? "Failed to send OTP");
    } finally {
      setLoading(false);
    }
  };

  const verifyOtp = async (values: { otp: string }) => {
    try {
      setLoading(true);
      const result = await registerOtpVerify({
        otp: values.otp,
        token: otpToken,
      }).unwrap();
      if (result.status) {
        message.success("Registration successful");
        form.resetFields();
        setRedirecting(true);
        router.push("/student/application");
      } else {
        message.error(result.message);
      }
    } catch (err: any) {
      message.error(err?.data?.message ?? "OTP verification failed");
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (values: any) => {
    if (step === "PHONE") await sendOtp(values);
    if (step === "OTP") await verifyOtp(values);
  };

  if (!mounted) return null;

  if (redirecting) {
    return (
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          height: "100vh",
          gap: 16,
          background: "var(--background)",
        }}
      >
        <Spin size="large" />
        <span
          style={{
            fontFamily: "var(--font-family)",
            fontSize: "var(--font-size-base)",
            color: "var(--on-surface-variant)",
          }}
        >
          Setting up your account...
        </span>
      </div>
    );
  }

  return (
    <div className={styles.authContainer}>
      <div className={styles.backgroundOverlay}>
        <Image
          src={getImageUrl("screen.png")}
          alt="Background" layout="fill" objectFit="cover" />
      </div>
      <div className={styles.heroContent}>
        <div className={styles.logo}>
          <h1 className={styles.logoText}>
            MAC Scholarship Portal - Empowering the Mising Community
          </h1>
        </div>

        <div>
          <h1 className={styles.heroTitle}>
            Empowering <br />
            <span className={styles.highlight}>
              Students of Assam Through
            </span>{" "}
            <br />
            Merit-Based Financial Aid
          </h1>
          <div className={styles.features}>
            <div className={styles.featureItem}>
              <CheckCircleFilled className={styles.featureIcon} />
              <span className={styles.featureText}>Scholarship Tracking</span>
            </div>
            <div className={styles.featureItem}>
              <CheckCircleFilled className={styles.featureIcon} />
              <span className={styles.featureText}>Document Verification</span>
            </div>
            <div className={styles.featureItem}>
              <CheckCircleFilled className={styles.featureIcon} />
              <span className={styles.featureText}>Disbursement Status</span>
            </div>
          </div>
        </div>
      </div>

      <div className={styles.authCardWrapperLogin}>
        <div className={styles.authCard}>
          <Link
            href="/"
            style={{ position: "absolute", top: "50px", left: "40px" }}
          >
            <LeftOutlined style={{ marginRight: "10px" }} />
            Back to Home
          </Link>
          {step === "PHONE" && (
            <div className={styles.headingSection}>
              <p className={styles.welcomeText}>
                {" "}
                WELCOME TO MAC SCHOLARSHIP PORTAL{" "}
              </p>
              <h2 className={styles.authTitle}>Create your Account</h2>
              <p className={styles.suggestionText}>
                Enter your phone number to get started
              </p>
            </div>
          )}

          {step === "OTP" && (
            <div className={styles.headingSection}>
              <h5 className={styles.authTitle}>
                Enter the OTP sent to your phone number
              </h5>
              <div className={styles.phoneSection}>
                <span className={styles.phoneNumber}>
                  Verification code sent via{" "}
                  {otpChannel === ChannelType.WHATSAPP ? "WhatsApp" : "SMS"} to
                </span>
                <button
                  className={styles.changeLink}
                  onClick={() => setStep("PHONE")}
                >
                  {phone}
                </button>
              </div>
            </div>
          )}

          <Form
            form={form}
            layout="vertical"
            className={styles.formSection}
            onFinish={handleSubmit}
            onFinishFailed={() => {}}
            autoComplete="off"
          >
            {step === "PHONE" && (
              <>
                <Form.Item
                  label="Phone Number"
                  name="phone"
                  className={styles.formItem}
                  rules={[
                    { required: true, message: "Phone number is required" },
                    {
                      pattern: /^[6-9]\d{9}$/,
                      message: "Enter a valid 10-digit mobile number",
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

                {/* <Form.Item
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
                </Form.Item> */}

                <Form.Item>
                  <Button
                    type="primary"
                    size="large"
                    block
                    htmlType="submit"
                    loading={isLoading}
                    disabled={isLoading}
                  >
                    Get OTP
                  </Button>
                  <p className={styles.smsNotice}>
                    <MessageOutlined className={styles.smsIcon} /> OTP will be
                    sent via SMS to your mobile number
                  </p>
                </Form.Item>
              </>
            )}

            {step === "OTP" && (
              <>
                <Form.Item
                  name="otp"
                  label="OTP"
                  className={styles.formItem}
                  rules={[
                    { required: true, message: "OTP is required" },
                    { len: 6, message: "OTP must be 6 digits" },
                  ]}
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
                    Verify & Register
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

export default RegisterPage;
