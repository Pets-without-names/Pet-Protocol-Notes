import { View, TextInput, StyleSheet } from 'react-native';
import { Input } from '@rneui/themed';
import React from 'react';

const FormInput = ({
  label,
  value,
  placeholder,
  onChangeText,
  secureTextEntry,
  textContentType,
  inputMode,
  isFocused,
}) => {
  const inputRef = React.useRef(null);
  return (
    <View style={styles.containerStyle}>
      <Input
        ref={isFocused}
        label={label}
        labelStyle={styles.labelStyle}
        value={value}
        placeholder={placeholder}
        onChangeText={onChangeText}
        secureTextEntry={secureTextEntry}
        textContentType={textContentType}
        inputMode={inputMode}
        inputContainerStyle={{ borderWidth: 1, borderRadius: 10 }}
        style={{
          borderWidth: 1,
          borderRadius: 10,
          borderColor: isFocused ? 'orange' : 'black',
        }}
        inputStyle={{ color: 'white', padding: 5 }}
      />
    </View>
  );
};

export default FormInput;

const styles = StyleSheet.create({
  containerStyle: {},
  labelStyle: {
    fontFamily: 'ConcertOne-Regular',
    fontSize: 18,
    marginBottom: 5,
    color: 'white',
    opacity: 0.75,
  },
  inputStyle: {},
});
