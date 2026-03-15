import Spline from "@splinetool/react-spline";

export default function Website_Background() {
  return (
    <div className="spline-wrapper">
      <div className="spline-container">
        <Spline scene="https://prod.spline.design/HfG2EXIt7xmOMnx5/scene.splinecode" />
      </div>

      <style jsx>{`
        .spline-wrapper {
          position: absolute;
          top: 0;
          left: 0;
          width: 100vw;
          height: 100vh;
          overflow: hidden;
          z-index: -1;
        }

        .spline-container {
          position: absolute;
          top: 0;
          left: 0;
          width: 120vw; /* Slightly larger than screen */
          height: 120vh;
          transform: translate(-10vw, -10vh); /* Shift upward and left */
        }

        .spline-container :global(canvas) {
          width: 100% !important;
          height: 100% !important;
          object-fit: cover;
        }

        @media (max-width: 768px) {
          .spline-container {
            width: 150vw;
            height: 150vh;
            transform: translate(-25vw, -25vh);
          }
        }
      `}</style>
    </div>
  );
}
