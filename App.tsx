/* eslint-disable react-native/no-inline-styles */
import React, {Dispatch, SetStateAction, useEffect, useState} from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
  Image,
  TextInput,
  TouchableOpacity,
} from 'react-native';

import {Colors} from 'react-native/Libraries/NewAppScreen';
import Logo from './src/assets/logo.png';
import CheckBox from '@react-native-community/checkbox';
import {
  clearAll,
  deleteStorage,
  getStorage,
  setStorage,
} from './src/utils/storage';

interface PropsInfo {
  title: string;
  info?: number;
  placeholder?: string;
}

interface PropsInput {
  title: string;
  width?: string;
  placeholder?: string;
  value?: string;
  setText: () => void | Dispatch<SetStateAction<string>>;
}

interface PropsType {
  title: string;
  value?: boolean;
  label?: string;
  setValue: () => void | Dispatch<SetStateAction<number>>;
  type?: number;
}

interface DataLocalStorage {
  position?: string;
  prevision?: string;
  ppp?: string;
  pcd?: string;
}

const vagas = [1500, 250, 400];
const reserva = [750, 125, 200];

const blue = '#1919f0';
const yellow = '#F9DD16';

const Info: React.FC<PropsInfo> = ({title, info}) => {
  return (
    <View style={{paddingVertical: 10}}>
      <Text style={styles.subtitle}>{title}</Text>
      <Text style={styles.info}>{info}</Text>
    </View>
  );
};

const Input: React.FC<PropsInput> = ({
  title,
  width,
  placeholder,
  value,
  setText,
}) => {
  return (
    <View style={{paddingVertical: 10, width: width}}>
      <Text style={styles.subtitle}>{title}</Text>
      <View style={styles.input}>
        <TextInput
          keyboardType="number-pad"
          placeholder={placeholder}
          placeholderTextColor="#999"
          value={value}
          onChangeText={setText}
          style={[styles.info, {paddingHorizontal: 5, color: 'black'}]}
        />
      </View>
    </View>
  );
};

const TypeVaga: React.FC<PropsType> = ({
  title,
  label,
  value = false,
  setValue,
  type,
}) => {
  return (
    <View
      style={{
        paddingVertical: 0,
        alignItems: 'center',
        justifyContent: 'center',
      }}>
      <CheckBox
        onChange={() => setValue(type)}
        tintColors={{true: blue, false: yellow}}
        value={value}
      />
      <Text style={{color: 'black'}}>{title}</Text>
      <Text style={{color: 'black'}}>{label}</Text>
    </View>
  );
};

const App = () => {
  const [position, setPosition] = useState<string>();
  const [pcd, setPcd] = useState<string>();
  const [ppp, setPpp] = useState<string>();
  const [checked, setChecked] = useState(0);
  const [prevision, setPrevision] = useState<string>();

  useEffect(() => {
    if (!position) {
      const data: DataLocalStorage = getStorage('@data');
      console.log(data);
      if (data) {
        console.log('entrou');
        setPosition(data.position);
        setPcd(data.pcd);
        setPpp(data.ppp);
        setPrevision(data.prevision);
      }
    }
  }, []);

  const handlePosition = (pos = 0, nPcd = 375, nPpp = 600) => {
    const verify = getStorage('@data');
    if (verify) {
      deleteStorage('@data');
    }
    let numGrupos = Math.ceil((pos - 1) / 3);
    let positionReal = pos;
    if (pos === 1) {
      setPrevision('1');
      return;
    }
    if (numGrupos > nPcd) {
      let temp = Math.ceil(numGrupos / 2);
      if (temp > nPpp) {
        temp = nPpp;
      }
      numGrupos = temp + nPcd;
      positionReal = numGrupos + pos;
      setPrevision(positionReal.toString());
      const data: DataLocalStorage = {
        position,
        prevision,
        pcd,
        ppp,
      };
      setStorage('@data', data);
      return;
    }
    positionReal = numGrupos * 2 + pos;
    setPrevision(positionReal.toString());
    const data: DataLocalStorage = {
      position,
      prevision,
      pcd,
      ppp,
    };
    setStorage('@data', data);
    return;
  };

  const handlePositionPPP = (pos = 0, nPcd = 375, nPpp = 600) => {
    const verify = getStorage('@data');
    if (verify) {
      deleteStorage('@data');
    }
    let positionReal = 0;
    if (pos === 1) {
      setPrevision('2');
      return;
    }
    if (pos > nPcd) {
      positionReal = pos + nPcd + 3 * pos - 3;
      setPrevision(positionReal.toString());
      const data: DataLocalStorage = {
        position,
        prevision,
        pcd,
        ppp,
      };
      setStorage('@data', data);
    }
    positionReal = pos * 2 + 3 * pos - 2;
    setPrevision(positionReal.toString());
    const data: DataLocalStorage = {
      position,
      prevision,
      pcd,
      ppp,
    };
    setStorage('@data', data);
  };

  const handlePositionPcD = (pos = 0, nPcd = 375, nPpp = 600) => {
    const verify = getStorage('@data');
    if (verify) {
      deleteStorage('@data');
    }
    let positionReal = 0;
    if (pos === 1) {
      setPrevision('2');
      return;
    }
    positionReal = pos * 2 + 3 * pos - 3;
    setPrevision(positionReal.toString());
    const data: DataLocalStorage = {
      position,
      prevision,
      pcd,
      ppp,
    };
    setStorage('@data', data);
  };

  return (
    <SafeAreaView>
      <StatusBar barStyle="dark-content" />
      <ScrollView contentInsetAdjustmentBehavior="automatic">
        <View
          style={{
            paddingHorizontal: 20,
            height: '100%',
          }}>
          <Image
            style={{
              alignSelf: 'center',
              marginVertical: 10,
              width: '70%',
              resizeMode: 'contain',
            }}
            source={Logo}
          />
          <View style={styles.div}>
            <Text style={styles.title}>Número de vagas imediatas:</Text>
            <View style={styles.row}>
              <Info title="AC" info={vagas[0]} />
              <Info title="PCD" info={vagas[1]} />
              <Info title="PPP" info={vagas[2]} />
            </View>

            <Text style={styles.title}>
              Número de vagas cadastro de reserva:
            </Text>
            <View style={styles.row}>
              <Info title="AC" info={reserva[0]} />
              <Info title="PCD" info={reserva[1]} />
              <Info title="PPP" info={reserva[2]} />
            </View>
          </View>

          <View style={styles.div}>
            <Text style={styles.title}>Tipo de vaga:</Text>
            <View style={styles.row}>
              <TypeVaga
                setValue={setChecked}
                type={0}
                value={checked === 0}
                title="AC"
              />
              <TypeVaga
                value={checked === 1}
                setValue={setChecked}
                type={1}
                title="PcD"
              />
              <TypeVaga
                value={checked === 2}
                setValue={setChecked}
                type={2}
                title="PPP"
              />
            </View>
            <View style={styles.row}>
              <Input
                setText={setPcd}
                value={pcd}
                width="30%"
                title="Numero PCD"
                placeholder="Digite aqui..."
              />
              <Input
                setText={setPpp}
                value={ppp}
                width="30%"
                title="Numero PPP"
                placeholder="Digite aqui..."
              />
              <Input
                setText={setPosition}
                value={position}
                width="30%"
                title="Sua posição"
                placeholder="Digite aqui..."
              />
            </View>
            <TouchableOpacity
              onPress={() => {
                if (checked === 0) {
                  handlePosition(Number(position), Number(pcd), Number(ppp));
                  return;
                }
                if (checked === 1) {
                  handlePositionPcD(Number(position), Number(pcd), Number(ppp));
                  return;
                }
                if (checked === 2) {
                  handlePositionPPP(Number(position), Number(pcd), Number(ppp));
                  return;
                }
              }}
              style={{
                alignSelf: 'center',
                borderRadius: 20,
                backgroundColor: yellow,
                padding: 10,
              }}>
              <Text style={{fontWeight: '900', color: 'black'}}>
                Gerar posição
              </Text>
            </TouchableOpacity>
          </View>
          {!prevision || (
            <View style={[styles.div, {backgroundColor: '#1919f0'}]}>
              <View style={styles.row}>
                <Text
                  style={{fontWeight: 'bold', color: 'white', fontSize: 18}}>
                  Posição real: {prevision}
                </Text>
              </View>
            </View>
          )}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  title: {
    fontWeight: '700',
    color: 'black',
    marginTop: '1%',
  },
  subtitle: {
    fontWeight: '500',
    color: 'black',
    marginBottom: '2%',
  },
  info: {
    fontWeight: '400',
    color: 'black',
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  div: {
    borderRadius: 20,
    padding: 10,
    marginBottom: 20,
    backgroundColor: '#eee',
    elevation: 2,
  },
  input: {
    backgroundColor: 'white',
    borderRadius: 8,
  },
});

export default App;
