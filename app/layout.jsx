"use client";
import "./globals.css";
import { Button, Drawer, Timeline } from "antd";
import { CloseOutlined, MenuOutlined } from "@ant-design/icons";
import { LogoutOutlined } from "@ant-design/icons";
import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { auth, db } from "./firebase";
import { usePathname, useRouter } from "next/navigation";
import { collection, getDocs } from "firebase/firestore";
import Link from "next/link";
import useStore from "@/components/zustand";
import { getDatabase ,ref, onValue,} from "firebase/database";

export default function RootLayout({ children }) {
  const [forms, setForm] = useState([]);
  const form = useStore((state) => state.form);
  const setform = useStore((state) => state.setForm);
  const setAdmin = useStore((state) => state.setAdmin);
    const setOption = useStore((state)=> state.setOption);
  const admin = useStore((state) => state.admin);
  let Ref = useRef(false);
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
    console.log(admin);
    fetch()
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

   const setOptions =()=>{
    const db = getDatabase();
    const starCountRef = ref(db, "users/");
    console.log(starCountRef);
    onValue(starCountRef, (snapshot) => {
      console.log(snapshot);
      const data = snapshot.val();
      setOption(Object.values(data));
      console.log(data)
    });
  }

  const fetch = async () => {
    const querySnapshot = await getDocs(collection(db, "dynamic_form"));
    try{

      onAuthStateChanged(auth, (user) => {
        if (user) {
          setLogged({ ...logged, email: user.email, id: user.uid })
        console.log(user.uid);
        
        setForm([]);
        querySnapshot.docs.map((doc) => {
          console.log(doc.data().uploadToFirebase);
          
          let obj = doc.data().uploadToFirebase;
          
          setForm([])
          if (doc.data().uploadToFirebase.id == user.uid) {
            console.log("i")
            forms.push(Object.keys(obj));
            console.log(forms);
            
            const nestedArray = forms;
            const flatArray = flatten(nestedArray);
            
            const arr = flatArray;
            const uniqueSet = new Set(arr);
            setform([...uniqueSet]);
          } 
          if (user.uid === "OiC6nmPb6vhYqxTGLeMYlBbrdwr2") {
          setAdmin(true);
          setOptions()
        } else {
          setAdmin(false);
        }
        });
      }
    });
  }
  catch{
    console.log(error)
  }
  };
  useLayoutEffect(() => {
    if (!Ref.current) {
      console.log("t")
      fetch();
      Ref.current = true;
    }
  }, []);


  const showForms = () => {
    router.push("/GenerateForm");
    onClose();
  };

//   const allot= ()=>{
//     setOpen(false);
// router.push("/Allocate")
//   }


  return (
    <html lang="en">
      <body className="w-full min-h-screen ">
        {pathName == "/" ? (
          <></>
        ) : (
          <header className="flex py-8 h-full md:px-20">
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
              key="left"
            >
              <>
                <div className="flex flex-col w-full text-lg">
                  <div className="w-full flex">
                    <span className="font-bold">Email:</span>
                    <span>&nbsp;{logged.email}</span>
                  </div>
                </div>
                <div className="w-full flex justify-center items-center py-12 gap-5">
                  {admin && (
                    <></>
                    // <Button
                    //   className="border-2 border-black bg-black text-white p-2 h-full"
                    //   onClick={() => allot()}
                    // >
                    //   Allocate forms
                    // </Button>
                  )}
                  {pathName == "/GenerateForm" ? (
                    <></>
                  ) : (
                    <Button
                      className="border-2 border-black bg-black text-white p-2 h-full"
                      onClick={showForms}
                    >
                      Generate Form
                    </Button>
                  )}
                </div>
                <div>
                  <Timeline>
                    {form.map(
                      (item, index) =>
                        item !== "id" && (
                          <Timeline.Item
                            key={index}
                            className="cursor-pointer w-max !text-lg"
                            onClick={onClose}
                          >
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
            </div>
          </header>
        )}
        <section>{children}</section>
      </body>
    </html>
  );
}
