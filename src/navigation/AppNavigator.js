import { Alert, Pressable, Text } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { useDispatch, useSelector } from 'react-redux';
import LoginScreen from '../screens/LoginScreen';
import ProductListScreen from '../screens/ProductListScreen';
import ProductDetailsScreen from '../screens/ProductDetailsScreen';
import { logout } from '../store/authSlice';
import { MENS_CATEGORIES, WOMENS_CATEGORIES } from '../services/api';
import { colors } from '../theme/colors';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

function MensScreen(props) {
  return <ProductListScreen {...props} categories={MENS_CATEGORIES} />;
}

function WomensScreen(props) {
  return <ProductListScreen {...props} categories={WOMENS_CATEGORIES} />;
}

function LogoutButton() {
  const dispatch = useDispatch();

  const confirmLogout = () => {
    Alert.alert('Sair', 'Deseja realmente sair?', [
      { text: 'Cancelar', style: 'cancel' },
      { text: 'Sair', style: 'destructive', onPress: () => dispatch(logout()) },
    ]);
  };

  return (
    <Pressable onPress={confirmLogout} hitSlop={10} style={{ marginRight: 4 }}>
      <Text style={{ color: '#fff', fontWeight: '600' }}>Sair</Text>
    </Pressable>
  );
}

function TabIcon({ label, focused }) {
  return <Text style={{ fontSize: 20, opacity: focused ? 1 : 0.5 }}>{label}</Text>;
}

function MainTabs() {
  const user = useSelector((state) => state.auth.user);

  return (
    <Tab.Navigator
      screenOptions={{
        headerStyle: { backgroundColor: colors.primary },
        headerTintColor: '#fff',
        headerRight: () => <LogoutButton />,
        headerRightContainerStyle: { paddingRight: 16 },
        tabBarActiveTintColor: colors.accent,
        tabBarInactiveTintColor: colors.textMuted,
        tabBarLabelStyle: { fontSize: 13, fontWeight: '600' },
      }}
    >
      <Tab.Screen
        name="Masculino"
        component={MensScreen}
        options={{
          title: `Olá, ${user?.name ?? ''}`,
          tabBarLabel: 'Masculino',
          tabBarIcon: ({ focused }) => <TabIcon label="👔" focused={focused} />,
        }}
      />
      <Tab.Screen
        name="Feminino"
        component={WomensScreen}
        options={{
          title: `Olá, ${user?.name ?? ''}`,
          tabBarLabel: 'Feminino',
          tabBarIcon: ({ focused }) => <TabIcon label="👗" focused={focused} />,
        }}
      />
    </Tab.Navigator>
  );
}

export default function AppNavigator() {
  const isLoggedIn = useSelector((state) => !!state.auth.user);

  return (
    <NavigationContainer>
      <Stack.Navigator>
        {isLoggedIn ? (
          <>
            <Stack.Screen name="Main" component={MainTabs} options={{ headerShown: false }} />
            <Stack.Screen
              name="ProductDetails"
              component={ProductDetailsScreen}
              options={{
                title: 'Detalhes do produto',
                headerStyle: { backgroundColor: colors.primary },
                headerTintColor: '#fff',
                headerBackTitle: 'Voltar',
              }}
            />
          </>
        ) : (
          <Stack.Screen name="Login" component={LoginScreen} options={{ headerShown: false }} />
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
}
