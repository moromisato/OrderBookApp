import { TouchableOpacity, Text, StyleSheet } from "react-native";
import { THEME } from "../../theme/theme";

interface ButtonProps {
  title: string;
  variant: "primary" | "secondary";
  onPress: () => void;
}

export const Button = ({ title, variant, onPress }: ButtonProps) => {
  const titleStyle =
    variant === "primary"
      ? {
          color: THEME.text,
        }
      : {
          color: THEME.primary,
        };

  const bgStyle =
    variant === "primary"
      ? {
          backgroundColor: THEME.primary,
          borderWidth: 1,
          borderColor: THEME.white,
        }
      : {
          backgroundColor: THEME.white,
        };

  return (
    <TouchableOpacity
      style={[styles.container, { ...bgStyle }]}
      onPress={onPress}
    >
      <Text style={{ ...titleStyle }}>{title}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    width: 100,
    height: 35,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 10,
  },
});
