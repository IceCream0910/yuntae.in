"use client";
import Card from "./components/Card";
import NavBar from "./components/NavBar";
import { useState } from "react";
import Clock from "./components/Widgets/Clock";
import Music from "./components/Widgets/Music";
import Mbti from "./components/Widgets/Mbti";
import Quote from "./components/Widgets/Quote";
import Routine from "./components/Widgets/Routine";
import Photo from "./components/Widgets/Photo";
import Github from "./components/Widgets/Github";
import LlmUsage from "./components/Widgets/LlmUsage";
import Solvedac from "./components/Widgets/Solvedac";
import SkillSet from "./components/Widgets/SkillSet";
import Navy from "./components/Widgets/Navy";
import History from "./components/Widgets/History";
import { motion, MotionConfig } from "framer-motion";
import "./components/Widgets/widgets.css";
import Facts from "./components/Widgets/Facts";
import SocialLinks from "./components/SocialLinks";
import { ThemeSwitch } from "./components/ThemeProvider";

export default function Home() {
  const [factsCardRevealed, setFactsCardRevealed] = useState(false);
  const cards = [
    <SkillSet key="skills" />,
    <History key="history" />,
    <Facts key="facts" startAnimation={factsCardRevealed} />,
    <Music key="music" />,
    <Github key="github" />,
    <LlmUsage key="llm-usage" />,
    <Solvedac key="solvedac" />,
    <Routine key="routine" />,
    <Clock key="clock" />,
    <Photo key="photo" />,
    <Quote key="quote" />,
    <Mbti key="mbti" />,
    <Navy key="navy" />,
  ];

  return (
    <MotionConfig reducedMotion="user">
      <NavBar activeTab={0} />
      <main className="min-h-screen pt-24 sm:pt-16 px-6 pb-24 relative">
        <div className="max-w-2xl lg:max-w-4xl xl:max-w-6xl mx-auto">
          <div className="mb-3 flex items-start justify-between gap-5">
            <motion.h1 layoutId="main-title" className="text-3xl font-black opacity-90">
              안녕하세요🖐️<br />저는 윤태인입니다.
            </motion.h1>
            <div className="absolute right-6 top-5 sm:static"><ThemeSwitch /></div>
          </div>

          <p className="text-lg font-light opacity-60 mb-3">
            사람을 향한 기술과 서비스로 세상의 불편함을 해결하려는 소프트웨어 엔지니어입니다.
          </p>

          <SocialLinks className="mb-8" />

          <div className="widget-grid grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">


            {cards.map((widget, index) => (
              <Card
                key={widget.key}
                size="1x1"
                index={index}
                tone={widget.key}
                onReveal={index === 2 ? () => setFactsCardRevealed(true) : undefined}
              >
                {widget}
              </Card>
            ))}
          </div>
        </div>
      </main>
    </MotionConfig>
  );
}
