import "./globals.css";

export const metadata = {
  title: "Yun Taein | 윤태인",
  description: "새로움에 끊임없이 도전하는 개발자, 윤태인입니다.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="ko">
      <head>
        <meta property="og:type" content="website" data-next-head="" />
        <meta property="og:site_name" content="Yun Taein | 윤태인" data-next-head="" />
        <meta property="twitter:domain" content="https://yuntae.in" data-next-head="" />
        <meta name="description" content="코드, 그리고 그 사이의 생각을 기록합니다." data-next-head="" />
        <meta property="og:description" content="코드, 그리고 그 사이의 생각을 기록합니다." data-next-head="" />
        <meta name="twitter:description" content="코드, 그리고 그 사이의 생각을 기록합니다." data-next-head="" />
        <meta name="twitter:image" content="/og_thumbnail.png" data-next-head="" />
        <meta property="og:image" content="/og_thumbnail.png" data-next-head="" />
        <link rel="canonical" href="https://yuntae.in" data-next-head="" />
        <meta property="og:url" content="https://yuntae.in" data-next-head="" />
        <meta property="twitter:url" content="https://yuntae.in" data-next-head="" />
        <meta property="og:title" content="Yun Taein | 윤태인" data-next-head="" />
        <meta name="twitter:title" content="Yun Taein | 윤태인" data-next-head="" />
        <title data-next-head="">Yun Taein | 윤태인</title>
        <link rel="icon" href="/favi.ico" />
        <link rel="apple-touch-icon" href="/favi.ico" />
        <link rel="shortcut icon" href="/favi.ico" />
      </head>
      <body
        className={`antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
