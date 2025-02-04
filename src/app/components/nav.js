import Link from "next/link";

export default function Nav() {
  return (
    <ol className="hidden md:flex w-[30vw] fixed top-0 left-20 text-[0.8rem]">
      <li className="flex-1">
        <span className="pl-10 border-l-2 border-[#00386C]">Contact</span>
        <div>
          <a href="mailto:cooperativeblue@gmail.com" className="block">
            cooperativeblue@gmail.com
          </a>
          <Link href="https://www.instagram.com/ajangeunajang/" passHref>
            instagram
          </Link>
        </div>
      </li>
      <li className="flex-1 group">
        <span className="pl-10 border-l-2 border-[#00386C]">About</span>
        <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-2000">
          <p>
            협조적 블루는 그래픽 디자인과 웹 퍼블리싱을 합니다. 다양한 매체를 통해 가치있는
            이야기를 전달합니다.
          </p>
          <p>
          cooperative Blue specializes in graphic design and web publishing. They convey valuable stories through various media.
          </p>
        </div>
      </li>
    </ol>
  );
}
