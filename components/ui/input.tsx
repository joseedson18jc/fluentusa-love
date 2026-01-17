import { TextInput, View, Text } from "react-native";
import { cn } from "@/lib/utils";

interface InputProps {
  placeholder?: string;
  value?: string;
  onChangeText?: (text: string) => void;
  label?: string;
  error?: string;
  icon?: React.ReactNode;
  secureTextEntry?: boolean;
  keyboardType?: "default" | "email-address" | "numeric" | "phone-pad";
  className?: string;
}

export function Input({
  placeholder,
  value,
  onChangeText,
  label,
  error,
  icon,
  secureTextEntry,
  keyboardType = "default",
  className,
}: InputProps) {
  return (
    <View className="gap-2">
      {label && <Text className="text-sm font-semibold text-foreground">{label}</Text>}

      <View
        className={cn(
          "flex-row items-center gap-3 px-4 py-3 rounded-xl border-2",
          error ? "border-error bg-error/10" : "border-border bg-surface",
          className
        )}
      >
        {icon && <View className="text-lg">{icon}</View>}

        <TextInput
          placeholder={placeholder}
          value={value}
          onChangeText={onChangeText}
          secureTextEntry={secureTextEntry}
          keyboardType={keyboardType}
          placeholderTextColor="#A0AEC0"
          className="flex-1 text-foreground text-base"
          style={{ fontFamily: "System" }}
        />
      </View>

      {error && <Text className="text-xs text-error">{error}</Text>}
    </View>
  );
}
