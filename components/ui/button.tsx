import { TouchableOpacity, Text, View, ActivityIndicator } from "react-native";
import { cn } from "@/lib/utils";

interface ButtonProps {
  onPress: () => void;
  label: string;
  variant?: "primary" | "secondary" | "outline" | "ghost";
  size?: "sm" | "md" | "lg";
  disabled?: boolean;
  loading?: boolean;
  icon?: React.ReactNode;
  className?: string;
}

export function Button({
  onPress,
  label,
  variant = "primary",
  size = "md",
  disabled = false,
  loading = false,
  icon,
  className,
}: ButtonProps) {
  const baseStyles = "rounded-xl items-center justify-center flex-row gap-2";

  const variantStyles = {
    primary: "bg-primary",
    secondary: "bg-secondary",
    outline: "border-2 border-primary",
    ghost: "bg-transparent",
  };

  const sizeStyles = {
    sm: "px-4 py-2",
    md: "px-6 py-3",
    lg: "px-8 py-4",
  };

  const textVariantStyles = {
    primary: "text-white",
    secondary: "text-white",
    outline: "text-primary",
    ghost: "text-primary",
  };

  return (
    <TouchableOpacity
      onPress={onPress}
      disabled={disabled || loading}
      activeOpacity={0.7}
      className={cn(
        baseStyles,
        variantStyles[variant],
        sizeStyles[size],
        (disabled || loading) && "opacity-50",
        className
      )}
    >
      {loading ? (
        <ActivityIndicator color={variant === "outline" || variant === "ghost" ? "#FF6B9D" : "white"} />
      ) : (
        <>
          {icon}
          <Text className={cn("font-semibold", textVariantStyles[variant])}>
            {label}
          </Text>
        </>
      )}
    </TouchableOpacity>
  );
}
