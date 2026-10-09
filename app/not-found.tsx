import ArrowButton from "@/components/ArrowButton";
import PageHero from "@/components/PageHero";

export default function NotFound() {
  return (
    <>
      <PageHero eyebrow="404" title={<>Lost the<br />signal</>} intro="That page doesn’t exist (anymore)." />
      <div className="container" style={{ paddingBottom: "6rem" }}><ArrowButton href="/">Back home</ArrowButton></div>
    </>
  );
}
