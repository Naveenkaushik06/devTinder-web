import axios from "axios";
import React, { useEffect, useState } from "react";
import { BASE_URL } from "../utils/constants";
import { useDispatch, useSelector } from "react-redux";
import { addFeed } from "../utils/feedSlice";
import UserCard from "./UserCard";

const Feed = () => {
  const dispatch = useDispatch();
  const feed = useSelector((store) => store.feed);
  const [error, setError] = useState("");

  const getFeed = async () => {
    try {
      if (feed) return;
      const res = await axios.get(BASE_URL + "/feed", {
        withCredentials: true,
      });
      dispatch(addFeed(res?.data?.data));
    } catch (err) {
      setError(err?.response?.data || "Something went wrong");
    }
  };
  useEffect(() => {
    getFeed();
  }, []);
  return (feed &&
    <div className="flex justify-center my-4">
      <UserCard user={feed[0]}/>
    </div>
  );
};

export default Feed;
