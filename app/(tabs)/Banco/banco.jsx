import React, { useState } from 'react';
import { StyleSheet, Text, View, TextInput, Button, Alert, Image, Modal } from 'react-native';

function Header({ saldo }) {
  const logoBanco = 'https://upload.wikimedia.org/wikipedia/commons/3/35/Santander_Logo.PNG';
  return (
    <View style={styles.headerContainer}>
      <Image
        style={styles.logo}
        source={{ uri: logoBanco }}
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
      <View style={styles.buttonContainer}>
        <Button title="Depositar" onPress={onDeposito} color="#00c7ff" />
      </View>
      <View style={styles.buttonContainer}>
        <Button title="Sacar" onPress={onSaque} color="#e60000" />
      </View>
    </View>
  );
}

function ConfirmacaoModal({ visible, onConfirm, onCancel, tipo, valor }) {
  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={visible}
      onRequestClose={onCancel}
    >
      <View style={styles.modalContainer}>
        <View style={styles.modalContent}>
          <Text style={styles.modalText}>Confirmar {tipo} de R$ {valor}?</Text>
          <View style={styles.modalButtons}>
            <Button title="Cancelar" onPress={onCancel} color="#999" />
            <Button title="Confirmar" onPress={onConfirm} />
          </View>
        </View>
      </View>
    </Modal>
  );
}

export default function App() {
  const [saldo, setSaldo] = useState(7320.92);
  const [valor, setValor] = useState('');
  const [modalVisible, setModalVisible] = useState(false);
  const [tipoOperacao, setTipoOperacao] = useState('');

  const abrirModal = (tipo) => {
    setTipoOperacao(tipo);
    setModalVisible(true);
  };

  const handleDeposito = () => {
    const valorDeposito = parseFloat(valor);
    if (isNaN(valorDeposito) || valorDeposito <= 0) {
      Alert.alert('Valor inválido', 'Por favor, insira um valor válido.');
      return;
    }
    abrirModal('depósito');
  };

  const handleSaque = () => {
    const valorSaque = parseFloat(valor);
    if (isNaN(valorSaque) || valorSaque <= 0 || valorSaque > saldo) {
      Alert.alert('Valor inválido', 'Por favor, insira um valor válido.');
      return;
    }
    abrirModal('saque');
  };

  const confirmarOperacao = () => {
    const valorOperacao = parseFloat(valor);
    if (tipoOperacao === 'depósito') {
      const bonus = valorOperacao * 0.01;
      setSaldo(saldo + valorOperacao + bonus);
    } else if (tipoOperacao === 'saque') {
      const multa = (saldo - valorOperacao) * 0.025;
      setSaldo(saldo - valorOperacao - multa);
    }
    setValor('');
    setModalVisible(false);
  };

  return (
    <View style={styles.container}>
      <Header saldo={saldo} />
      <TransacaoForm valor={valor} setValor={setValor} />
      <Operacoes onDeposito={handleDeposito} onSaque={handleSaque} />
      <ConfirmacaoModal
        visible={modalVisible}
        onConfirm={confirmarOperacao}
        onCancel={() => setModalVisible(false)}
        tipo={tipoOperacao}
        valor={valor}
      />
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
  saldoText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#4CAF50',
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
    width: '50%',
    marginTop: 20,
  },
  buttonContainer: {
    flex: 1,
    marginHorizontal: 10,

  },
  logo: {
    width: 600,
    height: 150,
    backgroundColor: 'transparent'
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    width: 300,
    padding: 20,
    backgroundColor: 'white',
    borderRadius: 10,
    alignItems: 'center',
  },
  modalText: {
    fontSize: 18,
    marginBottom: 20,
    textAlign: 'center',
  },
  modalButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
  },
});
