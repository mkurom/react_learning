import { useRouter } from 'next/router'

function About() {
  const router = useRouter();

  function onClick() {
    router.back();
  };

  return (
    <div>
      <div>
        一つ前の画面に戻る
        <button type="button" onClick={onClick}>
          router.back
        </button>
      </div>
    </div>
  );
}

export default About
