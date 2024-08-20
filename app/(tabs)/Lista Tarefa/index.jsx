import React from "react";
import { StyleSheet, Text, View, FlatList } from 'react-native';


const Item = ({ title, feito }) => (
  <View style={[styles.item, feito ? styles.doneItem : styles.notDoneItem]}>
    <Text style={feito ? styles.doneTitle : styles.title}>{title}</Text>
  </View>
);

export default function listatarefa(){
      const TAREFAS = [
      {id: '1', title: 'ABCDEFGHIJKLM', feito: false},
      {id: '2', title: 'ZXCVNXKSHSJAK', feito: false},
      {id: '3', title: 'CDGSUAOWOWKSI', feito: false},
      {id: '4', title: 'DISOANDHHDYSI', feito: true},
      {id: '5', title: 'EIASHGJMANBCH', feito: true}       
    ];

return(
      <View style={styles.container}>
        <Text style={styles.headerText}>Lista de Tarefas</Text>
        <FlatList
          data={TAREFAS}
          renderItem={({item}) => <Item title={item.title} feito={item.feito} />}
          keyExtractor={item => item.id}
        />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#f5f5f5',
    padding: 20,
  },
  headerText: {
    fontSize: 36,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 20,
  },
  item: {
    padding: 16,
    marginVertical: 8,
    marginHorizontal: 16,
    borderRadius: 10,
    shadowColor: '#00000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  title: {
    fontSize: 20,
    color: '#000000',
    textAlign: 'center'
  },
  doneTitle: {
    fontSize: 20,
    color: '#000000',
    textDecorationLine: 'line-through',
  },
  doneItem: {
    backgroundColor: '#3fff3f',
  },
  notDoneItem: {
    backgroundColor: '#ff4255',
  },
});