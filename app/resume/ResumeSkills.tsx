"use client";

import StackIcon from "tech-stack-icons";
import { skillCategories } from "../data/profile";
import styles from "./resume.module.css";

export default function ResumeSkills() {
    return (
        <div className={styles.skillList}>
            {skillCategories.map((category) => (
                <div key={category.title} className={styles.skillRow}>
                    <h3>{category.title}</h3>
                    <div className={styles.skillItems}>
                        {category.skills.map((skill) => (
                            <span key={skill.name} className={styles.skillItem}>
                                <StackIcon name={skill.iconName} className={styles.skillIcon} />
                                {skill.name}
                            </span>
                        ))}
                    </div>
                </div>
            ))}
        </div>
    );
}
