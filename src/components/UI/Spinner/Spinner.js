import { Frame, useAnimation } from "framer";

const Spinner = () => {
  const size = 20;

  function buildParticles(size) {
    const rotation = -30;
    const opacityReduce = 0.08;

    const particles = Array.from({ length: 12 }).map((n, index) => {
      return (
        <Frame
          name="Particle"
          key={`SpinnerParticle${index}`}
          height={size / 4}
          width={size / 10}
          rotate={rotation * index}
          background="#000"
          radius={size / 10 / 2}
          center={"x"}
          originX={0.5}
          originY={2}
          opacity={1 - opacityReduce * index}
        />
      );
    });
    return particles;
  }

  const controls = useAnimation();

  async function spin() {
    const delay = 0.05;
    const transition = { duration: 0, delay: delay };
    await controls.start({ rotateZ: 30, transition });
    await controls.start({ rotateZ: 60, transition });
    await controls.start({ rotateZ: 90, transition });
    await controls.start({ rotateZ: 120, transition });
    await controls.start({ rotateZ: 150, transition });
    await controls.start({ rotateZ: 180, transition });
    await controls.start({ rotateZ: 210, transition });
    await controls.start({ rotateZ: 240, transition });
    await controls.start({ rotateZ: 270, transition });
    await controls.start({ rotateZ: 300, transition });
    await controls.start({ rotateZ: 330, transition });
    await controls.start({ rotateZ: 360, transition });
    spin();
  }

  spin();

  return (
    <Frame name={"App"} width={"5px"} height={"5x"} background={"#fff"}>
      <Frame
        name="Spinner"
        size={size}
        center={true}
        background=""
        animate={controls}
      >
        {buildParticles(size)}
      </Frame>
    </Frame>
  );
};

export default Spinner;
