import { View, TouchableOpacity } from 'react-native';
import { Text } from '@rneui/themed';
import React from 'react';

const CustomButton = () => {
  return (
    <TouchableOpacity>
      <View>
        <Text>CustomButton</Text>
      </View>
    </TouchableOpacity>
  );
};

export default CustomButton;
