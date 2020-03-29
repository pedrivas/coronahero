import React, { useState, useEffect } from 'react'; //use efect para carregar uma informacao toda vez qe o componente é exibido em tela.
import { Feather} from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { View, FlatList, Image, Text, TouchableOpacity } from 'react-native';

import api from '../../services/api';

import logoImg from '../../assets/logo.png';

import styles from './styles'

export default function Incidents() {
    const [incidents, setIncidents] = useState([]);
    const [total, setTotal] = useState(0);
    const [page, setPage] = useState(1);
    const [loading, setLoading] = useState(false);

    const navigation = useNavigation();

    function navigateToDetail(incident) {
        navigation.navigate('Detail', { incident }); //recebe como parâmetro os dados a serem enviados para a pagina a ser acessada 'detail'
    }

    async function loadIncidents() {
        if (loading) { //evita que enquanto uma requisição de atualizar a tela infinita esteja sendo executa, seja requisitada outra
            return;
        }

        if (total > 0 && incidents.length == total) { // caso existam incidentes e estejam sendo exibidos todos
            return;
        }

        setLoading(true);

        const response = await api.get('incidents', {
            params: { page }
        });

        setIncidents([...incidents, ...response.data]); //anexo de dois vetores. necessario para carregar a tela infinita com mais infos toda vez
        setTotal(response.headers['x-total-count']);
        setPage(page+1);
        setLoading(false);
    }

    useEffect(()=> {
        loadIncidents();
    }, []);

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Image source={logoImg} />
                <Text style={styles.headerText}>
                    Total de <Text style={styles.headerTextBold}>{total} casos</Text>.
                </Text>
            </View>

            <Text style={styles.title}>Bem-vindo!</Text>
            <Text style={styles.description}>Selecione uma tarefa e salve o dia.</Text>

            <FlatList 
                style={styles.incidentList}
                keyExtractor={incident => String(incident.id)}
                showsVerticalScrollIndicator={false}
                onEndReached={loadIncidents} // dispara funcao ao chegar no fim da tela
                onEndReachedThreshold={0.2} // indica em quantos porcento do fim da tela deve disparar a funcao
                data={incidents}
                renderItem={({ item: incident }) => ( //item é o proprio incident. os dois pontos é para trocar o nome da variavel item por incident
                    <View style={styles.incident}>
                        <Text style={styles.incidentProperty}>Pessoa:</Text>
                        <Text style={styles.incidentValue}>{incident.name}</Text>

                        <Text style={styles.incidentProperty}>Tarefa:</Text>
                        <Text style={styles.incidentValue}>{incident.title}</Text>

                        <Text style={styles.incidentProperty}>Valor:</Text>
                        <Text style={styles.incidentValue}>
                            {Intl.NumberFormat('pt-BR', {
                                style: 'currency', 
                                currency: 'BRL' 
                            }).format(incident.value)}
                        </Text>

                        <TouchableOpacity 
                            style={styles.detailsButton}
                            onPress={() => navigateToDetail(incident)} // sempre que precisa passar parametros para uma função usar arrow function
                        >
                            <Text style={styles.detailsButtonText}>Ver mais detalhes</Text>
                            <Feather name="arrow-right" size={16} color="#E02041" />
                        </TouchableOpacity>    
                    </View>
                )}
            />

        </View>
    );
}