"use client";
import { collection, getDocs, query } from "firebase/firestore";
import React, { useEffect, useLayoutEffect, useState } from "react";
import { auth, db } from "../firebase";
import { getDatabase, ref, onValue, get } from "firebase/database";
import { Select, Space } from "antd";

const Allocate = () => {
  const [users, setUsers] = useState([]);
  const [option, setOption] = useState([]);

  const fetch = async () => {
    const db = getDatabase();
    const starCountRef = ref(db, "users/");
    console.log(starCountRef);
    onValue(starCountRef, (snapshot) => {
      console.log(snapshot);
      const data = snapshot.val();
      setUsers(Object.values(data));
    });
  };

  useLayoutEffect(() => {
    fetch();
  }, []);

  useEffect(() => {
    console.log(users);
    setOption(
      users.map((object) => {
        console.log(object);
        return {
          label: object.username,
          value: object.username,
        };
      })
    );
  }, [users]);

  return (
    <>
      <div className="w-full flex justify-center">
        <div className="container px-4">
          <Select
            mode="multiple"
            allowClear
            style={{
              width: "100%",
            }}
            placeholder="Please select users"
            options={option}
          />
          <Select
            mode="multiple"
            allowClear
            style={{
              width: "100%",
            }}
            placeholder="Please select form"
            // options={option}
            className="mt-4"
          />
        </div>
      </div>
    </>
  );
};

export default Allocate;
