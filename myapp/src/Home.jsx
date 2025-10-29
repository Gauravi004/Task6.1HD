import React from "react";
import Search from "./Search";
import HeaderImage from "./Headerimg";
import Title from "./title";
import ArticleList from "./ArticleList";
import Button from "./Button";
import Title2 from "./Title2";
import TutorialsList from "./TutorialsList";
import Button2 from "./Button2";
import Query from "./query";
import Footer from "./footer";

function Home() {
  return (
    <>
      <Search />
      <HeaderImage />
      <Title />
      <ArticleList />
      <Button />
      <Title2 />
      <TutorialsList />
      <Button2 />
      <Query />
      <Footer />
    </>
  );
}

export default Home;
