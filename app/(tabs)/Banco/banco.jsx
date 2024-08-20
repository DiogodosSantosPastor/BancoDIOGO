import React, { useState } from 'react';
import { StyleSheet, Text, View, TextInput, Button, Alert, Image } from 'react-native';


function Header({ saldo }) {
  const logoBanco = 'https://upload.wikimedia.org/wikipedia/commons/3/35/Santander_Logo.PNG';
  return (
    <View style={styles.headerContainer}>
      <Image
      style={styles.logo}
      source={{
      uri: logoBanco
      }}
      /> 
      <Text style={styles.saldoText}>Saldo: R$ {saldo.toFixed(2)}</Text>
    </View>
  );
}


function TransacaoForm({ valor, setValor }) {
  return (
    <View style={styles.formContainer}>
      <TextInput
        style={styles.input}
        keyboardType="numeric"
        placeholder="Digite o valor"
        value={valor}
        onChangeText={(text) => setValor(text)}
      />
    </View>
  );
}


function Operacoes({ onDeposito, onSaque }) {
  return (
    <View style={styles.operacoesContainer}>
      <Button title="Depositar" onPress={onDeposito} />
      <Button title="Sacar" onPress={onSaque} color="#e60000" />
    </View>
  );
}


export default function App() {
  const [saldo, setSaldo] = useState(7320.92);
  const [valor, setValor] = useState('');

  const handleDeposito = () => {
    const valorDeposito = parseFloat(valor);
    if (isNaN(valorDeposito) || valorDeposito <= 0) {
      Alert.alert('Valor inválido', 'Por favor, insira um valor válido.');
      return;
    }
    const bonus = valorDeposito * 0.01;
    setSaldo(saldo + valorDeposito + bonus);
    setValor('');
  };

  const handleSaque = () => {
    const valorSaque = parseFloat(valor);
    if (isNaN(valorSaque) || valorSaque <= 0 || valorSaque > saldo) {
      Alert.alert('Valor inválido', 'Por favor, insira um valor válido.');
      return;
    }
    const multa = (saldo - valorSaque) * 0.025;
    setSaldo(saldo - valorSaque - multa);
    setValor('');
  };

  return (
    <View style={styles.container}>
      <Header saldo={saldo} />
      <TransacaoForm valor={valor} setValor={setValor} />
      <Operacoes onDeposito={handleDeposito} onSaque={handleSaque} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f5f5f5',
  },
  headerContainer: {
    alignItems: 'center',
    marginBottom: 50,
  },
  headerText: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#e60000',
  },
  saldoText: {
    fontSize: 24,
    marginTop: 10,
    color: '#333',
  },
  formContainer: {
    width: '80%',
    marginBottom: 30,
  },
  input: {
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 5,
    padding: 10,
    fontSize: 18,
    backgroundColor: '#fff',
  },
  operacoesContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '80%',
  },
  logo: {
    width: 600,
    height: 150,
    backgroundColor: 'transparent'
},
});
