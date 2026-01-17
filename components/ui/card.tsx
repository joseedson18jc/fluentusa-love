import { View, ViewProps } from "react-native";
import { cn } from "@/lib/utils";

interface CardProps extends ViewProps {
  variant?: "default" | "elevated" | "outline";
  className?: string;
}

export function Card({
  variant = "default",
  className,
  children,
  ...props
}: CardProps) {
  const variantStyles = {
    default: "bg-surface border border-border",
    elevated: "bg-surface shadow-lg",
    outline: "bg-transparent border-2 border-primary",
  };

  return (
    <View
      className={cn(
        "rounded-2xl p-4",
        variantStyles[variant],
        className
      )}
      {...props}
    >
      {children}
    </View>
  );
}
