"use client";

import nature from "@/assets/images/left panel img.png";
import {
  useLoginOtpSendMutation,
  useLoginOtpVerifyMutation,
} from "@/redux/apis/adminAuthApi";
import styles from "@/styles/AuthForm.module.scss";
import { ChannelType } from "@/utils/status";
import { MessageOutlined, WhatsAppOutlined } from "@ant-design/icons";
import { App, Button, Form, Input } from "antd";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const LoginPage: React.FC = () => {
  const { message } = App.useApp();

  const [mounted, setMounted] = useState(false);
  const [isLoading, setLoading] = useState(false);
  const [loadingChannel, setLoadingChannel] = useState<
    "SMS" | "WHATSAPP" | null
  >(null);
  const [step, setStep] = useState<"LOGIN" | "OTP">("LOGIN");
  const [user, setUser] = useState<{
    name: string;
    phone: string;
    email: string;
    token: string;
    channel?: any;
  }>({ name: "", phone: "", email: "", token: "" });

  const [loginOtpSend] = useLoginOtpSendMutation();
  const [loginOtpVerify] = useLoginOtpVerifyMutation();
  const [form] = Form.useForm();
  const router = useRouter();

  useEffect(() => {
    setMounted(true);
  }, []);

  const sendOtp = async (channel: any, channelKey: "SMS" | "WHATSAPP") => {
    try {
      await form.validateFields(["phone"]);
      const phone = form.getFieldValue("phone");
      setLoading(true);
      setLoadingChannel(channelKey);

      const payload = { phone, otpChannelId: channel };
      const result = await loginOtpSend(payload).unwrap();

      if (result.status) {
        message.success("Otp sent successfully");
        setUser({
          ...payload,
          name: "",
          email: "",
          token: result.data.token,
          channel,
        });
        setStep("OTP");
      } else {
        message.error(result.message);
      }
    } catch (err: any) {
      if (err?.errorFields) return; // validation error
      message.error(err?.data?.message);
    } finally {
      setLoading(false);
      setLoadingChannel(null);
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
        router.push("/admin/dashboard");
      } else {
        message.error(result.message);
      }
    } catch (err: any) {
      message.error(err?.data?.message);
    } finally {
      setLoading(false);
    }
  };

  if (!mounted) return null;

  return (
    <div className={styles.authContainer}>
      {/* ===== LEFT: Hero ===== */}
      <div className={styles.heroPanel}>
        <Image
          src={nature}
          alt=""
          className={styles.heroImage}
          priority
          fill
          sizes="50vw"
        />
      </div>

      {/* ===== RIGHT: Form ===== */}
      <div className={styles.formPanel}>
        <div className={styles.formInner}>
          {step === "LOGIN" && (
            <div className={styles.headingSection}>
              <h2 className={styles.authTitle}>Welcome</h2>
              <p className={styles.suggestionText}>
                Log in to your environmental dashboard
              </p>
            </div>
          )}

          {step === "OTP" && (
            <div className={styles.headingSection}>
              <h2 className={styles.authTitle}>Enter Verification Code</h2>
              <p className={styles.suggestionText}>
                We&apos;ve sent a 6-digit code to your mobile number.
              </p>
              <div className={styles.phoneSection}>
                <span className={styles.phoneNumber}>Sent to</span>
                <button
                  type="button"
                  className={styles.changeLink}
                  onClick={() => setStep("LOGIN")}
                >
                  {user?.phone ?? ""}
                </button>
              </div>
            </div>
          )}

          <Form
            form={form}
            layout="vertical"
            className={styles.formSection}
            onFinish={step === "OTP" ? verifyOtp : undefined}
            autoComplete="off"
          >
            {step === "LOGIN" && (
              <>
                <Form.Item
                  label="Phone Number"
                  name="phone"
                  className={styles.formItem}
                  rules={[
                    { required: true, message: "Mobile number is required" },
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
                    placeholder="+91  Enter your phone number"
                    className={styles.authInput}
                  />
                </Form.Item>

                <Form.Item>
                  <Button
                    type="primary"
                    size="large"
                    block
                    icon={<MessageOutlined />}
                    loading={loadingChannel === "SMS"}
                    disabled={isLoading}
                    onClick={() => sendOtp(ChannelType.SMS, "SMS")}
                  >
                    Send via SMS
                  </Button>
                </Form.Item>

                <div className={styles.divider}>or use</div>

                <button
                  type="button"
                  className={styles.whatsappBtn}
                  disabled={isLoading}
                  onClick={() => sendOtp(ChannelType.WHATSAPP, "WHATSAPP")}
                >
                  <WhatsAppOutlined style={{ color: "#25D366" }} />
                  {loadingChannel === "WHATSAPP"
                    ? "Sending..."
                    : "Send via WhatsApp"}
                </button>
              </>
            )}

            {step === "OTP" && (
              <>
                <Form.Item
                  name="otp"
                  label="Verification Code"
                  rules={[
                    { required: true },
                    { len: 6, message: "OTP must be 6 digits" },
                  ]}
                  className={styles.formItem}
                >
                  <Input.OTP inputMode="numeric" size="large" length={6} />
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
                    Verify &amp; Login
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
