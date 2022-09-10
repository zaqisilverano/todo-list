import React, { useEffect, useState } from 'react';
import { Keyboard, KeyboardAvoidingView, Linking, Platform, StyleSheet, Text, TextInput, View } from 'react-native';
import GradientButton from './components/GradientButton/GradienButton';
import Header from './components/Header/Header';
import Task from './components/Task/Task';
import * as LocalAuthentication from 'expo-local-authentication';
import AndroidOpenSettings from 'react-native-android-open-settings';

export default function App() {
  const [task, setTask] = useState("");
  const [todoItems, setTodoItems] = useState<string[]>(["Item 1", "Item 2"]);
  const [update, setUpdate] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isAuthenticationReady, setIsAuthenticationReady] = useState(false);

  // Add and Update the todo items
  const handleAddTodoItems = () => {
    if (!update) setTodoItems([...todoItems, task]);
    else {
      let newTodoItems = [...todoItems];
      newTodoItems[activeIndex] = task;
      setTodoItems(newTodoItems);
    }
    setTask("");
    setUpdate(false);
    Keyboard.dismiss();
  }

  // When user select the item
  // Set the update status and active index
  const handleSelectItem = (index: number) => {
    setUpdate(true);
    setActiveIndex(index);
    setTask(todoItems[index]);
  }

  // Remove the todo item
  const handleRemoveItem = (index: number) => {
    const newTodoItems = [...todoItems];
    newTodoItems.splice(index, 1);
    setTodoItems(newTodoItems);
  }

  // If the authentication not set yet
  // Need to setting the pin first
  const handleLinking = async () => {
    const authentication = await LocalAuthentication.getEnrolledLevelAsync();
    if (authentication) setIsAuthenticationReady(true);
    else {
      Platform.OS === 'ios'
        ? Linking.openURL('App-Prefs:root=General')
        : AndroidOpenSettings.securitySettings();
    }
  }

  // Check the authentication
  useEffect(() => {
    (async () => {
      const authentication = await LocalAuthentication.getEnrolledLevelAsync();
      if (authentication) setIsAuthenticationReady(true);
    })();
  }, []);

  // Open Local-authentication if authentication available
  useEffect(() => {
    if (isAuthenticationReady) {
      const auth = LocalAuthentication.authenticateAsync({
        promptMessage: 'Authenticate Todo List App',
        fallbackLabel: 'Enter Password'
      });
      auth.then(result => {
        setIsAuthenticated(result.success);
      })
    }
  }, [isAuthenticationReady])
  
  return (
    <View style={styles.container}>
      {!isAuthenticationReady && (
        <View style={styles.containerSettings}>
          <Text style={styles.todoTitle}>Set Authentication to Proceed</Text>
          <GradientButton style={styles.settingButton} onPress={() => handleLinking()}>
            <Text style={styles.todoAddText}>Go to Setting</Text>
          </GradientButton>
        </View>
      )}
      {isAuthenticated && (
        <>
          <Header />
            <View style={styles.todoWrapper}>
              <Text style={styles.todoTitle}>Paidy Todo List</Text>

              {/* List of todo tasks */}
              <View>
                {todoItems.map((item, index) => (
                  <Task
                    title={item}
                    key={"todo" + index}
                    onPress={() => handleSelectItem(index)}
                    onPressRemove={() => handleRemoveItem(index)}
                  />
                ))}
              </View>
            </View>

            {/* Insert and update todo items */}
            <KeyboardAvoidingView
              behavior={Platform.OS === "ios" ? "padding" : "height"}
              style={styles.todoWriteWrapper}
            >
              <TextInput
                value={task}
                style={styles.todoInput}
                placeholder={"Enter Here"}
                onChangeText={(text) => setTask(text)}
              />
              <GradientButton style={styles.todoAdd} onPress={() => handleAddTodoItems()}>
                <Text style={styles.todoAddText}>
                  {update ? "Update" : "Add"}
                </Text>
              </GradientButton>
            </KeyboardAvoidingView>
        </>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#E6E6E6',
  },
  containerSettings: {
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: 200
  },
  todoWrapper: {
    paddingTop: 20,
    paddingHorizontal: 20
  },
  todoTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 15
  },
  todoWriteWrapper: {
    position: 'absolute',
    bottom: 40,
    width: '100%',
    flexDirection: 'row',
    paddingHorizontal: 20
  },
  todoInput: {
    backgroundColor: 'white',
    borderRadius: 10,
    paddingVertical: 20,
    paddingHorizontal: 20,
    width: '100%'
  },
  todoAdd: {
    backgroundColor: '#E02590',
    position: 'absolute',
    top: 10,
    right: 30,
    borderRadius: 10,
    overflow: 'hidden'
  },
  todoAddText: {
    color: 'white',
    textTransform: 'uppercase'
  },
  settingButton: {
    borderRadius: 10,
    overflow: 'hidden'
  }
});
