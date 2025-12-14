"use client";
import Card from "./components/Card";
import NavBar from "./components/NavBar";
import BlurText from "./components/BlurText";
import Clock from "./components/Widgets/Clock";
import Music from "./components/Widgets/Music";
import Mbti from "./components/Widgets/Mbti";
import Quote from "./components/Widgets/Quote";
import Age from "./components/Widgets/Age";
import Routine from "./components/Widgets/Routine";
import Photo from "./components/Widgets/Photo";
import Github from "./components/Widgets/Github";
import Solvedac from "./components/Widgets/Solvedac";
import Hobby from "./components/Widgets/Hobby";
import SkillSet from "./components/Widgets/SkillSet";
import Navy from "./components/Widgets/Navy";
import History from "./components/Widgets/History";
import { motion } from "framer-motion";

export default function Home() {
  return (
    <>
      <NavBar activeTab={0} />
      <main className="min-h-screen pt-16 px-6 pb-24 relative">
        <div className="max-w-2xl lg:max-w-4xl xl:max-w-6xl mx-auto">
          <motion.h1 layoutId="main-title">
          <BlurText
            text="안녕하세요🖐️"
            delay={150}
            animateBy="words"
            direction="top"
            className="text-3xl font-black opacity-90 mb-1"
          />
          <BlurText
            text="저는 윤태인입니다."
            delay={150}
            animateBy="words"
            direction="top"
            className="text-3xl font-black opacity-90 mb-4"
          />
          </motion.h1>


          <div className="flex space-x-4 mb-8">
            <a href="https://github.com/icecream0910"
              target="_blank"
              rel="noopener noreferrer"
              className="text-lg font-medium text-gray-500 hover:text-gray-400"
            > Github </a>
            <a href="https://blog.yuntae.in"
              target="_blank"
              rel="noopener noreferrer"
              className="text-lg font-medium text-gray-500 hover:text-gray-400"
            > Blog </a>
            <a href="mailto:hey@yuntae.in"
              target="_blank"
              rel="noopener noreferrer"
              className="text-lg font-medium text-gray-500 hover:text-gray-400"
            > Email </a>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <Card size="1x1">
              <Hobby />
            </Card>

            <Card size="1x1">
              <Music />
            </Card>

            <Card size="1x1">
              <SkillSet />
            </Card>

            <Card size="1x1">
              <Clock />
            </Card>

            <Card size="1x1">
              <Age />
            </Card>

            <Card size="1x1">
              <Photo />
            </Card>

            <Card size="1x1">
              <Mbti />
            </Card>

            <Card size="1x1">
              <Quote />
            </Card>

            <Card size="1x1">
              <Github />
            </Card>

            <Card size="1x1">
              <Solvedac />
            </Card>

            <Card size="1x1">
              <Routine />
            </Card>

            <Card size="1x1">
              <Navy />
            </Card>

            <Card size="2x1">
              <History />
            </Card>

          </div>
        </div>
      </main>
    </>
  );
}