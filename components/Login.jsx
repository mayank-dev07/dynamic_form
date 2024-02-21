"use client";
import React, { useEffect, useState } from "react";
import { Form, Input, message } from "antd";

import { useRouter } from "next/navigation";
import { auth } from "@/app/firebase";
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  onAuthStateChanged,
} from "firebase/auth";

const setup = `.then((userCredential) => {console.log(userCredential); 
  router.push("/GenerateForm");
      })
      .catch((error) => {
        // const errorCode = error.code;
        const errorMessage = error.message;
        messageApi.error(errorMessage);
      });`;

const Login = () => {
  const [form] = Form.useForm();
  const router = useRouter();
  const [create, setcreate] = useState(false);
  const [messageApi, contextHolder] = message.useMessage();

  const onFinish = (value) => {
    console.log(value);
    if (create) {
      createUserWithEmailAndPassword(auth, value.email, value.password)
        .then((userCredential) => {
          console.log(userCredential);
          router.push("/GenerateForm");
        })
        .catch((error) => {
          // const errorCode = error.code;
          const errorMessage = error.message;
          messageApi.error(errorMessage);
        });
    } else {
      signInWithEmailAndPassword(auth, value.email, value.password)
        .then((userCredential) => {
          console.log(userCredential);
          router.push("/GenerateForm");
        })
        .catch((error) => {
          // const errorCode = error.code;
          const errorMessage = error.message;
          messageApi.error(errorMessage);
        });
    }
  };

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      console.log(user);
      if (user) {
        router.push("/GenerateForm");
      }
    });
  }, []);

  const changeMethod = () => {
    setcreate((prev) => !prev);
  };

  return (
    <>
      {contextHolder}
      <div className="w-full flex min-h-full  flex-col justify-center px-6 py-12 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
            {create ? "Create Account" : "Sign in"}
          </h2>
        </div>

        <div className="w-full flex flex-col justify-center items-center mt-10">
          <Form
            className="space-y-6 w-11/12 sm:w-8/12 md:w-6/12 lg:w-4/12 "
            form={form}
            layout="vertical"
            onFinish={onFinish}>
            <Form.Item
              name="email"
              label="Email"
              rules={[
                {
                  required: true,
                },
                {
                  type: "email",
                },
              ]}
              className="w-full">
              <Input placeholder="enter your email" />
            </Form.Item>

            <Form.Item
              name="password"
              label="Password"
              rules={[
                {
                  required: true,
                  whitespace: true,
                  message: "Please enter password",
                },
              ]}
              className="w-full">
              <Input.Password placeholder="enter your password" />
            </Form.Item>
            <div>
              <button
                type="submit"
                className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">
                {create ? "Create account" : "Sign in"}
              </button>
            </div>
          </Form>
          <p className="mt-4">
            {create ? "already have a account" : "dont have account"}
            <span
              className="text-indigo-600 cursor-pointer"
              onClick={changeMethod}>
              &nbsp; {create ? "sign in" : "create account"}
            </span>
          </p>
        </div>
      </div>
    </>
  );
};

export default Login;
