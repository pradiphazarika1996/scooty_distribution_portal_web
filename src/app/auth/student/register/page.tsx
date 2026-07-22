"use client";

import {
  useRegisterOtpSendMutation,
  useRegisterOtpVerifyMutation,
} from "@/redux/apis/studentAuthApi";
import styles from "@/styles/AuthForm.module.scss";
import { ChannelType } from "@/utils/status";
import { LeftOutlined, MessageOutlined } from "@ant-design/icons";
import Link from "next/link";

import Banner from "@/assets/images/scooty.png";
import { App, Button, Form, Input, Spin } from "antd";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
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
  const sendOtp = async (values: {
    phone: string;
    registration_no: string;
    roll: string;
    number: string;
    // institution_code: string;
  }) => {
    try {
      setLoading(true);

      const valuesToSend = {
        phone: values.phone,
        otpChannelId: ChannelType.SMS,
        registration_no: values.registration_no,
        roll: values.roll,
        number: values.number,
        // institution_code: values.institution_code,
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
        router.push("/student");
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
          <Link
            href="/"
            // style={{ position: "absolute", top: "50px", left: "40px" }}
          >
            <LeftOutlined style={{ marginRight: "10px" }} />
            Back to Home
          </Link>
          {step === "PHONE" && (
            <div className={styles.headingSection}>
              <p className={styles.welcomeText}>
                {/* Scooty Support for Eligible Beneficiaries */}
              </p>
              <h2 className={styles.authTitle}>Create your Account</h2>
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
                {/* NEW: the 4 fields required to verify against
                    StudentLookup before an OTP is even sent. */}
                <Form.Item
                  label="Registration Number"
                  name="registration_no"
                  className={styles.formItem}
                  rules={[
                    {
                      required: true,
                      message: "Registration Number is required",
                    },
                  ]}
                >
                  <Input
                    size="large"
                    placeholder="As printed on your HS marksheet"
                    className={styles.authInput}
                  />
                </Form.Item>

                <Form.Item
                  label="Roll"
                  name="roll"
                  className={styles.formItem}
                  rules={[{ required: true, message: "Roll is required" }]}
                >
                  <Input
                    size="large"
                    placeholder="Enter your Roll"
                    className={styles.authInput}
                  />
                </Form.Item>

                <Form.Item
                  label="No."
                  name="number"
                  className={styles.formItem}
                  rules={[{ required: true, message: "No. is required" }]}
                >
                  <Input
                    size="large"
                    placeholder="Enter your No."
                    className={styles.authInput}
                  />
                </Form.Item>

                {/* <Form.Item
                  label="Institution Code"
                  name="institution_code"
                  className={styles.formItem}
                  rules={[
                    {
                      required: true,
                      message: "Institution Code is required",
                    },
                  ]}
                >
                  <Input
                    size="large"
                    placeholder="As printed on your HS marksheet"
                    className={styles.authInput}
                  />
                </Form.Item> */}

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
