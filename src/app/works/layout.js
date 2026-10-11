// modal: Works 목록 위에 뜨는 프로젝트 상세 시트 (@modal)
export default function WorksLayout({ children, modal }) {
  return (
    <>
      {children}
      {modal}
    </>
  );
}
