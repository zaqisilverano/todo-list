import * as React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

interface ITaskProps {
  title: string;
  onPress?: () => void;
  onPressRemove?: () => void;
}

const Task: React.FunctionComponent<ITaskProps> = ({
  title,
  onPress,
  onPressRemove,
}) => {
  return (
    <TouchableOpacity
      style={styles.taskWrapper}
      onPress={onPress ?? (() => null)}
      testID={"taskPress"}
    >
      <View style={styles.taskLeft}>
        <View style={styles.taskPin}></View>
        <Text style={styles.taskTitle}>{title}</Text>
      </View>
      <TouchableOpacity
        onPress={onPressRemove ?? (() => null)}
        testID={"removePress"}
      >
        <Text>Remove</Text>
      </TouchableOpacity>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  taskWrapper: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: "white",
    shadowOffset: { width: 0, height: 4 },
    shadowColor: "rgba(67, 84, 221, 1)",
    shadowOpacity: 0.08,
    shadowRadius: 12,
    paddingVertical: 15,
    paddingHorizontal: 20,
    borderRadius: 10,
    marginBottom: 10,
  },
  taskLeft: {
    flexDirection: "row",
    alignItems: "center",
  },
  taskTitle: {
    maxWidth: "90%",
  },
  taskPin: {
    backgroundColor: "#E02590",
    width: 20,
    height: 20,
    borderRadius: 10,
    marginRight: 10,
  },
});

export default Task;
