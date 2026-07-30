import projectData from "../projects/data";
import {
  certifications,
  education,
} from "../data/profile";
import styles from "./resume.module.css";
import ResumeSkills from "./ResumeSkills";
import ResumeSidebar from "./ResumeSidebar";
import ResumeProjectStory from "./ResumeProjectStory";

export const metadata = {
  title: "Resume | 윤태인",
  description: "사람을 향한 기술과 서비스로 세상의 불편함을 해결하려는 소프트웨어 엔지니어입니다.",
};

const sections = [
  ["about", "About"],
  ["projects", "Projects"],
  ["skills", "Skills"],
  ["education", "Education"],
  ["certifications", "Certificates"],
];

const selectedProjects = projectData.filter((project) => project.pin);

function getInfo(project, name) {
  return project.info?.find((item) => item.name === name)?.value;
}

function getPrimaryLink(project) {
  return project.links?.find((link) =>
    ["Website", "웹 버전", "Play Store", "플레이스토어"].includes(link.name)
  ) || project.links?.[0];
}

function SectionHeading({ number, title, count }) {
  return (
    <div className={styles.sectionHeading}>
      <span>{number}</span>
      <h2>{title}</h2>
      {count !== undefined && <small>{String(count).padStart(2, "0")}</small>}
    </div>
  );
}

export default function ResumePage() {
  return (
    <div className={styles.page}>
      <a className={styles.skipLink} href="#resume-content">본문으로 바로가기</a>

      <ResumeSidebar sections={sections} />

      <main id="resume-content" className={styles.content}>
        <header id="top" className={styles.hero}>
          <h1>
            Yun Taein.
          </h1>
          <p className="mt-8 text-xl font-bold leading-relaxed ">
            A Software Engineer crafting people-oriented services<br />to solve everyday inconveniences.
          </p>
          <div className={styles.mobileLinks}>
            <a href="mailto:hey@yuntae.in">Email</a>
            <a href="https://github.com/icecream0910" target="_blank" rel="noreferrer">GitHub ↗</a>
            <a href="https://blog.yuntae.in" target="_blank" rel="noreferrer">Blog ↗</a>
          </div>
        </header>

        <section id="about" className={styles.section}>
          <SectionHeading number="01" title="About" />
          <div className={styles.prose}>
            <p>
              안녕하세요<span className="emoji">👋</span> 사람을 향한 기술과 서비스로 세상의 불편함을 해결하려는 소프트웨어 엔지니어 <strong>윤태인</strong>입니다.
              <br /><br />
              현재 광운대학교 소프트웨어학부에 재학 중이며, 웹과 모바일을 중심으로 아이디어를 구체화하고,
              기획과 UI 설계부터 개발·배포·운영까지 제품이 사용자에게 닿는 전 과정을
              직접 경험해 왔습니다<span className="emoji">🧭</span> 특히 플랫폼에 구애받지 않는 범용성을 지닌 <strong>웹 생태계에 깊은 관심</strong><span className="emoji">🌐</span>을 가지고 있으며, 현재의 모바일을 넘어 웨어러블 디바이스 형태의 새로운 폼팩터에서 펼쳐질 새로운 소프트웨어 경험의 가능성을 탐구하고 있습니다.
              <br /><br />
            </p>
            <p>
              아이디어를 빠르게 구현하는 것만큼, 출시된 제품을 책임 있게 다듬는 일을
              중요하게 생각합니다. <strong>수만 명 이상의 실사용자가 이용하는 서비스를
                직접 운영</strong><span className="emoji">👥</span>하며 기능 구현 이후에도 버그를 추적하고 성능을 개선하는
              과정, <strong>안정성과 보안</strong>을 설계하는 일이 제품의 신뢰를 만든다는 것을
              배웠습니다<span className="emoji">🛡️</span>
              <br /><br />
              사용자가 설명 없이도 자연스럽게 사용할 수 있는 흐름과
              인터페이스를 고민하며, 기능적 완성도와 <strong>직관적이고 유려한 UI/UX</strong>를 함께
              갖춘 제품을 만들고자 합니다<span className="emoji">✨</span>
            </p>
            <p>
              LLM을 비롯한 AI 도구<span className="emoji">🤖</span>도 개발 자동화와 탐색의 속도를 높이는 실용적인
              동료로 적극 활용합니다. AI를 통한 새로운 패러다임 속에서도 <strong>무엇을 만들지 결정하고, 결과가 충분히 좋은지
                판단하며, 완성도에 끝까지 책임지는 일은 소프트웨어 엔지니어의 몫</strong>이라고
              생각합니다.
              <br /><br />
              새로운 기술을 빠르게 실험하되 기술 자체보다 그것이 만드는
              사용자 가치에 집중하고, 동료들과 깊이 토론하며<span className="emoji">🤝</span> 더 나은 해답을 찾아가는
              개발자로 성장하고자 합니다.
            </p>
          </div>
        </section>

        <section id="projects" className={styles.section}>
          <SectionHeading number="02" title="Projects" count={selectedProjects.length} />
          <div className={styles.projectList}>
            {selectedProjects.map((project) => {
              const primaryLink = getPrimaryLink(project);
              const period = getInfo(project, "기간");

              return (
                <article key={project.title} className={styles.project}>
                  <div className={styles.projectMeta}>
                    <time>{period}</time>
                    <span>{Array.isArray(project.category) ? project.category.join(" · ") : project.category}</span>
                  </div>
                  <div className={styles.projectBody}>
                    <div className={styles.projectTitle}>
                      <h3>{project.title}</h3>
                      {primaryLink && (
                        <a href={primaryLink.url} target="_blank" rel="noreferrer" aria-label={`${project.title} 열기`}>
                          Visit ↗
                        </a>
                      )}
                    </div>
                    <p>{project.summary}</p>
                    {project.blogPostUrl && (
                      <ResumeProjectStory title={project.title} src={project.blogPostUrl} />
                    )}
                  </div>
                </article>
              );
            })}
          </div>
          <a className={styles.moreLink} href="/projects">모든 프로젝트 보기 →</a>
        </section>

        <section id="skills" className={styles.section}>
          <SectionHeading number="03" title="Skills" />
          <ResumeSkills />
        </section>

        <section id="education" className={styles.section}>
          <SectionHeading number="04" title="Education" count={education.length} />
          <div className={styles.timeline}>
            {education.map((item) => (
              <article key={item.institution}>
                <time>{item.period}</time>
                <div>
                  <h3>{item.institution}</h3>
                  <p>{item.detail}</p>
                </div>
              </article>
            ))}
          </div>
        </section>

        <section id="certifications" className={styles.section}>
          <SectionHeading number="05" title="Certificates" count={certifications.length} />
          <div className={styles.simpleList}>
            {certifications.map((certification) => (
              <div key={certification.name}>
                <strong>{certification.name}</strong>
                <time>{certification.year}</time>
              </div>
            ))}
          </div>
        </section>

        <footer className={styles.footer}>
          <span>Yun Taein · Software Engineer</span>
          <span>Last updated 2026</span>
        </footer>
      </main>
    </div>
  );
}
