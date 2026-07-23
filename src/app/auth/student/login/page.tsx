"use client";

import Banner from "@/assets/images/scooty.png";
import {
  useLoginOtpSendMutation,
  useLoginOtpVerifyMutation,
} from "@/redux/apis/studentAuthApi";
import styles from "@/styles/AuthForm.module.scss";
import { ChannelType } from "@/utils/status";
import { LeftOutlined, MessageOutlined } from "@ant-design/icons";
import { App, Button, Form, Input, Spin } from "antd";
import Image from "next/image";
import Link from "next/link";
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
  const [redirecting, setRedirecting] = useState(false);

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
      let valuesToSend = {
        phone: payload.phone,
        otpChannelId: ChannelType.SMS,
      };
      const result = await loginOtpSend(valuesToSend).unwrap();

      if (result.status) {
        message.success("Otp sent successfully");
        setUser({ ...payload, token: result.data.token });
        setStep("OTP");
      } else {
        message.error(result.message);
      }
    } catch (err: any) {
      message.error(err?.data?.message);
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
        setRedirecting(true);
        router.push("/student");
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
          src={Banner}
          alt="Background"
          fill
          sizes="60vw"
          style={{ objectFit: "cover", objectPosition: "left center" }}
          priority
        />
      </div>

      <div className={styles.authCardWrapperLogin}>
        <div className={styles.authCard}>
          <Link href="/" className={styles.backToHome}>
            <LeftOutlined style={{ marginRight: "10px" }} />
            Back to Home
          </Link>
          {step === "LOGIN" && (
            <>
              <div className={styles.headingSection}>
                <p className={styles.welcomeText}>
                  Scooty Support for Eligible Beneficiaries
                </p>
                <h2 className={styles.authTitle}>Sign In to Your Account</h2>
                <p className={styles.suggestionText}>
                  Enter your registered mobile number to track your application
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
                    Verify & Login
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
