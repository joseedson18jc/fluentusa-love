import { useRef, useEffect } from "react";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  withSpring,
  withDelay,
  Easing,
  interpolate,
  Extrapolate,
} from "react-native-reanimated";

/**
 * Hook para animação de fade-in
 */
export function useFadeInAnimation(delay: number = 0) {
  const opacity = useSharedValue(0);

  useEffect(() => {
    opacity.value = withDelay(
      delay,
      withTiming(1, {
        duration: 400,
        easing: Easing.out(Easing.cubic),
      })
    );
  }, []);

  return useAnimatedStyle(() => ({
    opacity: opacity.value,
  }));
}

/**
 * Hook para animação de slide-in
 */
export function useSlideInAnimation(
  direction: "left" | "right" | "up" | "down" = "up",
  delay: number = 0
) {
  const translateX = useSharedValue(direction === "left" ? -50 : direction === "right" ? 50 : 0);
  const translateY = useSharedValue(direction === "up" ? 50 : direction === "down" ? -50 : 0);
  const opacity = useSharedValue(0);

  useEffect(() => {
    translateX.value = withDelay(
      delay,
      withTiming(0, {
        duration: 400,
        easing: Easing.out(Easing.cubic),
      })
    );

    translateY.value = withDelay(
      delay,
      withTiming(0, {
        duration: 400,
        easing: Easing.out(Easing.cubic),
      })
    );

    opacity.value = withDelay(
      delay,
      withTiming(1, {
        duration: 400,
        easing: Easing.out(Easing.cubic),
      })
    );
  }, []);

  return useAnimatedStyle(() => ({
    transform: [{ translateX: translateX.value }, { translateY: translateY.value }],
    opacity: opacity.value,
  }));
}

/**
 * Hook para animação de scale
 */
export function useScaleAnimation(delay: number = 0) {
  const scale = useSharedValue(0.8);
  const opacity = useSharedValue(0);

  useEffect(() => {
    scale.value = withDelay(
      delay,
      withSpring(1, {
        damping: 10,
        mass: 1,
        overshootClamping: false,
      })
    );

    opacity.value = withDelay(
      delay,
      withTiming(1, {
        duration: 300,
        easing: Easing.out(Easing.cubic),
      })
    );
  }, []);

  return useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
    opacity: opacity.value,
  }));
}

/**
 * Hook para animação de bounce
 */
export function useBounceAnimation() {
  const scale = useSharedValue(1);

  const animateBounce = () => {
    scale.value = withSpring(0.95, {
      damping: 8,
      mass: 1,
      overshootClamping: false,
    });

    setTimeout(() => {
      scale.value = withSpring(1, {
        damping: 8,
        mass: 1,
        overshootClamping: false,
      });
    }, 100);
  };

  return {
    animatedStyle: useAnimatedStyle(() => ({
      transform: [{ scale: scale.value }],
    })),
    animateBounce,
  };
}

/**
 * Hook para animação de pulse
 */
export function usePulseAnimation() {
  const opacity = useSharedValue(1);

  useEffect(() => {
    const animate = () => {
      opacity.value = withTiming(0.5, {
        duration: 1000,
        easing: Easing.inOut(Easing.sin),
      });

      setTimeout(() => {
        opacity.value = withTiming(1, {
          duration: 1000,
          easing: Easing.inOut(Easing.sin),
        });
      }, 1000);
    };

    animate();
    const interval = setInterval(animate, 2000);

    return () => clearInterval(interval);
  }, []);

  return useAnimatedStyle(() => ({
    opacity: opacity.value,
  }));
}

/**
 * Hook para animação de rotate
 */
export function useRotateAnimation(duration: number = 2000) {
  const rotation = useSharedValue(0);

  useEffect(() => {
    rotation.value = withTiming(360, {
      duration,
      easing: Easing.linear,
    });
  }, []);

  return useAnimatedStyle(() => ({
    transform: [{ rotate: `${rotation.value}deg` }],
  }));
}
