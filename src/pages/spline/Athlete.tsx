import Spline from "@splinetool/react-spline";

export default function Athlete_Background() {
  return (
    <main className="relative w-full h-[1000px]" style={{marginTop:'-300px'}}>
      {/* Background Spline scene, interaction disabled */}
      <div className="absolute inset-0 pointer-events-none opacity-100">
        <Spline scene="https://prod.spline.design/g4gssYMlzAoo6arz/scene.splinecode" />
      </div>
      {/* Bottom-right box */}
      <div
        style={{
          position: "absolute",
          bottom: "20px",
          right: "20px",
          width: "200px",
          height: "50px",
          background: "black",
        }}
      ></div>
    </main>
  );
}
