"use client";
import "./globals.css";
import { Button, Drawer } from "antd";
import { CloseOutlined, MenuOutlined } from "@ant-design/icons";
import { LogoutOutlined } from "@ant-design/icons";
import { useLayoutEffect, useState } from "react";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { auth } from "./firebase";
import { usePathname, useRouter } from "next/navigation";

export default function RootLayout({ children }) {
  const router = useRouter();
  const pathName = usePathname();
  const [open, setOpen] = useState(false);
  const [logged, setLogged] = useState({
    email: "",
    id: "",
  });

  const showDrawer = () => {
    setOpen(true);
  };
  const onClose = () => {
    setOpen(false);
  };

  const logout = () => {
    signOut(auth)
      .then(() => {
        router.push("/");
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useLayoutEffect(() => {
    onAuthStateChanged(auth, (user) => {
      console.log(user);
      if (user) {
        setLogged({ ...logged, email: user.email, id: user.uid });
      } else {
        router.push("/");
      }
    });
  }, []);

  const showForms = () => {
    console.log(pathName);
    if (pathName == "/GenerateForm") {
      router.push("/FormTable");
    } else {
      router.push("/GenerateForm");
    }
    onClose();
  };

  return (
    <html lang="en">
      <body className="w-full h-full">
        <header className="mt-8">
          <Drawer
            title={
              <>
                <div className="w-full flex justify-between items-center text-lg">
                  <div>Details</div>
                  <CloseOutlined onClick={onClose} />
                </div>
              </>
            }
            placement="left"
            closable={false}
            onClose={onClose}
            open={open}
            key="left">
            <>
              <div className="flex flex-col w-full text-lg">
                <div className="w-full flex">
                  <span className="font-bold">Email:</span>
                  <span>&nbsp;{logged.email}</span>
                </div>
                <div className="w-full flex mt-4">
                  <span className="font-bold">Id:</span>
                  <span>&nbsp;{logged.id}</span>
                </div>
              </div>
              <div className="w-full flex justify-center items-center py-12">
                <Button
                  className="border-2 border-black bg-black text-white p-2 h-full"
                  onClick={showForms}>
                  {pathName == "/GenerateForm"
                    ? "View Previous forms"
                    : "Generate Form"}
                </Button>
              </div>
            </>
          </Drawer>

          <div className="w-full flex justify-between px-4">
            <MenuOutlined
              onClick={showDrawer}
              className="cursor-pointer text-xl items-start"
            />

            <div className="mb-5 text-xl font-serif font-bold w-full text-center">
              Dynamic Form
            </div>
            <div className="flex justify-end ">
              <LogoutOutlined
                onClick={logout}
                className="cursor-pointer text-xl items-start"
              />
            </div>
            {/* </div> */}
          </div>
        </header>
        <section>{children}</section>
      </body>
    </html>
  );
}
