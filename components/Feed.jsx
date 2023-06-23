"use client";

import { useState, useEffect } from "react";
import PromptCard from "@components/PromptCard";
import { data } from "autoprefixer";

const PromptCardList = ({ data, handleTagClick }) => {
 
  return (
    <div className="mt-16 prompt_layout">
      {data.map((post) => {
        return (
          <PromptCard
            key={post._id}
            post={post}
            handleTagClick={handleTagClick}
          />
        );
      })}
    </div>
  );
};

const Feed = () => {
  const [searchText, setSearchText] = useState(" ");
  const [posts, setPosts] = useState([]);
  const handleSearchChange = (e) => {
    e.preventDefault();
  };

  useEffect(() => {
    const fetchPosts = async () => {
      const response = await fetch("/api/prompt");
      const data = await response.json();
      setPosts(data);
    };
    fetchPosts();
  }, []);
  console.log(posts);
  return (
    <section className="feed">
      <form className="relative w-full flex-center">
        <input
          value={searchText}
          type="text"
          placeholder="search for a tag or username"
          onChange={handleSearchChange}
          required
          className="search_input peer:"
        />
      </form>
      <PromptCardList data={posts} handleTagClick={() => {}} />
    </section>
  );
};

export default Feed;
