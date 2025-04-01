import IonIcon from "@reacticons/ionicons";
import Image from "next/image";
import getBlurImg from "./getBlurImg";

export const revalidate = 86400;

const images = [
    {
        id: 250330,
        title: "나란히, 빈자리.",
        url: "https://i.imgur.com/XSsZ40y.jpeg",
        location: "Gyeongju, South Korea",
        camera: "samsung Galaxy S23",
        focal: "70mm",
        aperture: "f/2.4",
        shutter: "1/1000",
        iso: "ISO 32",
        date: "Mar 30, 2025"
    },
    {
        id: 250329,
        title: "봄 길",
        url: "https://i.imgur.com/uJemHSL.jpeg",
        location: "Pohang, South Korea",
        camera: "samsung Galaxy S23",
        focal: "23mm",
        aperture: "f/1.8",
        shutter: "1/3733",
        iso: "ISO 25",
        date: "Mar 29, 2025"
    },
    {
        id: 250309,
        title: "구름 기찻길",
        url: "https://i.imgur.com/iXxCE3G.jpeg",
        location: "Tokyo, Japan",
        camera: "samsung Galaxy S23",
        focal: "70mm",
        aperture: "f/2.4",
        shutter: "1/2700",
        iso: "ISO 25",
        date: "Mar 5, 2025"
    },
    {
        id: 250308,
        title: "해질녘 도시",
        url: "https://i.imgur.com/a7eOkZz.jpeg",
        location: "Tokyo, Japan",
        camera: "samsung Galaxy S23",
        focal: "70mm",
        aperture: "f/2.4",
        shutter: "1/60",
        iso: "ISO 50",
        date: "Mar 8, 2025"
    },
    {
        id: 250307,
        title: "도쿄의 밤",
        url: "https://i.imgur.com/lADbuOB.jpeg",
        location: "Tokyo, Japan",
        camera: "samsung Galaxy S23",
        focal: "70mm",
        aperture: "f/2.4",
        shutter: "1/60",
        iso: "ISO 400",
        date: "Mar 7, 2025"
    },
    {
        id: 250305,
        title: "올려다보기",
        url: "https://i.imgur.com/6x6FZ7a.jpeg",
        location: "Tokyo, Japan",
        camera: "samsung Galaxy S23",
        focal: "7.00mm",
        aperture: "f/2.4",
        shutter: "1/1000",
        iso: "ISO 32",
        date: "Mar 5, 2025"
    },
    {
        id: 250210,
        title: "불",
        url: "https://i.imgur.com/7T6DpwL.png",
        location: "Gapyeong, South Korea",
        camera: "samsung Galaxy S23",
        focal: "70mm",
        aperture: "f/2.4",
        shutter: "1/359",
        iso: "ISO 100",
        date: "Feb 10, 2025"
    },
    {
        id: 0,
        title: "7호선 뷰",
        url: "https://i.imgur.com/Bn4gnng.jpeg",
        location: "Seoul, South Korea",
        camera: "samsung Galaxy S23",
        focal: "70mm",
        aperture: "f/2.4",
        shutter: "1/1117",
        iso: "ISO 25",
        date: "Oct 2, 2024"
    },
    {
        id: 1,
        title: "사막",
        url: "https://i.imgur.com/OKPYDl2.jpeg",
        location: "Phan Rang Desert, Vietnam",
        camera: "samsung Galaxy S23",
        focal: "70mm",
        aperture: "f/2.4",
        shutter: "1/3925",
        iso: "ISO 25",
        date: "Feb 24, 2024"
    },
    {
        id: 2,
        title: "자전거, 냥이",
        url: "https://i.imgur.com/GHZOIqq.jpeg",
        location: "Ainoshima island, Japan",
        camera: "samsung Galaxy S23",
        focal: "70mm",
        aperture: "f/2.4",
        shutter: "1/586",
        iso: "ISO 25",
        date: "Jan 15, 2024"
    },
    {
        id: 240118,
        title: "기찻길",
        url: "https://i.imgur.com/Sx1F4cH.jpeg",
        location: "Fukuoka, Japan",
        camera: "samsung Galaxy S23",
        focal: "54mm",
        aperture: "f/1.8",
        shutter: "1/427",
        iso: "ISO 25",
        date: "Jan 14, 2024"
    },
    {
        id: 3,
        title: "새, 날다",
        url: "https://i.imgur.com/P8lqIlC.jpeg",
        location: "Daebu-do, South Korea",
        camera: "samsung Galaxy S21",
        focal: "59mm",
        aperture: "f/2.0",
        shutter: "1/1250",
        iso: "ISO 50",
        date: "Aug 16, 2022"
    },
    {
        id: 4,
        title: "비 맞는 청둥오리",
        url: "https://i.imgur.com/Kg4tQik.jpeg",
        location: "Namyangju, South Korea",
        camera: "samsung Galaxy S21",
        focal: "5.90mm",
        aperture: "f/2.0",
        shutter: "1/120",
        iso: "ISO 50",
        date: "Sep 21, 2022"
    }
]

async function Photos() {
    // Precompute blur placeholders
    const imagesWithBlur = await Promise.all(
        images.map(async image => {
            const blurData = await getBlurImg(image.url);
            return { ...image, blurData: blurData || "" };
        })
    );

    return (
        <main className="min-h-screen pt-16 px-6 pb-24 relative">
            <div className="max-w-2xl lg:max-w-4xl xl:max-w-6xl mx-auto">
                <h1 className="text-3xl font-black opacity-90 mb-12">Photographs</h1>
                {imagesWithBlur.map(image => (
                    <div key={image.id} id={`photo-${image.id}`} className="mb-24">
                        <div className="grid grid-cols-1 md:grid-cols-12 gap-x-4 lg:gap-x-6 gap-y-8">
                            <div className="col-span-1 md:col-span-9">
                                <Image
                                    src={image.url}
                                    alt={image.title}
                                    width={3000}
                                    height={4000}
                                    style={{
                                        maxWidth: "100%",
                                        height: "auto",
                                    }}
                                    placeholder={image.blurData ? "blur" : "empty"}
                                    blurDataURL={image.blurData}
                                />
                            </div>
                            <div className="col-span-1 md:col-span-3">
                                <div id={`info-${image.id}`} className="md:sticky md:top-24 self-start">
                                    <h2 className="text-2xl font-bold uppercase mb-2">{image.title}</h2>
                                    <p className="text-sm font-medium text-gray-500 mb-4">
                                        <IonIcon name="location-outline" className="inline-block mr-1 relative top-0.5" />
                                        {image.location}
                                    </p>
                                    <p className="text-sm text-gray-500">
                                        <IonIcon name="camera-outline" className="inline-block mr-1 relative top-0.5" />
                                        {image.camera}
                                    </p>
                                    <div className="flex text-sm text-gray-500">
                                        <p>{image.focal}</p>&nbsp;·&nbsp;
                                        <p>{image.aperture}</p>&nbsp;·&nbsp;
                                        <p>{image.shutter}</p>&nbsp;·&nbsp;
                                        <p>{image.iso}</p>
                                    </div>
                                    <p className="text-sm text-gray-500 mt-4">{image.date}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </main>
    );
}

export default async function Home() {
    return <Photos />;
}