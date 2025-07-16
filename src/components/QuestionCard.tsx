import React, { useRef } from "react";
import {
  motion,
  AnimatePresence,
  useMotionValue,
  useSpring,
  useTransform,
} from "motion/react";
import Card from "./Card";

interface QuestionCardProps {
  currentQuestionIndex: number;
  direction: number;
  isCardFlipped: boolean;
  currentQuestion: any;
  isWildcard: boolean;
  cardColor: string;
  textColor: string;
  onCardClick: () => void;
  isDarkMode?: boolean;
}

const QuestionCard: React.FC<QuestionCardProps> = ({
  currentQuestionIndex,
  direction,
  isCardFlipped,
  currentQuestion,
  isWildcard,
  cardColor,
  textColor,
  onCardClick,
  isDarkMode,
}) => {
  // Mouse movement tracking with optimized values
  const cardRef = useRef<HTMLDivElement>(null);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  // Spring animations with optimized settings
  const rotateX = useSpring(useTransform(mouseY, [-0.5, 0.5], [10, -10]), {
    stiffness: 400,
    damping: 25,
    restDelta: 0.001,
  });
  const rotateY = useSpring(useTransform(mouseX, [-0.5, 0.5], [-10, 10]), {
    stiffness: 400,
    damping: 25,
    restDelta: 0.001,
  });

  // Optimized mouse move handler with debounced calculations
  const handleMouseMove = (event: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;

    const rect = cardRef.current.getBoundingClientRect();
    const halfWidth = rect.width / 2;
    const halfHeight = rect.height / 2;

    const mouseXNorm = (event.clientX - rect.left - halfWidth) / halfWidth;
    const mouseYNorm = (event.clientY - rect.top - halfHeight) / halfHeight;

    // Use requestAnimationFrame for smooth updates
    requestAnimationFrame(() => {
      mouseX.set(mouseXNorm);
      mouseY.set(mouseYNorm);
    });
  };

  const handleMouseLeave = () => {
    // Smooth reset with spring animation
    mouseX.set(0);
    mouseY.set(0);
  };

  // Optimized card variants with improved transitions
  const cardVariants = {
    enter: (direction: number) => ({
      x: direction > 0 ? 300 : -300,
      opacity: 0,
      scale: 0.8,
      rotateY: direction > 0 ? 25 : -25,
    }),
    center: {
      x: 0,
      opacity: 1,
      scale: 1,
      rotateY: 0,
    },
    exit: (direction: number) => ({
      x: direction < 0 ? 300 : -300,
      opacity: 0,
      scale: 0.8,
      rotateY: direction < 0 ? 25 : -25,
    }),
  };

  // Optimized gloss effect with improved performance
  const glossVariants = {
    initial: { opacity: 0 },
    hover: { opacity: 0.1, scale: 2 },
  };

  return (
    <div className="flex justify-center items-center">
      <div
        className="relative perspective-1000"
        ref={cardRef}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
      >
        <AnimatePresence mode="wait" custom={direction}>
          <motion.div
            key={currentQuestionIndex}
            className="relative w-[340px] sm:w-[440px] md:w-[520px] h-[220px] sm:h-[280px] md:h-[340px]"
            style={{
              transformStyle: "preserve-3d",
              rotateX,
              rotateY,
            }}
            custom={direction}
            variants={cardVariants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{
              x: { type: "spring", stiffness: 300, damping: 30 },
              opacity: { duration: 0.2 },
              scale: { duration: 0.2 },
              rotateX: { duration: 0.1 },
              rotateY: { duration: 0.1 },
            }}
          >
            {/* Card Container with Flip Animation */}
            <motion.div
              className="relative w-full h-full"
              style={{
                transformStyle: "preserve-3d",
              }}
              animate={{
                rotateY: isCardFlipped ? 180 : 0,
              }}
              transition={{
                duration: 0.6,
                ease: [0.16, 1, 0.3, 1], // Custom bezier curve for natural feel
                layout: { duration: 0.6 },
              }}
              layoutId={`card-${currentQuestionIndex}`}
            >
              {/* Front Side - Question */}
              <Card
                size="large"
                variant="question"
                className={`absolute inset-0 text-center shadow-2xl ${
                  currentQuestion?.more ? "cursor-pointer" : "cursor-default"
                }`}
                style={{
                  backfaceVisibility: "hidden",
                  backgroundColor: cardColor,
                  willChange: "transform", // Optimize for animations
                }}
                onClick={currentQuestion?.more ? onCardClick : undefined}
              >
                <div className="text-center h-full flex flex-col justify-center">
                  <h2
                    className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-bold leading-tight font-sans tracking-tight px-2"
                    style={{ color: textColor }}
                  >
                    {currentQuestion?.question
                      ? currentQuestion.question
                          .split("\n")
                          .map((line: string, idx: number) => (
                            <span key={idx}>
                              {line}
                              {idx !==
                                currentQuestion.question.split("\n").length -
                                  1 && <br />}
                            </span>
                          ))
                      : null}
                  </h2>
                </div>

                {/* Optimized Gloss Effect */}
                <motion.div
                  className="absolute inset-0 rounded-[inherit] pointer-events-none"
                  variants={glossVariants}
                  initial="initial"
                  whileHover="hover"
                  style={{
                    background:
                      "radial-gradient(circle, rgba(255,255,255,0.8) 0%, rgba(255,255,255,0) 50%)",
                    x: useTransform(mouseX, [-0.5, 0.5], ["50%", "-50%"]),
                    y: useTransform(mouseY, [-0.5, 0.5], ["50%", "-50%"]),
                  }}
                />
              </Card>

              {/* Back Side - more */}
              <Card
                size="large"
                variant="question"
                className="absolute inset-0 shadow-2xl cursor-pointer"
                style={{
                  backfaceVisibility: "hidden",
                  transform: "rotateY(180deg)",
                  backgroundColor: cardColor,
                  willChange: "transform", // Optimize for animations
                }}
                onClick={onCardClick}
              >
                <div className="text-center h-full flex flex-col justify-center">
                  {currentQuestion?.more && (
                    <div className="space-y-3 text-left">
                      {Array.isArray(currentQuestion.more)
                        ? currentQuestion.more.map(
                            (option: string, index: number) => (
                              <p
                                key={index}
                                className="text-xs sm:text-sm font-light leading-relaxed"
                                style={{
                                  color: isDarkMode
                                    ? isWildcard
                                      ? "#f3f4f6"
                                      : "#ffffff"
                                    : isWildcard
                                    ? "#ffffff"
                                    : "#6b7280",
                                }}
                              >
                                • {option}
                              </p>
                            )
                          )
                        : Object.entries(currentQuestion.more).map(
                            ([key, value]) => (
                              <p
                                key={key}
                                className="text-xs sm:text-sm font-light leading-relaxed"
                                style={{
                                  color: isDarkMode
                                    ? isWildcard
                                      ? "#f3f4f6"
                                      : "#ffffff"
                                    : isWildcard
                                    ? "#ffffff"
                                    : "#6b7280",
                                }}
                              >
                                <span
                                  className="font-medium"
                                  style={{
                                    color: isDarkMode
                                      ? isWildcard
                                        ? "#f3f4f6"
                                        : "#ffffff"
                                      : isWildcard
                                      ? "#ffffff"
                                      : "#1f2937",
                                  }}
                                >
                                  {key}.
                                </span>{" "}
                                {value as string}
                              </p>
                            )
                          )}
                    </div>
                  )}
                </div>

                {/* Optimized Gloss Effect for back side */}
                <motion.div
                  className="absolute inset-0 rounded-[inherit] pointer-events-none"
                  variants={glossVariants}
                  initial="initial"
                  whileHover="hover"
                  style={{
                    background:
                      "radial-gradient(circle, rgba(255,255,255,0.8) 0%, rgba(255,255,255,0) 50%)",
                    x: useTransform(mouseX, [-0.5, 0.5], ["50%", "-50%"]),
                    y: useTransform(mouseY, [-0.5, 0.5], ["50%", "-50%"]),
                  }}
                />
              </Card>
            </motion.div>
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
};

export default QuestionCard;
