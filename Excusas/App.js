import React, { useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ScrollView,
  Alert,
  Share,
} from 'react-native';

const excusasDatabase = {
  trabajo: [
    "Mi perro se comió mi laptop y tuve que llevarlo al veterinario urgentemente",
    "Se me cayó el café en el teclado y ahora solo escribe en chino",
    "Mi vecino decidió practicar trompeta a las 5 AM y no pude dormir",
    "El GPS me llevó a otra ciudad con el mismo nombre",
    "Mi despertador cambió a hora de Japón solo",
    "Un mapache se metió a mi casa y destruyó mi uniforme",
    "Mi internet tiene crisis existencial y solo carga memes",
    "El uber que pedí era en realidad una ambulancia"
  ],
  
  tareas: [
    "Mi hermano pequeño usó mi tarea para entrenar origami",
    "Se me olvidó que existía hasta que me levanté",
    "Mi computadora se enamoró de un virus y ahora están de luna de miel",
    "Confundí la fecha porque vivo en el año 2019 mentalmente",
    "Mi gato pisó Ctrl+A y Delete mientras yo dormía",
    "El archivo se fue de vacaciones a la papelera de reciclaje",
    "Creí que era opcional como el gimnasio",
    "Mi WiFi tiene depresión estacional"
  ],
  
  citas: [
    "Mi horóscopo dice que hoy debo evitar las decisiones importantes",
    "Mi planta favorita está enferma y necesita terapia emocional",
    "Tengo que acompañar a mi goldfish a su primera cita",
    "Mi sombra me abandonó y la estoy buscando",
    "Estoy en una relación muy seria con mi cama",
    "Mi reflejo en el espejo no quiere salir hoy",
    "Tengo que enseñarle a mi tortuga a usar redes sociales",
    "Mi alter ego tiene una cita más importante"
  ],
  
  ejercicio: [
    "Mis músculos están en huelga sindical",
    "El gimnasio está cerrado por invasión de pingüinos",
    "Mis tenis se divorciaron y están en terapia de pareja",
    "Estoy ahorrando energía para el apocalipsis zombie",
    "Mi entrenador personal se fue a buscar pokémones",
    "El aire acondicionado del gym se enamoró de mí y no me deja ir",
    "Mis articulaciones están celebrando su jubilación anticipada",
    "Tengo alergia al sudor propio"
  ]
};

export default function App() {
  const [excusaActual, setExcusaActual] = useState('¡Presiona una categoría para generar tu excusa!');
  const [categoriaSeleccionada, setCategoriaSeleccionada] = useState('');
  const [contadorExcusas, setContadorExcusas] = useState(0);
  const [favoritas, setFavoritas] = useState([]);

  const generarExcusa = (categoria) => {
    const excusas = excusasDatabase[categoria];
    const excusaAleatoria = excusas[Math.floor(Math.random() * excusas.length)];
    setExcusaActual(excusaAleatoria);
    setCategoriaSeleccionada(categoria);
    setContadorExcusas(contadorExcusas + 1);
  };

  const compartirExcusa = async () => {
    if (excusaActual === '¡Presiona una categoría para generar tu excusa!') {
      Alert.alert('¡Oops!', 'Primero genera una excusa para compartir');
      return;
    }

    try {
      await Share.share({
        message: `Mi excusa del día: "${excusaActual}" 🤷‍♂️\n\nGenerado con ExcusApp`,
        title: 'Mi Excusa Creativa'
      });
    } catch (error) {
      Alert.alert('Error', 'No se pudo compartir la excusa');
    }
  };

  const agregarAFavoritas = () => {
    if (excusaActual === '¡Presiona una categoría para generar tu excusa!') {
      Alert.alert('¡Oops!', 'Primero genera una excusa para guardar');
      return;
    }

    if (favoritas.includes(excusaActual)) {
      Alert.alert('¡Ya existe!', 'Esta excusa ya está en tus favoritas');
      return;
    }

    setFavoritas([...favoritas, excusaActual]);
    Alert.alert('¡Guardada!', 'Excusa agregada a favoritas');
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.title}>🎭 ExcusApp</Text>
        <Text style={styles.subtitle}>Generador de Excusas Creativas</Text>
        <Text style={styles.contador}>Excusas generadas: {contadorExcusas}</Text>
      </View>

      {/* Área de la excusa */}
      <View style={styles.excusaContainer}>
        <Text style={styles.excusaTexto}>{excusaActual}</Text>
        {categoriaSeleccionada && (
          <Text style={styles.categoria}>Categoría: {categoriaSeleccionada}</Text>
        )}
      </View>

      {/* Botones de acción */}
      {excusaActual !== '¡Presiona una categoría para generar tu excusa!' && (
        <View style={styles.accionesContainer}>
          <TouchableOpacity style={styles.botonAccion} onPress={compartirExcusa}>
            <Text style={styles.textoBotonAccion}>📤 Compartir</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.botonAccion} onPress={agregarAFavoritas}>
            <Text style={styles.textoBotonAccion}>⭐ Favorita</Text>
          </TouchableOpacity>
        </View>
      )}

      {/* Categorías */}
      <ScrollView style={styles.categoriasContainer}>
        <Text style={styles.categoriasTitle}>Elige tu situación:</Text>
        
        <TouchableOpacity 
          style={styles.categoriaBoton} 
          onPress={() => generarExcusa('trabajo')}
        >
          <Text style={styles.categoriaTexto}>💼 Trabajo/Estudio</Text>
        </TouchableOpacity>

        <TouchableOpacity 
          style={styles.categoriaBoton} 
          onPress={() => generarExcusa('tareas')}
        >
          <Text style={styles.categoriaTexto}>📚 Tareas</Text>
        </TouchableOpacity>

        <TouchableOpacity 
          style={styles.categoriaBoton} 
          onPress={() => generarExcusa('citas')}
        >
          <Text style={styles.categoriaTexto}>💕 Citas</Text>
        </TouchableOpacity>

        <TouchableOpacity 
          style={styles.categoriaBoton} 
          onPress={() => generarExcusa('ejercicio')}
        >
          <Text style={styles.categoriaTexto}>🏃‍♂️ Ejercicio</Text>
        </TouchableOpacity>
      </ScrollView>

      {/* Favoritas */}
      {favoritas.length > 0 && (
        <View style={styles.favoritasContainer}>
          <Text style={styles.favoritasTitle}>⭐ Favoritas: {favoritas.length}</Text>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f0f8ff',
  },
  header: {
    alignItems: 'center',
    paddingVertical: 20,
    backgroundColor: '#4a90e2',
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
    marginBottom: 20,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: 'white',
    marginBottom: 5,
  },
  subtitle: {
    fontSize: 16,
    color: 'white',
    opacity: 0.9,
  },
  contador: {
    fontSize: 12,
    color: 'white',
    opacity: 0.8,
    marginTop: 5,
  },
  excusaContainer: {
    backgroundColor: 'white',
    margin: 20,
    padding: 20,
    borderRadius: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  excusaTexto: {
    fontSize: 18,
    textAlign: 'center',
    lineHeight: 26,
    color: '#333',
  },
  categoria: {
    textAlign: 'center',
    marginTop: 10,
    fontSize: 12,
    color: '#666',
    fontStyle: 'italic',
  },
  accionesContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginHorizontal: 20,
    marginBottom: 20,
  },
  botonAccion: {
    backgroundColor: '#ff6b6b',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 25,
  },
  textoBotonAccion: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 14,
  },
  categoriasContainer: {
    flex: 1,
    paddingHorizontal: 20,
  },
  categoriasTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 15,
    textAlign: 'center',
    color: '#333',
  },
  categoriaBoton: {
    backgroundColor: 'white',
    padding: 15,
    marginVertical: 8,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  categoriaTexto: {
    fontSize: 16,
    textAlign: 'center',
    fontWeight: '600',
    color: '#4a90e2',
  },
  favoritasContainer: {
    backgroundColor: '#ffe066',
    padding: 10,
    alignItems: 'center',
  },
  favoritasTitle: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#333',
  },
});