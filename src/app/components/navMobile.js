import Link from "next/link";

export default function NavMobile() {
  return (
    <ol className="md:hidden flex w-screen fixed bottom-0 left-0 pl-40 text-[0.8rem]">
      <li className="flex-1">
        <div className="absolute bottom-0 group">
          <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-2000">
            <a href="mailto:cooperativeblue@gmail.com" className="block">
              cooperativeblue@gmail.com
            </a>
            <Link href="https://www.instagram.com/ajangeunajang/" passHref>
              instagram
            </Link>
          </div>
          <span className="pl-8 border-l-2 border-[#00386C]">Contact</span>
        </div>
      </li>
      <li className="flex-1 group">
        <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-2000">
          <p>
            협조적 블루는 그래픽 디자인과 웹 퍼블리싱을 합니다. 다양한 매체를
            통해 가치있는 이야기를 전달합니다.
          </p>
          <p>
            cooperative Blue specializes in graphic design and web publishing.
            They convey valuable stories through various media.
          </p>
        </div>
        <span className="pl-8 border-l-2 border-[#00386C]">About</span>
      </li>
    </ol>
  );
}
