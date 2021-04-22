import React, {useState} from 'react';
import {
  TouchableWithoutFeedback,
  TouchableOpacity,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import {Colors, height, Typography} from '../styles';

const DropDown = ({selected, list, onSelect, style}) => {
  const [show, setShow] = useState(false);
  return (
    <View style={[styles.dropDefaultBox, style]}>
      <TouchableWithoutFeedback
        onPress={() => {
          setShow(true);
        }}>
        <View style={styles.dropDefaultItemBox}>
          <Text style={styles.dropDefaultItemText}>{selected}</Text>
        </View>
      </TouchableWithoutFeedback>
      {show && (
        <View style={styles.dropListBox}>
          {list.map((elem, key) => (
            <TouchableOpacity
              key={key}
              onPress={() => {
                onSelect(elem, key);
                setShow(false);
              }}
              style={styles.dropTouch}>
              <View
                style={[
                  styles.dropListItemBox,
                  elem === selected && {
                    backgroundColor: Colors.offWhite,
                  },
                ]}>
                <Text style={styles.dropLabelText}>{elem}</Text>
              </View>
            </TouchableOpacity>
          ))}
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  dropDefaultBox: {},
  dropListItemBox: {
    justifyContent: 'center',
    alignItems: 'center',
    height: 50,
    zIndex: 20,
  },
  dropLabelText: {
    paddingLeft: 30,
    width: '100%',
    ...Typography.norma13,
  },
  dropTouch: {height: 50, width: '100%', zIndex: 20},
  dropListBox: {
    position: 'absolute',
    elevation: 10,
    backgroundColor: Colors.WHITE,
    width: 185,
    height: 'auto',
    alignSelf: 'center',
    marginTop: 40,
    borderRadius: 7,
    zIndex: 20,
    overflow: 'hidden',
  },
  dropDefaultItemText: {
    textAlignVertical: 'center',
    height: '100%',
    marginLeft: 35,
    ...Typography.bold13White,
  },
  dropDefaultItemBox: {
    borderColor: Colors.primary4,
    borderWidth: 0.5,
    borderRadius: 10,
    height: 40,
    width: 200,
  },
});

export default DropDown;
