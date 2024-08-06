import React, { useState } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity } from 'react-native';
import { Picker } from '@react-native-picker/picker';

const isPrime = (num) => {
    if (num < 2) 
        return false;
    for (let i = 2; i <= Math.sqrt(num); i++) {
        if (num % i === 0) 
            return false;
    }
    return true;
};

const isFibonacci = (num) => {
    const isPerfectSquare = (x) => {
        let s = Math.floor(Math.sqrt(x));
        return (s * s === x);
    };
    return isPerfectSquare(5 * num * num + 4) || isPerfectSquare(5 * num * num - 4);
};

const generateNumbers = (rule) => {
    return Array.from({ length: 100 }, (_, i) => {
        const num = i + 1;
        return {
            value: num,
            highlight: rule(num),
        };
    });
};

const App = () => {
    const [selectedRule, setSelectedRule] = useState('Odd Numbers');

    const rules = [
        { title: 'Odd Numbers', rule: (num) => num % 2 !== 0 },
        { title: 'Even Numbers', rule: (num) => num % 2 === 0 },
        { title: 'Prime Numbers', rule: isPrime },
        { title: 'Fibonacci Numbers', rule: isFibonacci },
    ];

    const ruleMap = {
        'Odd Numbers': (num) => num % 2 !== 0,
        'Even Numbers': (num) => num % 2 === 0,
        'Prime Numbers': isPrime,
        'Fibonacci Numbers': isFibonacci,
    };

    const numbers = generateNumbers(ruleMap[selectedRule]);

    return (
        <View style={styles.container}>
            <Picker
                selectedValue={selectedRule}
                onValueChange={(itemValue) => setSelectedRule(itemValue)}
                style={styles.picker}
            >
                {rules.map((rule) => (
                    <Picker.Item key={rule.title} label={rule.title} value={rule.title} />
                ))}
            </Picker>
            <FlatList
                data={numbers}
                keyExtractor={(item) => item.value.toString()}
                numColumns={10}
                renderItem={({ item }) => (
                    <TouchableOpacity style={[styles.item, item.highlight && styles.highlightedItem]}>
                        <Text style={styles.itemText}>{item.value}</Text>
                    </TouchableOpacity>
                )}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        paddingTop: 50,
        alignItems: 'center',
    },
    picker: {
        height: 50,
        width: 200,
        marginBottom: 20,
    },
    item: {
        flex: 1,
        margin: 5,
        padding: 10,
        backgroundColor: '#f9c2ff',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 4,
        minWidth: 30,
    },
    highlightedItem: {
        backgroundColor: '#ff4081',
    },
    itemText: {
        fontSize: 16,
    },
});

export default App;
