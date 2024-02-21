"use client";
import "./globals.css";
import { Button, Drawer, Timeline } from "antd";
import { CloseOutlined, MenuOutlined } from "@ant-design/icons";
import { LogoutOutlined } from "@ant-design/icons";
import { useLayoutEffect, useRef, useState } from "react";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { auth, db } from "./firebase";
import { usePathname, useRouter } from "next/navigation";
import { collection, getDocs } from "firebase/firestore";
import Link from "next/link";

export default function RootLayout({ children }) {
  const [forms] = useState([]);
  const [created, setCreated] = useState([]);
  let ref = useRef(false);
  const router = useRouter();
  const pathName = usePathname();
  const [open, setOpen] = useState(false);
  const [logged, setLogged] = useState({
    email: "",
    id: "",
  });

  const flatten = (array) => {
    let result = [];
    for (const item of array) {
      if (Array.isArray(item)) {
        result = result.concat(flatten(item));
      } else {
        result.push(item);
      }
    }
    return result;
  };

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
    const fetch = async () => {
      const querySnapshot = await getDocs(collection(db, "dynamic_form"));
      onAuthStateChanged(auth, (user) => {
        console.log(user);
        if (user) {
          querySnapshot.docs.map((doc) => {
            let obj = doc.data().uploadToFirebase;
            forms.push(Object.keys(obj));

            const nestedArray = forms;
            const flatArray = flatten(nestedArray);

            const arr = flatArray;
            const uniqueSet = new Set(arr);
            setCreated(() => [...uniqueSet]);
          });
        }
      });
    };
    if (!ref.current) {
      fetch();
      ref.current = true;
    }
  }, []);

  useLayoutEffect(() => {
    console.log(pathName);
    onAuthStateChanged(auth, (user) => {
      console.log(user);

      if (user) {
        setLogged({ ...logged, email: user.email, id: user.uid });
      } else {
        router.push("/");
      }
    });
  }, [pathName]);

  const showForms = () => {
    console.log(pathName);
    router.push("/GenerateForm");
    onClose();
  };

  return (
    <html lang="en">
      <body className="w-full h-full">
        {pathName == "/" ? (
          <></>
        ) : (
          <header className="mt-8 md:px-20">
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
                  {pathName == "/GenerateForm" ? (
                    <></>
                  ) : (
                    <Button
                      className="border-2 border-black bg-black text-white p-2 h-full"
                      onClick={showForms}>
                      Generate Form
                    </Button>
                  )}
                </div>
                <div>
                  <Timeline>
                    {created.map(
                      (item, index) =>
                        item !== "id" && (
                          <Timeline.Item
                            key={index}
                            className="cursor-pointer w-max !text-lg"
                            onClick={onClose}>
                            <Link href={`/GenerateForm/${item}`}>{item}</Link>
                          </Timeline.Item>
                        )
                    )}
                  </Timeline>
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
        )}
        <section>{children}</section>
      </body>
    </html>
  );
}
