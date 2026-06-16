import { motion } from "motion/react";
import { ChevronLeft, ChevronRight } from "lucide-react";

const DEFAULT_AUTO_DELAY = 5200;

const DEFAULT_THEMES = [
  { bg: "#11151a", button: "#f8fafc", dot: "#4b5563", progress: "#dbe4ee" },
  { bg: "#10181d", button: "#96f0e5", dot: "#395158", progress: "#d2faf5" },
  { bg: "#16171b", button: "#f8fafc", dot: "#4f5965", progress: "#dde7f1" }
];

export function CarouselNavigator({
  totalSlides = DEFAULT_THEMES.length,
  autoDelay = DEFAULT_AUTO_DELAY,
  themes = DEFAULT_THEMES,
  currentIndex,
  onIndexChange
}) {
  const theme = themes[currentIndex] ?? themes[0];
  const canCycle = totalSlides > 1;

  const goPrev = () => {
    if (!canCycle) return;
    onIndexChange((currentIndex - 1 + totalSlides) % totalSlides);
  };

  const goNext = () => {
    if (!canCycle) return;
    onIndexChange((currentIndex + 1) % totalSlides);
  };

  return (
    <motion.div
      animate={{ backgroundColor: theme.bg }}
      transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
      className="wm-carousel-nav"
    >
      <ArrowButton
        ariaLabel="Previous slide"
        onClick={goPrev}
        themeColor={theme.button}
        disabled={!canCycle}
      >
        <ChevronLeft size={22} strokeWidth={2.8} />
      </ArrowButton>

      <div className="wm-carousel-indicators" role="tablist" aria-label="School photo slides">
        {Array.from({ length: totalSlides }).map((_, index) => (
          <Indicator
            key={index}
            isActive={index === currentIndex}
            theme={theme}
            autoDelay={autoDelay}
            onClick={() => onIndexChange(index)}
          />
        ))}
      </div>

      <ArrowButton
        ariaLabel="Next slide"
        onClick={goNext}
        themeColor={theme.button}
        disabled={!canCycle}
      >
        <ChevronRight size={22} strokeWidth={2.8} />
      </ArrowButton>
    </motion.div>
  );
}

function ArrowButton({ children, ariaLabel, onClick, themeColor, disabled }) {
  return (
    <motion.button
      type="button"
      aria-label={ariaLabel}
      onClick={onClick}
      whileTap={disabled ? undefined : { scale: 0.92 }}
      className="wm-carousel-arrow"
      style={{
        backgroundColor: disabled ? "rgba(255, 255, 255, 0.16)" : themeColor,
        color: disabled ? "rgba(255, 255, 255, 0.55)" : "#05070a",
        cursor: disabled ? "default" : "pointer",
        opacity: disabled ? 0.5 : 1
      }}
      disabled={disabled}
    >
      {children}
    </motion.button>
  );
}

function Indicator({ isActive, theme, autoDelay, onClick }) {
  return (
    <motion.button
      type="button"
      onClick={onClick}
      layout
      transition={{ type: "spring", stiffness: 300, damping: 30 }}
      className="wm-carousel-dot"
      style={{
        width: isActive ? 52 : 12,
        backgroundColor: isActive ? theme.progress : theme.dot
      }}
      aria-label="Show selected school photo"
    >
      {isActive ? (
        <motion.span
          className="wm-carousel-dot-fill"
          initial={{ width: "0%" }}
          animate={{ width: "100%" }}
          transition={{ duration: autoDelay / 1000, ease: "linear" }}
        />
      ) : null}
    </motion.button>
  );
}
