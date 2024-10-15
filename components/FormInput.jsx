import { View, StyleSheet } from 'react-native';
import { Input } from '@rneui/themed';
import { React, forwardRef, useState } from 'react';

const FormInput = forwardRef(function FormInput(props, inputRef) {
  const {
    label,
    value,
    placeholder,
    onChangeText,
    secureTextEntry,
    textContentType,
    inputMode,
    autoFocus,
  } = props;

  const [isFocused, setIsFocused] = useState(false);

  return (
    <View style={styles.containerStyle}>
      <Input
        ref={inputRef}
        label={label}
        labelStyle={styles.labelStyle}
        value={value}
        placeholder={placeholder}
        onChangeText={onChangeText}
        autoFocus={autoFocus}
        secureTextEntry={secureTextEntry}
        textContentType={textContentType}
        inputMode={inputMode}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        inputContainerStyle={{
          borderWidth: 1,
          borderRadius: 10,
          width: '100%',
        }}
        style={{
          borderWidth: 1,
          borderRadius: 10,
          borderColor: isFocused ? 'orange' : 'black',
        }}
        inputStyle={{ color: 'white', padding: 5 }}
      />
    </View>
  );
});

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
