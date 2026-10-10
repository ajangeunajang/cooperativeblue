import Link from "next/link";
import CopyEmail from "./copyEmail";
import Contact from "./contact";

export default function Nav() {
  return (
    <ol className="hidden lg:flex w-full fixed text-[0.8rem]">
      <li className="fixed top-0 lg:left-4 xl:left-20 z-20">
        <Contact />
      </li>
      <li className="group fixed top-0 left-[20%] w-1/6">
        <span className="inline-block pl-10 border-l border-[#00386C]">About</span>
        <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-2000">
          <p className="whitespace-nowrap">
            Graphic + Web + Design
            <br />
            based in Seoul and Daejeon, KR
            {/* 협조적 블루는 그래픽 디자인과 웹 퍼블리싱을 합니다. 다양한 매체를 통해 가치있는
            이야기를 전달합니다. */}
          </p>
          {/* <p className="leading-tight">
          cooperative Blue specializes in graphic design and web publishing. They convey valuable stories through various media.
          </p> */}
          <div className="mt-[1lh] whitespace-nowrap">
            <CopyEmail />
            <Link href="https://www.instagram.com/ajangeunajang/" passHref>
              <span className="font-[Inter]">↗</span> instagram
            </Link>
          </div>
        </div>
      </li>
      <li className="fixed top-0 right-4">
        <Link href='/index' className="inline-block pl-10 border-l border-[#00386C]">Index</Link>
      </li>
    </ol>
  );
}
