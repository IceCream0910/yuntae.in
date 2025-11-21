"use client";
import IonIcon from '@reacticons/ionicons';
import CountUp from '../CountUp';

export default function Age() {
    const today = new Date();
    const birthDate = new Date('2005-09-10');
    let age = today.getFullYear() - birthDate.getFullYear();
    const hasHadBirthdayThisYear =
        today.getMonth() > birthDate.getMonth() ||
        (today.getMonth() === birthDate.getMonth() && today.getDate() >= birthDate.getDate());
    if (!hasHadBirthdayThisYear) {
        age -= 1;
    }

    return (
        <div className="relative w-full h-full">
            <h2 className="relative text-3xl font-black text-gray-500 break-keep text-pretty">
                저는 <span className="text-[var(--foreground)]">2005년</span>에 태어났고 <span className='emoji'>🍰</span><br />
                올해 <span className="text-[var(--foreground)]">
                    <CountUp
                        from={age}
                        to={40}
                        separator=","
                        direction="down"
                        duration={1}
                        className="count-up-text" onStart={undefined} onEnd={undefined} />
                    살</span>이에요.
            </h2>
        </div>
    );
}