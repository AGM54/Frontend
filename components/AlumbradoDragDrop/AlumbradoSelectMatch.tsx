import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Modal } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { styles } from './styles';

const phraseData = [
  { text: 'Definir tasa de alumbrado público', correctEntity: 'Municipalidad' },
  { text: 'Verificar que los montos de la factura estén desglosados', correctEntity: 'CNEE' },
  { text: 'Cobrar tasa de alumbrado público al usuario', correctEntity: 'Distribuidora' },
];

const entities = ['CNEE', 'Municipalidad', 'Distribuidora'];

export const AlumbradoSelectMatch = ({ onComplete }: { onComplete: () => void }) => {
  const [selectedPhrase, setSelectedPhrase] = useState<number | null>(null);
  const [matched, setMatched] = useState<{ [key: number]: string }>({});
  // Agrupar frases por entidad para mostrar en los recuadros
  const entityMatches: { [entity: string]: string[] } = {};
  Object.entries(matched).forEach(([idx, entity]) => {
    if (!entityMatches[entity]) entityMatches[entity] = [];
    entityMatches[entity].push(phraseData[Number(idx)].text);
  });
  const [completedCount, setCompletedCount] = useState(0);
  const [showModal, setShowModal] = useState(false);
  const [modalMessage, setModalMessage] = useState('');
  const [showCompletionModal, setShowCompletionModal] = useState(false);

  const handlePhraseSelect = (idx: number) => {
    setSelectedPhrase(idx);
  };

  const handleEntitySelect = (entity: string) => {
    if (selectedPhrase === null) return;
    const phrase = phraseData[selectedPhrase];
    if (phrase.correctEntity === entity) {
      setMatched({ ...matched, [selectedPhrase]: entity });
      setCompletedCount(completedCount + 1);
      setModalMessage(`¡Correcto! ${phrase.text} → ${entity} ✅`);
      setShowModal(true);
      setTimeout(() => {
        setShowModal(false);
        setSelectedPhrase(null);
        if (completedCount + 1 === phraseData.length) {
          setShowCompletionModal(true);
        }
      }, 1500);
    } else {
      setModalMessage(`Incorrecto. "${phrase.text}" no corresponde a ${entity}. ¡Inténtalo de nuevo!`);
      setShowModal(true);
      setTimeout(() => {
        setShowModal(false);
        setSelectedPhrase(null);
      }, 1500);
    }
  };

  const handleComplete = () => {
    setShowCompletionModal(false);
    onComplete();
  };

  return (
    <View style={styles.container}>
      <LinearGradient
        colors={['#1a0033', '#2d1b4d', '#3d2b5f', '#2d1b4d', '#1a0033']}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={styles.gradient}
      >
        <LinearGradient
          colors={['rgba(139, 69, 255, 0.3)', 'rgba(88, 204, 247, 0.2)', 'rgba(139, 69, 255, 0.3)']}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={styles.titleContainer}
        >
          <Text style={styles.title}>🎮 Selecciona la frase y luego la entidad correcta</Text>
          <Text style={styles.subtitle}>
            Completadas: {completedCount}/{phraseData.length}
          </Text>
        </LinearGradient>

        <View style={styles.phrasesContainer}>
          <Text style={styles.sectionTitle}>📝 Frases disponibles:</Text>
          {phraseData.map((phrase, idx) => (
            <View key={idx} style={{ marginBottom: 18 }}>
              <TouchableOpacity
                style={[styles.phraseGradient, selectedPhrase === idx && { borderColor: '#FFD700', borderWidth: 3 }]}
                disabled={matched[idx] !== undefined}
                onPress={() => handlePhraseSelect(idx)}
              >
                <Text style={styles.phraseText}>{phrase.text}</Text>
                {matched[idx] && (
                  <Text style={styles.dragHint}>✅ Asignada a {matched[idx]}</Text>
                )}
                {!matched[idx] && selectedPhrase === idx && (
                  <Text style={styles.dragHint}>Seleccionada</Text>
                )}
              </TouchableOpacity>
            </View>
          ))}
        </View>

        <View style={styles.entitiesContainer}>
          <Text style={styles.sectionTitle}>🎯 Elige la entidad:</Text>
          <View style={styles.entitiesRow}>
            {entities.map((entity, idx) => (
              <TouchableOpacity
                key={entity}
                style={[styles.entityDropZone, selectedPhrase !== null && { borderColor: '#FFD700', borderWidth: 3 }]}
                onPress={() => handleEntitySelect(entity)}
                disabled={selectedPhrase === null}
              >
                <Text style={styles.entityTitle}>{entity}</Text>
                {/* Mostrar frases emparejadas dentro del recuadro */}
                {entityMatches[entity] && entityMatches[entity].map((text, i) => (
                  <View key={i} style={styles.matchedItem}>
                    <Text style={styles.matchedText}>✅ {text}</Text>
                  </View>
                ))}
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* Modal de retroalimentación */}
        <Modal
          animationType="fade"
          transparent={true}
          visible={showModal}
          onRequestClose={() => setShowModal(false)}
        >
          <View style={styles.modalOverlay}>
            <LinearGradient
              colors={['rgba(139, 69, 255, 0.95)', 'rgba(88, 204, 247, 0.9)', 'rgba(139, 69, 255, 0.95)']}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
              style={styles.modalContent}
            >
              <Text style={styles.modalText}>{modalMessage}</Text>
            </LinearGradient>
          </View>
        </Modal>

        {/* Modal de finalización */}
        <Modal
          animationType="fade"
          transparent={true}
          visible={showCompletionModal}
          onRequestClose={() => setShowCompletionModal(false)}
        >
          <View style={styles.modalOverlay}>
            <LinearGradient
              colors={['rgba(40, 167, 69, 0.95)', 'rgba(88, 204, 247, 0.9)', 'rgba(40, 167, 69, 0.95)']}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
              style={styles.modalContent}
            >
              <Text style={styles.modalTitle}>🎉 ¡Excelente trabajo!</Text>
              <Text style={styles.modalText}>
                Has completado correctamente la actividad de alumbrado público.{"\n\n"}
                Ahora sabes qué entidad es responsable de cada aspecto del alumbrado público.
              </Text>
              <TouchableOpacity 
                style={styles.completionButton}
                onPress={handleComplete}
              >
                <Text style={styles.modalButtonText}>Continuar</Text>
              </TouchableOpacity>
            </LinearGradient>
          </View>
        </Modal>
      </LinearGradient>
    </View>
  );
};

export default AlumbradoSelectMatch;
