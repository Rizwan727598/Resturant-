import Lottie from "lottie-react";
import animationData from "../assets/animation.json";

const LottieReactAnimation = () => {
  return (
    <div className="flex justify-center items-center">
      <Lottie animationData={animationData} loop={true} />
    </div>
  );
};

export default LottieReactAnimation;
